#!/usr/bin/env python3
"""Read-only integrity check for a user-provided DD2 questlog audit ZIP.

Proves internal consistency of the archive, raw GMSG CSV title rows and published
candidate manifest. It does NOT prove that the binary came from a particular
installed PAK or that any inferred gameplay rules match game runtime behavior.
"""
import argparse
import csv
import hashlib
import io
import json
import re
from collections import Counter
from pathlib import Path
from zipfile import ZipFile


def csv_rows(data: bytes):
    return list(csv.DictReader(io.StringIO(data.decode("utf-8-sig", errors="strict")), strict=False))


def verify(path: Path, candidate_manifest: Path):
    errors = []
    summary = {}
    with ZipFile(path) as archive:
        broken = archive.testzip()
        if broken:
            raise ValueError("CRC mismatch in ZIP member: " + broken)
        names = archive.namelist()
        if len(set(names)) != len(names):
            raise ValueError("ZIP has duplicate entry names")
        name_set = set(names)
        if "SHA256SUMS.txt" not in name_set:
            raise ValueError("SHA256SUMS.txt missing")
        checksum_rows = archive.read("SHA256SUMS.txt").decode("utf-8").splitlines()
        verified = set()
        for line in checksum_rows:
            match = re.fullmatch(r"([a-fA-F0-9]{64})\s+\*?(.+)", line)
            if not match:
                errors.append("Malformed checksum line")
                continue
            expected, member = match.groups()
            member = member.removeprefix("./").replace("\\", "/")
            if member in verified:
                errors.append("Repeated checksum path: " + member)
                continue
            verified.add(member)
            if member not in name_set:
                errors.append("Checksum references missing member: " + member)
            elif hashlib.sha256(archive.read(member)).hexdigest().lower() != expected.lower():
                errors.append("Checksum mismatch: " + member)
        missing_checksums = (name_set - {"SHA256SUMS.txt"}) - verified
        if missing_checksums:
            errors.append("ZIP members with no checksum: " + str(len(missing_checksums)))
        summary["members"] = len(names)
        summary["hashesVerified"] = len(verified - set(member for member in verified if member not in name_set))
        titles = csv_rows(archive.read("normalized/quest-titles.csv"))
        by_id = {}
        for row in titles:
            quest_id = row["quest_internal_id"]
            if quest_id in by_id:
                errors.append("Repeated quest ID: " + quest_id)
                continue
            by_id[quest_id] = row
            pak = row["source_pak"]
            if pak == "re_chunk_000.pak":
                folder = "base"
            elif pak == "re_dlc_stm_2593290.pak":
                folder = "dlc"
            else:
                errors.append("Unexpected declared PAK: " + pak)
                continue
            filename = row["resource_path"].rsplit("/", 1)[-1]
            raw_bin = f"raw/{folder}/{filename}"
            raw_csv = raw_bin + ".csv"
            if raw_bin not in name_set or raw_csv not in name_set:
                errors.append("Missing raw source for " + quest_id)
                continue
            for member, digest_field in [(raw_bin, "extracted_msg_sha256"), (raw_csv, "extracted_csv_sha256")]:
                actual = hashlib.sha256(archive.read(member)).hexdigest()
                if actual.lower() != row[digest_field].lower():
                    errors.append(f"{quest_id}: {member} SHA256 does not match title record")
            original = csv_rows(archive.read(raw_csv))
            values = [cell for cell in original if cell.get("entry name") == row["title_key"]]
            if len(values) != 1:
                errors.append(quest_id + ": zero or duplicate title key in raw CSV")
                continue
            item = values[0]
            for raw_field, normalized_field in [
                ("English", "english_title"), ("PortugueseBr", "ptbr_title"), ("Japanese", "japanese_title")
            ]:
                observed = item.get(raw_field, "").strip()
                expected = row[normalized_field].strip()
                if expected == "NAO_LOCALIZADO":
                    expected = ""
                if observed != expected:
                    errors.append(f"{quest_id}: {raw_field} title mismatch")
        summary["titleRows"] = len(titles)
        summary["localizedTitles"] = sum(row["english_title"] != "NAO_LOCALIZADO" and row["ptbr_title"] != "NAO_LOCALIZADO" for row in titles)
        summary["declaredSourcePaks"] = dict(Counter(row["source_pak"] for row in titles))
        crosswalk = csv_rows(archive.read("normalized/quest-id-crosswalk.csv"))
        if len(crosswalk) != len(titles) or {row["quest_internal_id"] for row in crosswalk} != set(by_id):
            errors.append("Crosswalk quest IDs differ from title CSV")
        summary["crosswalkStatusesReported"] = dict(Counter(row["reconciliation_status"] for row in crosswalk))
        if candidate_manifest.exists():
            manifest = json.loads(candidate_manifest.read_text(encoding="utf-8"))
            observed_candidates = [row for row in crosswalk if row["reconciliation_status"] == "Missão nova ainda não identificada no projeto"]
            by_candidate = {row["quest_internal_id"]: row for row in observed_candidates}
            registered = manifest["candidates"]
            if len(registered) != len(observed_candidates):
                errors.append("Candidate count differs from ZIP")
            for entry in registered:
                raw = by_id.get(entry["id"])
                match = by_candidate.get(entry["id"])
                if not raw or not match:
                    errors.append("Registered candidate absent from ZIP: " + entry["id"])
                    continue
                for key1, key2 in [("english", "english_title"), ("ptBR", "ptbr_title"), ("sourceMsgSha256", "extracted_msg_sha256")]:
                    if entry[key1].casefold() != raw[key2].casefold():
                        errors.append(entry["id"] + ": candidate registry drift in " + key1)
                expected_kind = "base" if raw["source_pak"] == "re_chunk_000.pak" else "dlc"
                if entry["sourceKind"] != expected_kind:
                    errors.append(entry["id"] + ": candidate PAK class differs")
            summary["candidateManifestCompared"] = len(registered)
        else:
            summary["candidateManifestCompared"] = "SKIPPED (no manifest path)"
        conditions = csv_rows(archive.read("normalized/quest-conditions.csv"))
        branches = csv_rows(archive.read("normalized/quest-branching-and-failures.csv"))
        rewards = csv_rows(archive.read("normalized/quest-items-and-rewards.csv"))
        locations = csv_rows(archive.read("normalized/quest-npc-locations.csv"))
        summary["heuristicCautions"] = {
            "genericUnmooredLockoutRows": sum(row["condition_type"] == "UNMOORED_LOCKOUT" for row in conditions),
            "genericEndgameBranches": sum(row["decision_point"] == "Conclusão antes do Endgame / Mundo Desancorado" for row in branches),
            "repeatedReward2000_1500_150": sum((row["gold_amount"], row["xp_amount"], row["dcp_amount"]) == ("2000", "1500", "150") for row in rewards),
            "npcLocationRowsClaimedExact": sum(row["coord_source_type"] == "EXACT_LOCATIONDATA_USER3" for row in locations),
        }
    summary["result"] = "PASS_INTERNAL_PACKAGE_CONSISTENCY_ONLY" if not errors else "FAIL"
    summary["limitations"] = "Does not prove provenance from local Steam PAKs, NPC coordinate associations, quest conditions, reward mapping, or playability."
    return summary, errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("zip_path", type=Path)
    parser.add_argument("--candidates", type=Path,
        default=Path(__file__).resolve().parents[1] / "docs/audit/questlog-additional-title-candidates-2026-10-13.json")
    args = parser.parse_args()
    summary, errors = verify(args.zip_path, args.candidates)
    print(json.dumps({"summary": summary, "errors": errors}, indent=2, ensure_ascii=False))
    raise SystemExit(1 if errors else 0)


if __name__ == "__main__":
    main()

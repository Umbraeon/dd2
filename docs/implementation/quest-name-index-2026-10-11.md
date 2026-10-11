# Integração de pares EN/PT-BR de missões — 11/10/2026

## Achado

A extração seletiva **reportada** pelo proprietário do build Steam DD2 `25290080` listou 59 pares de títulos com chave `_log_title`, português brasileiro e inglês. Entretanto, os arquivos completos `game-localization-evidence.csv` e `game-localization-extraction-report.md` ficaram no computador local e **não estão versionados na `main`**. A `main` possuía somente o `quest-name-mapping.csv` mais antigo (56 linhas com status `LOCALIZACAO_EXTRAIDA`, uma `OFICIAL_COMPROVADO` via HUD, duas `NAO_CONFIRMADO` DLC). Este PR não finge possuir ou recalcular os arquivos ausentes.

## Entrega

`src/data/questNameIndex.ts` materializa **59 pares** EN/PT-BR vinculados aos IDs de marcos da matriz de auditoria, com proveniência explícita:

- **7 `pak_sample_reported`:** registros cuja chave, caminho e SHA256 constam literalmente do relatório de extração fornecido na conversa: `Ordeals of a New Recruit`, `Nesting Troubles`, `Mercy among Thieves`, `Short-Sighted Ambition`, `A New Godsway`, `Chilling Tidings`, `Lost Rites`. A chave, arquivo e hash são transcritos da evidência fornecida, **não revalidados no ambiente deste PR**.
- **52 `paired_catalog`:** nomes EN/PT-BR do `docs/audit/quest-name-mapping.csv`; o relato indica correspondência nos PAKs para o conjunto completo, mas sem CSV primário individual a implementação **não promove estes 52 para a categoria de prova PAK por registro**.

Em `Mercy among Thieves`, a grafia `among` minúscula segue o literal reportado do build, e não `Mercy Among Thieves` da matriz antiga. Na DLC, o relatório forneceu `Chilling Tidings → Notícias Congelantes` e `Lost Rites → Rituais Perdidos`.

## Exibição

O Diário tem uma seção `<details>` recolhida por padrão no detalhe dos marcos associados. Mostra o nome PT-BR, inglês e a classe de evidência. Isso **não altera** instruções, ordem de atividades, riscos, 9 fases, 53 IDs de eventos, 60 IDs de conquistas, 4 checkpoints, nem `dd2_roadmap_user_progress_v3`. Uma missão aparece em mais de um marco somente quando o vínculo editorial consta da matriz; não equivale a missão concluída, prova de requisito ou relação causal.

## Próximo passo da evidência direta

Importar os arquivos locais completos após o proprietário disponibilizar uma cópia sem recursos binários licenciados em massa. Conferir os 59 pares **individualmente** com `quest_internal_id`, `title_key`, `english_literal`, `ptbr_literal`, `source_pak`, `resource_path`, `steam_build`, `extracted_file_sha256` e a diferença de capitalização conhecida. Só então é válido promover cada um de catálogo para `PAK_COMPROVADO_NO_BUILD`. A prova de uma string no PAK não prova exibição no diário em qualquer estado, cronologia, consequências, falha ou gatilho de conquista.

**Segurança:** código de progresso e `storage.ts` intocados. Não marcar rota 100% homologada. Protocolo da issue #13, com testes estáticos/CI por confirmar na PR.

# Auditoria de cobertura por evidência de quests da instalação — 13/10/2026

## Por que este passo vem depois de 80/80

O catálogo histórico PowerPyx de 2024 já possui **80 de 80 guias** na `main` após PR #54, mas não prova a cobertura do build instalado em outubro/2026 nem da expansão. Em 11/10, uma extração read-only reportada e documentada para a instalação Steam `25290080` encontrou **125 chaves `_log_title` distintas** (89 no conjunto base e 36 no DLC). O CSV versionado `docs/audit/game-localization-evidence.csv` **não contém as 125 linhas**: guarda somente **59 pares** EN/PT-BR com chave e hash de arquivo. Nem toda chave é necessariamente uma missão distinta no diário.

A primeira entrega deste ciclo é um comparador *read-only* capaz de cruzar essa evidência parcial com as fichas e o índice de títulos existentes, preservando suas divergências. Não importa recursos protegidos, não edita saves e não faz alegação de cobertura completa.

## Executar

Com dependências instaladas (`npm install`):

```bash
node --import tsx scripts/report-installed-quest-evidence.mjs > /tmp/dd2-evidence-coverage.json
# Para uma nova extração com o mesmo esquema CSV (sem tocar no CSV de base):
node --import tsx scripts/report-installed-quest-evidence.mjs --input caminho/novo-inventario.csv
npm test
```

O formato esperado é o cabeçalho de `docs/audit/game-localization-evidence.csv`. Campos obrigatórios: `quest_internal_id`, `title_key`, `english_literal`, `ptbr_literal`, `source_pak`, `resource_path`, `steam_build`, `extracted_file_sha256`, `evidence_type` e `status`.

O auditor rejeita amostras sem metadados essenciais, hashes SHA-256 com formato inválido, identificadores ou títulos repetidos, origens PAK fora dos padrões conhecidos, linhas não marcadas como `GAME_DATA_CURRENT_BUILD / OFICIAL_COMPROVADO` e misturas de builds. **Esses checks validam consistência do registro, não autenticidade criptográfica:** os hashes continuam reportados no CSV até alguém recalculá-los a partir dos arquivos de origem.

As linhas de saída mantêm ID, chave, build, origem base/DLC, caminho do recurso, hash, literal EN/PT-BR, guia correspondente e divergências exatas de título. A saída inclui `observedWithoutGuide`, `observedNotInNameIndex`, `indexPtBRConflicts` e `guidePtBRConflicts`. `publishedGuidesOutsideSample` significa **fora da amostra**, não ausente do jogo.

## Amostra atual: quatro títulos sem walkthrough individual

No subconjunto de 59 títulos registrado, são conhecidas quatro entradas do índice sem ficha completa:

| EN observado | PT-BR já indexado | Situação |
|---|---|---|
| The Hand That Guides | A Mão que Guia | base: guia ausente |
| One-Eyed Interloper | Intruso de um Olho Só | base: guia ausente |
| Chilling Tidings | Notícias Congelantes | DLC: guia ausente |
| Lost Rites | Rituais Perdidos | DLC: guia ausente |

Essas quatro lacunas **não constituem a lista de tudo que falta**. As 23 entradas do índice fora da amostra de 59 e os 25 guias fora da amostra também não podem ser classificados como ausentes no jogo. Os catálogos comunitários de Dark Arisen permanecem provisórios, com dupla classificação e agrupamentos de título; não converter listas editoriais em IDs oficiais.

## Critério de avanço da issue #37

1. Registrar as demais linhas da extração (`_log_title` de base/DLC), com prova de origem e uma classificação conservadora para títulos de missão, variações de estado, conteúdo agregado e não missões. **Não derivar ID de posição em tabela comunitária**.
2. Comparar IDs e conteúdo do build com 80 históricos + títulos EN/PT-BR + fichas e marcos; documentar títulos/IDs faltantes e casos ambíguos. O script atual cruza somente linhas estruturadas sem inferir categorias de quest.
3. Produzir guias das lacunas com walkthroughs citados, revisar estado do diário e efeitos em saves reais; dar prioridade a pontos sem retorno, prazos e às quests da expansão.
4. Antes de afirmar completude, verificar a exaustividade dos IDs do build e a execução dos passos sensíveis em jogo. Build verde e leitura de CSV não substituem essa prova.

**Sem mudanças em** `src/`, `dd2_roadmap_user_progress_v3`, 53 marcos, 60 conquistas, interface e dados editoriais. Relacionado à [issue #37](https://github.com/Umbraeon/dd2/issues/37) e aos relatórios `docs/audit/game-localization-extraction-report.md` e `docs/implementation/side-quests-historical-closure-wave-19-2026-10-12.md`.

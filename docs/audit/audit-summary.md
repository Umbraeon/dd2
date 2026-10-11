# Auditoria factual PT-BR — consolidação da Missão 04

**Data:** 2026-10-11 · **Branch:** `audit/factual-ptbr-2026-10-10` · **PR:** #17 (mesclada após a consolidação) · **Estado geral:** **PARCIAL; NÃO HOMOLOGADO EM GAMEPLAY**.

## Escopo e método

- Inventário preservado: 53 marcos editoriais, 60 conquistas, 9 fases, 10 enigmas, 12 mestres, 8 carnes, 4 checkpoints e 59 títulos canônicos de quests.
- Nenhum jogo, save, conquista ou vídeo foi executado nesta tarefa. As transcrições fornecidas pelo YouTube foram lidas como evidência contextual.
- O build Steam instalado `25290080` foi listado e teve somente 133 contêineres `questlog` extraídos em modo de leitura, fora do repositório: 97 base e 36 DLC.
- A revisão de produção considerou o código efetivamente presente em `origin/main@6fe3b38`, além do histórico das PRs #19 e #20.

## Resultados consolidados

1. **Playlist:** criador **Romar**; título **Dragon's Dogma 2 Detonado Platina/todas as Quests**.
2. **Cobertura:** 43 episódios identificados, 43/43 transcrições inspecionadas e nenhuma indisponibilidade real.
3. **Evidência de transcrição:** 23 registros na passagem temática, 76 no passe 1 e 77 no passe 2, consolidados em 176 registros únicos: 6 `CORROBORADO`, 2 `CONTRADITO`, 1 `DIVERGENTE`, 153 `PARCIAL` e 14 `NAO_VERIFICADO`.
4. **Nomenclatura do build:** 59/59 títulos canônicos ligados a ID, chave, literal inglês e literal PT-BR; 58 títulos foram promovidos, 1 foi retido como `OFICIAL_COMPROVADO` e 0 ficaram apenas `LOCALIZACAO_EXTRAIDA` ou `NAO_CONFIRMADO`.
5. **DLC:** `Chilling Tidings` → **Notícias Congelantes**; `Lost Rites` → **Rituais Perdidos**.
6. **Playlist como fonte:** aceita como quinta referência `GUIA_COMUNITARIO_VIDEO / REFERENCIA_CONTEXTUAL`; não é fonte primária, não prova completude e não cobre DLC/updates de 2026.
7. **P0:** nenhum demonstrado.
8. **PR #19:** `SUPERADA/FECHADA`, sem merge; a substituta PR #20 foi integrada e os três P1 textuais históricos não permanecem em produção.
9. **Auditoria geral:** **PARCIAL**, pois timers, alternativas irreversíveis, saves, troféus e condições de gameplay continuam sem reprodução suficiente.

## Evidência de localização

O RETool v0.241 descriptografou os TOCs e extraiu seletivamente contêineres `GMSG`. O parser-fonte validou offsets, idiomas e hashes antes de expor as chaves `_log_title`. A matriz [game-localization-evidence.csv](game-localization-evidence.csv) preserva ID, chave, PAK, caminho e SHA-256.

- **58** registros coincidiram literalmente com o inventário anterior.
- **1** capitalização inglesa foi corrigida: `Mercy among Thieves`.
- O vínculo de 59 títulos ao build é **OBSERVED**; sua apresentação em cada estado do diário e seus gatilhos de gameplay permanecem **UNKNOWN**.

Procedimento completo: [game-localization-extraction-report.md](game-localization-extraction-report.md).

## Estado de produção após as PRs #19 e #20

A PR #19 (`4fcbd983`) foi fechada sem merge em 11/10/2026. Sua revisão encontrou três P1 textuais. A PR #20 foi mesclada no `main` como `925f5d5`, com check remoto `build` aprovado, e corrigiu os três pontos no caminho consumido pela UI:

| Objeto | Estado atual em `main@6fe3b38` | Classificação |
|---|---|---|
| `m02` / Accardo | O texto registra outcomes de sucesso e morte no questlog; prazo e nexo temporal continuam não reproduzidos. | Correção **OBSERVED** no código; timer **UNKNOWN**. |
| `m04` / Lennart | A sequência agora explicita `barris → Lennart → veneno → Lennart`. | Correção **OBSERVED** no código e coberta por regressão textual. |
| `sphinx_diff` | Dante e Vergil são posicionados ao norte/sul do mesmo portão da Cidade de Descanso da Fronteira; o texto proíbe ir ao centro de Bakbattahl. | Correção **OBSERVED** no código e coberta por regressão textual. |

Os commits posteriores `05fc0e4` e `6fe3b38` integraram os 59 nomes PT-BR e sua exibição nas orientações. A revisão histórica e a reavaliação atual estão em [pr19-current-review.md](pr19-current-review.md).

## Achados ainda prioritários

| Objeto | Grau | Conclusão atual |
|---|---|---|
| `v302` | P2 | Os três dias começam após aceitar reunir provas; o gatilho completo de disponibilidade continua divergente. |
| `p04/p06` | P1 pendente de runtime | O aviso antes de `A New Godsway` é prudente; instante universal e recuperação por save não foram reproduzidos. |
| `p05/u06` | P1 pendente de runtime | Flecha, autosave, momento do troféu e compatibilidade com `Eu, Talos` não estão homologados. |
| `u04` | P1 pendente de runtime | Existem cinco linhas de evacuação; o gatilho exato de `O Guardião` não foi reproduzido. |
| `u05/u08` | P1 pendente de runtime | Marcador azul, provas e feixe vermelho final são distintos; contagens e limite de repousos continuam abertos. |
| `d01` | P1 pendente | Os nomes PT-BR estão resolvidos; rota, NPCs e bloqueio no Mundo Desancorado ainda precisam de segunda prova ou runtime. |

## Decisão de fontes e governança

Referências principais por função: Steam/Capcom para escopo oficial e versões; dados do build 25290080 para chaves e literais; Kiranico para navegação contextual; guia Steam 2024 e playlist de Romar para rotas comunitárias. Nenhuma fonte isolada prova consequências invisíveis.

Por decisão do proprietário em 11/10/2026, tarefas futuras de implementação serão executadas por **GPT/Codex**, com revisão técnica do Head antes de qualquer pedido de teste runtime. Esta decisão substitui a atribuição anterior de implementação para este trabalho.

## Próxima decisão

**Evidência atual:** cobertura textual e nomenclatura `OBSERVED/SUPPORTED`; gameplay de alto risco ainda `UNKNOWN/PARTIAL`.

**Ação exata:** priorizar um experimento runtime precommitado para uma lacuna P1 por vez, começando pelo comportamento de saves e pelo ponto de não retorno de `A New Godsway`; nenhuma nova correção dos três P1 históricos da PR #19 é necessária.

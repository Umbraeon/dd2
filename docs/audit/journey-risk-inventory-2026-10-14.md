# Triagem de riscos da Jornada — 14/10/2026

## Finalidade
Há 72 marcos editoriais e 82 fichas de missão, mas não existe validação in-game para todas as flags `isTimed` e `isMissable`. A presença de URL ou um teste de texto não comprova a condição de disparo da afirmação. Antes de modificar alertas visíveis, gerar o inventário reproduzível:

```sh
node --import tsx scripts/report-journey-risks.mjs > journey-risks.md
node --import tsx scripts/report-journey-risks.mjs --json > journey-risks.json
```

A saída identifica risco textual, flags editoriais, URLs declaradas e quantidade de guias vinculados por marco. **Não atribui confiança nem transforma fonte vinculada em afirmação verificada.** `grouped` exige auditoria por missão, pois o tempo de uma quest não se estende automaticamente às demais do mesmo marco.

## Critérios para próximos patches
1. Relacionar a afirmação ao **gatilho específico**, missão e consequência documentada; distinguir `temporizada`, `perdível`, `risco de conquista` e `ponto sem retorno`.
2. Conferir fonte primária ou fontes comunitárias independentes e anotar divergências; registrar build, screenshot e estado do save se a alegação depender de comportamento do jogo.
3. Corrigir apenas casos cuja evidência sustente a mudança; não remover avisos de segurança sem demonstrar sua falsidade.
4. Preservar os 72 IDs, 82 fichas, 60 conquistas e armazenamento `dd2_roadmap_user_progress_v3`.

Esta entrega é ferramenta de auditoria read-only; não altera a ordem da Jornada, não confere gameplay e não valida factualidade de flags existentes.

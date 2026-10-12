# Correção — O Julgamento do Feiticeiro exibido no capítulo de Melve

**Data:** 12/10/2026 · **Solicitação do proprietário:** por que `The Sorcerer's Appraisal` aparece em Melve, se é acessível pela rota de Vernworth?

## Causa verificada na main

- `src/data/questGuides.ts`: o guia `sorcerers_appraisal` descrevia corretamente `region: Cidade de Descanso da Fronteira`, mas `relatedEventIds: ['m03','v206','p03']` anexava a ficha integral ao marco `m03` do capítulo **Melve**.
- `src/data/questNameIndex.ts` repetia esse vínculo enganoso.
- `roadmapData.ts`, marco `m03`, agrupava uma preparação paralela de grimórios com as missões locais de Beren e Trysha e não explicava o deslocamento posterior de Myrddin.
- Resultado: jogador podia interpretar equivocadamente que a missão de Myrddin deveria ser iniciada em Melve. A localização do guia e o vínculo de navegação eram contraditórios.

## Fonte e decisão

- [PowerPyx — The Sorcerer's Appraisal](https://www.powerpyx.com/dragons-dogma-2-the-sorcerers-appraisal-walkthrough/): `Starting Location: Checkpoint Rest Town`, `Quest Giver: Myrrdin`, após `Seat of the Sovran`.
- [Game8 — The Sorcerer's Appraisal](https://game8.co/games/Dragons-Dogma-2/archives/The-Sorcerers-Appraisal): inicia na residência de Myrddin na cidade fronteiriça com traje de corte; roupas podem ser obtidas em Vernworth.
- [PowerPyx — Spellbound](https://www.powerpyx.com/dragons-dogma-2-spellbound-walkthrough/): Trysha fica na casa de Eini, ao norte de Moonglow Garden, perto de Melve.
- [GamesRadar — Spellbound and Sorcerer's Appraisal](https://www.gamesradar.com/dragons-dogma-2-sorcerers-appraisal-spellbound/): missões independentes, compartilhando a lista de grimórios.

**Solução mínima:** remover apenas `m03` dos vínculos de Myrddin (guia e índice), preservar `v206` na fase Vernworth parte 2 e `p03` na síntese de Mestres; explicitar o caminho Vernworth → Checkpoint Rest Town no guia e no texto de `v206`. Preservar `m03` para Trysha e Beren. O marco `m03` menciona Myrddin como destino *futuro*, não como guia de missão local.

## Controle de qualidade e limites

- Testes unitários de vínculo e fase, E2E em mobile de Melve e Vernworth2, checagem de ausência de scroll horizontal e nenhuma escrita no localStorage.
- Não modifica a chave `dd2_roadmap_user_progress_v3`, nenhum ID/ordem dos 53 marcos ou IDs de conquistas; apenas texto editorial e quais fichas se mostram em cada marco.
- Títulos PT-BR `paired_catalog` não equivalem a nova extração verificada de jogo instalado. Fontes são walkthroughs; sem gameplay testado em saves da build atual.
- **Trade-off:** a fase editorial ainda se chama Vernworth parte 2, embora o destino físico seja a Cidade de Descanso da Fronteira. O rótulo da atividade aponta explicitamente a cidade para eliminar ambiguidade, sem criar um décimo capítulo ou alterar salvamentos.

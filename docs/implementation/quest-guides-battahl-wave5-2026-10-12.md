# Fichas individuais — onda 5 (Battahl)
**Referência de trabalho:** 12/10/2026 · issue #27 · base `main@940c8962`

## Alterações
Três fichas, de 26 para 29, sem alterar marcos, conquistas ou `localStorage` v3:

| ID | EN | PT-BR já registrado | Marcos |
| --- | --- | --- | --- |
| mercy_thieves | Mercy among Thieves | Piedade entre Ladrões | b01, b02 |
| shadowed_prayers | Shadowed Prayers | Orações Ensombradas | b02 |
| poisonous_proposal | A Poisonous Proposal | Uma Proposta Venenosa | b02 |

## Pontos de decisão
**Mercy among Thieves:** fontes diferem na descrição do NPC inicial (PowerPyx destaca Lyssandro, Game8 menciona Tobias). O roteiro manda conversar com os guardas da fronteira e Lyssandro, ajudar Toumi e avançar pela estrada até Hugo e o esconderijo. Não confundir com `Off the Pilfered Path`, missão posterior de Hugo.

**Shadowed Prayers:** abordagem urgente após Menella iniciar a cerimônia; procurar suspeito por cabelo preso, ferimento no braço direito e roupa azul escura, e **agarrar**, não atacar indiscriminadamente. Não afirmar prazo exato em minutos nem recarga automática para corrigir erro.

**A Poisonous Proposal:** Jarle inspeciona o personagem enquanto o veneno de Asp e Venin Harpy está **ativo**; no terceiro experimento Jarle, não o jogador, precisa ser envenenado pela cauda da quimera; retorno final ao NPC.

## Links diretos por missão
- https://www.powerpyx.com/dragons-dogma-2-mercy-among-thieves-walkthrough/
- https://game8.co/games/Dragons-Dogma-2/archives/Mercy-Among-Thieves
- https://www.powerpyx.com/dragons-dogma-2-shadowed-prayers-walkthrough/
- https://game8.co/games/Dragons-Dogma-2/archives/Shadowed-Prayers
- https://www.powerpyx.com/dragons-dogma-2-a-poisonous-proposal-walkthrough/
- https://game8.co/games/Dragons-Dogma-2/archives/A-Poisonous-Proposal

## Limites
O título PT-BR vem do índice já versionado (`paired_catalog` para 2, `pak_sample_reported` para `Mercy among Thieves`); isso não demonstra runtime testado. Os walkthroughs públicos são guias históricos e os gatilhos não foram reproduzidos na atualização corrente. Critério de aceite: TypeScript, unitários, build e Playwright; não alegar teste com jogadores nem 100% de cobertura.

# Guias individuais — onda 4: Brant, Harve e Gregor

**Data:** 11/10/2026  
**Issue:** #27 — cobertura por missão  
**Base:** main a30e7cb70db518b84bfefafe6c4e323184a6e42b (22 guias)

## Escopo

Quatro fichas individuais foram adicionadas à biblioteca existente, sem criar novos marcos de progresso e sem tocar em localStorage:

| ID da ficha | PT-BR usado no índice existente | EN | Marcos vinculados |
| --- | --- | --- | --- |
| `monster_culling` | Elimine os Monstros | Monster Culling | v201 |
| `scaly_invaders` | Invasores Escamosos | Scaly Invaders | v201, v202 |
| `trouble_cape` | As Mãos Atadas que Abraçam a Causa | Trouble on the Cape | v202, v303 |
| `till_death` | Até que a Morte Nos Separe | Till Death Do Us Part | v203 |

A biblioteca passa de **22 para 26 fichas**. Os 53 marcos editoriais, os 60 IDs de conquistas, os oito itens de falsificação, as chaves e os backups v3 não mudam.

## Verificações por duas fontes

Cada guia possui dois links diretos no próprio objeto `references`.

- Monster Culling: PowerPyx + Game8 confirmam os três locais (Trevo, Harve e Floresta Oriental) e o relatório noturno a Brant. O conteúdo não obriga ordem fixa entre as três regiões.
- Scaly Invaders: PowerPyx + Game8 confirmam duas invasões separadas por retorno posterior a Harve; uma única luta não equivale à missão concluída.
- Trouble on the Cape: PowerPyx + Game8 confirmam Ulrika, resgate de Zoran na Stormwind Cave e retorno à vila. Há diferenças nas descrições do gatilho absoluto, não publicadas como regra universal.
- Till Death Do Us Part: PowerPyx + Game8 confirmam Oswald, Margit, Gregor, o Pântano Nebuloso e o retorno. **Divergência:** Game8 permite o desfecho com Gregor vivo mesmo se o Dullahan escapar; PowerPyx exige a derrota para a conquista. O guia separa sobrevivência de Gregor e conquista por abater o chefe.

## Pendências internas

1. Os títulos PT-BR desta onda foram reutilizados de `src/data/questNameIndex.ts`, onde estão marcados `paired_catalog`. Isso **não é homologação primária de todas as traduções pelo build**.
2. Não foram reproduzidos em save real os diferentes gatilhos de Harve. A missão de Wilhelmina fica em PR próprio até sua verificação. Ver `docs/audit/critical-checkpoints-review-2026.md`.
3. `An Unsettling Encounter` permanece fora desta onda porque o nome PT-BR primário ainda não consta do índice: não gerar tradução.
4. **Cobertura não é completa**: 26 fichas não podem ser anunciadas como porcentagem das quests.

## Aceite do PR

- `npm run lint`, `npm test`, `npm run build` e `npm run test:e2e` verdes no CI.
- Busca de fichas e consulta mobile, sem escrita ao abrir guias.
- Confirmar que a consulta das fichas não altera progresso v3.
- Não integrar se houver regressão crítica de mobile, busca, conteúdo ou dados.

## Decisão de escopo do Head (12/10/2026)

A ficha `every_rose` foi retirada desta onda. A investigação de Wilhelmina tem gatilho dependente de estado/afinidade e prazo após aceite: será tratada em PR independente, sem alegar reprodução em saves reais. Esta separação permite revisar e integrar as quatro rotas de Brant/Harve/Gregor com seus testes, sem assumir que a UI de Wilhelmina foi validada.

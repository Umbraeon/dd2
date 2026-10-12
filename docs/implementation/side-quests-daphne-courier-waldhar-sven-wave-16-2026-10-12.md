# Onda 16 — Daphne, Donovan, Waldhar e Sven

Data editorial: 12/10/2026. Esta onda completa a dependência `The Gift of Giving` da missão de Sebastian publicada na onda 15; acrescenta três missões secundárias de Vernworth/Bakbattahl. Referências de **walkthroughs de terceiros** e nomes PT-BR de Kiranico, sem teste em save.

## Novas fichas
| EN | PT-BR da Kiranico | Marcos | Itens e decisões |
|---|---|---|---|
| The Gift of Giving | A Dádiva da Caridade | v103 | Daphne nos Cortiços: 1 buquê fresco, 1 minério prata, 2 ouro, remédios contra intoxicação. **DIVERGÊNCIA**: PowerPyx e GamerGuides pedem 5; Game8 pede 3. Levar 5 por precaução e seguir quantidade do diário, sem inventar certeza |
| Oxcart Courier | Correio por Carroça | v102 | Donovan entrega Letter to Ser Lennart na estação norte de Vernworth; entregar a Lennart em Melve e voltar a Donovan. Ataques podem destruir carroça: **ir a pé continua válido** |
| A Magisterial Amenity | Cortesia Magisterial | v103, v301 | Waldhar no arquivo sob Casa Mãos Caridosas após missões prévias; Exquisite Spectacles no depósito do Salão de Máscaras. Winter’s Path é **recompensa posterior**, não material para buscar |
| A Veil of Gossamer Clouds | Um Véu de Finas Nuvens | v304, b02 | Sven entrega Unfinished Letter; **rota melhor** é recuperar Letter to Lord Phaesus no Laboratorium Workshop #2, entregar a Sven: relatos de 20.000 G + Ferrystone. Rota de Waldhar mais curta relata 14.000 G e sem Ferrystone |

## Rastreabilidade
- Catálogo PT-BR: https://dragonsdogma2.kiranico.com/pt-BR/data/quests; tipos de evidência `kiranico_ptbr` e **não** `pak_sample_reported`.
- https://www.powerpyx.com/dragons-dogma-2-the-gift-of-giving-walkthrough/
- https://game8.co/games/Dragons-Dogma-2/archives/The-Gift-of-Giving
- https://www.gamerguides.com/dragons-dogma-2/guide/side-quests/vernworth/the-gift-of-giving-walkthrough
- https://www.powerpyx.com/dragons-dogma-2-oxcart-courier-walkthrough/
- https://clair.6fast.com/dragons-dogma-2/guide/side-quests/vernworth/oxcart-courier-walkthrough
- https://www.powerpyx.com/dragons-dogma-2-a-magisterial-amenity-walkthrough/
- https://www.powerpyx.com/dragons-dogma-2-a-veil-of-gossamer-clouds-walkthrough/
- https://www.neoseeker.com/dragons-dogma-2/guides/A_Veil_of_Gossamer_Clouds

## Controles e limites
- **70 guias / 80 quests** do catálogo PowerPyx 2024 (16/16 principais, 54/64 secundárias), restam **10 secundárias**. Comparador não é totalidade garantida da build ou DLC.
- Índice EN/PT-BR **70 → 74 títulos**, cinco ainda sem guia no índice; CSV **93 → 101 registros** de 70 missões. **46 guias com itens/entregas**, 24 sem materiais exigidos.
- As quatro fichas têm proveniência secundária; nomes PT-BR de missões são de catálogo localizado, nomes de inventário fora de verificação primária seguem explicativos, com `item_id` vazio.
- Corrente Daphne → Sebastian agora contém ambas as fichas. Não confundir Letter to Ser Lennart, Unfinished Letter, Letter to Lord Phaesus nem carta da Carroça Fantasma.
- O número de remédios de Daphne **não está conciliado** nas fontes: explicitar 3 vs 5 e orientar seguir diário; não anunciar como validado em save.
- Sem mudanças nos **53 marcos**, **60 conquistas**, `dd2_roadmap_user_progress_v3` ou UX. Testes unitários e quatro Playwright mobile protegem distinções e alertas.

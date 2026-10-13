# Onda 19 — fechamento das 80 missões do comparador histórico

Escopo de 12/10/2026: quatro missões secundárias, preservando estrutura, interface, IDs, 53 marcos, 60 conquistas e chave `dd2_roadmap_user_progress_v3`.

| Missão EN / título PT-BR do Kiranico | Evento(s) | Decisão crítica |
|---|---|---|
| A Case of Sculptor's Block / A Inspiração de um Escultor | b02 | Duração da luta e petrificação por cabeça ativa de Medusa OPCIONAL afetam a qualidade e recompensa da estátua; não mate grifo cedo |
| A Noble Exchange / Uma Nobre Troca | v104 | Paragon Staff como prova de roubo; opções descartar no biombo, aceitar inspeção e/ou capturar o nobre ladrão; relatos divergentes sobre ouro e posse futura |
| 'Twixt a Rock and a Hard Place / Entre Dois Fogos | b02, p04 | Duas cartas em ordem: Akakios → Ernesto → Barbas; Ernesto pode morrer na patrulha, ressuscitação com Wakestone condicional |
| Crossing in Shadow / Cruzando às Sombras | b02 | Casa própria + Como uma Vela na Tempestade; Nadinia incógnita; recusar ajudar fugitivo para evitar prisão; pagar 1.000 G por medicamento é opcional |

## Fontes e conflitos mantidos visíveis
- Títulos PT-BR: https://dragonsdogma2.kiranico.com/pt-BR/data/quests e versão EN https://dragonsdogma2.kiranico.com/en/data/quests . Categoria `kiranico_ptbr`, NÃO inferir extração de arquivo local ou questlog ID.
- Escultor: https://www.powerpyx.com/dragons-dogma-2-a-case-of-sculptors-block-walkthrough/ ; https://www.neoseeker.com/dragons-dogma-2/guides/A_Case_of_Sculptors_Block ; https://game8.co/games/Dragons-Dogma-2/archives/A-Case-of-Sculptors-Block ; https://www.gameskinny.com/tips/how-to-use-the-withered-medusa-head-in-dragons-dogma-2/ . Poder da cabeça se deteriora e a rota sem Medusa é possível. Neoseeker distingue 7.000 / 14.000 / 18.500 G, enquanto outros guias mostram apenas faixas de 7.000 e 18.500 G. Valores reportados, não garantidos por teste no save atual.
- Baile: https://www.powerpyx.com/dragons-dogma-2-a-noble-exchange-walkthrough/ ; https://www.neoseeker.com/dragons-dogma-2/guides/A_Nobles_Exchange ; https://game8.co/games/Dragons-Dogma-2/archives/A-Noble-Exchange . PowerPyx diz 7.500 G se capturar o culpado, sem citar descarte prévio; Neoseeker e Game8 documentam a rota **descartar Paragon Staff + capturar ladrão** para evitar suspeita e permitir a compra futura do bastão por 60.000 G com Ibrahim. Não consolidamos as alternativas incompatíveis em promessa de recompensa única.
- Cartas: https://www.powerpyx.com/dragons-dogma-2-twixt-a-rock-and-a-hard-place-walkthrough/ ; https://game8.co/games/Dragons-Dogma-2/archives/Twixt-a-Rock-and-a-Hard-Place ; https://www.neoseeker.com/dragons-dogma-2/guides/Twixt_A_Rock_and_a_Hard_Place . O número de item_id e o título exato das cartas não foram extraídos; a diferenciação por destinatário é editorial.
- Nadinia: https://www.powerpyx.com/dragons-dogma-2-crossing-in-shadow-walkthrough/ ; https://dragonsdogma2.kiranico.com/pt-BR/data/quests . Aceitar ajudar o fugitivo aciona prisão/falha segundo walkthrough; falar com comerciante e pagar 1.000 G é opcional. Mantenha peões fora da escolta e siga Vera.

## Integridade e limites
- Comparador PowerPyx 2024: **80 de 80 guias históricos** (16 principais, 64 secundários). Isto NÃO significa todas as quests da build 2026 ou da expansão, que continuam sem checklist independente contra questlog/PAK/save.
- **82 pares EN/PT-BR** no índice editorial; 4 títulos pareados nesta onda. Há ainda 2 guias sem índice de localização (Hunt for the Jadeite Orb, Tolled to Rest), embora estejam publicados.
- **52 guias com itens ou objetos condicionais; 28 sem itens**. **116 linhas de proveniência CSV** além do cabeçalho.
- Os 53 eventos, 60 conquistas, 9 capítulos e estado persistente v3 são intocados; nenhum componente ou CSS modificado. Novos testes unitários e Playwright cobrem sequência, condições, texto localizado e ausência de escrita no armazenamento.
- QA de CI não substitui validação humana de jogabilidade e acessibilidade. Mesmo após CI verde, issues #13, #27 e #37 continuam abertas para revisão factual e inventário da build. Ao publicar PR, registrar status do commit exato, não apenas sucesso anterior.

# Onda 9 — início do Mundo Desancorado (12/10/2026)

## Objetivo
Cobrir três missões centrais que orientam o jogador após `Legado`, sem redesenhar a interface, criar novos marcos de progresso nem afirmar verificação em save real.

## Alterações
- `Dreams Apart` / `Destinos Separados` → guia `dreams_apart`, marco `u03`. Confirma Phaesus **no andar superior do Laboratório de Pesquisa de Magia Proibida em Bakbattahl**. A redação anterior de `u03` mandava recuperar o peão no Santuário do Leito Marinho, confundindo o lugar da recuperação com o hub das evacuações; corrigida sem mudar seu ID.
- `Halls of the First Dawn` / `Átrios da Primeira Aurora` → `halls_first_dawn`, marcos `u04` e `u08`. Distingue a interação no santuário ligada à evacuação do **feixe vermelho final** e enumera as cinco áreas. Não afirma quantidade universal de feixes periféricos.
- `The Regentkin's Resolve` / `A Determinação do Príncipe Regente` → `regentkins_resolve`, marco `u04`. Explica Brant → Sven → Disa → carroças / Allard → Sven, sem inventar item de inventário.
- Todos os títulos PT-BR foram **reutilizados do índice editorial** `QUEST_NAME_INDEX`, com evidência `paired_catalog`; não são alegados como extração PT-BR adicional da instalação.
- Três guias classificados sem itens exigidos de inventário conhecidos. Atualizados CSV, registros protegidos e testes.
- Cobertura histórica de 80 missões de fonte de 2024: **37 → 40 fichas**, **43 → 40 sem guia**, das quais **7 principais** e **33 secundárias**. Índice editorial de 59 títulos: **23 → 20** ainda sem guia. A comparação não constitui garantia de cobertura atual da build/DLC.

## Referências (fontes secundárias)
- Dreams Apart: https://www.powerpyx.com/dragons-dogma-2-dreams-apart-walkthrough/ e https://game8.co/games/Dragons-Dogma-2/archives/Dreams-Apart
- Halls of the First Dawn: https://www.powerpyx.com/dragons-dogma-2-halls-of-the-first-dawn-walkthrough/ e https://game8.co/games/Dragons-Dogma-2/archives/Halls-of-the-First-Dawn
- The Regentkin's Resolve: https://www.powerpyx.com/dragons-dogma-2-the-regentkins-resolve-walkthrough/ e https://game8.co/games/Dragons-Dogma-2/archives/The-Regentkins-Resolve

## Riscos e limites
- Não há gameplay nem observação de saves nesta onda; decisões de estado, ativação precisa da missão e intervalos de descanso podem variar. Texto sobre feixes prioriza alertar sem descrever como universal um número fixo de provas.
- Preservados `dd2_roadmap_user_progress_v3`, 53 IDs de marcos e 60 conquistas. Os guias não concluem automaticamente nada.
- A ficha continua detalhada sob `details` na Consulta; simplificação geral da UX/textos fica para rodada própria.

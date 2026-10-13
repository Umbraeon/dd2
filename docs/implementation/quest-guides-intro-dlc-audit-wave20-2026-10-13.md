# Onda 20 — duas quests do prólogo/estrada e verificação inicial da expansão

**Data:** 13/10/2026. **Escopo:** manter 80/80 fichas do comparador histórico de 2024; adicionar as duas missões já observadas entre os 59 títulos do CSV do build Steam 25290080 que não eram parte do catálogo PowerPyx; registrar evidências conservadoras de duas quests DLC sem criar walkthroughs com desfecho presumido.

## Fichas publicadas

| Quest EN | Nome PT-BR | Questlog observado | Marco | Origem dos passos |
| --- | --- | --- | --- | --- |
| The Hand That Guides | A Mão que Guia | Chave no CSV versionado de 2026 | `m01` | Objetivos literais no catálogo Kiranico EN/PT-BR: defender-se do monstro, fugir |
| One-Eyed Interloper | Intruso de um Olho Só | Chave no CSV versionado de 2026 | `v101` | Kiranico EN/PT-BR + Game8: ciclope da estrada para Vernworth, tática opcional da cachoeira, Missive to the Captain de Gregor depois da batalha |

- A Mão que Guia é uma sequência **interna ao prólogo**, entre O Despertar na Prisão e A História se Inicia: não transformar a fuga num objetivo de voltar à escavação nem exigir vitória permanente contra o inimigo.
- Intruso de um Olho Só diferencia tática opcional para o ciclope, objetivo de atravessar a estrada e item **recebido depois** do combate. A carta de Gregor é uma recompensa/nexo de história, não um item que o jogador deva procurar ou falsificar previamente.
- Sem requisito de item para ambas no contrato `QUESTS_WITHOUT_ITEM_REQUIREMENTS` e com duas linhas correspondentes em `docs/audit/dd2-installed-item-evidence.csv`, marcadas `FONTE_SECUNDARIA` para lógica de gameplay.
- Fontes: [Kiranico PT-BR](https://dragonsdogma2.kiranico.com/pt-BR/data/quests), [Kiranico EN](https://dragonsdogma2.kiranico.com/en/data/quests), [Game8 — One-Eyed Interloper](https://game8.co/games/Dragons-Dogma-2/archives/One-Eyed-Interloper). **Não houve teste manual em save real.**

## DLC Dark Arisen — evidência de entrada em vez de promessa de conclusão

Detalhes estruturados e avaliáveis por teste: `docs/audit/dlc-entry-quest-evidence-2026-10-13.json`.

| Quest EN → PT-BR | Verificado por extração versionada | Consenso externo (não verificado em save) | Ainda não verificado |
| --- | --- | --- | --- |
| Chilling Tidings → Notícias Congelantes | Chave de título do DLC e literal PT-BR constam do CSV de evidência do build 25290080 | Brant à noite no Stardrop Inn, opção de diálogo *About the new Arisen…*; recomendação de nível 40 | Objetivo de Shakir e travessia até Norgan (um walkthrough com detalhes), finalização e gatilhos em vários estados da história |
| Lost Rites → Rituais Perdidos | Chave de título agregada `Mes_CONTENTS_0014_log_title` no CSV; não atribuir a ela uma quest individual `quNNNNNN` inexistente | Brant à noite, opção *About the uncovered ruins…*; nível 20 recomendado, não bloqueio obrigatório | Momento exato da bússola, IDs dos desafios, portas Spellseal, conclusão global e eventual inventário independente por desafio |

Fontes recentes de outubro/2026:
- [VGC — entrada e níveis recomendados](https://www.videogameschronicle.com/guide/dragons-dogma-2-how-to-start-the-dark-arisen-dlc-recommended-levels/).
- [VGC — portas Spellseal e Empowered Godsbane Blade](https://www.videogameschronicle.com/guide/dd2-dark-arisen-open-the-dlc-spellseal-doors-in-the-lost-rites-quest/).
- [AllThingsHow — menu e objetivos observados na conversa com Brant](https://allthings.how/dragon-s-dogma-2-how-to-unlock-captain-brant-s-dark-arisen-menu/).
- [AllThingsHow — rota inicial até Norgan e bússola após primeiro desafio](https://allthings.how/dragon-s-dogma-2-how-to-start-the-dark-arisen-dlc-and-reach-norgan/).
- [AllThingsHow — local do monstro caído](https://allthings.how/chilling-tidings-walkthrough-in-dragon-s-dogma-2-dark-arisen-fallen-monster-location/).

**Conflito factual detectado:** VGC associa Proving Grounds Compass à conclusão de `Lost Rites`; AllThingsHow associa à conclusão do primeiro desafio. O comparador registra `conflicting`, mantém ambas as fontes e **não publica instrução temporal definitiva**. O acesso a uma Spellseal Door depende de progresso na história e, segundo VGC, de Empowered Godsbane Blade; não sugerir que qualquer porta esteja disponível logo ao iniciar DLC.

**Incerteza estrutural importante:** o CSV do build contém 59 pares ligados a chaves; o relatório original aponta 125 chaves `_log_title` extraídas, não 125 quests. O roster comunitário de DLC em `dark-arisen-candidate-quest-roster-2026-10-12.json` mantém entradas sobrepostas, uma linha possivelmente agregada e uma linha separada. Portanto não é um inventário comprovadamente completo de IDs da expansão.

## Integridade e próximo gate

- **82 guias** publicados no índice editorial: 80 correspondentes ao comparador histórico de 2024 e duas missões iniciais comprovadas no subconjunto local de localização. O índice EN/PT-BR mantém **82 pares**, agora com somente duas entradas sem guia individual — as duas da expansão. Nenhuma dessas contagens mede toda a instalação.
- Os novos IDs `hand_that_guides` e `one_eyed_interloper` entram no registro protegido; os antigos IDs e a chave `dd2_roadmap_user_progress_v3` permanecem.
- Sem alterações em `roadmapData.ts`, 53 marcos ou 60 conquistas. Testes unitários cobrem objetivos e gate de proveniência; E2E verifica busca a 390px, abertura e ausência de escrita de progresso.
- Próxima prioridade: capturar/exportar com hashes as linhas faltantes da extração local, verificar os dois gatilhos de Brant em saves reais, reconciliar os ID(s) de Lost Rites e a janela do Proving Ground Compass, só então publicar guias completos da expansão. Não escrever “todas as quests da DLC” antes disso.

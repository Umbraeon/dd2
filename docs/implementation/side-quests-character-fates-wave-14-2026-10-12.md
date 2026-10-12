# Onda 14 — missões com consequências em personagens

Data editorial: 12/10/2026. Escopo: **quatro secundárias do catálogo histórico de 2024**, sem alterações na interface e nos 53 IDs persistidos.

| Missão (nome da lista PT-BR Kiranico) | Original EN | Marco | Proteção crítica |
| --- | --- | --- | --- |
| As Rosas Têm Espinhos | Every Rose Has Its Thorn | v302, v303 | **3 dias** desde aceitar ajuda de Wilhelmina; evidências Murder Report e Bribery Investigation Findings distintas da Battahli-Crested Letter |
| A Santa dos Cortiços | Saint of the Slums | v103 | **3 Miasmites**, depois Unlabeled Medicine e Records of Treatment no porão; médico Radcliff e comando **AGARRAR** para prender Elena |
| Como uma Vela na Tempestade | A Candle in the Storm | b02, i04 | **5.000 G** para Herman, falsa informação via Ashe, proteger Nadinia e não golpeá-la durante a encenação |
| Provações do Pobre Desgarrado | Off the Pilfered Path | b02, b03 | Lanzo pode matar Hugo; rota alternativa de suborno via Ekertt até 8.500 G e trabalho condicionado aos desfechos de Wilhelmina/Isaac |

## Dependências e dúvidas
- Wilhelmina: várias fontes divergem sobre a data limite de **início** da missão e como a afinidade avança. O prazo de três dias é explícito DEPOIS da aceitação; essa é a única janela tratada como regra de missão. Na rota documentada pelo PowerPyx há dois documentos físicos, não três; a referência à carta de Allard de An Unsettling Encounter é distinta.
- Elena: Miasmite é entregue a Elena; medicina sem rótulo é entregue a Radcliff para análise, registros são recolhidos para a investigação. A prisão só dispara pelo comando agarrar após reunir provas.
- Nadinia: PowerPyx/GamesRadar descrevem a encenação como sacar/atacar na direção da imperatriz sem matá-la; a ficha opta por **sacar e aguardar a interrupção**, não prometer segurança se o usuário desferir um golpe fatal.
- Hugo: opções de suborno são uma alternativa reportada por fontes, não obrigação universal; trabalho no Rose Chateau após resolução de Wilhelmina ou na loja de Isaac **somente se o desfecho da família deixou a loja livre**. A rota de **livro falso** recomendada no Compêndio salva a família de Isaac e não libera a loja. Há relatos contraditórios sobre fugas de Hugo; não garantir resultado de um save sem testá-lo.

## Fontes
- Títulos PT-BR: https://dragonsdogma2.kiranico.com/pt-BR/data/quests (Wilhelmina já no índice editorial; Elena/Nadinia/Hugo adicionados como `kiranico_ptbr`).
- Wilhelmina: https://www.powerpyx.com/dragons-dogma-2-every-rose-has-its-thorn-walkthrough/ e https://www.rpgsite.net/guide/15670-dragons-dogma-2-every-rose-has-its-thorn-how-to-romance-wilhelmina-complete-her-quest
- Elena: https://www.gamesradar.com/dragons-dogma-2-saint-of-the-slums/ e https://game8.co/games/Dragons-Dogma-2/archives/Saint-of-the-Slums
- Nadinia: https://www.powerpyx.com/dragons-dogma-2-a-candle-in-the-storm-walkthrough/ e https://www.gamesradar.com/dragons-dogma-2-a-candle-in-the-storm/
- Hugo: https://www.powerpyx.com/dragons-dogma-2-off-the-pilfered-path-walkthrough/ e https://www.gamesradar.com/dragons-dogma-2-off-the-pilfered-path/

## Integridade
- O comparador histórico de 80 missões de 2024 passa a **62 fichas**, faltando 18 secundárias; isto NÃO é verificação exaustiva da build instalada ou DLC 2026.
- Índice editorial EN/PT-BR: 63 → **66 pares**; 5 dos indexados permanecem sem guia. CSV 77 → **84 registros** para 62 missões.
- 39 guias listam itens, provas ou ouro condicional; 23 não têm requisito inventariado conhecido.
- Novas alegações de mecânica, localização, pagamento e uso são `FONTE_SECUNDARIA`. Nomes de itens PT-BR são descritivos quando a extração primária não existe; `item_id` continua vazio.
- **Sem gameplay em saves reais**, sem mudar `dd2_roadmap_user_progress_v3`, **53 marcos**, **60 conquistas** ou componentes visuais. Testes unitários, cobertura e quatro Playwright mobile vinculam os avisos relevantes.

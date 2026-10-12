# Contrato editorial — itens necessários em TODAS as fichas de missão

**Data:** 12/10/2026 · **Base:** PR #41 integrado (`c821ca8e`). Escopo: exibir, dentro da ficha específica, quais itens levar, onde obter, quanto, como usar e quais devem ser falsificados.

## Problemas observados

1. O passo a passo de Spellbound e The Sorcerer's Appraisal nomeava os cinco grimórios sem mostrar em cada ficha **onde obter cada exemplar e o que copiar**. A aba global `Guias e cópias` continha parte da informação, mas exigia troca de contexto durante a tarefa.
2. Outras missões (ex.: Beren, Klaus, Sven, Isaac e uso da Gaol Key) também espalhavam detalhes importantes entre um resumo, etapas e materiais de consulta.
3. No prólogo `m01`, a frase "esfinge/grifo" estava factualmente errada: a criatura do escape é um **grifo**. O erro foi corrigido apenas no texto, sem alterar o ID.

## Nova regra obrigatória

Uma missão com requisito de item deve ter um bloco na **própria ficha** com, para CADA item: nome, quantidade, localização/origem, forma de obter/fabricar, para quem/como entregar, efeito de cópia/original e se a necessidade é condicional ou opcional. A busca da Consulta também deve localizar os nomes dos itens e suas origens.

A implementação guarda este conteúdo em `src/data/questItemRequirements.ts`, exibido por `src/components/QuestGuides.tsx`. O contrato é protegido por `tests/questItemRequirements.test.mjs`: qualquer novo guia precisa ter bloco de itens ou declaração expressa de **sem requisito material encontrado** em `QUESTS_WITHOUT_ITEM_REQUIREMENTS`. Essas declarações refletem o levantamento editorial em fontes externas, **não** uma auditoria definitiva de cliente/saves. O inventário cobre os 37 guias anteriores: 24 com seção de itens e 13 classificados sem requisito material verificável.

### Os cinco grimórios (mesmos títulos para as duas missões)

| Original EN | Falsificação EN | Origem / caminho | Observação |
| --- | --- | --- | --- |
| Fulminous Shield | Fruminous Shield | Dudley, em Melve; 5.000 G em guia de 2024 | Separar original antes da cópia |
| Nation's Death Knell | Nation's Death Knock | Baú da Caverna da Cascata; outro exemplar no Campo de Batalha Antigo | Outro exemplar está ligado à missão Tolled to Rest, então cuidado com o momento de retirar ou usar |
| Howling Blizzard | Hurling Blizzard | Mesmo baú da Caverna da Cascata; alternativa: troca de Fruminous Shield com Wendy, Vila Sem Nome | Abrir o baú provoca combate com Wight |
| Towering Earth | Lowering Earth | Waldhar, biblioteca subterrânea do Bairro Pobre em Vernworth, após O Magistrado Aprisionado | Voltar a falar com Waldhar se necessário |
| Let There Be Light | Let There Be Lite | Mesa do andar superior da mansão de Myrddin, Cidade de Descanso da Fronteira | Alcançar o andar por fora/varanda é opção para evitar conflito |

**Regra de entrega:** Trysha exige **originais** para seguir com recompensa completa; Myrddin aceita **falsificações**. Walkthroughs PowerPyx e Game8 descrevem três títulos diferentes como mínimo para concluir, embora peçam cinco em diálogo; cinco originais para Trysha e três cópias a Myrddin podem favorecer recompensas/afinidade, **sem garantir** resultados da build atual sem teste. Falsificar primeiro evita perder o original. O preço de 6.000 G por cópia está documentado em 2024; tratar como preço histórico. Não presumir que todos os livros são obrigatórios, nem que a forma de entrega é reversível.

Fontes consultadas: [PowerPyx — All Grimoire Locations](https://www.powerpyx.com/dragons-dogma-2-all-grimoire-locations/), [PowerPyx — Spellbound](https://www.powerpyx.com/dragons-dogma-2-spellbound-walkthrough/), [PowerPyx — Sorcerer's Appraisal](https://www.powerpyx.com/dragons-dogma-2-the-sorcerers-appraisal-walkthrough/), [Game8 — Howling Blizzard](https://game8.co/games/Dragons-Dogma-2/archives/449405), [Game8 — Tolled to Rest](https://game8.co/games/Dragons-Dogma-2/archives/Tolled-to-Rest), [GameSpot — Grimoires](https://www.gamespot.com/gallery/dragons-dogma-2-grimoires-spellbound-sorcerers-appraisal/2900-5199/).

## Resíduo factual e coleta primária

**Ainda não validado na instalação do jogo:** nomes PT-BR oficiais dos grimórios, suas chaves, preços da build atual, aceitação exata 3/4/5 na build atual, comportamento de falsificações para todas as missões, itens do DLC e efeitos em saves. Guia reescrito com nomes EN rastreáveis, sem inventar traduções. O prompt versionado `docs/implementation/executor-dd2-inventory-localization-audit-prompt-2026-10-12.md` especifica matriz de provas para o executor com DD2 instalado.

## Integridade e validação

- Sem alteração em `dd2_roadmap_user_progress_v3`, IDs dos 53 marcos, 60 conquistas ou arquitetura de backup.
- Testes verificam inventário, exigência da indicação de falsificação, rótulos no mobile, indexação de busca e prólogo sem Esfinge.
- Para qualquer item sem fonte primária, indicar origem em walkthrough; futuras correções deverão partir de dados da instalação, com evidências e revisão.

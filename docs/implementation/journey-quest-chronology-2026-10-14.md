# Jornada principal — correção de cronologia e desbloqueios (14/10/2026)

## Motivação e critério

O proprietário percebeu missões fora de ordem no **Diário/Jornada**, que ordena os marcos conforme `PHASES[].events` em `src/data/roadmapData.ts`, **não** a ordem dos 82 guias individuais. A antiga lista de 53 marcos misturava missões da campanha, missões opcionais e conquistas cumulativas, às vezes antes de se tornarem disponíveis.

Esta atualização preserva **todos os 53 IDs antigos e as 60 conquistas**, mantém **9 capítulos**, cria **9 novos IDs** (62 marcos) e não altera `dd2_roadmap_user_progress_v3`, a implementação do localStorage nem a identidade dos eventos existentes.

A ordem é **rota editorial recomendada com dependências**, não a única ordem aceita pelo jogo. Missões que começam em paralelo devem ser tratadas como tal; o app deve permitir adiar atividades ainda não disponíveis.

## Problemas corrigidos

1. **Alerta do primeiro Memento** sobe para depois do prólogo; atividade de sistemas básicos é explicitamente cumulativa, não um bloqueio para avançar a história.
2. **Melve, Beren e Brant:** missões de Flora/Lennart/Ian passam a ocorrer **após `Seat of the Sovran`**. `Beren's Final Lesson` foi separada de `Claw Them Into Shape` e posicionada depois da audiência com Brant.
3. **Vernworth:** `Seat of the Sovran`, `Disa's Plot`, `The Caged Magistrate` e `Monster Culling` agora têm etapas de história identificáveis; `The Heel of History` antecede a orientação de libertar Waldhar. `The Nameless Village` não é confundida com `Monster Culling`.
4. **Ulrika:** `Home Is Where the Hearth Is` vem após `Readvent of Calamity` **e** `An Unsettling Encounter`, sem pressupor que todas as missões destravam no mesmo dia. O retorno preventivo a Melve pode ser adiado se o ataque não disparar.
5. **Wilhelmina:** `Every Rose Has Its Thorn` é mostrada **depois** de `Feast of Deception` no roteiro recomendado (sem prometer um gatilho fixo de afinidade), com aviso dos três dias **após aceitar ajudar**. O checkpoint anterior à coroação mantém seu lugar antes do Banquete.
6. **Battahl → final:** individualizadas `Flickering Shadows`, `Convergence` e `A New Godsway`. O checkpoint vem **antes** da conclusão da Godsway, e `Guardian Gigantus` antecede `Legacy`.
7. **Mundo Desancorado:** Talos aparece antes da checagem de feixes, preservando o feixe final como último ato; os objetivos paralelos continuam sujeitos ao estado do jogo.
8. **Links editoriais** foram movidos para o marco correspondente em `questGuides.ts`; guias antigos seguem disponíveis no modo Consulta e nenhum guia foi apagado.

## Etapas introduzidas

| ID novo | Região/capítulo | Propósito |
| --- | --- | --- |
| `v108` | Vernworth 1 | Seat of the Sovran |
| `v109` | Vernworth 1 | Disa's Plot |
| `v110` | Vernworth 1 | Monster Culling |
| `v111` | Vernworth 1 | The Caged Magistrate |
| `m07` | Vernworth 1 | Beren's Final Lesson |
| `v305` | Vernworth 3 | Home Is Where the Hearth Is |
| `b08` | Battahl | Flickering Shadows |
| `b09` | Battahl | Convergence |
| `p07` | Checagem do final | A New Godsway |

## Fontes cruzadas (walkthroughs secundários)

- Ordem principal de 16 missões: https://www.powerpyx.com/dragons-dogma-2-walkthrough-all-quests/
- Brant e desbloqueio das três investigações em paralelo: https://www.powerpyx.com/dragons-dogma-2-seat-of-the-sovran-walkthrough/
- Quests secundárias por pré-requisito e região (Melve, Beren, Harve, Battahl): https://www.powerpyx.com/dragons-dogma-2-all-side-quests/
- Última lição de Beren: https://www.powerpyx.com/dragons-dogma-2-berens-final-lesson-walkthrough/
- Home Is Where the Hearth Is após duas missões: https://www.powerpyx.com/dragons-dogma-2-home-is-where-the-hearth-is-walkthrough/
- Gatilho e prazo da Wilhelmina: https://www.powerpyx.com/dragons-dogma-2-every-rose-has-its-thorn-walkthrough/
- Gatilho alternativo/variável de Readvent: https://www.powerpyx.com/dragons-dogma-2-readvent-of-calamity-walkthrough/
- Convergência e A New Godsway: https://www.powerpyx.com/dragons-dogma-2-convergence-walkthrough/ e https://www.powerpyx.com/dragons-dogma-2-a-new-godsway-walkthrough/
- Ponto sem retorno de Gigantus: https://www.powerpyx.com/dragons-dogma-2-the-guardian-gigantus-walkthrough/

## Compatibilidade e limites

- Os 53 IDs antigos permanecem, inclusive `m04` movido de capítulo. Jogador com `m04` concluído continua com ele concluído; o capítulo selecionado pode mudar se o jogador retornar ao marco através da Jornada.
- A pessoa com todos os **53 marcos antigos concluídos** verá as **nove etapas novas pendentes**. Isso é esperado; não marcar como feito automaticamente sem evidência de gameplay. A conclusão antiga não é apagada nem sobrescrita. Para continuar, o jogador pode fixar, concluir ou adiar esses marcos manualmente.
- Missões opcionais e conquistas cumulativas podem ser adiadas sem perda automática das demais marcações.
- Esta revisão **não** valida todos os gatilhos em saves atuais, nem converte 62 marcos em catálogo exaustivo. A DLC continua sua própria seção. Nenhuma alteração foi feita no mapa de preview nem no armazenamento.
- Evidência de QA técnica deve ser conferida no CI do SHA final; atualização de snapshots e um teste de ordem cronológica não substituem inspeção real no navegador/jogo.

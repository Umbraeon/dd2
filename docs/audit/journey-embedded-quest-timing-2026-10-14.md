# Auditoria da ordem narrativa — missões embutidas e cadeias de desbloqueio (14/10/2026)

## Sintoma reproduzido e causa

A primeira reorganização corrigiu dependências gerais, mas **não colocou as missões automaticamente disparadas no trecho em que acontecem**. Por exemplo, `Intruso de um Olho Só` já tinha ficha individual, mas estava apenas vinculada ao marco de **concluir** `No Rastro do Dragão`. Sem um passo separado entre Melve e Vernworth, o jogador não via essa missão na hora correta.

A revisão distingue **marco editorial**, **missão do diário do jogo**, **desbloqueio** e **conclusão**. A sequência é editorial; missões paralelas e gatilhos variáveis não devem ser falsamente serializados.

## Alterações com fontes cruzadas

| Missão (EN) | Falha da versão anterior | Agora | Fundamento |
| --- | --- | --- | --- |
| In Dragon's Wake | A entrada no jogo e a chegada à capital estavam misturadas | `m08` início, `m09` combate durante a viagem, `v101` desfecho | [PowerPyx](https://www.powerpyx.com/dragons-dogma-2-in-dragons-wake-walkthrough/), [Kiranico PT-BR](https://dragonsdogma2.kiranico.com/pt-BR/data/quests) |
| One-Eyed Interloper | Apenas sub-referência de `v101` (chegada a Vernworth) | `m09`, encontro com ciclope **antes** de concluir `v101` | [Game8](https://game8.co/games/Dragons-Dogma-2/archives/One-Eyed-Interloper), [PowerPyx](https://www.powerpyx.com/dragons-dogma-2-in-dragons-wake-walkthrough/) |
| The Gift of Giving → House of the Blue Sunbright | Ligadas ao marco genérico de Sven/Malcolm | `v112`, cadeia explícita de Daphne → Sebastian | [Guia cronológico Steam](https://steamcommunity.com/sharedfiles/filedetails/?id=3364936693) |
| A Magisterial Amenity | Aparecia antes da libertação de Waldhar | `v113` após `O Magistrado Aprisionado` | [PowerPyx — secundárias](https://www.powerpyx.com/dragons-dogma-2-all-side-quests/) |
| Jadeite Orb e Prey for the Pack | Orbe sem vínculo com o roteiro e `A Presa` sem sinalização da urgência | `v114` na Cidade de Descanso da Fronteira, com alerta de prazo de Rodge | [Guia cronológico Steam](https://steamcommunity.com/sharedfiles/filedetails/?id=3364936693) |
| A Veil of Gossamer Clouds | Marcada também em guia de `O Banquete` antes de ficar disponível | `v306` após `O Banquete da Farsa`, conclusão pode ocorrer depois em Battahl | [PowerPyx](https://www.powerpyx.com/dragons-dogma-2-a-veil-of-gossamer-clouds-walkthrough/) |
| Welcome to Battahl → Tensions on the Highroad | As duas misturadas nas missões locais, e Tensions referenciada antes da chegada | `b10` em Bakbattahl → `b11` no retorno a Vernworth | [Guia cronológico Steam](https://steamcommunity.com/sharedfiles/filedetails/?id=3364936693), [PowerPyx](https://www.powerpyx.com/dragons-dogma-2-all-side-quests/) |
| Clash and Conclusion | Ficha associada à etapa de Legacy, fora da ocorrência real | `p08` durante a subida da Torre do Luar **na missão The Guardian Gigantus**, antes de Legacy; condicional a Tensions | [PowerPyx](https://www.powerpyx.com/dragons-dogma-2-clash-and-conclusion-walkthrough/) |
| Till Death Do Us Part | Agrupada depois das missões de Harve | `v203` reaproveitado na janela inicial de Vernworth, antes de grande avanço em Brant | [PowerPyx — secundárias](https://www.powerpyx.com/dragons-dogma-2-all-side-quests/) |
| Dragonsbreath Tower | Desvio opcional após o marco de entrar na Ilha Vulcânica | `i02` vem antes de `i01` | Geografia descrita na própria ficha; desvio, não obrigatoriedade |

## Legenda editorial aplicada a TODOS os 71 marcos

- `main`: progresso obrigatório da história / batalha embutida obrigatória.
- `side`: missões secundárias, incluindo as condicionais.
- `optional`: exploração, conquistas e atividades livremente adiáveis.
- `point_of_no_return`: checagens explícitas de limiares irreversíveis; NÃO confundir com qualquer missão de risco alto.

**Risco é uma segunda dimensão:** uma missão secundária com limite de dias pode ter `risk: critico` e continuar com a etiqueta `Missão secundária`. A categoria aparece por **texto e contorno**, não só cor, no Diário e na Consulta.

## Compatibilidade de progresso

- 53 IDs originais preservados. As 9 novas etapas do PR anterior também foram preservadas: 62 IDs legados da `main` + **9 novos** = **71 marcos**.
- 9 capítulos, 60 conquistas, 82 guias individuais e 82 nomes localizados preservados.
- Sem edição no formato `dd2_roadmap_user_progress_v3`. Marcações antigas não são redefinidas. Novos passos NÃO são automaticamente inferidos como concluídos.

## Limites explícitos da verificação

Esta auditoria conferiu os casos críticos **acima**, com cruzamento de fontes externas e condições conhecidas. Não é certificação in-game de todas as missões em todos os saves, nem prova de que todas as 82 fichas foram testadas em uma versão específica do executável. Guias independentes divergem sobretudo no momento da missão de Wilhelmina e de `Revinda da Calamidade`; as notas condicionais continuam vigentes.

As próximas auditorias devem gerar uma matriz `inicia | pode concluir | pré-requisito | risco | fase` para todo o catálogo, sem tratar uma ordem preferida como condição rígida do jogo.

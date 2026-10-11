# Revisão editorial da Esfinge — 11/10/2026

## Problema encontrado

O modal antigo apresentava a advertência: **errar, contar estátuas incorretamente ou quebrar o vaso faria a Esfinge partir definitivamente e bloquear os baús**. Além disso, uma chamada sobre "Tentativa Única & Prazo de 7 Dias" sugeria incorretamente que todos os enigmas obedeciam ao mesmo cronômetro.

Essas duas generalizações eram incompatíveis com os guias consultados. Houve excesso de texto de alerta, agravado por um aviso extra em quase cada enigma.

## Fontes consultadas (públicas)

- [Push Square — todos os enigmas, consequências e recompensas](https://www.pushsquare.com/guides/dragons-dogma-2-all-sphinx-riddle-answers-locations-and-rewards): informa que falha na Ruminação, após sete dias, **não impede continuar** os enigmas, mas deixa de conceder o respectivo baú/conquista.
- [PowerPyx — soluções da Esfinge](https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/): prazo de sete dias na Ruminação; ordem aleatória no Santuário da Fronteira; contagem de estátuas alinhada aos baús de recompensa desbloqueados.
- [Game8 — combate e Chave da Sabedoria](https://game8.co/games/Dragons-Dogma-2/archives/449768): estratégias para a Esfinge, incluindo Flecha da Ruína e o baú com a Pedra de Despertar Eterna.
- [PC Gamer — Flecha da Ruína e baú final](https://www.pcgamer.com/games/rpg/dragons-dogma-2-sphinx-riddle-solutions/): confirma obtenção da chave e do item no baú grande.

## Decisões sobre a interface

1. Substituir o banner alarmista por um parágrafo neutro que diferencia falha de **um enigma** de interrupção da **sequência**.
2. Indicar explicitamente que **sete dias** se referem à Ruminação.
3. Retirar as 10 advertências por enigma, pois repetiam recomendações, continham absolutos incorretos ou não acrescentavam ação relevante. As soluções continuam consultáveis.
4. Tornar o último passo objetivo: preparar Arqueiro + Flecha da Ruína, iniciar o combate no momento da partida, pegar a chave e abrir o baú.
5. Corrigir o cabeçalho para nomear a conquista #51 como **Desprezo pelo ceifador**, e não como o nome do item.

## Limitações internas

As fontes acima são guias externos e não substituem teste executado no build atual. A revisão não certifica todas as mecânicas da Esfinge, nem a compatibilidade de todos os salvamentos com a TU3.2. Nomes localizados e os detalhes do combate final devem permanecer no backlog de pesquisa. Não apresentar esses limites como banners ao jogador: evitar instruções específicas que dependam de confirmação, especialmente "recarregar salvamento para tentar novamente".

**Escopo técnico:** somente dados editoriais de dez enigmas, modal e testes; nenhuma mudança em `id`, contadores, localStorage v3, backups ou lógica de marcação.

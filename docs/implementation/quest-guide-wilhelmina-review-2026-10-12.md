# Wilhelmina — ficha independente e protocolo de validação do gatilho

**Data:** 12/10/2026  
**Escopo:** uma única missão, `Every Rose Has Its Thorn` / `As Rosas Têm Espinhos`, vinculada aos marcos v302/v303/v304 sem modificá-los.

## O que o usuário precisa saber

A sequência do início tem **dois momentos diferentes**:

1. **Preparação anterior à missão:** após `Feast of Deception`, falar com Wilhelmina no Rose Chateau, elevar afinidade com flores se necessário, sair da cidade/passar tempo, voltar **à noite**; Rolf junto ao quarto informa que ela atende cliente; observar a cena pela pintura.
2. **Missão temporizada:** somente depois da oferta de ajuda começam **três dias do jogo** para conseguir as provas contra Allard. Não instruir a esperar três dias **após** aceitar.

As duas evidências distintas são `Murder Report` (Sven → Patrick → mansão de Allard) e `Bribery Investigation Findings` (casa ao sul da barbearia de Clovis). Para ajuda de Brant, apresentar **Bribery** antes de **Murder Report**. Dar `Murder Report` a Wilhelmina, continuar a ajudá-la, agarrar Allard, escapar e retornar posteriormente.

## Fontes independentes consultadas

- [PowerPyx — Every Rose Has Its Thorn](https://www.powerpyx.com/dragons-dogma-2-every-rose-has-its-thorn-walkthrough/): início, flores/afinidade, retorno após descanso fora de Vernworth, Rolf, as duas provas, ordem de apresentação a Brant, janela de três dias.
- [Gamerpillar — walkthrough](https://gamerpillar.com/every-rose-has-its-thorn-walkthrough-dragons-dogma-2/): flores, retorno para a cena, Sven, Patrick, provas, Brant, fuga, retorno posterior.
- [RPG Site — walkthrough](https://www.rpgsite.net/guide/15670-dragons-dogma-2-every-rose-has-its-thorn-how-to-romance-wilhelmina-complete-her-quest): confirmação separada do prazo de três dias e reunião das provas.

As fontes variam no número de dias de espera para **ativar** a cena (um dia em Gamerpillar, até três dias de descanso **fora** de Vernworth em PowerPyx), na necessidade exata de afinidade e no ponto mínimo da história. **Não publicar uma quantidade obrigatória nem prometer um gatilho único.**

## Limites e gate

- **Não executado:** saves reais da build atual, gatilho em estados alternativos (Wilhelmina com afinidade alta/baixa, antes/depois de `An Unsettling Encounter`, fim de `Feast of Deception`), e testes manuais mobile/leitor de tela.
- O título PT-BR é reaproveitado de `questNameIndex.ts` com evidência `paired_catalog`; **sem prova primária individual versionada**.
- Aceite automatizado: 27 IDs, 53 marcos e 60 conquistas intactos; teste de busca, painel mobile 390 px e ausência de escrita no progresso.
- **Manter PR em draft** até a decisão sobre validação com saves reais. CI verde não comprova que a cena sempre vai aparecer.

## Próxima validação in-game necessária

1. Save após `Feast of Deception` com afinidade baixa: dar flores, sair da cidade, voltar à noite e verificar Rolf/pintura. Registrar vídeo, hora, quests concluídas e NPCs.
2. Save com afinidade alta após a mesma quest: tentar sem descanso, após um dia e após descanso fora de Vernworth; registrar qual estado ativa o quadro.
3. Iniciar a missão e confirmar pela UI o aviso dos três dias; testar condição de falha separadamente em cópia do save, sem destruir progresso.

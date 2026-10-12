# Onda 17 — Um Jogo de Perspicácia (Esfinge) e Tolled to Rest (Oskar)

Data editorial: 12/10/2026. Escopo restrito ao catálogo histórico PowerPyx 2024 e à consulta existente, sem refazer UI nem mexer em `dd2_roadmap_user_progress_v3`.

## O que entrou
- **A Game of Wits / Um Jogo de Perspicácia:** um guia com dez enigmas, dos quais cinco no Santuário da Montanha, Reunião como sexto e quatro em ordem variável no Santuário da Fronteira. O conteúdo refere o rastreador de dez enigmas já presente no produto sem criar outra persistência.
- **Tolled to Rest:** começo com Oskar na estrada, escolta, sala do sino, chave como recompensa e vínculo do original `Nation's Death Knell` às missões de Trysha/Myrddin. O título PT-BR da missão permanece **não comprovado** e NÃO entra no índice.
- **Itens na ficha:** Sealing Phial (enigma dos Olhos), Finder's Token (Ruminação), Unmaking Arrow (rota recomendada de combate; não único método), Nation's Death Knell (posição e condição se recolhido antes).
- **Evidências:** quatro registros de inventário, todos como `FONTE_SECUNDARIA`. Campo `item_id` em branco; sem alegações de gameplay em saves.

## Fontes diretas usadas na curadoria
- https://www.powerpyx.com/dragons-dogma-2-a-game-of-wits-walkthrough/
- https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/
- https://www.rpgsite.net/guide/15635-dragons-dogma-2-a-game-wit-where-to-find-how-to-solve-all-sphinxs-riddles
- https://www.powerpyx.com/dragons-dogma-2-tolled-to-rest-walkthrough/
- https://game8.co/games/Dragons-Dogma-2/archives/Tolled-to-Rest

## Tensões editoriais e limites
1. Errar enigma pode perder conquista; a Ruminação tem sete dias in-game. Reunião conta como um dos dez. A ordem dos quatro finais varia e a Memória conta somente acertos. Evitar prometer um resultado garantido.
2. A luta final tem alternativas reportadas por jogadores; Unmaking Arrow obtida na Memória simplifica, mas não é requisito universal. Atirar no rosto foi reportado como falha; recomendação é corpo/pernas após iniciar luta.
3. Sobre Oskar, Game8 relata que, se o grimoire saiu do pedestal antes da escolta, poderá ser solicitado de novo. PowerPyx descreve Oskar tocando o sino com o livro presente. A ficha não transforma essa exceção em regra universal.
4. **Tradução:** `A Game of Wits` já tem pareamento editorial PT-BR; `Tolled to Rest` não. Não criar tradução oficial fictícia.
5. **Cobertura:** 72 guias/80 quests do snapshot de março/2024; 16/16 principais + 56/64 secundárias. Restam 8 secundárias desse comparador. Este NÃO é um inventário exaustivo da build atual, updates ou Dark Arisen, nem certificação de saves.

## Gates
- Tests novos unitários para enigma, itens e localização, Playwright mobile com busca e ausência de escrita em progresso.
- Gated registry: 72 guias; item evidence: 105 linhas / 72 missões; com itens: 48, sem itens: 24; índice EN/PT-BR: 74 títulos, 4 sem guia, 2 fichas sem título no índice (Jadeite e Tolled).
- Manter 53 marcos, 60 conquistas e chave v3.
- Execução de CI deve ser registrada na PR após publicação; **não presumir CI verde** antes da conclusão.

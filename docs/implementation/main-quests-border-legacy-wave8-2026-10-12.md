# Onda 8 — Nação da Chama Luzente e Legado

**Data:** 12/10/2026. **Base:** `main@1108af23`. **Issues:** #27 e #37.

## Objetivo e cobertura

Nova ficha individual para duas missões principais da base histórica de 2024:

| EN | PT-BR (já no índice, `paired_catalog`) | ID novo | Marcos relacionados |
| --- | --- | --- | --- |
| Nation of the Lambent Flame | Nação da Chama Luzente | `nation_lambent_flame` | `v304`, `b01` |
| Legacy | Legado | `legacy` | `p06`, `u01`, `u02` |

**37 guias publicados na branch** (+2 sobre main); 43/80 missões do comparador histórico de 2024 sem ficha (7 principais, 36 secundárias); 23 títulos no índice PT-BR ainda sem guia. A contagem de 80 **não é** um inventário oficial completo da build de outubro de 2026 nem da expansão Dark Arisen.

## Evidência — acesso a Battahl

- [PowerPyx — Nation of the Lambent Flame](https://www.powerpyx.com/dragons-dogma-2-nation-of-the-lambent-flame-walkthrough/): viagem à fronteira, carruagem clandestina, máscara, Rockmouse's Burrow, Menella e autorização de residência.
- [Game8 — Nation of the Lambent Flame](https://game8.co/games/Dragons-Dogma-2/archives/Nation-of-the-Lambent-Flame) e [The Arisen's Shadow](https://game8.co/games/Dragons-Dogma-2/archives/The-Arisens-Shadow): o resultado da investigação de Bermudo condiciona o tipo de passe. Brant **pode** entregar o `Border Entry Permit` comum, aceito por qualquer raça, ou o `Beastren Border Entry Permit`, que exige máscara para personagem humano. A redação antiga de PowerPyx generaliza o segundo tipo: não aplicá-la universalmente.
- A travessia clandestina para **Tô Dentro!** é uma atividade *opcional*, com possível hostilidade após descoberta, não requisito para concluir a missão.
- **Mudança pós-lançamento:** [Game8 — Bakbattahl](https://game8.co/games/Dragons-Dogma-2/archives/449590) registra um Portcrystal permanente adicionado após um patch. PowerPyx 2024 afirma que não existe. Evitamos publicar a instrução obsoleta "é obrigatório instalar seu Portcrystal"; conferir instalações atualizadas durante QA real.

## Evidência — Legado e finais

- [PowerPyx — Legacy](https://www.powerpyx.com/dragons-dogma-2-legacy-walkthrough/) e [Game8 — Legacy](https://game8.co/games/Dragons-Dogma-2/archives/Legacy): subida à torre, falso Sobran, Phaesus, escolha de confrontar o Dragão, voo e luta convencional.
- [PowerPyx — All Endings](https://www.powerpyx.com/dragons-dogma-2-all-endings-guide/) e [Game8 — Endings](https://game8.co/games/Dragons-Dogma-2/archives/448658): para **Paz**, derrotar o Dragão e permanecer no trono durante os créditos; para o Mundo Desancorado, utilizar `Empowered Godsbane Blade` em si mesmo na posição do coração brilhante **durante o voo**.
- Depois da rota comum, a documentação de 2024 descreve retomada pelo último save e conversa com o Pioneiro; a UI informa o caminho com linguagem condicional, não promete disponibilidade idêntica após patches nem obriga o jogador a apagar seu save.
- O farol vermelho final do Santuário do Leito Marinho encerra a etapa do Mundo Desancorado. A ficha avisa do risco, mas **não** mistura suas missões de evacuação com o término de Legado.

## Regressões e gates

- `QUEST_GUIDES`: 35 → 37; a chave persistida `dd2_roadmap_user_progress_v3`, 53 IDs editoriais e 60 conquistas não são modificados.
- Registro protegido: 35 → 37; `indexedWithoutGuide` 25 → 23. Corrigido também erro antigo no texto do changelog da onda 7 (35/25, não 37/23).
- Testes unitários novos: permissão condicional, máscara, alternativa clandestina, as duas escolhas de final, marcos/contagem.
- Testes Playwright: busca PT-BR em viewport 390×844, exibição da ficha e localStorage intacto.

## Limites documentados

Não houve partida/salvamento real da **build 2026**, auditoria independente dos gatilhos ou teste manual com jogadores. Os títulos PT-BR vieram do índice de evidência `paired_catalog` do repositório; sem nova extração primária de PAK. As fontes de walkthrough são a base desta entrega, não garantia universal sobre patches, saves ou desbloqueios. Não declarar cobertura total ou infalibilidade.

**Próximo P1:** `An Unsettling Encounter`, `Flickering Shadows`, `Convergence` (com título PT-BR ainda não autenticado pelo índice) e as fichas do Mundo Desancorado, após verificação de fatos e localização.

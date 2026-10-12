# Onda 6: duas missões que destravam vocações e Mestres na Ilha Vulcânica

**Base:** `main@0b98d231` · 12/10/2026 · issues #27 e #37.

## O que foi corrigido

Duas missões já tinham par EN/PT-BR no índice e eram citadas no marco editorial, mas **não** apareciam como walkthroughs individuais:
- **A Fonte do Contentamento** / `Put a Spring in Thy Step` (NPC Gautstafr; vocação Arqueiro Mágico, técnica `Martyr's Bolt` de Cliodhna).
- **O Sábio Beberrão** / `The Sotted Sage` (NPC Lamond; vocação Chefe de Guerra/Warfarer, técnica `Rearmament`).

Foram criadas as fichas `spring_thy_step` → marcos `i03,p03` e `sotted_sage` → `i05,p03`. A biblioteca desta branch passa de 31 a **33** fichas, sem alteração dos 53 IDs editoriais, 60 conquistas, 8 falsificações ou do `localStorage` v3.

O gate de regressão de cobertura passa de **31/29** a **33/27** (fichas registradas / quests do índice PT-BR sem ficha). No comparador histórico de 80, as pendências passam de **49 para 47** (11 principais e 36 secundárias). São métricas do catálogo de referência de 2024, **não uma porcentagem de completude da versão atual**.

## Evidência conferida e escolhas editoriais

**Put a Spring in Thy Step** — [PowerPyx](https://www.powerpyx.com/dragons-dogma-2-put-a-spring-in-thy-step-walkthrough/), [Game8](https://game8.co/games/Dragons-Dogma-2/archives/Put-a-Spring-in-Thy-Step), [Neoseeker](https://www.neoseeker.com/dragons-dogma-2/guides/Put_a_Spring_in_Thy_Step), [GameSpot](https://www.gamespot.com/articles/dragons-dogma-2-magick-archer-put-a-spring-in-thy-step/1100-6522106/): Gautstafr depois de Drabnir’s Grotto; três ervas/flores; Windwalker’s Home; escolta até fontes Geyser Hamlet; Cliodhna desbloqueia vocação. **Divergência relevante:** Game8 diz para falar novamente com Cliodhna para obter `Spellbow’s Paradox`, PowerPyx o inclui na recompensa da quest e Neoseeker relata que pode vir só depois. A ficha manda confirmar recebimento e retornar à casa se preciso; não supõe entrega idêntica em todos os saves.

**The Sotted Sage** — [PowerPyx](https://www.powerpyx.com/dragons-dogma-2-the-sotted-sage-walkthrough/), [Game8](https://game8.co/games/Dragons-Dogma-2/archives/The-Sotted-Sage), [GameSpot](https://www.gamespot.com/app.php/articles/dragons-dogma-2-warfarer-newt-liqueur-guide/1100-6522105/): Lamond nas termas, três garrafas `Newt Liqueur`, combinação Fruit Wine + Saurian Tail ou Higgs’s Tavern Stand. Em Higgs, vestir máscara de beastren se o personagem é humano **antes de mover os sacos**, caso contrário pode disparar hostilidade. O pergaminho de Mestre `Grandmaster’s Path` pode exigir conversar novamente com Lamond e conferir afinidade. O uso no inventário ensina `Rearmament`.

**Conexão útil:** a casa de Gautstafr oferece uma garrafa de `Newt Liqueur` para Lamond ([Game8](https://game8.co/games/Dragons-Dogma-2/archives/Put-a-Spring-in-Thy-Step), [Gamer Guides](https://www.gamerguides.com/dragons-dogma-2/guide/side-quests/agamen-volcanic-island/put-a-spring-in-thy-step-walkthrough)). Não declarar esse item garantido caso já tenha sido recolhido.

## Critérios de aceite e limitações

- Duas fichas com fontes diretas, identificação de NPC, itens, risco de hostilidade, dois pergaminhos e uso no inventário.
- `npm run lint`, `npm test`, `npm run build`, `npm run test:e2e` no commit final. Playwright cobre pesquisa PT-BR em mobile, pergaminhos e leitura sem gravar progresso.
- **Sem playthrough real na build de outubro/2026**, sem screenshot primário dos títulos PT-BR. Os nomes são os registrados no índice `paired_catalog`; não apresentar isso como extração de PAK.
- Gate protegido `docs/audit/quest-coverage-quality-gate-2026-10-12.json` atualizado na mesma PR. O relatório de lacunas datado anteriormente mantém a fotografia de 31/49, que deve ser lida com esta atualização.

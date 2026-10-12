# Correção de cobertura: cadeia do Beren

**Data:** 12/10/2026  
**Origem:** relato do usuário de que as missões de Beren não aparecem no site.  
**Base:** `main@b6da5d40`, 29 fichas individuais antes deste PR.

## Defeito confirmado
`questNameIndex.ts` continha os pares **Treino Leonino / Claw Them Into Shape** e **A Última Lição de Beren / Beren's Final Lesson**, associados aos marcos `m03` e `p03`. Porém, **nenhuma ficha dessas quests existia em `QUEST_GUIDES`**. Na jornada, abrir “Conheça Beren” exibia somente os dois walkthroughs de Trysha e Myrddin, que compartilham esse marco editorial.

## Correção
- Criadas **duas fichas independentes** em `src/data/questGuides.ts`, IDs `beren_claw` e `beren_final_lesson`; total **29 → 31** na branch.
- **Treino Leonino:** tenda de Beren/Moonglow Garden, três espadas, Humphrey em Vernworth, duelo (perder não bloqueia), aviso de ataque e investigação.
- **A Última Lição de Beren:** volta após `Seat of the Sovran`, batalha do ciclope, reencontro no dia seguinte e **passo posterior separado** até a casa de Beren em Battahl para conseguir `Champion’s Fable`, usando o pergaminho para aprender `Arc of Might`. O pergaminho pode depender da afinidade; não garantir entrega imediata em todas as rotas.
- Revisada a nota editorial do marco `m03`, sem alterar o ID. A etapa inclui a rota de Beren e mantém o aviso sobre livros autênticos de Trysha.
- Testes unitários verificam vinculação aos marcos; Playwright cobre Diário, busca global, viewport 390px, consulta do pergaminho e ausência de escrita no `localStorage` v3.

## Evidência
**Título PT-BR:** publicado na [base PT-BR do Kiranico](https://dragonsdogma2.kiranico.com/pt-BR/data/quests); o índice antigo permanece categorizado `paired_catalog`, sem alterar artificialmente a classificação de extração PAK.

**Passos e sequência corroborados por:**
1. [PowerPyx — Claw Them Into Shape](https://www.powerpyx.com/dragons-dogma-2-claw-them-into-shape-walkthrough/)
2. [Game8 — Claw Them Into Shape](https://game8.co/games/Dragons-Dogma-2/archives/Claw-Them-Into-Shape)
3. [PowerPyx — Beren's Final Lesson](https://www.powerpyx.com/dragons-dogma-2-berens-final-lesson-walkthrough/)
4. [Game8 — Beren's Final Lesson](https://game8.co/games/Dragons-Dogma-2/archives/Berens-Final-Lesson)
5. [PowerPyx — All Maister's Teachings](https://www.powerpyx.com/dragons-dogma-2-all-maisters-teachings-locations/)

## Limites
Os walkthroughs públicos são de versões anteriores à atualização atual; não executamos saves reais do jogo. O CI verifica integridade técnica, não universalidade dos gatilhos. O progresso persistido v3, 53 IDs de marco, 60 conquistas e demais guias não são alterados.

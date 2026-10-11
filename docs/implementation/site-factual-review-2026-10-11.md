# Revisão factual candidata ao site — 11/10/2026

**Branch:** `fix/site-factual-2026-10-11` (partiu do HEAD `4fcbd983` da PR #19, que permanece intacta). **Destino:** `main`, via PR substituta em rascunho. **Status:** correções editoriais propostas; ainda não publicadas na `main`.

## Problema e justificativa

A `main` continua com instruções factualmente arriscadas sobre os NPCs iniciais, pontos sem retorno e DLC. A PR #19 endereça a maior parte das correções mas deixa três P1: localização de Vergil, duas voltas a Lennart na quest de ninhos, e redação vaga sobre a consequência possível envolvendo Accardo. Também conserva seis nomes de conquistas DLC provisórios, quando agora existem registros de nomes PT-BR.

As revisões abaixo são incrementais e não alteram IDs, ordenação ou estrutura do progresso.

## Alterações nesta PR, além da PR #19

1. **`sphinx_diff`:** Dante na zona norte da Cidade de Descanso da Fronteira; Vergil na zona sul da *mesma cidade*, do lado de Battahl. A confusão no registro de NPCs do jogo (que às vezes indica Bakbattahl) não é usada como endereço de busca. Cabelo liso/cacheado em vez de divisão do cabelo não corroborada.
   - [PowerPyx — Riddle of Differentiation](https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/)
   - [Windows Central — imagem/localização](https://www.windowscentral.com/gaming/dragons-dogma-2-sphinx-guide-locations-riddle-answers)
2. **`m04`:** Lennart → barris → **voltar a Lennart** → veneno → **voltar novamente**. Ian/Norbert mantidos como quest distinta.
   - [PowerPyx — Nesting Troubles](https://www.powerpyx.com/dragons-dogma-2-nesting-troubles-walkthrough/)
3. **`m02`:** UI com ampulheta do episódio 1 e legenda de missão temporizada; separar consequência possível (questlog com desfechos de sucesso/morte; Game8) de prazo numérico não demonstrado. Não declarar que esperar N minutos causa morte; não repetir 'morte é apenas hipotética'.
   - [Game8 — Ordeals](https://game8.co/games/Dragons-Dogma-2/archives/Ordeals-of-a-New-Recruit)
   - [Auditoria de vídeo da PR #17](https://github.com/Umbraeon/dd2/pull/17) — episódio 1, marca 16:14, com ressalva de plataforma/build
   - A informação de desfechos do questlog foi registrada no relatório local de extração do build Steam 25290080 fornecido pelo proprietário; **arquivo de evidências bruto ainda não integrado ao GitHub**. Reproduzir antes de homologar o prazo causal.
4. **Conquistas DLC #55–60:** títulos PT-BR de seis itens verificados em listas de conquistas, eliminando etiquetas "[tradução provisória]"; preservados IDs, originais ingleses e links Steam. A Steam localizada pode servir cache antigo com 54 resultados, enquanto a [lista Steam global](https://steamcommunity.com/stats/2054970/achievements) apresenta 60. Ver também [Exophase PT-BR](https://www.exophase.com/game/dragon-s-dogma-2-steam/achievements/pt/) e [WeMod PT](https://www.wemod.com/pt/cheats/dragons-dogma-2-trainers/achievements). **Estar cadastrado não comprova execução dos gatilhos.**
5. **`d01`:** acesso a conteúdo por Brant à noite na Stardrop Inn de Vernworth; duas linhas independentes: novo Nascen → Norgan (`Chilling Tidings`, nível 40 **recomendado**); ruínas → masmorras (`Lost Rites`, nível 20 **recomendado**). Sem inventar a tradução de títulos da quest no diário. Bloqueio no Mundo Desancorado permanece como **relato de uma fonte**, não como regra oficial comprovada.
   - [PC Gamer, 08/10/2026](https://www.pcgamer.com/games/rpg/dragons-dogma-2-how-to-start-dark-arisen/)
   - [The Big Lead, 08/10/2026](https://www.thebiglead.com/dragons-dogma-2-dark-arisen-how-to-start/)
   - [Capcom — anúncio da expansão](https://www.capcom.co.jp/ir/english/news/html/e260610.html)

## Critérios para integrar à main

- CI completo (`npm run lint`, `npm test`, `npm run build`, Playwright) verde para **o SHA desta PR**.
- Conferir visualmente as notas alongadas e busca no Diário/Consulta em **375×812, 390×844, 1440×900 e 1920×1080**. Verificar nomes, avisos e acessibilidade.
- Revisão de Head com confirmação de não alteração de IDs e da chave de storage `dd2_roadmap_user_progress_v3`.
- Comparar a branch com PRs abertos #17 e #19; **não integrar #19 e esta PR em duplicidade**. Esta PR é alternativa substituta, não um patch dentro da #19.
- Validar em jogo PT-BR com build/plataforma identificados os caminhos de save, ordem de checkpoints, estados de missões, DLC no Mundo Desancorado, quests da DLC, e os seis gatilhos individuais. **Isso não é condição para publicar avisos prudentes, mas é condição para alegar 'rota integralmente homologada'.**

## Limites

- A auditoria da PR #17 é preliminar. Os relatórios de extração local citados pelo proprietário podem conter dados adicionais ainda não versionados; não são apresentados aqui como evidência primária publicamente reprodutível.
- Testes automatizados de textos não validam decisões in-game nem títulos no HUD atual.
- O valor `missable: false` dos seis troféus DLC é herdado, não foi demonstrado individualmente; a interface deve comunicar que perdibilidade e gatilhos ainda precisam de teste.
- Não houve alteração de `src/utils/storage.ts`, tipos, componentes, IDs de marco, conquistas ou checkpoints, nem de salvamentos do usuário.

**Decisão:** manter esta PR em rascunho, sem merge automático.
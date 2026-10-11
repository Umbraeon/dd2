# Auditoria incremental — Title Updates 3.1 e 3.2 + expansão (10/10/2026)

**Objetivo:** confrontar atualizações de 2026 com a redação atual dos 53 marcos e 60 conquistas em `src/data/roadmapData.ts`, **sem modificar a aplicação**. Esta é auditoria DOCUMENTAL: **sem execução do jogo, screenshot do diário PT-BR, teste de save ou desbloqueio**.

## Fontes usadas e suas limitações (consulta 10/10/2026)

| Código | Fonte direta | Tipo e suporte |
|---|---|---|
| S1 | [Capcom — comunicado de anúncio Dark Arisen de 10/06/2026](https://www.capcom.co.jp/ir/english/news/html/e260610.html) | **Primária**: lançamento em 9/10/2026 e existência de expansão. **Não detalha** condições de quests/saves. |
| S2 | [Capcom Town — trailer/anúncio](https://captown.capcom.com/en/theaters/dragonsdogma/57) | **Primária**: TU3.1 em junho traz Eternal Ferrystone e mais Portcrystals; TU3.2 em agosto contempla saves/performance; 12 novas masmorras + Norgan. |
| S3 | [RPG Site, 10/06/2026 — notas TU3.1/TU3.2 republicadas](https://www.rpgsite.net/news/20636-dragons-dogma-2-new-update-patch-notes-august-2026-optimization-save-system-qol) | **Republicação detalhada**, não site Capcom; evidencia texto de patch para itens, NPCs, falhas corrigidas, tipo de save, 6 slots e carnes. Esta matéria publicou o plano para TU3.2 **antes do lançamento**. |
| S4 | [Steam — notícia oficial Capcom «Arise Again – Title Update 3.2 Live...» de 1º/09/2026](https://steamcommunity.com/app/2054970/allnews/?l=brazilian) | **Primária, distribuidor + anúncio do desenvolvedor**: TU3.2 já publicada, 4→6 slots, saves melhorados, Dragonsplague, expansão em outubro, níveis iniciais recomendados. |
| S5 | [Steam — Q&A Capcom com diretor e produtor](https://steamcommunity.com/games/2054970/announcements/detail/705527117835665762) | **Primária, desenvolvedor**: detalhes de três campanhas, três tipos de salvamento, pousada sobrescreve outros estados, DLC acessível cedo, nível 40 para Forsaken Dominion e 20 para Lost Rites, **recomendações, não mínimos obrigatórios**. A URL de detalhe foi difícil de abrir pela ferramenta; conteúdo aparece na listagem Steam do jogo. |
| S6 | [Página oficial de notas da Capcom](https://www.dragonsdogma.com/2/en-us/topics/update/) / [update notice](https://www.dragonsdogma.com/2/en-us/topics/update-notice/) | **PRIMÁRIA, MAS INACESSÍVEL NESTA SESSÃO**: HTTP 403 em ambas. Não afirmar consulta direta do conteúdo. |
| S7 | [PC Gamer, 08/10/2026 — início da DLC](https://www.pcgamer.com/games/rpg/dragons-dogma-2-how-to-start-dark-arisen/) | **Guia secundário pós-lançamento**: Brant à noite, Stardrop Inn, quests EN `Chilling Tidings`/`Lost Rites`; alerta de indisponibilidade no Mundo Desancorado. **Exige confirmação in-game independente e nomes PT-BR**. |

Duas republicações da mesma nota de patch **não são duas provas independentes de um requisito do jogo**. A Capcom confirma a existência e implantação dos updates; os detalhes S3 precisam ser confrontados com a nota oficial quando acessível.

## Cronologia — NÃO atribuir mudanças ao mês errado

- **09–10/06/2026 — TU3.1**: introduz `Eternal Ferrystone` (recebida após falar com Brant em `Seat of the Sovran`, ou inventário de saves já avançados), portcrystals fixos em Melve, Checkpoint Rest Town e Volcanic Island Camp, portcrystal como recompensa de `Monster Culling`, paradas e horários de carroças, menor gasto de vigor fora de combate, notificação com ampulheta em quests temporizadas, especialização `Guardian` e seu tomo, ajustes de preços e recompensas de algumas quests. **PT-BR de novos itens/menus ainda carece de prova direta.** [S2](https://captown.capcom.com/en/theaters/dragonsdogma/57) [S3](https://www.rpgsite.net/news/20636-dragons-dogma-2-new-update-patch-notes-august-2026-optimization-save-system-qol).
- **Até 01/09/2026 — TU3.2 publicada**, conforme anúncio da equipe no Steam: **três espaços de campanhas**, **três tipos de save por campanha** (`Autosave`, `Interim Save`, `Last Inn Rest Save`), **6 habilidades equipáveis** em vez de 4, opção para não consumir carne de acampamento via atalhos, recomprar **tomos de especialização** consumidos/descartados e várias alterações de combate/peões. **O aumento de slots do jogo não altera a persistência v3 do aplicativo do guia.** [S3](https://www.rpgsite.net/news/20636-dragons-dogma-2-new-update-patch-notes-august-2026-optimization-save-system-qol) [S4](https://steamcommunity.com/app/2054970/allnews/?l=brazilian).
- **09/10/2026 — Dark Arisen**: expansão paga com área Norgan e 12 dungeons adicionais, sem cobertura na playlist de 2024. [S1](https://www.capcom.co.jp/ir/english/news/html/e260610.html) [S2](https://captown.capcom.com/en/theaters/dragonsdogma/57).

## Achados críticos de versão (prioridade de revisão, não severidade P0 comprovada)

| Achado | IDs e condição original | Evidência e ressalva | Severidade |
|---|---|---|---|
| V01: salvamentos mal descritos | `v303`, `p04`, checkpoints `cp1_feast`, `cp2_gigantus`, `cp3_confrontation`, `cp4_unmoored_evac` | Guia usa «Faça salvamento manual na Pousada». TU3.2 separa pousada e save manual intermediário. A própria Q&A explica que **descansar na pousada sobrescreve outros dados de save** dentro do slot, apesar de carregar um save de pousada não apagar os outros estados, depois da mudança. Não garantir reversão após decisões irreversíveis. [S5](https://steamcommunity.com/games/2054970/announcements/detail/705527117835665762) | **P1** |
| V02: teleporte reutilizável não contemplado | `v101`, `m05`, `v304`, `b01`, `i01` | `Eternal Ferrystone` concedida ao falar com Brant em `Seat of the Sovran`. O guia pode ensinar a utilizá-la **depois** desse gatilho. Requisitos da conquista de teleporte com esse item novo **não foram testados**. [S3](https://www.rpgsite.net/news/20636-dragons-dogma-2-new-update-patch-notes-august-2026-optimization-save-system-qol) | **P1/P2** |
| V03: recompensa Portcrystal de quest | `v201` (`Monster Culling`) | TU3.1 passou a conceder `Portcrystal`; se a quest já estava concluída, item deveria ser enviado ao inventário. O roteiro base não orienta essa recompensa da versão. [S3](https://www.rpgsite.net/news/20636-dragons-dogma-2-new-update-patch-notes-august-2026-optimization-save-system-qol) | **P1** |
| V04: especialização de peão adicionada | `m03`, `v106`, `v107`, `v202` | `Guardian` evita raids de carroça e ajuda no acampamento; `Guardian's Tome` obtível na `Nameless Apothecary` ou como recompensa de `Claw Them Into Shape` e `Readvent of Calamity`. Os nomes PT-BR desses termos **não foram comprovados diretamente no jogo**. [S3](https://www.rpgsite.net/news/20636-dragons-dogma-2-new-update-patch-notes-august-2026-optimization-save-system-qol) | **P2** |
| V05: confusão de tomos | `p03` / conquista #50 | TU3.2 permite recomprar **tomos de especialização**; não autoriza deduzir que **12 pergaminhos de mestre** podem ser recomprados. São sistemas distintos. [S3](https://www.rpgsite.net/news/20636-dragons-dogma-2-new-update-patch-notes-august-2026-optimization-save-system-qol) | **P1 (risco de perda se inferido)** |
| V06: carne protegida por opção | `p02` / #52 | TU3.2 adicionou opção de prevenir consumo de carne de acampamento por atalho; reduz desperdício acidental, mas **não comprova por si só oito tipos × dia/noite**. [S3](https://www.rpgsite.net/news/20636-dragons-dogma-2-new-update-patch-notes-august-2026-optimization-save-system-qol) | **P2** |
| V07: prazo com ampulheta | `m02`, `v203`, `v302` | TU3.1 passou a mostrar ampulheta nas notificações de quests com prazo. Não permite classificar `Ordeals of a New Recruit` ou `Till Death Do Us Part` como de timer comprovado sem observar a notificação real. `Every Rose Has Its Thorn` indica três dias no texto localizado. [S3](https://www.rpgsite.net/news/20636-dragons-dogma-2-new-update-patch-notes-august-2026-optimization-save-system-qol) [Kiranico PT-BR](https://dragonsdogma2.kiranico.com/pt-BR/data/quests) | **P1/P2** |
| V08: mudança de NPC `Nesting Troubles` | `m04` | Nota TU3.1 cita explicitamente **Lennart** na correção de bug de `Nesting Troubles`; evidência adicional e independente do Kiranico de que o guia errou ao atribuir início a Ian. **Patch em inglês não comprova nome PT-BR de missão**. [S3](https://www.rpgsite.net/news/20636-dragons-dogma-2-new-update-patch-notes-august-2026-optimization-save-system-qol) | **P1 já encontrado** |
| V09: versão de combate | `p05`, `p03`, `b063` | TU3.2 habilita 6 habilidades e altera muitos golpes. A meta do Gigantus e condição de mestre **não mudam por inferência**; analisar montagem de build, não reescrever gatilhos com base só no patch. | **P2** |
| V10: acesso e dificuldade da DLC | `d01` | **Fonte primária Capcom via Steam** confirma: `Forsaken Dominion` recomenda **nível 40** para início e `Lost Rites` recomenda **nível 20** para início; **não são bloqueios mínimos**. Ambos podem ser acessados cedo, após chegar a Vernworth e falar com Brant na taverna. No material oficial brasileiro aparecem **Domínio Esquecido** e **Rituais Perdidos** como nomes de **conteúdos**, NÃO títulos de quests in-game comprovados. [S4](https://steamcommunity.com/app/2054970/allnews/?l=brazilian) [S5](https://steamcommunity.com/games/2054970/announcements/detail/705527117835665762) | **P1** |
| V11: limite do Mundo Desancorado | `d01`, `u01–u08` | PC Gamer 08/10 diz que a DLC deixa de estar disponível quando se ingressa em Unmoored e só volta em NG+. **Este bloqueio ainda exige segundo teste/fonte independente**, pois não foi encontrado nas comunicações primárias consultadas. [S7](https://www.pcgamer.com/games/rpg/dragons-dogma-2-how-to-start-dark-arisen/) | **P1 em verificação** |
| V12: consumo de saves | `v303`, `p04`, `u01/u02` | Novos 3 slots **não significam** que um único slot retenha todas as ramificações de decisões ou que o jogador possa reverter tudo. O fluxo de salvar em pousada continua tendo efeito de sobrescrita sobre saves do mesmo slot. [S5](https://steamcommunity.com/games/2054970/announcements/detail/705527117835665762) | **P1** |

## Propostas editoriais (NÃO aplicadas)

**A. Na chegada a Vernworth, `v101`:** «Na versão com TU3.1, após falar com Brant durante `Seat of the Sovran`, o jogo concede o item `Eternal Ferrystone` (nome PT-BR ainda a confirmar). Caso já tenha concluído essa missão, verifique o inventário. O item não elimina pré-requisitos de quests nem significa que novas cidades estarão automaticamente acessíveis.»

**B. Em `v201`:** «Na versão com TU3.1, `Monster Culling` também concede um `Portcrystal`. Se já concluiu a missão antes da atualização, confira o inventário. Registre e guarde o item sem presumir que a conquista de teleporte já foi desbloqueada.»

**C. Checkpoint antes do Gigantus `p04`:** «Antes do gatilho da perseguição, diferencie o **salvamento intermediário**, que pode ser criado a pedido do jogador, do **registro de descanso na pousada**. Na TU3.2, os três tipos de save de cada slot são diferentes. Descansar na pousada também atualiza os dados de salvamento: não há garantia de restaurar um estado anterior se o slot já foi sobrescrito. Faça testes para comprovar o momento recuperável, não trate o checkpoint como garantia.»

**D. Para mestre `p03`:** «O recurso do TU3.2 que permite recomprar tomos de especialização dos peões **não foi comprovado para os ensinamentos dos mestres**. Não descarte ou use tomos de mestre supondo que esta nova loja os recuperará.»

**E. Na expansão `d01`:** «Após chegar a Vernworth, a Capcom informa que os conteúdos da expansão podem ser acessados conversando com Brant na taverna. Para começar, recomenda **nível 40 para o Domínio Esquecido** e **nível 20 para os Rituais Perdidos**, sem impor mínimos obrigatórios. Nomes exatos das quests de acesso permanecem em verificação; não inventar traduções.»

Esses textos são **propostas de estrutura**, não substituições finais ou nomes PT-BR oficiais de itens ainda sem prova direta.

## Auditoria integral de impacto por registro
- [Matriz dos 53 marcos](2026-update-impact-events.csv): **53/53 inspecionados** no que diz respeito a interseção com as notas TU3.1/TU3.2 e comunicações DLC; **14** apresentam ligações diretas com aspectos dos patches; os demais têm relações indiretas ou **nenhuma alteração específica comprovada**, que não significa acurácia anterior.
- [Matriz das 60 conquistas](2026-update-impact-achievements.csv): **60/60 títulos/dicas comparados** com alterações de versão; seis DLC registradas em separado, nenhum gatilho provado em execução real. `#39` continua uma conquista editorialmente associada a dois marcos.

## Pendências de prova
- Acessar diretamente as notas de atualização Capcom (403 na ferramenta), confirmar localizações brasileiras de `Eternal Ferrystone`, `Guardian`, `Autosave`, `Interim Save`, `Last Inn Rest Save` e outros termos in-game.
- Reproduzir `interim save`, pousada e restauração com save de teste e verificar efeito após um checkpoint sem retorno; documentar plataforma, build e gravação de estado.
- Reproduzir gatilho da conquista #7 com a Pedra-barca Eterna, sem concluir equivalência com a consumível.
- Reproduzir recompensas de `Monster Culling`, `Claw Them Into Shape` e `Readvent of Calamity` nos estados antes/depois da atualização.
- Testar acesso individual aos dois conteúdos DLC, ver nomes de quests PT-BR no diário, mapear as 12 novas dungeons e testar bloqueio Unmoored/NG+.
- Não tratar inferência de `tu3.2` como prova de novas regras de desbloqueio de nenhuma conquista.

**Governança:** Somente relatório; respeitar aprovação do proprietário e Head antes de correção de conteúdo de produção. Nenhum merge.


## Nota adversarial adicional — FAQ oficial de suporte vs TU3.2 (10/10/2026)

**Fonte primária obtida:** [Capcom Support — Dragon's Dogma 2 FAQ, atualização exibida de 08/10/2026](https://www.capcom-support.com/hc/en-us/articles/13194547904540-Dragon-s-Dogma-2-Frequently-Asked-Questions-All-Platforms).

**Contradição documental relevante para salvar:** o FAQ afirma que se cria *somente um* dado de salvamento, com autosave/manual compartilhando um único slot, enquanto a [notícia oficial Capcom publicada no Steam em 01/09/2026](https://steamcommunity.com/app/2054970/allnews/?l=brazilian), o Q&A da equipe e as notas TU3.2 informam **três slots** e **três estados por slot**. O artigo de FAQ mostra data recente mas texto de comportamento pré-TU3.2; **não assumir que sua data de edição significa atualização técnica completa**. Marcar `DIVERGENTE/PROVAVELMENTE_OBSOLETO` e buscar print do menu/save pós-TU3.2, com versão/plataforma. Isso **não** autoriza definir autonomamente o procedimento seguro antes do Gigantus. Não substituir prova in-game pela mera divergência.

**Guia oficial de diagnóstico de missões — melhora de clareza, sem nenhuma tradução de quest:**
- FAQ informa diretamente: **ampulheta ao lado da missão na tela de quests = janela temporal limitada**, evidência primária de como ler o marcador. O TU3.1 tinha introduzido o aviso nas notificações; FAQ especifica também a lista de quests. Não inferir que `m02` ou `v203` tem ampulheta sem observá-las individualmente.
- FAQ confirma que certos marcadores podem **aparecer/desaparecer** conforme hora, e que um NPC pode mudar de localização ou morrer.
- Se NPC sumiu, verificar horários, locais relacionados e, em última instância, **Vermund Charnel House** ou **Battahl Morgue** (nomes EN; localização PT-BR desses lugares a confirmar).
- FAQ sugere priorizar a quest e pedir ajuda ao `Diviner's Salon` ou `Reverent Shrine` pagando taxa. É um **mecanismo geral** útil a fichas sem NPC, não solução universal para quests bloqueadas. [Fonte Capcom Support](https://www.capcom-support.com/hc/en-us/articles/13194547904540-Dragon-s-Dogma-2-Frequently-Asked-Questions-All-Platforms).

**Questão específica PS5:** [MP1st, notícia de 07/09/2026 sobre update 3.210](https://mp1st.com/title-updates-and-patches/dragons-dogma-2-update-3-210-fixes-loading-data-issues) relata correção de bug pós-TU3.2 em que `Load from Last Saved Data` poderia selecionar registro anterior e timestamps ficarem errados. É **fonte secundária**, inacessível pelo navegador completo desta sessão, mas sumário da busca identificou claramente escopo PS5 e patch posterior de reparo. **Não generalizar para PC/Xbox, nem dizer bug ainda vigente**. Requer fonte Capcom e confirmação de build do jogador antes de recomendar procedimentos.

**Ações propostas para o guia (ainda NÃO aplicadas):** adicionar linha «como descobrir por que a quest/NPC sumiu» e explicação do ícone ampulheta, com link direto ao FAQ Capcom. Nos checkpoints, descrever tipos de save conforme build TU3.2 e alertar que documentações Capcom divergem; não prometer checkpoint infalível.


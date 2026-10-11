# Registro de fontes — auditoria factual PT-BR
**Consultadas ou identificadas em:** 10/10/2026 · **repositório:** Umbraeon/dd2 (`main`) · **escopo:** `ROADMAP_METADATA.sources`, marcos, conquistas e fontes externas adicionais.

## Metodologia
Uma URL listada pelo guia **não valida automaticamente** as afirmações que lhe foram associadas. Uma fonte repetida em diversas etapas equivale a **um** documento, não a múltiplas provas independentes. Aqui «PRIMARIA» diz respeito apenas à **classe específica de alegações que o documento demonstra**, não a todas as dicas do app. Estados `INACESSIVEL` registram a falha desta sessão, não indisponibilidade universal.

## Inventário dos 17 links globais da produção
| Chave | Documento/URL | Categoria | Alegação a que se presta | Proposta de visibilidade | Limitação de uso |
|---|---|---|---|---|---|
| `steam_pt` | [Steam Conquistas (PT-BR)](https://steamcommunity.com/stats/2054970/achievements?l=brazilian) | PRIMARIA | Nome e descrição de conquistas, 60 observadas em PT-BR | PRINCIPAL | Descrição do troféu não prova gatilho/rota oculta. |
| `steam_en` | [Steam Achievements (Global)](https://steamcommunity.com/stats/2054970/achievements) | PRIMARIA | Comparação de atualização DLC em inglês | TÉCNICA | Página EN suplementar; não substituir nomes PT-BR. |
| `route_guide` | [Guia Cronológico de Missões (2024)](https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992) | GUIA_COMUNITARIO | Ordem geral de 2024 para o jogo-base | PRINCIPAL | Não valida DLC 2026 nem afirma garantia de conclusão. |
| `achievement_guide` | [Guia Complementar de Conquistas](https://steamcommunity.com/sharedfiles/filedetails/?id=3195173063) | GUIA_COMUNITARIO | Estratégias de conquistas do jogo-base | CONTEXTUAL | Não é prova primária de desbloqueio. |
| `points_of_no_return` | [Game8: Pontos Sem Retorno](https://game8.co/games/Dragons-Dogma-2/archives/447927) | CORROBORACAO | Checklist pré-coroação, missões perdíveis | CONTEXTUAL | Checar quest individual e estágio de progresso; risco de generalizar. |
| `sphinx_powerpyx` | [PowerPyx: Enigmas da Esfinge](https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/) | CORROBORACAO | 10 enigmas e Ruminação, prazo de sete dias | CONTEXTUAL | Confrontar erros e variações por santuário. |
| `maister_skills` | [TrueAchievements: 12 Ensinamentos de Mestres](https://www.trueachievements.com/a429012/master-of-the-maisters-achievement) | CORROBORACAO | 12 ensinamentos de mestres | CONTEXTUAL | Steam apenas define aquisição; uso de pergaminho é hipótese comunitária. |
| `caves_guide` | [PowerPyx: 50 Cavernas (Turista)](https://www.powerpyx.com/dragons-dogma-2-all-cave-locations-tourist-trophy/) | CORROBORACAO | Localizações de 50 cavernas | CONTEXTUAL | Lista não substitui gatilho Steam. |
| `barbecue_guide` | [PlayStationTrophies: 16 Churrascos](https://www.playstationtrophies.org/game/dragons-dogma-2/trophy/the-barbecue-maister.html) | CORROBORACAO | 8 carnes em períodos distintos | CONTEXTUAL | Pedir confirmação in-game de variantes. |
| `phantom_oxcart` | [PowerPyx: Carroça Fantasma](https://www.powerpyx.com/dragons-dogma-2-the-phantom-oxcart-walkthrough/) | CORROBORACAO | Rota da carroça fantasma e entrada na carroça | CONTEXTUAL | Quest pode ter rotas alternativas; conquista depende de embarque. |
| `gigantus_guide` | [TrueAchievements: Gigantus Rápido](https://www.trueachievements.com/a429009/gigantus-i-hardly-knew-ye-achievement) | CORROBORACAO | Conquista de derrota veloz do Gigantus | CONTEXTUAL | Limite exato requer prova; risco alto. |
| `unmoored_compendium` | [Quest Compendium: Mundo Desancorado](https://questcompendium.com/guides/dragon-s-dogma-2/achievements/) | GUIA_COMUNITARIO | Evacuações, faróis e Mundo Desancorado | CONTEXTUAL | Risco alto de prazos e ordem; confrontar antes de publicar. |
| `reapers_scorn` | [TrueAchievements: Desprezo pelo Ceifador](https://www.trueachievements.com/a429033/reapers-scorn-achievement) | CORROBORACAO | Pedra de Despertar Eterna e ressuscitação | CONTEXTUAL | Separar missão Esfinge de gatilho do troféu. |
| `cyclops_abridged` | [TrueAchievements: Ciclopes na Ponte](https://www.trueachievements.com/a429024/cyclops-abridged-achievement) | CORROBORACAO | Ciclope usado como ponte | CONTEXTUAL | Exige atravessar com ciclope vivo? Testar. |
| `short_sighted` | [PowerPyx: Short-Sighted Ambition](https://www.powerpyx.com/dragons-dogma-2-short-sighted-ambition-walkthrough/) | CORROBORACAO | Isaac, cópia do livro, destino da família | CONTEXTUAL | Escolha irreversível; buscar 2 provas e títulos PT-BR dos itens. |
| `dlc_trueachievements` | [TrueAchievements: Dark Arisen DLC](https://www.trueachievements.com/game/Dragons-Dogma-2/dlc/Dark-Arisen) | INACESSIVEL | Catálogo de 6 conquistas DLC 2026 | CONTEXTUAL | Falha ao abrir na ferramenta; Steam PT-BR atualmente suficiente para títulos, não roteiros. |
| `mapgenie` | [MapGenie: Mapa Interativo Geral](https://mapgenie.io/dragons-dogma-2/maps/world) | CORROBORACAO | Mapa interativo de lugares e itens | CONTEXTUAL | Útil navegação; geolocalização não prova condição de quest. |

## Fontes externas incluídas pela auditoria
| URL | Categoria | Uso e limites |
|---|---|---|
| [Kiranico PT-BR — quests](https://dragonsdogma2.kiranico.com/pt-BR/data/quests) | **LOCALIZACAO_EXTRAIDA / PRINCIPAL** | Pareamento literal de rótulos PT-BR. **Não é screenshot primária do jogo nem publicação da Capcom.** Os nomes registrados em `quest-name-mapping.csv` permanecem `LOCALIZACAO_EXTRAIDA`. |
| [Kiranico EN — quests](https://dragonsdogma2.kiranico.com/en/data/quests) | **LOCALIZACAO_EXTRAIDA / TÉCNICA** | Confrontar pares EN e PT e distinguir quest de objetivo. |
| [Capcom — anúncio Dark Arisen (2026)](https://www.capcom.co.jp/ir/english/news/html/e260610.html) | **PRIMARIA / PRINCIPAL** | Existência/escopo e anúncio da DLC; não comprova rotas de jogadores ou tradução de quests. |
| [Capcom Store — expansão, 09/10/2026](https://us-store.captown.capcom.com/blogs/news/0000036) | **PRIMARIA / TÉCNICA** | Comunicação oficial complementando DLC; não substitui jogo ou diário de missões. |
| [Manual oficial Capcom PT-BR](https://game.capcom.com/manual/dd2/pt-br/) | **PRIMARIA / INACESSIVEL NA SESSÃO** | Pode apoiar mecânicas; abriu com erro de ferramenta, sem validação de seu conteúdo. Não selecionar como principal **até acesso real**. |
| [PC Gamer, 08/10/2026 — como iniciar DLC](https://www.pcgamer.com/games/rpg/dragons-dogma-2-how-to-start-dark-arisen/) | **CORROBORACAO / CONTEXTUAL CRÍTICA** | Brant à noite no Stardrop Inn, `Chilling Tidings` e `Lost Rites` em inglês; nível 40 recomendado, não obrigatório; 12 masmorras. **Quest PT-BR ainda não confirmada** e uma fonte não é homologação. |
| [PowerPyx — Ordeals of a New Recruit](https://www.powerpyx.com/dragons-dogma-2-ordeals-of-a-new-recruit-walkthrough/) | **CORROBORACAO / CONTEXTUAL** | Phill/Accardo; escreve que Accardo não sofre dano; **diverge** do Game8 quanto à urgência. |
| [Game8 — Ordeals of a New Recruit](https://game8.co/games/Dragons-Dogma-2/archives/Ordeals-of-a-New-Recruit) | **CORROBORACAO / CONTRADITORIA NO PRAZO** | Também Phill/Accardo; classifica como sensível ao tempo. Preservar desacordo. |
| [PowerPyx — Nesting Troubles](https://www.powerpyx.com/dragons-dogma-2-nesting-troubles-walkthrough/) | **CORROBORACAO / CONTEXTUAL** | Lennart, não Ian; confirma erro de associação no marco `m04`. |
| [Game8 — Brothers Brave and Timid](https://game8.co/games/Dragons-Dogma-2/archives/Brothers-Brave-and-Timid) | **CORROBORACAO / CONTEXTUAL** | Ian inicia outra missão que deve ser separada no roteiro. |
| [Push Square — Esfinge](https://www.pushsquare.com/guides/dragons-dogma-2-all-sphinx-riddle-answers-locations-and-rewards) | **CORROBORACAO / CONTEXTUAL** | Confrontar sequência e irreversibilidade dos enigmas. |
| [Windows Central — Esfinge](https://www.windowscentral.com/gaming/dragons-dogma-2-sphinx-guide-locations-riddle-answers) | **CORROBORACAO / CONTEXTUAL** | Diferença de comportamento quando enigma falha nas duas localizações; sem substituir reprodução. |
| [Discussão Steam de jogadores sobre coroação](https://steamcommunity.com/app/2054970/discussions/0/4352240417148094670/?ctp=2) | **RELATO_COMUNITARIO / CONTEXTUAL** | Hipótese para perder quests; depoimento não equivale a teste sistemático de estados. |
| [Steam em EN — conquistas](https://steamcommunity.com/stats/2054970/achievements) | **PRIMARIA / TÉCNICA** | Conferir seis registros novos e textos em inglês; comparativo de atualização, não nome PT-BR. |

## Proposta de **4 referências principais visíveis** ao jogador
1. [Steam — conquistas PT-BR](https://steamcommunity.com/stats/2054970/achievements?l=brazilian): nomes e descrições de conquistas exibidas na Steam. Nota visível: «a conquista Steam não homologa os passos do roteiro».
2. [Kiranico — nomes de missões PT-BR](https://dragonsdogma2.kiranico.com/pt-BR/data/quests): base extraída, rótulos candidatos, não captura do jogo. Nota: «extração de localização».
3. [Capcom — anúncio/escopo de Dark Arisen](https://www.capcom.co.jp/ir/english/news/html/e260610.html): fonte primária para a expansão, não os gatilhos jogáveis.
4. [Steam — guia comunitário cronológico de 2024](https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992): inspiração de ordem para o jogo-base, **não validado independentemente, não cobre a DLC de 2026**.

**Não exibir as outras 13 referências globais em bloco de igual peso**: mantê-las no registro técnico e fornecer links contextuais em dicas críticas com status de confiabilidade. Não eliminar nenhuma URL da produção sem aprovação. Steam EN e Kiranico EN permanecem como prova de comparação. Evitar contar os 17 itens listados como 17 verificações independentes por alegação.

## Fonte em vídeo indicada pelo proprietário — 10/10/2026

- **Playlist:** [Dragon's Dogma 2 Detonado Platina/todas as Quests](https://www.youtube.com/playlist?list=PLqFM8GX-LFqVE3O2aYIvVf-Hq_5D_y92T).
- **Vídeo compartilhado:** https://www.youtube.com/watch?v=tQGRLcSk7yI
- **Categoria:** `GUIA_COMUNITARIO_VIDEO / EVIDENCIA_POTENCIAL_IN_GAME`. **Prioridade alta para confronto** em razão da experiência favorável relatada pelo proprietário com o criador em Dragon's Dogma 1. Isso é evidência de utilidade pessoal, não validação universal do DD2.
- **Primeira tentativa de acesso:** somente o título da playlist foi recuperado. Coleta posterior em 11/10 superou esse limite; ver a retificação abaixo.
- **O que pode provar quando os episódios forem efetivamente visualizados:** nome de quest na interface PT-BR (com timestamp, idioma e versão/plataforma identificada), NPC e localização mostrados, sequência de ações, prazo observado e tela de desbloqueio. Só elevar para `OFICIAL_COMPROVADO` um título visível inequivocamente **no diário PT-BR do jogo**, não a fala do narrador ou título da miniatura.
- **O que NÃO prova por si:** que outra escolha não falharia, que não há conteúdo perdível, que o desbloqueio funcionará após atualizações ou que a expansão de 2026 está incluída.
- **Decisão inicial, substituída em 11/10:** manter na trilha de evidências até examinar transcrições. A decisão atual está na retificação abaixo.
- **Controle de verificabilidade:** ao auditar um episódio, registrar URL do vídeo, minuto exato, título literal exibido, ações na tela, plataforma/versão e eventual divergência com o diário PT-BR ou outros walkthroughs independentes.

## Regras de rastreabilidade
Registros de `claims-matrix.csv` incluem campos de proveniência e confiança; `quest-name-mapping.csv` inclui fontes EN/PT e status de prova; `achievement-audit.csv` distingue título Steam de estratégia editorial. Após a coleta pontual de 11/10, somente `Provações de um Novo Recruta` foi promovido a `OFICIAL_COMPROVADO`; os demais títulos continuam extraídos ou não confirmados.

## Retificação da coleta da playlist — 11/10/2026

O bloco anterior sobre inacessibilidade registra corretamente a primeira tentativa, mas foi **superado por acesso posterior à interface de transcrição**. O índice real contém **43 episódios** do canal [Romar](https://www.youtube.com/@RomarJogos). Foram examinadas cinco transcrições temáticas (1, 2, 12, 18, 24), sem assistir episódios inteiros, e preservados 23 trechos reproduzíveis em [video-evidence-matrix.csv](video-evidence-matrix.csv).

**Classificação atual:** `GUIA_COMUNITARIO_VIDEO / REFERENCIA_CONTEXTUAL`. A transcrição sustenta procedimento e registra as incertezas do narrador. Somente texto legível na UI do jogo pode comprovar um título PT-BR; por esse critério, `Provações de um Novo Recruta` foi promovido com timestamp, embora plataforma/build permaneçam desconhecidas. Títulos de capítulos, pronúncia e reconhecimento automático não são localização oficial.

**Decisão revisada:** incluir a playlist entre as **cinco referências contextuais recomendadas**, preservando Steam/Capcom e Kiranico como fontes de maior autoridade nos respectivos escopos. Ela não substitui walkthrough independente: o episódio 2 admite não saber se há outras quests, o episódio 18 não testou escolhas alternativas, e a série de 2024 não cobre Dark Arisen/TU3.1/TU3.2. Independência editorial em relação a rotas de terceiros não foi demonstrada.


## Documentação de versão acrescentada — TU3.1, TU3.2 e Dark Arisen (10/10/2026)
| Referência | Classe | Afirmações verificadas / limites |
|---|---|---|
| [Capcom — trailer e comunicado oficial da expansão](https://captown.capcom.com/en/theaters/dragonsdogma/57) | **PRIMARIA** | Atualizações 3.1/3.2, cronologia (junho/agosto), região Norgan e doze masmorras; não demonstra as condições de desbloqueio nem nomes de quests PT-BR. |
| [RPG Site — notas TU3.1 e TU3.2 republicadas](https://www.rpgsite.net/news/20636-dragons-dogma-2-new-update-patch-notes-august-2026-optimization-save-system-qol) | **REPUBLICACAO_DE_NOTAS** | Gatilho da Eternal Ferrystone, portcrystals, Guardian, ampulheta, saves, 6 slots, carnes, bugs. Não conta como segunda fonte independente se outro site copiar as mesmas notas. Artigo de junho anunciava TU3.2 **antes** de ir ao ar. |
| [Steam — notícia oficial de disponibilização TU3.2 (01/09)](https://steamcommunity.com/app/2054970/allnews/?l=brazilian) | **PRIMARIA** | Capcom anuncia TU3.2 já disponível, melhorias de 4→6 habilidades, saves, início da DLC por Brant, níveis recomendados por tipo de conteúdo. |
| [Steam — Q&A da equipe Capcom](https://steamcommunity.com/games/2054970/announcements/detail/705527117835665762) | **PRIMARIA** | Três slots independentes com três tipos de save, comportamento da pousada, conteúdo de expansão, níveis 40 e 20 **recomendados**, não mandatórios. Detalhe individual da URL indisponível na ferramenta; texto reproduzido nas listagens Steam. |
| [Capcom — notas update](https://www.dragonsdogma.com/2/en-us/topics/update/) e [update notice](https://www.dragonsdogma.com/2/en-us/topics/update-notice/) | **PRIMARIA_INACESSIVEL** | Ambas retornaram HTTP 403 nesta sessão; não afirmar leitura do original. |
| [PC Gamer — início da DLC](https://www.pcgamer.com/games/rpg/dragons-dogma-2-how-to-start-dark-arisen/) | **CORROBORACAO_POS_LANCAMENTO** | Taverna Stardrop à noite e bloqueio no Unmoored; detalhes aguardam segunda fonte ou reprodução real. |

**Decisão editorial:** fonte oficial Capcom/Steam das atualizações pode ser adicionada como link contextual em instruções dependentes da versão. **Não aumentar automaticamente de quatro para seis ou sete as referências globais visíveis ao jogador.** Manter todas as URLs específicas na matriz.


## FAQ Capcom sobre suporte de quests — prova primária com ressalvas (10/10/2026)
[Capcom Support — FAQ de Dragon's Dogma 2](https://www.capcom-support.com/hc/en-us/articles/13194547904540-Dragon-s-Dogma-2-Frequently-Asked-Questions-All-Platforms) apresenta prova **primária** para semântica da ampulheta de quest, marcadores que desaparecem, localização de NPCs por horário, visita aos necrotérios e acesso a pistas no Diviner's Salon/Reverent Shrine. **ATENÇÃO: o trecho do FAQ que afirma somente um save é contraditório com a comunicação primária de TU3.2; classificar este trecho especificamente como DIVERGENTE/PROVAVELMENTE_OBSOLETO**, mesmo com data exibida de outubro. Não fazer do FAQ fonte absoluta para saves da versão atual. [MP1st 3.210 PS5](https://mp1st.com/title-updates-and-patches/dragons-dogma-2-update-3-210-fixes-loading-data-issues) é referência secundária de bug já corrigido; conteúdo completo não acessado nesta sessão.


## Fontes contextuais críticas dos checkpoints (10/10/2026)
- [Game8: coronation missables](https://game8.co/games/Dragons-Dogma-2/archives/449610) (CONTEXTUAL, trechos indexados, abertura retornou HTTP 402); distingue quests não iniciadas de progresso além da coroação.
- [GameSpot: Gigantus](https://www.gamespot.com/gallery/dragons-dogma-2-gigantus-achievement-guide/2900-5209/) (CONTEXTUAL com método de flecha e aviso de autosave); [PlayStationTrophies](https://www.playstationtrophies.org/game/dragons-dogma-2/trophy/gigantus-i-hardly-knew-ye.html) e [TrueAchievements](https://www.trueachievements.com/a429009/gigantus-i-hardly-knew-ye-achievement) permitem contraste do instante da conquista.
- [PowerPyx: finais](https://www.powerpyx.com/dragons-dogma-2-all-endings-guide/) e [GameSpot: final verdadeiro](https://www.gamespot.com/gallery/dragons-dogma-2-true-ending-unmoored-world-guide/2900-5194/) (walkthroughs de 2024, exigem revalidar nomenclatura do menu de TU3.2).
- [PowerPyx: cinco missões de evacuação](https://www.powerpyx.com/dragons-dogma-2-halls-of-the-first-dawn-walkthrough/), [Game8: Unmoored](https://game8.co/games/Dragons-Dogma-2/archives/449759) (trechos indexados), e [Kiranico PT-BR](https://dragonsdogma2.kiranico.com/pt-BR/data/quests) (títulos **LOCALIZACAO_EXTRAIDA**). 
- [PowerPyx: feixes e Talos](https://www.powerpyx.com/dragons-dogma-2-all-endings-guide/) documenta o feixe azul de evacuação, vermelho final, mas o próprio walkthrough tem uma passagem ambígua sobre o feixe de Bakbattahl. Evitar contar marcadores a partir de uma única fonte; nenhuma captura atualizada do mapa foi examinada.
- [Gamer Guides — Unmoored](https://www.gamerguides.com/dragons-dogma-2/guide/the-unmoored-world/overview/what-is-the-unmoored-world) corrobora a urgência sem provar a contagem exata de repousos de todos os cenários.
**Todas essas referências permanecem técnicas/contextuais**; não adicionar indiscriminadamente à lista de 3–5 links principais da interface. Cada alegação e URL por ID está em [critical-checkpoints-evidence-2026.csv](critical-checkpoints-evidence-2026.csv).

# Pendências verificáveis — sem homologação
**Data:** 10/10/2026. Priorizar antes de permitir textos absolutos ou título «100%».
| Prioridade | Objeto | Lacuna exata | Prova necessária |
|---|---|---|---|
| P1 | TODAS as quests mapeadas | **0 capturas diretas** do diário PT-BR (versão/plataforma) | Capturar título do diário no jogo com menu idioma, edição, data e contexto; confrontar Kiranico. |
| P1 | d01/DLC | «Chilling Tidings» e «Lost Rites» **não têm PT-BR localizado confirmado** na pesquisa | Captura do diário PT-BR de 2026 ou extração pareada atualização DLC; não traduzir. |
| P1 | d01 | Rotas das 12 novas masmorras de Dark Arisen e condições exclusivas | Caminhos reproduzidos em save; capturas antes/depois; fonte adicional pós-09/10/2026. |
| P1 | d01 | Início via Brant/duas opções e bloqueio no Unmoored só uma fonte de walkthrough de 08/10 | Segunda fonte independente, jogo PT-BR; observar modificações de slots/NG+. |
| P1 | v303/cp1 | Quais quests são bloqueadas por aceitar ou concluir `Feast of Deception` | Duas fontes por quest e testes antes/depois; distinguir missão não iniciada x aberta x concluída. |
| P1 | v202 | Falha silenciosa da linha Ulrika e pré-requisitos Melve/Harve | Captura do diário e save de fronteira de estado. |
| P1 | v302 | Três dias de Wilhelmina: momento em que cronômetro começa | Diário «As Rosas Têm Espinhos» e walkthrough reproduzível. |
| P1 | m02 | Accardo sofre dano/morre com demora? Game8 × PowerPyx divergem | Ensaio de espera in-game, versão/plataforma e fonte primária. |
| P1 | v205,b06 | Erro de enigma por localização e efeito sobre todos os baús/recompensas | Experimento por enigma/estado; WindowsCentral × PushSquare, incluindo uso da flecha. |
| P1 | b062 | Flecha da Ruína na Esfinge; mira nas asas, chave e baú | Reproduzir e documentar sucesso/falha; evitar instrução potencialmente irreversível. |
| P1 | b03 | Isaac: cópia, grafia PT-BR de tomos e efeitos exatos sobre família | Captura de item/quest no PT-BR, outcomes com saves separados. |
| P1 | p04,p05 | Condição temporal de `Gigantus, nem sei quem é`; fronteira de derrota; recuperabilidade | Duas provas independentes + teste; checar efeito no Mundial Desancorado. |
| P1 | u01,u02,u08 | Fluxo exato de finais, retorno por Pathfinder, modo Casual e save | Testes de bifurcação e Steam #31, sem prometer campanha única. |
| P1 | u04,u05,u06 | Quantos feixes periféricos; teleporte/ordem; evacuações; reativação Talos | Mapa e questlog PT-BR por fase; gatilhos individualizados de #36/#37/#41. |
| P1 | achievements #55–60 | Gatilho efetivo e perdibilidade, além das descrições Steam | Walkthrough pós-lançamento independente + teste em DLC. |
| P2 | #50 | Uso dos 12 pergaminhos: Steam só diz «adquiriu»; guia pede «aprenda» | Captura antes/depois e comparativo de duas fontes. |
| P2 | #52 | 8 itens distintos × dia/noite e versões de carne não listadas na Steam | Filmagem/Steam trigger e comparação com rastreador. |
| P2 | #47 | Diferenciar coletar 80 vs entregar 80 | Teste de conquista e descrição oficial; Steam diz «coletou». |
| P2 | #39 | Associação em v205 e b06 = **um** desbloqueio | Confirmar com captura evento Steam e sequência; modelo já deduplica conquistas. |
| P2 | Fontes | Manual Capcom PT-BR devolveu erro no acesso por ferramenta | Reabrir em navegador e registrar URL/versão; não inferir conteúdo não acessível. |
| P1 | Vídeos de platina indicados pelo proprietário (playlist YouTube) | Conteúdo do vídeo `tQGRLcSk7yI` e episódios da playlist não pôde ser aberto/transcrito; autor, datas, versão e afirmações ainda desconhecidos | Ver vídeos reais com timestamps; coletar cenas do diário PT-BR, avisos, checkpoints e desbloqueios; confrontar duas fontes nos riscos altos. Playlist: https://www.youtube.com/playlist?list=PLqFM8GX-LFqVE3O2aYIvVf-Hq_5D_y92T |
| P2 | UX | Nenhum teste de usuário/viewport; sem imagem de gameplay | Executar roteiro do relatório de clareza. |
| P2 | Progresso | Persistência v3 não testada com relatórios | Não tocar em IDs/schema; teste de regressão somente no PR executor aprovado. |

**Regra:** «NAO_CONFIRMADO» significa falta de prova suficiente, **não** que missão/condição é falsa. «LOCALIZACAO_EXTRAIDA» não é prova primária da UI.


## Novas pendências introduzidas pelas atualizações TU3.1/TU3.2
| Prioridade | Escopo | Lacuna e situação | Evidência a obter |
|---|---|---|---|
| P1 | `v303,p04`, checkpoints de finais | Termos e comportamento reais de **autosave/interim save/última pousada** nos três slots após TU3.2, especialmente efeitos de **descansar** e **carregar**. | Teste com dois saves em campanha de ensaio, build/plataforma e resultado antes/depois de estado crítico. |
| P1 | `d01` | Fonte oficial distingue **Domínio Esquecido** nível **40 recomendado** e **Rituais Perdidos** nível **20 recomendado**; ainda falta nome exato das duas quests que Brant oferece no diário PT-BR. | Captura UI PT-BR e etapas de acesso; nunca traduzir `Chilling Tidings` e `Lost Rites` por inferência. |
| P1 | `d01,u01–u08` | Guia PC Gamer diz que a DLC não está disponível no Mundo Desancorado; sem confirmação primária ou teste. | Testar via save antes/depois de Unmoored ou encontrar segundo vídeo pós-expansão de 2026. |
| P1 | `p03` e #50 | Patch TU3.2 torna recompráveis **tomos de especialização**; não há prova de que essa regra se aplique a **ensinamentos de maestria**. | Nome/tela de item e loja real, confirmação de regras distintas. |
| P2 | `v101,v201` e #7 | Titulação real PT-BR e funcionamento da `Eternal Ferrystone`; não sabemos se novo item dispara conquista `Just a Stone's Throw Away`. | Teste de uso em save sem #7; print Steam antes/depois. |
| P2 | `m03,v106,v107,v202` | Como `Guardian` aparece em PT-BR; recompensa de `Claw Them Into Shape`, `Readvent of Calamity` e compra na Nameless Apothecary em saves atuais. | Screenshots no idioma e build, loja e questlog. |
| P2 | `m02,v203,v302` | O TU3.1 introduz ampulheta em quests temporizadas, mas não certifica *quais* quests a exibem. | Print das notificações correspondentes, versão/plataforma; preservar divergência Accardo até teste. |
| P2 | `p02` e #52 | TU3.2 inclui opção de impedir consumo de carne por atalho. | Confirmar título PT-BR exato no menu de opções e se a mudança evita só atalhos. |
| P2 | Todas | Notas originais de update Capcom retornaram HTTP 403. | Abrir em navegador real e conferir com a reprodução de 2026. |

Ver [relatório incremental de versão](2026-version-impact-report.md) e matrizes por [marco](2026-update-impact-events.csv) e [conquista](2026-update-impact-achievements.csv). **A auditoria de versão não é equivalente à validação integral da jogabilidade.**


## Contradição documental de salvamentos e verificação de interface
| Prioridade | Caso | Lacuna | Resolução necessária |
|---|---|---|---|
| P1 | Capcom Support FAQ atualizado em 08/10/2026 vs Capcom TU3.2 no Steam | FAQ ainda afirma **um único save**; TU3.2 confirma três slots com três estados por slot. O trecho do FAQ parece desatualizado, mas não houve reprodução do menu do jogo. | Print/grav. do menu de salvar e carregar na build TU3.2+ e plataforma identificada; não prometer restauro automático. Fonte FAQ: https://www.capcom-support.com/hc/en-us/articles/13194547904540-Dragon-s-Dogma-2-Frequently-Asked-Questions-All-Platforms |
| P1 | PS5 patch 3.210 de 07/09/2026 | Relato secundário de bug na seleção do save mais recente depois de TU3.2, corrigido em PS5. | Nota Capcom original, versão exata e validação de correção; não generalizar para outras plataformas. https://mp1st.com/title-updates-and-patches/dragons-dogma-2-update-3-210-fixes-loading-data-issues |
| P2 | Ajuda para NPCs perdidos e quests temporizadas | FAQ oficial mostra ampulheta na lista, deslocamento de NPC e opção de necrotérios/Diviner's Salon, mas o guia não oferece fallback por quest. | Testar e inserir orientação contextual, preservando IDs e nomes extraídos sem trocar traduções. |

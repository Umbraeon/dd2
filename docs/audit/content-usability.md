# Clareza e compreensão — avaliação heurística, NÃO teste empírico
**Data:** 10/10/2026 · **Material:** main de Umbraeon/dd2, componentes QuestCodex/Consultation/ChapterSection/InlineAchievements/AchievementCard/trackers.

## Critérios (avaliados textualmente)
Escala: OK (há informação), PARCIAL, FALTA; resultado indica presença textual, **não** sucesso de jogador real.

| Critério | Resultado | Diagnóstico | Ação proposta |
|---|---|---|---|
| Próxima ação identificável | PARCIAL | `QuestCodex` oferece etapa ativa/sugerida, mas títulos como «Resolva as missões de novatos» omitem ordem e condições de aparição. | Padronizar ficha por quest: objetivo, início, NPC, lugar, dependências, retorno. |
| NPC e onde encontrá-lo | FALTA em exemplos críticos | `m02` confunde Accardo/Rook e ignora Phill; `m04` confunde Lennart/Ian. | Resolver P1 antes de qualquer alteração de UI. |
| Pré-requisitos | PARCIAL | Tipo `QuestEvent` aceita `prerequisites`; muitas entradas não o registram, inclusive as de risco. | Exibir «não documentado» e diferenciar certeza. |
| Tempo e ponto sem retorno | PARCIAL | Existem alertas antes dos marcos; `failureRisk` e `risk` usam linguagem absoluta não necessariamente comprovada. | Link direto por risco, condição de disparo, efeito e nível de confiança. |
| Missão × marco × conquista | PARCIAL | `InlineAchievements` explicita vínculo editorial e independência do progresso. Mas `QuestCodex` expõe `event.type` genérico «MISSAO» para agregadores. | Etiqueta «Marcos do roteiro / quests oficiais relacionadas». |
| Busca PT-BR e EN | PARCIAL | A busca de `Consultation` indexa `event.title/note/prerequisites/failureRisk` e achievements: se a nota só contém EN, usuário não encontra o nome real PT-BR. | Indexar alias EN e PT-BR extraído com aviso de proveniência; não renomear ID. |
| Rastreamento | PARCIAL | Existem modais de Esfinge (10), carnes (8×2), mestres (12), mementos (80) e checkpoints. Marcação manual não é prova de conquista Steam. | Destacar «marcação pessoal» e «confirmado no jogo» separadamente. |
| Consulta após vários dias | PARCIAL | Há retomada de jornada e etapas adiadas no modelo; textos não mostram recapitulação de quests bloqueadas por decisões já tomadas. | A cada capítulo exibir pré-condições/período e opções quando missão desapareceu. |
| Conteúdo da expansão | FALTA | `d01` não contém início da DLC, opção de diálogo, barreira Mundo Desancorado e 12 masmorras. | Criar estrutura de conteúdo após pesquisa; não deduzir quest PT-BR. |
| Fontes compreensíveis | PARCIAL | Modal consulta 17 fontes globais, além de links individuais; fontes não são independentes só por quantidade. | 4 fontes gerais; referências críticas contextuais e registro técnico. |
| Compreensão em 5s | NÃO TESTADA | Métrica é meta da issue, não medição nesta auditoria. | Executar observação com três jogadores, sem indução. |

## Caminhos de usuário usados como roteiro de inspeção documental
- **Iniciante:** iniciar `m02` no posto. Encontra descrição errada de resgate Rook e não encontra Phill; severidade P1. Caminho corrigido proposto: «No portão sudoeste do Posto Avançado, fale com Phill; vá ao sul ajudar Accardo contra harpias e retorne a Phill». Revalidar idioma/local in-game antes de publicar.
- **Intermediário:** consultar `v303` antes da coroação. Sabe parar, mas checklist mistura condições de QUEST iniciada/concluída; falta «já concluiu?» individual e checklist conclusivo.
- **Experiente:** completar enigmas da Esfinge. Rastreadores cobrem 10; a advertência sobre falha e baús está excessivamente generalizada, e o enigma da reunião é contado como quinto da segunda área, não como quarto aleatório.
- **DLC:** tentar chegar a Norgan antes de Mundo Desancorado. `d01` é catálogo de conquistas, não manual de acesso. Pesquisa de 08/10 indica Brant/Stardrop Inn à noite; nomes PT-BR de quests não verificados.

## Protocolo empírico **proposto, não executado**
Três voluntários: 1 iniciante, 1 intermediário e 1 experiente. Testar 375×812, 390×844, 1440×900, 1920×1080; gravação consentida e navegação sem instrução. Pedir: localizar primeiro resgate, achar quest de Lennart, conferir pré-coroação, resolver caminho da Esfinge, escolher início DLC, recuperar marco adiado. Medir tempo para identificar NPC/local, acerto de 5 perguntas, erros de clique, necessidade de busca externa, percepção de autenticidade dos nomes/alertas. Em seguida validar com teste in-game PT-BR e capturas em versão/plataforma registradas.

## Limitações
Nenhum navegador gráfico, emulação Playwright ou sessão de jogo foi executado. **Não há screenshot**, tempos de tarefa, comparação responsiva observada ou entrevista com usuário. Análise de código não substitui teste de UX. Ilustração panorâmica da interface é explicitamente rotulada como não factual e não serve de evidência de quest.

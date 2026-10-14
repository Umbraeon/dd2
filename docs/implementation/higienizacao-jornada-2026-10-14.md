# Higienização do Compêndio do Nascen — Jornada e rota (14/10/2026)

## Problema observado
A Jornada recebeu sucessivos ajustes nos PRs #60–#65, mas a ordem **editorial** passou a ser confundida com exigências do jogo. O cabeçalho passou a sugerir local errado para uma missão de retorno (Melve) e missões posteriores intercalavam **Vernworth ↔ Bakbattahl** desnecessariamente. Alguns objetivos cumulativos permaneciam como próxima etapa sugerida, mesmo sem poderem ser concluídos de imediato.

**Atenção:** esta é uma higienização técnica e uma correção direcionada de percurso, **não uma auditoria in-game dos 72 marcos**. O CI não comprova gatilhos do jogo. Guardar ressalvas documentadas.

## Critérios editoriais, nesta ordem

1. **Disponibilidade**: não mostrar tarefa como imediatamente concluível se depende de um gatilho posterior; uma missão próxima mas indisponível não deve bloquear a história.
2. **Urgência documentada**: resgates temporizados e oportunidades perdíveis comprovadas prevalecem sobre colecionáveis e passeios.
3. **Proximidade**: concluir o que está acessível na região atual; combinar tarefas na mesma viagem, especialmente quando o retorno é exigido depois.
4. **Facilidade / deslocamento**: preferir a solução prática sem supor tempos de viagem, desbloqueios universais ou prioridade de dificuldade não confirmada.
5. **Liberdade do jogador**: indicar paralelismo e permitir adiar; não concluir automaticamente uma missão porque outra foi completada.

Esses critérios orientam uma **rota recomendada**, não um conjunto de pré-requisitos obrigatórios. Quando a tarefa não aparecer, conferir se o gatilho foi cumprido ou adiá-la sem tratar o save como quebrado.

## Inventário de decisões de higienização

| Elemento | Decisão | Justificativa |
|---|---|---|
| Diário mestre/detalhe e progresso `v3` | **MANTER** | Navegação, ações reversíveis e backups consolidados; não alterar IDs |
| Missões contextualizadas `m09` e `p08` | **MANTER** | Relação `DURANTE` documentada; encontro de Raghnall é condicional |
| Categorias discretas, sem legenda global | **MANTER** | Reduz carga visual e preserva avisos completos na ficha |
| Atalho de retorno à etapa fixada/sugerida | **MANTER** | Resolve navegação sem gravar nova seleção |
| Dois cabeçalhos de região dentro da lista e cartão de Melve duplicado na Consulta | **REMOVER** | Repetiam o nome e a orientação do percurso; poluição visual |
| Um link discreto de Melve → etapa `m04` | **MANTER, REDUZIDO** | Conserva acesso regional sem duplicar ID nem etapa |
| Objetivos cumulativos `m05`, `m06`, `v105`, `v106`, `b07` | **NÃO BLOQUEAR A SUGESTÃO** | Ainda pendentes e recuperáveis; não presumir que precisam terminar antes de avançar |
| Etapas de Bakbattahl / retorno a Vernworth | **REAGRUPAR** | Fazer os trabalhos locais antes de planejar uma viagem de volta para missões desbloqueadas por Battahl |
| Matriz com confiança por URLs em vez de por fatos | **CORRIGIR PARCIALMENTE / MANTER PENDÊNCIA** | Reordenar pelo código, rebaixar alegações em marcos agregadores; revisão factual por missão segue aberta |
| Mapa experimental PR #59 | **NÃO INTEGRAR** | Dependências de georreferenciamento e procedência de arte ainda não sanadas |
| PR #61 (versão concorrente) | **NÃO INTEGRAR** | Substituído pela versão do PR #62, já integrada; evitar dupla implementação |

## Casos editoriais prioritários e evidências

### Melve, após chegar a Vernworth
- `m04` reúne **Nesting Troubles**, **Medicament Predicament** e **Brothers Brave and Timid** — todas em **Melve**, com condições de disponibilidade diferentes.
- PowerPyx e Game8 colocam *Nesting Troubles* em Melve após *In Dragon's Wake*: https://www.powerpyx.com/dragons-dogma-2-nesting-troubles-walkthrough/ e https://game8.co/games/Dragons-Dogma-2/archives/Nesting-Troubles.
- O wiki comunitário registra uma possibilidade de conversa com Lennart ainda na primeira visita: https://dragonsdogma.fandom.com/wiki/Nesting_Troubles. **Não tratar esse relato como gatilho universal**.
- Flora e Ian têm requisitos próprios, geralmente documentados após começar *Seat of the Sovran*: https://www.powerpyx.com/dragons-dogma-2-medicament-predicament-walkthrough/ e https://www.powerpyx.com/dragons-dogma-2-brothers-brave-and-timid-walkthrough/.
- Para reduzir uma viagem isolada, combinar com *Oxcart Courier* de Donovan (em Vernworth, levando uma carta a Melve): https://www.powerpyx.com/dragons-dogma-2-oxcart-courier-walkthrough/.
- A volta a Melve **não equivale** a ter uma missão de Vernworth.

### Posto avançado e primeira escolta
- Depois de iniciar *In Dragon's Wake* (`m08`), priorizar o resgate de Accardo e as tarefas locais (`m02`) antes dos objetivos exploratórios/mementos: https://www.powerpyx.com/dragons-dogma-2-ordeals-of-a-new-recruit-walkthrough/.
- Treinar com Beren e procurar Trysha quando oferecido, sem declarar a visita a Eini pré-requisito universal; conferir diferenças em https://www.powerpyx.com/dragons-dogma-2-spellbound-walkthrough/ e https://game8.co/games/Dragons-Dogma-2/archives/Spellbound.
- *One-Eyed Interloper* (`m09`) permanece na rota durante a escolta de Gregor: https://www.powerpyx.com/dragons-dogma-2-in-dragons-wake-walkthrough/.

### Bakbattahl, Vermund e fronteira
- **Mercy among Thieves** começa na fronteira, depois de atravessar o portão para Battahl: aproveitar no caminho inicial a pé ao sul, em vez de retornar à fronteira após chegar à cidade. Fontes: https://www.powerpyx.com/dragons-dogma-2-mercy-among-thieves-walkthrough/ e https://game8.co/games/Dragons-Dogma-2/archives/Mercy-Among-Thieves. O marco agregador `b02` não duplica sua conclusão.
- `b10` (*Welcome to Battahl*) começa ao chegar a Bakbattahl; `b11` (*Tensions on the Highroad*) só após `b10` e se inicia ao voltar a Vernworth. Fontes: https://www.powerpyx.com/dragons-dogma-2-welcome-to-battahl-walkthrough/ e https://www.powerpyx.com/dragons-dogma-2-tensions-on-the-highroad-walkthrough/.
- `b05` (*The Phantom Oxcart*) se torna disponível **após Nation of the Lambent Flame e a visita a Bakbattahl**, mas começa na região de **Vernworth**, à noite; não pode ser tratada como missão da cidade de Bakbattahl: https://www.powerpyx.com/dragons-dogma-2-the-phantom-oxcart-walkthrough/ e https://game8.co/games/Dragons-Dogma-2/archives/448921.
- `b12` (*A Noble Exchange*) se passa no salão de máscaras de Vernworth e está descrita como disponível entre *Nation of the Lambent Flame* e *A New Godsway*: https://www.powerpyx.com/dragons-dogma-2-a-noble-exchange-walkthrough/.
- A rota agrupa **b12 → b05 → b11** na volta da capital. É uma **sugestão de menor dispersão**, não uma ordem obrigatória entre essas três quests. O caminho final de `b11` leva à região de Guerco/Checkpoint Rest Town e combina com explorar a área da Esfinge depois, quando disponível.
- `b03` (Isaac) começa em Bakbattahl e pode exigir uma visita a Ibrahim na Cidade de Descanso da Fronteira: aproveitar a passagem em vez de obrigar retorno exclusivo.

### Acumulações em andamento
- `suggestionTiming: 'ongoing'` faz a sugestão **passar por** `m06`, `m05`, `v105`, `v106` e `b07`; **não** muda o estado de conclusão, a ordem de exibição, o save ou as conquistas.
- Se restarem somente essas atividades, a sugestão volta à primeira delas para não esconder pendências.

## Dívida editorial explícita
- Não temos comprovação individual para todos os requisitos de marcos que agrupam várias missões. A matriz tem 72 IDs, mas não equivale a 72 confirmações independentes.
- As janelas de `Readvent of Calamity` e Wilhelmina, a ativação formal de `One-Eyed Interloper`, e a ordem entre missões paralelas permanecem sujeitas a condições variáveis.
- A rota inteira ainda precisa de revisão sistemática de **região real**, **primeira janela disponível**, **perdibilidade**, **deslocamentos** e **dificuldade relativa** com evidências por caso. Não inventar números de viagem, level recomendado ou disponibilidade universal.
- Atributos de risco `isMissable`/`isTimed` foram preservados nesta revisão; sua confirmação factual para cada linha segue pendente.

## Compatibilidade e critérios técnicos
- 9 capítulos, 72 IDs estáveis, 60 fichas de conquista, 82 guias; não renumerar ou duplicar marcos.
- Salvar em `dd2_roadmap_user_progress_v3` sem migração; marcar/adiar/reabrir continua explícito e reversível.
- Matriz documental ordenada pelo próprio `PHASES`; o gerador ajusta a ordem antes da verificação.
- Testes: ordenação local do resgate, agrupamento de retorno a Vernworth, objetivos contínuos não bloqueando, UI sem cartões redundantes, mobile, acessibilidade e integridade dos saves.

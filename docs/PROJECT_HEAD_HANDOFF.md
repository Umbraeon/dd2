# HANDOFF — Head do Compêndio do Nascen
**Projeto:** Umbraeon/dd2 · Dragon's Dogma 2 (PT-BR)  
**Data-base deste documento:** 09/10/2026  
**Papel destinatário:** Head de Produto + Engenharia / Orquestrador de especialistas e QA  
**Status:** transferência de contexto e mandato. **Não** é evidência de que o próximo Head já assumiu, nem de que as melhorias descritas foram implementadas.

> **Missão em uma frase:** transformar um compêndio informativo em um **companheiro de jornada confiável, fácil de retomar e agradável de usar enquanto se joga**, sem perder a pesquisa, sem inventar fatos e sem sacrificar acessibilidade pela estética.

## 1. Mandato: a pessoa que lidera o projeto

Você assume a responsabilidade de **decidir bem, organizar o trabalho e validar entregas**. Não é apenas um executor de prompts. O usuário quer um Head com visão de produto e autonomia responsável.

### Como se comportar
- **Nem bajulador, nem crítico por esporte.** Não dizer "sim" automaticamente, mas também não rejeitar sugestões só para parecer especialista. Examinar o problema, buscar evidência, estimar consequências, propor o menor caminho eficaz e explicitar por que concorda ou discorda.
- **Buscar funcionalidade acima de espetáculo.** Reavaliar suas próprias ideias se métricas e testes contradisserem a intuição. Um design mais simples pode ser melhor; um design expressivo também pode ser melhor, se não impedir a tarefa.
- **Assumir responsabilidade pelo resultado.** Orquestrar pesquisa factual, UX, frontend, acessibilidade e QA quando ferramentas/equipe estiverem disponíveis. Pode recorrer a avaliadores independentes, mas jamais alegar que existem ou que testaram algo sem realmente os acionar.
- **Proteção contra escopo inflado.** Não começar um redesenho total porque a UI desagradou. Isolar causas, corrigir por etapas, verificar ganho e preservar funcionalidades que já funcionam.
- **Comunicação franca e humana.** O usuário costuma ser informal e valorizou respostas diretas; deixe claro o que está pronto e o que é hipótese. Evite patronizar ou alegar certeza que não possui.
- **Experiência de atenção variável:** reduzir esforço para localizar contexto e retomar. Não tratar TDAH como diagnóstico que autorize preferências universais. Testar a solução, e não pressupor que um determinado padrão de UI é acessível.

### Formato de decisão recomendado
Quando houver divergência relevante, responder em quatro partes curtas:
1. **Minha leitura do problema**, em linguagem operacional.
2. **Evidência existente e o que falta validar**.
3. **Alternativas e trade-offs**, incluindo a opção sugerida pelo usuário.
4. **Decisão proposta + teste que poderia mudar a decisão**.

O Head tem autorização para abrir PRs e realizar merges **quando os critérios de qualidade estiverem satisfeitos**, não licença para aceitar mudanças apenas porque o build compila. Peça aprovação quando a mudança for de alto risco, alterar dados salvos de forma irreversível, afetar significativamente o escopo, ou depender de escolha estética ainda não acordada. Não crie ações em segundo plano sem ferramentas que as executem.

## 2. Origem do projeto e o que o usuário realmente quer

O usuário iniciou pedindo um guia para **Dragon's Dogma 2**, inspirado no **estilo editorial/organização** de um guia de Kingdom Hearts. Houve um desentendimento anterior: alguém começou a produzir conteúdo para Kingdom Hearts; o usuário corrigiu. **Conteúdo é Dragon's Dogma 2; Kingdom Hearts foi somente referência de apresentação.**

Depois, o usuário indicou um guia comunitário de cronologia para evitar perdas:
- **Rota comunitária prioritária:** https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992
- **Outro guia comunitário de conquistas:** https://steamcommunity.com/sharedfiles/filedetails/?id=3195173063
- **Fonte oficial de conquistas:** https://steamcommunity.com/stats/2054970/achievements
- **Roteiro especializado complementar:** https://www.powerpyx.com/dragons-dogma-2-trophy-guide-roadmap/
- **Anúncio de expansão referenciado anteriormente:** https://www.capcom.co.jp/ir/english/news/html/e260610.html

O usuário solicitou pesquisa profunda, informações verificadas, instruções sobre conquistas, imagens OFICIAIS da Steam e ordem cronológica segura, **sem inventar nada**. Também exigiu que o site não tivesse a aparência genérica que aplicativos gerados por IA frequentemente apresentam. O site está sendo desenvolvido com **Google AI Studio** e sincronizado com o GitHub.

O primeiro redesenho foi criticado pelo usuário como **"um desastre"**, especialmente por ser confuso. Isso NÃO autoriza apenas outra camada de fantasia medieval. O objetivo é encontrar rapidamente a próxima ação, preservar contexto e evitar riscos.

## 3. Estado efetivo do repositório no momento da transferência

- Repositório privado: https://github.com/Umbraeon/dd2
- Branch principal consultada: main, commit **fea5baf2615f800e9c7dd95220a5c410933f21cb** (merge do PR #1, redesign/editorial).
- Stack no código: React 19, TypeScript, Vite 8, Tailwind 4; CSS próprio; lucide-react; persistência em localStorage; modais e rastreadores.
- GitHub Actions em .github/workflows/verify.yml instala dependências, roda npm run lint (**tsc --noEmit**) e npm run build. CI verde **não** equivale a teste E2E ou validação visual.
- Arquivo central: src/data/roadmapData.ts. Contagem estrutural conferida nesta transferência: **9 fases**, **53 eventos/marcos**, **60 fichas de conquistas com IDs 1–60 únicos**. Distribuição dos 53 níveis de risco declarados: 17 normal, 14 cuidado, 3 alerta, 19 critico. Isso é um diagnóstico da CLASSIFICAÇÃO NO CÓDIGO, não prova que o risco no jogo tenha a severidade indicada.
- src/App.tsx: renderiza hero, nota editorial, barra de métricas, ferramentas, filtros e todos os capítulos filtrados. Não define etapa ativa independente, retomar sessão ou fluxo focado na próxima tarefa.
- src/components/ChapterSection.tsx: etapas, checkpoints e conquistas em fluxo extenso; marcos podem englobar várias ações.
- src/components/FilterToolbar.tsx: sete filtros, barra sticky com offset fixo.
- src/components/ProgressSummary.tsx: quatro painéis de métricas e atalhos para ferramentas.
- src/components/Header.tsx: botão "Ferramentas" abre especificamente a Esfinge por callback no App.
- src/utils/storage.ts, src/types/roadmap.ts: UserProgress, import/export e armazenamento persistido sob **dd2_roadmap_user_progress_v3**. Campos já existentes: steps, achievements, sphinx, firstTokenLocation, seekerTokensCount, barbecue, maisters, confirmedCheckpoints; version e updatedAt.
- Componentes auxiliares: SphinxTrackerModal, BarbecueTrackerModal, MaistersTrackerModal, TokensTrackerModal, CheckpointsModal, GlossaryModal, SourcesModal, DataBackupModal, AchievementCard.
- Documentos pré-existentes: docs/AUDITORIA_CONTEUDO.md; docs/PROMPT_GOOGLE_AI_STUDIO.md.
- Issue: https://github.com/Umbraeon/dd2/issues/2 (briefing original para auditoria externa; **não confundir** issue com auditoria concluída).
- **Antes de agir, atualize esses fatos a partir da main**. A branch pode ter mudado após este handoff.

### A integridade do progresso é uma linha vermelha
A chave localStorage **dd2_roadmap_user_progress_v3** e o formato exportado pertencem aos usuários que já marcaram etapas. Nunca resetar, renumerar os IDs 1–60 ou os IDs de eventos, nem sobrescrever progresso sem migração reversível e teste de backup antigo. Corrigir validação de entrada, pois o padrão typeof x === "object" também aceita null; e distinguir updatedAt de "data da sessão", já que saveProgress é chamado ao carregar o app.

## 4. Auditorias independentes: o que realmente sabemos

Houve **duas avaliações externas** encaminhadas pelo usuário. Uma foi **auditoria estática do código**, outra foi executada pelo Sonnet com Playwright + axe-core em navegador.

### Primeira avaliação — inspeção estática
- Concluiu que o aplicativo funciona como compêndio, mas não orienta a próxima decisão.
- Identificou falta de etapa ativa e retomada, avisos tipo cuidado omitidos dos filtros, capítulos extensos, textos pequenos, ausência de navegação móvel equivalente e modais não acessíveis.
- Foi transparente: NÃO executou o site, NÃO produziu capturas reais, NÃO testou com pessoas e NÃO mediu uso real.
- Recomendou Jornada versus Consulta, com diferenciação entre etapa sugerida, ativa e concluída; alertou para o erro de usar apenas o primeiro checkbox desmarcado.
- Esse diagnóstico é um **conjunto de achados estáticos e hipóteses**, não comprovação de melhoria aplicada.

### Segunda avaliação — Sonnet (relatório de 11 páginas e capturas enviados no chat)
Relatou npm install, tsc, build, Playwright em **1440×900**, **820×1180** e **390×844**, axe-core e simulação de sessão com **20 das 53 etapas concluídas**:
- Sem "Continuar"/próxima etapa; primeira pendente a aproximadamente **16,5 alturas de tela** no celular nesse cenário.
- Primeira etapa fica abaixo de ~**2,5 telas** em celular em início de campanha.
- **61%** dos elementos textuais avaliados tinham fontes de **11 px ou menos**; **88%** tinham **12 px ou menos**.
- **36 de 53 marcos (68%)** recebem risco acima de normal no código; **19 (36%)** são marcados critico; excesso de alarmes dilui o sinal.
- Filtro missable omite os **14** eventos cuidado; filtro timed mistura 15 conquistas "missable" sem confirmar se possuem prazo.
- No celular, cabeçalho + filtros sticky ocupavam cerca de **19%** da altura da viewport 390×844.
- Muitos controles eram menores que 44 px, incluindo botão de conclusão de 20×20; WCAG AA para tamanho do alvo tem exceções: **não transformar a contagem <44 px em declaração automática de falha WCAG**.
- Modais sem semântica de diálogo e gestão de foco por inspeção de código/DOM.
- Busca sem destaque devolve páginas extensas; navegação de capítulos fica quase ausente no celular/tablet.
- axe sinalizou pelo menos um problema sério de contraste; isso NÃO equivale a uma auditoria completa de conformidade WCAG.
- **Limitação importante:** Google Fonts, hero e ícones da Steam não carregaram no sandbox do Sonnet; screenshots representam fallback, não identidade visual completa. Não houve teste com jogadores, leitor de tela real, zoom nem navegação completa por teclado. Avaliações de UX em uso real permanecem pendentes.

**Convergência:** falta orientação imediata; a interface pede rolagem e leitura demais; alertas não estão contextualizados; navegação e acessibilidade móvel precisam melhorar.  
**Divergência útil:** Sonnet sugeriu três alternativas (capítulos recolhíveis, Jornada/Consulta com navegação móvel, modo em partida) e preferiu testar a segunda. Não tratar qualquer proposta como dogma.

As métricas são **resultados reportados por essa auditoria em condições específicas**, não valores validados para todas as telas, dados ou versões. Reproduza antes de fechar as issues.

## 5. Visão e princípios de produto

### Proposta de valor
Quando alguém abrir o guia jogando ou após dias sem jogar, a interface deve comunicar, sem caçada:
1. **Onde estou na minha jornada?**
2. **Qual é minha próxima ação ativa/sugerida e como faço?**
3. **Qual risco concreto preciso checar antes de continuar?**

O usuário também deve poder consultar rapidamente detalhes completos, conquistas, guias de ferramentas, fontes e marcos anteriores.

### Arquitetura candidata, NÃO decisão final
**Jornada (entrada principal):** Agora (etapa ativa), Antes de avançar (alerta vinculado ao gatilho real), Depois (próximas poucas etapas), conquistas ligadas à ação, mapa/índice de capítulos.  
**Consulta (biblioteca):** busca global, conquistas, Esfinge, carnes, ensinamentos, Mementos, glossário, backup, fontes e metodologia.  
**Alertas:** possível destino dedicado no celular apenas se testado; alertas críticos pertinentes devem aparecer **também** na Jornada, nunca enterrados em menus.

A estética medieval de carvão, pergaminho e ouro continua, mas como linguagem de orientação: tipografia generosa para instruções, cor forte reservada para risco real, ornamentos discretos. Não gerar imagens por IA.

### Atenção à não linearidade
Dragon's Dogma 2 permite desvios: **“primeira etapa não concluída” é uma SUGESTÃO e NÃO uma verdade sobre onde a pessoa está**. Permitir ao usuário fixar uma etapa ativa, adiá-la sem marcá-la concluída e voltar a ela. Se não houver etapa selecionada, oferecer sugestão segura com fonte e explicação, sem fingir conhecimento da posição exata do jogador.

### Cuidado com a confiabilidade factual
Os 53 marcos agregam tarefas. Várias fichas se apoiam em fontes comunitárias; 60 fichas numeradas não provam 60 walkthroughs validados. **Não usar “100% sem perder nada”** até pesquisar e provar dependências, prazos, escolhas, missões e bloqueios, inclusive DLC separada. A existência de conteúdo no banco não prova sua precisão.

Exigir matriz editorial por ação ou missão: nome PT/EN, gatilho, pré-requisitos, prazo se comprovado, risco concreto, consequência, chance de recuperação/NG+, conquista vinculada, fontes diretas, data, status da verificação e revisão. Quando a evidência for insuficiente, exibir "em verificação", não deduzir.

## 6. Plano de execução recomendado, sujeito a crítica

**Objetivo não é executar todos os patches imediatamente.** Revisar a main, escolher incremento mais valioso, fazê-lo funcionar e mensurar.

### PR 1 — Orientação, retomada e segurança mínima
**Hipótese:** jogador encontra sua ação ativa/sugerida e riscos relevantes sem percorrer dezenas de telas.

- Criar utilitário puro para sugestão de próxima etapa baseado na ordem do banco e marcações; sem equiparar sugestão a estado real do jogo.
- Adicionar estado explícito e persistente de **etapa ativa** e **etapas adiadas** (modelo mínimo). Exibir "Continuar de onde parei", com opção de escolher outra etapa.
- Exibir ação do momento acima de hero/estatísticas; hero reduzido ou ausente nas visitas recorrentes, conforme teste.
- Não ocultar alertas pertinentes atrás de capítulos recolhidos. Garantir que todos os riscos tipo cuidado sejam encontráveis; **não** renomeá-los automaticamente como "sem volta".
- Preservar storage v3, importar backups antigos, não corromper dados parcialmente inválidos; atualizar updatedAt somente quando houver mudança real.
- Testar 0%, 20%, 100% e estado não linear com atividade fixada/adiada, casos de dados faltantes, regressão de exportação e filtros.

**Aceite proposto:** próxima ação relevante na primeira dobra 390×844 e 1440×900; retorno à etapa ativa sem navegação longa; nenhum dado prévio perdido; aviso importante encontrado antes da ação-gatilho; CI verde + prova visual real + comportamento em teste.

### PR 2 — Arquitetura de informação, leitura, responsividade e acessibilidade
- Validar Jornada/Consulta com teste rápido, não apenas pela opinião dos avaliadores; permitir navegar por capítulos no celular/tablet.
- Reduzir ruído: não abrir permanentemente 53 marcos/60 fichas; concluídas recolhidas sem esconder riscos; conquistas e detalhes sob demanda.
- Aumentar texto operacional para referência de aproximadamente 16 px em mobile; checar contraste real; alvo frequente preferencialmente >=44 px e demais conforme WCAG 2.2, incluindo exceções.
- Corrigir oito modais: nome acessível, role/dialog semântica, aria-modal, Escape, foco preso e restaurado. Identificar checkboxes de carne+período para leitores de tela.
- Corrigir sticky sobreposto, aria-pressed nos filtros, destinos de âncoras filtradas e botão Ferramentas que só abre Esfinge.
- Testar keyboard-only, reflow e zoom, axe, estados sem rede/fontes/imagens.

**Aceite:** fluxo claro em 390/820/1440, nenhuma sobreposição importante, foco e diálogos funcionais, alvos utilizáveis e sem violações serious/critical identificáveis em axe; pendências com leitores de tela documentadas se não testadas.

### PR 3 — Semântica de alertas e profundidade editorial
- Revisar classificação de risco e vincular alertas à etapa-gatilho, não só ao topo do capítulo.
- Separar claramente: ação com prazo, conquista perdível, missão perdível e decisão irreversível. Uma não implica automaticamente outra.
- Revisar confirmadores de checkpoint: checagem por item e consequências claras; marcar "li" não certifica "concluí a condição".
- Subdividir marcos com múltiplas ações **apenas quando a pesquisa comprovar** a ordem e a dependência; manter compatibilidade de progresso existente.
- Estado de verificação por ficha; rótulos PT-BR oficiais versus traduções editoriais; DLC isolada.
- Revalidar a finalidade do nome do site "100%" e disclaimers após a auditoria.

**Aceite:** matriz com fontes reais por afirmação importante, sem itens "validados" sem prova, regressão do número de conquistas e dos IDs, plano claro para conteúdo ainda incompleto.

### Trabalho paralelo que NÃO deve ser perdido
- Conferir cada entrada da rota de 2024 versus fontes de walkthrough e descrições oficiais.
- Validar nomes de conquistas, localização, opções de NG+, finais e requisitos de DLC.
- Não adicionar descrições precisas por suposição.
- Registrar decisões e mudanças de status editorial em documentos versionados.

## 7. Portões de validação e autonomia de merge

**Antes de codificar:** issue/proposta curta com problema, tarefas do jogador, métrica de sucesso, riscos e hipótese. Informar o que será preservado.

**Antes de abrir PR:** mudanças pequenas, descrição de arquivos, teste unitário/integração do fluxo alterado, build/typecheck, estados vazios, import/export, preview real do layout quando pertinente; linkar evidência e registrar aquilo que NÃO foi testado.

**Antes do merge:** revisar diffs com postura crítica, CI verde, sem violação de preservação de dados, sem fato de jogo novo sem fonte, sem piora dos cenários de retomada/risco e sem falha crítica de teclado/mobile. Se faltarem ferramentas para comprovar algo essencial, segurar merge e dizer por quê.

**Depois do merge:** validar branch main atualizada, conferir a experiência e status do usuário, atualizar questão/registro de decisões e deixar explícito próximo passo. O usuário autorizou autonomia para merge, não autorizou promessas sem testes.

### Testes de aceitação e pesquisa
Reproduzir estado novo, 20/53 completos, todos completos, atividade ativa em etapa posterior, atividade adiada, backup v3, rede offline e imagem quebrada.

Metas candidatas: ação acessível sem rolagem inicial relevante; retomar em ~5–10 s em teste de usabilidade; abrir instruções em no máximo duas interações; reverter marcação errada em um/dois toques; navegação móvel em 390 px sem scroll horizontal. São METAS, não resultados alcançados.

Idealmente testar com 3–5 participantes de perfis distintos e documentar tarefas, erros, tempo e opiniões sem forçar respostas. Com poucos participantes, resultados são qualitativos/exploratórios; não alegar taxa estatística geral.

## 8. Coisas a preservar e coisas a evitar

### Preservar
- Dados existentes e ordenação, conquistas e ícones oficiais com fallback.
- Integração de progressos, marcação reversível, JSON de exportação/importação.
- Rastreador da Esfinge, primeiro Memento, 16 preparos, 12 mestres, tokens, glossário e fontes.
- A seção própria da expansão e transparência editorial.
- Um caráter visual distintivo de fantasia medieval, se não comprometer a tarefa.
- A investigação crítica independente e a disposição de rever decisões.

### Evitar
- "Site genérico de IA" ou reforma ornamental repetida.
- Exibir tudo ao mesmo tempo; criar 5 menus/modos; excesso de estados e alertas sem significado.
- Usar apenas checkboxes desmarcados como estado da sessão.
- Misturar "perdível" com "tem prazo" ou afirmar garantia sem fonte.
- Renumerar dados, quebrar armazenamento e invalidar backups.
- Testes fictícios; screenshots fabricadas; prometer acessibilidade WCAG sem teste.
- Tratar opinião de ferramenta como prova; tratar opinião do usuário como ordem imune a exame; tratar oposição como virtude.

## 9. Primeiro turno esperado do novo Head

Após ler este documento e AGENTS.md:

1. Verificar a main, os PRs abertos, a issue #2 e as regras reais de execução. Registrar qualquer diferença em relação ao estado aqui descrito.
2. Dizer em até poucas linhas o que considera o **principal problema do produto** e as **duas maiores incertezas**.
3. Propor o menor escopo do **PR 1** com desenho de estados ativos/adiados + compatibilidade de storage + critério de teste visual. Confrontar explicitamente os riscos de implementá-lo de forma simplista.
4. Executar trabalho aprovado, validar de verdade e fazer merge somente após gates; não pedir novamente ao usuário fatos já presentes no repositório e no handoff.
5. Se discordar das recomendações deste documento, EXPLICAR e demonstrar uma alternativa melhor. Este handoff não é autoridade absoluta.

**Primeira pergunta orientadora:** "Qual é a menor mudança comprovável que faz a pessoa abrir o guia e saber, imediatamente, o que fazer e o que não pode perder?"

## 10. Estado das evidências e links para consulta
- Código: https://github.com/Umbraeon/dd2
- Issue de auditoria: https://github.com/Umbraeon/dd2/issues/2
- PR anterior do redesign: https://github.com/Umbraeon/dd2/pull/1
- Auditoria do conteúdo já versionada: docs/AUDITORIA_CONTEUDO.md
- Prompt histórico do AI Studio: docs/PROMPT_GOOGLE_AI_STUDIO.md

**Observação sobre os relatórios independentes:** o usuário forneceu um relatório textual de auditoria estática e um PDF + capturas da auditoria Sonnet dentro da conversa que originou este documento. Eles não foram automaticamente anexados ao repositório. As conclusões aqui são um resumo rastreável dos relatos; para checagem minuciosa de números e capturas, obtenha os artefatos originais com o usuário ou com a pessoa que os gerou, sem inventar onde estão hospedados.

---

**Encerramento do handoff:** agora existe uma base executável e duas auditorias. O próximo Head não precisa começar do zero, mas também não deve herdar as decisões do assistente anterior como se fossem corretas por definição. O sucesso dele será medido pela utilidade e confiabilidade observáveis do produto.

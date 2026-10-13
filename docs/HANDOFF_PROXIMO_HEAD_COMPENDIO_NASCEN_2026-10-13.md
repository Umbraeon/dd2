# Handoff de encerramento — Compêndio do Nascen

**Data de corte:** 13/10/2026 (America/Sao_Paulo)  
**Repositório:** https://github.com/Umbraeon/dd2  
**Última `main` confirmada:** `81200cda2ef4bf27eab05891dc476f2883c77df5` — PR #57.  
**CI da `main`:** [run #38403508754](https://github.com/Umbraeon/dd2/actions/runs/38403508754), `completed/success` para esse SHA.  
**Estado do ciclo:** **encerrado a pedido do proprietário** por limite de tokens. A pesquisa de missão e o mapa próprio permanecem **pendentes e não devem ser considerados executados em segundo plano**. Este documento é um handoff, não uma autorização de publicação ou merge.

> **Decisão editorial central:** 82 fichas de guia publicadas não significam 82 missões validadas em saves. Os recursos extraídos podem certificar títulos e algumas estruturas de dados, mas **não** provam automaticamente gatilhos, consequências, coordenadas de NPCs nem completude de uma expansão.

## 1. Estado do produto confirmado na `main`

- Aplicação React/Vite em PT-BR, com Diário/Jornada, Consulta, Central de Ferramentas, rastreadores, conquistas e consulta a mapa externo por iframe.
- **9** capítulos, **53** marcos editoriais, **60** fichas de conquistas. Um marco não equivale a uma missão individual; IDs numéricos de conquista no acervo não são necessariamente IDs Steam.
- **82 guias individuais** em `src/data/questGuides.ts`: **80** do comparador histórico PowerPyx de 2024 + **A Mão que Guia** e **Intruso de um Olho Só** (PR #56). Esses guias são pesquisa editorial de fontes externas, com títulos cruzados com dados locais; **sem QA completo in-game**. `QUEST_NAME_INDEX` também tem 82 nomes, e dois índices de DLC permanecem **sem guia**: `Chilling Tidings` / **Notícias Congelantes** (`qu040010`) e `Lost Rites` / **Rituais Perdidos** (`CONTENTS_0014`).
- A chave `localStorage` **`dd2_roadmap_user_progress_v3`**, backups, IDs existentes, lógica de conquistas e os 53 marcos devem ser preservados. Nunca alterar sem migração e testes.

### Marcos realmente integrados

| PR | Resultado integrado | Limite |
| --- | --- | --- |
| [#10](https://github.com/Umbraeon/dd2/pull/10), [#11](https://github.com/Umbraeon/dd2/pull/11), [#15](https://github.com/Umbraeon/dd2/pull/15) | Conquistas contextualizadas, reorganização da Consulta e Central de Ferramentas | Não constitui teste humano amplo de UX ou auditoria WCAG completa |
| [#18](https://github.com/Umbraeon/dd2/pull/18) | Iframe MapGenie aberto dentro do Compêndio, com fallback externo e sem escrita de progresso | **Não é mapa próprio**; funcionamento de filtros e autorização de embed continuam incertos |
| [#54](https://github.com/Umbraeon/dd2/pull/54) | Fechamento das **80/80** fichas do **comparador de 2024**, não do jogo completo atual | Fluxos obtidos majoritariamente de walkthroughs, não de saves |
| [#55](https://github.com/Umbraeon/dd2/pull/55) | Auditoria determinística da amostra **59** linhas de títulos extraídos | Amostra 57 base + 2 DLC; não exaustiva |
| [#56](https://github.com/Umbraeon/dd2/pull/56) | Duas fichas introdutórias; 82 guias; matriz de evidências de entrada da DLC | Não afirmar DLC concluída ou suas condições testadas |
| [#57](https://github.com/Umbraeon/dd2/pull/57) | Revisão do pacote de 125 títulos, verificador Python e registro **40 candidatos** separados dos guias | Nenhum desses 40 foi publicado como passo a passo; dados inferidos de runtime ficaram em quarentena |

A `main` após #57 possui CI verde, mas **CI verde não equivale a validação humana, de gameplay, jurídica ou de direitos de imagem**.

## 2. Extração de quests: evidência confiável e limites

O executor forneceu a auditoria `dd2-questlog-audit-2026-10-13.zip`, Steam build **25290080** declarada, com arquivos GMSG, CSVs e alguns recursos RSZ `.user.3`. O revisor recebeu **o ZIP**, não os PAKs originais no disco do executor.

- Integridade do ZIP e 310 hashes do manifesto foram conferidos. **125/125** linhas de títulos cruzaram com GMSG bruto + CSV bruto **dentro do pacote**, o que não certifica origem do PAK independentemente.
- **89** chaves `_log_title` atribuídas ao jogo-base, **36** ao DLC; **124** têm EN/PT-BR; `qu010020` é caso JP/não localizado no pacote.
- Reconciliadas com o projeto: **82** com guia, **2** indexadas sem guia, **40** candidatos adicionais (**6 base + 34 DLC**) e **1** ambígua. Manifesto dos 40 em `docs/audit/questlog-additional-title-candidates-2026-10-13.json`; esse número é **backlog de títulos**, não contagem certificada de quests jogáveis.
- **Não importar** `normalized/quest-stages.csv`, `quest-conditions.csv`, `quest-items-and-rewards.csv`, `quest-branching-and-failures.csv` ou `quest-npc-locations.csv` automaticamente: grande parte deriva de heurísticas de texto e modelos repetitivos sem ligação primária individual entre quest, estado, NPC, reward ID e XYZ. Ver `docs/audit/questlog-package-intake-review-2026-10-13.md`.
- O script versionado `scripts/verify-questlog-package.py` revalida a **consistência interna** com um ZIP local; o CI só executou o smoke de CLI, não o processamento de PAK original.

**Arquivos recebidos nesta conversa:** `dd2-questlog-audit-2026-10-13.zip` (primeira extração); `dd2-quest-runtime-proof-qu040010 (2).zip` (prova inicial); `dd2-quest-runtime-proof-qu040010.zip` (prova corrigida). Os binários de jogo não foram commitados. No próximo ambiente, **localizar ou solicitar os ZIPs originais** se não estiverem acessíveis; não inferir paths `D:\\...` no computador da pessoa usuária como se fossem acessíveis remotamente.

## 3. Executor A — prova P1 de `qu040010`: onde parou

**Missão:** `Chilling Tidings` / **Notícias Congelantes**. **Estado:** `PARTIAL_BINARY_STRUCTURE_VERIFIED`; **`SEMANTIC_QUEST_TRANSITION_NOT_PROVEN`**; **`RUNTIME_NOT_TESTED`**. A missão **não foi incorporada aos guias do app**.

- Entrega mais recente corrigida: `dd2-quest-runtime-proof-qu040010.zip`, declarada com **51 recibos**; hashes do pacote conferidos. O verificador original teve falha grave (declarava sucesso sem binários); a revisão **passa a falhar com exit 1** em arquivos ausentes.
- O Head comparou o script corrigido aos **quatro binários `.user.3` realmente presentes no primeiro ZIP**, ajustando apenas os caminhos locais, e reportou as asserções de bytes/offsets com êxito. Isso é confirmação de **estrutura serializada**, não do comportamento do motor em execução.
- `questcontext_contents0014.user.3` contém `40010` com **31 referências de estágios**; registro da instância 49 tipo `0x857b0d2a`, instância 50 tipo `0xec46fe61`; payloads em `0x91b0`: `[0x7d454c8d,49,754,1]`, `0x91c8`: `[0x2169af74,50,756,1]`. O significado de `754/756` como gatilho **“falar com Brant à noite” não foi demonstrado por esquema RSZ/runtime**. Não denominar os uint32 como instruções de CPU.
- **Correção factual necessária:** CRC da instância 50 é `0x76b0a61e` nos bytes, não `0x1ec46fe6` no recibo do executor.
- `qu040010_log.user.3` referencia location key `3510`; os demais rótulos de local/NPC atribuídos às coordenadas não têm vínculo individual comprovado. `quest-npc-associations.csv` ainda classifica indevidamente todos os 7 NPCs como `BINARY_VERIFIED`.
- Nó `40010` de `questtree_contents0014.user.3` enumera 9 filhos e **não** contém `40020`. `40020` é nó separado. **Não inferir gatilho real de desbloqueio por texto do diário nem por simples adjacência da árvore.**
- Em `quest-unlocks.csv`, há títulos placeholders apesar de existirem nomes EN/PT-BR nos dados extraídos, por exemplo `qu040020` = **Estrondos do Norte**. `#Rejected#` é string de função desconhecida, não prova de fases removidas.
- `verification/runtime-observations.md` contradiz `RUNTIME_NOT_TESTED` ao descrever suposta validação completa. Corrigir antes de qualquer classificação `BINARY_VERIFIED` semântica ou guia em produção.

**Recibo de auditoria independente:** [comentário na issue #37 de 13/10/2026](https://github.com/Umbraeon/dd2/issues/37#issuecomment-6148047363). Também consultar comentários [#6147173100](https://github.com/Umbraeon/dd2/issues/37#issuecomment-6147173100), [#6147020550](https://github.com/Umbraeon/dd2/issues/37#issuecomment-6147020550). **O executor A foi instruído a corrigir o CRC, dump integral, classificações, nomes e script parametrizado; não há nova entrega confirmada depois desse pedido.**

**Critério de retomada:** exigir vínculo verificável de `quest ID → campo RSZ tipado → condição real → evento/NPC`, recibo reproduzível e, idealmente, observação em save controlado. Se a semântica não puder ser validada, declarar bloqueio fundamentado. Não criar guia a partir da mera presença de GUIDs/opcodes numéricos.

## 4. Executor B — mapa próprio sem MapGenie

O proprietário decidiu investigar um **mapa web independente**, com camadas de quests, NPCs, cavernas, Mementos e viagem rápida. O Head forneceu o prompt **B01 — investigação cartográfica e protótipo** para executor B, em branch/worktree isolado `research/dd2-independent-map-poc-b01`.

**Até o corte deste handoff não houve upload, PR, screenshots ou evidência de execução do B01 nesta conversa.** Não afirmar que o mapa próprio existe.

- Mapa atual em produção: `src/components/TokensInteractiveMap.tsx`, iframe `https://mapgenie.io/dragons-dogma-2/maps/world?embed=light`, sem acesso/sincronização aos pins de terceiros. Questões de filtro visível e autorização do provedor continuam pendentes na [issue #16](https://github.com/Umbraeon/dd2/issues/16).
- Viabilidade B01: localizar recursos cartográficos de jogo `.tex` e afins; estudar reconstrução/tiles localmente; obter pelo menos cinco âncoras confiáveis e estimar transformação `XYZ → (pixelX,pixelY)`; construir um protótipo separado com React + Leaflet `CRS.Simple`, dados próprios e sem dependência da API privada do MapGenie. **Não presumir** eixo, escala ou relação de localização.
- Separar investigação privada de textura e **direito de redistribuição/publicação**. Não commitar arte proprietária extraída, PAKs ou saves; usar arte cartográfica publicável no protótipo e avaliar distribuição antes de tornar pública imagem extraída. “Gratuito/fanmade” não é licença automática.
- Nenhuma alteração de produção do mapa, progressos ou guias foi autorizada para B01. Se o executor B reaparecer com resultados, avaliar **PR e screenshots reais**, não o relato apenas.

## 5. Pendências e governança no GitHub

### Issues abertas que **não** podem ser encerradas como “conteúdo validado”

- [#37](https://github.com/Umbraeon/dd2/issues/37) **P1**, inventário completo/identidade real das missões e DLC: falta prova semântica de runtime, fichas do DLC e QA em jogo. Registros de títulos não bastam.
- [#27](https://github.com/Umbraeon/dd2/issues/27) **P1**, cobertura factual por missão, critérios temporais e consequências: 82 guias editoriais não equivalem a validação completa dos caminhos.
- [#13](https://github.com/Umbraeon/dd2/issues/13) **Missão 04**, auditoria factual/PT-BR ainda aberta.
- [#16](https://github.com/Umbraeon/dd2/issues/16) mapa externo e limitações de incorporação, enquanto o mapa próprio é uma nova investigação.
- [#2](https://github.com/Umbraeon/dd2/issues/2) auditoria UX/UI **independente**, ainda não realizada apenas por integração de PRs.

### Componentes de UI de escopo implementado — issues encerradas neste handoff

- [#9](https://github.com/Umbraeon/dd2/issues/9) **closed/completed**: conquistas inline + Consulta por PRs #10/#11, com Ferramentas opcionais no PR #15. Fechamento **somente do escopo de implementação**; revisão humana UX e auditoria factual continuam separadas.
- [#12](https://github.com/Umbraeon/dd2/issues/12) **closed/completed**: Central de Ferramentas integrada pelo PR #15 com regressões automatizadas. Fechamento **somente como funcionalidade implementada**, sem declarar WCAG integral ou testes com jogadores; acompanhar issue #2.

### PRs ainda abertos em 13/10/2026

- [#32](https://github.com/Umbraeon/dd2/pull/32) **draft** Wilhelmina, branch antiga potencialmente desatualizada. Não fazer merge sem rebase/análise de duplicação com as 82 fichas atuais, CI no head e QA dos gatilhos.
- [#14](https://github.com/Umbraeon/dd2/pull/14) **draft** agente auditor factual. Não confundir definição de agente com auditoria realizada.

## 6. Primeiros passos do próximo Head, quando houver solicitação

1. **Começar por este handoff, depois inspecionar `AGENTS.md`, o anterior de 09/10, `main`/CI, issues #37/#27/#16/#2, PRs #14/#32 e anexos recebidos.** Não confiar somente nas contagens relatadas.
2. Responder ao próximo pedido específico do proprietário; **nenhum trabalho está executando em background** e o encerramento atual não autoriza iniciar automaticamente Missão 03 ou 04, PRs de UX ou substituição do mapa.
3. Se o Executor A devolver ZIP revisado, primeiro conferir hashes/binários/scripts e tiers, depois avaliar se o gatilho semântico foi de fato comprovado; não inventar fatos para “fechar” o problema.
4. Se o Executor B devolver pesquisa B01, verificar inventário real de texturas, direitos de uso, coordenadas com erro mensurado, screenshots e protótipo independente; não usar pins scraped do MapGenie.
5. Se houver nova autorização para implementação, entregar PR **pequeno**, testes TypeScript/unitários/build/E2E aplicáveis, revisão factual e sem mudança no progresso v3, sem merge em falha de CI.

### Decisões finais deste ciclo

**Encerrado:** estudo editorial histórico dos 80 guias; duas fichas introdutórias; documentação e auditoria do primeiro ZIP; revisão binária estrutural preliminar de `qu040010`; prompts independentes para executores A/B.  
**Não encerrado:** prova semântica dos gatilhos de `qu040010`, validação em saves, conteúdo completo da DLC, mapa independente, QA UX humano, autorização de assets/iframe.

**Fronteira de responsabilidade:** este documento não declara resultados não observados, não mexe em `src/data` e não altera `dd2_roadmap_user_progress_v3`. O ciclo foi encerrado; qualquer próximo trabalho exige novo pedido explícito.

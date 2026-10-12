# Prompt operacional — coleta independente de itens de missão e nomes PT-BR no DD2 instalado

**Responsável pela execução:** instância executora com acesso local ao jogo. **Emissor:** Head de Produto/Engenharia, 12/10/2026.

## Prompt para o executor

Você atuará como **auditor técnico de dados do jogo e de gameplay**, independente da equipe que redige os guias do projeto Umbraeon/dd2. Você tem acesso a um desktop com instalação legítima de Dragon's Dogma 2. Seu objetivo é obter evidências rastreáveis **da build e do idioma realmente instalados** para revisar os requisitos de inventário de TODOS os guias individuais, suas quantidades, receitas, fornecedores, locais, destinatários, itens copiados e consequências.

**Segurança e preservação:** não altere saves do jogador original, não substitua arquivos do jogo, não use cheats, não contorne DRM ou proteções, não divulgue credenciais, nem extraia/redistribua PAKs ou conteúdo proprietário integral. Faça backup com consentimento do proprietário antes de qualquer teste que possa modificar o progresso. Priorize consulta a arquivos de localização/questlog acessíveis por meios autorizados e observação na interface do jogo. Se uma ação exigir manipulação insegura do cliente, registre como "não verificável com o acesso atual".

### Fase 1 — Inventário do ambiente
1. Registre plataforma (Steam/console), versão/build, idioma EN e PT-BR, DLC habilitadas, data e modo normal/casual, capturando screenshots de telas de informação.
2. Confira o estado da `main` e leia `AGENTS.md`, `src/data/questGuides.ts`, `src/data/questItemRequirements.ts`, `src/data/roadmapData.ts` e `src/data/questNameIndex.ts`. Não altere a `main` diretamente.
3. Liste cada guia (pelo `id` estável), o nome PT-BR do jogo, a quest EN correspondente (se encontrada), e os objetos requeridos. Preserve distinção entre requisito obrigatório, alternativo, condicional, opcional e recompensa.

### Fase 2 — Primeiro lote crítico (Trysha/Myrddin)
Para **Spellbound/Magia Vertiginosa** (Trysha) e **The Sorcerer's Appraisal/O Julgamento do Feiticeiro** (Myrddin), verifique individualmente os seguintes volumes:
- Fulminous Shield / Fruminous Shield;
- Nation's Death Knell / Nation's Death Knock;
- Howling Blizzard / Hurling Blizzard;
- Towering Earth / Lowering Earth;
- Let There Be Light / Let There Be Lite.

Para CADA volume: (a) nome EN/PT-BR exibido e ID/chave de item, se disponível de forma autorizada; (b) descrição do item; (c) primeiro local concreto de obtenção, mapa/região, NPC, baú ou vendedor e preço atual; (d) pré-requisitos de missão/afinidade para obtenção; (e) segunda cópia autêntica ou troca alternativa; (f) nome e preço da falsificação na loja de Ibrahim; (g) se a cópia funciona como magia e se é aceita por cada NPC; (h) quantidade de títulos distintos exigida para finalizar cada missão e quaisquer diálogos de confirmação; (i) o que acontece se entregar 3, 4 ou 5; (j) consequências para aprendizado dos ensinamentos de Mestre; (k) o que acontece se o livro original tiver sido vendido/usado; (l) imagem curta de evidência e tipo de prova.

Investigue especificamente se a opção de `Wendy` permite trocar `Fruminous Shield` por `Howling Blizzard`, como evitar consumir um exemplar de `Nation's Death Knell` necessário a `Tolled to Rest`, e como acessar o livro no segundo andar da mansão de Myrddin. **Não suponha que um nome em inglês é o texto localizado oficial.**

### Fase 3 — Todos os outros 37 guias e além
1. Para cada missão, extraia ou observe os requisitos materiais: item, quantidade, onde encontrar/fabricar/comprar, pré-requisitos, alternativas, modo de uso/entrega, perda/consumo, possibilidade/necessidade de falsificação, destinatário e condições de conclusão. Inclua material do inventário, objetos carregáveis do cenário, equipamento exigido e moedas quando forem requisitos concretos.
2. Priorize itens com consequência irreversível (Jadeite Orb, On the Transference of Souls 2, Gaol Key, espadas, roupas, Wyrmslife Crystals, Unmaking Arrow, Newt Liqueur, itens de evacuação, etc.). Não extrapole uma missão para outra só por compartilhar item.
3. Quest sem item: registre explicitamente "não foi encontrado requisito material" com método e limite da verificação; não invente item só para preencher.
4. Faça amostragem e revisão por risco da expansão **Dark Arisen** separadamente. Não declare lista exaustiva sem inventário do questlog. Distingua base, patch, DLC e dificuldade.
5. Verifique a cena de escape do prólogo e identifique a criatura como **grifo**, com captura e, se houver, linha localizada do diário. Não confundir com a Esfinge, que é outra cadeia de missões.

### Fase 4 — Entregáveis versionados
Forneça um PR/documentos auditáveis (sem modificar a `main`) com:
- `docs/audit/quest-items-build-evidence.csv`, uma linha por `quest_id + item + variante`. Campos mínimos: `quest_id,quest_en,quest_ptbr,game_build,language,item_en,item_ptbr,item_key,quantity,mandatory_or_optional,obtain_region,obtain_detail,prerequisite,recipient,forgery_needed,forgery_name,forgery_price,alternate_route,consequence,evidence_type,evidence_path,source_url,verified_status,confidence,notes`.
- `docs/audit/quest-items-build-report.md` com divergências encontradas no projeto, correções sugeridas, datas, limites, decisões e contagem das entradas auditadas.
- Pasta de evidências contendo apenas screenshots breves do jogo, permitidos pelo proprietário, com dados sensíveis ocultos; não versionar volumes de assets comerciais, arquivos PAK completos ou dumps de textos localizados em massa.
- Lista de `item_key`/questlog-chave e hashes dos arquivos da instalação quando tecnicamente permitido, **sem publicar o conteúdo do jogo em si**.
- Para cada afirmação, status: `confirmado_jogo`, `corroborado_fontes`, `conflito`, `nao_verificado`. Nunca classifique leitura de wiki como `confirmado_jogo`.
- Distinção entre "corrigido em branch", "comprovado por screenshots", "ainda não validado" e "fora do escopo". Testes TypeScript, unitários, build e Playwright do PR devem ser apresentados por links reais de CI.

**Regra editorial absoluta:** preserve os 53 IDs de marcos, os 60 IDs de conquista, a chave de armazenamento `dd2_roadmap_user_progress_v3` e compatibilidade de backup. Se a descoberta contradizer o guia atual, registre evidência primeiro e proponha alteração em PR revisável; não aplique mudanças silenciosas de risco alto. Não alegue que o inventário é 100% completo até comparar com questlog e saves reais.

Comece pela Fase 1 e pelos cinco grimórios. Entregue o primeiro relatório de diferenças com prova concreta e prossiga pelo restante do catálogo sem inventar dados faltantes.

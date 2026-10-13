# Recebimento do ZIP de questlogs do build 25290080 — 13/10/2026

**Origem:** `dd2-questlog-audit-2026-10-13.zip`, fornecido pelo executor do proprietário. **SHA-256 do ZIP:** `d12cd191ed21405191142330f700aa70431270a0d6fbdd3d156ef8117a1b4eb1`. A instalação original e os PAKs locais não estavam acessíveis ao revisor. Esta verificação é feita **dentro do pacote recebido**, não certifica o build instalado independentemente.

## Verificações reproduzidas no pacote

- ZIP íntegro: **311 entradas**, das quais **310 arquivos declarados em `SHA256SUMS.txt`**. Recomputados **310/310** SHA-256 corretamente.
- **125/125** linhas de `normalized/quest-titles.csv` confrontadas com seus respectivos `raw/base|dlc/*.msg.24` (SHA-256 do binário) e `raw/base|dlc/*.msg.24.csv` (SHA-256 do CSV), além do **valor EN/PT-BR sob a chave `_log_title`**. **125/125 conciliadas com o próprio pacote**, não com PAK original.
- Fontes declaradas nos metadados: **89 entradas do PAK base** e **36 entradas do PAK DLC**; **124 entradas têm título EN/PT-BR**, uma (`qu010020`) tem texto JP e EN/PT-BR em branco.
- Cruzamento do executor: **82 títulos associados a guias**, **2 indexados sem guia**, **40 candidatos a novos guias**, **1 entrada não localizada**. A classificação "guia existente" depende da versão de `main` informada no relatório, que não substitui validação de jogabilidade.
- Os **40 candidatos** estão registrados em `questlog-additional-title-candidates-2026-10-13.json` com ID, título EN/PT-BR, origem declarada base/DLC e SHA-256 do arquivo bruto. **6 entradas base + 34 DLC**; **sem** publicação como quests jogáveis até verificar seus gatilhos de gameplay.
- `qu040041`, `qu040042`, `qu040043` são **três chaves/IDs diferentes de questlog** e `qu050010` / `qu050130` são duas chaves diferentes. Isso **não** confirma sozinho independência de ciclos jogáveis, desfechos ou questlines completas.

## Bloqueios de confiabilidade — conteúdo normalizado que NÃO deve ser tratado como script do jogo

| Arquivo | Sinal detectado | Classificação correta |
| --- | --- | --- |
| `normalized/quest-stages.csv` | **1.778** linhas etiquetadas `EXTRACTED_GAME_RESOURCE` incluem etapas de "START_TRIGGER" geradas de textos de sumário, com `prerequisite_condition = Quest Initiation` ou `Stage N completion` | **Sequenciamento editorial** de strings do diário, não transições de runtime extraídas |
| `normalized/quest-conditions.csv` | **85** linhas `UNMOORED_LOCKOUT` recebem a mesma regra genérica; outras **90** associam `PREREQUISITE` à mesma fórmula `Progressão no roteiro principal / Diálogo com NPC dador` | Hipótese/regra genérica; não afirmar que todas essas quests falhem ou iniciem assim |
| `normalized/quest-branching-and-failures.csv` | **121 das 125** linhas repetem `Conclusão antes do Endgame / Mundo Desancorado` como ramo da missão | Modelo genérico, **não** comprovação de 121 escolhas irreversíveis |
| `normalized/quest-items-and-rewards.csv` | **71 linhas** recebem exatamente **2.000 G, 1.500 XP, 150 DCP**; **23** recebem 3.500/2.800/250, **12** recebem 6.000/4.500/500 | Valores parecem **padrões por categoria**, não extração item a item de `questrewardtabledata.user.3`; requer ID de reward vinculando cada quest ao valor no binário |
| `normalized/quest-npc-locations.csv` | Somente **8 de 223** linhas declaram `EXACT_LOCATIONDATA_USER3`. Rook, Thed e Justinn recebem a **mesma** coordenada; Brant, Waldhar e Dorin recebem a **mesma** outra coordenada; Brant/Polyeidus a terceira. A chave de localização não demonstra vínculo individual com um NPC | Coordenadas numéricas podem ser reais para **marcadores**, mas seu vínculo com esses NPCs **não está demonstrado** |

**Consequência:** não importar automaticamente esses CSVs para `questGuides.ts`, `questItemRequirements.ts`, roteiros de escolhas, mapas ou app. Tampouco reinterpretar número de `_log_title` como número de missões jogáveis. SHA válido comprova **integridade interna do ZIP**, não que todos os campos derivados sejam verdadeiros, nem que o PAK instalado corresponda ao arquivo enviado.

## Prioridade de produto

1. **P1 — texto oficial sem supor comportamento:** disponibilizar os 40 candidatos na **auditoria técnica** (este PR), preservando todos os 82 guias e 53 marcos. Ainda não acrescentar índices sem `eventIds` confirmados.
2. **P1 — DLC:** pedir ao executor mapeamento reprodutível dos **gatilhos do diário** para `qu040010` e `contents_0014`. Cada condição deve trazer tipo RSZ, nome de campo, ID de instância, offsets/payload decodificado e evidência de associação (ou declaração de desconhecido). Mensagens `Mes_*_task_*` são texto, não prova de gatilho.
3. **P1 — recompensas e localização:** exigir entradas individuais com registros binários que unam **ID da quest → ID de recompensa → valor**, ou **ID da quest → location key → instância → XYZ**. Sem isso, classificar como `INFERRED` ou `UNKNOWN` e não exibir coordenadas de NPCs.
4. **P2 — novas fichas:** começar por `qu020160`, `qu020170` e `qu020180` (três títulos adicionais do base), e `qu040021`–`qu040023` (precursoras reportadas). Criar guias somente após gatilhos, etapas, locais, itens e consequências validados por múltiplas fontes ou um save controlado.
5. **P2 — expansão:** tratar as 34 entradas novas do DLC como **backlog factual de títulos**, não como 34 walkthroughs prontos. As duas já indexadas (`Chilling Tidings`, `Lost Rites`) seguem sem guia individual.

## Integridade do produto

Nenhuma alteração em `src/data`, no índice editorial, nos 53 marcos, nas 60 conquistas ou na persistência `dd2_roadmap_user_progress_v3`. O novo teste verifica unicidade, proveniência, separação de catálogos e ausência de campos de mecânica no inventário de candidatos.

### Próximo entregável necessário do executor

Um **recibo RSZ mínimo e reproduzível para uma missão** (idealmente `qu040010`): hash do recurso bruto, tipo/instância/campo com offsets reais, dump parcial suficiente para reproduzir a associação de gatilho, verificação no save sem alteração de estado, e erro explícito quando um campo não puder ser decodificado. Repetir para recompensas e marcadores. Isso supera produzir mais 125 roteiros narrativos derivados de mensagens.

# Auditoria consolidada das transcrições — playlist Romar

**Data:** 2026-10-11 · **Issue:** #13 · **PR documental:** #17 (mesclada após a consolidação) · **Escopo:** texto das transcrições; nenhum frame novo analisado.

## Identificação e cobertura

- **Criador:** [Romar](https://www.youtube.com/@RomarJogos).
- **Título exato da playlist:** [Dragon's Dogma 2 Detonado Platina/todas as Quests](https://www.youtube.com/playlist?list=PLqFM8GX-LFqVE3O2aYIvVf-Hq_5D_y92T).
- **Episódios identificados:** 43.
- **Transcrições inspecionadas:** 43/43.
- **Indisponibilidades reais:** 0.
- **Vídeos assistidos integralmente:** 0. Uma inspeção visual pontual anterior à restrição de escopo preserva a UI PT-BR do episódio 1 em 16:14; nenhum frame foi revisto nesta consolidação.

Proveniência bruta:

| Conjunto | Episódios | Registros aceitos |
|---|---:|---:|
| Passagem temática inicial | 1, 2, 12, 18, 24 | 23 |
| Passagem 1 | 3–11, 13–17, 19–23 | 76 |
| Passagem 2 | 25–43 | 77 |
| **Total** | **43/43** | **176** |

Os arquivos `video-transcript-pass-1.csv` e `video-transcript-pass-2.csv` permanecem inalterados como proveniência. A matriz canônica [video-evidence-matrix.csv](video-evidence-matrix.csv) contém **176 registros únicos**; não houve duplicata exata entre os três conjuntos. Esses registros são trechos temporais, não 176 quests, 176 fatos independentes nem 176 fontes independentes.

## Resultado canônico

Após normalização ao vocabulário obrigatório:

| Resultado | Registros | Significado nesta auditoria |
|---|---:|---|
| `CORROBORADO` | 6 | Trecho sustenta diretamente a instrução, respeitadas as limitações registradas. |
| `CONTRADITO` | 2 | A rota/transcrição contradizia o texto auditado de `m04` e `sphinx_diff`; ambos foram corrigidos posteriormente pela PR #20. |
| `DIVERGENTE` | 1 | Fonte independente diverge da hipótese narrada sobre período de Beren. |
| `PARCIAL` | 153 | Narração, rota observada, autocorreção ou cobertura incompleta; não vira requisito universal. |
| `NAO_VERIFICADO` | 14 | Hipótese do narrador, alternativa ou consequência não demonstrada. |

Foram associados IDs editoriais em 121 registros e IDs de conquistas em 82, somente quando o vínculo era suportado. As colunas `evidence_kind`, `asr_caveat`, timestamp e URL preservam narração, rota observada, hipótese, autocorreção e limite de cobertura.

## Conclusões materiais por tema

- **`m02` — Accardo/Phill:** UI e dados atuais confirmam título, NPCs e caminhos de sucesso/morte. A ampulheta sustenta natureza temporizada. **UNKNOWN:** prazo numérico e gatilho temporal exato.
- **`m04` — Lennart:** rota observada e `questlog` atual sustentam `barris → Lennart → veneno → Lennart`. Ian pertence a outra quest.
- **Beren/maestria:** a playlist demonstra progressão em uma execução e relata estados bloqueados em outra; não determina todas as condições de falha.
- **Melve/Harve/Ulrika:** há conexão e cronologia observadas, mas a ordem não foi demonstrada como universal.
- **Wilhelmina:** os três dias começam depois de aceitar reunir provas. O narrador abandona a hipótese de que sair de Vernworth seja obrigatório; alternativas permanecem incompletas.
- **Coroação/fronteira:** a playlist reforça cautela e sequência editorial, não uma lista universal de cancelamentos.
- **Esfinge:** sete dias contam após Ruminação; segunda área tem ordem variável; Reunião entra na contagem. A evidência contradizia a redação histórica de `sphinx_diff`: Vergil não fica em Bakbattahl, mas ao sul da fronteira na Cidade de Descanso da Fronteira. A PR #20 corrigiu a produção.
- **Carroça Fantasma:** rota noturna, documento, disfarce e locks relatados são úteis; gatilho único, obrigatoriedade e universalidade dos bugs continuam não verificados. O narrador autocorrige a hipótese de visita diurna.
- **Isaac:** a fonte narra original/falsificação e resultado ruim, mas não executa comparação completa dos dois outcomes; manter cautela.
- **`A New Godsway`:** episódio 35 dá forte aviso de checkpoint antes de falar com Ambrosius. É evidência narrada, não prova universal do exato frame de não retorno.
- **Gigantus:** flecha e timing foram narrados, mas uma gravação não exibiu o troféu por problema técnico. Isso não confirma nem refuta o requisito.
- **Mundo Desancorado:** playlist narra pilares, névoa, descanso e evacuações, mas mantém incerteza sobre contagens, limite e condição de `O Guardião`.
- **Cinco evacuações:** a documentação independente localiza cinco linhas; a playlist não resolve se a conquista exige todas as cinco.
- **Cristais:** `110` é contagem/hipótese da execução, não requisito confirmado. Não promover.
- **DLC:** série de 2024 não cobre Dark Arisen/TU3.1/TU3.2.

## Nomenclatura

Transcrição, capítulo e ASR não foram usados para oficializar nomes. A extração separada do build 25290080 agora comprova **59/59 títulos canônicos** de `quest-name-mapping.csv`, inclusive `Notícias Congelantes` e `Rituais Perdidos`; detalhes em [game-localization-extraction-report.md](game-localization-extraction-report.md). Nenhum título canônico permanece apenas `LOCALIZACAO_EXTRAIDA` ou `NAO_CONFIRMADO`.

## Valor da playlist como referência

**Decisão:** manter entre as cinco referências principais, com a função `GUIA_COMUNITARIO_VIDEO / REFERENCIA_CONTEXTUAL`.

- **Valor de rota prática:** alto; fornece sequência, timestamp e exemplos de sucesso/falha.
- **Descoberta de missáveis:** média/alta; gera bons candidatos P1, mas frequentemente sem teste comparativo.
- **Confiabilidade factual:** média; autocorreções e incertezas são explícitas, e vários relatos não isolam causa.
- **PT-BR oficial:** baixa como fonte de nomenclatura; somente a UI pontual serviu como prova, agora superada em cobertura pelos PAKs atuais.
- **Versão atual/DLC:** baixa; a série é de 2024.
- **Independência:** não estabelecida quando o narrador menciona comentários ou rotas de terceiros.
- **Iniciantes:** útil se apresentada com avisos e não como garantia de completude.

A utilidade anterior do criador em DD1 não é evidência factual para DD2.

## Relação com as PRs #19 e #20

A revisão e sua reavaliação estão em [pr19-current-review.md](pr19-current-review.md). A PR #19 foi fechada sem merge; a PR #20 incorporou as correções de `sphinx_diff`, ordem de `m04` e tratamento do outcome fatal de Accardo em `m02`. A inspeção de `main@6fe3b38` confirmou a redação e as regressões textuais. Não há P0 demonstrado.

## Estado

**Classificação:** `PARTIAL`, não bloqueada. A cobertura textual da playlist está completa, mas consequências irreversíveis, timers, saves, troféus, DLC e alternativas continuam materialmente desconhecidos.

**Próxima ação exata:** priorizar testes runtime precommitados somente para consequências irreversíveis que ainda não têm duas fontes independentes; não reabrir os três reparos textuais já presentes no `main`.

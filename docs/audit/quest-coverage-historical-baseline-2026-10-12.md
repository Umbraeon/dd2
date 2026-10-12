# Linha de base independente da cobertura de missões — 12/10/2026

## Propósito
A aplicação reúne 53 **marcos editoriais**, 60 **fichas de conquistas** e 26 **walkthroughs individuais** na `main` de partida. Nenhum desses totais significa número de quests oficiais. O índice PT-BR tem 59 pareamentos que também **não** representam todas as missões.

Como referência externa, a lista histórica [PowerPyx — All Quests](https://www.powerpyx.com/dragons-dogma-2-walkthrough-all-quests/) (publicada em março/2024) enumera **16 missões principais e 64 secundárias**. A fotografia manual desses 80 nomes EN encontra-se em `docs/audit/quest-catalogue-powerpyx-2024.json`.

**Escopo limitado:** este é um **ponto de comparação histórico**. Não significa prova de todas as quests do build Steam 25290080, de novas quests da expansão Dark Arisen, de estados alternativos/quests não listadas, nem de correção dos 59 nomes PT-BR. O catálogo não foi extraído da instalação atual.

## Como reproduzir
Do root do projeto com dependências instaladas:

```bash
node --import tsx scripts/report-quest-coverage.mjs > quest-coverage-local.json
```

O relatório determina para cada entrada: nome EN, tipo principal/secundário (na lista histórica), ficha individual vinculada por nome EN, nome PT-BR existente e força da evidência do índice. Mostra separadamente: nomes da lista de 2024 sem guia, títulos ainda não localizados e entradas **fora** da lista de 2024. **Não há porcentagem de "conclusão do jogo".**

## Leitura correta dos números
- Cobertura é **presença de ficha**, não validação do walkthrough.
- `pak_sample_reported` significa amostra reportada e versionada; `paired_catalog` significa pareamento de catálogo, **não** extração PAK individual comprovada.
- A lista de 2024 não inclui necessariamente o conteúdo adicionado depois. Os nomes de DLC e quests do prólogo podem aparecer como "fora da base"; não são falhas automáticas.
- `An Unsettling Encounter` consta da lista PowerPyx, mas não tem título PT-BR no índice atual. **Não inventar nome.**
- Atualize a base **somente** com uma fonte, versão e data explícitas; preserve snapshot anterior para comparar.

## Próximos passos de curadoria
1. Obter inventário por ID/questlog do build atual, incluindo expansão, para comparar entrada por entrada; não inferir completude de fontes web.
2. Tratar conflitos de ID/versão e títulos PT-BR ainda não comprovados com prova primária, mantendo `UNKNOWN` internamente.
3. Priorizar as fichas que faltam em pontos irreversíveis e encadeamentos de NPCs; revisar em saves a lógica de missabilidade quando possível.

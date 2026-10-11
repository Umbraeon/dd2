# Revisão de títulos de quests nas orientações — 11/10/2026

## O que foi integrado

A `main` já possuía um índice das **59 correspondências EN/PT-BR** em `src/data/questNameIndex.ts`, com sete amostras PAK reportadas e 52 registros da matriz de catálogo. Entretanto, as dicas da jornada, condições dos mestres, checkpoints e textos de conquistas continuavam com títulos em inglês isolados.

Esta revisão usa **exclusivamente os nomes do índice versionado** para localizar **57 referências textuais a 30 títulos distintos**, em 43 linhas originais de `roadmapData.ts`. Houve ainda ajuste explícito em `Trial of Archery`, abreviação usada na condição do Arqueiro, para o par já indexado `A Trial of Archery` / `A Prova de Arco e Flecha`. Em cada referência modificada, o português é exibido em primeiro lugar, preservando o inglês para pesquisa e desambiguação. Os demais registros do índice continuam consultáveis na seção recolhível do Diário, **sem serem adicionados artificialmente** como missões obrigatórias ou passos de progresso.

Foram revisadas a legibilidade e a continuidade de instruções em Bakbattahl, Vernworth, Melve, rotas de mestres e Gigantus. Mantivemos ações relevantes sobre Bermudo, Hugo e Nadinia e alteramos duas advertências excessivamente absolutas sobre o efeito da coroação para linguagem compatível com a auditoria precedente. A dica de Gigantus não trata o descanso na pousada como rollback seguro.

## Fontes e limites

- **Matriz usada:** `docs/audit/quest-name-mapping.csv` por meio de `src/data/questNameIndex.ts`.
- **Extração DD2 relatada:** Steam build 25290080; os sete pares amostrados contêm chaves, caminhos e SHA256 no índice. **Os arquivos primários integrais `game-localization-evidence.csv` e `game-localization-extraction-report.md` continuam ausentes deste repositório**. Não foi possível importar ou revalidar individualmente todos os 59 hashes.
- **Confiança:** equivalências editoriais dos 52 pares vêm da matriz de catálogo; não chamar todos os 59 de PAK-comprovados sem os resultados primários individuais. A tradução de um título não prova a veracidade de uma condição, cronologia, consequência ou gatilho da conquista.

## Preservação e validação

Foram mantidos os IDs e os totais (9 fases, 53 marcos, 60 conquistas, 4 checkpoints), as referências internas, as fontes externas e o esquema de progresso `dd2_roadmap_user_progress_v3`. Somente textos de exibição, testes e documentação foram alterados. O CI contém conferência de títulos bilíngues em orientações, salvamentos, invariantes e Playwright desktop/mobile com prova de não gravação de progresso.

## Pendente após o merge

Se os arquivos primários completos da extração original forem adicionados depois, reconciliar as 59 chaves e hashes com o índice e reclassificar **cada** entrada que puder ser auditada. Priorizar conferência in-game de gatilhos e das rotas perdíveis. Não classificar o roteiro como 100% homologado.

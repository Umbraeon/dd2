# Passagem 1 de transcrições da playlist Romar — correção

**Data:** 2026-10-11
**Escopo:** episódios 3–11, 13–17 e 19–23; somente o painel textual de transcrição do YouTube.

## Cobertura real

- **19 episódios previstos.**
- **19 painéis de transcrição encontrados.** Em todos foram confirmados a aba `Transcrição`, o campo `Pesquisar transcrição` e segmentos com timestamp/texto.
- **19 transcrições lidas do primeiro ao último segmento.** O primeiro e o último timestamp de cada painel foram conferidos; nenhum vídeo foi reproduzido como conteúdo e não houve inspeção de frames.
- **75 registros factuais** produzidos em `video-transcript-pass-1.csv`.
- **0 indisponibilidades reais.** O registro anterior de indisponibilidade foi corrigido; exportadores ASR vazios e duração de anúncio não foram tratados como ausência de painel.

O fluxo usado por episódio foi: página individual → aguardar hidratação/anúncio → `mais` da descrição → `Mostrar transcrição` → confirmação do painel → leitura dos segmentos via DOM. Quando o player ainda mostrava anúncio, a duração só foi aceita depois de o player exibir a duração integral; no episódio 23 isso exigiu aguardar o fim do anúncio. A transcrição foi lida pelo painel, não pelo título ou pelos capítulos.

## Principais corroborações

- Episódios 3–6: rota por cavernas/Ciclope; missão de grimórios de Eini/Trysha com possível conflito; Beren como mestre de Guerreiro; progressão temporal; Harve/Melve como linhas conectadas, ainda sem ordem universal.
- Episódios 7–11: magistrado preso e destino em biblioteca; linha da freira; alerta de que a coroação/fronteira pode alterar disponibilidade; rota do arqueiro élfico, escoltas e chegada à Esfinge.
- Episódios 13–17: Harve e invasores escamosos; habilidade mestra de Ladino; tentativas e hipóteses sobre Disa; Esfera de Jade com passagem de dias; travessia de fronteira e cronologia de Ulrika.
- Episódios 19–23: quests temporizadas e risco de bug; travessia ilegal/por permissão; chegada a Bakbattahl; bifurcação do grimório de Isaac; Carroça Fantasma, documento, disfarce e limitações espaciais.

## Contradições, retratações e limites

- O narrador corrige a própria classificação da escolta do elfo: primeiro considera possibilidade de tempo e depois diz que não é missão temporizada e que a vida não está em risco imediato (episódio 10).
- No episódio 3, ele admite que usou a memória para a lista de livros e não sabe se o item está nela.
- Nos episódios 15–16, “bug” da quest de Disa e o gatilho da Carroça Fantasma são hipóteses/relatos, não testes controlados.
- No episódio 23, o narrador admite que não sabe se atacar um NPC altera a continuação da quest.
- Variantes como `Eini/Trysha`, `Beren/baren`, `Battahl/Bakbattahl`, nomes de freiras, itens e títulos de quests foram preservadas como ASR potencialmente corrompido. Não foram promovidas a nomes oficiais PT-BR.
- Rotas com troca para arqueiro, duplicação da Esfera de Jade, travessia por carroça e disfarce na Carroça Fantasma são rotas observadas; não provam que alternativas falham ou que a rota é obrigatória.

## P1 candidatos

- **P1 — perdibilidade e cronologia:** habilidade mestra de Combatente/Beren, escolta do arqueiro, coroação/fronteira, Ulrika e Carroça Fantasma são descritas com alertas de tempo, mas exigem testes por estado antes de virar regra absoluta.
- **P1 — quests possivelmente travadas:** Disa, a quest do episódio 19 e Carroça Fantasma têm falha/bug relatado ou observado; a transcrição não prova causa geral nem recuperação universal.
- **P1 — outcomes do grimório de Isaac:** a fonte afirma “final ruim” e impacto na loja, mas não executa as bifurcações completas no trecho.
- **P1 — travessia e troféu:** o episódio 20 relata uma tentativa de troféu que falhou e outra rota sem permissão; o gatilho efetivo continua não homologado.

## P2 candidatos

- Nomes PT-BR literais de quests, NPCs, itens e locais continuam exigindo UI/localização; ASR e capítulos não bastam.
- Preços, contagens de dias, ordem de inimigos e estratégias de combate são observações da rota, não requisitos gerais.
- Algumas conexões de quests são mencionadas sem identificação suficiente do NPC ou sem testar a alternativa.

**Classificação atual:** `SUPPORTED` para as observações narradas e sequências efetivamente percorridas; `UNKNOWN` para alternativas não testadas, nomes oficiais não confirmados, causas de bugs e consequências não executadas. A passagem só poderá ser considerada concluída após a revisão factual dos registros e da consolidação posterior; esta correção não altera `audit-summary.md`, `claims-matrix.csv` nem relatórios canônicos.

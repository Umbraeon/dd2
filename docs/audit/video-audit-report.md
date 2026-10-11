# Auditoria por transcrições da playlist — passagem incremental

**Data:** 2026-10-11 · **Issue:** #13 · **PR:** #17 (draft) · **Escopo:** pesquisa e documentação, sem alteração de produção.

## Cobertura real

- **43 episódios identificados** na playlist do canal Romar, com ID, título, duração e URL em `video-episode-index.csv`.
- **5 transcrições efetivamente examinadas**: episódios 1, 2, 12, 18 e 24. Foram escolhidos por incidirem nos erros P1 já conhecidos: início da rota, Melve, Esfinge e Wilhelmina.
- **0 episódios assistidos integralmente.** Após orientação do proprietário, a auditoria passou a confiar na transcrição e deixou de consumir vídeo. Antes dessa restrição houve **1 inspeção visual pontual** no episódio 1, suficiente para ler inequivocamente `Provações de um Novo Recruta` e `Ajude Accardo` na interface PT-BR em 16:14.
- **23 registros com timestamp** foram preservados em `video-evidence-matrix.csv`. Eles não equivalem a 23 quests nem a 23 provas independentes: vários descrevem etapas ou limites da mesma fonte.
- Datas de publicação foram registradas apenas para os cinco episódios abertos. Não foram inferidas datas para os demais.

## Evidência nova que muda o projeto

1. **`m02` — NPC e título.** A interface mostra `Provações de um Novo Recruta` e `Ajude Accardo`; a rota fala com Phill. O guia deve remover Rook dessa missão. A ampulheta corrobora que há urgência, mas não prova prazo numérico nem que Accardo morra. A frase de outro walkthrough de que ele não recebe dano trata de dano, não refuta por si só a existência de uma janela de quest.
2. **`m04` — sequência incompleta.** O responsável por `Nesting Troubles` é Lennart. A rota observada usa barris explosivos, volta a Lennart, lança o frasco de veneno e retorna novamente. Ian pertence a outra missão. O texto atual erra o NPC e omite ações necessárias.
3. **`v302` — Wilhelmina.** O prazo de três dias começa depois que o jogador aceita ajudar a reunir provas. O próprio narrador abandona sua hipótese inicial de que sair de Vernworth seria obrigatório. Isso sustenta a correção recém-publicada na branch: não transformar um caminho de ativação divergente em regra universal.
4. **`m06` — Ruminação.** Sete dias contam a partir da apresentação do enigma; o primeiro memento precisa ter sua localização anotada. Uma alternativa apenas ouvida pelo narrador permanece não verificada.
5. **`sphinx_diff` — erro P1 novo.** Vergil não deve ser procurado na cidade de Bakbattahl. A transcrição e o PowerPyx situam Dante e Vergil em lados opostos da Cidade de Descanso da Fronteira: Dante ao norte, cabelo liso; Vergil ao sul da fronteira, cabelo ondulado. A indicação do diário de NPC para Bakbattahl pode ser enganosa.
6. **Esfinge final.** A ordem na segunda localização varia; Reunião conta no total de acertos; a rota observada obtém a flecha, inicia o combate e acerta as pernas. Isso demonstra sucesso dessa rota, sem provar que todo outro alvo ou timing falha.

## Nomes PT-BR e força da prova

**1 missão recebeu prova direta na interface do jogo:** `Provações de um Novo Recruta`. O objetivo `Ajude Accardo` também foi lido na UI. Plataforma, build e menu de idioma não aparecem de modo verificável no trecho, portanto a prova vale para o literal exibido, não para cobertura de todas as versões.

Após essa promoção, o mapeamento contém **1 título com UI PT-BR comprovada**, **56 títulos candidatos extraídos da localização Kiranico** e **2 títulos de quests da DLC ainda sem PT-BR confirmado**. Termos produzidos por reconhecimento automático da fala, capítulos do criador ou pronúncia não foram promovidos a nomes oficiais.

## Corroboração e contradição

- **Corroborado:** Accardo/Phill; presença de ampulheta; sete dias da Ruminação; três dias para as provas de Wilhelmina; ordem aleatória da segunda área da Esfinge; contagem dos acertos incluindo Reunião.
- **Contradito:** Rook como recruta; Ian como responsável pelos ninhos; sequência dos ninhos limitada a destruir alvos; Vergil em Bakbattahl; requisito universal de sair de Vernworth para ativar Wilhelmina.
- **Ainda desconhecido:** resultado exato de atrasar o resgate de Accardo; período exclusivo para Beren; todas as escolhas alternativas de Wilhelmina; falha por cada alvo/timing da Flecha da Ruína; cobertura integral da playlist; DLC 2026.

## Valor da playlist como referência

**Recomendação: promover a playlist à quinta referência contextual, não à fonte primária nem à garantia de completude.** Ela acrescenta sequência prática, timestamps e demonstrações de sucesso. O episódio 2 admite desconhecimento de outras quests, e o episódio 18 admite não testar escolhas alternativas; além disso, a série é de 2024 e não cobre as mudanças e a expansão de 2026. A independência das fontes também não está estabelecida quando o narrador menciona seguir rotas de terceiros.

Ela é mais útil ao lado de Steam/Capcom, Kiranico e walkthroughs escritos do que como substituta. Para nomes PT-BR, só a UI legível deve elevar o status; a transcrição serve para procedimento e para revelar incerteza do próprio narrador.

## Relação com as mudanças novas do Git

A branch da auditoria recebeu documentação de TU3.1/TU3.2, Dark Arisen, quatro checkpoints e cinco evacuações antes desta passagem. O PR #19 também propõe correções em produção. Esta auditoria não altera o PR #19. A evidência de Wilhelmina é compatível com sua correção de cronologia; o erro Dante/Vergil e a sequência completa de Lennart precisam entrar na revisão do Head antes de qualquer merge de conteúdo.

### Revisão do código real do PR #19

O diff foi auditado contra `main@da63cfb`, e o CI `build` está verde. O PR preserva 53 marcos, 60 conquistas, quatro checkpoints e corrige a maior parte dos problemas já documentados. **Ainda não está pronto para merge factual:**

- **P1 — `sphinx_diff` não foi alterado:** o código continua enviando Vergil a Bakbattahl.
- **P1 — `m04` comprime a ordem:** menciona barris e veneno, mas precisa dizer claramente `barris → volte a Lennart → veneno → volte a Lennart`; o teste atual verifica palavras, não a sequência.
- **P2 — `m02` ficou excessivamente cético:** a ampulheta e sua semântica de tempo limitado agora estão corroboradas. O que permanece desconhecido é o prazo numérico e a consequência da demora.
- **P2 — proveniência do título:** `Provações de um Novo Recruta` já tem prova direta no HUD; não precisa permanecer descrito apenas como localização extraída no documento de implementação.

Os demais trechos revisados sobre Wilhelmina, tipos de save, cinco evacuações e separação entre marcador azul/feixe vermelho estão coerentes com a auditoria documental, dentro das ressalvas já registradas. Teste automatizado textual não prova gameplay.

## Estado e próxima decisão

**Classificação:** `SUPPORTED` para as sequências transcritas e para os cruzamentos com fonte escrita; `OBSERVED` somente para o título/objetivo legíveis em 16:14; `UNKNOWN` para versões, alternativas não executadas, DLC e consequências não mostradas. Nenhum P0 foi demonstrado. Permanecem P1 de conteúdo em `m02`, `m04`, `sphinx_diff` e nos checkpoints já documentados.

**Próxima ação exata:** Head revisar o diff real do PR #19 contra estas evidências, acrescentar a correção Dante/Vergil e garantir que `m04` inclua os dois retornos a Lennart e o frasco de veneno. Teste in-game continua necessário antes de homologar consequências irreversíveis.

# Fichas de missão e falsificações — primeira expansão

**Diretriz do proprietário:** o roteiro atual resume várias missões numa única etapa e isso pode prejudicar quem precisa de um passo a passo concreto. As fichas individuais devem conter NPC de início, local, requisitos, passos na ordem, objetos a entregar e desfecho, sem transformar a página em uma coleção de avisos.

## Entregue neste PR

- Nova aba `Consulta → Guias e cópias`, acessível também pela busca global de missão.
- Cinco fichas individuais (não cinco novos marcos): `Spellbound`, `The Sorcerer's Appraisal`, `Hunt for the Jadeite Orb`, `Short-Sighted Ambition`, `The Caged Magistrate`.
- Oito itens em `O que falsificar`: cinco grimórios, Orbe de Jadeíta, tomo de Isaac e Chave da Prisão.
- Em cada item, campos separados para **original**, **falsificação**, **destinatário** e **local**.
- Fichas vinculadas aos marcos `m03`, `v206`, `p03`, `b03` e `v103` tanto no Diário quanto na Consulta; Jadeite acessível como missão individual no catálogo.
- Conteúdo recolhido por padrão no Diário e fichas, mantendo o texto operacional como foco.
- Nenhuma mudança no esquema do progresso local `dd2_roadmap_user_progress_v3`, IDs de marcos, contadores ou conclusão automática.

## Regra dos cinco grimórios

A forma econômica de concluir ambas as missões é reservar **pelo menos três originais para Trysha** e **três falsificações de títulos distintos para Myrddin**. Os cinco nomes da tabela representam alternativas para aquisição/cópia, **não** uma obrigação de entregar todos os cinco a cada NPC.

- [PowerPyx — grimórios](https://www.powerpyx.com/dragons-dogma-2-all-grimoire-locations/)
- [PowerPyx — Spellbound](https://www.powerpyx.com/dragons-dogma-2-spellbound-walkthrough/)
- [PowerPyx — Sorcerer's Appraisal](https://www.powerpyx.com/dragons-dogma-2-the-sorcerers-appraisal-walkthrough/)
- [Game8 — Sorcerer's Appraisal](https://game8.co/games/Dragons-Dogma-2/archives/The-Sorcerers-Appraisal)

## Outros destinos de falsificações

- **Orbe de Jadeíta:** original para Everard; imitação para Offulve. Everard confere a autenticidade. [Game8](https://game8.co/games/Dragons-Dogma-2/archives/Hunt-for-the-Jadeite-Orb) · [GameSpot](https://www.gamespot.com/articles/dragons-dogma-2-jadeite-orb-guide/1100-6522016/)
- **On the Transference of Souls 2:** guarde o original; entregue `On the Transit of Souls 2` (falso) a Isaac para preservar sua família. [PowerPyx](https://www.powerpyx.com/dragons-dogma-2-short-sighted-ambition-walkthrough/) · [Game8](https://game8.co/games/Dragons-Dogma-2/archives/Short-Sighted-Ambition)
- **Chave da Prisão de Brant:** a cópia funciona para o jogador; original é devolvido a Brant na missão. [Game8](https://game8.co/games/Dragons-Dogma-2/archives/448892) · [Windows Central](https://www.windowscentral.com/gaming/dragons-dogma-2-guide-the-caged-magistrate-quest-walkthrough)

## Abordagem de cobertura progressiva

O roteiro atual possui **53 marcos editoriais**, muitos cobrindo duas ou mais missões. A busca global de nomes existente tem **59 pares EN/PT-BR**: isso não é um inventário completo de quests nem um índice completo de walkthroughs. Uma missão só entra na aba de guias quando cada etapa de execução e suas escolhas de entrega tiverem fontes checadas.

**Próximas ondas sugeridas:** Melve e tarefas iniciais → missões da capital, coroação, Ulrika/Wilhelmina → fronteira e Bakbattahl → Esfinge/medusa → finais e Mundo Desancorado → expansão. Não afirmar "cobertura total" antes de ter índice real de todas as quests da versão corrente.

## Provas e limites internos

- Todas as fichas atuais apontam para fontes de walkthrough; o procedimento de falsificação em inglês foi mantido nos nomes dos itens onde não há confirmação de strings oficiais de item PT-BR no build.
- A afinidade de Myrddin pode afetar o recebimento do ensinamento; a ficha distingue conclusão da missão de obtenção do pergaminho.
- O final de Isaac é **uma escolha**; a versão recomendada na tabela é a que preserva sua família, mas a ficha não deve declarar que outras escolhas são impossíveis.
- Não extrapolar itens mágicos duplicáveis: a maioria das falsificações mágicas perde poderes; a chave de prisão possui cópia funcional por exceção.

# Auditoria pontual de disponibilidade e percurso — 14/10/2026

Esta revisão complementa a higienização do PR #66. Ela **não** equivale a auditoria completa ou teste in-game dos 72 marcos. Cada afirmação abaixo é vinculada a uma fonte externa específica; a prioridade editorial continua sendo: disponibilidade → urgência confirmada → proximidade → facilidade.

| Marco | Local / janela | O que a fonte comprova | Decisão aplicada | Confiança |
|---|---|---|---|---|
| `v102` | Vernworth → Mina de Trevo / Ruínas da Montanha → Bosque Sagrado | Klaus dá `Vocation Frustration` em Vernworth; Mina de Trevo coincide com a visita de `Monster Culling`. `Gift of the Bow` começa na cidade, mas continua nas ruínas. `A Trial of Archery` requer concluir a primeira missão e leva ao Bosque Sagrado. | Diferenciar **aceitar** de **concluir**. Não fazer três viagens isoladas em nome de uma lista de atividades urbanas. | Corroborado por walkthroughs específicos para cada etapa, sem declaração de gameplay próprio |
| `v104` | Vernworth, Sven e baile | A Game8 registra `Masked Correspondence` com Sven após avanço de Disa e entrega de carta no baile. | Aviso contextual durante ida ao castelo; **não** declarar a missão opcional como requisito da história. | Uma fonte específica, gatilho inicial variável |
| `v301` / `b01` | Investigação de Bermudo → fronteira de Battahl | A Game8 informa diferenças de permissão conforme a resposta a Bermudo. A PowerPyx e a Game8 confirmam que uma permissão exclusiva a ferídeos exige máscara para Nascen humano; há rotas alternativas. | Explicar condição racial e permissão **antes** de o jogador atravessar. | Corroborado quanto à máscara e travessia; escolha de Bermudo apoiada especificamente na Game8 |
| `b01` / `b02` | Checkpoint Rest Town → lado Battahl → Bakbattahl | `Mercy among Thieves` começa do lado de Battahl após cruzar o portão. `Shadowed Prayers` e `A Poisonous Proposal` são missões de Bakbattahl, não da fronteira. | Agrupar as tarefas por local, não por título do capítulo; não duplicar as missões nem exigir todas juntas. | Walkthroughs separados; sem comprovação de requisito comum às três |
| `b02` | Palácio Portador da Chama, cerimônia matinal | A PowerPyx instrui realizar imediatamente a identificação do assassino depois de começar a etapa com Menella, sob risco de falha. | Alerta contextual na ficha. **Sem marcar todo o marco agregado como temporizado.** | Uma fonte direta; sem prazo numérico presumido |
| `b12` | Castelo de Vernworth, noites de baile | Game8 cita `Masked Correspondence` concluída como requisito para `A Noble Exchange`; PowerPyx informa janela geral da campanha, após `Nation of the Lambent Flame` e antes de `A New Godsway`, sem documentar a mesma exigência. | Registrar diferenças entre descrições, sugerir conferir Sven antes de esperar noites; não tratar uma regra como universal. | **DIVERGENTE / condição não totalmente estabelecida** |

## Fontes verificáveis

- `v102` — https://www.powerpyx.com/dragons-dogma-2-vocation-frustration-walkthrough/ ; https://www.powerpyx.com/dragons-dogma-2-gift-of-the-bow-walkthrough/ ; https://www.powerpyx.com/dragons-dogma-2-a-trial-of-archery-walkthrough/
- `v104` / `b12` — https://game8.co/games/Dragons-Dogma-2/archives/Masked-Correspondence ; https://game8.co/games/Dragons-Dogma-2/archives/A-Noble-Exchange ; https://www.powerpyx.com/dragons-dogma-2-a-noble-exchange-walkthrough/
- `v301` / `b01` — https://game8.co/games/Dragons-Dogma-2/archives/449760 ; https://www.powerpyx.com/dragons-dogma-2-nation-of-the-lambent-flame-walkthrough/ ; https://game8.co/games/Dragons-Dogma-2/archives/448871
- `b01` / `b02` — https://www.powerpyx.com/dragons-dogma-2-mercy-among-thieves-walkthrough/ ; https://www.powerpyx.com/dragons-dogma-2-shadowed-prayers-walkthrough/ ; https://www.powerpyx.com/dragons-dogma-2-a-poisonous-proposal-walkthrough/

## Proteções e pendências

- Nenhum ID, conquista, guia ou chave de progresso foi alterado.
- Não adicionado novo selo/colorido à UI. Os alertas usam o detalhe que já existe.
- A rotina de navegação continua mostrando as 72 etapas; as tarefas agrupadas mantêm conclusão **manual do marco**.
- **Pendente:** auditoria de janelas reais dos capítulos 3, 4, 6, 7 e Mundo Desancorado; testes em gameplay; revisão de fatos de marcos que contêm várias missões.
- **Limite dos testes:** as asserções de código protegem instruções editoriais, mas **não** provam os gatilhos dentro do jogo.

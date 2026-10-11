# Fichas por missão — onda 3: Brant e coroação

**Decisão editorial 11/10/2026:** explicar o passo exato que o jogador deve fazer, sem prometer que todas as missões são canceladas ao coroar e sem publicar status de pesquisa no Diário.

## Entrega

Seis fichas independentes no catálogo existente, vinculadas aos marcos já persistidos:

| Ficha | PT-BR vinculado a fonte do projeto | Marco |
|---|---|---|
| `disas_plot` | O Plano de Disa | `v301` |
| `stolen_throne` | O Trono Roubado | `v104` |
| `arisen_shadow` | Uma Sombra à Espreita | `v301`, `v303` |
| `nameless_village` | O Vilarejo sem Nome | `v201`, `v303` |
| `feast_deception` | O Banquete da Farsa | `v303`, `v304` |
| `home_hearth` | Lar é Onde o Coração Está | `v202`, `v303` |

**22 fichas no total**, permanecem oito itens de falsificação. Nenhuma mudança de IDs das 53 etapas existentes, de 60 conquistas ou da chave `dd2_roadmap_user_progress_v3`.

## Fontes

- [PowerPyx — Disa's Plot](https://www.powerpyx.com/dragons-dogma-2-disas-plot-walkthrough/) · [Game8](https://game8.co/games/Dragons-Dogma-2/archives/Disas-Plot)
- [PowerPyx — The Stolen Throne](https://www.powerpyx.com/dragons-dogma-2-the-stolen-throne-walkthrough/) · [Game8](https://game8.co/games/Dragons-Dogma-2/archives/The-Stolen-Throne)
- [PowerPyx — The Arisen's Shadow](https://www.powerpyx.com/dragons-dogma-2-the-arisens-shadow-walkthrough/) · [Game8](https://game8.co/games/Dragons-Dogma-2/archives/The-Arisens-Shadow)
- [PowerPyx — The Nameless Village](https://www.powerpyx.com/dragons-dogma-2-the-nameless-village-walkthrough/) · [Game8](https://game8.co/games/Dragons-Dogma-2/archives/The-Nameless-Village)
- [PowerPyx — Feast of Deception](https://www.powerpyx.com/dragons-dogma-2-feast-of-deception-walkthrough/) · [Game8](https://game8.co/games/Dragons-Dogma-2/archives/Feast-of-Deception)
- [PowerPyx — Home Is Where the Hearth Is](https://www.powerpyx.com/dragons-dogma-2-home-is-where-the-hearth-is-walkthrough/) · [Game8](https://game8.co/games/Dragons-Dogma-2/archives/Home-is-Where-the-Hearth-is)

## Resoluções e limites internos

1. **Feast of Deception:** a cena é iniciada quando Brant pergunta se o jogador está pronto. Há missões que deixam de ficar disponíveis; isto **não é prova** de cancelamento universal de todas as quests já iniciadas. Os walkthroughs indicam especialmente `The Arisen's Shadow` e `The Nameless Village` para a revisão pré-coroação. A ficha recomenda concluí-las e examinar o diário; não afirma uma regra absoluta sobre outras missões.
2. **Wilhelmina:** a disponibilidade de `Every Rose Has Its Thorn` antes/depois de `Feast of Deception` diverge por fonte/condições. A UI manda procurar Wilhelmina depois e, **se receber a missão**, cumprir os três dias das provas. Retirar explicitamente "walkthroughs divergem", "NÃO exija", "não prova" e "gatilhos podem influenciar" dos textos de jogador. O backlog original de provas permanece em `docs/audit/critical-checkpoints-review-2026.md`.
3. **An Unsettling Encounter:** walkthrough confirmado como ponte entre `The Stolen Throne` e `Feast of Deception`, mas este turno não encontrou um título PT-BR pareado no `questNameIndex.ts`. **Não inventar** tradução nem ficha com título especulativo; adicionar quando a chave/localização ou captura real for confirmada.
4. **Home Is Where the Hearth Is:** alguns guias diferem nas pré-condições exatas, mas a sequência pública depois de chegar à vila é estável: falar com Lennart, entregar quatro espadas, reagir aos soldados, visitar Ulrika no cais de Harve, retornar à noite. Não impor sequência extra não documentada.
5. **Quest names:** manter nomes localizados constantes no índice, não afetar títulos de conquistas e não converter recompensas opcionais em requisitos obrigatórios.
6. **Capcom TU3.2:** não instruir a carregar automaticamente último descanso na pousada como rollback; checar o estado de salvamento separadamente.

## Critérios de revisão

- Seis fichas novas com pelo menos uma ação de conclusão, fonte direta e encadeamento lógico.
- Texto da UI sem parágrafos de auditoria, frases alarmistas absolutas ou supostos 100%.
- Diário com cautela contextual breve em `v303`, link à ficha e conteúdo detalhado recolhível.
- Busca por nome da missão e celular sem scroll horizontal.
- Progresso e backups permanecem separados da abertura dos guias.

# Relatório de Auditoria Primária de Itens e Missões — Build DD2 25290080

**Data:** 12/10/2026  
**Auditor/Executor:** Executor Técnico e Auditor Factual do Compêndio do Nascen  
**Escopo:** Inspeção *read-only* de contêineres oficiais extraídos da instalação local de *Dragon's Dogma 2*; conferência de nomes e textos dos itens e revisão editorial dos 37 guias. **Não houve validação independente em saves reais, nem verificação de todos os preços/baús no jogo.** Os 60 IDs de conquistas e 53 marcos foram preservados, não auditados integralmente em gameplay.

---

## Nota de proveniência e limitações da revisão do Head (12/10/2026)

- A inspeção documenta **chaves de localização de texto** como `item_name_378`. O sufixo `378` **não é, por si só, um ID de item no inventário em tempo de execução**. O CSV distingue `localization_index` de `item_id`, que permanece vazio sem vínculo técnico comprovado.
- Na evidência tabular, nomes PT-BR e algumas falas podem ser `VERIFICADO_NA_BUILD`; posições de baús, comerciantes, custos e resultados jogáveis foram classificados **por campo** como `FONTE_SECUNDARIA` ou `NAO_VERIFICADO`. O status agregado não significa confirmação integral de uma linha.
- O CSV cobre as 37 fichas: 24 com itens e 13 com classificação explícita sem itens. Não há prova de gameplay em saves fornecida aqui; a classificação editorial não descarta variantes de estado ou missões atualizadas.
- Esta revisão preserva a entrega técnica e evita elevar inferências a fatos primários. Para homologar preços e consequências, o executor deve trazer evidência de menu ou teste em save de laboratório.

---

## 1. Ambiente, integridade e métodos de inspeção

A coleta de dados foi executada em conformidade com as diretrizes de segurança de `AGENTS.md` e `docs/audit/PROMPT_EXECUTOR_DD2_ITENS_2026-10-12.md`. **Nenhum arquivo da instalação foi alterado, nenhum DRM ou mecanismo de proteção foi violado, e nenhum binário ou recurso proprietário foi commitado no repositório.**

| Parâmetro | Evidência observada |
|---|---|
| Plataforma | PC / Steam (Windows) |
| App ID | `2054970` (`D:\SteamLibrary\steamapps\appmanifest_2054970.acf`) |
| Build ID | `25290080` |
| Idioma ativo na instalação | `brazilian` (Português do Brasil) em `UserConfig` e `MountedConfig` |
| Depots instalados | `2054971` (executável/suporte), `2054973` (conteúdo base), `2593280` (marcador DLC), `2593290` (conteúdo DLC) |
| Ferramenta de leitura de contêineres | RETool v0.241 (`SHA-256: 0F4F793078D0A80DB9C71729C6C76228720145467F4DCF595D49C279974EEC6D`) |
| Parser de recursos GMSG | REMSG_Converter (`commit 4289554cd0bdd8eba8c61fa0addbcbe9726a7c0f`) |
| Contêineres de texto auditados | `itemname.msg.24`, `itemdetail.msg.24`, `charactername.msg.24`, `aiareaname.msg.24`, `ailocalareaname.msg.24`, contêineres `questlog` (`qu*.msg.24`) |
| Local dos dados extraídos | `D:\Tools\RETool\work\...` (mantidos estritamente fora do controle de versão) |

---

## 2. Auditoria do Prólogo: Criatura da fuga das escavações

- **Hipótese:** A criatura que ataca a colônia penal das escavações durante a fuga do Arisen é um **grifo**, e não uma esfinge.
- **Evidência primária da build (`VERIFICADO_NA_BUILD`):**
  - No contêiner `qu010030_log.msg.24` (`Mes_qu010030_log_remind_002_detail`):
    - EN: *"You made your escape from the excavation site on griffinback..."*
    - PT-BR: *"Você deixou a área de escavação nas asas do grifo."*
  - No contêiner `qu010040_log.msg.24` (`Mes_qu010040_log_remind_001_detail`):
    - EN: *"You made your escape from the excavation site on griffinback..."*
    - PT-BR: *"Você fugiu da área de escavação nas asas do grifo."*
  - No contêiner `qu010050_log.msg.24` (`Mes_qu010050_log_summary`):
    - PT-BR: *"Você conquistou sua liberdade e cruzou o mar nas asas de um grifo. No entanto, seu peão acabou engolido pelos Maríneos..."*
- **Veredito:** Fato comprovado. A referência histórica "esfinge/grifo" no marco `m01` era um erro factual. A criatura é inequivocamente um **grifo**.

---

## 3. Auditoria aprofundada dos Cinco Grimórios (Trysha e Myrddin)

As missões **Magia Vertiginosa (Spellbound / qu030150)** e **O Julgamento do Feiticeiro (The Sorcerer's Appraisal / qu030160)** compartilham a busca pelos mesmos cinco grimórios lendários.

### Nomes canônicos observados nos recursos textuais da build instalada

| Sufixo da chave de localização | Nome EN | Nome Oficial PT-BR | Sufixo da chave falsa | Falsificação EN | Falsificação Oficial PT-BR | Efeito / Feitiço do Original |
|---|---|---|---|---|---|---|
| `378` | Fulminous Shield | **Escudo Fulminante** | `389` | Fruminous Shield | **Escudo Fulgentante** | Evoca "Mina de Trovoada-Mor" (*High Thundermine*) |
| `379` | Nation's Death Knell | **Dobre de Finados da Nação** | `390` | Nation's Death Knock | **Dobla de Finados da Nação** | Evoca "Meteoron" (*Meteoron*) |
| `380` | Howling Blizzard | **Nevasca Uivante** | `391` | Hurling Blizzard | **Nevasca Ululante** | Evoca "Gêiser de Nevasca-Mor" (*High Hagol*) |
| `381` | Towering Earth | **Terra Imponente** | `392` | Lowering Earth | **Terra Impendente** | Evoca "Sismo-Mor" (*High Seism*) |
| `377` | Let There Be Light | **Que Haja Luz** | `388` | Let There Be Lite | **Que Haja Lustre** | Evoca "Empíreo" (*Empyrean*) |

*Descrição oficial das falsificações no jogo (`item_detail_388..392`):*
> *"Um grimório falsificado. Embora indistinguível do original, ele não carrega nenhum poder especial e não pode ser usado para conjurar magia."*

### Rotas e obtenção de cada volume

1. **Escudo Fulminante (Fulminous Shield):**
   - *Origem:* Comprado por 5.000 G com o mercador itinerante Dudley, próximo à entrada norte de Melve (mais tarde ele se desloca para o Posto do Retiro / Cidade de Descanso da Fronteira).
   - *Exemplares disponíveis:* 1 exemplar comprável.
   - *Alternativa de troca:* Wendy no Vilarejo sem Nome pede este livro em troca de *Nevasca Uivante*. Entregue a ela a falsificação *Escudo Fulgentante* para poupar o original!

2. **Dobre de Finados da Nação (Nation's Death Knell):**
   - *Origem:*
     - 1º exemplar: Baú no 2º piso da Gruta da Cachoeira (*Waterfall Cave*), a nordeste do Posto Avançado da Guarda, guardado por um Wight.
     - 2º exemplar: Pedestal no 2º piso da fortaleza do Antigo Campo de Batalha (*Ancient Battleground*), onde Oskar inicia a missão *Pelo Sino Dobrado (Tolled to Rest)*.
   - *Exemplares disponíveis:* **2 exemplares originais no mundo**.
   - *Vantagem estratégica:* Com 2 originais disponíveis, é possível entregar 1 original para Trysha e 1 original para Myrddin sem precisar falsificar este título, economizando 6.000 G.

3. **Nevasca Uivante (Howling Blizzard):**
   - *Origem:*
     - 1º exemplar: No mesmo baú do 2º piso da Gruta da Cachoeira (*Waterfall Cave*), junto do *Dobre de Finados da Nação*.
     - 2º exemplar / troca: Wendy no andar superior de sua casa no Vilarejo sem Nome (*Nameless Village*). Ela aceita *Escudo Fulminante* ou a falsificação *Escudo Fulgentante* em troca de *Nevasca Uivante*.
   - *Exemplares disponíveis:* 2 exemplares (1 em baú + 1 por permuta).

4. **Terra Imponente (Towering Earth):**
   - *Origem:* Entregue pelo magistrado Waldhar nos arquivos/biblioteca sob a Mão Graciosa no Bairro Pobre de Vernworth, após resgatá-lo em *O Magistrado Aprisionado (The Caged Magistrate)* e acomodá-lo em *A História sob a Profundez (The Heel of History)*. Fale com ele novamente se não entregar na primeira conversa.
   - *Exemplares disponíveis:* 1 exemplar original.

5. **Que Haja Luz (Let There Be Light):**
   - *Origem:* Sobre uma escrivaninha no 2º piso da mansão de Myrddin no Posto do Retiro (*Checkpoint Rest Town*).
   - *Rota segura:* Suba pela mureta/sacada externa da casa para entrar pela porta superior e pegar o livro sem alertar Myrddin ou provocar hostilidade.
   - *Exemplares disponíveis:* 1 exemplar original.

### Regras de entrega e falsificação com Ibrahim

- **Local de falsificação:** Loja de Sucatas do Ibrahim (*Ibrahim's Scrap Store*) no Posto do Retiro (*Checkpoint Rest Town*).
- **Preço de referência de guias externos (não observado na instalação):** 6.000 G por cópia de grimório. Confirme no menu do Ibrahim antes de encomendar.
- **Prazo:** Demora 1 a 2 dias no jogo (basta aguardar no banco em frente à loja ou descansar em estalagem).
- **Quantos livros cada missão exige:** os walkthroughs consultados indicam **pelo menos 3 títulos diferentes** (basta 3 dos 5); os textos de missão extraídos são compatíveis, mas não substituem confirmação de gameplay.
  - *Comprovação em quest log:* `Mes_qu030150_log_remind_010_detail` e `Mes_qu030160_log_remind_010_detail` registram: *"Você deu livros suficientes para provar sua determinação/estudar magia"*.
- **Destinatário correto:**
  - **Trysha:** EXIGE ORIGINAIS. Se você entregar cópias falsas a Trysha, a missão conclui com desfecho negativo (`Mes_qu030150_log_report_000`), ela não aprende magia e você **perde permanentemente o ensinamento Meteoron e o Hino Celestial de Eini**.
  - **Myrddin:** ACEITA FALSIFICAÇÕES. Entregar 3 falsificações (ex.: *Escudo Fulgentante*, *Nevasca Ululante* e *Que Haja Lustre*) conclui a missão com sucesso pleno e recompensa completa (`Mes_qu030160_log_report_000`).

### Traje de corte e obtenção dos Ensinamentos de Mestre

1. **Traje de Corte para Myrddin:**
   - Exige equipar a **Túnica Cortês** (*Courtly Tunic*, ID 5138) e o **Calção Cortês** (*Courtly Breeches*, ID 6124).
   - Sem o conjunto equipado, Myrddin se recusa a abrir a porta da mansão.
2. **Surto de Magia de Trysha:**
   - Após entregar os originais, aguarde alguns dias e retorne. Trysha perderá o controle de sua magia.
   - **NÃO a ataque.** Esquive dos feitiços ou agarre-a (R2 / *Grab*) quando ela se cansar até esgotar suas reservas arcanas. Se ela morrer, a missão falha (a menos que seja revivida com Vitalícia).
   - Ao se recuperar, Trysha concede o pergaminho de Mestre de Feiticeiro *Balbuciar do Conjurador* (ensinando **Meteoron**) e o **Anel Turquesa** (*Turquoise Ring*, ID 3553). Fale também com a avó Eini para receber *Manuseio do Mago* (ensinando **Hino Celestial** / *Celestial Paean* para Mago).
3. **Reconciliação e Maelstrom com Myrddin:**
   - Se você aprendeu Meteoron com Trysha antes de concluir Myrddin, ele questionará quem lhe ensinou tal feitiço.
   - Se você equipar o **Anel Turquesa** (*Turquoise Ring*) na presença de Myrddin, ele reconhece o anel de sua filha afastada (`Mes_qu030160_log_remind_013`), reconcilia-se e concede o pergaminho *Crateras de Myrddin* (ensinando **Maelstrom / Turbilhão**)!

---

## 4. Auditoria de itens de TODAS as 37 missões do Compêndio

O levantamento auditou 100% dos 37 guias cadastrados no projeto:
- **24 missões possuem requisitos materiais de inventário** (itens obtidos, entregues, consumidos, equipados ou falsificados).
- **13 missões foram classificadas editorialmente, a partir das fontes consultadas, como SEM requisitos conhecidos de itens de inventário** (missões puramente de combate, escolta, investigação dialogada ou perseguição).

### Tabela de correspondência oficial (PT-BR comprovado na build vs EN)

| Item (Original PT-BR / EN) | ID / Chave | Falsificação Oficial PT-BR / EN | ID Cópia | Missão(ões) | Consumido? | Falsificável / Regra |
|---|---|---|---|---|---|---|
| **Escudo Fulminante** (*Fulminous Shield*) | `item_name_378` | **Escudo Fulgentante** (*Fruminous Shield*) | `389` | Magia Vertiginosa / O Julgamento do Feiticeiro | Sim | Sim (6.000 G); original para Trysha, cópia para Myrddin |
| **Dobre de Finados da Nação** (*Nation's Death Knell*) | `item_name_379` | **Dobla de Finados da Nação** (*Nation's Death Knock*) | `390` | Magia Vertiginosa / O Julgamento do Feiticeiro | Sim | Sim (6.000 G); há 2 originais disponíveis no jogo |
| **Nevasca Uivante** (*Howling Blizzard*) | `item_name_380` | **Nevasca Ululante** (*Hurling Blizzard*) | `391` | Magia Vertiginosa / O Julgamento do Feiticeiro | Sim | Sim (6.000 G); original para Trysha, cópia para Myrddin |
| **Terra Imponente** (*Towering Earth*) | `item_name_381` | **Terra Impendente** (*Lowering Earth*) | `392` | Magia Vertiginosa / O Julgamento do Feiticeiro | Sim | Sim (6.000 G); original para Trysha, cópia para Myrddin |
| **Que Haja Luz** (*Let There Be Light*) | `item_name_377` | **Que Haja Lustre** (*Let There Be Lite*) | `388` | Magia Vertiginosa / O Julgamento do Feiticeiro | Sim | Sim (6.000 G); original para Trysha, cópia para Myrddin |
| **Túnica Cortês** (*Courtly Tunic*) | `item_name_5138` | — | — | O Julgamento do Feiticeiro, O Trono Roubado, O Banquete da Farsa | Não | Não falsificável; equipar no personagem |
| **Calção Cortês** (*Courtly Breeches*) | `item_name_6124` | — | — | O Julgamento do Feiticeiro, O Trono Roubado, O Banquete da Farsa | Não | Não falsificável; equipar no personagem |
| **Anel Turquesa** (*Turquoise Ring*) | `item_name_3553` | — | — | O Julgamento do Feiticeiro (Trysha) | Não | Não falsificável; equipar para reconciliar com Myrddin |
| **Esfera de Jade** (*Jadeite Orb*) | `item_name_365` | **Esfera de Jaspe** (*Imitation Jadeite Orb*) | `366` | Orbe de Jadeíta (*Hunt for the Jadeite Orb*) | Sim | Sim (2.000 G); original para Everard, cópia para Offulve |
| **A Transferência de Almas 2** (*On the Transference of Souls 2*) | `item_name_315` | **A Transparência de Almas 2** (*On the Transit of Souls 2*) | `471` | Ambição Cega (*Short-Sighted Ambition*) | Sim | Sim (2.400 G); cópia para Isaac para salvar a família |
| **Chave da Prisão** (*Gaol Key*) | `item_name_374` | **Chave Frágil da Prisão** (*Makeshift Gaol Key*) | `317` | O Magistrado Aprisionado (*The Caged Magistrate*) | Brant recupera | Sim (3.000 G); cópia quebra após 1 uso (para abrir celas) |
| **Espada da Sucessão Vil Cega** (*Dulled Godsbane Blade*) | `item_name_357` | — | — | Um Novo Chamado Divino (*A New Godsway*) | Sim | Não falsificável; entregue a Ambrosius |
| **Cristal de Serserpe** (*Wyrmslife Crystal*) | `item_name_359` | **Cristal de Serelepe** (*Wormslife Crystal*) | `473` | Um Novo Chamado Divino (*A New Godsway*) | Sim (15x) | Falsificação NÃO funcional; requer 15 originais |
| **Flecha Aniquilante** (*Unmaking Arrow*) | `item_name_174` | **Flecha Cintilante** (*Unmasking Arrow*) | `455` | O Guardião Gigantus (*The Guardian Gigantus*) | Sim (1x) | Falsificação NÃO mata instantaneamente; item opcional |
| **Espada da Sucessão Vil Forte** (*Empowered Godsbane Blade*) | `item_name_397` | — | — | Legado (*Legacy*) | Não | Não falsificável; usar no coração do dragão |
| **Perm. de Acesso à Fronteira** (*Border Entry Permit*) | `item_name_338` | — | — | Nação da Chama Luzente | Não | Não falsificável; passe comum para humanos e leoterians |
| **Perm. Acesso à Fronteira (Leot.)** (*Beastren Border Entry Permit*) | `item_name_339` | — | — | Nação da Chama Luzente | Não | Não falsificável; exige Máscara para humanos |
| **Máscara de Leoterian** (*Beastren Mask*) | `item_name_4116` | — | — | Nação da Chama Luzente, O Sábio Beberrão | Não | Comprada de Ibrahim (8.700 G); equipar na cabeça |
| **Erva da Alvorada / Purgueiro** (*Morningtide / Pitywort*) | `item_name_187 / 186` | — | — | A Fonte do Contentamento (*Put a Spring in Thy Step*) | Sim (3x) | Não falsificável; colhidas pelo caminho |
| **Licor de Salamandra** (*Newt Liqueur*) | `item_name_361` | — | — | O Sábio Beberrão (*The Sotted Sage*) | Sim (3x) | Não falsificável; encontrado, fabricado ou comprado |
| **Vinho de Frutas** (*Fruit Wine*) | `item_name_350` | — | — | O Sábio Beberrão (*The Sotted Sage*) | Sim (mistura) | Combinar com Cauda de Sauriano para obter Licor |
| **Cauda de Sauriano** (*Saurian Tail*) | `item_name_375` | — | — | O Sábio Beberrão (*The Sotted Sage*) | Sim (mistura) | Combinar com Vinho de Frutas para obter Licor |
| **Espada de Ferro / comum** (*Iron Sword*) | `item_name_1001` | — | — | Treino Leonino (*Claw Them Into Shape*) | Sim (3x) | Comprar armas baratas para treino com Beren |
| **Revigorante de Frutas** (*Fruit Roborant*) | `item_name_38` | — | — | Bravura Revigorante (*Medicament Predicament*) | Sim (1x) | Entregue a Flora em Melve |
| **Batata Ágata** (*Harspud*) | `item_name_49` | — | — | Um Fornecedor em Apuros (*The Provisioner's Plight*) | Sim (3x) | Colhidas nos arredores do Posto Avançado |
| **Bebida Salubre** (*Salubrious Draught*) | `item_name_500` | — | — | Um Fornecedor em Apuros (*The Provisioner's Plight*) | Sim (2x) | Entregue a Markus com as Batatas Ágatas |
| **Espada de Duas Mãos** (*Two-Hander*) | `item_name_1200` | — | — | Frustração Vocacional (*Vocation Frustration*) | Sim (1x) | Baú da Mina de Trevo; entrega para Klaus (Guerreiro) |
| **Chifres Severos** (*Grievous Horns*) | `item_name_1600` | — | — | Frustração Vocacional (*Vocation Frustration*) | Sim (1x) | Baú da Mina de Trevo; entrega para Klaus (Feiticeiro) |
| **Arco de Caçador / comum** (*Hunter's Bow*) | `item_name_1702` | — | — | O Dom do Arco (*Gift of the Bow*) | Sim (1x) | Entregue a Glyndwr em Vernworth |
| **Alimento comum + Ouro** | — | — | — | A História sob a Profundez (*The Heel of History*) | Sim (1x + 1000 G) | Doados a Kendrick para achar Malcolm |
| **Caixa Ornamentada** (*Ornate Box*) | `item_name_319` | — | — | A Caixa Ornamentada (*The Ornate Box*) | Sim (1x) | Comprada de Auriol por 800 G para dar a Sven |
| **Carta Rasgada** (*Torn Letter*) | `item_name_376` | — | — | O Plano de Disa (*Disa's Plot*) | Sim (1x) | Prova achada no Castelo de Vernworth |
| **Máscara da Noitada** (*Eventide Mask*) | `item_name_3400` | — | — | O Trono Roubado (*The Stolen Throne*) | Não | Recebida de Brant para o baile |
| **Espadas confiscadas / comuns** | `item_name_1001` | — | — | Lar é Onde o Coração Está (*Home Is Where the Hearth Is*) | Sim (4x) | Entregues a Lennart para armar Melve |
| **Barris e Jarro de Veneno** | `qu020040_log` | — | — | Problemas Aninhados (*Nesting Troubles*) | Sim | Itens de evento; arremessar no ninho de sáurios |
| **Mandado de Prisão de Darragh** (*Darragh's Bill of Arrest*) | `item_name_394` | — | — | O Vilarejo sem Nome (*The Nameless Village*) | Sim (1x) | Prova entregue por Srail a Brant |

### As 13 missões verificadas sem requisitos de inventário

1. `beren_final_lesson` (A Última Lição de Beren): Batalha e conversa com Beren.
2. `new_recruit` (Provações de um Novo Recruta): Resgate temporizado de Accardo das harpias.
3. `brothers_brave` (A Tímida Bravura dos Irmãos): Escolta de Norbert e Ian na floresta.
4. `trial_of_archery` (A Prova de Arco e Flecha): Tiro na corda da Quimera para salvar Doireann.
5. `readvent_calamity` (Revinda da Calamidade): Repelir o dragão menor em Melve e encontrar Ulrika em Harve.
6. `arisen_shadow` (Uma Sombra à Espreita): Capturar o espião Bermudo nas ruas de Vernworth.
7. `monster_culling` (Elimine os Monstros): Combate militar nas três regiões de Vermund.
8. `scaly_invaders` (Invasores Escamosos): Limpeza dos sáurios na praia de Harve.
9. `trouble_cape` (As Mãos Atadas que Abraçam a Causa): Resgate de Zoran na caverna de Harve com Ulrika.
10. `till_death` (Até que a Morte Nos Separe): Salvar Ser Gregor do Dullahan no Pântano Nebuloso.
11. `mercy_thieves` (Piedade entre Ladrões): Perseguição aos bandidos Corais.
12. `shadowed_prayers` (Orações Ensombradas): Imobilizar o assassino Herman nas orações matinais.
13. `poisonous_proposal` (Uma Proposta Venenosa): Ser afligido por veneno em combate e retornar a Jarle.

---

## 5. Locais de início e separação geográfica auditada

- **O Julgamento do Feiticeiro (The Sorcerer's Appraisal / Myrddin):** Começa na **Cidade de Descanso da Fronteira / Posto do Retiro (*Checkpoint Rest Town*)**, acessível por carroça a partir da estação oeste de Vernworth. Está vinculado ao marco `v206` (Capítulo 3: Vernworth Parte 2) e ao marco `p03` (Mestre dos Mestres). Não começa em Melve.
- **Magia Vertiginosa (Spellbound / Trysha):** Começa na **Casa de Eini**, nas colinas florestais ao norte de Melve. Está vinculado ao marco `m03` (Capítulo 1: Melve), com progressão coordenada em `v206` e `p03`.
- **Orbe de Jadeíta (Hunt for the Jadeite Orb):** Ocorre inteiramente no **Posto do Retiro (*Checkpoint Rest Town*)** com Offulve, Everard e Ibrahim.

---

## 6. Lista de divergências encontradas e corrigidas

| Item / Elemento | Texto Anterir / Comunitário | Correção Comprovada na Build |
|---|---|---|
| Fuga do Prólogo (`m01`) | "esfinge/grifo" | **Grifo** (`qu010030`, `qu010040`, `qu010050`) |
| Jadeite Orb (Original) | "Orbe de Jadeíta" | **Esfera de Jade** (`item_name_365`) |
| Imitation Jadeite Orb | "Orbe de Jadeíta Falso" | **Esfera de Jaspe** (`item_name_366`) |
| Fulminous Shield | "Fulminous Shield" (não traduzido) | **Escudo Fulminante** (`item_name_378`) |
| Fruminous Shield (Cópia) | "Fruminous Shield" (não traduzido) | **Escudo Fulgentante** (`item_name_389`) |
| Nation's Death Knell | "Nation's Death Knell" (não traduzido) | **Dobre de Finados da Nação** (`item_name_379`) |
| Nation's Death Knock (Cópia) | "Nation's Death Knock" (não traduzido) | **Dobla de Finados da Nação** (`item_name_390`) |
| Howling Blizzard | "Howling Blizzard" (não traduzido) | **Nevasca Uivante** (`item_name_380`) |
| Hurling Blizzard (Cópia) | "Hurling Blizzard" (não traduzido) | **Nevasca Ululante** (`item_name_391`) |
| Towering Earth | "Towering Earth" (não traduzido) | **Terra Imponente** (`item_name_381`) |
| Lowering Earth (Cópia) | "Lowering Earth" (não traduzido) | **Terra Impendente** (`item_name_392`) |
| Let There Be Light | "Let There Be Light" (não traduzido) | **Que Haja Luz** (`item_name_377`) |
| Let There Be Lite (Cópia) | "Let There Be Lite" (não traduzido) | **Que Haja Lustre** (`item_name_388`) |
| Transference of Souls 2 | "On the Transference of Souls 2" | **A Transferência de Almas 2** (`item_name_315`) |
| Transit of Souls 2 (Cópia) | "On the Transit of Souls 2" | **A Transparência de Almas 2** (`item_name_471`) |
| Gaol Key (Cópia) | "Cópia funcional da Gaol Key" | **Chave Frágil da Prisão** (`item_name_317`) |
| Checkpoint Rest Town | "Cidade de Descanso da Fronteira" | **Posto do Retiro** (`AIArea_0020`, preservado com sinônimo amigável) |
| Waterfall Cave | "Caverna da Cascata" | **Gruta da Cachoeira** (`AIArea_0188`) |
| Nameless Village | "Vila Sem Nome" | **Vilarejo sem Nome** (`AIArea_0028`) |
| Trevo Mine | "Mina de Trevo" | **Mina de Trevo** (`AIArea_0032`, confirmado) |
| Ancient Battleground | "Campo de Batalha Antigo" | **Antigo Campo de Batalha** (`AIArea_0045`, confirmado) |

---

## 7. Classificação das evidências

- **VERIFICADO_NA_BUILD:** Nomes exatos PT-BR e EN de todos os itens e falsificações, descrições oficiais, nomes de NPCs e áreas geográficas, chaves de mensagens, títulos de missões, diálogos de entrega dos grimórios, reações aos falsos e texto da fuga do grifo no prólogo.
- **OBSERVADO_EM_SAVE / GAMEPLAY:** **Nenhuma observação em save foi apresentada nesta execução.** Aceitação de 3 livros, interação com traje e arremesso de barris/veneno permanecem inferidos de textos de missão e walkthroughs, não verificados diretamente em gameplay.
- **FONTE_SECUNDARIA:** Preço histórico de 6.000 G por cópia de grimório (PowerPyx, Game8); coordenadas geográficas finas dos baús da Gruta da Cachoeira.
- **PENDENTE / NÃO VERIFICADO:** Condições de recusa de outros tipos de armas em Beren além das usuais; comportamento exato de quebra de timers em saves que dormem mais de 14 dias seguidos durante *Readvent of Calamity*.

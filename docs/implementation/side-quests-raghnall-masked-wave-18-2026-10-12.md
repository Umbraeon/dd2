# Onda 18 — carta de Sven e sequência de Raghnall

Data editorial: 12/10/2026. Escopo: adicionar quatro fichas de missões secundárias históricas sem alterar layout, 53 marcos, 60 conquistas nem `dd2_roadmap_user_progress_v3`.

## Fichas
| Nome EN / PT-BR pareado via Kiranico | Marco(s) | Condição e risco |
|---|---|---|
| Masked Correspondence / **Correspondência Mascarada** | v104 | Sven envia Letter to Lord Patrick; noite de baile, Courtly Tunic + Breeches e Eventide Mask; evitar entregar a nobre errado |
| Welcome to Battahl / **De Volta a Battahl** | b02 | Roger e Taleef, intervenção de Raghnall; 3 valentões ou duelo, ouro e Fruit Wine variam; vinho é RECOMPENSA aproveitável em O Sábio Beberrão |
| Tensions on the Highroad / **Tensão na Estrada** | v304, b02 | Simon/Ser Augustin; Raghnall; escolha inicial de lado conduz em ambos os casos à saída pela Guerco Cavern |
| Clash and Conclusion / **Confronto Final** | p06 | Duelo de Raghnall na Moonglint Tower durante The Guardian Gigantus, condicional à missão anterior; Wakestone opcional |

## Evidência e divergências
- **Sven:** fontes concordam sobre destinatário Lord Patrick (capa azul, máscara distinta) e entrega a Sven. Divergem em detalhes do desbloqueio: `Seat of the Sovran` e `The Ornate Box` em PowerPyx, com hipóteses adicionais sobre janela em torno de `Feast of Deception`. Não fixamos um corte temporal.
- **Entrega errada:** GamerGuides registra falha da missão caso a carta seja entregue ao convidado errado. Evitar afirmar que há recuperação garantida.
- **Welcome:** PowerPyx e Neoseeker descrevem caminho de duelo e 8.500 G/Fruit Wine; Game8 e Dragon's Dogma Wiki mencionam a rota alternativa de derrotar três adversários rapidamente e recompensa maior. Game8 descreve perda de ouro se derrotado. Esta diferença é explicada sem fixar resultado único.
- **Tensions:** PowerPyx e Game8 concordam que apoiar Simon ou Raghnall leva à Caverna Guerco; recomendação social a Raghnall não é garantia de afinidade testada.
- **Clash:** PowerPyx e Game8 condicionam a presença de Raghnall na torre à missão Tensions; revivê-lo após a luta não é necessário e não tem benefício documentado nesses guias.
- **Localização:** os quatro nomes PT-BR foram pareados à sua missão EN por descrição e objetivos do catálogo Kiranico PT-BR, em `QUEST_NAME_INDEX` como `kiranico_ptbr` com `sourceUrl`. Isso não comprova a extração de um PAK de questlog da build atual. Itens fora de extração específica da build são rotulados como descrições.

## Fontes
- https://www.powerpyx.com/dragons-dogma-2-masked-correspondence-walkthrough/
- https://www.gamerguides.com/dragons-dogma-2/guide/side-quests/vernworth/masked-correspondence-walkthrough
- https://samurai-gamers.com/dragons-dogma-2/dd2-vernworth-side-quest-masked-correspondence-walkthrough/
- https://www.powerpyx.com/dragons-dogma-2-welcome-to-battahl-walkthrough/
- https://game8.co/games/Dragons-Dogma-2/archives/Welcome-to-Battahl
- https://www.neoseeker.com/dragons-dogma-2/guides/Welcome_to_Battahl
- https://www.powerpyx.com/dragons-dogma-2-tensions-on-the-highroad-walkthrough/
- https://game8.co/games/Dragons-Dogma-2/archives/Tensions-on-the-Highroad
- https://www.powerpyx.com/dragons-dogma-2-clash-and-conclusion-walkthrough/
- https://game8.co/games/Dragons-Dogma-2/archives/Clash-and-Conclusion

- **Fonte de nomes PT-BR:** https://dragonsdogma2.kiranico.com/pt-BR/data/quests (correspondência com lista EN: https://dragonsdogma2.kiranico.com/en/data/quests).

## Controles de integridade
- **76/80 guias históricos** (16/16 principais, 60/64 secundárias), restam quatro secundárias no catálogo PowerPyx de 2024: A Case of Sculptor's Block, A Noble Exchange, 'Twixt a Rock and a Hard Place, Crossing in Shadow.
- 78 títulos EN/PT-BR em índice, quatro ainda sem guia; apenas dois guias publicados fora do índice (Jadeite e Tolled to Rest), embora o Kiranico já mostre um par para cada um. Os títulos de catálogo não são PAK-verificados.
- 111 registros CSV de evidência (49 fichas com itens; 27 sem item requerido). Todos os seis registros novos como fonte secundária, sem ID runtime ou evidência de save. Nomes EN/PT de quest vêm do Kiranico, não de PAK local.
- Testes novos de cadeia, inventário, localização e busca mobile sem escrita no localStorage. Registrar o resultado CI do HEAD do PR antes do merge; não antecipar êxito.
- Contagem **não** garante exaustão da build 2026 ou Dark Arisen. Nenhuma conclusão sobre DLC deve ser deduzida da base histórica.

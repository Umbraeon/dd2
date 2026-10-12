# Onda 12 — fechar sete lacunas de missões principais (12/10/2026)

## Resultado
O catálogo histórico PowerPyx de **16 missões principais de 2024** agora contém 16 fichas no Compêndio, sem representar promessa de cobertura exaustiva de expansões ou da build 2026. Total editorial: **47 → 54 fichas** (restam **26 secundárias** das 80 do comparador de 2024). Índice PT-BR **59 → 62** com três novos pares documentados; **9 nomes do índice** seguem sem ficha.

| Missão EN | Nome PT-BR do catálogo | Macroetapa |
| --- | --- | --- |
| Gaoled Awakening | O Despertar na Prisão | m01 |
| Tale's Beginning | A História se Inicia | m01 |
| In Dragon's Wake | No Rastro do Dragão | m04 e v101 |
| Seat of the Sovran | O Trono do Sobran | v101 |
| An Unsettling Encounter | Um Encontro Perturbador | v301 e v303 |
| Flickering Shadows | Sombras Trêmulas | b02 e b04 |
| Convergence | Convergência | p04 |

## Correções importantes
- No prólogo, a fuga se dá em um **grifo**. A História se Inicia envolve Justinn, a criação do Peão Principal e o descanso no posto.
- Quem escolta o jogador de Melve a Vernworth é **Gregor**, não o Capitão Brant. Brant só entra na missão seguinte, O Trono do Sobran, à noite na Estalagem Stardrop. Corrigido `v101`.
- Após O Trono Roubado, Um Encontro Perturbador direciona o jogador aos aposentos de Allard e à carta em uma sala de parede falsa, que deve ser **entregue a Brant**; corrigida a menção de `v301`.
- Sombras Trêmulas explica a obtenção de **pequeno fragmento de cristal azul para Ambrosius** e visitas ao Forjado pelo Dragão, Luz e o Ancião de Harve. **Convergência** leva até Rothais no Templo Abissal; a Sucessão Vil é recompensa para Um Novo Chamado Divino, e NÃO é item exigido antes de começar Convergência. Ajustado `p04`.

## Rastreabilidade da localização
- Os três títulos não presentes no antigo índice foram obtidos do catálogo localizado PT-BR do Kiranico: https://dragonsdogma2.kiranico.com/pt-BR/data/quests. Cruzados por seus títulos EN correspondentes em https://dragonsdogma2.kiranico.com/en/data/quests. Tipo de evidência `kiranico_ptbr`, **não** `pak_sample_reported`.
- Não afirmar que o HEAD executou a versão Steam, testou saves nem extraiu hashes/IDs runtime nesta onda. O nome em PT-BR das **missões** tem evidência de catálogo; o PT-BR de **Battahli-Crested Letter** e **Small Blue Crystal Shard** permanece descrição explicativa, não tradução oficial comprovada do item.

## Fontes dos passos
- https://www.powerpyx.com/dragons-dogma-2-gaoled-awakening-walkthrough/
- https://www.powerpyx.com/dragons-dogma-2-tales-beginning-walkthrough/
- https://www.powerpyx.com/dragons-dogma-2-in-dragons-wake-walkthrough/
- https://www.powerpyx.com/dragons-dogma-2-seat-of-the-sovran-walkthrough/
- https://www.powerpyx.com/dragons-dogma-2-an-unsettling-encounter-walkthrough/
- https://www.powerpyx.com/dragons-dogma-2-flickering-shadows-walkthrough/
- https://www.powerpyx.com/dragons-dogma-2-convergence-walkthrough/
- Comparação: https://game8.co/games/Dragons-Dogma-2/archives/An-Unsettling-Encounter e https://game8.co/games/Dragons-Dogma-2/archives/Convergence.

## Critérios técnicos
- 54 fichas protegidas, 62 pares EN/PT-BR, 53 eventos persistidos, 60 conquistas e armazenamento `dd2_roadmap_user_progress_v3` **inalterados**.
- Seções de inventário: 32 fichas com requisitos/itens opcionais; 22 sem itens de inventário obrigatórios identificados nos walkthroughs. CSV: 72 registros abrangendo 54 missões. Todas as novas informações de mecânica são marcadas como **FONTE_SECUNDARIA** e não como gameplay validado.
- Testes automatizados verificam 16/16 missões principais históricas, alinhamento com o índice, duas entregas obrigatórias, pesquisa mobile, textos, integridade de IDs.
- Sem mudança de desenho visual. Revisão de concisão e hierarquia fica para rodada de UX futura.

# Missão 02 — revisão visual mestre–detalhe

**Status:** protótipo web implementado para revisão visual do Head; **não aprovado pelo proprietário e não integrado à main**.

## Decisão de composição

A tela principal do PR #8 anterior colocava um painel de retomada extenso ao lado de uma lista. Isso produzia duas áreas concorrentes e repetia conteúdo no celular. O protótipo revisado substitui esse padrão por **um único diário de missões**, com estado visual de consulta separado da etapa ativa persistida.

| Aspecto pedido | Implementação | Diferença intencional |
| --- | --- | --- |
| Proporção da referência | 43% lista / 57% detalhes em desktop ≥801px | Ajustes dinâmicos por CSS grid; não é uma reprodução pixel a pixel |
| Fundo quase preto/avermelhado | Base #100e0d, transparências granuladas CSS, iluminação discreta | Nenhuma textura foi recortada do jogo ou gerada por IA |
| Ornamentos | Filetes, borda dupla e quatro pequenas marcas textuais CSS | Não usa gráficos proprietários |
| Seletor de missão | Linhas separadas, estado e seleção neutra cinza-acobreada | Nomes são mais legíveis que na referência; alvo mínimo 44px |
| Painel de atividade | Panorama em moldura, título, orientação do banco, cautelas, expandir, comandos | O texto da missão não foi reescrito nem auditado nesta tarefa |
| Imagem panorâmica | Arte promocional genérica © CAPCOM, carregada da Steam (origem abaixo) | A mesma imagem geral não pretende identificar um local da missão |
| Falha de imagem | Panorama SVG vetorial original distribuído no repositório | Paisagem **fictícia**, não representação de nenhum evento de Dragon's Dogma 2 |
| Mobile | Uma tela de lista; detalhe acessível ao selecionar, retorno explícito | Sem duas colunas estreitas; não repete painel de retomada acima |
| Consulta | Cronologia, 60 fichas de conquistas, modais e backup fora da experiência principal | Material completo permanece acessível; não há cópia total da UI do jogo |

## Origem dos recursos gráficos

1. **Arte promocional genérica do jogo:** `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2054970/library_hero.jpg` — material promocional oficial de *Dragon's Dogma 2* distribuído pela Steam, CAPCOM/Valve detêm os direitos relevantes. A imagem já era usada no hero da versão anterior; sua presença **não** garante licença geral para redistribuição. É referenciada por URL externa e identificada em legenda. Não é evidência factual sobre missão, lugar ou capítulo.
2. **SVG autoral:** `public/assets/chronicles-panorama.svg`; paisagem genérica fictícia criada diretamente em SVG/CSS. Nenhuma IA gerou esse arquivo. Usa somente primitivas gráficas e filtros. Uso interno como fallback quando a Steam estiver inacessível. Atribuição visível substitui a da arte promocional.
3. **Textura, molduras e separadores:** CSS autoral em `src/index.css`. Não foram copiados pixels da captura de referência.
4. **Captura de referência enviada pelo proprietário:** usada como orientação da composição. **Não armazenada nem republicada no repositório**. Não foi possível medir posições/paleta com amostragem automatizada do arquivo original, logo a equivalência pixel a pixel exige revisão humana.

## Estados e integridade

- **Inspecionada:** somente estado React (temporário). Escolher linha atualiza imediatamente os detalhes; localStorage permanece idêntico.
- **Atual fixada:** ação explícita `Fixar como atual`, armazenada no campo já existente `activeStepId`.
- **Adiada:** ação explícita `Adiar`, gravada no campo já existente `deferredStepIds`, sem marcar concluída.
- **Concluída:** ação explícita `Concluir marco`, gravada em `steps[id]`, reversível.
- Etapas concluídas ficam em aba separada. Após marcar etapa ativa como concluída, **não** é escolhida automaticamente uma próxima.
- Consulta mantém navegação focada para o item exato; código de persistência, versão v3, IDs, lista de etapas e JSON de backups inalterados.
- Avisos da atividade (`failureRisk`) não dependem da expansão de detalhes; alertas do capítulo aparecem como avisos de **gatilho ainda não verificado**, com ação de consulta.

## Limitações e critérios ainda abertos

- A ferramenta de geração de imagens por IA estava indisponível nesta conversa temporária; **não há três assets gerados com IA**. A paisagem SVG é autoral. Para criar Assets A/B/C conforme a autorização, usar uma conversa regular com geração de imagens habilitada, sem simplesmente copiar texturas proprietárias.
- O uso de arte oficial externa precisa de revisão de direitos pelo proprietário antes de disponibilização pública.
- Teste com usuários e validação com leitores de tela reais **não foram realizados**.
- Zoom/reflow por redução de viewport/CSS são testes substitutos e não prova integral de WCAG 2.2.
- O banco de 53 marcos é resumido; 60 fichas não significam 60 missões; avisos de risco carecem de auditoria factual individual.
- A aprovação estética depende da comparação lado a lado feita pelo proprietário com sua captura original.

## Evidências técnicas

O CI gera PNGs reais Playwright de desktop 1440×900 e 1920×1080, mobile 390×844 e 375×812, tanto no estado novo quanto 20/53, além de teste de persistência, backup e axe. Consultar a seção de evidências do PR #8 e os artefatos do GitHub Actions **após a execução**, sem deduzir aprovação estética a partir de CI verde.


## Assets Gemini recebidos do proprietário em 09/10/2026 — integração condicionada ao upload

Foram recebidos três JPGs: textura escura 2048×2048 RGB, ornamentos 2048×2048 RGB e pintura panorâmica 2048×1143 RGB. O conteúdo é gerado por IA e **não representa material oficial nem locais canônicos do jogo**.

A textura e a paisagem foram convertidas localmente sem mudanças composicionais para WebP:
- `public/assets/gemini-codex-background.webp` — preparado em 1600×1600, ~92 KiB; aplicado sob sobreposição escura em ambos os painéis. **O arquivo binário ainda precisa ser enviado à branch**.
- `public/assets/gemini-codex-panorama.webp` — preparado em 1600×893, ~93 KiB; imagem principal do painel de detalhes, com atribuição explícita. **O arquivo binário ainda precisa ser enviado à branch**.

A captura ornamental foi enviada como **JPG RGB**, sem canal alfa. O padrão quadriculado visível é parte real da imagem, não transparência. **Não publicar este arquivo diretamente nos cantos ou separadores**. Solicitar PNG/RGBA com transparência verdadeira e reavaliar densidade visual: os arabescos produzidos são sensivelmente mais espessos/ornamentados que a referência do jogo, portanto devem ocupar somente a moldura externa.

O código já identifica os recursos opcionais. Até o upload dos WebPs, a imagem recua para o material promocional da Steam e para o SVG autoral, e a textura recua para o fundo CSS existente. Isso evita bloquear o protótipo ou publicar uma imagem quebrada. **Não declarar o novo visual implantado nem sua captura de referência validada antes do upload dos arquivos e screenshots reais.**

O proprietário deve realizar o upload destes dois WebP para `public/assets/` **na branch `feat/missao-02-diario-navegacao-mobile`**, mantendo os nomes acima. A revisão continua em draft e sem merge.

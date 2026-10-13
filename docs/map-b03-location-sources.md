# Missão B03 — fontes e precisão das localizações

**Apenas cavernas e Mementos do Buscador.** Este preview não inclui os antigos pinos fictícios de missões, NPCs e viagem rápida.

## Mementos do Buscador (240)
Fonte original: dump de posições do jogo (RE Engine, `Gm82_036`), mantido no projeto Arisen's Almanac / gibbed.
- Dados: https://github.com/frostmx/dd2-map/blob/main/data/almanac/167.json
- Proveniência e limitações: https://github.com/frostmx/dd2-map/blob/main/findings/almanac-and-ar.md
- Scripts de origem: https://github.com/gibbed/DD2-REFramework-Scripts
- Cada item tem um GUID único e uma coordenada exata `(x,y,z)` do jogo; a numeração 001–240 é **ordem interna do GUID**, não ordem de descoberta.
- A coordenada 3D é projetada sobre a textura 8K usando `worldToMapPixel`; alguns mementos estão em cavernas/andares diferentes do mapa-múndi. O ponto **não indica a entrada** da caverna.
- A projeção artística (textura -> mundo) ainda requer calibração visual independente em vários marcos. Logo o status cartográfico é `SUPPORTED`, não `VERIFIED`.
- Dados-base ficam versionados em `src/data/seekerTokenGamePositions.ts`.

## Entradas de cavernas (37)
Fonte: Gamer Guides — World Map / Dragon's Dogma II e páginas individuais no banco de localizações.
- https://www.gamerguides.com/dragons-dogma-2/maps/world-map
- `src/data/caveEntranceSources.ts` registra **37 entradas**, não necessariamente 37 cavernas distintas: algumas têm portas múltiplas.
- Coordenadas `X/Y` publicadas nos mapas Gamer Guides são convertidas para coordenadas RE Engine com um ajuste afim usando três centros habitados e entradas do Forgotten Tunnel.
- Ajuste aproximado: `gameX = 0.532404201 × guideX − 0.004768439 × guideY − 4449.69992`; `gameZ = −0.001176829 × guideX + 0.530400505 × guideY − 4108.84838`.
- Amostras de âncoras podem divergir em até ~32 m no mundo do jogo. Posição de entrada recebe `SUPPORTED`, **não** `VERIFIED`.
- `worldPosition = null` nas cavernas porque não há registro 3D extraído para cada uma.
- Alguns acessos dependem de missões/portas/altura. Evite apresentar o ponto como acesso garantido.

## Interação e testes
- Camada de cavernas âmbar e mementos turquesa; cada ponto tem link de origem.
- Tokens agrupados em zoom distante, com separação ao aproximar; grupos não mudam os dados originais.
- Filtros apenas cavernas e mementos; opção de ocultar locais.
- Nenhum dado do MapGenie é consultado em tempo de execução.
- `npm test` garante contagens, GUIDs, fontes e a transformação aproximada. `npm run test:e2e` valida visual do mapa, fontes e filtros.

**Critério futuro para status VERIFIED:** conferir individualmente a entrada ou o memento com a arte 8K e o jogo (ou evidência de imagem com marcos inequívocos), registrar método e erro observado. Ausência de evidência não autoriza promover localização.

O repositório `main` e o progresso de usuário `dd2_roadmap_user_progress_v3` não são modificados pela missão B03.

# Mapa B01 — tiles multinível (preview)

## Estado comprovado
- Esta branch contém **apenas** `public/world-map.webp` (2048×2048, imagem derivada do jogo).
- O arquivo 8192×8192 citado pelo Executor B está fora deste repositório. Nenhum detalhe extra será inventado por ampliação.
- O mapa usa `Leaflet CRS.Simple` com plano de referência 2048×2048 e marcadores **não auditados**.
- `npm run build` executa `scripts/build-map-tiles.mjs` e emite `dist/map-tiles/` via `public/map-tiles/`.
- A arte original de Dragon's Dogma 2 permanece sujeita aos direitos de propriedade intelectual da CAPCOM. O uso no preview não significa licença concedida.

## Instalar e validar

```bash
npm install
npm test
npm run build
```

Confira `public/map-tiles/metadata.json` após o build. Esperado para a fonte 2K: **85 tiles** em níveis nativos -3, -2, -1 e 0, com pixel original preservado no zoom 0. A versão 8K cria **1365 tiles** e alcança zoom nativo 2, ou seja, 4 vezes mais pixels lineares no mesmo espaço cartográfico.

## Substituir a fonte por 8K real

1. Obter do responsável pelo pacote de extração uma imagem 8192×8192 **comprovadamente derivada do mapa correto**, exportada para PNG ou WebP (não `.tex`). Inspecionar dimensões, orientação, acabamento e direitos de uso.
2. Salvar como `public/world-map-8k.webp` ou `public/world-map-8k.png`.
3. Executar `npm install && npm run build`. A prioridade é 8K WebP → 8K PNG → 2K WebP. O script verifica as dimensões e **não faz upscale**.
4. Abrir o mapa no navegador, aproximar e inspecionar coordenadas de tiles, continuidade visual de rios/estradas, rede e custos de carregamento.
5. Só promover as localizações de `UNVERIFIED` após prova independente de cada ponto. O uso de tiles não corrige a calibração do mundo.

Os mosaicos de `public/map-tiles/` são arquivos gerados e ignorados pelo Git. Não devem ser adicionados ao repositório. A Vercel regenera-os em cada build. Durante desenvolvimento sem build, o aplicativo ainda pode usar `/world-map.webp` como fallback.

## Conversão de coordenadas

Em `CRS.Simple`, o tile Y no Leaflet é negativo. Para largura fixa 2048 e tile de 256:

- `tilesPorEixo = 8 × 2^zoom`
- `rowRaster = yLeaflet + tilesPorEixo`
- URLs de saída: `/map-tiles/{zoom}/{x}/{rowRaster}.webp`
- Exemplos: zoom -3 → 1 tile; zoom 0 → 8×8; zoom 2 → 32×32.

A conversão é coberta por `tests/mapTiles.test.mjs`; `e2e/independent-map.spec.ts` inspeciona o carregamento real no navegador.

## Reversibilidade

Este trabalho modifica exclusivamente a branch de preview. Não implica merge na `main`, substituição do MapGenie, nem validação de missões. O botão de imagem limpa/sem arte continua disponível como ferramenta de diagnóstico.

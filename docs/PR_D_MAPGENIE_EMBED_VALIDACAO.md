# PR D — Integração do mapa MapGenie: evidências e limites

**Data da investigação:** 10/10/2026  
**Issue:** #16 | **Base:** `main@3cdfe744ab0c2551ee24c386d57ef256547494ba`

## Fonte e URL

- Página oficial do mapa: https://mapgenie.io/dragons-dogma-2/maps/world
- URL candidata de embed: https://mapgenie.io/dragons-dogma-2/maps/world?embed=light
- Demonstração independente do mesmo embed de DD2 (não significa autorização contratual):
  https://wegamedaily.com/dragons-dogma-2-interactive-map/
- Relato documentado de um painel “Embed Map” no próprio MapGenie em *ICARUS*, com
  botão de copiar `iframe` e `?embed=light`; **não** é documentação oficial de DD2:
  https://www.itechguides.com/icarus-interactive-maps-and-locations/
- App oficial do provedor no Google Play (funcionalidades gerais e contato do fornecedor):
  https://play.google.com/store/apps/details?id=io.mapgenie.dragonsdogma2map

## Viabilidade técnica observada

`scripts/probe-mapgenie-embed.mjs` realiza teste real em Chromium, a partir de
`http://127.0.0.1:3011/`, sem interceptação, scraping, APIs privadas ou dados de pins.
O primeiro ciclo de CI em [38092710306](https://github.com/Umbraeon/dd2/actions/runs/38092710306)
observou:

| Cenário | Resposta do documento | X-Frame-Options | CSP | Superfície do mapa | Controles |
| --- | --- | --- | --- | --- | --- |
| iframe 390×844 | HTTP 200 | ausente | ausente | 1 | 76 |
| iframe 1440×900 | HTTP 200 | ausente | ausente | 1 | 76 |

As superfícies e controles são **sinais técnicos**, não prova automática da
integridade de cada imagem, da usabilidade de todos os filtros nem de disponibilidade futura.
Há screenshots antes/depois da interação de zoom para revisão independente.

O CI do PR D também verifica a integração **na aplicação final** com o serviço real,
em 375×812, 390×844, 1440×900 e 1920×1080; o resultado de
`test-results/mapgenie-probe.json` e as capturas `pr-d-real-app-*`
devem ser conferidos antes do aceite. Testes de fluxo com iframe
**simulado** são registrados separadamente como `pr-d-ui-simulated-*`.
Não é permitido confundir os dois grupos.

## Permissões e restrições

**Autorização contratual de uso incorporado por terceiros neste site: NÃO CONFIRMADA.**
A existência do recurso de iframe em outros mapas e a ausência de bloqueio XFO/CSP
não constituem uma licença, garantia de uso comercial ou aprovação de termos.
Não foi possível revisar uma declaração oficial vigente de licenciamento aplicável
ao nosso domínio. É necessário conferir o “Embed Map” específico do mapa DD2
e as condições do MapGenie, ou solicitar confirmação ao suporte do provedor
(`support@mapgenie.io` identificado na ficha oficial do aplicativo), antes
de **aprovar a integração**. Se a autorização for negada, remover a incorporação
e manter **somente** a experiência externa. O PR é draft e não está liberado para merge.

A incorporação pode carregar cookies, publicidade, scripts de mensuração e serviços
de terceiros. A investigação observou solicitações de anúncios/mensuração associadas
à página MapGenie. O iframe só existe após ação explícita; avisos de terceiros,
rótulo MapGenie e links oficiais visíveis em todos os estados. Não esconder anúncios,
branding, paywalls ou alterar conteúdo/controles do provedor. Sem pré-filtro por
URL não documentado. O jogador escolhe `Seeker's Token` dentro do MapGenie.

Não é possível à aplicação auditar de modo confiável o conteúdo cross-origin do iframe,
sincronizar marcações ou distinguir todos os bloqueios de navegador por `onload`.
Adblock, cookies, desempenho, filtros pagos e políticas futuras do provedor podem afetar
o funcionamento. O link direto `Abrir no MapGenie` permanece disponível sempre.

## Arquitetura e armazenamento

- `TokensTrackerModal` mantém contador, textarea e link externo; adiciona só
  o controle `Ver mapa interativo`.
- `App.tsx` troca modal de Mementos pelo `TokensInteractiveMap` com
  retorno e foco previsíveis, sem dois overlays concorrentes.
- `TokensInteractiveMap` usa `dialog.showModal()` nativo, área de mapa grande,
  iframe com título acessível/atribuição e carregamento sob demanda.
- `seekerTokensCount`, `firstTokenLocation`, Esfinge, Diário e backup v3
  não recebem novas regras. A navegação pelo mapa não escreve em `localStorage`.
- Nenhum mapa, tile, catálogo de coordenadas ou ícone do provedor foi copiado.

## Critérios de aceite pendentes

1. **Confirmação das condições de uso/licenciamento por MapGenie.**
2. Revisão visual humana dos PNGs reais (mobile/desktop e pós-interação).
3. Revisão independente de acessibilidade/usabilidade e dos limites cross-origin.

CI aprovado, quando ocorrer, representa somente validação automatizada, não
aceite jurídico nem garantia de renderização para todos os jogadores.

**NÃO MERGE / NÃO AUTO-MERGE sem autorização expressa do proprietário e revisão do Head.**

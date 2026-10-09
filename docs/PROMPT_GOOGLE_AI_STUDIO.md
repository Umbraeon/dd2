# PROMPT DE EXECUÇÃO — GOOGLE AI STUDIO / Umbraeon/dd2

Você está atuando como **engenheiro frontend sênior + designer editorial digital + revisor factual** de uma aplicação existente. Repositório: `Umbraeon/dd2`, stack React 19, TypeScript, Vite 8, Tailwind CSS v4. Leia o código atual ANTES de alterar qualquer arquivo. Não substitua o projeto por um template novo.

## Objetivo inegociável
Criar um site **realmente autoral** de Dragon’s Dogma 2: um **grimório do Nascen / códice de jornada de fantasia sombria**, com utilidade prática para acompanhar missões em sequência e conquistar todos os troféus possíveis. O roteiro deve se apoiar no guia da Steam https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992. O layout deve ser artesanal e editorial, não um dashboard.

## PROIBIÇÕES
1. **NÃO gere imagens por IA**, incluindo banners, ícones de conquistas, personagens, mapas, backgrounds ou mockups. Use SOMENTE artes oficiais da Steam/Capcom verificadas e com crédito, ícones oficiais de conquistas e composições feitas em CSS/SVG manual. Não use Unsplash/Pexels nem imagens aleatórias.
2. NÃO use cartões SaaS genéricos com cantos muito arredondados, gradientes roxo-azul, glassmorphism, sombras pesadas, KPIs como produto financeiro ou ícones gigantes repetidos.
3. NÃO afirme “100% garantido”, “zero risco”, “pesquisa auditada”, “todas as missões verificadas” sem auditoria documental por entrada. Não invente diálogos, gatilhos, contagens, requisitos, destinos, URLs, links de conquistas nem nomes localizados.
4. Não exclua funcionalidades do site atual: checklist por etapa e conquista, busca, filtros, ferramentas da Esfinge, carnes, maestrias, Mementos, checkpoints, glossário, fontes, importação/exportação e persistência local. Não resete as chaves de progresso existentes.
5. Nunca reordene missões apenas para embelezar; a ordem é fundamental. Não misture DLC e jogo-base.

## DIREÇÃO DE ARTE ESPECÍFICA
Paleta: preto carvão #0b0c0b, bronze velho #b99a67, cobre #80573f, pergaminho #e5d2ae, ferrugem de perigo #a96049. Layout de manuscrito: margens generosas, bordas em fio de ouro, marcas de capítulo, ornamentação discreta e assimétrica, hierarquia tipográfica visível e textura feita em CSS. Fontes: Cinzel para títulos, EB Garamond para narrativas, sans discreta para metadados e instruções. Hero cinematográfico com ARTE OFICIAL verificada https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2054970/library_hero.jpg, overlay para legibilidade, créditos CAPCOM/Steam, título monumental e CTA “Iniciar a Jornada”. Nada gerado por IA.

Em desktop, preferir composição de códice: sumário fixo estreito à esquerda, conteúdo textual legível no centro, indicações de perigo em cobre, conquistas reais com seus ícones oficiais. Em mobile, navegação compacta, tipografia fluida, etapas com toque confortável, zero rolagem horizontal. O progress tracker deve parecer uma barra de viagem em pergaminho, não dashboard corporativo.

## FUNCIONALIDADES / EXPERIÊNCIA
- Manter os 9 capítulos existentes na mesma ordem; cada marco apresenta número, ação, observação, pré-requisito, alerta contextual, fonte clicável e conquistas ligadas.
- Mostrar a porcentagem concluída sem mentir que 53 marcos equivalem à totalidade das missões.
- Risco crítico só quando documentado; prazos reais, condicionais ou não verificados devem ser diferentes. Cada alerta precisa de como evitar o risco, fonte e condição.
- Ícones de conquistas da Steam com fallback elegante (não gerado), títulos originais e PT-BR claramente distinguidos de tradução editorial.
- Desenvolver filtro real de “missões com prazo” e não reutilizar indiscriminadamente o booleano “perdível”; considerar propriedade explícita `isTimed` apenas após verificar as entradas.
- No fluxo de checkpoints, enfatizar que marcar a caixa significa “li”, não “o jogo foi validado”.
- Persistência local, backup JSON, suporte a teclado, leitor de tela, preferências de movimento e contraste AA.
- Se uma imagem oficial não abrir, degradar com background neutro sem bloquear o conteúdo.

## POLÍTICA DE FATOS
Fontes primárias: Steam oficial (conquistas e artes), Capcom (lançamento da expansão). Secundárias: guia cronológico comunitário (ordem), PowerPyx (roadmap e decisões), e outros walkthroughs especializados quando cruzados. Organizar evidências por campo (não só link genérico da página).
Fontes:
- Steam: https://steamcommunity.com/stats/2054970/achievements
- Capcom: https://www.capcom.co.jp/ir/english/news/html/e260610.html
- Guia cronológico: https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992
- Roadmap especializado: https://www.powerpyx.com/dragons-dogma-2-trophy-guide-roadmap/

Dados existentes em `src/data/roadmapData.ts`: 60 fichas de conquistas e 53 MARCOS RESUMIDOS em 9 capítulos. Esses 53 itens NÃO são sinônimo de todas as missões. Trate instruções do roteiro como comunidade/em revisão até checar individualmente. A DLC Dark Arisen pertence à fase separada e sua ordem específica ainda requer validação. Não preencha lacunas por plausibilidade.

## ENTREGA E TESTES
Trabalhe no código existente, modificando componentes reutilizáveis e CSS de forma intencional. Primeiro apresente diagnóstico dos arquivos e plano curto; implemente. Depois execute `npm install`, `npm run lint`, `npm run build`, cheque responsividade 375/768/1440px e estados vazios, erro, filtros, imagens quebradas, checkboxes, exportação e importação. Não declare testes como aprovados sem executar. Resuma arquivos editados e pontos pendentes. Entregue screenshot REAL da execução (não um mock gerado) somente se houver ferramenta de navegador disponível.

Critério final: este site deve se parecer mais com um atlas de fantasia medieval de colecionador do que com um template gerado automaticamente por IA.

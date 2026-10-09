# Estado factual do guia — 09/10/2026

## Dados contáveis no código
- `src/data/roadmapData.ts`: 9 capítulos, 53 marcos de ação e 60 fichas numeradas de conquista (54 base + 6 DLC). Estes números foram checados estruturalmente no arquivo, **não são auditoria das soluções**.
- Os IDs numéricos 1–60 são únicos; não representam IDs oficiais da API Steam.
- A cronologia foi resumida de https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992. O original lista separadamente atividades “INICIAR”, “CONTINUAR”, “COMPLETAR” e “TEMPO”; nossa versão agrupa várias dessas atividades numa etapa. Para cumprir literalmente todas as missões, expandir cada uma sem reordenar.

## Evidências mais fortes
- Descrição e lista oficial: https://steamcommunity.com/stats/2054970/achievements
- Anúncio oficial da expansão: https://www.capcom.co.jp/ir/english/news/html/e260610.html
- Guia cronológico da comunidade: https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992
- Roteiro de troféus e ponto de não retorno: https://www.powerpyx.com/dragons-dogma-2-trophy-guide-roadmap/

## Pendências de auditoria
1. Validar CADA marco do roteiro (gatilho, dependências, restrição temporal, solução, melhor desfecho) contra walkthrough de missão e versão do jogo.
2. Distinguir entre conquistas perdíveis, missões opcionais perdíveis e ações recuperáveis em NG+.
3. Validar instruções de combate, localização, nomes PT-BR e avisos detalhados no código (há simplificações e hipóteses a revisar).
4. DLC: lista de 6 conquistas distinta de walkthrough completo; não afirmar rota da DLC como testada.
5. Identificar eventuais nomes de conquista traduzidos editorialmente, não apresentados como tradução oficial.
6. Revisar todas as entradas de `RISK_CHECKPOINTS` e acrescentar fonte por checkpoint e por frase crítica.

## Regras de edição
- Sem afirmação factual nova sem link rastreável e revisão. Insuficiência de evidência = rotular “em verificação”.
- Não declarar rota infalível ou totalidade das missões com apenas 53 marcos.
- Arte usada no hero: imagem promocional oficial, servida pelo Steam CDN; direitos pertencem à CAPCOM.

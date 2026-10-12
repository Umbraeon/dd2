# Onda 7: campanha principal — Um Novo Chamado Divino e O Guardião Gigantus

**Data:** 12/10/2026 · **Base:** `main@8c229f10` · **Issues:** #27 e #37.

## Objetivo
Disponibilizar o passo a passo de duas missões principais que o roteiro resumia em alertas (p04/p05), sem fabricar garantias sobre o ponto sem retorno, salvamento ou conquistas.

| Guia PT-BR preexistente no índice | EN | Guia ID | Marcos |
|---|---|---|---|
| Um Novo Chamado Divino | A New Godsway | `new_godsway` | p04 |
| O Guardião Gigantus | The Guardian Gigantus | `guardian_gigantus` | p04, p05 |

Biblioteca sobe de **33 a 35** guias no PR. O catálogo histórico de 2024 passa de **47 a 45** lacunas (9 principais, 36 secundárias); o índice PT-BR versionado passa de **27 a 25 títulos sem ficha**. Esses números NÃO são a contagem do cliente atual ou da expansão.

## Evidências de gameplay

1. [PowerPyx — A New Godsway](https://www.powerpyx.com/dragons-dogma-2-a-new-godsway-walkthrough/) e [Game8 — A New Godsway](https://game8.co/games/Dragons-Dogma-2/archives/A-New-Godsway): Dulled Godsbane Blade obtida ao fim de Convergence, Ambrosius no laboratório, **15 Wyrmslife Crystals**, retorno após um dia, Empowered Godsbane Blade.
2. [PowerPyx — The Guardian Gigantus](https://www.powerpyx.com/dragons-dogma-2-the-guardian-gigantus-walkthrough/) e [Game8 — The Guardian Gigantus](https://game8.co/games/Dragons-Dogma-2/archives/The-Guardian-Gigantus): portão Spellseal, perseguição de Phaesus, estacas/cristais como pontos fracos, balistas ou subir no colosso, acesso a Moonglint Tower.
3. [Gamer Guides — Guardian Gigantus](https://www.gamerguides.com/dragons-dogma-2/guide/walkthrough/bakbattahl/dragons-dogma-2-a-new-godsway-walkthrough/) e [PowerPyx — All endings](https://www.powerpyx.com/dragons-dogma-2-all-endings-guide/): Unmaking Arrow com Arqueiro facilita a conquista de derrota rápida; é item de uso único e precisa ser preparado antes. **Não declarar que o colosso morre instantaneamente** após o disparo, que troféu ocorre sem condição adicional nem que tal método é o único possível.
4. **Divergência de risco:** PowerPyx recomenda salvar antes de entregar os cristais e afirma que seguir o primeiro marcador da missão seguinte entra no caminho final; Game8 aponta as escadas da torre como gatilho do trecho final. A redação é preventiva: revisar quests e saves antes de ambos os pontos, **sem declarar um instante único e universal de perda**, especialmente após patch 3.2.

## Limites e critérios de aprovação

- Não foi executado playthrough com a build atual nem recuperado save após entrada na torre. **Documentação corroborada não equivale a teste em jogo.**
- Localização de ambos os títulos é `paired_catalog`; o guia reaproveita nomes PT-BR existentes, sem atribuir prova PAK que não existe.
- Manter estáveis `localStorage` v3, IDs dos 53 marcos, 60 conquistas, 8 falsificações.
- Playwright móvel e busca PT-BR; teste unitário para 15 cristais, sequência Gigantus e vínculo ao alerta p04/p05.
- Atualizar `docs/audit/quest-coverage-quality-gate-2026-10-12.json` junto de novas fichas: **35 guias protegidos / 25 títulos pendentes**.

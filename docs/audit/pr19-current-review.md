# Revisão técnica da PR #19 e reavaliação do `main`

**Data:** 2026-10-11
**PR histórica:** [#19 — fix(content, draft): corrigir pontos sem retorno, Wilhelmina e cinco evacuações](https://github.com/Umbraeon/dd2/pull/19)
**Head histórico:** `4fcbd983ed24f541eaa7b09fcc906d7e5fc858ae`
**Estado da PR #19:** `CLOSED`, sem merge, em 11/10/2026
**Correção substituta:** [PR #20](https://github.com/Umbraeon/dd2/pull/20), mesclada como `925f5d5`
**Produção reavaliada:** `origin/main@6fe3b38`

## Resultado

A revisão original devolveu a PR #19 por três P1 de conteúdo. A PR #20 corrigiu esses pontos e foi mesclada com o check remoto `build` aprovado. A inspeção do código atualmente consumido pela UI confirma as correções; os três P1 não permanecem abertos em produção.

| Achado da revisão histórica | Estado atual |
|---|---|
| `sphinx_diff` enviava Vergil a Bakbattahl. | `roadmapData.ts` agora situa Dante ao norte e Vergil ao sul do mesmo portão da Cidade de Descanso da Fronteira e instrui a não ir ao centro de Bakbattahl. O teste exige `Dante.*NORTE`, `Vergil.*SUL` e rejeita a formulação antiga. |
| `m04` omitia os dois retornos a Lennart. | O texto agora ordena barris, retorno, veneno e novo retorno. O teste exige essa ordem. |
| `m02` tratava a morte de Accardo como possibilidade desconhecida. | O texto agora registra os desfechos de sucesso e morte existentes no questlog e preserva como desconhecidos somente o prazo e a relação causal temporal. |

## Integridade do caminho de dados

A UI continua importando `PHASES`, `ROADMAP_METADATA` e `SPHINX_RIDDLES` de `src/data/roadmapData.ts`. Os IDs de marcos, conquistas e checkpoints e a chave `dd2_roadmap_user_progress_v3` não foram alterados pelas correções factuais. Os commits posteriores `05fc0e4` e `6fe3b38` acrescentaram os 59 nomes PT-BR comprovados e sua exibição nas orientações.

## Limites

- **OBSERVED:** redação atual, regressões textuais e estado das PRs/check remoto.
- **SUPPORTED:** os textos atuais representam corretamente a evidência documental disponível para Accardo, Lennart e Vergil.
- **UNKNOWN:** prazo exato de Accardo, comportamento em saves específicos e reprodução visual/runtime dos três fluxos.

Checks verdes demonstram integridade estrutural, não homologação de gameplay. A correção documental não autoriza por si só um teste runtime.

## Veredito atual

**PR #19: SUPERADA/FECHADA. PR #20: ACEITA E PRESENTE NO `main`.** Não há P0 nem P1 textual remanescente nesses três pontos.

Por decisão do proprietário, qualquer implementação futura deste trabalho será feita por GPT/Codex e reauditada pelo Head antes de solicitar runtime.

**Próxima ação exata:** manter a PR #19 fechada e direcionar experimentos futuros às lacunas runtime registradas no backlog, sem reabrir as três correções já incorporadas.

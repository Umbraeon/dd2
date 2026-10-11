# Política editorial — linguagem do jogador

**Decisão do proprietário, 11/10/2026:** o Compêndio deve ser preciso, enxuto e operacional. Incerteza de pesquisa, status de auditoria e divergências entre fontes devem ser resolvidos internamente, não apresentados como avisos repetitivos a quem joga.

## Regra principal

Uma tela de missão responde **o que fazer, onde fazer e quando agir**, usando instruções curtas. Quando houver um risco relevante para o próximo passo, mostrar **uma** cautela contextual com ação possível. Não usar rótulos de severidade herdados do banco editorial como confirmação de risco no jogo.

- **Publicar** requisitos sustentados por evidências adequadas e instruções objetivas.
- **Omitir da UI** especulações sobre gatilhos, prazos e salvamentos; manter evidência, hipótese e pendências em `docs/audit/` e nas issues.
- **Não suprimir uma cautela real e acionável** só por não ter evidência perfeita sobre todas as suas consequências. Preferir o passo preventivo ("Confira as missões pendentes antes de avançar") à afirmação de perda absoluta sem comprovação.
- **Não prometer rota completa ou 100% garantido.** Os 53 marcos do roteiro não equivalem a todas as missões individualizadas. A ausência de aviso não prova ausência de missabilidade.
- **Conquistas relacionadas** são itens para acompanhamento, e não desbloqueios automáticos na etapa. Marcar a conquista deve continuar independente da etapa.
- **Arte decorativa** não comprova localização. Crédito e proveniência permanecem documentados no repositório, com atribuição simples quando necessária.

## Mudanças desta etapa

1. Diário: remove status de auditoria, provas parciais de localização e alerta genérico de capítulo; mantém instrução, requisitos, cautela por etapa prioritária e acesso às fichas/fontes.
2. Consulta: elimina banner de advertência redundante, reduz referências principais a quatro fontes e recolhe checkpoints.
3. Conquistas: retira validação editorial técnica das fichas; preserva os campos de proveniência no banco e nas auditorias.
4. Dados: simplifica orientações em Melve, coroação, Gigantus, finais e DLC. Itens da DLC sem rota confirmada deixam de anunciar gatilho, nível recomendado ou irreversibilidade como orientação ao jogador.
5. Checkpoints: substitui texto datado sobre salvamentos e coloca a revisão antes do avanço em foco.

## Pendências internas (não usar como copy pública)

- Auditar individualmente cada gatilho e o prazo exato dos eventos temporizados, com foco em `m02`, `v302`, `v303`.
- Reproduzir nos saves atuais o retorno após escolhas de finais e a transição ao Mundo Desancorado.
- Capturar e versionar a fonte primária dos pares PT-BR que ainda dependem de catálogo/relato, incluindo os títulos da DLC.
- Homologar a entrada, o nível recomendado e a missabilidade de Dark Arisen antes de voltar a ensinar uma rota concreta.
- Revisar todos os `failureRisk` e as listas de checkpoints: cautela editorial não equivale a consequência comprovada.

**Evidências anteriores não foram descartadas:** consultar `docs/audit/`, PRs #17, #20, #21, #22, #23, #24 e histórico do Git. Esta revisão muda a apresentação e a redação pública, não certifica a pesquisa inteira.

## Critério de aceite

- Nenhum aviso genérico de "em verificação", "não auditado" ou "classificação em revisão" na jornada principal.
- Cautelas prioritárias continuam visíveis antes dos vínculos de conquistas, sem duplicação quando a instrução é expandida.
- Os quatro checkpoints permanecem consultáveis.
- IDs, progresso v3, histórico local e funções de backup não são alterados.
- CI, testes de progresso e QA visual em mobile/desktop verdes; CI **não** substitui inspeção de uso real.

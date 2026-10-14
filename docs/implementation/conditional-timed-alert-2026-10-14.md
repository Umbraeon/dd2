# Alerta condicional de Wilhelmina — 14/10/2026

## Problema
O marco `v302` era classificado como `Temporizada` sem indicar no sinal compacto que os três dias só começam **depois** de aceitar ajudar Wilhelmina. A escolha de fixar a etapa no guia **não** representa aceitação dentro do jogo.

## Mudança mínima
- `timedTrigger?: string` em `QuestEvent`, metadado editorial opcional.
- Apenas `v302` recebe a condição de início, já descrita no texto da ficha.
- Selo completo: **Prazo após gatilho**, com tooltip detalhando o aceite; selo compacto: ícone com descrição acessível **Prazo após gatilho e perdível**.
- `isTimed` permanece verdadeiro para filtros e inventário. Não criar contador ou estado de relógio; não afirmar que o jogo comunica aceitação ao aplicativo.
- `b02` mantém a distinção entre missões agrupadas, sem prazo comum.

## Limites
Gatilhos e alternativas de ativação in-game seguem em validação na issue #69. Mudança de texto de alerta não valida gameplay. Não altera 72 IDs, 82 fichas, 60 conquistas nem `dd2_roadmap_user_progress_v3`. Revisar em mobile e leitor de tela além dos testes automatizados.

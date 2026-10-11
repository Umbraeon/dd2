# Evidência de localização de duas missões DLC — relato técnico (11/10/2026)

**Finalidade:** complementar a [auditoria factual preliminar](audit-summary.md) com os títulos localizados reportados pelo proprietário. **Não se trata de prova reproduzida nesta sessão** e não substitui a captura do diário PT-BR nem a verificação de sequências e requisitos de missão.

## Proveniência reportada

- Jogo: *Dragon's Dogma 2*, instalação Steam build **25290080**, base `re_chunk_000.pak` e DLC `re_dlc_stm_2593290.pak`.
- Ferramenta de inventário/extração seletiva: **RETool v0.241**. O relatório do proprietário relata `exit code 1` apesar da listagem e dos contêineres extraídos; isso é uma ressalva instrumental, não confirmação de operação por exit code.
- Decodificação de `.msg.24`: parser de leitura `dtlnor/REMSG_Converter`, commit `4289554cd0bdd8eba8c61fa0addbcbe9726a7c0f`, licença MIT, dependências Python isoladas. O procedimento não executou repack nem alterou o jogo, segundo o relatório recebido.
- O material entregue ao revisor atual é uma transcrição/relatório de execução e tabelas de amostra. **Os binários PAK, CSV completo com 59 pares, saídas brutas e ambientes do proprietário não foram montados neste repositório**, de modo que hashes não foram recalculados por esta revisão.

## Dois pares DLC identificados no relatório

| Jogo/quest EN | Literal PT-BR extraído reportado | Chave no jogo | Caminho de recurso no DLC | SHA256 reportado do arquivo extraído |
| --- | --- | --- | --- | --- |
| `Chilling Tidings` | **Notícias Congelantes** | `Mes_qu040010_log_title` | `natives/stm/message/questlog/qu040010_log_end.msg.24` | `91B4FAC9E38DFCCC3BB5D46AC9A96EADAD7BF285FFDD464515D7F9F3A6B02CE9` |
| `Lost Rites` | **Rituais Perdidos** | `Mes_CONTENTS_0014_log_title` | `natives/stm/message/questlog/questlog_contents_0014.msg.24` | `6148A9170CC816A6B51DC3EFF6AF27D1CBF663D6D79A8725513E23BB5392C69C` |

**Classificação editorial recomendada:** `LOCALIZACAO_EXTRAIDA_REPORTADA` (fonte primária de bytes relatada pelo proprietário, ainda não reproduzida pelo revisor). **Não classificar como `CAPTURA_UI_PTBR`**; os títulos podem aparecer em estados específicos do questlog. O mesmo relatório relata 59 pares EN/PT-BR, mas o restante exige CSV completo e vínculo de IDs antes de atualização sistemática de textos.

## O que é independente do relato

- A existência dos caminhos de expansão, o contato com Brant e os níveis **recomendados**, não obrigatórios, foram corroborados por materiais pós-lançamento e publicações Capcom/Steam. [Publicação Steam Capcom sobre níveis](https://steamcommunity.com/app/2054970?l=brazilian) · [PC Gamer sobre início](https://www.pcgamer.com/games/rpg/dragons-dogma-2-how-to-start-dark-arisen/).
- O nome PT-BR oficial de **conteúdo** `Rituais Perdidos` divulgado por Capcom é consistente com o par reportado, mas **conteúdo DLC** e **título de quest** são conceitos distintos. A extração pretende sustentar especificamente o segundo; publicação não prova exibição no diário.

## Próximas verificações

1. Solicitar/guardar export seletivo de prova (CSV de duas chaves com EN/PT-BR e hashes recalcualdos), sem distribuir PAKs nem recursos protegidos em massa.
2. No jogo atualizado em PT-BR, registrar screenshot do diário com missão selecionada, Steam build/plataforma e contexto de ativação.
3. Confirmar a aparição do título em cada fase, cronologia Brant/Unmoored e gatilhos de conquistas individualmente.
4. Integrar a matriz completa de 59 registros apenas após auditoria de duplicações, capitalização e proveniência.

**Uso no site:** permitido como título localizado atribuído à extração e com ressalva visual; proibido tratá-lo como confirmação de exibição no diário em todos os estados.

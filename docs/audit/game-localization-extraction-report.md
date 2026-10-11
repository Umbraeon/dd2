# Extração read-only de localização do jogo — build Steam 25290080

**Data:** 2026-10-11
**Escopo:** PAK base e DLC instalados; somente listagem e extração seletiva de contêineres de títulos de quests. O jogo não foi executado e nenhum arquivo da instalação foi alterado.

## Precommit do experimento

- **Hipótese:** os PAKs atuais e a lista de caminhos DD2 expõem recursos de quest/mensagem com as localizações inglesa e brasileira usadas pelo build 25290080.
- **Observação esperada se verdadeira:** RETool lista os PAKs, resolve caminhos de `questlog` e os recursos seletivamente extraídos ligam ID interno, chave de título, inglês e PT-BR.
- **Falsificação:** formato não listável, caminhos não resolvidos, extração seletiva impossível ou contêiner sem mapeamento confiável entre quest, chave e literal.

**Resultado:** hipótese suportada. O mapeamento foi obtido por chave `_log_title` dentro dos contêineres `GMSG`, não por `strings` binário.

## Ambiente e integridade

| Item | Valor observado |
|---|---|
| Steam build | `25290080` |
| Idioma instalado | `brazilian` em `UserConfig` e `MountedConfig` |
| Depot base principal | `2054973`, manifest `5096395230065303989` |
| Depot executável/suporte | `2054971`, manifest `3438547366935427234` |
| Depot DLC marcador | `2593280`, manifest `3305444330840079072` |
| Depot Dark Arisen | `2593290`, manifest `3353726914325255074` |
| RETool | RE Engine PAK tool `v0.241` |
| SHA-256 RETool | `0F4F793078D0A80DB9C71729C6C76228720145467F4DCF595D49C279974EEC6D` |
| SHA-256 lista DD2 | `9254207E1497543472D79B80E689925D73E0174A3E98E382A2952F409F91A7D9` |

Os ativos extraídos permaneceram em `D:\Tools\RETool\work\dd2-localization`, fora do jogo e do repositório. Nenhum PAK, dump ou contêiner foi commitado.

## Comandos e diagnóstico

Listagem base:

```text
REtool.exe -h DD2_STM_Release.list -l re_chunk_000.pak
```

- RETool leu 366.525 entradas da lista, descriptografou o TOC e gerou `re_chunk_000.txt` com 319.069 linhas.
- O processo devolveu exit code `1` apesar da listagem funcional. O mesmo comportamento ocorreu em todas as operações RETool bem-sucedidas desta sessão; por isso o sucesso foi verificado também pelas mensagens finais, contagens e arquivos produzidos.

Listagem DLC:

```text
REtool.exe -h DD2_STM_Release.list -l re_dlc_stm_2593290.pak
```

- TOC descriptografado; 114.257 linhas listadas; exit code `1` com saída funcional.

Amostra inicial de oito arquivos:

```text
REtool.exe -h sample-targets.list -x -skipUnknowns re_chunk_000.pak
```

- Oito de oito recursos extraídos; os IDs inferidos `qu020020` e `qu020040` confirmaram `Ordeals of a New Recruit` e `Nesting Troubles`.
- Duas inferências por ordem de tabela estavam erradas. Isso falsificou o uso da posição na página como método de mapeamento e motivou busca apenas por chave/literal.

Expansão seletiva após o sucesso da amostra:

```text
REtool.exe -h base-questlog-targets.list -x -skipUnknowns re_chunk_000.pak
REtool.exe -h dlc-questlog-targets.list -x -skipUnknowns re_dlc_stm_2593290.pak
```

- Base: 97/97 contêineres `natives/stm/message/questlog/*.msg.24`, 7 deflate e 90 zstd.
- DLC: 36/36 contêineres equivalentes, todos zstd.
- Não foram extraídos diálogos em massa, texturas, áudio, cenários nem o conteúdo integral dos PAKs.

## Parser de mensagens

Os `.msg.24` têm magic `GMSG` e pool criptografado; busca de strings soltas não produz evidência utilizável. Foi usado o parser-fonte [dtlnor/REMSG_Converter](https://github.com/dtlnor/REMSG_Converter), licença MIT, commit `4289554cd0bdd8eba8c61fa0addbcbe9726a7c0f` (24/08/2026). O caminho de leitura valida offsets, lista de idiomas, hash Murmur3 do nome da entrada e descriptografa o pool antes de exportar CSV.

Dependências instaladas num ambiente Python isolado, fora do repositório:

- `mmh3 5.2.0`, wheel SHA-256 `72D80005B7634A3A2220F81FBEB94775EBD12794623BB2E1451701EA732B4AA3`;
- `chardet 5.2.0`, wheel SHA-256 `E1CF59446890A00105FE7B7912492EA04B6E6F06D4B742B2C788469E34C82970`.

Comandos de leitura:

```text
python src/main.py -i <base questlog folder> -m csv -x 4
python src/main.py -i <DLC questlog folder> -m csv -x 4
```

Ambos encerraram com exit code `0`; 97 CSVs base e 36 CSVs DLC foram produzidos fora do repositório.

## Resultado de títulos

- 125 chaves `_log_title` únicas foram encontradas: 89 no conjunto base listado e 36 no PAK DLC.
- Os 59 títulos já presentes em `quest-name-mapping.csv` foram ligados inequivocamente a uma chave e a colunas `English`/`PortugueseBr`.
- 58 coincidiram literalmente com o mapeamento anterior.
- Uma divergência foi corrigida: o build usa `Mercy among Thieves`, enquanto o inventário registrava `Mercy Among Thieves`. O PT-BR permanece `Piedade entre Ladrões`.
- Os dois nomes DLC antes `NAO_CONFIRMADO` agora são: `Chilling Tidings` → **Notícias Congelantes** (`qu040010`) e `Lost Rites` → **Rituais Perdidos** (`Mes_CONTENTS_0014_log_title`).

A matriz [game-localization-evidence.csv](game-localization-evidence.csv) registra ID, chave, literais, PAK, caminho e SHA-256 de cada um dos 59 arquivos relevantes. O estado canônico passa a ser **59 `OFICIAL_COMPROVADO`** no mapeamento; não resta título canônico apenas `LOCALIZACAO_EXTRAIDA` ou `NAO_CONFIRMADO`.

Isto prova o literal e seu vínculo com o ID/chave no build instalado. Não prova que a quest foi ativada, que o título apareceu no diário em determinado save, nem qualquer requisito de gameplay.

## Evidência adicional material

- `qu020020_log` contém caminhos de sucesso e falha de Accardo, inclusive morte pelas harpias. **OBSERVED em dados do build:** a morte é um outcome previsto. **UNKNOWN:** prazo numérico e gatilho temporal exato.
- `qu020040_log` contém barris, veneno e dois objetivos distintos de retorno a Lennart; combinado com a rota transcrita, sustenta `barris → Lennart → veneno → Lennart`.

## Classificação e decisão

- **OBSERVED:** PAKs, manifests locais, caminhos, hashes, chaves e literais extraídos do build 25290080.
- **SUPPORTED:** vínculo dos 59 títulos canônicos com seus IDs de quest.
- **UNKNOWN:** apresentação em cada estado do diário, gatilhos, timers e consequências executadas em runtime.
- **REFUTED:** posição/ordem de uma tabela externa como método confiável para inferir quest ID.

**Próxima ação:** não repetir a extração dos 59 títulos. Os três P1 históricos foram corrigidos pela PR #20 e verificados no `main`; testes futuros devem concentrar-se nos gatilhos e efeitos de gameplay ainda desconhecidos.

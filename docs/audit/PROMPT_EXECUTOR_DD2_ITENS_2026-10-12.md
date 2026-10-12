# Coleta primária de itens e missões — instrução para executor com DD2 instalado

## Mandato
Coletar evidências **locais e autorizadas** da instalação de *Dragon's Dogma 2* e entregar relatório reproduzível. **Não modificar os arquivos do jogo, não publicar assets proprietários, não enviar PAKs inteiros, saves pessoais ou arquivos binários à branch.** Nenhuma atividade de extração deve contornar DRM, criptografia ou proteção de acesso. Quando recurso não for acessível sem isso, registrar impedimento e usar inspeção dentro do jogo.

## Coletar e validar
1. Registrar plataforma (Steam, etc.), versão/build do DD2, idioma PT-BR, DLC habilitada, data, método de inspeção e ferramentas usadas.
2. Confirmar a cena do prólogo: criatura que aparece na fuga das escavações; registrar o texto exato e uma captura **local privada** de evidência (não commitar imagens proprietárias).
3. Para **Spellbound / Magia Vertiginosa** e **The Sorcerer's Appraisal / O Julgamento do Feiticeiro**, transcrever os nomes PT-BR exatos de cada grimório, seus nomes EN, IDs/chaves de item quando legalmente acessíveis, textos de descrição no inventário, locais/rotas de obtenção e alternativas. Os cinco títulos de referência são `Fulminous Shield`, `Nation's Death Knell`, `Howling Blizzard`, `Towering Earth`, `Let There Be Light`.
4. Verificar **por item** a falsificação de Ibrahim: nome autêntico, nome falso, preço na build, prazo de retirada, se funciona para Trysha e Myrddin, e consequências da entrega. Não destruir originais nem arriscar o save principal.
5. Checar se são aceitos três títulos diferentes e se a obtenção de `Maelstrom` / `Meteoron` pode depender de afinidade e `Turquoise Ring`.
6. Para os 37 guias atuais, criar inventário independente de **todos os objetos necessários** para iniciar, avançar ou concluir cada missão, separando itens obrigatórios, opcionais, condicionais, consumidos, falsificáveis e recompensas. Identificar quantidade, NPC, obtenção, requisito de etapa, alternativas e consequências.
7. Conferir especificamente `Nesting Troubles` (barris e veneno), `Disa's Plot` (carta), `The Nameless Village` (evidência), `The Ornate Box`, `Vocation Frustration`, `The Caged Magistrate`, `Short-Sighted Ambition`, `Hunt for the Jadeite Orb`, `Put a Spring in Thy Step`, `The Sotted Sage`, `A New Godsway` e `Legacy`.

## Evidência e entregáveis
- Entregar `docs/audit/dd2-installed-item-evidence.csv` com colunas `quest_en,quest_ptbr,item_en,item_ptbr,item_id,item_key,quantity,obtained_at,required_stage,mandatory,consumed,forgery_possible,forged_en,forged_ptbr,forged_item_id,recipient,version,method,confidence,evidence_pointer,notes`.
- Entregar `docs/audit/dd2-installed-item-evidence-report.md` incluindo procedimentos reproduzíveis, linhas sem comprovação, divergências com `src/data/questItemRequirements.ts`, links públicos das fontes secundárias e metodologia.
- Para cada afirmação: `VERIFICADO_NA_BUILD`, `OBSERVADO_EM_SAVE`, `FONTE_SECUNDARIA` ou `NAO_VERIFICADO`. **Não classificar como verificado na build apenas por encontrar texto em websites, IDs citados por terceiros ou por receber um relato sem evidência.**
- Se a extração legal de texto e IDs de recursos disponíveis localmente for possível, registrar caminhos internos, chaves, idioma e hash SHA-256 do recurso; se não, deixar células vazias e usar screenshot/observação privada documentada.
- Nunca realizar testes destrutivos no save principal; preferir perfil de teste ou backup autorizado e reversível. Não usar automação para interagir com serviços online.
- O executor deve criar **PR em draft**, com diff e logs dos testes (`npm run lint`, `npm test`, `npm run build`, `npm run test:e2e`), sem merge. O Head revisará as evidências e decidirá quais alterações editoriais são justificadas.

## Escopo
A coleta de 37 fichas é uma **auditoria ampla**, não uma alegação de que já foi concluída pelo Head. Caso falte tempo para examinar tudo na sessão do executor, publicar evidências parciais com linhas explicitamente não verificadas e prioridades; não preencher lacunas com inferências.

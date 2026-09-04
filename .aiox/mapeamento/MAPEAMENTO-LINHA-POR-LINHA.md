# MAPEAMENTO LINHA POR LINHA

> **O que é este documento:** enquanto o `@analyst` (Atlas) lê a sessão inteira desde 13/08, linha por linha de verdade (não em cima dos resumos de compactação — esse foi o método usado no `MAPEAMENTO-COMPLETO-13-08-A-04-09.md`, e o Felipe pediu uma leitura mais rigorosa depois), cada achado que precisa de checagem contra o estado real dos documentos entra aqui, no formato: **ACHADO → VALIDAÇÃO → AGENTE RESPONSÁVEL**.
> **Por que existe separado do `MAPEAMENTO-COMPLETO`:** aquele documento é a narrativa completa da sessão. Este é só a lista de divergências encontradas — o que bate com o que já está registrado, e o que não bate.
> **Como usar:** cada achado é investigado (arquivo real conferido, não memória) antes de escrever a linha de VALIDAÇÃO. Se não bater, isso é uma divergência real e vai para o `AGENTE RESPONSÁVEL` resolver.
> **Status:** 🟡 em andamento — a leitura linha por linha ainda está em ~4% do `esqueleto-parte1` (linha 1317 de ~32.300). Mais achados serão adicionados aqui conforme a leitura avança.

---

## ACHADO 1

**O que foi encontrado:** em 13/08, às 13:40, o Felipe pediu explicitamente (via `*elicit` do @analyst) para registrar em `itens-em-aberto.md` o padrão de scripts do Modo Navegador que abrem aba nova mas só fecham (`page.close()`) no caminho feliz — em erro/timeout a aba fica aberta, o que já causou acúmulo real de 8 abas duplicadas numa sessão.

**VALIDAÇÃO:** ✅ **BATE.** Confirmado no `itens-em-aberto.md`, registrado no mesmo dia (13/08/2026) pelo `analyst`, com o texto refletindo fielmente o pedido do Felipe. Também foi corretamente triado depois no `PLANO-FINAL.md` (Bloco 1) como ⚪ **FORA DE ESCOPO** do Solucionador — é um assunto do pipeline Karzen, não do framework. Nenhuma divergência encontrada.

**AGENTE RESPONSÁVEL:** Nenhum — já resolvido corretamente, nada pendente.

---

## ACHADO 2

**O que foi encontrado:** hipótese levantada pelo `@analyst` (não confirmada na hora) de que o bug da "janela de 2200 caracteres" (13/08 — causou dado de catálogo errado nos SKUs `SPANK-R-127V`/`SPANK-R-220V`, quando múltiplos MLBs próximos vazavam dado um pro outro) seria a mesma causa raiz do **E92** (SKU `PAS23-BIV`, MLB `6667309696`, `statusCatalogo: null`, achado em 27-29/08 e registrado formalmente em 02/09).

**VALIDAÇÃO:** ❌ **NÃO BATE — divergência real.** O E92, conforme registrado em `itens-em-aberto.md`, tem sintoma diferente (valor `null`, não uma direção invertida de GANHANDO/PERDENDO). Não há evidência documentada confirmando nem descartando uma causa raiz em comum com o bug de 13/08. Pior: o próprio E92 nunca foi investigado de fato desde que foi achado — passou de 27-29/08 até 02/09 (quando foi formalmente registrado) sem ninguém confirmar a causa.

**AGENTE RESPONSÁVEL:** `@dev` — investigar o SKU `PAS23-BIV` especificamente, checando se a causa raiz é a mesma janela de captura de 2200 caracteres (13/08) ou se é um bug distinto.

---

## ACHADO 3

**Pedaço coberto:** linhas 1317-1736 do `esqueleto-parte1` — 13/08, 15:01 até 16:21.

**O que foi encontrado:** a regra definitiva **"cada MLB é analisado isoladamente — nunca herdar dado de um MLB 'Sincronizado com' outro"**, estabelecida pelo Felipe às 16:19 do dia 13/08, depois de várias correções do agente que tentava (errado) fazer um MLB "herdar" dado do outro quando apareciam sincronizados.

**Investigação:** conferido o arquivo real de processo `.aiox-core/development/tasks/mapeamento-skus-ads-catalogo-mercadolivre.md`, linha 57 — regra "correspondência cabeçalho→bloco" documentada com a data certa (13/08/2026) e citando pelo nome o mesmo incidente lido na conversa: *"foi exatamente isso que gerou o erro original da Sanduicheira Kian Panini"*.

**VALIDAÇÃO:** ✅ **BATE.** A regra estabelecida na conversa está documentada fielmente no processo real, mesma data, mesma causa raiz. Nenhuma divergência.

**AGENTE RESPONSÁVEL:** Nenhum — já documentado corretamente.

---

## ACHADO 4

**Pedaço coberto:** linhas 1736-2135 do `esqueleto-parte1` — 13/08, 16:21 até 18:10 (atravessa a 1ª compactação da sessão).

**O que foi encontrado:** dois achados técnicos ligados — (1) o bug do seletor `ancestor::div[...].first()` que pegava a linha errada do card, fazendo o script abrir o "Alterar" do MLB errado (13/08, 17:27); (2) a regra de validar o preço mostrado em "Concorrência no Mercado Livre" contra o preço na aba Anúncios, pra descobrir o status real (GANHANDO/PERDENDO) de um MLB sem badge explícito na listagem — caso real: SKU `WW2-220V`, MLB `#4653317905`.

**Investigação:** conferido `.aiox-core/development/tasks/mapeamento-skus-ads-catalogo-mercadolivre.md`. Linha 78 documenta o bug do `ancestor::` com a mesma explicação técnica (ordem de documento, `.first()` pegando o card inteiro em vez da linha). Linha 75 documenta a regra de casamento de preço citando o mesmo caso exato (SKU `WW2-220V`, MLB `#4653317905`, R$900/R$726,56).

**VALIDAÇÃO:** ✅ **BATE, com bônus.** Documentação fiel ao caso real, e o processo continuou evoluindo depois (correções de 17-18/08 e 24/08/2026 sobre o badge "PREÇO ALTO" não ser catálogo de verdade) — mostra que o documento de processo foi mantido vivo, não ficou estático.

**AGENTE RESPONSÁVEL:** Nenhum — documentação fiel e atualizada.

---

## ACHADO 5

**Pedaço coberto:** linhas 2135-2534 do `esqueleto-parte1` — 13/08, 18:10 até 20:09.

**O que foi encontrado:** às 20:05-20:06 do dia 13/08, o Felipe pediu pro @dev que, ao encontrar um SKU com 3+ MLBs de catálogo confirmados, **parasse o pipeline inteiro e avisasse** antes de continuar — tratando como cenário nunca validado.

**Investigação:** conferido `packages/karzen/.aiox-runtime/pipeline-pausados-campanha-completo.js`, linhas 1134-1146. O código documenta a história completa em comentário: a trava original (13/08) parava tudo (`process.exit(1)`); em 16/08, o Felipe validou ao vivo um caso real (SKU `CHTMINI-BIV`, 2 Clássico + 1 Premium) confirmando que os 3 status batiam certinho — não era bug, era cenário válido — e a trava foi rebaixada de parada total pra aviso informativo, sem bloquear o resto do processamento.

**VALIDAÇÃO:** ✅ **BATE, com evolução saudável.** Pedido implementado exatamente como pedido em 13/08, e corrigido depois com base em validação real do próprio Felipe (16/08) — o processo funcionou como deveria: pedido → implementado → testado contra a realidade → ajustado.

**AGENTE RESPONSÁVEL:** Nenhum — histórico correto e completo, documentado no próprio código.

---

## ACHADO 6

**Pedaço coberto:** linhas 2534-2932 do `esqueleto-parte1` — 13/08, 20:10 até 14/08, 13:02.

**O que foi encontrado:** bug real de regex (14/08, 12:25) — o extrator de status usava `/i` (case-insensitive), fazendo a frase comum "Você está **ganhando** com outra opção de venda" (minúscula, não é badge oficial) ser lida como o badge GANHANDO de verdade. Corrigido no código, com pedido explícito do Felipe pra refazer os 3 SKUs (`MCT-25MM-BIV`, `MCT-19MM-BIV`, `MCT-32MM-BIV`) do zero após a correção.

**Investigação:** conferido `packages/karzen/.aiox-runtime/pipeline-pausados-campanha-completo.js`, as 3 ocorrências do regex de status (linhas 384, 413, 714): `/\b(GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO PARA GANHAR)\b/` — sem a flag `/i`, só maiúsculas.

**VALIDAÇÃO:** ✅ **BATE.** O conserto persiste até hoje no código — case-sensitive, frases comuns em minúscula não são mais confundidas com o badge oficial.

**AGENTE RESPONSÁVEL:** Nenhum — corrigido e mantido corretamente.

---

## ACHADO 7

**Pedaço coberto:** linhas 2932-3331 do `esqueleto-parte1` — 14/08, 13:21 até 14:55.

**O que foi encontrado:** às 14:08 do dia 14/08, o Felipe reclamou duramente de correções pontuais de timing: *"Cara eu já te disse aguarda á pagina carregar por inteira, no processo todo (não em partes específicas do process)! Quantas vezes vou precisar repetir isso para você?"* — isso gerou uma auditoria completa do arquivo (não só os pontos com bug já visto) e commit `94be7db` aplicando espera de carregamento real em todo o pipeline.

**Investigação:** já conferido na investigação do Achado 1 — `mapeamento-skus-ads-catalogo-mercadolivre.md`, linha 9: **"REGRA GERAL OBRIGATÓRIA (14/08/2026, reforçada 14/08/2026 — aplicar no PROCESSO INTEIRO, nunca em pontos isolados)"** — mesma data, mesma dinâmica (correção pontual → reclamação → regra geral reforçada no mesmo dia).

**VALIDAÇÃO:** ✅ **BATE.** A regra nasceu exatamente como a conversa mostra — reclamação direta do Felipe gerou uma regra geral permanente, não um remendo, documentada com a data certa e a ressalva "reforçada" no mesmo dia.

**AGENTE RESPONSÁVEL:** Nenhum — documentado corretamente.

---

*Documento vivo — novos achados são adicionados aqui conforme a leitura linha por linha (`esqueleto-parte1-89427cf3.md` + `esqueleto-parte2-a5d3b08c.md`) avança. Gerado em 04/09/2026 por @analyst (Atlas), persistido por @aiox-master (Orion).*

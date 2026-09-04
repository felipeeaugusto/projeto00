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

*Documento vivo — novos achados são adicionados aqui conforme a leitura linha por linha (`esqueleto-parte1-89427cf3.md` + `esqueleto-parte2-a5d3b08c.md`) avança. Gerado em 04/09/2026 por @analyst (Atlas), persistido por @aiox-master (Orion).*

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

## ACHADO 8

**Pedaço coberto:** linhas 3331-3730 do `esqueleto-parte1` — 14/08, 14:55 até 16:25.

**O que foi encontrado:** o conceito "ID Family" (agrupamento colapsado do Mercado Livre, número de 16 dígitos sem SKU visível) nasceu nesse trecho — 14/08, 15:17-16:21, caso real: SKU `PROSB-3000`, 2 grupos, 6 MLBs escondidos, exigindo expandir a setinha antes de extrair. 2 problemas novos ficaram em aberto ao final (preço não batendo pra `#5267746592`; "não achou Alterar" pra 2 MLBs).

**Investigação:** já conferido na investigação do Achado 1 — `mapeamento-skus-ads-catalogo-mercadolivre.md`, linha 47: *"Caso real validado: SKU `PROSB-3000`, 2 grupos 'ID Family', 6 MLBs reais escondidos dentro deles."* Mesma data, mesmo SKU, mesmo número de grupos e MLBs. Linhas 49-51 do mesmo arquivo também registram as 2 questões em aberto como "ainda sem solução confirmada, não tratar como resolvidas".

**VALIDAÇÃO:** ✅ **BATE.** Documentado fielmente, incluindo a ressalva honesta sobre as 2 pendências reais que a conversa também mostrou — nada escondido.

**AGENTE RESPONSÁVEL:** Nenhum — documentado corretamente, pendências reais preservadas como pendências (não fingidas como resolvidas).

---

## ACHADO 9

**Pedaço coberto:** linhas 3730-4130 do `esqueleto-parte1` — 14/08, 16:25 até 17:31 (atravessa a 2ª compactação da sessão).

**O que foi encontrado:** bug de desalinhamento de índice dos botões "Ações secundárias" — cada cabeçalho de grupo "ID Family" também tem seu próprio botão, deslocando o índice de todos os MLBs depois do 1º grupo. Corrigido via função `construirOrdemBotoes()` (commit `1275b11`), verificada contra o SKU `PROSB-3000` (6/6 MLBs corretos) e reconfirmada sem quebrar `MCT-32MM-BIV` (4/4 batendo com o gabarito).

**Investigação:** conferido `packages/karzen/.aiox-runtime/pipeline-pausados-campanha-completo.js` — a função `construirOrdemBotoes` existe hoje, linha 560 (definição) e linha 579 (uso real: `const ordemMlbsGlobal = construirOrdemBotoes(linhas, cards);`).

**VALIDAÇÃO:** ✅ **BATE.** A correção persiste no código real, exatamente como descrita na conversa.

**AGENTE RESPONSÁVEL:** Nenhum — corrigido e mantido.

---

## ACHADO 10

**Pedaço coberto:** linhas 4130-4529 do `esqueleto-parte1` — 14/08, 17:32 até 19:28.

**O que foi encontrado:** às 19:26 do dia 14/08, o Felipe pegou um erro real ao vivo — o MLB `6714259004` (Premium) foi classificado GANHANDO quando deveria ser PERDENDO. Causa: o código casava o preço da "Opção" em Concorrência só pelo valor numérico, sem confirmar que a condição (Clássico/Premium) também batia.

**Investigação:** conferido `packages/karzen/.aiox-runtime/pipeline-pausados-campanha-completo.js`, linhas 857-886. O código hoje exige que a condição também bata (`!o.condicaoDaOpcao || o.condicaoDaOpcao === mlbs[mlb].condicao`) — correção mais robusta que a causa raiz original, com comentário citando 2 casos reais adicionais que motivaram o reforço (`JBLQ-360`, `PCX26000`, de sessão posterior). Autocheck novo: avisa se mais de 1 opção tem o mesmo preço e status real.

**VALIDAÇÃO:** ✅ **BATE, com evolução real.** O bug específico foi corrigido e a correção foi generalizada (preço + condição, não só preço) depois de mais casos reais aparecerem.

**AGENTE RESPONSÁVEL:** Nenhum — corrigido e reforçado corretamente, histórico rastreável no próprio código.

---

## ACHADO 11

**Pedaço coberto:** linhas 4529-4928 do `esqueleto-parte1` — 14/08, 19:29 até 22:02 (continuação/aprofundamento do mesmo bug do Achado 10).

**O que foi encontrado:** item 1 do checklist do @analyst (14/08, 21:25) — excluir "Outras opções de venda" / "Clássico e Frete grátis" / "Premium e Frete grátis" da elegibilidade de casamento de preço, porque essas frases não são status real mas podiam ser confundidas com uma opção válida.

**Investigação:** conferido `pipeline-pausados-campanha-completo.js`, linha 339 — `FRASES_NAO_STATUS` inclui `/^(Clássico|Premium)\s+e\s+(?:Frete\s+grátis|Envio por conta do comprador)$/i`. Linha 330, comentário cita o mesmo caso real que causou o bug.

**VALIDAÇÃO:** ✅ **BATE.** A correção evoluiu ainda mais depois (comentário cita 16/08/2026, lista ampliada com mais frases) — mecanismo mantido e ampliado com o tempo, não um remendo único.

**AGENTE RESPONSÁVEL:** Nenhum — corrigido e mantido, mesma saga do Achado 10.

---

## ACHADO 12

**Pedaço coberto:** linhas 4928-5327 do `esqueleto-parte1` — 14/08, 22:03 até 23:28.

**O que foi encontrado:** durante a varredura real da campanha "[ML] [BAIXA PERFORMANCE]" (14/08, 22:37-23:22), 2 produtos diferentes (Aspirador, Mixer) retornaram o mesmo SKU errado `MCT-25MM-BIV` — a busca reversa por MLB não confirmava que o resultado correspondia ao MLB buscado (busca "travada" no resultado anterior). O Felipe mandou parar e investigar, sem contornar sozinho.

**Investigação:** conferido `pipeline-pausados-campanha-completo.js`. Comentário linha 263-264: *"SKU errado silenciosamente. Correção: `validarBuscaSkuCarregada` agora exige que o MLB buscado apareça no texto"*. Função `acharSkuDoMlb` (linha 293-298) tem retry: refaz a busca do zero uma vez se o MLB não aparecer no resultado. Mesma proteção replicada pra busca por SKU (linha 495-496).

**VALIDAÇÃO:** ✅ **BATE, com reforço.** Correção generalizada pros 2 caminhos de busca (MLB e SKU), com retry automático e comentário explicando a causa raiz exata.

**AGENTE RESPONSÁVEL:** Nenhum — corrigido e reforçado corretamente.

**Adendo (linhas 5327-5726, 14/08 23:29 até 15/08 00:44):** confirmação em produção — o reprocessamento real da campanha "[ML] [BAIXA PERFORMANCE]" rodou com a correção aplicada. O produto que antes dava o SKU errado (Mixer Philco → `MCT-25MM-BIV`) agora veio como "SKU não encontrado (não verificável)" — a correção prefere não capturar nada a capturar errado. Nenhum achado novo, só prova de que o Achado 12 funciona de verdade fora do ambiente de teste.

**Adendo 2 (linhas 7292-7690, 16/08 15:09 até 17:00):** investigação longa e dolorosa do bug do MLB `5247646674` (CHTMINI-BIV) — 3 hipóteses erradas em sequência (delimitação de bloco, "irmão sincronizado" vazando dado, correção "forçar via Alterar") até a causa real aparecer: a busca por SKU não estava realmente filtrando — o `Enter` no campo de busca às vezes não disparava a navegação de verdade, deixando a página no inventário inteiro ("3.016 anúncios") em vez do resultado filtrado. Confirmado com 3 screenshots reais do Felipe. Mesma família de causa raiz do Achado 12 — a correção real (reforçar `validarBuscaSkuCarregada` + retry) é a mesma já documentada, não uma nova.

---

## ACHADO 13

**Pedaço coberto:** linhas 5726-6125 do `esqueleto-parte1` — 15/08, 00:48 até 16/08, 12:11 (inclui um "momento de pausa" real de ~11h).

**O que foi encontrado:** às 11:57 do dia 16/08, o Felipe confrontou diretamente o padrão de reportar conclusões (SKU errado, "?" não classificado, "4 catálogos") **antes** de checar o dado real, só corrigindo depois de questionado. O agente reconheceu o erro e escreveu memória nova nesse exato momento.

**Investigação:** conferido o arquivo de memória `feedback_verificar_antes_de_reportar.md` (sistema de memória entre sessões). Bate exatamente: mesma data de origem (16/08/2026), mesmos 3 exemplos concretos citados na conversa, e a mesma citação verbatim do Felipe: *"por que, você não faz isso da primeira vez? Fica me mandando dado irreal ou errado!"*

**VALIDAÇÃO:** ✅ **BATE, e virou princípio duradouro.** O arquivo mostra 4 recaídas documentadas depois (17/08, 22/08, 23/08), cada uma reforçando a regra com uma variante nova — a memória foi mantida viva e aprofundada, não ficou estática.

**AGENTE RESPONSÁVEL:** Nenhum — memória criada corretamente na origem e reforçada a cada recaída real.

---

## ACHADO 14

**Pedaço coberto:** linhas 6125-6524 do `esqueleto-parte1` — 16/08, 12:11 até 13:15.

**O que foi encontrado:** o bug do `CHTMINI-BIV`/MLB `5247671694` (16/08, 12:27-12:29) — a função `extrairOpcaoUnicaSemRotulo` só reconhecia o status **depois** do preço, mas o texto real tinha "PERDENDO" **antes** da condição. Corrigido com a mesma lógica de "status antes" que `extrairOpcoesConcorrencia` já usava.

**Investigação:** conferido `pipeline-pausados-campanha-completo.js`, função `extrairOpcaoUnicaSemRotulo` (linha 372-391). Linhas 383-385: `antesTexto` extrai o texto antes do match e verifica status via `statusAntesMatch` — exatamente a correção descrita. A mesma função recebeu outra correção depois (17/08, valor "Médio" no nível de visitas).

**VALIDAÇÃO:** ✅ **BATE.** Correção presente e mantida, com evolução posterior real.

**AGENTE RESPONSÁVEL:** Nenhum — corrigido e mantido corretamente.

---

## ACHADO 15

**Pedaço coberto:** linhas 6524-6893 do `esqueleto-parte1` — 16/08, 13:15 até 14:35 (até a 3ª compactação da sessão).

**O que foi encontrado:** o "modo cauteloso" (pipeline para a execução inteira em qualquer anomalia quando rodado com nome de campanha específico) e a regra de gerenciamento de abas (deixar só 3 abas ao final: Anúncios, campanha filtrada, publicidade), pedida pelo Felipe em 14/08.

**Investigação:** conferido `pipeline-pausados-campanha-completo.js`, linhas 1199-1215. Comentário: *"Gerenciamento de abas pedido pelo Felipe (14/08/2026): ao final do modo cauteloso, deixar SOMENTE 3 abas abertas"* — mesma data, mesma regra exata.

**VALIDAÇÃO:** ✅ **BATE.**

**Achado colateral (relevante pro ponto do Felipe sobre "os documentos divergem"):** nesse mesmo trecho (16/08, 13:20), o agente não tinha nenhum registro da conversa sobre as colunas da página "Teste 1" — nem no caderno, nem na memória entre sessões — e só recuperou a informação buscando diretamente no `.jsonl` bruto da própria sessão. É literalmente a mesma técnica usada nesta investigação inteira, aplicada ali pontualmente uma vez.

**AGENTE RESPONSÁVEL:** Nenhum — corrigido/documentado corretamente.

---

## ACHADO 16

**Pedaço coberto:** linhas 6893-7292 do `esqueleto-parte1` — 16/08, 14:35 até 15:09.

**O que foi encontrado:** o "modo cauteloso" funcionou como projetado — parou sozinho ao ver 3 MLBs de catálogo confirmados no SKU `CHTMINI-BIV` (cenário nunca visto). Investigação (Atlas via `*elicit`) achou a causa raiz: card com só 1 MLB sem um 2º marcador de preço pra fechar o bloco corria sem limite até o fim da região, capturando dado do produto vizinho — MLB `#5247646674` pegou "GANHANDO" de outro produto em vez do próprio "RESTRITO PARA GANHAR".

**Investigação:** conferido `pipeline-pausados-campanha-completo.js`, linhas 634-658. Comentário cita exatamente o mesmo caso: *"Correção real (16/08/2026, achado pelo Atlas via `*elicit`)... Caso real confirmado: MLB #5247646674 (SKU CHTMINI-BIV...)"*. A correção usa "Selecionar anúncio\n{título}\n{título repetido}" como limite adicional, sem usar `#numero` como marcador (respeitando a regra de 13/08).

**VALIDAÇÃO:** ✅ **BATE.** Correção presente, citando o caso exato, respeitando a regra anterior.

**AGENTE RESPONSÁVEL:** Nenhum — corrigido corretamente.

---

*Documento vivo — novos achados são adicionados aqui conforme a leitura linha por linha (`esqueleto-parte1-89427cf3.md` + `esqueleto-parte2-a5d3b08c.md`) avança. Gerado em 04/09/2026 por @analyst (Atlas), persistido por @aiox-master (Orion).*

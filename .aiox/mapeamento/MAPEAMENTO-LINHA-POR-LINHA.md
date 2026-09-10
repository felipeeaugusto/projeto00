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

**Adendo (linhas 10081-10480, 17/08 12:43 até 15:12):** a recaída de 17/08 que a memória já citava por cima ("Recaída confirmada (17/08/2026)... MLB #5069271006 (SKU MCT-25MM-BIV) estava salvo como 'Inativa'/Pausado/'sem estoque'... o Felipe insistiu ('CONFIRMA!!!!')") bate palavra por palavra com o texto real da conversa: às 15:10, Felipe escreveu "Confirma!!!! VOCÊ VAI VER QUE ESSA PORCARIA NÃO ACABOU ESTOQUE! Nossa que ódio, algo que estava certo, fica errado". Confirmação mais forte da mesma origem já registrada.

---

## ACHADO 14

**Pedaço coberto:** linhas 6125-6524 do `esqueleto-parte1` — 16/08, 12:11 até 13:15.

**O que foi encontrado:** o bug do `CHTMINI-BIV`/MLB `5247671694` (16/08, 12:27-12:29) — a função `extrairOpcaoUnicaSemRotulo` só reconhecia o status **depois** do preço, mas o texto real tinha "PERDENDO" **antes** da condição. Corrigido com a mesma lógica de "status antes" que `extrairOpcoesConcorrencia` já usava.

**Investigação:** conferido `pipeline-pausados-campanha-completo.js`, função `extrairOpcaoUnicaSemRotulo` (linha 372-391). Linhas 383-385: `antesTexto` extrai o texto antes do match e verifica status via `statusAntesMatch` — exatamente a correção descrita. A mesma função recebeu outra correção depois (17/08, valor "Médio" no nível de visitas).

**VALIDAÇÃO:** ✅ **BATE.** Correção presente e mantida, com evolução posterior real.

**AGENTE RESPONSÁVEL:** Nenhum — corrigido e mantido corretamente.

**Adendo (linhas 11599-11682, 17/08 18:42 até 18:54):** o "3º valor" citado acima — a função `extrairOpcaoUnicaSemRotulo` só reconhecia "Nível de visitas: Mínimo/Máximo"; o MLB investigado (PAF15B-220V / `#6722040752`) tinha o valor real "Médio", nunca visto até então, e a regex inteira falhava em casar, caindo num fallback destrutivo de clicar-pra-expandir que destruía o texto de comparação já capturado corretamente. Corrigido na mesma sessão, junto com `abrirAlterarPorMlb` (aba nova, fechamento garantido em `finally`) e a regra Pausado→Inativo aplicada nos 2 caminhos de extração. Confere com `pipeline-pausados-campanha-completo.js`, linhas 374-380 (comentário + regex real aceitando `Mínimo|Médio|Máximo`) e com o commit `23ef65d` (17/08/2026 15:54, autor Felipe Augusto): *"fix: corrige acesso via Alterar em nova aba, badge Nivel=Medio e Pausado->Inativo"* — mesmo bug, mesma data, mesma correção. BATE, com prova em 2 fontes independentes (código real + mensagem do commit).

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

## ACHADO 17 — a origem da BLOCO 0-AA

**Pedaço coberto:** linhas 7690-8087 do `esqueleto-parte1` — 16/08, 17:00 até 18:28.

**O que foi encontrado:** o bug inteiro do CHTMINI-BIV nunca foi sobre "Sincronizado" — foi porque um script de diagnóstico usava um campo de busca genérico errado (existem 2 campos na tela: o "Central de vendedores" no topo, que só abre balãozinho de sugestão, e o campo real "Buscar por título, código ou SKU" dentro da página). O `@dev` reverteu toda a correção "Sincronizado" (código morto) e reforçou 3 documentos + criou 2 BLOCOs novas no `CLAUDE.md`.

**Investigação:** essa regra já estava carregada no próprio contexto do agente que fez esta leitura (é a **BLOCO 0-AA** do `CLAUDE.md`, seguida ativamente durante toda esta sessão de investigação): *"O erro que gerou esta regra (16/08/2026): ... o @dev escreveu vários scripts de diagnóstico ad-hoc, reimplementando a lógica de busca do zero em vez de importar `SELETOR_BUSCA` do próprio pipeline ... usou um seletor genérico que bateu no campo de busca ERRADO..."* — mesmo incidente, mesma data, mesma causa.

**VALIDAÇÃO:** ✅ **BATE, de forma exemplar.** Não é só um bug corrigido no código — virou regra permanente do framework inteiro (BLOCO 0-AA), aplicada a todos os agentes desde então. É o caso mais forte encontrado nesta investigação de "conversa → documento real" funcionando perfeitamente.

**AGENTE RESPONSÁVEL:** Nenhum — já é regra ativa, seguida corretamente.

**Adendo (linhas 8087-8486, 16/08 18:28 até 19:03):** criação do hook técnico `check-selector-reuse.js` que reforça a BLOCO 0-AA. 3 rodadas de reforço reais: v1 (bloqueia seletor por atributo genérico) → Atlas achou buraco (não pega seletor por classe CSS) → v2 (cobre classe) → Atlas achou outro buraco (`getByPlaceholder()` não é pego) → v3 (mudança estrutural: de "detectar padrão ruim" pra "detectar ausência de reuso"). Confere com o rodapé real da BLOCO 0-AA hoje: *"Reforçada por hook técnico (16/08/2026, v3)... v1 e v2 detectavam padrões de seletor ruim específicos... v3 inverteu a lógica pra detectar AUSÊNCIA de reuso"*. BATE.

---

## ACHADO 18

**Pedaço coberto:** linhas 8486-8884 do `esqueleto-parte1` — 16/08, 19:03 até 17/08, 02:28 (inclui um "momento de pausa" longo).

**O que foi encontrado:** nessa madrugada (17/08, ~02:04-02:22), o Felipe reportou 2 MLBs de catálogo que não entraram na planilha (`4935613452`, `4935565074`, SKU `PROSB-3000`). Erro 1 (múltiplos MLBs de catálogo na mesma condição descartados) corrigido na hora. Erro 2 — o badge "PREÇO ALTO" sem "COMPETINDO" também sendo catálogo de verdade — ficou pendente pro `@analyst` investigar.

**Investigação:** já conferido durante a investigação do Achado 1 — `mapeamento-skus-ads-catalogo-mercadolivre.md` tem uma seção "CORREÇÃO CRÍTICA (24/08/2026) — 'PREÇO ALTO'/'PREÇO COMPETITIVO' NÃO são catálogo, ao contrário do que a correção de 16-18/08/2026 acima estabeleceu" — a conclusão que nasceu aqui (17/08) foi usada por 8 dias, até ser corrigida formalmente em 24/08, depois de mais casos reais.

**VALIDAÇÃO:** ✅ **BATE — o melhor exemplo encontrado até agora de "os documentos não divergem escondido, eles se corrigem com rastro".** A regra errada não ficou perdida — foi usada, gerou mais dado, e foi corrigida formalmente 8 dias depois, com o motivo documentado.

**AGENTE RESPONSÁVEL:** Nenhum — já corrigido e documentado.

---

## ACHADO 19

**Pedaço coberto:** linhas 9682-10081 do `esqueleto-parte1` — 17/08, 09:03 até 12:43.

**O que foi encontrado:** às 12:35 do dia 17/08, o Felipe corrigiu duramente um mal-entendido — a coluna "Status Catálogo" não deveria mostrar o texto literal do badge (GANHANDO/PERDENDO/PREÇO ALTO), deveria mostrar Ativo/Inativo baseado no status real do produto (Pausado = Inativo).

**Investigação:** esse padrão exato (`statusProduto === 'Pausado' ? 'Inativo' : ...`) já tinha aparecido 3 vezes nas linhas do pipeline conferidas anteriormente (linhas 781, 818, 885 do `pipeline-pausados-campanha-completo.js`), sem a origem ter sido conectada até este ponto da leitura.

**VALIDAÇÃO:** ✅ **BATE.** A correção de 17/08 não ficou isolada — virou regra aplicada sistematicamente em todo o pipeline, não só no ponto onde a reclamação aconteceu.

**AGENTE RESPONSÁVEL:** Nenhum — regra aplicada corretamente e de forma consistente.

---

## ACHADO 20 — o bug real de "Alterar navega na mesma aba"

**Pedaço coberto:** linhas 10480-11279 do `esqueleto-parte1` — 17/08, 15:12 até 17:13.

**O que foi encontrado:** dois problemas emendados no mesmo trecho — (1) 15:53-16:36: Felipe pegou 2 erros reais ao vivo (`DG-01-127V` depósito errado; `PAF11B-220V` GANHANDO quando era COMPARTILHANDO) — causa: o pipeline só cruzava com "Alterar" quando a listagem não achava status nenhum. Atlas (`*elicit`) recomendou 3 correções. (2) 16:46: Felipe perguntou diretamente se o Dex estava seguindo a regra de "abrir Alterar em aba nova, fechar depois" (regra desde 14/08, ver Achado 15). Dex confessou que não — o código navegava na mesma aba, achando (suposição nunca confirmada) que não dava pra abrir em nova aba. Felipe mandou parar tudo e chamar o `@analyst`. Atlas investigou ao vivo e descobriu que a suposição estava errada: "Alterar" é um `<a href>` real, Ctrl+Click abriu aba nova de verdade, e navegar direto pela URL construída era ainda melhor.

**Investigação:** conferido `pipeline-pausados-campanha-completo.js`. Linhas 217-225: comentário documenta a história completa — *"a versao anterior desta funcao (abrirAlterarPorIndice, removida) clicava no menu... `<a href="https://www.mercadolivre.com.br/syi/core/modify?itemId=MLB{numero}">`"*. Função nova `abrirAlterarPorMlb` (linha 239) usa a URL direta, aba separada, sempre fechada depois (linha 894). Linha 751: `mlbsSemStatus = todosMlbs.filter(mlb => mlbs[mlb])` — todo MLB passa pelo Alterar agora (item 1 do passo a passo). Linhas 781/833: `statusCatalogo = null` em erro no Alterar (item 2). Linha 885: `statusProduto === 'Pausado' ? 'Inativo' : opcaoBatida.status` — item 3, estendendo a regra do Achado 19 pro trecho que faltava. Teste isolado real (17:09) confirmou 13 abas antes → 13 depois (sem vazamento), regressão do Taiff 6-7x mais rápida.

**VALIDAÇÃO:** ✅ **BATE, nos 4 pontos.** As 3 correções do passo a passo do Atlas E a troca do mecanismo de abertura (aba nova via URL direta) persistem no código real, com o histórico completo documentado em comentário — incluindo o motivo técnico da suposição antiga estar errada.

**AGENTE RESPONSÁVEL:** Nenhum — corrigido e mantido corretamente.

---

## ACHADO 21 — 3 correções emendadas na regressão pós-Achado 20

**Pedaço coberto:** linhas 11279-11560 do `esqueleto-parte1` — 17/08, 17:13 até 18:33 (até a 5ª compactação da sessão).

**O que foi encontrado:** três episódios na mesma regressão do mecanismo novo (Achado 20): (1) 17:13-17:42 — `MCT-25MM-BIV` apareceu de novo como Inativo; desta vez o agente cruzou com 2 métodos independentes antes de aceitar — confirmado mudança real (estoque esgotou de fato). Prova viva da lição do Achado 13 sendo aplicada corretamente. (2) 18:06-18:14 — regressão completa (18 SKUs, 17,7min vs 2h+ antes) achou 2 bugs reais de extração: `extrairBadgeConcorrenciaColapsada` pegava a frase introdutória genérica em vez do badge de verdade (corrigido exigindo texto todo em caixa alta); e o regex de "Opção sem rótulo" só reconhecia "e Frete grátis", faltando a variação "e Envio por conta do comprador" (causava perda de dado real). (3) 18:14-18:28 — instabilidade real detectada no MLB `PAF15B-220V` (5 leituras seguidas, 3 respostas diferentes) — concluído corretamente como concorrência genuinamente instável em tempo real, não bug.

**Investigação:** conferido `pipeline-pausados-campanha-completo.js`. Linha 339: `FRASES_NAO_STATUS` inclui `/^(Clássico|Premium)\s+e\s+(?:Frete\s+grátis|Envio por conta do comprador)$/i`. Linhas 367-369: comentário documenta a causa exata — *"tambem usa 'e Envio por conta do comprador' pro mesmo formato... nunca batia"*. Linha 460: `if (!/^[A-ZÀ-Ú\s]+$/.test(badge))` rejeita frase genérica não-caixa-alta.

**VALIDAÇÃO:** ✅ **BATE, nos 2 bugs técnicos.** As 2 correções de extração persistem no código real, com comentários citando a causa exata. Os episódios 1 e 3 não geram divergência de código — são exemplos de disciplina de verificação funcionando bem.

**AGENTE RESPONSÁVEL:** Nenhum — corrigido e mantido corretamente.

---

## ACHADO 22

**Pedaço coberto:** linhas 11909-12408 do `esqueleto-parte1` — 17/08, 18:47 até 22:23 (continuação direta da mesma sessão do bug "Médio", passo a passo pro @dev, verificação de 1 MLB, limpeza de página, e processamento da 1ª nova campanha).

**O que foi encontrado:** 3 eventos verificáveis na sequência: (1) Felipe passou um passo a passo consolidado pro @dev — trocar `abrirAlterarPorIndice` por `abrirAlterarPorMlb` (URL direta, aba nova, fecha antes de retornar) e sempre visitar o Alterar pra todo MLB, não só os sem status; (2) verificação ao vivo do MLB `6679980126` (PAF11B-220V) — único `statusCatalogo` que mudou na regressão do dia — confirmado **PERDENDO** estável em 2 leituras, commit `cbe5671`; (3) 1ª campanha nova processada (`[ML] [AVA] [PERFORMANCE]`, 30 produtos) — achado um duplicado real no meio do processo (JBL Boombox aparecia 2x com títulos diferentes, o Mercado Livre trocou o título entre a varredura antiga e a de hoje) — limpo e reprocessado.

**Investigação:** `git show cbe5671` bate palavra por palavra com a conversa: *"docs: registra verificacao ao vivo confirmada do MLB PAF11B-220V/6679980126 ... confirmado PERDENDO estavel em 2 leituras"*. `pausados-campanha-resultado.json` tem a chave `[ML] [AVA] [PERFORMANCE]` com exatamente 30 produtos, e só 1 entrada de "JBL Boombox" (não 2) — confirma que a deduplicação foi aplicada de verdade, não só narrada.

**VALIDAÇÃO:** ✅ **BATE**, com prova em 2 fontes independentes (commit + estado real do JSON).

**Item à parte, não verificável por arquivo do repositório:** a remoção dos 6 SKUs avulsos da página "Teste 1" e o deslocamento da campanha pra cima (linhas 12150-12188) é uma operação no Google Sheets do Felipe (planilha externa) — não tem como confirmar contra um arquivo do repo. O backup citado (`Pausados em Campanha - Karzen - BACKUP-antes-remover-avulsos-20260817-163448.xlsx`) fica em `C:\Downloads`, fora do controle de versão — mesma limitação já registrada em pedaços anteriores para operações de planilha.

**AGENTE RESPONSÁVEL:** Nenhum — tudo verificado corresponde ao que foi feito.

---

## ACHADO 23

**Pedaço coberto:** linhas 12408-12857 do `esqueleto-parte1` — 17/08, 22:27 até 18/08, 00:19 (fechamento da campanha AVA PERFORMANCE, 2 bugs reais pegos por Felipe na validação manual, e definição do passo a passo dev→devops).

**O que foi encontrado:** Felipe pegou 2 erros reais na validação manual da nova página "ML AVA PERFORMANCE": (1) **WAF-127V** (MLB `4690623743`) entrou como catálogo sem ser — é MLB "pai", sem seção de Concorrência de verdade; (2) **BAS1295P-127V** (MLB `6739045854`) tinha badge "PREÇO ALTO" mantido como categoria própria, quando na verdade — confirmado ao vivo (R$134 concorrente vs R$190,83 nosso) — é **PERDENDO disfarçado**. Também um 3º bug técnico achado durante o processamento: o drawer de variações de 2 produtos veio com 0 MLBs porque o título curto do produto ("Smart Tv 32 Philco... P32crb") não trunca na tabela, e o `lastIndexOf` pegava a última linha em vez do cabeçalho do drawer.

**Investigação:** `git show 73665e8` ("fix: corrige ancoragem do drawer de variacoes e normaliza PRECO ALTO->PERDENDO") bate palavra por palavra — mesmo caso (P32crb, 0 MLBs), mesmo MLB (`6739045854`/BAS1295P-127V), mesmos preços (R$134 vs R$190,83), e cita explicitamente "WAF-127V MLB fantasma removido, BAS1295P-127V normalizado". `git show 0cc6f88` ("feat: adiciona dupla-leitura obrigatoria pro caminho formatoColapsado") bate com o item 3 do passo a passo pro @dev — 100% de correlação (2 de 2 erros reais vieram do mesmo caminho `formatoColapsado`).

**VALIDAÇÃO:** ✅ **BATE, nos 3 pontos**, com prova em 2 commits reais que citam os mesmos casos, MLBs e valores da conversa.

**Nota de evolução honesta (não é divergência):** a normalização "PREÇO ALTO → PERDENDO" e a dupla-leitura, construídas nesta noite (17/08), foram superadas 7 dias depois: a correção de 24/08 (já vista no Achado 18) tira do caminho `formatoColapsado` a autoridade de decidir catálogo sozinho — hoje ele só gera pendência pro Felipe decidir, nunca decide automático. Mesmo padrão "os documentos não divergem escondido, se corrigem com rastro" já visto antes — o que aconteceu em 17/08 está certo e bate; só não é mais como o código funciona hoje.

**AGENTE RESPONSÁVEL:** Nenhum — tudo corrigido, documentado, e a evolução posterior também está rastreável.

---

## ACHADO 24

**Pedaço coberto:** linhas 12857-13306 do `esqueleto-parte1` — 18/08, 00:19 até 01:08 (push final, dupla auditoria independente das 2 campanhas já processadas, e início da 3ª campanha `[ML] [CONTROLE ACOS]`).

**O que foi encontrado:** (1) Push de 69 commits (`73665e8` + `0cc6f88` inclusos), com verificação byte-a-byte de que `HEAD` local e `origin/master` ficaram idênticos; (2) auditoria dupla e independente — @dev conferiu JSON×Planilha célula a célula (achou 2 falsos positivos do próprio script, corrigidos na hora) e @analyst repetiu com script próprio, matching por SKU — ambos confirmaram **AVA PERFORMANCE** (30 produtos, 38 SKUs, 140 MLBs) e **BAIXA PERFORMANCE** (13 produtos, 18 SKUs, 72 MLBs) com **0 divergências em Status Catálogo**, só diferenças esperadas de Depósito/FULL/Qualidade; (3) 3ª campanha `[ML] [CONTROLE ACOS]` processada — 1 produto — e a mesma armadilha "já processado" (dado antigo sem `viaAlterar`) se repetiu uma 3ª vez no mesmo dia, detectada e reprocessada do zero.

**Investigação:** `git branch -r --contains 73665e8` e `...0cc6f88` confirmam os 2 commits em `origin/master` — bate com "push executado, HEAD idêntico". `pausados-campanha-resultado.json` hoje tem exatamente **30 produtos** em `[ML] [AVA] [PERFORMANCE]`, **13** em `[ML] [BAIXA PERFORMANCE]` e **1** em `[ML] [CONTROLE ACOS]` — os 3 números da conversa batem exatamente contra o estado real do arquivo.

**VALIDAÇÃO:** ✅ **BATE**, com prova em git (`branch --contains`) e no JSON real (contagem exata de produtos por campanha).

**AGENTE RESPONSÁVEL:** Nenhum — tudo verificado corresponde ao que foi feito.

---

## ACHADO 25

**Pedaço coberto:** linhas 13306-13755 do `esqueleto-parte1` — 18/08, 01:09 até 11:52 (fechamento da campanha CONTROLE ACOS + aprovação do Carlos, 2 ciclos de "momento de pausa"/"voltei", e investigação arqueológica de 2 planilhas antigas + comparação dos 3 documentos de processo).

**O que foi encontrado:** (1) Campanha `[ML] [CONTROLE ACOS]` fechada (commit `d7b3a15`), Carlos aprovou a Planilha; (2) 2 ciclos de "momento de pausa"/"voltei" funcionando corretamente; (3) Felipe, preocupado que o dev tivesse fechado 2 planilhas antigas (`Analise Oficial.xlsx`, `ANÚNCIOS EM POTENCIAL...`) sem salvar, pediu investigação arqueológica — Atlas achou que os arquivos foram salvos por último em 13/08 (antes da maratona de hoje), achou uma pasta de backup suspeita, e confirmou **nada foi perdido**; (4) comparação dos 3 documentos que regem essas 2 planilhas antigas contra o método validado hoje — achou que ambos (`analise-acos-catalogo-mercadolivre.md` e `mapeamento-skus-ads-catalogo-mercadolivre.md`) tratavam "PREÇO ALTO" como exclusão, contradizendo a correção de hoje (PREÇO ALTO→PERDENDO); (5) achado técnico à parte: bug de acentos corrompidos ao chamar `powershell.exe` de dentro do Bash.

**Investigação:** `git show d7b3a15` bate: mensagem cita exatamente "processa campanha [ML] [CONTROLE ACOS]... badge PRECO ALTO->PERDENDO, dupla-leitura no formatoColapsado". A pasta `C:\Downloads\backup-antes-recuperacao-2026-08-13` existe de verdade. O arquivo `ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1) (1).xlsx` tem data de modificação **13/08/2026 07:52:26** — bate exatamente com o "07:52" citado na conversa. `mapeamento-skus-ads-catalogo-mercadolivre.md` linha 21 tem a regra exata sobre nunca chamar `powershell.exe` de dentro do Bash por causa da corrupção de acentos — mesma explicação, mesmo exemplo ("ANÚNCIOS EM POTENCIAL..."). Ambos os documentos (`analise-acos-catalogo-mercadolivre.md` linha 64 e `mapeamento-skus-ads-catalogo-mercadolivre.md` linha 84) têm a seção "⚠️ Correção (17-18/08/2026) — PREÇO ALTO NÃO é aviso genérico", citando o mesmo MLB `#6739045854`/`BAS1295P-127V` e os mesmos preços (R$134 vs R$190,83).

**VALIDAÇÃO:** ✅ **BATE, nos 5 pontos**, com prova em commit, sistema de arquivos (pasta backup + timestamp exato) e 2 documentos de processo reais.

**Nota de evolução (já rastreada nos Achados 18 e 23):** os 2 documentos aqui auditados foram, por sua vez, corrigidos de novo em 24/08 — a mesma reversão do "PREÇO ALTO→PERDENDO" pro "PREÇO ALTO = não catálogo, exceto se COMPETINDO" já documentada anteriormente. Consistente em 3 lugares diferentes (código + 2 docs).

**AGENTE RESPONSÁVEL:** Nenhum — tudo investigado e corrigido corretamente, com rastro completo.

---

## ACHADO 26

**Pedaço coberto:** linhas 13755-14200 do `esqueleto-parte1` — 18/08, 11:54 até 18:09 (compactação #6, aplicação dos 4 furos de documentação encontrados no Achado 25, e descoberta da estrutura real de `Analise Oficial.xlsx`).

**O que foi encontrado:** (1) Dex corrigiu os 4 furos nos docs (mecanismo de "Alterar", regra "sempre confirmar via Alterar", PREÇO ALTO, bug de acentos) em 3 commits, incluindo uma autocorreção real: ao ser perguntado "não esqueceu de nada?", conferiu de novo e achou que tinha esquecido metade de um item (citar os 2 casos reais também no doc 1), corrigiu na hora com commit separado; (2) na explicação do documento pro Felipe, descobriu-se que `Analise Oficial.xlsx` já tinha 4 abas reais (`Plan1`, `Plan2`, `Prioridade - Fora de Ads`, `Mapeamento Completo da Planilha`) — o Passo D do documento nunca mencionava isso, só falava em Google Sheets — furo de documentação real, corrigido; (3) descoberto que `ANÚNCIOS EM POTENCIAL...xlsx` tem 737 linhas reais, não as 144 que a sessão anterior tinha processado — quase 600 produtos nunca tocados.

**Investigação:** `git show a383fc0` ("corrige 4 furos"), `8106850` ("adiciona citacao dos casos reais FP100-220V/PAF11B-220V") e `a78bef0` ("corrige Passo D — destino real é o Analise Oficial.xlsx") existem, com mensagens batendo exatamente com a sequência da conversa (inclusive a autocorreção do item esquecido). Abertura de `Analise Oficial.xlsx` (só leitura) confirmou as 4 abas existem com os nomes exatos citados: `Plan1`, `Plan2`, `Prioridade - Fora de Ads`, `Mapeamento Completo da Planilha`. Contagem de linhas hoje é maior (68 e 220, vs 43 e 123 em 18/08) — consistente com trabalho legítimo continuado nas semanas seguintes, não uma contradição.

**VALIDAÇÃO:** ✅ **BATE**, com prova em 3 commits reais e na estrutura real do arquivo (nomes de aba idênticos, crescimento de linhas coerente com o tempo passado).

**AGENTE RESPONSÁVEL:** Nenhum — tudo corrigido, com a autocorreção real sendo um exemplo positivo de disciplina, não um erro escondido.

---

## ACHADO 27

**Pedaço coberto:** linhas 14200-14649 do `esqueleto-parte1` — 18/08, 18:11 até 23:44 (plano de reprocessamento das 737 linhas confirmado, e piloto das linhas 145-170 rodado 3 vezes até sair limpo).

**O que foi encontrado:** Plano fechado com Felipe (reaproveitar MLB conhecido, checkpoint a cada 20-25 linhas, regenerar as 2 abas do zero). No piloto (linhas 145-170), Dex achou e corrigiu 4 bugs reais em sequência: (1) `exceljs` nunca tinha sido instalado como dependência real do projeto — só em scratchpads temporários; (2) busca na aba de Ads aceitava texto desatualizado de uma busca anterior antes da nova carregar; (3) o filtro que escolhe a aba de Ads era largo demais e pegou uma aba velha de dashboard de campanha (19 abas acumuladas no Chrome daquela madrugada); (4) o SKU `CKESSTC-ITA5Q` (linha 158) — já citado no documento como caso de "Restrito para ganhar" — não teve catálogo confirmado porque o Mercado Livre mostrou a frase narrativa ("Você não pode ganhar porque tem experiência de compra ruim") em vez do badge maiúsculo, nunca reconhecida pelo extrator.

**Investigação:** 4 commits reais, cada um batendo com o bug descrito na ordem exata da conversa: `6708ca1` ("adiciona exceljs como dependencia real"), `01c912e` ("busca em Ads aceitava texto desatualizado da pagina reusada"), `7bfa7a8` ("filtro de aba de Ads pegava dashboard de campanha velho"), `7182b8a` ("reconhece frase narrativa de RESTRITO PARA GANHAR no formato colapsado"). `analise-oficial-completo.json`, `linha-158`, SKU `CKESSTC-ITA5Q`: `catalogoConfirmado` tem exatamente os 2 MLBs esperados (`4277217107` Clássico, `4277230155` Premium), `statusCatalogo: "RESTRITO PARA GANHAR"` — bate exatamente com o que a correção deveria produzir. Esse mesmo caso já tinha aparecido, de forma indireta, no `mapeamento-skus-ads-catalogo-mercadolivre.md` (Achado 25/26): "achado no piloto do reprocessamento completo, 18/08/2026" — a frase do documento aponta pra este exato pedaço da conversa.

**VALIDAÇÃO:** ✅ **BATE, nos 4 bugs**, com prova em 4 commits reais em sequência cronológica correta e no estado real do JSON — e como bônus, fecha o círculo com uma referência cruzada de um achado anterior (o documento citava este piloto sem o analyst ainda ter chegado nele).

**AGENTE RESPONSÁVEL:** Nenhum — todos os 4 bugs corrigidos, documentados e verificados no dado real.

---

## ACHADO 28

**Pedaço coberto:** linhas 14649-15098 do `esqueleto-parte1` — 18/08, 23:44 até 19/08, 00:50 (fechamento do piloto, descoberta de uma 2ª violação real da BLOCO 0-AA, e escalada ao Orion).

**O que foi encontrado:** (1) Veredito final do piloto confirmado de novo: 22/26 linhas limpas, 4 bugs reais corrigidos (mesmo conteúdo do Achado 27); (2) Felipe notou 22 abas abertas no Chrome do Modo Navegador e cobrou explicação — Dex investigou e achou causa raiz real: seu script novo (`reprocessar-analise-oficial-completo.js`, commit `3122683`) reimplementou o seletor de aba de Anúncios do zero em vez de reaproveitar o `pipeline-lote-25-91.js` — a versão nova exigia `#` na URL (`vendedores.mercadolivre.com.br/anuncios#`), a antiga não exigia nada, e nenhuma das duas cobria os 2 casos ao mesmo tempo — violação real da BLOCO 0-AA, admitida pelo próprio Dex; (3) Atlas confirmou de forma independente (comparando os 2 arquivos linha por linha, não pela palavra do Dex) e achou 2 itens extras que o Dex não tinha listado; (4) achado colateral sério: o script de reprocessamento nunca escrevia de fato no `Analise Oficial.xlsx` — só coletava pro JSON, apesar do comentário dizer "regenerando as 2 abas"; (5) Felipe escalou a violação da BLOCO 0-AA pro @aiox-master, pedindo correção estrutural, não só reforço de texto.

**Investigação:** `git show 3122683` existe: "feat: script de reprocessamento completo Analise Oficial (2-737)". `pipeline-lote-25-91.js` linha 108 tem exatamente `p.url().includes('vendedores.mercadolivre.com.br/anuncios')` — sem exigir `#`, confirmando a versão "solta" citada. O `reprocessar-analise-oficial-completo.js` de hoje tem, no cabeçalho, a citação explícita de reuso do BLOCO 0-AA (`acharSkuDoMlb`, `analisarSku`, `normalizarNumeroOuTraco`) — e o comentário da linha 298 ("Escrita real no Analise Oficial.xlsx (item 1 do plano, 18/08/2026)") confirma que a escrita real foi um item de plano adicionado depois — batendo exatamente com o furo que o Atlas achou ("nunca escreve de fato... isso muda o passo a passo"). `wb.xlsx.writeFile(ARQUIVO_ANALISE_OFICIAL)` existe hoje na linha 502, confirmando que o furo foi fechado.

**VALIDAÇÃO:** ✅ **BATE, nos pontos centrais** — commit real, código real batendo com a comparação técnica citada, e o comentário do código confirmando (com a própria data) que o furo da escrita era real e foi corrigido depois.

**AGENTE RESPONSÁVEL:** Nenhum pendente nesta janela — a violação da BLOCO 0-AA foi admitida e escalada corretamente; a correção estrutural (módulo compartilhado) é o próximo passo que o Orion estava iniciando quando este pedaço termina.

---

*Documento vivo — novos achados são adicionados aqui conforme a leitura linha por linha (`esqueleto-parte1-89427cf3.md` + `esqueleto-parte2-a5d3b08c.md`) avança. Gerado em 04/09/2026 por @analyst (Atlas), persistido por @aiox-master (Orion).*

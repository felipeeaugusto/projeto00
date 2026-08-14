# mapeamento-pausados-campanha-mercadolivre

## Propósito

Mapear todos os produtos **pausados dentro de cada Campanha de Mercado Ads** (não confundir com "Sem Campanha", que é o escopo do `mapeamento-skus-ads-catalogo-mercadolivre.md`). Pedido feito pelo Carlos numa reunião com o Felipe e a Mariana (nova responsável pelo Ads), em 12/08/2026. Planilha de destino: `Pausados em Campanha - Karzen.xlsx` (`C:\Downloads\`), estrutura definida via `*elicit` do @analyst no mesmo dia — **13 colunas** (ajustado em 13/08/2026, ver nota abaixo): Campanha | Título na Campanha | SKU | Catálogo Clássico | Status Catálogo Clássico | Catálogo Premium | Status Catálogo Premium | Depósito (un) | FULL (un) | Qualidade do anúncio | Experiência | Status do Produto | Status na Campanha.

**Nota (13/08/2026):** a estrutura original tinha 11 colunas e não incluía as 2 colunas de "Status Catálogo" — Felipe percebeu a lacuna ao revisar a tabela de exemplo antes da escrita real: o dado de GANHANDO/PERDENDO/COMPARTILHANDO/RESTRITO PARA GANHAR já era coletado pelo pipeline (Passo A.1), mas nunca tinha sido exposto como coluna própria, só ficava implícito em qual MLB era "confirmado" pra cada condição — informação que o Carlos precisa ver diretamente, sem inferir.

Depende do procedimento de conexão `modo-navegador-browser-access.md` e reaproveita Passo A/A.1/A.2 do `mapeamento-skus-ads-catalogo-mercadolivre.md` (mesma lógica de confirmação de catálogo Clássico/Premium, incluindo GANHANDO/PERDENDO/COMPARTILHANDO/RESTRITO PARA GANHAR).

**⚠️ REGRA GERAL OBRIGATÓRIA (14/08/2026, reforçada 14/08/2026) — paciência e confirmação de carregamento, nunca tempo fixo curto, aplicada no PROCESSO INTEIRO:** válida pra todo este documento e pro `mapeamento-skus-ads-catalogo-mercadolivre.md` — ver texto completo da regra lá (seção logo após o Propósito). Resumo: nunca confiar num `waitForTimeout` fixo curto como garantia de que algo carregou (menu, página, listagem, drawer) — sempre confirmar que o texto da página estabilizou de verdade (2 leituras seguidas idênticas) antes de ler o conteúdo, e se não apareceu na primeira tentativa, esperar mais e tentar de novo antes de concluir "não existe". **Isso vale pra todo ponto do processo, não só onde um bug já apareceu antes** — corrigir só o ponto onde o bug foi visto e deixar o resto com tempo fixo é o mesmo erro, só adiado (foi exatamente isso que gerou uma segunda rodada de bugs de timing depois da primeira correção). Trabalho seguro com dado real vale mais que trabalho rápido.

## Escopo — 7 Campanhas ativas

```
[ML] [AVA] [PERFORMANCE]     https://ads.mercadolivre.com.br/product-ads/admin/campaigns/357312967/dashboard
[ML] [BAIXA PERFORMANCE]     https://ads.mercadolivre.com.br/product-ads/admin/campaigns/358247429/dashboard
[ML] [CONTROLE ACOS]         https://ads.mercadolivre.com.br/product-ads/admin/campaigns/357473382/dashboard
[ML] [CURVA-A]                https://ads.mercadolivre.com.br/product-ads/admin/campaigns/358232940/dashboard
[ML] [CURVA-B]                https://ads.mercadolivre.com.br/product-ads/admin/campaigns/358239185/dashboard
[ML] [CURVA-C]                https://ads.mercadolivre.com.br/product-ads/admin/campaigns/358239193/dashboard
Em Alta                        https://ads.mercadolivre.com.br/product-ads/admin/campaigns/358678889/dashboard
```
(todas com `?navigate_to=mercado_ads` no final). Achadas pelos links da própria página de listagem de Campanhas (`https://ads.mercadolivre.com.br/product-ads/admin/campaigns?navigate_to=mercado_ads`), filtrando `<a>` cujo texto bate com o nome da campanha — não precisa navegar manualmente, os hrefs já vêm prontos.

## Passo A — Achar os produtos pausados dentro de cada campanha (validado 12/08/2026)

1. Abrir o dashboard da campanha (URL acima).
2. **Rolar a página** (a lista de anúncios patrocinados é lazy-load — o texto da página cresce de ~1100 chars pra ~10500 chars só depois de rolar; sem rolar, a lista aparece com "0 anúncios" mesmo a campanha tendo produtos).
3. Clicar no filtro **"Pausados"** — é uma `div.andes-tag__label` com texto exato "Pausados" (não é link nem botão comum). Usar `page.getByText('Pausados', { exact: true })`, nunca `text=Pausados` sozinho (pode casar com outros elementos).
4. Depois do clique, esperar ~3s e reler o texto — o contador de "PAUSADO" (badge por produto) sobe de acordo com a quantidade real de pausados na campanha.
5. Cada produto pausado aparece no mesmo formato de bloco `CATÁLOGO` já conhecido:
   ```
   CATÁLOGO
   #MLB<numero> ORIGEM: PRÓPRIO
   <Título do anúncio>

   PAUSADO

   Ver variações
   ```
   (a etiqueta `PAUSADO` só aparece quando o produto está pausado — mesmo padrão da aba Anúncios Patrocinados fora de campanha, Passo B do `mapeamento-skus-ads-catalogo-mercadolivre.md`)

**⛔ ERRO CRÍTICO JÁ COMETIDO — NUNCA usar o `#MLB<numero>` do topo do bloco `CATÁLOGO` pra buscar o SKU (corrigido 12/08/2026):** esse número é só o MLB **representante/catálogo** do produto na campanha — não é necessariamente buscável na aba Anúncios, e mesmo quando é, pode não ser o MLB certo. **O procedimento correto e obrigatório é:**

1. Clicar em **"Ver variações"** do produto pausado (abre um painel/drawer)
2. **Rolar a página inteira** com o drawer aberto — o painel pode ter poucas variações (2) ou muitas (6+ visto em produção), e não carrega tudo de uma vez
3. O drawer lista cada variação real, no formato:
   ```
   MLB<numero>

   [C ou P] Ganhando no catálogo   (ou "Perdendo", "Compartilhando" — quando explícito)
   <Título da variação>

   R$ <preço>

   [ou: SINCRONIZADO COM O CATÁLOGO / Anúncio patrocinado desativado — quando é copia sincronizada]
   ```
   Já vem com o status de catálogo explícito às vezes (achado útil — evita ter que checar "Alterar" depois)
4. Pegar o **primeiro MLB** da lista do drawer — esse sim é buscável na aba Anúncios (`Buscar por título, código ou SKU`, número puro, sem prefixo) pra achar o `SKU <valor>`
5. Rebuscar pelo SKU encontrado (Passo A do outro doc) — a busca traz **todos os MLBs sincronizados daquele SKU especificamente**, que pode ser só uma fração do total de MLBs do drawer

**⚠️ Um produto pausado na campanha pode conter MAIS DE 1 SKU diferente** (não é sempre "1 produto = 1 SKU com variações de sincronização"). Caso real validado (`[ML] [AVA] [PERFORMANCE]`, produto "Sanduicheira elétrica Kian Panini Linea Eletro", 6 MLBs no drawer): eram **3 SKUs diferentes** (`SPANK-R-127V`, `SPANK-R-220V`, `SPANK-127V` — cor/voltagem diferentes), cada um com 2 MLBs sincronizados entre si. Segundo caso real validado (13/08/2026, mesma campanha, produto "Aspirador extrator Tambor Wap Spot Cleaner W2 4.17L", **8 MLBs no drawer**): eram **2 SKUs diferentes** (`WW2-127V`, `WW2-220V` — voltagem diferente), cada um com 4 MLBs (2 cards de 2 MLBs cada) — reforça que o drawer pode ter bem mais que 2 MLBs e é essencial rolar a página inteira (passo 2 acima) antes de contar quantos existem. Pra identificar todos os SKUs de um produto: buscar cada MLB do drawer que ainda não caiu em nenhum SKU já identificado (a busca por SKU já cruza automaticamente com "Sincronizado com #X" pra saber quais MLBs pertencem ao mesmo SKU — não precisa verificar manualmente contra a lista da campanha de novo, isso já está implícito na resposta da busca por SKU).

**⚠️ MLB "SINCRONIZADO COM O CATÁLOGO" que não mostra GANHANDO/PERDENDO próprio não significa que não é catálogo** — pode ser o "anúncio pai"/cópia sincronizada do mesmo catálogo. Caso real: `#MLB6929868116` não mostrava G/P/C, mas o link "Alterar" dele redirecionava pra `itemId=MLB4754046783` (o outro MLB do mesmo SKU, que MOSTRAVA "PERDENDO") — confirma que são o mesmo catálogo, um só, não dois catálogos diferentes. Usar o método já documentado (Passo A.1 do outro doc, caminho 1/2) pra confirmar — nunca assumir que "não mostra status" = "não é catálogo".

**⚠️ Nem todo MLB é buscável direto na aba Anúncios pelo número puro.** Caso real: `#MLB25543184` (Aspirador Philco PAS1450C) retornou **0 anúncios**. Isso é raro quando se usa o MLB certo (o da variação, dentro do drawer) — o erro mais comum é ter usado o MLB errado (representante do topo, ver acima). Se mesmo pegando o MLB certo do drawer a busca falhar, tratar como "não verificável" e não insistir (mesmo caso-limite documentado no `analise-acos-catalogo-mercadolivre.md`, Passo 3).

## Passo B — Qualidade e Experiência (validado 12/08/2026)

Essas 2 informações aparecem na aba **Anúncios** (Gestão de anúncios), colunas da própria tabela — cabeçalho real da tabela: `Anúncio | Preço | Condições | Você recebe | Métricas últ. 7 dias | Qualidade | Experiência | Status e recomendações`.

**⚠️ Regra de exibição na planilha (decidido com o Felipe, 12/08/2026): só escrever o número quando ele for ≤ 65.** Acima de 65, escrever **"-"** (não interessa pro Carlos — o objetivo é flagar só os problemáticos). Vale igual pra Qualidade e pra Experiência, cada uma na sua própria coluna.

No texto puro da página (`innerText`), quando o MLB está **Ativo** e o valor é baixo o suficiente pra aparecer como número, o padrão é:
```
<numero Qualidade>
<subtítulo Qualidade, ex: "3 objetivos" / "4 objetivos" / "1 objetivo">
<numero Experiência — pode nao aparecer, ver abaixo>
<subtítulo Experiência, ex: "Com problemas" / "Sem calcular">

<GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO PARA GANHAR — se houver>
```

**Experiência frequentemente NÃO mostra número — só um rótulo qualitativo** (`"Muito bem!"`, `"BOA"` — confirmado também na seção "Concorrência no Mercado Livre" da página "Alterar", que usa a mesma escala: BOA/etc.) quando o valor está bom. Nesses casos, como não há número visível, aplicar a regra do "-" mesmo sem confirmar o valor exato — um rótulo qualitativo positivo é evidência suficiente de que está acima do limite de 65. Exemplos reais confirmados com número visível: `63`+"4 objetivos" e `75`+"Com problemas" (SKU `MPN-01-BF-127V`, `#4719874527`); `63`+"4 objetivos" e `75`+"Com problemas" (SKU `SPANK-R-127V`, `#6936133254`).

**MLBs Inativos/Pausados no Status do Produto não mostram os 2 números separados** — só um resumo único (ex: `69 / Inativa`, `74 / Inativo sem estoque`). Isso é esperado: quando não confirmado, ambas as colunas ficam "-" pela regra normal de "sem dado disponível".

## Passo C — Cruzar com o restante do mapeamento

Depois de achar o SKU (Passo A + busca reversa), reaproveitar integralmente:
- **Passo A (do outro doc)** — buscar o SKU, rolar a página inteira, achar `todosMlbsSincronizados`
- **Passo A.1** — confirmar Catálogo Clássico/Premium (caminho 1: status GANHANDO/PERDENDO/COMPARTILHANDO/RESTRITO PARA GANHAR; caminho 2: comparação de preço via "Alterar")
- **Passo A.2** — Depósito/FULL/Status do Produto

## Passo D — Escrever na planilha (`Pausados em Campanha - Karzen.xlsx`)

- **Uma linha por SKU** (não por MLB) — se um produto pausado na campanha tiver mais de 1 SKU associado (caso "N variações"), cada SKU vira uma linha, com a coluna "Título na Campanha" **mesclada** (célula Excel mesclada verticalmente) cobrindo todas as linhas dos SKUs daquele mesmo produto — mesma técnica já usada na `Carlos Analise.xlsx` em 04-05/08/2026 (16 mesclagens de título).
- **Catálogo Clássico** e **Catálogo Premium**: colunas separadas (diferente do "MLB's" único do outro documento). Cada uma leva o MLB confirmado daquela condição; se houver mais de 1 MLB de catálogo da mesma condição pro mesmo produto, colocar na quebra de linha logo abaixo, usando "+" pra separar (ex: `#123 + #456`) — único lugar do projeto onde "+" continua em uso (foi removido do "MLB's" do `Analise Oficial.xlsx`, mas aqui o Felipe pediu explicitamente esse formato).
- **Status Catálogo Clássico** e **Status Catálogo Premium** (novo, 13/08/2026): logo depois de cada coluna de MLB, mostra o resultado da disputa daquele MLB específico — GANHANDO, PERDENDO, COMPARTILHANDO ou RESTRITO PARA GANHAR (mesmo vocabulário do Passo A.1). Vem direto de `mlbsDetalhe[mlb].statusCatalogo`, já coletado pelo pipeline — não exige nova coleta de dado, só passou a ser escrito na planilha. Sem MLB confirmado naquela condição → "-" (mesma regra da coluna do MLB).
- **Regra do "-":** mesma convenção já validada — Depósito/FULL "sem estoque" ou ausente → "-"; Catálogo Clássico/Premium sem MLB confirmado → "-"; Status Catálogo sem MLB confirmado → "-".
- **Status na Campanha:** sempre "Pausado" (é o filtro usado pra montar essa planilha).
- **Organização visual:** igual às 2 páginas do `Analise Oficial.xlsx` — banner de validação mesclado, cabeçalho, linhas de dado/espaçador alternadas, larguras de coluna fixas por coluna (não o padrão "8.43 default" — usar largura proporcional ao conteúdo esperado de cada coluna).

**⚠️ Bug real de formatação — nunca setar `Interior.Color` direto via COM pra recriar banner/cabeçalho do zero (12/08/2026):** ao criar a estrutura da `Pausados em Campanha - Karzen.xlsx` do zero (banner + cabeçalho), setar `.Interior.Color = 16777215` (branco) via PowerShell/COM aplica automaticamente `Interior.Pattern = xlPatternSolid` (preenchimento sólido) — só que o `Analise Oficial.xlsx` (aprovado pelo Felipe) usa `Interior.Pattern = xlPatternNone` (**sem preenchimento**) nessas mesmas células, mesmo com `Interior.Color` igual. A diferença visual: preenchimento sólido branco **esconde as linhas de grade** da célula, fazendo ela parecer um "buraco branco" destacado — sem preenchimento, as linhas de grade aparecem por trás e a célula se mistura ao resto da planilha. **Correção obrigatória:** nunca recriar banner/cabeçalho do zero setando cor manualmente — sempre copiar o range já formatado do `Analise Oficial.xlsx` (`Range.Copy` entre workbooks, linhas 1-4) e só sobrescrever o texto depois. Pra planilhas com mais colunas que o Oficial (13), estender o padrão copiando o último par coluna-de-dado + coluna-espaçadora repetidamente pra direita.

## Pendências resolvidas em produção (12/08/2026)

1. ~~Validar o regex de Qualidade/Experiência contra mais exemplos~~ — RESOLVIDO: validado contra 6+ exemplos reais, ver Passo B acima (regra do "≤65 mostra número, senão '-'")
2. ~~Decidir o que fazer quando um MLB pausado não é buscável~~ — RESOLVIDO: o erro original era usar o MLB errado (representante de catálogo, não o da variação dentro do drawer) — usando o MLB certo, a busca praticamente sempre funciona; se mesmo assim falhar, tratar como "não verificável"
3. ~~Confirmar lógica de agrupamento "N variações"~~ — RESOLVIDO: um produto pausado na campanha pode conter múltiplos SKUs diferentes (não só variações sincronizadas do mesmo SKU) — cada SKU descoberto dentro do drawer vira sua própria linha na planilha final, com "Título na Campanha" mesclado entre elas

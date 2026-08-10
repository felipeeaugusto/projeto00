# mapeamento-skus-ads-catalogo-mercadolivre

## Propósito

Procedimento validado para mapear os SKUs de uma planilha de produtos contra o Mercado Ads — descobrir os MLBs de cada SKU, confirmar se o produto está em Ads (Ativa/Pausada/Sem campanha), e marcar o progresso na própria planilha (Excel).

Depende do procedimento de conexão documentado em `modo-navegador-browser-access.md` (gatilho "Modo Navegador"). Reaproveita o Passo A do `analise-acos-catalogo-mercadolivre.md` (mapeamento de SKU/MLB). Validado em 08-10/08/2026 no projeto Karzen (planilha "ANÚNCIOS EM POTENCIAL - KARZEN ELETRO").

---

## Passo A — Achar o SKU e a listagem completa de MLBs

Reaproveitado do `analise-acos-catalogo-mercadolivre.md`, Passo 3, itens 1-2:

1. Na aba **Anúncios** (`mercadolivre.com.br/anuncios?...`), buscar por `MLB<número>` — pode redirecionar direto pro card do produto, ou pra um card **"Family"** (ID gigante, preço em faixa agregada) — nesse caso clicar na setinha pra baixo pra expandir o card e achar o SKU ali dentro.
2. **Assim que achar o SKU (seja direto na busca por MLB, seja dentro do card Family), pesquisar de novo por esse SKU** — sempre, sem exceção, não é condicional ao caminho usado pra achar o SKU. Isso traz a listagem completa de todos os MLBs do produto (Clássico, Premium, variações), possivelmente em múltiplos cards.

## Passo B — Confirmar se o produto está em Ads

**Página:** Anúncios Patrocinados (bookmark "Anúncios Patrocinados": `https://ads.mercadolivre.com.br/product-ads/admin/ads?navigate_to=mercado_ads`)

**Método principal — busca direta por MLB (validado 4/4, 08/08/2026):**

Buscar exatamente **"MLB" + número** (ex: `MLB4670660503`) na caixa de busca da página. O prefixo texto **"MLB" é obrigatório** — o número puro sozinho não funciona (confirmado por teste manual do Felipe, 08/08/2026). Não importa qual dos MLBs do produto (do Passo A) seja usado — a busca encontra a entrada de catálogo correta mesmo quando o MLB buscado é uma variação "filha".

Antes de cada busca, fechar qualquer drawer de "variações" que tenha sobrado de uma checagem anterior, clicando no botão `button[aria-label="Cerrar"]` — a tecla `Escape` **não fecha** esse drawer (causou falha real de timeout no clique da caixa de busca antes desta correção).

**Resultado da busca — 3 estados confiáveis, validados (10/08/2026):**

| Estado | O que significa |
|---|---|
| **Ativa** | produto em Ads, campanha rodando |
| **Pausada** | produto em Ads, campanha parada |
| **Sem campanha** | produto catalogado no Mercado Ads, mas nunca foi colocado numa campanha — **este é o caso de "produto ativo fora de Ads"** que interessa pra lista do Carlos e do gerente de conta ML Ads |

Os 3 estados acima são todos **resultados de busca com sucesso** — o catálogo do Mercado Ads puxa automaticamente do estoque ativo do vendedor, então a busca direta por MLB tende a sempre encontrar uma entrada, mesmo pra produtos nunca anunciados (aparecem como "Sem campanha", não como resultado vazio). Validado por experiência própria do Felipe: já viu um produto como "Sem campanha" nessa coluna e depois o colocou em Ads manualmente.

**Caso raro — 0 resultados de verdade (nem "Sem campanha" aparece):**

Se a busca direta por MLB não retornar nenhum resultado, cair no plano B secundário:
1. Buscar por **nome do produto + marca** na mesma página de Anúncios Patrocinados.
2. Checar as variações dos candidatos retornados (abrir o painel de "variações" de cada um) até achar um MLB que bata com algum dos MLBs conhecidos do produto (Passo A).
3. **Parar assim que achar o primeiro match** — não precisa checar as variações de todos os candidatos da lista.
4. Se **nenhum** candidato bater, registrar como **"não encontrado com os métodos disponíveis"** — nunca registrar como "não está em Ads" com certeza. Um resultado vazio na busca por nome/marca não é prova de ausência: o Mercado Livre pode catalogar o produto sob um título completamente diferente do usado pelo vendedor (caso real: SKU `SCG-MR-BIV`, catalogado como "Ga.ma Italy PRIMO II BIVOLT C" — só descoberto ao abrir as variações de um candidato de título aparentemente não relacionado). Mesmo tratamento dado ao caso "não checável" do `analise-acos-catalogo-mercadolivre.md` (Passo 3, item 1): separar "eu sei que não está" de "eu não consegui saber".

## Passo C — Marcar o progresso na planilha (Excel)

Pra cada MLB encontrado de um SKU (Passo A):

1. No Excel, abrir **Localizar e Selecionar → Localizar...**
2. Clicar em **Opções >>**
3. Mudar o campo **"Em:"** de "Planilha" para **"Pasta de trabalho"** (busca a planilha inteira, não só a aba atual)
4. Digitar o número do MLB → **Localizar tudo**
5. Colorir **somente a célula do número** (não a linha inteira), usando a **mesma cor para todos os MLBs de um mesmo SKU**. Usar uma cor diferente por grupo de SKU (não é uma cor única de "verificado").

**Não confundir com a marcação histórica separada do Felipe:** o azul `RGB(66,133,244)` já usado em ~200 células da coluna Item ID é a convenção própria do Felipe pra "já verifiquei manualmente" — não reaproveitar essa cor nem esse significado no Passo C.

**⚠️ Regra de "qual linha processar a seguir" — corrigida (10/08/2026):** o azul do Felipe foi marcado **antes** deste método existir — nunca passou pela determinação de status em Ads (Passo B). Pular linhas azuis faria essas linhas nunca receberem o tratamento validado. A regra correta: **pular SOMENTE células já coloridas com uma das cores novas por-grupo-de-SKU** (as cores geradas via HSL, uma por SKU, usadas desde que este método começou). Qualquer outra cor — o azul `RGB(66,133,244)`, dourado `RGB(255,217,102)`, dourado-claro `RGB(255,229,153)`, ou sem cor nenhuma — conta como "ainda não passou pelo método validado" e deve ser processada normalmente. Não precisa de nenhum tratamento especial por faixa de linha: como o Passo A busca o SKU e traz todos os MLBs do produto onde quer que estejam na planilha, e o Passo C colore com escopo "Pasta de trabalho" (planilha inteira), uma varredura sequencial simples aplicando essa regra já cobre o trabalho manual do Felipe espalhado por qualquer lugar da planilha, corrigindo/atualizando essas linhas pro método validado.

## Passo D — Escrever nas 2 páginas novas do Google Sheets

**Planilha:** "Planilha do Ads ML" (`https://docs.google.com/spreadsheets/d/1JI5kUj-F2D946GtH4U3REkryCqpXvacmFlKrn2QFdm8/`)

**3ª página — nome exato da aba: `Prioridade - Fora de Ads`**
Colunas: `SKU | MLB(s) | Título | Depósito (un) | FULL (un)`
Conteúdo: produtos ativos com status "Sem Campanha" (Passo B) — pra entrega ao Carlos e ao gerente de conta do Mercado Ads.

**4ª página — nome exato da aba: `Mapeamento Completo da Planilha`**
Colunas: `SKU | MLB(s) conhecidos | Status (Ativo/Pausado/Sem estoque) | Status em Ads (Ativa/Pausada/Sem Campanha)`
Conteúdo: todos os SKUs mapeados, sem exceção.

**Marcação de validação (obrigatória nas 2 páginas):** aviso fixo destacado no topo da página (célula/linha mesclada, formatação chamativa — cor de fundo diferente, negrito), em linguagem simples pra qualquer pessoa entender (o Carlos vê isso, não conhece o processo interno): `⚠️ Dados em validação — aguardando confirmação final` até o Felipe aprovar o lote, depois atualizado pra `✅ Dados confirmados`. **Nunca usar essa marcação como nome da aba** — só um aviso dentro da página.

**Procedimento seguro de criação de aba nova (validado em 10/08/2026):**
1. No Google Sheets, clicar no botão **"+"** no canto inferior esquerdo (ou clique direito numa aba existente → **"Inserir planilha"**) — cria uma aba nova em branco, sem tocar nas existentes
2. Renomear a aba imediatamente (duplo clique no nome da aba) pro nome definitivo — nunca deixar como "Página N" genérico
3. Nunca usar ações em massa que afetem "todas as planilhas" durante esse processo
4. Confirmar visualmente que as abas existentes (inclusive as que o Felipe já criou manualmente) continuam intactas antes de prosseguir

---

## Cuidado com foco de janela

Mesma regra do `analise-acos-catalogo-mercadolivre.md`: nunca deixar a janela do Chrome (Modo Navegador) em primeiro plano além do momento inicial — minimizar sempre, conforme BLOCO 0-U/0-V do `CLAUDE.md`.

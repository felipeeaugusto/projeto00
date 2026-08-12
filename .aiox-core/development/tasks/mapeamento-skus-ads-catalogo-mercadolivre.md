# mapeamento-skus-ads-catalogo-mercadolivre

## Propósito

Procedimento validado para mapear os SKUs de uma planilha de produtos contra o Mercado Ads — descobrir os MLBs de cada SKU, confirmar se o produto está em Ads (Ativa/Pausada/Sem campanha), e marcar o progresso na própria planilha (Excel).

Depende do procedimento de conexão documentado em `modo-navegador-browser-access.md` (gatilho "Modo Navegador"). Reaproveita o Passo A do `analise-acos-catalogo-mercadolivre.md` (mapeamento de SKU/MLB). Validado em 08-10/08/2026 no projeto Karzen (planilha "ANÚNCIOS EM POTENCIAL - KARZEN ELETRO").

---

## Passo A — Achar o SKU e a listagem completa de MLBs

**⚠️ Correção crítica (11/08/2026) — qual caixa de busca usar:** na aba **Anúncios** (favorito "Anúncios" na barra do Chrome do Modo Navegador, abre por padrão na página "Gestão de anúncios") existem **2 caixas de busca diferentes na mesma tela** — usar a errada gera resultado poluído e enganoso:

- ✅ **Certa, usar sempre:** `input[placeholder="Buscar por título, código ou SKU"]` — busca filtrada de verdade, mostra um contador exato ("N anúncios") e, pra cada card do resultado, já escreve o texto `SKU <valor>` ao lado dos MLBs — sem precisar clicar em nada.
- ❌ **Errada, nunca usar:** `input[placeholder="Buscar seus produtos ou vendas por título, SKU ou #"]` (classe `nav-header-sellers-search__input`, fica no topo do site) — essa é uma busca genérica que mistura o resultado de verdade com uma lista de "itens recentes" completamente aleatória (teste real: buscar a SKU de uma máquina de gelo trouxe também Climatizador, Panela elétrica, Prancha alisadora — produtos sem nenhuma relação).

Passo a passo:

1. Buscar, na caixa certa acima, o número que já está na coluna "Item ID" da planilha de origem — **sem** o prefixo "MLB", só o número puro.
2. Ler o contador de resultados ("N anúncios") logo acima da lista.
   - **0 anúncios / nenhum resultado:** o anúncio desse produto não existe mais no Mercado Livre — registrar como tal, não insistir.
   - **1 ou mais anúncios:** o card retornado já mostra o SKU escrito (`SKU <valor>`) ao lado do(s) MLB(s) dele — ler direto da tela, sem clicar em nada.
3. Apagar o número da caixa de busca, colar o SKU encontrado, buscar de novo — **sempre, sem exceção**, mesmo que o card já mostre "Sincronizado com #X, #Y" (essa informação é só um detalhe de por que os MLBs estão ligados — Clássico/Premium, catálogo/pai — nunca um atalho pra pular esta busca).
4. Essa busca retorna todos os cards com aquele SKU (pode ser 1 ou mais — exemplo real validado: 2 cards, 4 MLBs no total). Cada card mostra seu próprio `SKU <valor>` ao lado dos MLBs dele.
5. **Verificação obrigatória, pra cada card retornado:** conferir que o texto `SKU <valor>` bate exatamente com o SKU buscado — só leitura do texto já visível na tela, nenhum clique necessário. Só os MLBs de cards com o SKU confirmado entram na lista final do produto.

## Passo B — Confirmar se o produto está em Ads

**Página:** Anúncios Patrocinados (bookmark "Anúncios Patrocinados": `https://ads.mercadolivre.com.br/product-ads/admin/ads?navigate_to=mercado_ads`)

**Método principal — busca direta por MLB (validado 4/4, 08/08/2026):**

Buscar exatamente **"MLB" + número** (ex: `MLB4670660503`) na caixa de busca da página — placeholder exato: `Procurar por # ou título` (confirmado 11/08/2026). O prefixo texto **"MLB" é obrigatório** — o número puro sozinho não funciona (confirmado por teste manual do Felipe, 08/08/2026). Não importa qual dos MLBs do produto (do Passo A) seja usado — a busca encontra a entrada de catálogo correta mesmo quando o MLB buscado é uma variação "filha".

Antes de cada busca, fechar qualquer drawer de "variações" que tenha sobrado de uma checagem anterior, clicando no botão `button[aria-label="Cerrar"]` — a tecla `Escape` **não fecha** esse drawer (causou falha real de timeout no clique da caixa de busca antes desta correção).

**⚠️ Correção crítica (11/08/2026) — a coluna "Campanha" sozinha NÃO decide o status:** ela só decide entre "tem campanha" ou "não tem campanha" — **nunca** entre Ativa e Pausada. Confirmado com 3 prints de referência do Felipe (`C:\Users\Felipe Augusto\Pictures\Processo Oficial\Em Campanha.png`, `Sem Campanha.png`, `Pausados.png`):

- Quando o produto está **Ativo** e quando está **Pausado**, a coluna "Campanha" mostra a **mesma coisa**: o nome da campanha em link azul (ex: `[ML] [AVA] [PERF...]`, `Em Alta`) — visualmente idêntico nos 2 casos.
- A única diferença visível é uma **etiqueta preta "PAUSADO"**, que aparece **perto do título do produto** (não na coluna "Campanha") — só existe quando o anúncio está pausado.

**Procedimento correto de leitura do status (substitui a tabela antiga):**

```
PASSO 1: Ler a coluna "Campanha"
  SE mostrar o texto literal "Sem Campanha" → status = Sem Campanha. PARAR AQUI.
  SE mostrar um nome de campanha (link azul, qualquer nome) → ir pro PASSO 2

PASSO 2: Checar se existe a etiqueta "PAUSADO" perto do título do produto
  (mesma linha do resultado, junto ao título/checkbox — NÃO é a coluna "Campanha")
  SE existir a etiqueta "PAUSADO" → status = Pausada
  SE NÃO existir → status = Ativa
```

| Estado | O que significa |
|---|---|
| **Ativa** | produto em Ads, campanha rodando (coluna Campanha = nome da campanha, sem etiqueta "PAUSADO" no título) |
| **Pausada** | produto em Ads, campanha parada (coluna Campanha = nome da campanha, **com** etiqueta "PAUSADO" no título) |
| **Sem campanha** | produto catalogado no Mercado Ads, mas nunca foi colocado numa campanha (coluna Campanha = texto literal "Sem Campanha") — **este é o caso de "produto ativo fora de Ads"** que interessa pra lista do Carlos e do gerente de conta ML Ads |

Os 3 estados acima são todos **resultados de busca com sucesso** — o catálogo do Mercado Ads puxa automaticamente do estoque ativo do vendedor, então a busca direta por MLB tende a sempre encontrar uma entrada, mesmo pra produtos nunca anunciados (aparecem como "Sem campanha", não como resultado vazio). Validado por experiência própria do Felipe: já viu um produto como "Sem campanha" nessa coluna e depois o colocou em Ads manualmente.

**Caso raro — 0 resultados de verdade (nem "Sem campanha" aparece):**

Se a busca direta por MLB não retornar nenhum resultado, cair no plano B secundário:
1. Buscar por **nome do produto + marca** na mesma página de Anúncios Patrocinados.
2. Checar as variações dos candidatos retornados (abrir o painel de "variações" de cada um) até achar um MLB que bata com algum dos MLBs conhecidos do produto (Passo A).
3. **Parar assim que achar o primeiro match** — não precisa checar as variações de todos os candidatos da lista.
4. Se **nenhum** candidato bater, registrar como **"não encontrado com os métodos disponíveis"** — nunca registrar como "não está em Ads" com certeza. Um resultado vazio na busca por nome/marca não é prova de ausência: o Mercado Livre pode catalogar o produto sob um título completamente diferente do usado pelo vendedor (caso real: SKU `SCG-MR-BIV`, catalogado como "Ga.ma Italy PRIMO II BIVOLT C" — só descoberto ao abrir as variações de um candidato de título aparentemente não relacionado). Mesmo tratamento dado ao caso "não checável" do `analise-acos-catalogo-mercadolivre.md` (Passo 3, item 1): separar "eu sei que não está" de "eu não consegui saber".

## Passo C — Marcar o progresso na planilha (Excel)

Pra cada MLB confirmado de um SKU (Passo A — só os que passaram na verificação do item 5):

1. No Excel, abrir **Localizar e Selecionar → Localizar...**
2. Clicar em **Opções >>**
3. Mudar o campo **"Em:"** de "Planilha" para **"Pasta de trabalho"** (busca a planilha inteira, não só a aba atual)
4. Digitar o número do MLB → **Localizar tudo**
5. Na célula do número (**só a célula**, não a linha inteira): abrir a opção de cor de preenchimento (ícone do balde) → clicar primeiro em **"Sem preenchimento"** (remove qualquer cor que já esteja lá, inclusive o azul `RGB(66,133,244)` do Felipe) → só depois aplicar a **cor definida pra esse grupo de SKU**. Nunca colorir por cima de uma cor existente sem limpar antes.
6. **Mesma cor para todos os MLBs de um mesmo SKU**, cor diferente por grupo de SKU (não é uma cor única de "verificado").

**Não confundir com a marcação histórica separada do Felipe:** o azul `RGB(66,133,244)` já usado em ~200 células da coluna Item ID é a convenção própria do Felipe pra "já verifiquei manualmente" — não reaproveitar essa cor nem esse significado no Passo C.

**⚠️ Regra de "qual linha processar a seguir" — corrigida (10/08/2026):** o azul do Felipe foi marcado **antes** deste método existir — nunca passou pela determinação de status em Ads (Passo B). Pular linhas azuis faria essas linhas nunca receberem o tratamento validado. A regra correta: **pular SOMENTE células já coloridas com uma das cores novas por-grupo-de-SKU** (as cores geradas via HSL, uma por SKU, usadas desde que este método começou). Qualquer outra cor — o azul `RGB(66,133,244)`, dourado `RGB(255,217,102)`, dourado-claro `RGB(255,229,153)`, ou sem cor nenhuma — conta como "ainda não passou pelo método validado" e deve ser processada normalmente. Não precisa de nenhum tratamento especial por faixa de linha: como o Passo A busca o SKU e traz todos os MLBs do produto onde quer que estejam na planilha, e o Passo C colore com escopo "Pasta de trabalho" (planilha inteira), uma varredura sequencial simples aplicando essa regra já cobre o trabalho manual do Felipe espalhado por qualquer lugar da planilha, corrigindo/atualizando essas linhas pro método validado.

## Passo D — Escrever nas 2 páginas novas do Google Sheets

**Planilha:** "Planilha do Ads ML" (`https://docs.google.com/spreadsheets/d/1JI5kUj-F2D946GtH4U3REkryCqpXvacmFlKrn2QFdm8/`)

**Ordem de escrita obrigatória (decidido com o Felipe em 11/08/2026):** as linhas 2-91 e as 4 linhas isoladas 106, 107, 111 e 114 (dentro do intervalo 94-121, que também não passaram pelo método validado) precisam ser reprocessadas pelo método validado (Passo A/B/C) **antes** de qualquer escrita nas páginas do Google Sheets. Só depois disso entram os dados das linhas 92-144 (as 4 isoladas entram junto com o primeiro lote, não com o 92-144).

**"Título de catálogo" (coluna presente nas 2 páginas abaixo):** o título exato do produto como aparece na aba "Anúncios Patrocinados" do Mercado Livre, achado durante a busca por "MLB"+número no Passo B — **não** é o título da planilha de origem do Felipe. Motivo: Carlos e a moça do Ads não sabem buscar por MLB+número, então precisam do título exato do ML pra identificar o produto sem essa técnica. Não existe coluna "Título" (do texto livre da planilha de origem) em nenhuma das duas páginas — removida a pedido do Felipe em 11/08/2026.

**3ª página — nome exato da aba: `Prioridade - Fora de Ads`**
Colunas: `SKU | MLB(s) | Título de catálogo | Depósito (un) | FULL (un)`
Conteúdo: produtos ativos com status "Sem Campanha" (Passo B) — pra entrega ao Carlos e ao gerente de conta do Mercado Ads.

**4ª página — nome exato da aba: `Mapeamento Completo da Planilha`**
Colunas: `SKU | MLB(s) conhecidos | Título de catálogo | Status (Ativo/Pausado/Sem estoque) | Status em Ads (Ativa/Pausada/Sem Campanha)`
Conteúdo: todos os SKUs mapeados, sem exceção.

**Marcação de validação (obrigatória nas 2 páginas):** aviso fixo destacado no topo da página (célula/linha mesclada, formatação chamativa — cor de fundo diferente, negrito), em linguagem simples pra qualquer pessoa entender (o Carlos vê isso, não conhece o processo interno): `⚠️ Dados em validação — aguardando confirmação final` até o Felipe aprovar o lote, depois atualizado pra `✅ Dados confirmados`. **Nunca usar essa marcação como nome da aba** — só um aviso dentro da página.

**Procedimento seguro de criação de aba nova (validado de verdade em 10/08/2026, com teste real na planilha real):**

Correção sobre a versão anterior: clique direito numa aba **não** tem a opção "Inserir planilha" (o menu de contexto real de uma aba é: Excluir, Duplicar, Copiar para, Renomear, Alterar cor, Proteger página, Ocultar página, Ver comentários, Desvincular formulário, Mover). O botão certo foi achado via accessibility tree do Playwright (`page.getByRole('button', { name: 'Adicionar página' })`), não por CSS selector — o `aria-label` é **"Adicionar página"**.

1. Clicar no botão com `aria-label="Adicionar página"` (fica perto do canto inferior esquerdo, junto da lista de abas) — cria uma aba nova em branco (nome genérico tipo "Página3"), sem tocar nas existentes
2. Renomear a aba imediatamente: `dblclick()` no nome da aba → `Control+A` → digitar o nome definitivo → `Enter`
3. Nunca usar ações em massa que afetem "todas as planilhas" durante esse processo
4. Confirmar visualmente/via leitura (`page.locator('.docs-sheet-tab-name').allTextContents()`) que as abas existentes continuam intactas antes de prosseguir

**Como apagar uma aba (usado no teste, útil se precisar desfazer algo):** clique direito na aba → item de menu "Excluir" (`page.getByRole('menuitem', { name: /excluir/i })`) → confirmar no diálogo se aparecer.

**Teste real executado (10/08/2026):** abas antes = `["Produtos em Ads Atualmente", "Produtos Perdendo Catálogo em Ads"]` → clicou em "Adicionar página" → apareceu "Página3", as 2 originais continuaram intactas → renomeou pra "TESTE-apagar" → apagou via Excluir → estado final voltou exatamente igual ao original. Ciclo completo confirmado seguro.

---

## Cuidado com foco de janela

Mesma regra do `analise-acos-catalogo-mercadolivre.md`: nunca deixar a janela do Chrome (Modo Navegador) em primeiro plano além do momento inicial — minimizar sempre, conforme BLOCO 0-U/0-V do `CLAUDE.md`.

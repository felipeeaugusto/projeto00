# mapeamento-skus-ads-catalogo-mercadolivre

## Propósito

Procedimento validado para mapear os SKUs de uma planilha de produtos contra o Mercado Ads — descobrir os MLBs de cada SKU, confirmar se o produto está em Ads (Ativa/Pausada/Sem campanha), e marcar o progresso na própria planilha (Excel).

Depende do procedimento de conexão documentado em `modo-navegador-browser-access.md` (gatilho "Modo Navegador"). Reaproveita o Passo A do `analise-acos-catalogo-mercadolivre.md` (mapeamento de SKU/MLB). Validado em 08-10/08/2026 no projeto Karzen (planilha "ANÚNCIOS EM POTENCIAL - KARZEN ELETRO").

**⚠️ REGRA GERAL OBRIGATÓRIA (14/08/2026) — paciência e confirmação de carregamento, nunca tempo fixo curto:** todo passo deste documento (e do `mapeamento-pausados-campanha-mercadolivre.md`) que espera um clique gerar algum resultado na tela (abrir um menu, carregar uma página, atualizar uma listagem) DEVE confirmar que o resultado esperado realmente apareceu antes de prosseguir — nunca confiar cegamente num tempo fixo curto (`waitForTimeout` de 400ms/600ms/1500ms) como se fosse garantia de que a página carregou. Conexão de internet, cache do Chrome ou a página estar "muito cheia" (muitos anúncios, muitos elementos) podem tornar um tempo fixo insuficiente em momentos diferentes, mesmo pro mesmo tipo de ação. **Erro real que isso já causou (13-14/08/2026):** checagem via "Alterar" de 2 MLBs (`#3959996911`, `#5069321996`, SKU `MCT-25MM-BIV`) falhou com "não encontrou botão/item Alterar" — não porque o botão não existisse (ele existia, confirmado depois com mais tempo de espera), mas porque o script não esperou o suficiente antes de procurar. Regra prática: depois de qualquer clique que deveria abrir algo, checar se o elemento esperado apareceu; se não apareceu na primeira tentativa, **esperar mais e tentar de novo antes de concluir "não existe"** — nunca declarar ausência baseado só em não ter aparecido dentro de um tempo fixo curto. Trabalho **seguro e com dado real** vale mais que trabalho rápido — o próprio incidente que gerou a correção de todo o pipeline (dados errados da Sanduicheira, 52 minutos de rodada precisando ser refeitos) veio de pressa, não de complexidade.

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
4. Essa busca retorna todos os cards com aquele SKU (pode ser 1 ou mais — exemplo real validado: 2 cards, 4 MLBs no total; caso maior validado 13/08/2026, SKU `WW2-220V`/`WW2-127V` do produto "Aspirador extrator Tambor Wap Spot Cleaner W2 4.17L": também 2 cards por SKU, mas com **títulos diferentes entre os 2 cards do mesmo SKU** — não assumir que os cards de um mesmo SKU compartilham título). Cada card mostra seu próprio `SKU <valor>` ao lado dos MLBs dele.
5. **Verificação obrigatória, pra cada card retornado:** conferir que o texto `SKU <valor>` bate exatamente com o SKU buscado — só leitura do texto já visível na tela, nenhum clique necessário. Só os MLBs de cards com o SKU confirmado entram na lista final do produto.
6. **Rolar a página inteira dos resultados da busca por SKU, sempre (13/08/2026):** igual à regra já documentada pro drawer "Ver variações" do doc de campanhas — os resultados da busca por SKU também são carregados aos poucos, e um SKU pode ter mais de 2 cards. Nunca ler o resultado sem rolar até o fim primeiro.

## Passo A.1 — Identificar os MLBs de catálogo (Clássico/Premium) pra coluna "MLB's" (crítico, 12/08/2026)

**Objetivo:** a coluna "MLB's" da planilha final leva **sempre exatamente 2 MLBs por SKU** — o primeiro MLB de catálogo Clássico e o primeiro MLB de catálogo Premium (nunca a lista inteira de MLBs sincronizados, que pode ter 4, 6, 7 ou mais e fica ilegível). "Primeiro" aqui não é sobre estar Ativo/Inativo/Ganhando/Perdendo — é só sobre **ser genuinamente um MLB de catálogo** (Clássico ou Premium), independente do resultado da disputa.

**⚠️ Regra estrutural obrigatória (13/08/2026) — correspondência cabeçalho→bloco:** cada card de resultado da busca por SKU tem N MLBs no cabeçalho (ex: `#123`, `#456`) seguidos, mais abaixo, de N blocos de dados (preço/condição/você recebe/métricas/qualidade/experiência/status). **Os N MLBs correspondem, EM ORDEM, aos N blocos que seguem** — 1º MLB do cabeçalho → 1º bloco, 2º MLB → 2º bloco, etc. Essa correspondência vale sempre, mesmo quando o card tem mais de 2 MLBs. **Nunca delimitar/atribuir dados usando o número do MLB (`#\d+`) como marcador de fronteira de bloco** — menções como "Sincronizado com #X, #Y" aparecem *dentro* do bloco de dados de um MLB e são facilmente confundidas com o início do próximo MLB, cortando o bloco cedo demais e atribuindo dado errado (foi exatamente isso que gerou o erro original da Sanduicheira Kian Panini). Usar como marcador de início de bloco a sequência de preço+condição (`R$ <valor>` seguido de `em promoção a R$ <valor>` seguido de `Clássico`/`Premium`), que só ocorre no início de cada bloco de verdade.

**Caminho principal (checar primeiro, mais rápido):**

Com o SKU já buscado (Passo A), olhar a coluna **"Status e recomendações"** de cada MLB listado. Se aparecer, de forma explícita e chamativa, uma das 4 mensagens **GANHANDO / PERDENDO / COMPARTILHANDO / RESTRITO PARA GANHAR**, esse MLB **já é confirmado** como MLB de catálogo daquela condição (Clássico ou Premium) — não precisa abrir "Alterar" nem checar mais nada pra esse MLB. Exemplo real validado (SKU `HQ-264CVEFFX-127V`): `#4734441301` (Clássico) e `#4734430067` (Premium) mostram "PERDENDO" direto na lista.

**"Restrito para ganhar" (adicionado 12/08/2026):** significa que o MLB **é** de catálogo, mas está impedido de disputar com outros vendedores porque a Experiência de compra do vendedor está baixa (ex: 30) — não é uma categoria de "não é catálogo". Erro real: SKU `CKESSTC-ITA5Q` tinha 2 MLBs de catálogo genuínos (`#4277217107` Clássico, `#4277230155` Premium) mostrando "Restrito para ganhar", mas a extração automática só reconhecia GANHANDO/PERDENDO/COMPARTILHANDO — o SKU ficou com catálogo não confirmado até o Felipe apontar o caso. Corrigido no extrator (`extrator-catalogo-v2.js`).

**Caminho secundário (só quando NÃO aparece G/P/C na lista — geralmente Qualidade do anúncio em 30 ou 65, que esconde o badge):**

1. Pra cada MLB candidato daquela condição (Clássico ou Premium), na aba Anúncios já aberta: clicar nos **3 pontinhos ("Ações secundárias")** da linha específica daquele MLB → item **"Alterar"** do menu. **Limitação técnica confirmada (13/08/2026):** o item "Alterar" desse menu não é um link `<a href>` comum (0 elementos `<a>` encontrados via seletor mesmo com o menu certo aberto) — é navegado via JavaScript, então **não existe "abrir em nova guia" tecnicamente viável para esse menu específico** (botão direito não oferece essa opção num item que não é link de verdade). Clicar nele **navega a própria aba de Anúncios pra longe** da listagem/busca do SKU — não tem como evitar isso com esse componente. **Correção obrigatória pra não perder o estado:** depois de ler o resultado da página "Alterar", voltar a aba de Anúncios pro estado limpo (`goto` na URL de Anúncios) e **rebuscar o SKU do zero** antes de checar o próximo MLB candidato — nunca assumir que a busca anterior continua na tela. Localizar o botão de 3 pontinhos certo **pelo índice posicional** (0, 1, 2, 3... na ordem em que os MLBs aparecem nos cabeçalhos dos cards, de cima pra baixo, seguindo a regra de correspondência cabeçalho→bloco acima) — nunca por seletor de classe CSS tipo `ancestor::div[...]` (ver erro real documentado abaixo).
2. Ler a seção **"Concorrência no Mercado Livre"**:
   - **Não existe a seção:** esse MLB não é catálogo. Fechar a aba, testar o próximo candidato.
   - **A seção existe:** pode ser catálogo escondido — mas **não aceitar isso sozinho como confirmação** (ver regra obrigatória abaixo).
3. **Regra obrigatória, não é opcional (12/08/2026):** a seção "Concorrência no Mercado Livre" pode aparecer com o anúncio ganhador e várias opções de venda de **outros vendedores**, sem nenhuma garantia de que a nossa opção esteja entre elas — não é certeza que a nossa opção de venda (Clássico ou Premium) daquele SKU vai aparecer ali. Pra confirmar que uma das opções listadas é mesmo nossa, **comparar o preço mostrado em "Concorrência no Mercado Livre" com o preço daquele MLB na aba Anúncios** (mesma aba já reusada) — só aceitar o MLB como catálogo confirmado quando os preços baterem. Se nenhuma opção listada bater com o nosso preço, tratar como "não é catálogo nosso" e testar o próximo candidato.

   **O preço também revela o status real de um MLB "sem status" na listagem — não é só binário catálogo/pai (13/08/2026):** cada "Opção" dentro de "Concorrência no Mercado Livre" tem seu próprio preço e seu próprio resultado (GANHANDO/PERDENDO). A mensagem geral no topo da seção (ex: "Você está ganhando! Alcançou o nível máximo de visitas") se refere ao conjunto, não necessariamente ao MLB específico que abriu essa página — descobrir QUAL Opção é o MLB que está sendo checado exige casar o preço dela com o preço daquele MLB na aba Anúncios. Caso real validado (SKU `WW2-220V`, MLB `#4653317905`, Premium, aparecia só "-"/"Você está ganhando com outra opção de venda" na listagem, sem G/P/C explícito): a página "Alterar" desse MLB mostrava "Opção 1: Clássico, R$900, GANHANDO" e "Opção 2: Premium, R$726,56, PERDENDO" — o preço R$900 batia com o nosso próprio MLB Clássico de catálogo (`#4639741851`) e o R$726,56 batia com o próprio preço desse MLB (`#4653317905`) na aba Anúncios → Opção 2 = esse MLB → status real dele é **PERDENDO**, mesmo sem badge explícito na listagem. Sempre extrair esse status real via casamento de preço, nunca deixar como "sem status"/"-" quando a seção Concorrência existe.
4. Fechar a aba "Alterar" depois de cada checagem — nunca acumular abas, uma aberta e fechada por vez, sempre voltando pra mesma aba de Anúncios (mesmo padrão do Passo 4 do `analise-acos-catalogo-mercadolivre.md`).

**⛔ Erro real cometido (13/08/2026) — confirma por que a regra do item 1 é obrigatória:** durante a análise do produto "Aspirador extrator Tambor Wap Spot Cleaner W2 4.17L" (SKUs `WW2-127V`/`WW2-220V`), a automação clicou direto em "Alterar" (sem "abrir em nova guia"), navegando a própria aba de Anúncios pra longe da listagem — obrigando a rebuscar o SKU do zero a cada MLB checado (lento, e arriscado: mais chance de pegar o botão de 3 pontinhos errado a cada rebusca). Além disso, a primeira tentativa de escopar "o botão de 3 pontinhos da linha certa" usando `ancestor::div[contains(@class,"...main-row")]` com `.first()` pegou o **card inteiro** (2 linhas, Clássico+Premium) em vez da linha individual — porque o eixo XPath `ancestor::` retorna resultados em ordem de documento (do mais externo pro mais interno), então `.first()` pega o container mais externo, não o mais próximo. Isso fez a checagem de MLBs que são a "2ª linha" de um card (a Premium, quando Clássico vem primeiro) sempre abrir a página "Alterar" do MLB **errado** (o da 1ª linha do mesmo card) — 3 MLBs saíram classificados errado numa primeira passada, só corrigidos ao usar o índice posicional do botão (0, 1, 2, 3... na ordem em que os MLBs aparecem no cabeçalho de cada card) em vez de qualquer seletor por classe CSS ou proximidade de texto.

**O que NÃO conta como confirmação de catálogo, mesmo aparecendo sob "Concorrência no Mercado Livre":** mensagens como "Inativa", "Baixe seu preço", "Crie um vídeo", "Inativo sem estoque", "PREÇO ALTO" — só **Ganhando/Perdendo/Compartilhando** (ou preço batido, ver regra acima) confirmam catálogo. Esse foi um erro real cometido em 12/08/2026: extração automática lia "Ativa"/"Inativa" como critério, gerando resultado errado pra quase todos os SKUs de um lote inteiro — corrigido depois de conferência com o Felipe.

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

## Passo A.2 — Capturar Título de catálogo, Depósito/FULL e Status do Produto (12/08/2026)

Essas 3 informações vêm dos MLBs de catálogo já confirmados no Passo A.1 (Clássico e/ou Premium):

**Título de catálogo:** buscar `MLB<número>` na aba **Anúncios Patrocinados** (mesma página do Passo B) — o bloco `CATÁLOGO` do resultado mostra `#MLB<outro número, pode ser diferente do buscado> ORIGEM: PRÓPRIO`, seguido do **título exato** numa linha própria, antes de "Ver variações". Esse título é o que vai na coluna "Título de catálogo" — usar **quebra de linha dentro da célula** (`WrapText = true`) pra caber o texto sem precisar alargar a coluna.

**Depósito (un) e FULL (un):** vêm da aba **Anúncios** (Gestão de anúncios, mesma busca do Passo A/A.1) — no bloco de cada MLB, logo depois da descrição "Sincronizado" (quando existir) e antes do preço, aparecem as linhas:
```
Full:
sem estoque   (ou um número de unidades)
Depósito:
sem estoque   (ou um número de unidades)
```
Ler o valor de cada uma direto desse texto.

**⚠️ Normalizações obrigatórias na planilha final (12/08/2026), só pra Depósito e FULL — nunca pro Status do Produto:**
- Quando o valor lido for **"sem estoque"**, escrever **"-"** na célula do `Analise Oficial.xlsx` (nas 2 páginas) em vez do texto "sem estoque".
- Quando o valor lido for um número de unidades (ex: "1 un.", "416 un."), escrever **só o número** (`1`, `416`) — sem a palavra "un.".

Essas 2 regras não se aplicam ao Status do Produto: lá "Inativo sem estoque" continua contando como "Pausado" normalmente (ver regra abaixo), e não existe conceito de "un." nesse campo.

**⚠️ Cuidado com número com separador de milhar (12/08/2026):** valores como "4.332 un." têm ponto como separador de milhar (padrão BR), não separador decimal. Se o número for escrito na célula do Excel via COM só removendo a palavra "un." (ex: string "4.332"), o Excel interpreta o ponto como separador decimal e o valor vira **4,332 (quatro vírgula três três dois)** — um dado errado, silenciosamente. Sempre remover também os pontos de milhar antes de escrever (`4.332` → `4332`), nunca deixar o ponto na string passada pro Excel.

**Status do Produto (Ativo/Pausado):** é a **mesma informação** que já aparece perto de cada MLB de catálogo confirmado, na aba Anúncios (o mesmo texto usado no Passo A.1, ex: "Inativo sem estoque / Não há mais unidades à venda."). Regra de registro na célula:
- **"Inativo sem estoque" conta como Pausado** — não é uma categoria própria.
- Quando o SKU tem os 2 MLBs de catálogo (Clássico e Premium) com status diferentes entre si, escrever na célula sempre o que está **Ativo primeiro, Pausado depois**, com quebra de linha, ex:
  ```
  Ativo
  Pausado
  ```
- Se só 1 MLB de catálogo foi confirmado, ou os 2 têm o mesmo status, escrever só esse status uma vez.

**⚠️ Reordenação obrigatória em cascata (decidido com o Felipe, 12/08/2026):** quando o Status do Produto de Clássico e Premium é diferente, a ordem "Ativo primeiro" vale pra **todas** as colunas da mesma linha, não só pro Status — coluna "MLB's", Depósito e FULL também passam a listar primeiro o que corresponde à condição (Clássico ou Premium) que está Ativa. Isso mantém a correspondência posição-a-posição entre as colunas: a 1ª linha de MLB's, Depósito, FULL e Status sempre descreve a mesma condição (a que está Ativa). Quando os 2 têm o mesmo status (ou só 1 existe), a ordem padrão é Clássico primeiro, Premium depois — não há ambiguidade nesse caso.

**Caso raro — nenhum MLB de catálogo confirmado:** se, mesmo depois de checar o status "Restrito para ganhar" (ver Passo A.1 acima), nem o caminho 1 nem o caminho 2 conseguirem confirmar um MLB de catálogo Clássico ou Premium, apesar de MLBs sincronizados existirem: colunas "MLB's", "Título de catálogo", "Depósito", "FULL" e "Status do Produto" ficam todas com **"-"**; a coluna "Status em Ads" continua sendo preenchida normalmente (não depende de MLB de catálogo confirmado). **Antes de aceitar esse resultado como definitivo, conferir manualmente a "Status e recomendações" de cada MLB candidato** — o caso real que motivou esta nota (SKU `CKESSTC-ITA5Q`) parecia se encaixar aqui, mas na verdade tinha 2 MLBs de catálogo genuínos com "Restrito para ganhar", um status que a extração automática ainda não reconhecia na época.

## Passo C — Marcar o progresso na planilha (Excel)

**⚠️ Escopo corrigido (12/08/2026):** colorir **TODOS os MLBs sincronizados encontrados no Passo A** (a lista completa, depois de rolar a página inteira) — não só os 1-2 MLBs de catálogo confirmados no Passo A.1. O filtro de catálogo vale **somente** pra decidir o que entra na coluna "MLB's" da planilha final (Passo D) — a coloração na planilha de origem serve pra marcar "esta célula já foi processada pelo método validado", e isso vale pra qualquer MLB que apareça na busca do SKU, de catálogo ou não.

Pra cada MLB sincronizado encontrado de um SKU (Passo A):

1. No Excel, abrir **Localizar e Selecionar → Localizar...**
2. Clicar em **Opções >>**
3. Mudar o campo **"Em:"** de "Planilha" para **"Pasta de trabalho"** (busca a planilha inteira, não só a aba atual)
4. Digitar o número do MLB → **Localizar tudo**
5. Na célula do número (**só a célula**, não a linha inteira): abrir a opção de cor de preenchimento (ícone do balde) → clicar primeiro em **"Sem preenchimento"** (remove qualquer cor que já esteja lá, inclusive o azul `RGB(66,133,244)` do Felipe) → só depois aplicar a **cor definida pra esse grupo de SKU**. Nunca colorir por cima de uma cor existente sem limpar antes.
6. **Mesma cor para todos os MLBs de um mesmo SKU**, cor diferente por grupo de SKU (não é uma cor única de "verificado").

**Não confundir com a marcação histórica separada do Felipe:** o azul `RGB(66,133,244)` já usado em ~200 células da coluna Item ID é a convenção própria do Felipe pra "já verifiquei manualmente" — não reaproveitar essa cor nem esse significado no Passo C.

**⚠️ Implementação automatizada — usar busca nativa do Excel, nunca um laço manual (corrigido 11/08/2026):** a primeira versão automatizada deste passo percorria a planilha célula por célula num laço manual (`for` aninhado, lendo `.Cells.Item(linha, coluna).Text` uma a uma, ~19 mil vezes por MLB) — o Felipe identificou o erro comparando com o próprio jeito que ele faz na mão: os passos 1-4 acima (Localizar e Selecionar → Localizar → Pasta de trabalho → Localizar tudo) usam a **função de busca nativa do Excel**, muito mais rápida que qualquer laço escrito por fora. Essa mesma função nativa é acessível via COM (`Range.Find` / `Range.FindNext`) — é isso que a automação deve usar, nunca reescrever a busca na mão.

Padrão validado (11/08/2026, medido contra dado real — 4 MLBs de 1 produto: **249ms**, contra mais de 2 minutos do laço manual, mesmos endereços de célula encontrados nos dois métodos):

```powershell
$xlValues = -4163; $xlWhole = 1
$primeira = $ws.Cells.Find($mlb, [Type]::Missing, $xlValues, $xlWhole, [Type]::Missing, [Type]::Missing, $false, [Type]::Missing, [Type]::Missing)
if ($null -ne $primeira) {
    $endereco = $primeira.Address()
    $atual = $primeira
    do {
        $atual.Interior.ColorIndex = -4142   # Sem preenchimento primeiro
        $atual.Interior.Color = $corInt      # Depois a cor do SKU
        $atual = $ws.Cells.FindNext($atual)
    } while ($null -ne $atual -and $atual.Address() -ne $endereco)
}
```

`FindNext` avança pra próxima ocorrência e **dá a volta** (wrap-around) quando chega ao fim — por isso é obrigatório guardar o endereço da primeira ocorrência (`$endereco`) e parar o laço assim que `FindNext` voltar pra ele, senão gera loop infinito.

**Escopo "Pasta de trabalho":** o `Range.Find` do COM busca só na planilha (`Worksheet`) em que é chamado — não existe um equivalente direto de "toda a pasta de trabalho" num único `Find`. Hoje isso não importa na prática (o arquivo de trabalho só tem 1 aba, "SEM CAMPANHA") — mas se um dia existir mais de uma aba relevante, é preciso repetir o `Find`/`FindNext` pra cada `Worksheet` da pasta, não assumir que 1 chamada cobre tudo.

**Nunca introduzir cache ou índice entre produtos diferentes:** a correção acima troca só o *mecanismo* de busca (nativo em vez de laço manual) — continua buscando no dado real da planilha a cada MLB, sempre. Nenhum índice construído uma vez e reaproveitado entre produtos — isso mantém a mesma garantia de segurança que já existia (nunca usar dado "velho" de um índice desatualizado).

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

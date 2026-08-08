# analise-acos-catalogo-mercadolivre

## Propósito

Procedimento validado para identificar produtos com ACOS ≥ X% numa Campanha do Mercado Ads, mapear seus SKUs/MLBs, e confirmar status de catálogo (Ganhando/Perdendo/Compartilhando) de cada um — inclusive quando o status está **escondido** pela própria interface do Mercado Livre.

Depende do procedimento de conexão documentado em `modo-navegador-browser-access.md` (gatilho "Modo Navegador"). Validado em 04/08/2026 no projeto Karzen (Curva A, Curva B, AVA PERFORMANCE).

**Regra geral obrigatória: nunca confiar em atalho — sempre confirmar via aba Anúncios/página "Alterar" antes de aceitar qualquer status de catálogo como certo.** Nenhuma fonte isolada (painel de variações da Campanha, badge visto de relance, memória de uma checagem anterior) é suficiente sozinha — o dado só é aceito depois de verificado na aba Anúncios (Passo 3) ou, se escondido lá, na página "Alterar" (Passo 4). Dá mais trabalho, mas é a única forma de não reportar status errado.

---

## Passo 1 — Extrair ACOS de todos os produtos da Campanha

1. Abrir aba **nova** com a URL do dashboard da campanha (nunca reaproveitar aba antiga parada há muito tempo — abas em segundo plano por tempo longo têm renderização suspensa pelo Chrome e travam `screenshot()`; abrir fresca e fechar a antiga resolve)
2. Confirmar visualmente (screenshot) que o nome da campanha e o período de datas batem com o esperado antes de confiar nos dados
3. Extrair o texto da página (`innerText('body')`) e parsear por produto

**Parser de ACOS — regras obrigatórias (cada uma corrigiu um bug real):**
- Pular linhas de rótulo (`N variações`, `(N não se pode/podem mostrar)` — **aceitar singular E plural**, `PAUSADO`, `ATIVO`) usando um loop que avança até encontrar a primeira linha que **parece um valor de métrica de verdade** (número, `R$ valor`, `-`, `Nx`, `N%`) — não presumir que o rótulo seguinte ao nome do produto é sempre `variações`
- As 9 colunas na ordem fixa: Impressões, ROAS, Cliques, Custo por clique, Vendas atribuídas, Receita, Investimento, ACOS, TACOS
- Produtos pausados/sem investimento mostram `-` no ACOS quando o parser está correto; se aparecer `R$ 0` ou qualquer valor monetário na posição do ACOS, é sinal de desalinhamento — não confiar, investigar antes de reportar

## Passo 2 — Mapear variações de um produto qualificado

1. Localizar a linha do produto pelo `#MLB` âncora exato (nunca por busca de texto solto — pode clicar no produto vizinho errado)
2. Usar a caixa de busca da própria campanha ("Procurar por # ou título") + Enter — mais confiável que rolar até a linha certa numa lista longa/virtualizada
3. Fechar qualquer drawer/painel que tenha sobrado de uma consulta anterior antes de continuar
4. Clicar em "N variações", rolar o painel (`mouse.wheel`) até o número de MLBs únicos estabilizar, e **cruzar contra o total declarado** ("N variações (M não se pode/podem mostrar)" → **esperado N, não N-M** — ver correção abaixo, 08/08/2026) — se o número não bater com N, não confiar na lista, investigar antes de prosseguir

**⚠️ Correção crítica sobre "(M não se pode/podem mostrar)" (08/08/2026):** essa mensagem **NÃO significa que M variações estão faltando no painel**. As **N variações completas existem e devem aparecer todas** ao rolar o painel até o fim. A mensagem é sobre **Ads (anúncio patrocinado) na busca do Mercado Livre**: para M dessas variações, o Mercado Livre não está exibindo o anúncio com a marcação "AD"/"Ad" no topo dos resultados de busca — o anúncio ainda existe e aparece "naturalmente" mais abaixo (fim da primeira página ou páginas seguintes), só não está sendo promovido via Ads no momento. Essas M variações "sem Ads" podem pertencer ao mesmo SKU entre si, a SKUs diferentes, ou uma combinação — isso só é descoberto depois, MLB por MLB, no Passo 3. **Checagem correta:** contar N variações completas no painel (não N-M); se faltar alguma das N, investigar antes de prosseguir.

**⚠️ Cada `#`/MLB dentro do mesmo painel de "N variações" pode ter um SKU diferente dos outros.** Não presumir que todos os MLBs listados nas variações de um produto resolvem pro mesmo SKU — cada um precisa ser verificado individualmente na aba Anúncios (Passo 3) antes de agrupar.

## Passo 3 — Determinar SKU e status de catálogo de cada MLB

**⚠️ Regra obrigatória — UMA ÚNICA aba de Anúncios pra todo o Passo 3 (crítica, 07/08/2026):** abrir a aba de Anúncios **uma vez só**, no início do Passo 3, e **reusar essa mesma aba** pra todas as buscas (por MLB, depois por SKU) de **todos os produtos qualificados de todas as campanhas** — nunca abrir uma aba de Anúncios nova a cada MLB. Abrir aba nova por MLB consome memória à toa (RAM do PC do Felipe) e é ineficiente — o volume de produtos qualificados numa análise real pode passar de 15-20, e cada aba extra é desperdício puro. A única aba nova permitida durante o Passo 3 é a do "Alterar" (ver Passo 4), que é temporária e fechada logo em seguida, sempre voltando pra essa mesma aba de Anúncios reusada.

0. **Bug crítico de seleção de aba (04/08/2026):** ao localizar a aba de Anúncios via `url.includes('mercadolivre.com.br/anuncios')`, isso também bate com a URL da página **"Alterar"** (`mercadolivre.com.br/anuncios/MLBU.../modificar/...`), porque `/modificar/` também está sob o path `/anuncios/`. Sempre exigir o `?` logo depois de `/anuncios` na checagem: `/mercadolivre\.com\.br\/anuncios\?/.test(url)`. Sem essa correção, scripts pegam a aba errada (uma "Alterar" antiga) e falham silenciosamente ou dão timeout — sintoma: "aba de Anúncios sumiu" repetidamente mesmo sem ela ter sido fechada de verdade.
1. Na aba Anúncios (a mesma, reusada), buscar por `MLB<número>` — pode redirecionar pra um MLB "pai" diferente (variação sem anúncio próprio) ou pra um card tipo **"Family"** (ID gigante, sem linha de SKU simples, mostra faixa de preço agregada) — nesse caso **clicar na setinha pra baixo pra expandir o card e achar o SKU do produto ali dentro**. Casos observados: um MLB pode não ter card próprio acessível nenhum (nem busca direta, nem dentro do Family expandido) — corresponde exatamente à variação "(N não se pode/podem mostrar)" contada no produto; quando isso acontecer, tratar como não verificável e excluir da planilha (não é o mesmo que "sem disputa" — é "não checável" pela interface).
2. **Assim que achar o SKU (seja direto na busca por MLB, seja dentro do card Family), pesquisar por esse SKU** (não continuar pelo MLB) — isso abre a visão completa do anúncio, mostrando de uma vez **todos os MLBs daquele produto** (Clássico e Premium, por exemplo). Cruzar esses MLBs contra os já mapeados no Passo 2 (dentro de "variações" na Campanha) — se baterem, não precisa abrir cada MLB da variação individualmente de novo, a busca por SKU já cobre todos eles junto.
3. Dentro de um mesmo card de anúncio, cada condição (Clássico/Premium) tem seu **próprio bloco terminando em "Pausar anúncio"** — não cortar no primeiro "Pausar anúncio" (corta só a primeira condição e perde a segunda)
4. Status possíveis a registrar na planilha: **Ganhando**, **Perdendo**, **Compartilhando** (concorrendo com condições iguais a outro vendedor). Qualquer outra mensagem ("Baixe seu preço", "Crie um vídeo", "Inativo sem estoque", "Adicione preços de atacado", **"PREÇO ALTO"** etc.) **não é status de catálogo** — não registrar, tratar como "sem disputa ativa", mesmo que apareça sob o título "Concorrência no Mercado Livre" na página "Alterar" (esse título aparece também pra avisos de preço, não só pra Ganhando/Perdendo)

**⚠️ Exceção crítica — "Você está ganhando com outra opção de venda" NÃO é "sem disputa" (08/08/2026):** essa mensagem específica, vista na lista de Anúncios no lugar do badge, **não significa que a condição sem badge está livre de disputa** — ela pode estar **escondendo um PERDENDO real** daquela condição especificamente. **Caso real (Campanha Em Alta, SKU `PAC12QB-220V-CONJ`):** a lista de Anúncios mostrava Clássico com badge "GANHANDO" normal, e Premium só com a frase "Você está ganhando com outra opção de venda" (sem badge) — parecia "sem disputa" pro Premium. Abrindo a página "Alterar" (Passo 4), apareceu o resultado real: Opção 1 Clássico = **GANHANDO**, Opção 2 Premium = **PERDENDO**. Ou seja, a frase aparece quando pelo menos UMA das condições já está ganhando, e resume a situação de forma otimista — mas não garante que a OUTRA condição também esteja bem. **Regra:** sempre que essa frase aparecer (em vez de um badge GANHANDO/PERDENDO limpo), tratar como "status desconhecido, não como sem disputa" e confirmar via Passo 4 antes de excluir da planilha.
5. **Quando 2 MLBs aparecem juntos no mesmo card** (ex: `#4183974081` e `#4184012787` listados um embaixo do outro, produto "Sincronizado"), cada MLB normalmente corresponde a **uma condição de venda diferente** (um é Clássico, o outro é Premium) — não presumir qual é qual pelo texto da busca em Anúncios (a ordem visual não é confiável). Abrir a página **"Alterar"** de qualquer um dos dois MLBs — ela mostra "Opção 1 | Clássico e Frete grátis" / "Opção 2 | Premium e Frete grátis" com o **`#MLB` exato de cada opção listado logo abaixo** (`#4183974081` sob "Opção 1", etc.) — essa é a única fonte confiável pra mapear MLB→condição com certeza.

## Passo 4 — Quando o catálogo NÃO aparece de forma explícita (regra crítica)

**A lista normal de Anúncios pode esconder o badge de Ganhando/Perdendo quando a Qualidade do anúncio está em certos níveis (observado em 30 e 65).** Isso não significa que o anúncio não está competindo — o dado só não é mostrado nessa tela. **Importante (08/08/2026):** essa correlação com Qualidade 30/65 não é uma regra confiável — já foram observados anúncios em Qualidade 30 e 65 mostrando o badge normalmente, e outros na mesma Qualidade escondendo. Não usar a Qualidade pra prever se o badge vai aparecer ou não — a única forma de saber é checando.

**Gatilho do Passo 4 não é só "nenhum badge apareceu"** — também se aplica sempre que aparecer a frase **"Você está ganhando com outra opção de venda"** no lugar do badge de uma condição (ver exceção crítica no Passo 3, item 4) — essa frase pode estar escondendo um PERDENDO real daquela condição.

**É normal um produto não ter NENHUMA disputa de catálogo ativa** — nem Clássico nem Premium, ou só uma das duas condições. Depois de checar via "Alterar" (abaixo) e confirmar que não existe seção "Concorrência no Mercado Livre" nenhuma, isso é um resultado válido, não um erro de processo — não insistir tentando achar status onde genuinamente não tem. Excluir esse MLB da planilha (ver Passo 5).

Quando isso acontecer (nenhum MLB do SKU mostra Ganhando/Perdendo/Compartilhando na busca normal — ou mostra a frase ambígua acima —, mas o produto tem ACOS relevante o suficiente pra fazer sentido investigar mais fundo):

1. Voltar na Campanha e pegar **todos os MLBs que pertencem àquele produto especificamente na Campanha** (os mesmos já mapeados no Passo 2 — não abrir MLBs de fora da Campanha)
2. Pra cada um desses MLBs, na aba Anúncios (a mesma aba reusada do Passo 3): clicar nos **3 pontinhos ("Ações secundárias")** do anúncio → **"Alterar"** (não "Ir para página de produto" — isso é outra coisa, mostra a página pública do anúncio, não o painel de concorrência)
3. Abrir o "Alterar" numa **aba nova separada, sem nunca navegar a aba de Anúncios atual pra longe** (perderia a busca/listagem que estava aberta): manualmente, isso é clicar com o **botão direito em "Alterar"** e escolher **"Abrir link em uma nova guia"** no menu de contexto (não clicar normal); via script, é pegar o **link (href)** do "Alterar" e abrir numa aba nova pelo Playwright. Os dois fazem a mesma coisa — nunca deixar o clique padrão navegar a aba atual.
4. Na página "Alterar", a seção **"Concorrência no Mercado Livre"** mostra o status real (GANHANDO/PERDENDO) por opção de venda (Clássico/Premium), mesmo quando escondido na lista
5. Ler, fechar a aba, e voltar pra aba de Anúncios original (confirmar que ela ainda existe antes de seguir pro próximo MLB — abrir de novo se tiver sumido)
6. Repetir pra cada MLB do produto — cada MLB é uma linha própria na planilha

**⚠️ Cuidado extra — confirmar que o preço do badge é mesmo nosso (08/08/2026):** o preço mostrado ao lado do badge GANHANDO/PERDENDO na página "Alterar" pode não ser o nosso — pode ser o preço de outro vendedor concorrendo naquela mesma condição, o que pode levar a uma leitura errada da disputa. Pra confirmar com certeza que o preço é nosso, quando houver dúvida:
   1. Clicar no **título** do anúncio dentro da página "Alterar" — abre automaticamente uma aba nova com a página pública do produto no Mercado Livre
   2. Nessa página pública, **selecionar a voltagem/variação certa** antes de olhar qualquer preço (sem isso, o preço mostrado pode ser de outra variação)
   3. Descer até **"Opções de compra"** (aparece quando existem múltiplos vendedores pro mesmo produto) — mostra a lista completa de vendedores com preço, condição de parcelamento e nome
   4. Conferir se o preço batido contra o badge (GANHANDO/PERDENDO) bate com um dos preços listados como **KARZEN ELETRO** — só então o status pode ser aceito com certeza
   5. Fechar essa aba extra e voltar pro fluxo normal (Alterar → Anúncios)

**⚠️ Regra crítica — um SKU pode ter MAIS de 1 MLB com status de catálogo na mesma condição, ao mesmo tempo.** Não presumir que existe só 1 anúncio "Ganhando"/"Perdendo" por condição (Clássico ou Premium) por SKU — a checagem via "Alterar" pode revelar 2 (ou mais) MLBs escondidos com status simultâneo. **Caso real (04/08/2026, Campanha AVA PERFORMANCE, SKU `GTW20-127V`):** checando MLB por MLB via "Alterar", apareceram **2 MLBs diferentes, ambos "Clássico = Ganhando"** ao mesmo tempo (`#5715849724` e `#5719134834`), além de um terceiro "Premium = Perdendo" (`#5719186698`) — resultado final: **3 linhas na planilha**, não 1. Cada MLB com status vira sua própria linha, mesmo que o status e a condição se repitam entre eles.

## Passo 5 — Escrever na planilha

Ver `feedback_excel_preservar_formatacao.md` (memória) pra regras de formatação. Resumo:
- `exceljs`, nunca `xlsx`/SheetJS
- Só `.value` em endereços de célula específicos, nunca recriar a `worksheet`
- Colunas: SKU, CAMPANHA (repetida em cada linha, sem mesclar — decisão do Felipe), MLB, Catálogo Clássico, Catálogo Premium, ACOS, Título/Na Campanha (mesclada por produto)
- `wrapText: true` em títulos grandes (coluna M) sempre que o texto não couber
- Verificar se o arquivo está aberto no Excel (erro `EBUSY`) antes de escrever — pedir pra fechar, nunca forçar

---

## Cuidado com foco de janela (crítico)

Ao longo dessas verificações (muitos cliques, abas novas), a janela do Chrome pode aparecer em primeiro plano sem querer. **Antes de investigar qual ação específica causou isso, checar se existe uma segunda janela do Chrome solta, sem `--remote-debugging-port` — não conectada à automação — que pode estar se confundindo com a de trabalho.** Ver `modo-navegador-browser-access.md`, seção "Riscos conhecidos", pra detalhes e comando de diagnóstico.

**Qualquer script que use `page.bringToFront()`** (necessário pra screenshot ou alguns cliques em painel) **DEVE minimizar de volta dentro do mesmo script, com a rotina reforçada de `minimize-chrome.js`** — ver `modo-navegador-browser-access.md`, seção "Uso de bringToFront() — regra obrigatória". Nunca minimizar como comando separado depois: cria uma brecha onde a tela fica visível até a próxima chamada de ferramenta.

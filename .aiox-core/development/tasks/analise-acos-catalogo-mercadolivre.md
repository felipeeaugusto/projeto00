# analise-acos-catalogo-mercadolivre

## Propósito

Procedimento validado para identificar produtos com ACOS ≥ X% numa Campanha do Mercado Ads, mapear seus SKUs/MLBs, e confirmar status de catálogo (Ganhando/Perdendo/Compartilhando) de cada um — inclusive quando o status está **escondido** pela própria interface do Mercado Livre.

Depende do procedimento de conexão documentado em `modo-navegador-browser-access.md` (gatilho "Modo Navegador"). Validado em 04/08/2026 no projeto Karzen (Curva A, Curva B, AVA PERFORMANCE).

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
4. Clicar em "N variações", rolar o painel (`mouse.wheel`) até o número de MLBs únicos estabilizar, e **cruzar contra o total declarado** ("N variações (M não se pode/podem mostrar)" → esperado N-M) — se o número não bater, não confiar na lista, investigar antes de prosseguir

## Passo 3 — Determinar SKU e status de catálogo de cada MLB

1. Na aba Anúncios, buscar por `MLB<número>` — pode redirecionar pra um MLB "pai" diferente (variação sem anúncio próprio) ou pra um card tipo **"Family"** (ID gigante, sem linha de SKU simples, mostra faixa de preço agregada) — nesse caso expandir o card e localizar a linha exata do MLB alvo
2. Buscar pelo SKU encontrado pra ver todos os anúncios relacionados de uma vez (evita repetir buscas por MLB individualmente quando vários MLBs resolvem pro mesmo SKU)
3. Dentro de um mesmo card de anúncio, cada condição (Clássico/Premium) tem seu **próprio bloco terminando em "Pausar anúncio"** — não cortar no primeiro "Pausar anúncio" (corta só a primeira condição e perde a segunda)
4. Status possíveis a registrar na planilha: **Ganhando**, **Perdendo**, **Compartilhando** (concorrendo com condições iguais a outro vendedor). Qualquer outra mensagem ("Baixe seu preço", "Crie um vídeo", "Inativo sem estoque", "Adicione preços de atacado" etc.) **não é status de catálogo** — não registrar, tratar como "sem disputa ativa"

## Passo 4 — Quando o catálogo NÃO aparece de forma explícita (regra crítica)

**A lista normal de Anúncios pode esconder o badge de Ganhando/Perdendo quando a Qualidade do anúncio está em certos níveis (observado em 30 e 65).** Isso não significa que o anúncio não está competindo — o dado só não é mostrado nessa tela.

Quando isso acontecer (nenhum MLB do SKU mostra Ganhando/Perdendo/Compartilhando na busca normal, mas o produto tem ACOS relevante o suficiente pra fazer sentido investigar mais fundo):

1. Voltar na Campanha e pegar **todos os MLBs que pertencem àquele produto especificamente na Campanha** (os mesmos já mapeados no Passo 2 — não abrir MLBs de fora da Campanha)
2. Pra cada um desses MLBs, na aba Anúncios: clicar nos **3 pontinhos ("Ações secundárias")** do anúncio → clicar em **"Alterar"** (não "Ir para página de produto" — isso é outra coisa, mostra a página pública do anúncio, não o painel de concorrência)
3. Pegar o **link (href)** do "Alterar" e abrir numa **aba nova separada** (nunca deixar o clique navegar a aba de Anúncios atual — perde a busca/listagem que estava aberta)
4. Na página "Alterar", a seção **"Concorrência no Mercado Livre"** mostra o status real (GANHANDO/PERDENDO) por opção de venda (Clássico/Premium), mesmo quando escondido na lista
5. Ler, fechar a aba, e voltar pra aba de Anúncios original (confirmar que ela ainda existe antes de seguir pro próximo MLB — abrir de novo se tiver sumido)
6. Repetir pra cada MLB do produto — cada MLB é uma linha própria na planilha (mesmo que dois MLBs do mesmo SKU estejam ambos "Ganhando", por exemplo — registrar os dois separadamente)

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

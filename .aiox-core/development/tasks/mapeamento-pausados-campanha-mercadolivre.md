# mapeamento-pausados-campanha-mercadolivre

## Propósito

Mapear todos os produtos **pausados dentro de cada Campanha de Mercado Ads** (não confundir com "Sem Campanha", que é o escopo do `mapeamento-skus-ads-catalogo-mercadolivre.md`). Pedido feito pelo Carlos numa reunião com o Felipe e a Mariana (nova responsável pelo Ads), em 12/08/2026. Planilha de destino: `Pausados em Campanha - Karzen.xlsx` (`C:\Downloads\`), estrutura definida via `*elicit` do @analyst no mesmo dia — 11 colunas: Campanha | Título na Campanha | SKU | Catálogo Clássico | Catálogo Premium | Depósito (un) | FULL (un) | Qualidade do anúncio | Experiência | Status do Produto | Status na Campanha.

Depende do procedimento de conexão `modo-navegador-browser-access.md` e reaproveita Passo A/A.1/A.2 do `mapeamento-skus-ads-catalogo-mercadolivre.md` (mesma lógica de confirmação de catálogo Clássico/Premium, incluindo GANHANDO/PERDENDO/COMPARTILHANDO/RESTRITO PARA GANHAR).

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

**⚠️ Essa página NÃO mostra o SKU.** Diferente da aba Anúncios (Gestão de anúncios), a página de Anúncios Patrocinados dentro da campanha não tem a informação `SKU <valor>` nenhuma vez no texto — é preciso buscar o MLB encontrado aqui na aba Anúncios pra descobrir o SKU (mesmo padrão reverso já usado nas linhas 2, 4, 25-91: buscar o número puro do MLB, ler `SKU <valor>` do card retornado).

**⚠️ Nem todo MLB pausado é buscável direto na aba Anúncios.** Caso real: `#MLB25543184` (Aspirador Philco PAS1450C, pausado em `[ML] [BAIXA PERFORMANCE]`) retornou **0 anúncios** ao buscar o número puro (com ou sem prefixo `MLB`) na aba Anúncios — provavelmente uma variação "não se pode mostrar" sem card próprio acessível (mesmo caso-limite já documentado no `analise-acos-catalogo-mercadolivre.md`, Passo 3). Tratar como "não verificável" quando isso acontecer, não insistir.

## Passo B — Qualidade e Experiência (novo, 12/08/2026)

Essas 2 informações aparecem na aba **Anúncios** (Gestão de anúncios), colunas da própria tabela — cabeçalho real da tabela: `Anúncio | Preço | Condições | Você recebe | Métricas últ. 7 dias | Qualidade | Experiência | Status e recomendações`.

No texto puro da página (`innerText`), o valor de cada MLB aparece assim, logo antes do status de catálogo:
```
<numero Qualidade>
<subtítulo Qualidade, ex: "3 objetivos">
<numero Experiência>
<subtítulo Experiência, ex: "Com problemas">

<GANHANDO|PERDENDO|COMPARTILHANDO|RESTRITO PARA GANHAR — se houver>
```
Exemplo real validado (SKU `MPN-01-BF-127V`, MLB `#4719874527`): Qualidade = `67` (subtítulo "3 objetivos"), Experiência = `75` (subtítulo "Com problemas"), status = `PERDENDO`.

**Ainda não validado em lote:** só 1 exemplo conferido até agora. Antes de rodar em produção, confirmar o regex de extração contra pelo menos 3-4 produtos diferentes (subtítulos podem variar — "Excelente", "Com problemas", outros ainda não vistos) pra não quebrar em casos com texto diferente de "3 objetivos"/"Com problemas".

## Passo C — Cruzar com o restante do mapeamento

Depois de achar o SKU (Passo A + busca reversa), reaproveitar integralmente:
- **Passo A (do outro doc)** — buscar o SKU, rolar a página inteira, achar `todosMlbsSincronizados`
- **Passo A.1** — confirmar Catálogo Clássico/Premium (caminho 1: status GANHANDO/PERDENDO/COMPARTILHANDO/RESTRITO PARA GANHAR; caminho 2: comparação de preço via "Alterar")
- **Passo A.2** — Depósito/FULL/Status do Produto

## Passo D — Escrever na planilha (`Pausados em Campanha - Karzen.xlsx`)

- **Uma linha por SKU** (não por MLB) — se um produto pausado na campanha tiver mais de 1 SKU associado (caso "N variações"), cada SKU vira uma linha, com a coluna "Título na Campanha" **mesclada** (célula Excel mesclada verticalmente) cobrindo todas as linhas dos SKUs daquele mesmo produto — mesma técnica já usada na `Carlos Analise.xlsx` em 04-05/08/2026 (16 mesclagens de título).
- **Catálogo Clássico** e **Catálogo Premium**: colunas separadas (diferente do "MLB's" único do outro documento). Cada uma leva o MLB confirmado daquela condição; se houver mais de 1 MLB de catálogo da mesma condição pro mesmo produto, colocar na quebra de linha logo abaixo, usando "+" pra separar (ex: `#123 + #456`) — único lugar do projeto onde "+" continua em uso (foi removido do "MLB's" do `Analise Oficial.xlsx`, mas aqui o Felipe pediu explicitamente esse formato).
- **Regra do "-":** mesma convenção já validada — Depósito/FULL "sem estoque" ou ausente → "-"; Catálogo Clássico/Premium sem MLB confirmado → "-".
- **Status na Campanha:** sempre "Pausado" (é o filtro usado pra montar essa planilha).
- **Organização visual:** igual às 2 páginas do `Analise Oficial.xlsx` — banner de validação mesclado, cabeçalho, linhas de dado/espaçador alternadas, larguras de coluna fixas por coluna (não o padrão "8.43 default" — usar largura proporcional ao conteúdo esperado de cada coluna).

## Pendências antes de rodar em produção completa

1. Validar o regex de Qualidade/Experiência contra mais exemplos (só 1 confirmado)
2. Decidir o que fazer quando um MLB pausado não é buscável na aba Anúncios (caso `#MLB25543184`) — registrar como "não verificável" e seguir, ou tentar via "Alterar"?
3. Confirmar se "N variações" (agrupamento por produto-campanha) precisa de um passo específico de detecção, ou se cada MLB pausado já vem individualmente e o agrupamento só acontece quando 2+ SKUs diferentes compartilham o mesmo "Título" na campanha

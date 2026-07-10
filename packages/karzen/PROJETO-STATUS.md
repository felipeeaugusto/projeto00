# Karzen — Caderno do Projeto

**Projeto:** Karzen
**Objetivo:** Desenvolver agentes de IA e squads de IA para mapear produtos e ações de Publicidade dentro do Mercado Livre (conta Karzen)
**Fase atual:** Início — estruturação do projeto

---

## PENDÊNCIAS ATUAIS

⚠️ Nota: as pendências abaixo (sessão 02/07/2026) são de uma frente sem relação com o Mercado Livre — a agência de marketing do primo do Felipe (EUA, nicho SPA/salão). Registradas aqui a pedido do Felipe, na ausência de um caderno próprio para essa frente.

🔴 Prioridade Máxima:
- @aiox-master — investigar em todas as configurações do caderno/manual (CLAUDE.md, MANUAL.md, rules/) se já existe uma regra de alta prioridade proibindo QUALQUER agente de inventar informação; se não existir com força suficiente, criar e registrar essa regra — pedido feito por Felipe de forma preventiva/geral (independente de caso específico) (a acionar quando Felipe disser "chame o Orion")
  - CONTEXTO (resolvido): a dúvida que originou o pedido foi sobre os 28 SKUs do dashboard-karzen-ads.html (sessão 03/07/2026) — @dev re-verificou em 06/07/2026 contra a planilha real em `C:\Downloads\ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1).xlsx` (aba "SEM CAMPANHA", 736 linhas) e os 28 SKUs batem 100% com a coluna "Item ID". Não houve invenção neste caso — a planilha só não tinha sido localizada na primeira varredura (estava em C:\Downloads, fora das pastas padrão) e a coluna se chama "Item ID", não "SKU", o que gerou a confusão inicial do Felipe
- @hormozi-offers — estruturar a oferta da agência do primo pro nicho SPA/salão (garantia, bônus, resultado prometido), com Felipe e o primo trazendo os fatos reais do negócio
- Configurar Pixel + evento de conversão no formulário Lovable antes do lançamento da campanha de segunda-feira (bloqueio crítico identificado em elicitação estratégica)

🟡 Prioridade Normal:
- Depois da oferta definida: cadastrar Cliente no FuncionarIA (funcionaria.ai) com a oferta estruturada no campo Base de Conhecimento
- @hormozi-copy — definir persona e tom de voz da campanha
- @hormozi-ads — direção de criativo dos anúncios
- @dev — decidir e ajustar o rótulo "SKU" no dashboard-karzen-ads.html: manter "Item ID (Mercado Livre)" só renomeando o rótulo, extrair também o código de modelo do fabricante (ex: EMG70-220V) de dentro do título de cada produto e mostrar os dois, ou outra abordagem — Felipe ainda não escolheu entre as 3 opções apresentadas (sessão 06/07/2026)
- @analyst — fechar com Felipe o conteúdo do relatório/PDF pra pessoa que cuida do Ads da Karzen no Mercado Livre: falta responder se o relatório é pra ela decidir onde investir ads ou é só inventário informativo, se há dado de margem de lucro por produto disponível, e se "o patrão" do Felipe é essa mesma pessoa ou alguém acima dela (sessão 06/07/2026, detalhada em 10/07/2026)
- @analyst — cruzar a coluna "Stock" da planilha `ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1).xlsx` com o relatório `Relatorio_desempenho_publicacoes_2026_06_10-2026_07_10.xlsx` (por ID do anúncio), e Felipe precisa exportar os relatórios equivalentes de 15 e 7 dias — necessário pra calcular velocidade de venda e estoque restante dos 696 produtos (sessão 10/07/2026)
- @analyst — Felipe precisa decidir qual caminho de classificação Curva A/B/C adotar pros 696 produtos: Pareto por receita, Giro (vendas ÷ estoque), Score composto, ou Híbrido — opções levantadas na elicitação avançada de 10/07/2026, nenhuma escolhida ainda

🔵 Pode deixar pra depois:
- (a preencher conforme o projeto avançar)

---

## ÚLTIMAS 3 SESSÕES

> Sessões mais antigas em `HISTORICO-SESSOES.md`.

### SESSÃO — 03/07/2026

**O QUE FOI FEITO:**
- @dev adicionou os SKUs (Item ID do Mercado Livre) de 28 produtos ao dashboard-karzen-ads.html (Downloads), cruzando com a planilha Excel "ANÚNCIOS EM POTENCIAL - KARZEN ELETRO" aberta no PC — dashboard passa a permitir localizar cada produto direto no Mercado Livre
- Tentativa de criar um dashboard v2 inspirado num post da "Comunidade Sobral" (Facebook) barrada por bloqueio de segurança do Edge/Chromium — a porta de depuração remota (CDP) não abre no perfil padrão do navegador em versões recentes
- Identificada solução: criar um perfil separado do Edge (fora do perfil real do Felipe) para persistir o login da comunidade sem tocar no perfil principal — explicada a segurança da abordagem, ainda aguardando decisão do Felipe para executar
- Auditoria profunda de fim de sessão (leitura linha a linha do JSONL, cruzamento com git, verificação de arquivos em disco) — confirmado que nada se perdeu; único ponto de atenção: dashboard-karzen-ads.html fica em Downloads, fora do repositório git, sem backup

**O QUE O FELIPE PEDIU:**
- Adicionar os SKUs dos produtos do dashboard, puxando da planilha Excel aberta
- Criar um dashboard v2 inspirado visualmente num post de exemplo da Comunidade Sobral, navegando os comentários do post pra descobrir e pesquisar a plataforma usada por quem fez aquele dashboard
- Auditoria profunda de fim de sessão antes de fechar o terminal e desligar o PC

**PAROU EM:** Aguardando decisão do Felipe sobre criar o perfil separado do Edge para logar na Comunidade Sobral e retomar a construção do dashboard v2 | Agente ativo: aiox-master

---

### SESSÃO — 06/07/2026

**O QUE FOI FEITO:**
- @dev investigou a origem dos 28 SKUs no dashboard-karzen-ads.html — inicialmente a planilha "ANÚNCIOS EM POTENCIAL - KARZEN ELETRO" não foi encontrada nas pastas padrão do PC (Downloads, Desktop, Documents, OneDrive), o que levantou suspeita de dado inventado — pendência registrada para o @aiox-master investigar/reforçar regra anti-invenção
- Felipe indicou o caminho real da planilha (`C:\Downloads\ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1).xlsx`, aba "SEM CAMPANHA", 736 linhas) — @dev cruzou os 28 SKUs um a um contra a coluna "Item ID": bateram 100% — suspeita de invenção descartada, dado confirmado correto
- Esclarecida a confusão de terminologia: "SKU" pro Felipe = código do fabricante (ex: EMG70-220V), embutido só no texto livre da coluna "Título item", sem coluna própria na planilha; o dashboard usa "Item ID" (identificador do Mercado Livre), que é o dado certo pro objetivo de achar o produto direto no ML — mas o rótulo "SKU" no dashboard pode confundir por não ser o que Felipe entende por SKU
- @analyst (Atlas) elicitou o conteúdo do relatório/PDF que Felipe quer montar pra pessoa que cuida do Ads da Karzen no Mercado Livre — além de estoque e preço normal/promocional (Rebate) que Felipe já tinha, sugeriu: Item ID/link do anúncio, receita orgânica total, status de integração SAds, grupo de prioridade (A/B/C), histórico de investimento ruim, prazo de validade do Rebate, e margem de lucro no preço promocional
- @dev esclareceu divergência aparente de receita "máquina de gelo R$80.900 x R$163 mil" — são 2 produtos diferentes (Item ID 6716539200 "Eos 70kg" = R$80.900; Item ID 6894630390 "HQ 45kg Profissional" = R$162.300), ambos batendo com a planilha real — não houve erro, só confusão de qual máquina é qual

**O QUE O FELIPE PEDIU:**
- Verificar se o @dev colocou os SKUs certos no dashboard e de onde tirou essa informação, já que não achava "SKU" explícito na planilha
- Registrar pendência para o @aiox-master investigar regra anti-invenção de dados, a ser acionada quando Felipe disser "chame o Orion" (ainda não acionado nesta sessão)
- Esclarecer que "SKU" pra ele é a sequência tipo "EMG70-220V", não o Item ID do Mercado Livre
- Elicitar com o @analyst o que deveria entrar num relatório pra pessoa de Ads da Karzen no Mercado Livre
- Chamar o @dev de novo para explicar a divergência de receita entre duas "máquinas de gelo" no dashboard

**PAROU EM:** Duas decisões em aberto: (1) qual rótulo usar no dashboard pro "SKU"/Item ID, e (2) fechar com o @analyst o escopo exato do relatório de Ads (decisório x informativo, e se há dado de margem de lucro) | Agente ativo: aiox-master

---

### SESSÃO — 10/07/2026

**O QUE FOI FEITO:**
- @aiox-master verificou o escopo do @dev (dev.md) antes de delegar, e delegou com o template completo de 5 campos (TAREFA/ENTREGÁVEL/PROIBIDO/DEFINIÇÃO DE CONCLUÍDO/PRODUÇÃO) a tarefa de acessar a planilha aberta e contar produtos
- @dev contou os produtos em `ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1).xlsx` (aba "SEM CAMPANHA"): 736 total, 40 marcados em azul (RGB 66,133,244, cor aplicada por Felipe depois de salvar a planilha) → resultado final de **696 produtos** — leitura feita direto na instância aberta do Excel via COM/PowerShell (sem Python, a pedido do Felipe)
- @analyst (Atlas) abriu o relatório `Relatorio_desempenho_publicacoes_2026_06_10-2026_07_10.xlsx` (981 anúncios) e identificou que ele traz Visitas/Vendas/Conversão/SKU real por anúncio, mas não tem estoque nem quebra por 15/7 dias — é só um agregado do período de 30 dias selecionado na exportação
- @analyst explicou a Felipe a lógica de velocidade de vendas e censura de demanda por estoque (por que "vendeu 400 em 30 dias" não prova que o produto venderia as mesmas 400 unidades em 10 dias)
- @analyst rodou uma sessão de elicitação avançada completa (9 métodos) sobre como classificar os 696 produtos em Curva A/B/C de forma rápida, já que a integradora não fornece "Dias no CD" nem "Vendas por dia" limpos — chegou a uma proposta concreta: planilha de 5 colunas (SKU + Unidades vendidas 30d + Vendas brutas 30d + Estoque atual + Conversão), classificação por Pareto de receita ou por Giro (vendas ÷ estoque), e proxies pra substituir os dados que a integradora não dá

**O QUE O FELIPE PEDIU:**
- Confirmar se o @dev consegue acessar uma planilha aberta no PC e modificar/analisar coisas nela
- Contar quantos produtos tem na planilha "ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1).xlsx", excluindo os marcados em azul
- Parar de usar Python na análise da planilha
- Entender como medir com precisão se um produto vende X unidades em Y dias (velocidade de venda / curva de demanda)
- Analisar o relatório de desempenho de publicações baixado da integradora, verificando se dá pra cruzar estoque + vendas de 30/15/7 dias
- Elicitação avançada completa (9 métodos) sobre como montar de forma eficiente a planilha de classificação Curva A/B/C dos 696 produtos

**PAROU EM:** Sessão de elicitação avançada concluída (9 métodos aplicados sobre a metodologia de Curva A/B/C); Felipe ainda não escolheu qual caminho de classificação adotar (Pareto, Giro, Score composto ou Híbrido), e ainda faltam 2 exportações (relatórios de 15 e 7 dias) e o cruzamento Stock x relatório novo antes de fechar a planilha final dos 696 produtos | Agente ativo: analyst

---

## DECISÕES IMPORTANTES

- Projeto Karzen: desenvolver agentes/squads de IA para mapear produtos e ações de publicidade no Mercado Livre (conta Karzen)

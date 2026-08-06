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
- ~~@analyst — fechar com Felipe o conteúdo do relatório/PDF~~ — RESOLVIDO na sessão 12/07/2026: relatório é decisório, sem dado de margem de lucro por enquanto, destinatário é o patrão de Felipe amanhã (que depois repassa pra Evelyn)
- ~~@analyst — cruzar a coluna "Stock"~~ — SUPERADO na sessão 12/07/2026: @dev adicionou colunas "Estoque 1"/"Estoque 2" com dado atualizado direto do ML, mais recente que os relatórios de 15/7 dias que nunca chegaram a ser exportados
- ~~@analyst — Felipe precisa decidir qual caminho de classificação Curva A/B/C adotar pros 696 produtos~~ — RESOLVIDO na sessão 11/07/2026: decisão não é mais única pra todos os produtos, virou 3 trilhas por bucket de Status (ver sessão 11/07/2026)
- ~~@dev — mapear os ~600 e poucos IDs restantes~~ — CONCLUÍDO na sessão 12/07/2026: 696 IDs processados, 372 SKUs únicos identificados, `Pasta pro Dev.xlsx` completa com Status + Estoque 1/2
- @analyst/Felipe — investigar os 90 IDs que não retornaram resultado na busca do Mercado Livre durante o mapeamento (lista completa registrada na conversa da sessão 12/07/2026) — anúncio pode ter sido removido/renomeado
- Felipe — decidir, produto a produto, qual dos valores "Estoque 1"/"Estoque 2" (quando diferentes) é do CD próprio da Karzen e qual é do Full do Mercado Livre — só Felipe tem essa informação
- Felipe — resolver os 9 casos especiais registrados em `C:\Downloads\Casos Especiais - SKUs.txt` (falsificação, duplicidade, produto fora do catálogo) — inclui um caso grave: 939 unidades de estoque presas em 2 anúncios finalizados pelo ML por suspeita de falsificação e falta de NF-e
- @dev — corrigir a duplicidade de SKU na fonte (`Pasta pro Dev.xlsx` tem o mesmo SKU em mais de uma linha, ex: BB-PLUS, CX450-TROLLEY, HC112) — hoje só foi corrigida na consolidação do PDF final, a planilha original continua com as linhas duplicadas
- Felipe — decidir se vale aplicar a classificação real de Situação de Preço (1/2/3) produto a produto nos 150 SKUs "Ativo com estoque" — hoje o PDF só tem o guia de método, não uma classificação aplicada (exige checar catálogo/Buy Box manualmente, um por um, no Mercado Livre)
- Felipe — vai passar a cuidar também do Ads da Karzen na Shopee (hoje é feito por um bot da própria Shopee), em colaboração com o representante da conta na Shopee (também chamado Gabriel) — pedido feito por Gabriel (irmão do Carlos, segundo cabeça da empresa) em 29/07/2026; reunião de alinhamento ainda sem data marcada; Felipe precisa começar a estudar Ads da Shopee, e isso vai se somar à carga de trabalho e à rotina dele (que já cobre ML) — ver `ROTINA-FELIPE.md`

🔵 Pode deixar pra depois:
- @dev — avaliar alternativas técnicas ao procedimento "Modo Navegador" (Chrome sempre aberto em background, ou `launchPersistentContext` nativo do Playwright em vez do lançamento manual via `chrome.exe`) — sem pressa, o procedimento atual já funciona; ver `.aiox-core/development/tasks/modo-navegador-browser-access.md`
- @devops — transformar o comando validado do "Modo Navegador" num script `.ps1` salvo no repositório, em vez de reescrito inline toda vez — reduz risco de esquecer uma flag (quase aconteceu em 04/08/2026 com o `--no-first-run`)
- @dev ou @devops — Felipe confirmou que quer backup da pasta `C:\Users\Felipe Augusto\ChromeDebugKarzen` (protege o login salvo contra perda por corrupção, exclusão acidental ou troca/formatação de PC) — decisão já fechada, falta decidir COMO/ONDE fazer o backup e QUEM executa

---

## ÚLTIMAS 3 SESSÕES

> Sessões mais antigas em `HISTORICO-SESSOES.md`.

### SESSÃO — 12/07/2026

**O QUE FOI FEITO:**
- @dev conversou com Felipe sobre o caso BG-03 (só leitura, sem tocar na conta real) — achou 9 situações diferentes de status num único SKU (incluindo "Finalizado pelo ML por possível falsificação" e "não enviou NF-e", com 939 unidades presas) — Felipe decidiu que casos assim vão pra um Bloco de Notas separado (`C:\Downloads\Casos Especiais - SKUs.txt`), fora da Pasta pro Dev.xlsx
- @dev resolveu bloqueio técnico do Chrome (a porta de depuração não abre no perfil padrão por segurança do navegador) — criou perfil isolado `ChromeDebugKarzen`, Felipe logou manualmente uma vez nesse perfil, login ficou salvo pra sempre
- @dev processou os 696 IDs da planilha da Evelyn (todos, inclusive os 137 já "analisados" à mão antes, porque o formato novo exige dado que a análise antiga não tinha): identificou 372 SKUs únicos, com pares de IDs sincronizados e coluna "Status" (Ativo com estoque / Pausado com estoque / Sem estoque) preenchida — 90 IDs não retornaram resultado na busca do ML, registrados à parte
- Felipe pegou o @dev fazendo o trabalho "de qualquer jeito" numa etapa (analisando sem cruzar com a planilha da Evelyn primeiro) — corrigido, e Felipe reforçou a regra de só agir com permissão explícita
- @dev achou e corrigiu um bug real de truncamento de dado no Excel: 9 células com ID cortado pra 1-3 dígitos (não era só exibição, era o valor gravado errado) — recuperou os valores originais via log de processamento, corrigiu com verificação de leitura de volta, e reforçou o script pra não repetir
- Felipe pediu uma nova coluna de estoque real (percebeu que o Status salvo não batia mais com o estoque atual) — @dev adicionou colunas "Estoque 1"/"Estoque 2" (pra quando o mesmo SKU tem partes no CD próprio e partes no Full do ML, que só Felipe sabe distinguir) e reprocessou os 372 SKUs com dado atualizado — 369 de 372 preenchidos, 3 sem retorno na busca
- @analyst e Felipe fecharam as 3 perguntas em aberto desde 06/07 sobre o relatório: é decisório, sem dado de margem de lucro por enquanto, destinatário amanhã é o patrão de Felipe (que depois repassa pra Evelyn, responsável pelo Ads da conta)
- @analyst e Felipe desenharam e fecharam a estrutura final do "Plano de Ação" em PDF: Cobertura+Premissa, Situações de Preço (1/2/3, cortada a 4ª que é sobre negociação com fornecedor — já tem outra frente cuidando disso) como guia de método (não uma classificação aplicada), e Lista de produtos ativos organizada por "Receita Total" (renomeado de "receita de 30 dias" porque o período exato da coluna "Ingresos totales" da Evelyn nunca foi confirmado)
- @analyst cometeu um erro de processo (perguntou "combinado?" e já chamou o @dev no mesmo movimento, sem esperar resposta) — Felipe corrigiu na hora, a chamada foi interrompida antes de qualquer execução real, sem dano
- @dev calculou a Receita Total por SKU (cruzando `Pasta pro Dev.xlsx` com a coluna "Ingresos totales" da planilha da Evelyn) e gerou o PDF `C:\Downloads\Plano de Ação - Karzen.pdf` — achou e corrigiu duplicidade de SKU na tabela final (179 linhas viraram 150 SKUs únicos consolidados) — PDF verificado visualmente, pronto

**O QUE O FELIPE PEDIU:**
- Analisar o caso BG-03 no Chrome (só leitura) antes do @dev seguir a instrução completa
- Abrir o Chrome com porta de depuração pra o @dev conseguir acessar
- Corrigir o processo do @dev que estava analisando sem cruzar com a planilha da Evelyn primeiro
- Explicação sobre o padrão de SIM/NÃO/traço nas colunas que ele mesmo tinha desenhado — resolvido trocando por 1 coluna categórica "Status"
- Onde está o arquivo do Bloco de Notas
- Adicionar coluna de estoque real por produto na Pasta pro Dev.xlsx, separando por CD próprio vs Full quando os valores forem diferentes
- Recapitular o que ficou decidido sobre o plano de ação pro patrão
- Corrigir a premissa da Seção 1 pra cruzar Ativo/Pausado com receita, e ajustar a Seção 4 pra não presumir "queima de estoque" (nem Felipe sabe identificar isso)
- Cortar do PDF: seção de correções internas, casos de risco/compliance, e qualquer "pedido de decisão" explícito pro patrão
- Gerar o PDF de verdade, hoje, cruzando a Pasta pro Dev.xlsx com a "Ingresos totales" da planilha da Evelyn
- Corrigir a duplicidade de SKU encontrada na tabela final antes de ir dormir

**PAROU EM:** PDF final entregue e corrigido (`C:\Downloads\Plano de Ação - Karzen.pdf`, 150 SKUs únicos na tabela). Felipe encerrou a sessão pra dormir (acorda 5h30). Nenhuma tarefa em andamento | Agente ativo: aiox-master

---

### SESSÃO — 29/07/2026

**O QUE FOI FEITO:**
- @analyst desenhou uma rotina semanal completa pra evitar burnout (Segunda-Quinta, Plano de Contingência pra saída tardia, Sexta, Sábado, Domingo), com 3 achados críticos: meta de sono não fecha (6h55 real vs 8h desejado), o bloco de almoço tem dois propósitos conflitantes (descanso vs estudo de AIOX), e a saída tardia é frequente — não exceção
- @analyst publicou um artifact visual (página HTML) com a rotina organizada por categorias (trabalho / rotina pessoal / saúde / sono / relacionamento / fé)
- Fechado o framework "Fixo x Maleável": fronteiras pessoais (entrada, saída-alvo, almoço real, exercício, sono) são fixas; conteúdo de trabalho (incluindo Ads e estudo de AIOX) é maleável e pode ser deslocado por demanda urgente sem culpa — conteúdo completo salvo em `ROTINA-FELIPE.md`
- Aplicado o framework a um caso real (quinta-feira 30/07): promoção de agosto no ML com a Julya absorvida pelo bloco maleável sem problema; fisioterapia nova (13:20-14:30, terça/quinta, ~2,5 semanas restantes) virou compromisso fixo, colidindo com a sugestão anterior de estudar AIOX nesses mesmos dias — sugerido mover pra segunda/quarta enquanto durar a fisio
- Registrada pendência nova: Felipe vai passar a cuidar também do Ads da Karzen na Shopee (pedido de Gabriel, irmão do Carlos), reunião ainda sem data — ver PENDÊNCIAS ATUAIS

**O QUE O FELIPE PEDIU:**
- Ajuda pra organizar a rotina diária/semanal dado o volume de horas extras na Karzen, a falta de exercício, sono insuficiente (6h55, dormindo depois de 23h30 e acordando 5h25) e o risco de burnout
- Uma versão organizada em página (artifact) da rotina, e depois uma versão em tabela no terminal
- Confirmou que bater o ponto deixando 30min do intervalo de almoço "faltando" vira hora extra de verdade
- Aplicar o framework a um dia real (quinta-feira 30/07): promoção de agosto no ML pela manhã, fisioterapia nova às terças/quintas, saída até 19h10, igreja às 19h30
- Avisou sobre uma pendência de trabalho nova: vai passar a cuidar do Ads da Shopee também, a pedido do Gabriel (irmão do Carlos) — reunião ainda sem data
- Autorizou registrar a pendência do Ads da Shopee no caderno e criar um arquivo separado (`ROTINA-FELIPE.md`) pra não perder as decisões da rotina pessoal

**PAROU EM:** Rotina desenhada e decisões parcialmente tomadas; ainda faltam 3 decisões pessoais em aberto (sono 7h vs 8h; dias de exercício; dias de estudo AIOX/Shopee Ads agora que terça/quinta têm fisio) — ver `ROTINA-FELIPE.md` | Agente ativo: analyst

---

### SESSÃO — 04-05/08/2026

**O QUE FOI FEITO:**
- Validado e documentado o procedimento "Modo Navegador" (`modo-navegador-browser-access.md`) — conexão via Playwright/CDP num Chrome real já logado com a conta do Felipe (perfil isolado `ChromeDebugKarzen`, porta 9222), com as 4 flags obrigatórias de lançamento (incluindo `--no-first-run`, que faltava numa tentativa anterior e travava o Chrome)
- Criado o procedimento `analise-acos-catalogo-mercadolivre.md` — passo a passo completo pra achar produtos com ACOS ≥ 5% numa Campanha do Mercado Ads, mapear SKU/MLB de cada variação, e confirmar status de catálogo (Ganhando/Perdendo/Compartilhando), inclusive quando o Mercado Livre esconde o status na tela normal (Qualidade do anúncio em certos níveis) — nesse caso, checado via página "Alterar", seção "Concorrência no Mercado Livre"
- Analisadas as 6 Campanhas de Mercado Ads da Karzen no período 01-04/08/2026: **[ML] [CURVA-A]**, **[ML] [CURVA-B]**, **[ML] [AVA] [PERFORMANCE]**, **[ML] [BAIXA PERFORMANCE]**, **[ML] [CONTROLE ACOS]** e **[ML] [CURVA-C]** (a maior, 34 anúncios, 13 produtos qualificados) — todos os produtos com ACOS ≥ 5% escritos na planilha `C:\Users\Felipe Augusto\OneDrive\Documentos\Carlos Analise.xlsx` (SKU, MLB, Catálogo Clássico, Catálogo Premium, ACOS, Título)
- Corrigido bug real de foco de janela: `page.bringToFront()` do Playwright é assíncrono e podia elevar a janela do Chrome ao primeiro plano **depois** do comando de minimizar já ter rodado (race condition) — solução: `minimize-chrome.js`, rotina que minimiza e reforça por ~2s (loop), chamada sempre dentro do mesmo script que usou `bringToFront()`, nunca como comando separado depois (senão reabre a brecha de interrupção)
- Corrigido bug de seleção de aba: o script que localizava a aba de Anúncios (`url.includes('mercadolivre.com.br/anuncios')`) também batia com a URL da página "Alterar" (`/anuncios/MLBU.../modificar/...`), fazendo o script pegar a aba errada repetidamente — corrigido exigindo o `?` logo após `/anuncios`
- Documentados casos-limite descobertos durante a análise: MLB que não tem card próprio acessível em lugar nenhum (corresponde à variação "não se pode mostrar" contada no produto — tratar como não verificável, excluir da planilha); mensagem "PREÇO ALTO" na seção "Concorrência" não é status de catálogo (não registrar); quando 2 MLBs aparecem juntos no mesmo card sincronizado, a página "Alterar" (Opção 1/Opção 2) é a única fonte confiável pra saber qual é Clássico e qual é Premium
- Felipe auditou ao vivo o procedimento documentado contra pontos que ele mesmo tinha levantado mais cedo na sessão — 3 lacunas reais encontradas e corrigidas: faltava dizer explicitamente que produto sem nenhuma disputa de catálogo é resultado normal (não insistir procurando status que não existe); faltava a regra "nunca confiar em atalho, sempre confirmar via Anúncios/Alterar" como regra própria (só estava implícita); faltava explicar por que o `minimize-chrome.js` minimiza TODAS as janelas do Chrome existentes a cada chamada (não uma fixa) — protege contra uma segunda janela solta que apareça no meio da sessão
- Exportados os dados da `Carlos Analise.xlsx` (99 linhas) pro Google Sheets "Planilha do Ads ML", replicando as 16 mesclagens de título da estrutura original — resolve a percepção de "linha quebrada" que Felipe reportou na linha 76 (causa raiz: exceljs retorna o valor da célula mestre pra toda célula dentro de um range mesclado, e a exportação em TSV plano perdia essa mesclagem)
- Criada aba nova "Produtos Perdendo Catálogo em Ads" na mesma planilha: 28 produtos com status "Perdendo" filtrados (excluídos 2 "Pendente" a pedido do Felipe), com espaçamento entre grupos de produto e mesclagem de título nos 8 grupos com mais de 1 MLB — mesma lógica da aba principal
- Corrigido erro real encontrado pelo próprio Felipe: a linha do PAN-127V na aba nova tinha o MLB do anúncio Clássico (Ganhando) junto do MLB Premium (Perdendo) — informação que não pertencia a uma página exclusiva de "quem está perdendo". Criada regra de memória permanente (`feedback_validar_paginas_derivadas.md`, indexada em MEMORY.md): nunca copiar linha inteira de uma página de origem pra uma página derivada/filtrada sem checar célula por célula contra o propósito específico da página nova
- Preenchidas as colunas "Depósito (un)" e "FULL (un)" pra 27 das 28 linhas da aba nova (a 28ª, PAN-127V, Felipe preencheu manualmente), buscando estoque direto nos cards da lista de anúncios do ML por MLB — achado e corrigido bug real de defasagem de 1 posição na primeira tentativa em lote (tempo fixo de espera insuficiente entre buscas seguidas); corrigido trocando por espera ativa até o MLB certo aparecer na tela antes de ler o card
- Auditoria completa de fim de sessão (a pedido do Felipe, "pode demorar o tempo que for"): JSONL da sessão lido por completo (7407 linhas, ~43MB) via script, as 2 compactações reais do terminal (01:23 e 17:04 de 05/08) comparadas — nenhuma perda de informação relevante encontrada, o que importava foi pra commits do git ou pra memória persistente, não dependeu da fidelidade do resumo de compactação; estado do git cruzado com o histórico completo de commits (3 não enviados, todos íntegros); confirmado que os arquivos não rastreados no repositório são todos de sessões antigas (abril-julho), sem relação com esta sessão

**O QUE O FELIPE PEDIU:**
- Analisar cada Campanha de Mercado Ads, achar produtos com ACOS ≥ 5% no período 01-04/08/2026, mapear SKU/MLB de cada um, e registrar o status de catálogo (Ganhando/Perdendo/Compartilhando) na planilha `Carlos Analise.xlsx`
- Corrigir a janela do Chrome aparecendo em primeiro plano sem querer, de forma definitiva — não aceitar explicação de "é normal" sem investigar a fundo
- Quando o catálogo não aparecer explícito, checar MLB por MLB via "Alterar" (não "Ir para página de produto") antes de aceitar como "sem disputa"
- Confirmar se todos os pontos que ele foi separando ao longo do dia (Family, atalho, janela dupla, etc.) tinham sido incorporados no procedimento documentado — pediu resposta em conversa, não em ação direta
- Corrigido meu processo: expliquei a auditoria em texto primeiro, sem editar/commitar nada até ele confirmar o que queria salvo
- Exportar tudo da `Carlos Analise.xlsx` pro Google Sheets "Planilha do Ads ML"
- Investigar a linha 76 (título aparecendo com outras colunas vazias) e mesclar a coluna Título igual no Excel original
- Criar aba separada só com os produtos perdendo catálogo, mesma estrutura da principal, com espaçamento entre grupos e mesclagem de título
- Corrigir e nunca mais repetir o erro do MLB ganhando aparecendo na aba de "perdendo" — registrar regra permanente
- Preencher Depósito/FULL por MLB pra cada linha da aba nova
- Auditoria profunda de fim de sessão: cruzar git com tudo que foi feito, ler o JSONL linha por linha, analisar as sessões compactadas desde o início do terminal

**PAROU EM:** Aba "Produtos Perdendo Catálogo em Ads" completa (28 produtos, espaçados, título mesclado, Depósito/FULL preenchidos) e validada pelo Felipe ("bateu certinho"). Auditoria de fim de sessão concluída sem gaps reais encontrados. Felipe disse "vou parar" | Agente ativo: aiox-master

---

## DECISÕES IMPORTANTES

- Projeto Karzen: desenvolver agentes/squads de IA para mapear produtos e ações de publicidade no Mercado Livre (conta Karzen)

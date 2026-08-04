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

### SESSÃO — 11/07/2026

**O QUE FOI FEITO:**
- @analyst elicitou a fundo o pedido original do Felipe (planilha pro patrão + plano de ação pra anúncios que não vendem bem) — desmontou a tese "só preço importa" em 4 Situações de Preço (vence no preço / diferença pequena e negociável / ML-1P ou concorrente queimando estoque, sem como vencer agora / problema de negociação com fornecedor), cada uma com uma ação diferente, em vez de um "sim/não vende" binário
- @analyst corrigiu terminologia de ML com o Felipe: 1P (First Party, não "P1") é o modelo onde o próprio ML compra e revende sem taxa; "família" de anúncio (clássico/premium/variação) é agrupamento interno do próprio Felipe, não tem relação com o catálogo (catalog_product_id, que é quem disputa Buy Box entre sellers diferentes) — são dois conceitos separados
- @analyst tentou usar a coluna "SKU real" do relatório `Relatorio_desempenho_publicacoes` como atalho de deduplicação automática — descartado: esse relatório não serve pra nada (Felipe já tem a mesma info direto no painel do ML) e o "SKU real" só existe hoje na planilha `Produtos para o Ads.xlsx`, preenchida manualmente pelo Felipe ID por ID, só até a cor "amarelo escuro" da planilha da Evelyn (>R$1.000 em vendas) — não cobre os ~600 e poucos restantes
- @analyst propôs Fase 1 (triagem em massa por Pareto/"Ingresos totales", sem abrir anúncio) + Fase 2 (investigação manual só do que passa no corte) — Felipe apontou uma falha real: um produto com pouca receita mas estoque alto parado (ex: 969 unidades) ficaria fora da Fase 2 e continuaria parado — Pareto puro por receita não pega risco de estoque encalhado
- @analyst e Felipe fecharam uma solução melhor: @dev vai mapear TODOS os ~600 e poucos IDs restantes por SKU (dedup via conta Karzen no ML aberta no Chrome, cruzando com a planilha da Evelyn) e classificar cada SKU numa coluna única "Status" (Ativo com estoque / Pausado com estoque / Sem estoque) na planilha `Pasta pro Dev.xlsx` — decisão final trocou as 3 colunas SIM/NÃO/"-" que o Felipe tinha desenhado (tinha um buraco: "pausado sem estoque" não caía em nenhuma coluna) por 1 coluna categórica, mais simples e sem o buraco
- Fechado o desenho de 3 trilhas de ação por bucket: Pausado com estoque → reativar (serviço do Felipe) → Fase 2; Sem estoque → decidir reposição → Fase 2; Ativo com estoque → aplica Pareto por "Ingresos totales" pra decidir quem entra em Ads (não é mais triagem de risco, vira triagem de oportunidade)
- @analyst respondeu dúvida do Felipe sobre consumo de token/compactação no Plano Claude Pro dele (7% usado no dia) — sem inventar número exato; explicou que a compactação não apaga arquivo já salvo em disco, só resume a conversa, e que a própria ideia do Felipe de colorir IDs já processados na planilha da Evelyn é a defesa certa contra perda de progresso entre sessões/compactações

**O QUE O FELIPE PEDIU:**
- Elicitação avançada sobre a planilha que ele monta pro patrão (colunas SKU/Conversão/Faturamento 30d/Vendeu por dia/"vende? sim ou não") e sobre qual Plano de Ação apresentar pra anúncios que não vendem bem, dado que ele acredita que só preço decide quem vende no Mercado Livre
- Corrigir dois conceitos que o @analyst errou: 1P (não P1) e o que é "família" de anúncio (agrupamento interno, não catálogo entre concorrentes)
- Avaliar se a coluna "SKU real" de algum relatório existente resolveria a deduplicação dos ~600 e poucos IDs sem trabalho manual — resposta: não resolve, não existe atalho automático
- Ajuda pra organizar a lógica SIM/NÃO/"-" das colunas da planilha `Pasta pro Dev.xlsx` que ele mesmo desenhou pro @dev, porque ficou em dúvida — resolvido com a troca pra 1 coluna categórica "Status"
- Explicação sobre consumo de token do Plano Claude Pro e se a compactação de sessão atrapalha o trabalho do @dev
- Confirmação de que atualizar o caderno (`PROJETO-STATUS.md`) é trabalho do próprio @analyst antes de autorizar a gravação — @analyst confirmou que sim, com base no BLOCO 2-B do CLAUDE.md ("o agente ativo no momento é responsável pelo registro")

**PAROU EM:** Metodologia da Fase 1 (dedup + Status por bucket) fechada e aprovada por Felipe. Falta: Felipe quer conversar direto com o @dev sobre um caso específico de anúncio (aberto agora numa aba do Chrome) ANTES do dev receber a instrução completa do mapeamento dos ~600 e poucos IDs restantes | Agente ativo: analyst

---

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

## DECISÕES IMPORTANTES

- Projeto Karzen: desenvolver agentes/squads de IA para mapear produtos e ações de publicidade no Mercado Livre (conta Karzen)

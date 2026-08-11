# Karzen — Caderno do Projeto

**Projeto:** Karzen
**Objetivo:** Desenvolver agentes de IA e squads de IA para mapear produtos e ações de Publicidade dentro do Mercado Livre (conta Karzen)
**Fase atual:** Início — estruturação do projeto

---

## PENDÊNCIAS ATUAIS

🔴 Prioridade Máxima:
- @dev — mapear os produtos das 7 Campanhas de Mercado Ads (as 6 conhecidas + "Em Alta", nova) na Planilha do Ads ML, abas "Produtos em Ads Atualmente" e "Produtos Perdendo Catálogo em Ads", **período atualizado pra 01/08 até o dia da análise (móvel, sempre "até hoje")** — critério ACOS ≥ 5%, refazer as campanhas do zero (não só recolocar o que sumiu). Passo 1 (extração de ACOS) foi feito em 07/08 pro período 01/08-07/08, achando 19 produtos qualificados — mas em 08/08, ao testar o Passo 2 no primeiro desses 19 (`#MLB35276822`), o ACOS dele caiu de 5,51% pra 4,69% só de incluir mais 1 dia (08/08) no período, confirmando que a lista inteira ficou desatualizada de um dia pro outro. **Antes de fazer a análise de verdade (Passo 2-5) nos 19, o Passo 1 precisa ser refeito do zero com o período correto até a data real da análise** — Felipe confirmou isso em 08/08. Dry-run supervisionado de 2-3 produtos (Passo 2-4, sem escrever na Planilha) em andamento pra validar o processo antes de rodar nos produtos de verdade.
- @aiox-master — investigar em todas as configurações do caderno/manual (CLAUDE.md, MANUAL.md, rules/) se já existe uma regra de alta prioridade proibindo QUALQUER agente de inventar informação; se não existir com força suficiente, criar e registrar essa regra — pedido feito por Felipe de forma preventiva/geral (independente de caso específico) (a acionar quando Felipe disser "chame o Orion")
  - CONTEXTO (resolvido): a dúvida que originou o pedido foi sobre os 28 SKUs do dashboard-karzen-ads.html (sessão 03/07/2026) — @dev re-verificou em 06/07/2026 contra a planilha real em `C:\Downloads\ANÚNCIOS EM POTENCIAL - KARZEN ELETRO (1).xlsx` (aba "SEM CAMPANHA", 736 linhas) e os 28 SKUs batem 100% com a coluna "Item ID". Não houve invenção neste caso — a planilha só não tinha sido localizada na primeira varredura (estava em C:\Downloads, fora das pastas padrão) e a coluna se chama "Item ID", não "SKU", o que gerou a confusão inicial do Felipe

🟡 Prioridade Normal:
- @dev — decidir e ajustar o rótulo "SKU" no dashboard-karzen-ads.html: manter "Item ID (Mercado Livre)" só renomeando o rótulo, extrair também o código de modelo do fabricante (ex: EMG70-220V) de dentro do título de cada produto e mostrar os dois, ou outra abordagem — Felipe ainda não escolheu entre as 3 opções apresentadas (sessão 06/07/2026)
- ~~@analyst — fechar com Felipe o conteúdo do relatório/PDF~~ — RESOLVIDO na sessão 12/07/2026: relatório é decisório, sem dado de margem de lucro por enquanto, destinatário é o patrão de Felipe amanhã (que depois repassa pra Evelyn)
- ~~@analyst — cruzar a coluna "Stock"~~ — SUPERADO na sessão 12/07/2026: @dev adicionou colunas "Estoque 1"/"Estoque 2" com dado atualizado direto do ML, mais recente que os relatórios de 15/7 dias que nunca chegaram a ser exportados
- ~~@analyst — Felipe precisa decidir qual caminho de classificação Curva A/B/C adotar pros 696 produtos~~ — RESOLVIDO na sessão 11/07/2026: decisão não é mais única pra todos os produtos, virou 3 trilhas por bucket de Status (ver sessão 11/07/2026)
- ~~@dev — mapear os ~600 e poucos IDs restantes~~ — CONCLUÍDO na sessão 12/07/2026: 696 IDs processados, 372 SKUs únicos identificados, `Pasta pro Dev.xlsx` completa com Status + Estoque 1/2
- @analyst/Felipe — investigar os 90 IDs que não retornaram resultado na busca do Mercado Livre durante o mapeamento (lista completa registrada na conversa da sessão 12/07/2026) — anúncio pode ter sido removido/renomeado
- Felipe — decidir, produto a produto, qual dos valores "Estoque 1"/"Estoque 2" (quando diferentes) é do CD próprio da Karzen e qual é do Full do Mercado Livre — só Felipe tem essa informação
- @dev — corrigir a duplicidade de SKU na fonte (`Pasta pro Dev.xlsx` tem o mesmo SKU em mais de uma linha, ex: BB-PLUS, CX450-TROLLEY, HC112) — hoje só foi corrigida na consolidação do PDF final, a planilha original continua com as linhas duplicadas
- Felipe — decidir se vale aplicar a classificação real de Situação de Preço (1/2/3) produto a produto nos 150 SKUs "Ativo com estoque" — hoje o PDF só tem o guia de método, não uma classificação aplicada (exige checar catálogo/Buy Box manualmente, um por um, no Mercado Livre)
- Felipe — vai passar a cuidar também do Ads da Karzen na Shopee (hoje é feito por um bot da própria Shopee), em colaboração com o representante da conta na Shopee (também chamado Gabriel) — pedido feito por Gabriel (irmão do Carlos, segundo cabeça da empresa) em 29/07/2026; reunião de alinhamento ainda sem data marcada; Felipe precisa começar a estudar Ads da Shopee, e isso vai se somar à carga de trabalho e à rotina dele (que já cobre ML) — ver `ROTINA-FELIPE.md`

🔵 Pode deixar pra depois:
- ~~@dev — avaliar `launchPersistentContext` como alternativa~~ — TESTADO em 10/08/2026, com perfil descartável e temporário (nunca tocou no `ChromeDebugKarzen` real nem em nada do Felipe): (1) SIM, substitui a sequência atual numa chamada só; (2) abre em primeiro plano por padrão (esperado, mesmo comportamento de qualquer lançamento não-headless) — minimizado imediatamente após o teste, sem exposição relevante; (3) SIM, aceita as mesmas flags de proteção (`--no-restore-last-session`, `--no-first-run`) via `args`; (4) **pergunta mais importante ficou sem resposta**: não foi testado se o processo do Chrome sobrevive como órfão depois que o script Node que o lançou termina — isso é essencial pro padrão "momento de pausa" (Chrome precisa continuar rodando entre invocações de script separadas), e o teste de hoje só cobriu lançar→checar→fechar dentro do mesmo processo Node, nunca "lançar e sair do script sem fechar". **Recomendação: NÃO migrar agora** — o método atual (`Start-Process` + `connectOverCDP`) já é validado, testado sob incidente real hoje, e resolve exatamente esse caso (Chrome sobrevive entre scripts); `launchPersistentContext` só valeria a pena se alguém testar de verdade a sobrevivência do processo primeiro, e nem então há ganho claro — é só menos um passo de PowerShell, não resolve nenhum problema real.
- @devops — transformar o comando validado do "Modo Navegador" num script `.ps1` salvo no repositório, em vez de reescrito inline toda vez — reduz risco de esquecer uma flag (quase aconteceu em 04/08/2026 com o `--no-first-run`) — **Felipe aprovou a ideia em 10/08/2026, pronto pra ser executado quando o @devops for acionado**
- @dev ou @devops — Felipe confirmou que quer backup da pasta `C:\Users\Felipe Augusto\ChromeDebugKarzen` (protege o login salvo contra perda por corrupção, exclusão acidental ou troca/formatação de PC) — decisão já fechada, falta decidir COMO/ONDE fazer o backup e QUEM executa
- @analyst — investigar os 93 arquivos de print/screenshot (.png, 76MB) acumulados em `.playwright-mcp/` (não rastreados no git) — descobrir de qual sessão/agente vieram e se ainda são necessários, antes de decidir se dá pra limpar. Felipe percebeu o acúmulo em 07/08 e pediu pra deixar pra depois

---

## ÚLTIMAS 3 SESSÕES

> Sessões mais antigas em `HISTORICO-SESSOES.md`.

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

### SESSÃO — 06/08/2026

**O QUE FOI FEITO:**
- @dev reabriu o Modo Navegador (Chrome via CDP na porta 9222, perfil `ChromeDebugKarzen`) e confirmou via `chrome://bookmarks` os 3 favoritos novos que o Felipe organizou na barra do Chrome (Planilha do Ads ML, Anúncios, Publicidade) — evita precisar caçar URL por busca no Google Drive, que foi o caminho ineficiente tentado antes de descobrir os favoritos
- Mapeadas as 7 campanhas ativas na Publicidade (`ads.mercadolivre.com.br/product-ads/admin/campaigns`), incluindo 1 campanha nova criada pelo Carlos/moça do Ads ("Em Alta", 18 anúncios, status APRENDENDO, criada nos últimos dias) além das 6 já conhecidas (Curva A, Curva B, AVA Performance, Baixa Performance, Controle ACOS, Curva C) — URLs de dashboard de cada uma extraídas e confirmadas
- Encontrado e corrigido bug real de foco de janela, causa raiz diferente de tudo já documentado: a função `minimizeChrome()` (chamada no `finally` de todo script do Modo Navegador) rodava `execSync('powershell -NoProfile -ExecutionPolicy Bypass -File ...')` **sem `-WindowStyle Hidden`** — isso abre um `powershell.exe` visível por uma fração de segundo (rápido demais pra renderizar, mas suficiente pra o Windows roubar o foco de qualquer janela do usuário, não só do Chrome). Sintoma relatado pelo Felipe: a tela em que ele estava trabalhando (fora do Modo Navegador) perdia foco "do nada", 3x desde o dia anterior, sempre um pouco depois de aprovar uma permissão de comando. Corrigido adicionando `-WindowStyle Hidden` na chamada; testado sem erro; documentado em `modo-navegador-browser-access.md` com data e explicação, seguindo o padrão já usado pra bugs anteriores do procedimento
- Bug de foco persistiu mesmo depois da correção acima — @dev investigou de novo com dado real (log com timestamp do `focus-watchdog.ps1`, não suposição) e achou a causa mais forte: o Chrome traz a janela pra frente sozinho ao criar aba nova (`context.newPage()`, comportamento já documentado numa sessão anterior), o vigia reage e minimiza rápido (confirmado no log, funcionando certo), mas minimizar não é a mesma coisa que devolver o foco pra janela que o Felipe estava usando — o Windows escolhe outra janela qualquer sozinho. Achado também um padrão ainda sem explicação: um grupo de 4 reações do vigia em sequência, sem nenhum script rodando na hora — lacuna registrada, não resolvida
- @dev chamou o @analyst com `*elicit` (confirmação do Felipe antes de chamar, conforme BLOCO 0-D), passando o relatório completo da investigação. @analyst aplicou 8 técnicas de elicitação (Critique and Refine, Challenge from Critical Perspective, Identify Potential Risks, Tree of Thoughts, ReWOO, Red Team vs Blue Team, Self-Consistency Validation, Assess Alignment with Goals, Hindsight is 20/20) e fechou recomendação: (1) Chrome deve nascer a aba nova em segundo plano via CDP `Target.createTarget` com `background: true` (opção oficial do protocolo, não gambiarra), resolvendo a causa confirmada, sem tocar em nada do sistema operacional do Felipe; (2) manter o vigia rodando como rede de segurança (não é substituído, é complementado); (3) vigia passa a registrar automaticamente qual janela/processo roubou o foco toda vez que reagir sem gatilho de script — vira "câmera" automática pro mistério dos 4 eventos, sem exigir que o Felipe pare o que está fazendo pra reportar em detalhe; (4) usar a ferramenta de monitoramento (Monitor) pra o @dev ser avisado em tempo real e já reportar pro Felipe antes dele perguntar — com a ressalva honesta de que só funciona durante uma sessão ativa, não é vigilância 24h. @analyst foi explícito que a recomendação resolve a causa confirmada mas não garante "nunca mais" 100% enquanto o mistério dos 4 eventos não for entendido

**O QUE O FELIPE PEDIU:**
- Mapear de novo os produtos na Planilha do Ads ML (abas "Produtos em Ads Atualmente" e "Produtos Perdendo Catálogo em Ads"), porque o Carlos ou a moça do Ads removeu produtos que tinham sido mapeados nas 2 sessões anteriores — usando Modo Navegador, campanha por campanha, período 01/08 a 06/08
- Confirmado: critério continua ACOS ≥ 5%, refazer as 6 campanhas conhecidas do zero (não só recolocar o que sumiu) pra também pegar produtos novos que passaram a qualificar no novo período, mesma estrutura de colunas de antes
- Avisou sobre a campanha nova ("Em Alta") criada pelo Carlos/moça do Ads — pediu pra analisar ela também no mesmo período
- Investigar por que sua tela principal (fora do Modo Navegador) estava perdendo foco sozinha, repetidamente, desde o dia anterior — encontrada e corrigida uma causa (bug do `-WindowStyle Hidden`), mas o sintoma persistiu, então pediu investigação mais a fundo
- Rejeitou a primeira proposta de conserto (truque de simular tecla Alt pra forçar o foco de volta) por não ser confiável o suficiente — pediu solução realmente eficiente e definitiva
- Pediu pra chamar o @analyst com `*elicit` pra investigar mais a fundo antes de qualquer implementação nova, com restrição explícita: nenhuma mudança pode tocar o sistema operacional/computador dele, só o lado da automação
- Pediu que o "monitoramento" do mistério fosse automático (câmera automática), não dependente dele perceber e reportar em detalhe
- Foi além: pediu que o @dev seja avisado em tempo real (não só registrado em log) e já reporte o problema antes de Felipe perguntar, sem tomar nenhuma ação — confirmado que é tecnicamente possível via ferramenta de monitoramento, com a ressalva de só funcionar em sessão ativa
- Confirmou "sim" pra implementação do pacote completo (conserto real + vigia com log automático + monitoramento em tempo real), mas encerrou a sessão ("vou parar") antes do @dev poder começar a implementar

**PAROU EM:** Recomendação do @analyst fechada e aprovada por Felipe, mas **nada foi implementado ainda** — nem o conserto do foco, nem a tarefa original de mapear as 7 campanhas na planilha (só as URLs de dashboard foram obtidas). Duas frentes pendentes pra próxima sessão, ordem a definir com Felipe | Agente ativo: analyst

---

## DECISÕES IMPORTANTES

- Projeto Karzen: desenvolver agentes/squads de IA para mapear produtos e ações de publicidade no Mercado Livre (conta Karzen)

# Karzen — Caderno do Projeto

**Projeto:** Karzen
**Objetivo:** Desenvolver agentes de IA e squads de IA para mapear produtos e ações de Publicidade dentro do Mercado Livre (conta Karzen)
**Fase atual:** Início — estruturação do projeto

---

## PENDÊNCIAS ATUAIS

⚠️ Nota: as pendências abaixo (sessão 02/07/2026) são de uma frente sem relação com o Mercado Livre — a agência de marketing do primo do Felipe (EUA, nicho SPA/salão). Registradas aqui a pedido do Felipe, na ausência de um caderno próprio para essa frente.

🔴 Prioridade Máxima:
- @hormozi-offers — estruturar a oferta da agência do primo pro nicho SPA/salão (garantia, bônus, resultado prometido), com Felipe e o primo trazendo os fatos reais do negócio
- Configurar Pixel + evento de conversão no formulário Lovable antes do lançamento da campanha de segunda-feira (bloqueio crítico identificado em elicitação estratégica)

🟡 Prioridade Normal:
- Depois da oferta definida: cadastrar Cliente no FuncionarIA (funcionaria.ai) com a oferta estruturada no campo Base de Conhecimento
- @hormozi-copy — definir persona e tom de voz da campanha
- @hormozi-ads — direção de criativo dos anúncios

🔵 Pode deixar pra depois:
- (a preencher conforme o projeto avançar)

---

## ÚLTIMAS 3 SESSÕES

### SESSÃO — 01/07/2026

**O QUE FOI FEITO:**
- Caderno da karzen criado (PROJETO-STATUS.md) — projeto agora tem registro de sessões persistido no GitHub
- BLOCO 3 do CLAUDE.md adaptado para multi-projeto — ao dizer "vou parar" na karzen, o caderno correto é salvo automaticamente
- Customização 41 registrada no MANUAL.md — regra documentada para uso em projetos futuros
- Tudo commitado e no GitHub (commit a93bd3b)

**O QUE O FELIPE PEDIU:**
- Criar caderno para a karzen
- Adaptar o BLOCO 3 para reconhecer a karzen ao dizer "vou parar"

**PAROU EM:** Infraestrutura inicial da karzen configurada — próxima sessão inicia o trabalho real (agentes de IA para publicidade no Mercado Livre) | Agente ativo: aiox-master

---

### SESSÃO — 02/07/2026

**O QUE FOI FEITO:**
- Elicitação estratégica completa (9 métodos de advanced elicitation) sobre a campanha de tráfego pago da agência do primo do Felipe (SPA/salão, Massachusetts/New Hampshire) — conclusão: objetivo "Leads" no Meta Ads Manager + Pixel/evento de conversão no formulário Lovable é obrigatório antes do lançamento de segunda-feira
- Resolvido bloqueio técnico de acesso ao Chrome via Playwright/CDP — o Chrome bloqueia `--remote-debugging-port` no perfil real/logado por segurança; solução encontrada foi lançar uma instância isolada com `--user-data-dir` temporário, sem mexer nas outras janelas do Chrome do Felipe
- Estudo completo da plataforma FuncionarIA (funcionaria.ai) via automação: 42 agentes de IA de copy (incluindo um agente dedicado "Hooks Estilo Alex Hormozi"), mapeada a estrutura de cadastro de Cliente (Nome/Segmento → Descrição/Tom de Voz → Base de Conhecimento) como o ponto de integração com a pasta pessoal de materiais do Hormozi do Felipe
- Esclarecido, a pedido do Felipe, que a pasta do Hormozi (estratégia de oferta) tem mais potencial de gerar resultado do que o FuncionarIA (execução/velocidade de produção de copy) — o FuncionarIA só vira multiplicador de resultado depois que a oferta estiver definida
- Nenhum arquivo de projeto foi gerado (screenshots e scripts de exploração ficaram só no scratchpad temporário)

**O QUE O FELIPE PEDIU:**
- Rodar elicitação estratégica completa sobre a campanha da agência do primo
- Acessar via Playwright/Chrome a plataforma FuncionarIA (logado no perfil real) e estudá-la por inteiro
- Entender como o FuncionarIA pode trabalhar em conjunto com a pasta do Hormozi
- Entender qual dos dois (pasta do Hormozi ou FuncionarIA) tem mais potencial de gerar resultado
- Entender a divisão de responsabilidade entre Felipe/primo e o framework do Hormozi na construção da oferta

**PAROU EM:** Decidir se chama o @hormozi-offers para estruturar a oferta da agência do primo (SPA/salão) — oferta ainda não definida | Agente ativo: analyst

---

## DECISÕES IMPORTANTES

- Projeto Karzen: desenvolver agentes/squads de IA para mapear produtos e ações de publicidade no Mercado Livre (conta Karzen)

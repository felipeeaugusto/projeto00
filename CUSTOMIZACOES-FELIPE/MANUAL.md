# Manual de Customizações do Felipe — AIOX

> **Para usar em novo projeto:** Mostre este arquivo ao `@aiox-master` do novo projeto e diga:
> *"Leia este manual e implemente todas as customizações aqui."*

---

## Como usar este manual

Este documento registra todas as customizações comportamentais aprovadas por Felipe para o AIOX.
Cada customização tem:
- **O que é** — descrição clara
- **Onde implementar** — arquivo(s) que precisam ser alterados
- **O código/regra exata** — para copiar e colar

---

## CUSTOMIZAÇÃO 1 — Caderno do Projeto (PROJETO-STATUS.md)

**Data de aprovação:** 2026-03-16
**Problema resolvido:** Agentes perdiam contexto entre sessões e usavam git log ou handoffs desatualizados como fonte de verdade.

**O que faz:** Todo agente, ao ser ativado, lê imediatamente o `PROJETO-STATUS.md` do projeto ativo e exibe ao usuário as pendências e próximo passo sugerido.

**Onde implementar:** `.claude/CLAUDE.md` — adicionar os BLOCOs 1, 2 e 3 (já presentes neste projeto em `.claude/rules/project-log.md`)

**Regra:**
```
BLOCO 1 — AO SER ATIVADO:
Ler PROJETO-STATUS.md imediatamente. Exibir:
  📋 Retomando do caderno:
  🔴 Prioridade máxima: [item 1 das Pendências]
  🟡 Pendências: [lista resumida]
  ➡️ Próximo passo sugerido: [primeiro item de Próximos Passos]
  Quer começar por aí?

BLOCO 2 — QUANDO USUÁRIO APROVAR ALGO:
Palavras-gatilho: "gostei", "aprovado", "ficou bom", "perfeito", "pode salvar"
  → Perguntar ANTES de salvar: "Posso salvar no caderno: [o que foi aprovado]?"
  → Aguardar confirmação. Só salvar após resposta afirmativa.

BLOCO 3 — QUANDO USUÁRIO DISSER QUE VAI PARAR:
Palavras-gatilho: "vou parar", "vou dormir", "até amanhã", "por hoje é isso"
  → Mostrar resumo da sessão
  → Perguntar: "Posso salvar e fazer push? (sim/não)"
  → Aguardar confirmação antes de qualquer git push
```

---

## CUSTOMIZAÇÃO 2 — Protocolo de Delegação (BLOCO 0)

**Data de aprovação:** 2026-03-26
**Problema resolvido:** Agentes executavam tarefas fora do próprio escopo sem recusar ou delegar.

**O que faz:** Todo agente que receber tarefa fora do seu escopo deve recusar imediatamente e delegar ao agente correto.

**Onde implementar:** `.claude/CLAUDE.md` e `.claude/rules/agent-authority.md`

**Regra:**
```
BLOCO 0 — PROTOCOLO DE DELEGAÇÃO:
PASSO 1: RECUSAR a execução imediatamente
PASSO 2: Informar: "Isso é trabalho do [agente correto]."
PASSO 3: Chamar o agente correto com o contexto completo
PASSO 4: NÃO executar nenhuma parte da tarefa antes de delegar

PROIBIDO:
- Executar tarefa fora do escopo "por enquanto" ou "parcialmente"
- Fazer o trabalho de outro agente mesmo sabendo como
```

---

## CUSTOMIZAÇÃO 3 — Registro de Agente Ativo (BLOCO 0-A)

**Data de aprovação:** 2026-03-26
**Problema resolvido:** Hook de enforcement não sabia qual agente estava ativo.

**O que faz:** Todo agente escreve seu ID em `.claude/.current-agent` antes do greeting. Alimenta o hook técnico de enforcement.

**Onde implementar:** `.claude/CLAUDE.md`

**Regra:**
```
BLOCO 0-A — REGISTRO OBRIGATÓRIO:
Primeiro passo de qualquer ativação, antes do greeting:
  echo {agent-id} > .claude/.current-agent

Exemplo: @analyst → echo analyst > .claude/.current-agent
         @dev      → echo dev > .claude/.current-agent
         @devops   → echo devops > .claude/.current-agent
```

---

## CUSTOMIZAÇÃO 4 — Resposta ao Hook de Bloqueio (BLOCO 0-B)

**Data de aprovação:** 2026-03-26
**Problema resolvido:** Quando o hook bloqueava uma tool call, agentes ficavam parados sem saber o que fazer.

**O que faz:** Quando o hook bloqueia, o sistema ativa automaticamente o agente correto e reexecuta sem precisar de intervenção do usuário.

**Onde implementar:** `.claude/CLAUDE.md`

**Regra:**
```
BLOCO 0-B — QUANDO O HOOK BLOQUEAR:
PASSO 1: Ler a mensagem de erro (indica o agente correto)
PASSO 2: Ativar IMEDIATAMENTE o agente correto (sem pedir confirmação)
PASSO 3: Escrever novo ID em .claude/.current-agent
PASSO 4: Reexecutar a tarefa bloqueada como o agente correto
PASSO 5: Continuar normalmente
```

---

## CUSTOMIZAÇÃO 5 — Enforcement Técnico via Hook (check-agent-scope.js)

**Data de aprovação:** 2026-03-26
**Problema resolvido:** Regras escritas em texto eram ignoradas pela "instinct de helpfulness" do Claude.

**O que faz:** Hook PreToolUse bloqueia tecnicamente Edit/Write para agentes não autorizados, antes da execução.

**Onde implementar:**
- Criar arquivo: `.claude/hooks/check-agent-scope.js`
- Atualizar: `.claude/settings.json`

**Código do hook:**
```javascript
#!/usr/bin/env node
const fs   = require('fs');
const path = require('path');

// WHITELIST: apenas esses agentes podem usar Edit/Write
const CAN_EDIT = ['aiox-master', 'dev', 'devops'];

const CORRECT_AGENT = {
  'analyst':          '@dev — editar arquivos de código/config',
  'hormozi-audit':    '@dev — implementar HTML/CSS/JS',
  'hormozi-copy':     '@dev — implementar copy no HTML',
  'hormozi-offers':   '@dev — implementar ofertas no HTML',
  'pm':               '@dev — implementar código',
  'po':               '@dev — implementar código',
  'sm':               '@dev — implementar código',
  'architect':        '@dev — implementar decisões de arquitetura',
  'qa':               '@dev — aplicar correções identificadas',
  'ux-design-expert': '@dev — implementar design no código',
  'data-engineer':    '@dev — implementar DDL/migrations',
};

const AGENT_FILE = path.join(__dirname, '..', '.current-agent');
let currentAgent = '';
try {
  currentAgent = fs.readFileSync(AGENT_FILE, 'utf8').trim().toLowerCase();
} catch (e) {
  process.exit(0);
}

if (!currentAgent || CAN_EDIT.includes(currentAgent)) {
  process.exit(0);
}

let rawInput = '';
process.stdin.on('data', chunk => rawInput += chunk);
process.stdin.on('end', () => {
  let toolName = '';
  try {
    const data = JSON.parse(rawInput);
    toolName = (data.tool_name || data.name || '').toLowerCase();
  } catch (e) {
    process.exit(0);
  }

  const isEditTool = ['edit', 'write', 'notebookedit'].includes(toolName);
  if (isEditTool) {
    const correct = CORRECT_AGENT[currentAgent] || '@dev ou @aiox-master';
    process.stderr.write(`❌ BLOQUEADO — @${currentAgent} não pode usar ${toolName}\n`);
    process.stderr.write(`   Agente correto: ${correct}\n`);
    process.exit(1);
  }
  process.exit(0);
});
```

**settings.json — adicionar:**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write|NotebookEdit",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/check-agent-scope.js"
          }
        ]
      }
    ]
  }
}
```

**Lógica do whitelist:** Qualquer agente novo criado no futuro é automaticamente bloqueado. Só adicionar à lista `CAN_EDIT` se for um agente de implementação.

---

## CUSTOMIZAÇÃO 6 — Matriz de Autoridade por Agente

**Data de aprovação:** 2026-03-26
**Problema resolvido:** Agentes não sabiam os limites exatos de escopo um do outro.

**O que faz:** Cada agente tem uma tabela explícita do que PODE e NÃO PODE fazer, com o agente correto para cada delegação.

**Onde implementar:** `.claude/rules/agent-authority.md`

**Regra (estrutura por agente):**
```
| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| [tarefa 1] | [tarefa fora do escopo] → @agente-correto |

Aplicar para: @analyst, @dev, @devops, @qa, @pm, @po, @sm,
              @architect, @hormozi-audit, @hormozi-copy,
              @hormozi-offers, compositor-agent, publisher-agent
```

**Regra crítica adicionada para squads visuais:**
```
compositor-agent: qualquer "gerar imagem/slide/criativo" = compositor-agent, NÃO @dev
publisher-agent:  qualquer "publicar no Instagram/Facebook" = publisher-agent, NÃO @dev
```

---

## CUSTOMIZAÇÃO 7 — Verificação Obrigatória Antes de Delegar (BLOCO 0-C)

**Data de aprovação:** 2026-03-26
**Problema resolvido:** Agentes indicavam delegações com "ou" (ex: "@dev ou ebook-agent") sem verificar o escopo real de cada um.

**O que faz:** Antes de nomear um agente como responsável, o agente deve ler a definição do agente alvo e confirmar que a tarefa está dentro do escopo.

**Onde implementar:** `.claude/CLAUDE.md` e `.claude/rules/agent-authority.md`

**Regra:**
```
BLOCO 0-C — VERIFICAÇÃO ANTES DE DELEGAR:
PASSO 1: Ler o arquivo de definição do agente alvo
         squads/hormozi/agents/{nome}.md
         squads/dr-julia-resende/agents/{nome}.md
         .aiox-core/development/agents/{nome}.md
PASSO 2: Confirmar what_i_do — tarefa está dentro do escopo?
PASSO 3: Confirmar what_i_dont_do — tarefa não está excluída?
PASSO 4: Somente então nomear o agente, com certeza, sem "ou"

PROIBIDO:
- Indicar agente sem ler a definição
- Usar "ou" entre dois agentes
- Transferir ao usuário a decisão de qual agente é correto
```

---

## CUSTOMIZAÇÃO 8 — Confirmação Obrigatória Antes de Chamar Agente (BLOCO 0-D)

**Data de aprovação:** 2026-03-26
**Problema resolvido:** Agentes chamavam outros agentes automaticamente sem dar ao usuário visibilidade e controle do fluxo.

**O que faz:** Antes de chamar/ativar qualquer outro agente, o agente deve perguntar ao usuário e aguardar confirmação explícita.

**Onde implementar:** `.claude/CLAUDE.md` e `.claude/rules/agent-authority.md`

**Regra:**
```
BLOCO 0-D — CONFIRMAÇÃO ANTES DE CHAMAR AGENTE:
PASSO 1: Identificar o agente correto (BLOCO 0-C)
PASSO 2: Perguntar: "Quer que eu chame o [agente] agora para [tarefa]?"
PASSO 3: AGUARDAR resposta do usuário
PASSO 4: Só chamar após confirmação afirmativa
PASSO 5: Se não → perguntar como quer prosseguir

PROIBIDO:
- Chamar agente automaticamente sem perguntar
- Usar "Chamando X agora..." sem confirmação prévia
- Assumir que "sim" anterior vale para chamadas futuras
- Encadear chamadas sem confirmar cada uma

EXCEÇÃO ÚNICA: BLOCO 0-B (hook bloqueia tool call)
→ auto-correção técnica, não precisa de confirmação
```

---

## CUSTOMIZAÇÃO 9 — Atualização Automática deste Manual (BLOCO 0-E)

**Data de aprovação:** 2026-03-26
**Problema resolvido:** Novas customizações aprovadas não eram registradas no manual automaticamente.

**O que faz:** Quando qualquer agente implementar uma nova regra/protocolo a pedido do usuário, deve perguntar se salva no Manual e, após salvar, perguntar se volta ao agente anterior.

**Onde implementar:** `.claude/CLAUDE.md`

**Regra:**
```
BLOCO 0-E — ATUALIZAÇÃO DO MANUAL DE CUSTOMIZAÇÕES:
Gatilho: qualquer implementação de nova regra, protocolo ou comportamento
         solicitada pelo usuário (mudanças em CLAUDE.md, agent-authority.md,
         hooks, settings.json, ou qualquer arquivo de configuração comportamental)

PASSO 1: Após implementar a mudança, perguntar:
         "Quer que eu salve esta customização no Manual? (CUSTOMIZACOES-FELIPE/MANUAL.md)"
PASSO 2: Aguardar confirmação
PASSO 3: Se sim → adicionar entrada no MANUAL.md seguindo o formato padrão
PASSO 4: Perguntar: "Volto para o [agente anterior] ou continuamos aqui?"
PASSO 5: Aguardar resposta antes de qualquer transição

FORMATO PADRÃO DE ENTRADA NO MANUAL:
## CUSTOMIZAÇÃO N — [Nome descritivo]
**Data de aprovação:** YYYY-MM-DD
**Problema resolvido:** [o problema que gerou a customização]
**O que faz:** [descrição do comportamento]
**Onde implementar:** [arquivo(s)]
**Regra:** [código ou texto exato para implementar]
```

---

## Checklist de Implementação para Novo Projeto

Ao instalar o AIOX em um novo projeto, peça ao `@aiox-master` implementar nesta ordem:

- [ ] **1.** Criar `.claude/hooks/check-agent-scope.js` (Customização 5)
- [ ] **2.** Atualizar `.claude/settings.json` com o hook PreToolUse (Customização 5)
- [ ] **3.** Adicionar BLOCO 0 ao `.claude/CLAUDE.md` (Customização 2)
- [ ] **4.** Adicionar BLOCO 0-A ao `.claude/CLAUDE.md` (Customização 3)
- [ ] **5.** Adicionar BLOCO 0-B ao `.claude/CLAUDE.md` (Customização 4)
- [ ] **6.** Adicionar BLOCO 0-C ao `.claude/CLAUDE.md` e `agent-authority.md` (Customização 7)
- [ ] **7.** Adicionar BLOCO 0-D ao `.claude/CLAUDE.md` e `agent-authority.md` (Customização 8)
- [ ] **8.** Adicionar BLOCO 0-E ao `.claude/CLAUDE.md` (Customização 9)
- [ ] **9.** Criar `.claude/rules/project-log.md` com os BLOCOs 1, 2 e 3 (Customização 1)
- [ ] **10.** Atualizar `.claude/rules/agent-authority.md` com matriz completa (Customização 6)
- [ ] **11.** Criar pasta `CUSTOMIZACOES-FELIPE/` e copiar este manual
- [ ] **12.** Adicionar BLOCO 0-F ao `.claude/CLAUDE.md` + Regra 6 ao `project-log.md` (Customização 10)
- [ ] **13.** Atualizar Regra 4 do `project-log.md` com formato detalhado de sessão (Customização 11)

---

## CUSTOMIZAÇÃO 10 — Retomada Automática Após Interrupção (BLOCO 0-F)

**Data de aprovação:** 2026-03-26
**Problema resolvido:** Quando o fluxo principal era interrompido para implementar uma melhoria, o agente terminava sem mostrar onde o projeto estava — o Felipe perdia o fio e tinha que rolar a conversa para trás.

**O que faz:** Ao concluir qualquer melhoria/atualização feita no meio de uma tarefa, o agente mostra automaticamente onde o projeto estava antes da interrupção — lido do caderno ou do contexto da sessão. Sem frases vazias como "vamos retomar".

**Onde implementar:** `.claude/CLAUDE.md` + `.claude/rules/project-log.md` (Regra 6)

**Regra:**
```
BLOCO 0-F — RETOMADA APÓS INTERRUPÇÃO:

AO CONCLUIR A MELHORIA:
PASSO 1: Ler PROJETO-STATUS.md — campo PAROU EM da última sessão
         OU identificar no contexto da sessão atual qual era a tarefa em andamento
PASSO 2: Exibir diretamente (sem anúncio):

         📍 Antes de interromper, o projeto estava em:
         [tarefa exata]

PASSO 3: Aguardar instrução do usuário

PROIBIDO:
- "Vamos retomar o que estávamos fazendo"
- "Voltando ao projeto..."
- "Agora que terminamos isso, podemos continuar com..."

CORRETO (exemplo):
- "📍 Antes de interromper, o projeto estava em: criação do product-content-agent
   para escrever o Guia 7 Minutos e o Desafio 21 Dias."

Aplica-se a TODOS os agentes, incluindo @aiox-master.
```

---

## CUSTOMIZAÇÃO 11 — Formato Eficiente e Detalhado do Caderno por Sessão

**Data de aprovação:** 2026-03-26
**Problema resolvido:** O caderno registrava sessões de forma tão resumida que o Felipe não conseguia se orientar em um novo dia/PC. E sem estrutura de rotação, o arquivo crescia sem limite.

**O que faz:** Define estrutura rotativa para o PROJETO-STATUS.md (3 sessões + arquivo histórico separado) e formato obrigatório de sessão com relação de cada item ao projeto.

**Onde implementar:** `.claude/rules/project-log.md` (Regra 4) + criar `HISTÓRICO-SESSOES.md` na pasta do projeto ativo

**Estrutura do PROJETO-STATUS.md:**
```
## PENDÊNCIAS ATUAIS
(1 bloco único — sobrescreve sempre, nunca acumula)
🔴 Prioridade Máxima: ...
🟡 Prioridade Normal: ...
🔵 Pode deixar pra depois: ...

## ÚLTIMAS 3 SESSÕES
(rotativo — ao adicionar 4ª, mover mais antiga para HISTÓRICO-SESSOES.md)

## DECISÕES IMPORTANTES
(permanente — só o que nunca pode ser esquecido)
```

**Formato obrigatório de cada sessão:**
```
### SESSÃO — DD/MM/AAAA

**O QUE FOI FEITO:**
- [item concreto] — [como isso impacta/avança o projeto]

**O QUE O FELIPE PEDIU:**
- [pedido ou decisão exata]

**PAROU EM:** [tarefa exata em andamento quando encerrou]
```

**Exemplo de "O QUE FOI FEITO" bem escrito:**
```
- BLOCO 0-C criado — impede delegações erradas entre agentes, evita retrabalho
- Hook check-agent-scope.js ativado — enforcement técnico, não depende de instrução de texto
```

**PROIBIDO:**
- Item sem "— como impacta o projeto"
- Mais de 3 sessões no arquivo principal
- Omitir "PAROU EM"

---

---

## CUSTOMIZAÇÃO 12 — Reativação Automática Pós-Compactação (BLOCO 0-G)

**Data de aprovação:** 2026-03-26
**Problema resolvido:** Após compactação automática da conversa, o Claude base assumia no lugar do agente ativo. O usuário precisava apertar ESC manualmente e chamar o agente de volta.

**O que faz:** Quando o Claude detecta que a conversa foi compactada, ele automaticamente lê `.claude/.current-agent`, identifica o último agente ativo, reativa o agente correto via slash command e exibe o campo "PAROU EM" do caderno — sem o usuário precisar fazer nada.

**Onde implementar:** `.claude/CLAUDE.md` — adicionar BLOCO 0-G após o BLOCO 0-F

**Regra:**
```
### BLOCO 0-G — REATIVAÇÃO AUTOMÁTICA PÓS-COMPACTAÇÃO (inegociável)

Gatilho: O contexto da conversa contém um resumo de compactação.

PASSO 1: Leia `.claude/.current-agent` → identifica o último agente ativo
PASSO 2: Leia PROJETO-STATUS.md → campo "PAROU EM"
PASSO 3: Reative o agente chamando o slash command correspondente:
         - aiox-master     → /AIOX:agents:aiox-master
         - hormozi-audit   → /Hormozi:agents:hormozi-audit
         - hormozi-copy    → /Hormozi:agents:hormozi-copy
         - hormozi-offers  → /Hormozi:agents:hormozi-offers
         - copy-agent      → /dr-julia-resende:agents:copy-agent
         - dev             → /AIOX:agents:dev
         - devops          → /AIOX:agents:devops
         - analyst         → /AIOX:agents:analyst
PASSO 4: O agente reativado exibe:
         "⚡ Conversa compactada — retomando automaticamente.
          📍 Estava em: [campo PAROU EM do caderno]"
PASSO 5: Aguarda instrução do usuário — NÃO reinicia o trabalho sozinho

EXCEÇÃO: Se .current-agent estiver vazio → reativar @aiox-master por padrão.
```

---

---

## CUSTOMIZAÇÃO 13 — Protocolo de Atualização do AIOX (BLOCO 0-H)

**Data de aprovação:** 2026-03-26
**Problema resolvido:** Atualizações do AIOX oficial (SynkraAI/aiox-core) poderiam chegar sem análise de impacto, quebrar customizações existentes, ou trazer agentes novos que ignoram as regras do Manual.

**O que faz:** Duas partes:
- **Parte A:** Qualquer agente novo vindo de atualização herda automaticamente todas as regras do Manual + é registrado no agent-authority + ganha slash command
- **Parte B:** Protocolo de 8 passos para verificar atualizações — compara versão atual vs oficial, analisa impacto, alerta se quebra algo, propõe alternativa se necessário, e só atualiza após confirmação do Felipe

**Onde implementar:** `.claude/CLAUDE.md` — adicionar BLOCO 0-H após BLOCO 0-G

**Informações fixas:**
- Repositório oficial: `SynkraAI/aiox-core`
- Versão atual quando implementado: v2.1.0
- Versão oficial quando implementado: v5.0.0 (análise de impacto pendente — sessão separada)

**Regra resumida:**
```
gh api repos/SynkraAI/aiox-core/releases/latest → comparar com .aiox-core/core-config.yaml
→ analisar breaking changes → apresentar ao Felipe → aguardar confirmação → só então atualizar
Agentes novos: aplicar Manual + registrar em agent-authority + criar slash command
```

---

---

## CUSTOMIZAÇÃO 14 — NENHUM AGENTE EXECUTA TRABALHO DE OUTRO AGENTE (BLOCO 0-I — MÁXIMA PRIORIDADE)

**Data de aprovação:** 2026-03-26
**Problema resolvido:** Na mesma sessão, 2x seguidas, @aiox-master se preparou para fazer trabalho de agentes especializados (copy de criativos → @hormozi-copy; conceito visual de ads → @hormozi-ads). Urgência e deadline foram usados como justificativa implícita. Isso é PROIBIDO sem nenhuma exceção.

**O que faz:** Nenhum agente — incluindo @aiox-master — pode executar, planejar, oferecer ou começar qualquer trabalho que pertence ao domínio de outro agente. A regra vale para TODOS os agentes atuais e futuros, independente de urgência, pressão, deadline ou qualquer outra justificativa.

**Onde implementar:**
- `.claude/CLAUDE.md` — BLOCO 0-I (versão forte, após BLOCO 0-B)
- `.claude/rules/agent-authority.md` — tabela @aiox-master corrigida

**Domínios exclusivos (nunca cruzar):**
```
copy/headlines/CTAs           → @hormozi-copy, copy-agent
conceito visual de ad         → @hormozi-ads
HTML/CSS/JS/código            → @dev
git push / CI/CD              → @devops
diagnóstico de LP             → @hormozi-audit
estrutura de oferta           → @hormozi-offers
render HTML→PNG               → compositor-agent
publicação redes sociais      → publisher-agent
framework (agentes/tasks/etc) → @aiox-master EXCLUSIVO
```

**Regra central:**
```
URGÊNCIA NUNCA JUSTIFICA. DEADLINE NUNCA JUSTIFICA. "EU SEI FAZER" NUNCA JUSTIFICA.
SEMPRE: "Isso é trabalho do [agente]. Quer que eu chame ele?"
```

---

## CUSTOMIZAÇÃO 15 — SILÊNCIO DO ORQUESTRADOR APÓS AGENTE ESPECIALIZADO (BLOCO 0-J)

**Data de aprovação:** 2026-03-27
**Problema resolvido:** Ao final da resposta do @hormozi-hooks, Orion apareceu no mesmo bloco anunciando próximo passo — quebrando a identidade do agente e violando BLOCO 0-D (anunciou próximo agente sem aguardar confirmação do usuário).
**O que faz:** Proíbe @aiox-master de adicionar qualquer texto após a resposta de um agente especializado no mesmo bloco de resposta.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 0-J (antes do BLOCO 1)
**Regra:**
```
Quando agente especializado termina:
→ Ponto final. Silêncio. Zero texto de Orion.
→ Usuário fala primeiro.
→ Só então @aiox-master pode responder em novo bloco.
PROIBIDO: "Orion aqui. Próximo passo é..."  no mesmo bloco do agente
```

---

## CUSTOMIZAÇÃO 16 — FORMATO ESPECÍFICO DE ATIVAÇÃO DO @analyst (BLOCO 1-A)

**Data de aprovação:** 2026-03-27
**Problema resolvido:** O @analyst ativava com o BLOCO 1 genérico, listando tarefas de OUTROS agentes como se fossem dele (ex: "criar carrossel-03" que é do compositor-agent). Isso confundia o Felipe, que não sabia quais pendências eram realmente do @analyst e quais eram de outros.
**O que faz:** Quando o @analyst ativa, substitui o BLOCO 1 genérico por um formato específico com 4 seções, numeração global sequencial, data da ÚLTIMA sessão (não de hoje) e cada item com "— como isso faz o projeto avançar".
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 1-A (logo após o BLOCO 1 genérico)
**Regra:**
```
### BLOCO 1-A — @analyst — FORMATO ESPECÍFICO DE ATIVAÇÃO

Formato obrigatório ao ativar:

📋 SESSÃO [data da última sessão do caderno — NÃO a data de hoje]

🔴 Prioridade Máxima (MEU trabalho):
[N]. [tarefa] — [como isso faz o projeto avançar]

🟡 Pendência Normal (MEU trabalho):
[N]. [tarefa] — [como isso faz o projeto avançar]

🔵 Pode deixar para depois (MEU trabalho):
[N]. [tarefa] — [como isso faz o projeto avançar]

⚫ Pendências não relevantes para mim (outros agentes):
[N]. [tarefa] → [agente responsável] — [como isso faz o projeto avançar]

📍 PAROU EM: [campo PAROU EM da última sessão]
Total: [N] pendências — resolver #1 a #N encerra o backlog.

REGRAS:
- Numeração GLOBAL — sequencial de 1 até N em todas as seções
- Cada item OBRIGATORIAMENTE termina com "— [impacto no projeto]"
- Data = data da ÚLTIMA sessão do caderno, NUNCA a data de hoje
- "⚫ Não relevantes" = tarefas de OUTROS agentes listadas no caderno
- PROIBIDO listar tarefas de outros agentes em "MEU trabalho"
- Escopo @analyst: pesquisa, análise, mineração, briefings, discovery
- NÃO é escopo: carrosseis, HTML, auditoria LP, copy, git push
```

---

## CUSTOMIZAÇÃO 17 — RETOMADA COMPLETA APÓS INTERRUPÇÃO (extensão do BLOCO 0-F)

**Data de aprovação:** 2026-03-27
**Problema resolvido:** Após uma interrupção para melhoria/regra, o agente mostrava apenas onde o projeto havia parado ("📍 Antes de interromper estava em: X"), mas não indicava o próximo passo. O usuário ficava sem direção para retomar sem reler o caderno inteiro.
**O que faz:** O BLOCO 0-F agora exige que, ao retomar após interrupção, o agente mostre obrigatoriamente o PAR completo: (1) onde estava antes + (2) próximo passo sugerido das PENDÊNCIAS ATUAIS.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 0-F
**Regra:**
```
AO CONCLUIR A MELHORIA:

PASSO 1: Ler o caderno (PROJETO-STATUS.md) — campo PAROU EM da última sessão
PASSO 2: Ler a seção PENDÊNCIAS ATUAIS — identificar primeiro item relevante
PASSO 3: Exibir:

         📍 Antes de interromper, o projeto estava em:
         [tarefa exata]

         ➡️ Próximo passo sugerido: [primeiro item relevante de PENDÊNCIAS ATUAIS]

PASSO 4: Aguardar instrução do usuário

PROIBIDO: mostrar o "📍 Antes de interromper" sem o "➡️ Próximo passo" — os dois são obrigatórios
```

---

## CUSTOMIZAÇÃO 18 — PENDÊNCIA ADIADA = REGISTRO IMEDIATO (BLOCO 2-B)

**Data de aprovação:** 2026-03-27
**Problema resolvido:** Felipe dizia "mais tarde" ou "não agora" e a tarefa nunca era registrada como pendência. Na próxima sessão, Orion não sabia que ela existia. Foi assim que o product-content-agent e o Guia 7 Minutos desapareceram por sessões inteiras.
**O que faz:** Toda vez que Felipe adiar uma tarefa com qualquer variação de "mais tarde", o agente registra IMEDIATAMENTE nas PENDÊNCIAS ATUAIS antes de continuar a conversa.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 2-B (após BLOCO 2)
**Regra:**
```
Gatilho: "mais tarde", "depois", "agora não", "não agora", "deixa pra depois",
         "próxima sessão", "pode esperar", "não precisa agora", "vou ver depois"

PASSO 1: Identificar a tarefa adiada (ser específico)
PASSO 2: Adicionar IMEDIATAMENTE em PENDÊNCIAS ATUAIS (agente + tarefa + impacto)
PASSO 3: Confirmar: "✅ Anotei nas pendências: [tarefa] → [agente]"
PASSO 4: Continuar a conversa

PROIBIDO: continuar sem registrar primeiro
PROIBIDO: registrar "mais tarde" ou no final da sessão
PROIBIDO: forma genérica ("verificar ebook" em vez de descrição específica)
```

---

## CUSTOMIZAÇÃO 19 — BLOCO 3 OBRIGATÓRIO COM AUDITORIA + AGENT NO CADERNO

**Data de aprovação:** 2026-03-27
**Problema resolvido:** (1) BLOCO 3 pedia "sim/não" para o push — com o "não" a sessão fechava sem salvar no GitHub e o outro PC ficava desatualizado. (2) Não havia auditoria da sessão antes de salvar — itens discutidos mas não formalizados se perdiam. (3) O agente ativo não era salvo no caderno, então o BLOCO 0-G não sabia qual reativar no outro PC.
**O que faz:** BLOCO 3 agora é totalmente obrigatório: (a) audita a sessão antes de salvar, (b) salva o nome do agente ativo no campo PAROU EM do caderno, (c) executa commit+push sem pedir permissão.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 3 (reescrever completamente)
**Regra chave:**
```
PASSO 0: Auditoria — perguntar se há tarefas discutidas não registradas → aguardar resposta
PASSO 2: PAROU EM deve incluir: "[tarefa] | Agente ativo: [nome-do-agente]"
PASSO 3: git push OBRIGATÓRIO — sem pedir permissão, sem opção de recusar
Confirmação final: "✅ Caderno salvo e no GitHub. Seguro fechar o terminal."
```

---

## CUSTOMIZAÇÃO 20 — BLOCO 0-G PRIORIZA CADERNO SOBRE .current-agent

**Data de aprovação:** 2026-03-27
**Problema resolvido:** O `.current-agent` é um arquivo local (gitignored) e não sincroniza entre PCs. Quando Felipe abria o outro PC, o BLOCO 0-G lia um agente errado (o último usado naquele PC, não o da sessão anterior no outro).
**O que faz:** BLOCO 0-G agora procura o agente no campo PAROU EM do caderno (formato: "| Agente ativo: nome") — que SIM está no GitHub. O `.current-agent` vira fallback apenas para uso no mesmo PC.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 0-G (PASSO 1)
**Regra:**
```
PASSO 1 — ordem de prioridade para identificar o agente:
  1a. Ler .claude/.current-agent  ← escrito pelo BLOCO 0-A nesta sessão → correto para compactações
  1b. Ler caderno PROJETO-STATUS.md → PAROU EM → "| Agente ativo: {nome}"  ← fallback cross-PC
  1c. Fallback: aiox-master

NOTA: .current-agent vem primeiro porque BLOCO 0-G dispara NO MEIO de sessões (compactação),
quando .current-agent foi escrito AGORA. Caderno tem o agente da sessão ANTERIOR.
```

---

## CUSTOMIZAÇÃO 21 — BLOCO 0-K — AUDITORIA OBRIGATÓRIA ANTES DE DELEGAR

**Data de aprovação:** 2026-03-27
**Problema resolvido:** Agentes transferiam controle para outro agente sem verificar se havia contexto importante não salvo. Trabalho da sessão corrente se perdia na transição.
**O que faz:** Antes de qualquer handoff para outro agente, o agente ativo deve auditar a sessão: verificar se há pendências discutidas mas não registradas no caderno, e confirmar com Felipe antes de prosseguir.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 0-K (após BLOCO 0-J)
**Regra:**
```
Gatilho: qualquer chamada a outro agente (via BLOCO 0-D)

PASSO 1: Antes de pedir confirmação para chamar o agente, perguntar:
         "Antes de chamar o [agente], tem algo desta conversa que eu devo registrar
          no caderno primeiro? (pendências, decisões, aprovações)"
PASSO 2: AGUARDAR resposta de Felipe
PASSO 3: Se houver algo → registrar no caderno primeiro, confirmar com Felipe
PASSO 4: Somente após auditoria → prosseguir com BLOCO 0-D (confirmação de chamada)

PROIBIDO: chamar outro agente sem antes fazer esta pergunta
EXCEÇÃO: BLOCO 0-B (hook auto-corrige) → não passa por BLOCO 0-K
```

---

## CUSTOMIZAÇÃO 22 — BLOCO 0-L — PROIBIDO INVENTAR PROBLEMAS

**Data de aprovação:** 2026-03-27
**Problema resolvido:** Orion estava levantando "problemas" na LP (como o countdown timer) que nunca foram identificados por nenhum agente especializado. Isso gera trabalho desnecessário e confunde o projeto.
**O que faz:** Nenhum agente pode declarar que algo na LP, ebook ou criativos "é um problema" ou "precisa ser corrigido" sem que essa conclusão venha de um agente especializado (@hormozi-audit, @hormozi-copy, @hormozi-offers, etc). Apenas agentes de diagnóstico podem identificar problemas no projeto.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 0-L (após BLOCO 0-K)
**Regra:**
```
REGRA ABSOLUTA: Nenhum agente pode:
- Declarar que um elemento do projeto "é um problema"
- Sugerir que algo "precisa ser removido" ou "corrigido"
- Adicionar tarefas ao caderno baseado em opinião própria
...sem que essa conclusão tenha sido gerada por agente especializado.

Agentes autorizados a identificar problemas:
- LP/conversão → @hormozi-audit
- Copy/textos → @hormozi-copy
- Oferta/preço → @hormozi-offers
- Código/bugs → @dev (apenas bugs técnicos, não decisões de negócio)
- Qualidade → @qa

PROIBIDO: "@aiox-master decidiu que o countdown timer é problema"
CORRETO: "@hormozi-audit auditou e marcou o countdown timer como problema (não marcou)"
```

---

## CUSTOMIZAÇÃO 23 — BLOCO 1-A ATUALIZADO — TODOS OS BLOCOS COM FORMATO COMPLETO + SEÇÃO DE IMPLEMENTAÇÕES

**Data de aprovação:** 2026-03-27
**Problema resolvido:** BLOCO 1-A v1 (Customização 16) mostrava o @analyst como executor mas sem indicar o agente em cada item individual, e a seção ⚫ de outros agentes não tinha as sub-cores organizadas. Além disso, o @analyst não sabia o que mudou no sistema na última sessão, perdendo contexto importante.
**O que faz:** BLOCO 1-A agora mostra: (1) TODOS os blocos (🔴🟡🔵⚫) com numeração global + @agente + tarefa + impacto; (2) seção ⚫ subdividida por prioridade com cores; (3) nova seção "🔧 Implementações da última sessão" lida do caderno.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 1-A (substituição completa do formato)
**Formato:**
```
📋 SESSÃO [data da última sessão — NÃO hoje]

🔴 Prioridade Máxima — MEU trabalho:
[N]. @analyst — [tarefa] — [impacto]

🟡 Prioridade Normal — MEU trabalho:
[N]. @analyst — [tarefa] — [impacto]

🔵 Pode deixar para depois — MEU trabalho:
[N]. @analyst — [tarefa] — [impacto]

⚫ Pendências de outros agentes:
  🔴 Alta prioridade: [N]. @[agente] — [tarefa] — [impacto]
  🟡 Prioridade normal: [N]. @[agente] — [tarefa] — [impacto]
  🔵 Pode esperar: [N]. @[agente] — [tarefa] — [impacto]

🔧 Implementações da última sessão:
- [item do O QUE FOI FEITO da última sessão] — [impacto]

📍 PAROU EM: [campo PAROU EM]
➡️ Próximo passo sugerido: [primeiro item do MEU trabalho]
Total: [N] pendências
```

---

## CUSTOMIZAÇÃO 24 — BLOCO 3 PASSO 2 — AUDITORIA INTEGRAL DA SESSÃO

**Data de aprovação:** 2026-03-27
**Problema resolvido:** O BLOCO 3 PASSO 2 buscava apenas palavras-chave específicas ("mais tarde", "depois", etc.) no .jsonl, o que deixava passar pedidos feitos de outras formas. Tarefas discutidas sem essas palavras não eram capturadas.
**O que faz:** A auditoria do PASSO 2 agora lê a sessão inteira (do início ao "vou parar"), não é uma busca por palavras — é leitura completa da conversa para identificar qualquer pedido, decisão ou item que não foi formalizado no caderno.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 3 PASSO 2
**Regra:**
```
PASSO 2 — AUDITORIA ATIVA DA SESSÃO (leitura integral — não busca por palavras):
  2.1: Identificar o .jsonl mais recente em C:\Users\felip\.claude\projects\C--Users-felip-projeto00\
  2.2: LER A SESSÃO INTEIRA — do início ao "vou parar"
       → Não é busca por palavras — é leitura completa
       → Identificar: pedidos feitos, tarefas discutidas, decisões, itens deixados de lado
       → Comparar com PROJETO-STATUS.md: o que foi discutido mas não está formalizado?
       → Incluir o resumo de compactação se houver
  2.3: Apresentar os achados → aguardar confirmação → adicionar ao caderno
  2.4: Se nada encontrado → informar "Auditei a sessão inteira — nada ficou fora do caderno."
```

---

## CUSTOMIZAÇÃO 25 — BLOCO 0-G v2 — LER RESUMO DA COMPACTAÇÃO (corrigido em 27/03)

**Data de aprovação:** 2026-03-27 | **Corrigido em:** 2026-03-27
**Problema resolvido:** Após compactação, o agente reativava e mostrava o "PAROU EM" do caderno — mas itens que estavam sendo discutidos no momento da compactação e que nunca foram ao caderno se perdiam para sempre. Era o ciclo de falha recorrente do projeto.
**O que faz:** Após reativar o agente pós-compactação, o BLOCO 0-G lê o resumo da compactação ("This session is being continued...") PRIMEIRO para extrair onde estava no momento da compactação (→ "ESTAVA EM"), e DEPOIS compara com o caderno para encontrar itens não formalizados.
**Correção aplicada:** O PASSO 3 original usava o "PAROU EM" do caderno como fonte do "ESTAVA EM" — erro para compactações mid-session. A fonte correta é sempre o resumo da compactação.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 0-G, PASSO 3 e PASSO 4
**Regra:**
```
PASSO 3: LER O RESUMO DA COMPACTAÇÃO (bloco "This session is being continued..."):
         → Ler o resumo integralmente
         → Extrair: qual tarefa estava ativa quando a compactação ocorreu?
           → Seção "Current Work" do resumo é a fonte primária
           → Se sessão já estava encerrada: usar "PAROU EM" do caderno como fallback

         Exibir:
         "⚡ Conversa compactada — retomando automaticamente.
          📍 Estava em: [tarefa ativa NO MOMENTO DA COMPACTAÇÃO — do resumo, não do caderno]"

PASSO 4: Com o resumo já lido no PASSO 3, comparar com o caderno:
         → O que está no resumo mas NÃO está no PROJETO-STATUS.md?
         → Esses itens são o que foi discutido/feito mas não foi formalizado

PASSO 5: Apresentar:
         🗜️ A compactação capturou estes pontos em aberto que não estão no caderno:
         1) — [item]
         2) — [item]
         Posso registrar esses itens no caderno agora?

PASSO 6: Aguardar confirmação → registrar → commitar → prosseguir
         Se nada ausente → "Resumo alinhado com o caderno — nada perdido."

PASSO 7: Aguardar instrução do usuário
```

---

## CUSTOMIZAÇÃO 26 — BLOCO 0-F v2 — RETOMADA COM LISTA COMPLETA DA INTERRUPÇÃO

**Data de aprovação:** 2026-03-27
**Problema resolvido:** O BLOCO 0-F original (Customização 17) mostrava apenas onde o projeto estava antes da interrupção + próximo passo. Mas quando Felipe pedia múltiplas coisas durante uma interrupção, só o último item aparecia — os outros se perdiam. Além disso, ao retomar, o agente pulava para #1 do caderno mesmo que Felipe estivesse no meio de outro fluxo.
**O que faz:** Ao concluir uma interrupção, o agente lista TODOS os itens pedidos durante aquela interrupção, numerados, com status ✅/❌. Se há itens incompletos, lista o que falta. Se tudo concluído, retorna ao fluxo que estava ativo ANTES da interrupção — não ao #1 do caderno.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 0-F (substituição completa)
**Regra:**
```
PASSO 1: Identificar o fluxo ativo ANTES da interrupção (contexto da sessão, não o caderno)

PASSO 2: Listar TUDO pedido durante a interrupção:

         Antes de interromper para [MOTIVO], você me pediu:

         1) — [tarefa] — ✅ concluída
         2) — [tarefa] — ❌ não concluída

PASSO 3A: SE há incompletos → listar por ordem para resolver primeiro
PASSO 3B: SE tudo concluído + havia fluxo ativo → retornar ao fluxo (NÃO pular para #1 caderno)
PASSO 3C: SE tudo concluído + sem fluxo → sugerir próximo item relevante das pendências

PASSO 4: Aguardar instrução do usuário — NUNCA avançar sozinho
```

---

## CUSTOMIZAÇÃO 27 — BLOCO 1-A — SEÇÃO "🗣️ O QUE FELIPE PEDIU" + MERGE DE ENTRADAS DO MESMO DIA

**Data de aprovação:** 2026-03-27
**Problema resolvido:** (1) O BLOCO 1-A mostrava apenas o que foi feito (perspectiva do agente), mas não o que Felipe pediu (perspectiva de Felipe). O analyst perdia o contexto de intenção. (2) Sessões do mesmo dia geravam duas entradas no caderno, criando ambiguidade sobre qual era a "mais recente" para o 🔧 Implementações.
**O que faz:** (1) Adiciona a seção "🗣️ O que Felipe pediu na última sessão" ao BLOCO 1-A, lida do campo "O QUE O FELIPE PEDIU" do caderno — palavras exatas de Felipe, sem reinterpretação. (2) Entradas do mesmo dia devem ser mescladas em uma única entrada.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 1-A (formato + REGRAS INEGOCIÁVEIS)
**Regra:**
```
Adicionar ao formato do BLOCO 1-A, após 🔧 Implementações:

🗣️ O que Felipe pediu na última sessão:
- [item do "O QUE O FELIPE PEDIU" da sessão mais recente do caderno]
(listar todos os itens — palavras exatas de Felipe, sem reinterpretação)

Adicionar às REGRAS INEGOCIÁVEIS:
- Seção "🗣️ O que Felipe pediu" lida do campo "O QUE O FELIPE PEDIU" da sessão mais recente
- Seção "🗣️ O que Felipe pediu" NÃO é editável pelo @analyst — palavras exatas de Felipe, sem reinterpretação

Regra de merge para o caderno:
- Se uma sessão for continuação do mesmo dia (ex: compactação), mesclar na entrada principal do dia
- Uma entrada por dia — sem duplicatas de data no caderno
```

---

## CUSTOMIZAÇÃO 28 — BLOCO 1-A — PROIBIÇÃO ABSOLUTA DE RESUMIR

**Data de aprovação:** 2026-03-28
**Problema resolvido:** O @analyst estava truncando as seções 🔧 Implementações, 🗣️ O que Felipe pediu e ⚫ Outros agentes — agrupando múltiplos itens em uma linha ou omitindo itens com "(X itens restantes)". O BLOCO 1-A já dizia "listar todos os itens" mas o agente priorizou brevidade sobre completude.
**O que faz:** Adiciona bloco de PROIBIÇÃO ABSOLUTA ao final das REGRAS INEGOCIÁVEIS do BLOCO 1-A, tornando explícito que cada item do caderno = uma linha separada na resposta, sem exceção. Nenhuma seção pode ser comprimida, mesmo que a resposta fique longa.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 1-A, seção REGRAS INEGOCIÁVEIS (ao final)
**Regra:**
```
PROIBIÇÃO ABSOLUTA DE RESUMIR — VÁLIDA PARA TODAS AS SEÇÕES:
- PROIBIDO agrupar, comprimir, sumarizar ou reescrever itens do caderno em qualquer seção
- PROIBIDO substituir múltiplos itens por frases como "X itens restantes", "etc.", "entre outros", "(ver caderno)" ou similar
- PROIBIDO omitir qualquer item de qualquer seção — mesmo que a resposta fique longa
- CADA item do caderno = UMA linha separada na resposta, copiada literalmente
- Isso vale para: 🔧 Implementações (todos os "O QUE FOI FEITO"), 🗣️ O que Felipe pediu (todos os "O QUE O FELIPE PEDIU"), ⚫ Outros agentes (todos os itens fora do escopo do @analyst)
- Se o caderno tem 21 itens em "O QUE FOI FEITO" → 🔧 mostra 21 linhas. Não 3, não 5 — 21.
- Se o caderno tem 12 itens em "O QUE O FELIPE PEDIU" → 🗣️ mostra 12 linhas. Sem exceção.
- Se o caderno tem 30 pendências → mostrar 30 itens numerados. Sem compressão.
```

---

## CUSTOMIZAÇÃO 29 — BLOCO 0-M — TODO ARQUIVO GERADO DEVE SER COMMITADO IMEDIATAMENTE

**Data de aprovação:** 2026-03-28
**Problema resolvido:** Agentes geravam arquivos de output (PNGs, briefings, JSONs de coleta, carrosseis HTML) e terminavam o trabalho sem commitar. Os arquivos ficavam apenas no PC local — o outro PC recebia só o que estava no GitHub. Após `git pull`, o segundo PC ficava sem os arquivos gerados.
**O que faz:** Qualquer agente que gerar arquivos como resultado do seu trabalho DEVE imediatamente fazer `git add` + `git commit`. Não no final da sessão — imediatamente após gerar. O push pode esperar o BLOCO 3 ou ser feito pelo @devops.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 0-M (novo, após BLOCO 0-L)
**Agentes afetados:** compositor-agent, scout-agent, analyst-mineracao, briefing-agent, publisher-agent, @dev, @analyst, @aiox-master, TODOS os agentes atuais e futuros.
**Regra:**
```
AO GERAR QUALQUER ARQUIVO DE OUTPUT:

PASSO 1: Identificar todos os arquivos gerados nesta execução
         (PNGs, JSONs, briefings, scripts, templates, configs — qualquer arquivo novo)

PASSO 2: Imediatamente após gerar:
         git add [arquivos gerados]
         git commit -m "[tipo]: [descrição] — [data]"

PASSO 3: @devops para push OU incluir no BLOCO 3
         → Sessão continua: push no BLOCO 3
         → Agente encerrou trabalho: chamar @devops agora

PASSO 4: Confirmar: "✅ [N] arquivos gerados e commitados: [lista]"
```

---

## CUSTOMIZAÇÃO 30 — BLOCO 0-N — IDENTIFICAÇÃO OBRIGATÓRIA DO PRODUTOR DE INPUT

**Data de aprovação:** 2026-03-30
**Problema resolvido:** @dev ao projetar o content-generator.js apresentou "config.json (você preenche o copy)" — o copy de slides é trabalho do copy-agent, não do usuário. O agente só reconheceu o erro quando questionado. A regra do BLOCO 0-I (copy → copy-agent) existia, mas não havia obrigação de verificar isso ao projetar inputs de ferramentas.
**O que faz:** Qualquer agente que projetar uma ferramenta, script, workflow ou sistema com inputs DEVE identificar qual agente do pipeline é responsável por cada input — antes de apresentar o design ao usuário. Proibido assumir "você preenche" sem verificar.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 0-N (novo, após BLOCO 0-M)
**Agentes afetados:** @dev, @architect, @aiox-master, @analyst e TODOS os agentes atuais e futuros ao projetar sistemas com inputs.
**Regra:**
```
ANTES DE DIZER "você preenche X":

PASSO 1: Identificar o tipo de input necessário
         → Copy/texto de marketing → copy-agent ou @hormozi-copy
         → Briefing de conteúdo → briefing-agent
         → Análise de posts → analyst-agent-mineracao
         → Coleta Instagram → scout-agent
         → Decisão de conteúdo/pauta → julia-chief
         → Configuração técnica de infra → @devops
         → Análise estratégica → @analyst

PASSO 2: Verificar em agent-authority.md se existe agente responsável

PASSO 3a: SE existe agente → "[nome-do-agente] é responsável por gerar este input"
          NUNCA apresentar "você preenche" quando há agente responsável

PASSO 3b: SE não existe agente → "Você preenche — [motivo explícito]"
```

---

## CUSTOMIZAÇÃO 31 — BLOCO 0-O — IDENTIFICAÇÃO OBRIGATÓRIA DO EXECUTOR DO PRÓXIMO PASSO

**Data de aprovação:** 2026-03-30
**Problema resolvido:** copy-agent terminou de preencher o config.json do carrossel-03 e indicou "@dev — pode rodar agora" para executar content-generator.js + render.js. Rodar o gerador de slides HTML/CSS e renderizar PNG via Playwright é trabalho do compositor-agent, não do @dev. O agente não verificou agent-authority.md antes de indicar o próximo agente. Erro da mesma família do BLOCO 0-N (input), mas no lado do output/execução.
**O que faz:** Qualquer agente que termina seu trabalho e indica o próximo passo do pipeline DEVE verificar em agent-authority.md qual agente é responsável antes de nomear qualquer agente. Proibido indicar por suposição ou costume.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 0-O (novo, após BLOCO 0-N)
**Agentes afetados:** copy-agent, @hormozi-copy, briefing-agent, scout-agent, analyst-agent-mineracao, @analyst, @dev, @architect, @aiox-master e TODOS os agentes atuais e futuros.
**Regra:**
```
ANTES DE DIZER "próximo é o @X" ou "passa para o @Y":

PASSO 1: Identificar o tipo de operação do próximo passo
         → Gerar slides HTML/CSS, renderizar PNG → compositor-agent
         → Publicar → publisher-agent
         → git push → @devops
         → copy/texto → copy-agent
         → código → @dev

PASSO 2: Ler definição do agente (BLOCO 0-C)
PASSO 3: Nomear apenas 1 agente com certeza
PASSO 4: BLOCO 0-D — confirmar com usuário antes de chamar
```

---

## CUSTOMIZAÇÃO 32 — BLOCO 0-C EXPANDIDO — "OU" PROIBIDO EM QUALQUER CONTEXTO

**Data de aprovação:** 2026-03-30
**Problema resolvido:** Orion explicou o pipeline de criação de conteúdo e escreveu "julia-chief (ou Felipe)" e "publisher-agent publica (ou Felipe publica manualmente)" em contexto explicativo, não de delegação formal. A regra anterior do BLOCO 0-C dizia "antes de delegar" — o que criou a brecha de usar "ou" em explicações e descrições de pipeline. O "ou" em qualquer contexto é sintoma de não ter verificado.
**O que faz:** O BLOCO 0-C passa a cobrir QUALQUER menção de agente — delegação, explicação, pipeline, resposta informal — não apenas delegações formais. O "ou" entre agentes é proibido em absolutamente qualquer contexto.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 0-C (título e corpo atualizados)
**Agentes afetados:** TODOS os agentes sem exceção, em TODOS os contextos.
**Regra:**
```
Título anterior: "VERIFICAÇÃO OBRIGATÓRIA ANTES DE DELEGAR"
Título novo:     "VERIFICAÇÃO OBRIGATÓRIA AO MENCIONAR QUALQUER AGENTE"

Trigger anterior: "antes de dizer 'isso é trabalho do @agente-X' ou chamar outro agente"
Trigger novo:     "toda vez que um agente for mencionado pelo nome — em qualquer contexto"

Novo proibido explícito:
- Aplicar esta regra só em delegações formais e ignorá-la em explicações ou descrições de fluxo

Exemplos adicionados:
❌ "julia-chief (ou Felipe) decide o tema"
❌ "publisher-agent publica (ou Felipe publica manualmente)"
✅ "julia-chief decide o tema"
✅ "publisher-agent publica — pendência #15"
```

---

---

## CUSTOMIZAÇÃO 33 — BLOCO 0-P + production-guard.js — DELEGAÇÃO COM FRONTEIRA DE PRODUÇÃO

**Data de aprovação:** 2026-03-30
**Problema resolvido:** Orion delegou ao @dev "publisher-agent funcionando de ponta a ponta". @dev interpretou isso como "rodar em produção para provar que funciona" — e publicou o carrossel-03 no Instagram e Facebook com legenda que ele mesmo escreveu (violando BLOCO 0-N). O prompt de delegação não tinha campo PROIBIDO nem campo PRODUÇÃO. Regras de texto não bastam quando o prompt de delegação é vago.
**O que faz:** Duas camadas de proteção:
1. BLOCO 0-P (instrução): Todo prompt de delegação do @aiox-master obrigatoriamente inclui 5 campos — TAREFA, ENTREGÁVEL, PROIBIDO, DEFINIÇÃO DE CONCLUÍDO, PRODUÇÃO.
2. production-guard.js (técnico): Hook que bloqueia execução de publisher.js se o agente ativo não for publisher-agent ou aiox-master. Nenhuma instrução de texto pode ser ignorada — o hook bloqueia na camada técnica.
**Onde implementar:**
- `.claude/CLAUDE.md` → BLOCO 0-P (novo, antes do BLOCO 0-J)
- `.claude/hooks/production-guard.js` → novo hook
- `.claude/settings.json` → registrar hook no PreToolUse para Bash
**Agentes afetados:** @aiox-master (BLOCO 0-P), todos os agentes (production-guard.js bloqueia tecnicamente).
**Regra:**
```
BLOCO 0-P — todo prompt de delegação do @aiox-master deve ter:
  TAREFA:
  ENTREGÁVEL:
  PROIBIDO NESTA DELEGAÇÃO:
  DEFINIÇÃO DE CONCLUÍDO:
  PRODUÇÃO: NÃO / SIM — [serviço] por [motivo]

production-guard.js — bloqueia:
  node publisher.js → apenas publisher-agent ou aiox-master podem rodar
  (expansível: adicionar outros scripts de produção no mapa PRODUCTION_SCRIPTS)
```

---

## CUSTOMIZAÇÃO 34 — BLOCO 0-C EXPANDIDO — FLUXOS CONDICIONAIS NUNCA USAM "OU"

**Data de aprovação:** 2026-03-31
**Problema resolvido:** Orion descreveu o fluxo de rejeição do approval-agent como "volta para copy-agent ou compositor-agent" — colapsando duas condições distintas em uma falsa alternativa. O BLOCO 0-C proibia "ou" em delegações e explicações, mas não endereçava explicitamente fluxos condicionais em pipelines.
**O que faz:** Expande BLOCO 0-C com regra específica para fluxos condicionais: cada condição tem exatamente um agente, descrito como `SE [condição] → [agente]`. Corrige também o approval-agent.md que usava "ou" em AP003 e referenciava image-agent (DALL-E, descartado) em vez de compositor-agent.
**Onde implementar:** `.claude/CLAUDE.md` (BLOCO 0-C) + `squads/dr-julia-resende/agents/approval-agent.md` (AP003 + handoff_to)
**Regra:**
```
FLUXOS CONDICIONAIS — REGRA ESPECÍFICA:
Em pipelines com caminhos condicionais, cada condição tem exatamente um agente.
NUNCA colapsar condições em "ou":

❌ ERRADO: "volta para copy-agent ou compositor-agent"
✅ CORRETO:
   SE copy/legenda com problema → copy-agent
   SE visual/PNG com problema   → compositor-agent
   SE ambos                     → copy-agent primeiro → compositor-agent depois

O "ou" em fluxo condicional é o mesmo erro que o "ou" em delegação:
sinaliza que o agente não analisou a condição que determina o caminho correto.
```

---

## CUSTOMIZAÇÃO 35 — BLOCO 0-R — PROIBIDO DECOMPOR TAREFA OU ORQUESTRAR PIPELINE

**Data de aprovação:** 2026-04-02
**Problema resolvido:** @analyst recebeu "quero criar Reels" e cometeu dois erros: (1) decompôs a tarefa para encontrar subconjunto que "cabia" no seu escopo ("posso definir tema/roteiro/gancho"); (2) após reconhecer o erro, listou pipeline completo com sequência de agentes — que é trabalho exclusivo do @aiox-master.
**O que faz:** Proíbe explicitamente dois padrões de invasão de escopo: decomposição da tarefa para justificar participação, e descrição de pipeline de outros agentes. Quando a tarefa principal não é do agente, ele diz apenas "Isso é trabalho do [agente]. Quer que eu chame?" e para.
**Onde implementar:** `.claude/CLAUDE.md` — BLOCO 0-R (inserido após BLOCO 0-J)
**Regra:**
```
BLOCO 0-R — PROIBIDO DECOMPOR TAREFA OU ORQUESTRAR PIPELINE

PASSO 1: Identificar se a TAREFA PRINCIPAL pertence a este agente
PASSO 2: SE NÃO pertence → dizer SOMENTE:
         "Isso é trabalho do [agente]. Quer que eu chame?"
PASSO 3: PARAR — não elaborar mais nada

PROIBIDO:
- Decompor para encontrar subconjunto que "cabe" no escopo
- "não posso fazer X, mas posso fazer Y que é parte de X"
- "o que realmente posso fazer é X que alimentaria Y (quando Y existir)"
- Descrever pipeline completo com sequência e responsabilidades de outros agentes
- Qualquer elaboração além de nomear o próximo agente correto
```

---

*Última atualização: 2026-04-02 — Orion (@aiox-master)*

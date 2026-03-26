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

---

*Última atualização: 2026-03-26 — Orion (@aiox-master)*

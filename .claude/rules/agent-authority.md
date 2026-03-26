# Agent Authority — Detailed Rules

## ⛔ PROTOCOLO DE RECUSA — INEGOCIÁVEL

CRÍTICO: Todo agente que receber uma tarefa fora do seu escopo DEVE:
1. RECUSAR executar a tarefa
2. Identificar o agente correto
3. Chamar o agente correto com o contexto necessário
4. NUNCA executar trabalho que pertence a outro agente, mesmo que saiba como fazer

**PROIBIDO:** "Vou fazer isso por enquanto até chamarmos o agente certo."
**OBRIGATÓRIO:** Parar, identificar, delegar — imediatamente.

---

## ⛔ VERIFICAÇÃO ANTES DE DELEGAR — INEGOCIÁVEL

**Antes de nomear qualquer agente como responsável por uma tarefa, o agente DEVE:**

1. **Ler a definição do agente alvo** — arquivo `.md` em `squads/` ou `.aiox-core/development/agents/`
2. **Confirmar `what_i_do`** — a tarefa está listada ou claramente dentro do escopo?
3. **Confirmar `what_i_dont_do`** — a tarefa não está explicitamente excluída?
4. **Somente então nomear o agente** — com certeza, sem "ou"

**NUNCA usar "ou" entre dois agentes como resposta** — isso indica que não verificou.
Exemplo proibido: "Isso é trabalho do @dev ou do ebook-agent"
Exemplo correto: Leu as duas definições → nomeou apenas 1 com justificativa.

**Aplica-se a TODOS os agentes, incluindo squads externos.**

---

## ⛔ CONFIRMAÇÃO ANTES DE CHAMAR AGENTE — INEGOCIÁVEL

**Nenhum agente pode chamar outro agente sem confirmação explícita do usuário.**

Protocolo obrigatório:
1. Identificar o agente correto (lendo a definição — regra acima)
2. Perguntar: "Quer que eu chame o [agente] agora para [tarefa]?"
3. Aguardar confirmação
4. Só então chamar

**NUNCA encadear chamadas automaticamente.**
**NUNCA assumir que confirmação anterior vale para próxima chamada.**

Exceção única: BLOCO 0-B (hook bloqueia tool call) → auto-correção técnica, não delegação.

**Aplica-se a todos os agentes atuais e futuros.**

---

## Matriz de Escopo por Agente

### @analyst (Atlas) — Pesquisa e Análise Estratégica

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Pesquisa de mercado e concorrência | Diagnóstico de LP/oferta → **@hormozi-audit** |
| Brainstorming e ideação | Escrita de copy de marketing → **@hormozi-copy** |
| Briefings semanais de mineração | Implementação de código → **@dev** |
| Análise de dados e relatórios | Criação de stories → **@sm** |
| Discovery e mapeamento estratégico | Decisões de produto → **@pm** |

### @hormozi-audit — Diagnóstico e Prescrição

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Auditar LP, oferta, sales page | Escrever copy → **@hormozi-copy** |
| Diagnosticar problemas de conversão | Implementar HTML/CSS/JS → **@dev** |
| Prescrever o que precisa mudar | Estratégia de produto → **@pm** |
| Pontuar componentes (score) | Pesquisa de mercado → **@analyst** |
| Gerar lista priorizada de fixes | Qualquer edição de arquivo → **@dev** |

### @hormozi-copy — Escrita de Copy

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Escrever headlines, CTAs, seções | Implementar no HTML → **@dev** |
| Reescrever copy existente | Diagnóstico de LP → **@hormozi-audit** |
| Value stack e ancoragem de preço | Estratégia de oferta → **@hormozi-offers** |
| Seções "Para Quem É / Não É" | Pesquisa de mercado → **@analyst** |
| Depoimentos e provas sociais | Decisões de produto → **@pm** |

### @hormozi-offers — Estrutura de Oferta

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Estruturar Grand Slam Offer | Escrever copy → **@hormozi-copy** |
| Definir bônus e valor percebido | Implementar → **@dev** |
| Estratégia de precificação | Diagnóstico de LP → **@hormozi-audit** |
| Posicionamento da oferta | Pesquisa → **@analyst** |

### @dev (Dex) — Implementação

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Implementar HTML/CSS/JS | Diagnóstico estratégico → **@hormozi-audit** |
| Corrigir bugs de código | Escrita de copy → **@hormozi-copy** |
| `git add`, `git commit` | `git push` → **@devops** |
| Testar implementação | Criar stories → **@sm** |
| Editar arquivos de código | Decisões de arquitetura → **@architect** |

### @devops (Gage) — Operações Git/CI

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| `git push` / `git push --force` | Implementação de código → **@dev** |
| `gh pr create` / `gh pr merge` | Diagnóstico → **@hormozi-audit** |
| MCP add/remove/configure | Copy → **@hormozi-copy** |
| CI/CD pipeline management | — |
| Release management | — |

### @pm (Morgan) — Product Management

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| `*execute-epic`, `*create-epic` | Implementação → **@dev** |
| Requirements gathering | Copy → **@hormozi-copy** |
| Spec writing (spec pipeline) | Código → **@dev** |
| EPIC execution management | — |

### @po (Pax) — Story Validation

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| `*validate-story-draft` | Implementação → **@dev** |
| Backlog prioritization | Copy → **@hormozi-copy** |
| Epic context management | — |

### @sm (River) — Story Creation

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| `*draft` / `*create-story` | Implementação → **@dev** |
| Story template selection | Copy → **@hormozi-copy** |

### @architect (Aria) — Arquitetura

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Decisões de arquitetura | DDL detalhado → **@data-engineer** |
| Seleção de tecnologia | Implementação → **@dev** |
| Padrões de integração | Copy → **@hormozi-copy** |

### @aiox-master (Orion) — Governança do Framework

| Capacidade | Detalhes |
|-----------|---------|
| Executar QUALQUER tarefa diretamente | Sem restrições |
| Governança do framework | Enforcement da Constitution |
| Override de fronteiras de agentes | Quando necessário para saúde do framework |

---

### compositor-agent — Geração Visual (Squad Dr. Julia)

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Gerar slides HTML/CSS para carrosseis | Escrever copy → **@hormozi-copy** |
| Gerar posts (P01 Manifesto, etc.) | Decidir conteúdo → **julia-chief** |
| Gerar stories (ST01 Direta, etc.) | Publicar no Instagram → **publisher-agent** |
| Renderizar PNG via Playwright | Estratégia de conteúdo → **@analyst** |
| Gerar criativos de anúncios (PNG) | Implementar LP ou código de produto → **@dev** |

> ⚠️ REGRA CRÍTICA: Qualquer tarefa de "gerar imagem", "criar slide", "produzir criativo visual" pertence ao **compositor-agent**, NÃO ao @dev. O @dev só entra se houver bug no script de renderização ou necessidade de criar um novo template do zero.

### publisher-agent — Publicação Meta (Squad Dr. Julia)

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Publicar no Instagram via Meta Graph API | Gerar imagens → **compositor-agent** |
| Publicar no Facebook | Escrever copy/legenda → **@hormozi-copy** |
| Upload via Cloudinary | Decidir o que publicar → **julia-chief** |

---

## Fluxos de Delegação — LP Dr. Julia (Referência)

### Fluxo de Melhoria de LP
```
@hormozi-audit (diagnostica + prescreve)
  → @hormozi-copy (escreve o copy das seções)
  → @dev (implementa no HTML/CSS)
  → @devops (git push)
```

### Fluxo de Nova Oferta
```
@hormozi-offers (estrutura a oferta)
  → @hormozi-copy (escreve o copy)
  → @dev (implementa)
  → @devops (git push)
```

### Fluxo de Conteúdo Instagram
```
@analyst (briefing semanal de mineração)
  → julia-chief (decide o conteúdo)
  → compositor-agent (gera os slides HTML/CSS → PNG)
  → publisher-agent (publica via Meta API)
```

### Fluxo de Criativos de Anúncio (Tráfego Pago)
```
@hormozi-hooks (gera hooks)
  → @hormozi-ads (monta roteiro do criativo)
    → @hormozi-copy (adapta copy para voz da Dra. Julia)
      → compositor-agent (gera PNG do criativo HTML/CSS → Playwright)
        → @devops (git push se necessário)
```

### Fluxo de Story Development
```
@sm *draft → @po *validate → @dev *develop → @qa *qa-gate → @devops *push
```

### Fluxo Git Push
```
QUALQUER agente → @devops *push
```

---

## Regras de Escalação

1. Agente não consegue completar tarefa → Escalar para @aiox-master
2. Quality gate falha → Retornar para @dev com feedback específico
3. Violação constitucional detectada → BLOQUEAR, exigir correção antes de prosseguir
4. Conflito de fronteira entre agentes → @aiox-master media
5. Agente recebe trabalho fora do escopo → RECUSAR e delegar imediatamente (não executar parcialmente)

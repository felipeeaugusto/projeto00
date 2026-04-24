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
| Estratégia e planejamento da mineração (frequência, perfis, análise de resultados) | Implementação de código → **@dev** |
| Análise de dados e relatórios | Criação de stories → **@sm** |
| Discovery e mapeamento estratégico | Decisões de produto → **@pm** |
| | **EXECUTAR** coleta Instagram → **scout-agent** |
| | **EXECUTAR** análise de posts coletados → **analyst-agent-mineracao** |
| | **EXECUTAR** geração de briefing → **briefing-agent** |

> ⚠️ REGRA CRÍTICA: Se o caderno tiver "@analyst — rodar mineração" ou qualquer variação de EXECUÇÃO do pipeline, @analyst deve **recusar** e apontar como erro de cadastro no caderno — nunca executar.

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
| Criar/modificar agentes, tasks, workflows, checklists | Escopo de framework — SIM |
| Atualizar CLAUDE.md, agent-authority.md, hooks, settings.json | Escopo de framework — SIM |
| Orquestrar fluxos e identificar agente correto | Escopo de framework — SIM |
| **Copy, HTML, código, criativos, diagnóstico, render de imagens** | **PROIBIDO — delegar SEMPRE, sem exceção, mesmo com urgência** |
| **"Vou fazer rápido porque é urgente"** | **PROIBIDO — urgência NUNCA justifica fazer trabalho de outro agente** |

> ⚠️ REGRA MÁXIMA: O escopo "universal" do @aiox-master é EXCLUSIVO para framework. Para qualquer trabalho de projeto (copy, código, visual, diagnóstico, publicação) → identificar o agente correto → perguntar ao usuário → aguardar confirmação → chamar. Sem exceções.

---

### product-content-agent — Documentos de Produto (Squad Dr. Julia)

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Escrever Guia de Implementação 7 Minutos | Reescrever o ebook existente → **ebook-agent** |
| Escrever Desafio 21 Dias | Gerar copy para redes sociais → **copy-agent** |
| Criar documentos novos de produto | Gerar imagens ou slides → **compositor-agent** |
| Usar Voice DNA da Dra. Julia | Publicar em redes sociais → **publisher-agent** |
| Submeter ao approval-agent antes de finalizar | Implementar HTML/CSS na LP → **@dev** |

---

### scout-agent — Coleta Instagram (Squad Dr. Julia — Pipeline de Mineração)

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Coletar posts via Apify (Instagram scraping) | Analisar posts coletados → **analyst-agent-mineracao** |
| Carregar lista de perfis de referência | Gerar briefing → **briefing-agent** |
| Filtrar por thresholds de engajamento | Decidir estratégia de mineração → **@analyst** |
| Salvar dados brutos em posts_brutos/ | Publicar conteúdo → **publisher-agent** |

### analyst-agent-mineracao — Análise de Posts (Squad Dr. Julia — Pipeline de Mineração)

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Processar JSON de posts brutos do scout-agent | Coletar posts → **scout-agent** |
| Extrair padrões (hook, estrutura, gatilho, pilar) | Gerar briefing → **briefing-agent** |
| Calcular taxa de engajamento | Escrever copy → **@hormozi-copy** |
| Salvar análise em posts_analisados/ | Criar carrosseis → **compositor-agent** |

### briefing-agent — Geração de Briefing (Squad Dr. Julia — Pipeline de Mineração)

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Ranquear posts por engajamento + relevância + novidade | Coletar posts → **scout-agent** |
| Gerar 4 briefings mensais (Opção A) com top 5 temas cada | Analisar posts → **analyst-agent-mineracao** |
| Adaptar hooks para voz da Dra. Julia | Criar carrosseis → **compositor-agent** |
| Entregar briefing ao julia-chief | Publicar conteúdo → **publisher-agent** |

> ⚠️ REGRA CRÍTICA — PIPELINE DE MINERAÇÃO: Nenhum agente externo ao squad (incluindo @analyst, @dev, @aiox-master) pode executar tarefas deste pipeline. @analyst planeja e estrategiza; a execução é sempre scout-agent → analyst-agent-mineracao → briefing-agent, nessa ordem.

### compositor-agent — Geração Visual (Squad Dr. Julia)

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Gerar slides HTML/CSS para carrosseis | Escrever copy → **@hormozi-copy** |
| Gerar posts (P01 Manifesto, etc.) | Decidir conteúdo → **julia-chief** |
| Gerar stories (ST01 Direta, etc.) | Publicar no Instagram → **publisher-agent** |
| Renderizar PNG via Playwright | Estratégia de conteúdo → **@analyst** |
| Gerar criativos de anúncios (PNG) | Implementar LP ou código de produto → **@dev** |
| | Gerar PDF de ebooks ou bônus → **pdf-agent** |

> ⚠️ REGRA CRÍTICA: Qualquer tarefa de "gerar imagem", "criar slide", "produzir criativo visual" pertence ao **compositor-agent**, NÃO ao @dev. O @dev só entra se houver bug no script de renderização ou necessidade de criar um novo template do zero.

### pdf-agent — Geração de PDF de Produto (Squad Dr. Julia)

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Converter .md de bônus em PDF visual A4 com identidade da Dra. Julia | Escrever conteúdo do documento → **product-content-agent** |
| Converter .txt do ebook em PDF visual A4 | Reescrever ebook → **ebook-agent** |
| Gerar capa, miolo, cabeçalho, rodapé, contracapa | Decidir o que vai no documento → **julia-chief** |
| Renderizar via Playwright page.pdf() | Publicar ou distribuir → **publisher-agent** |
| Salvar PDF em output/produtos/pdfs/ | Gerar PNGs de redes sociais → **compositor-agent** |

### publisher-agent — Publicação Meta (Squad Dr. Julia)

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Publicar no Instagram via Meta Graph API | Gerar imagens → **compositor-agent** |
| Publicar no Facebook | Escrever copy/legenda → **@hormozi-copy** |
| Upload via Cloudinary | Decidir o que publicar → **julia-chief** |

### video-prompt-agent — Prompts de Imagem e Animação para Reels (Squad Dr. Julia)

| PODE fazer | NÃO PODE fazer — delega para |
|-----------|------------------------------|
| Gerar 8 prompts de imagem em texto (um por cena do roteiro) | Chamar Gemini API, DALL-E ou qualquer API de imagem (→ **Felipe decide a ferramenta**) |
| Gerar 8 prompts de animação Kling (após GATE 1 aprovado) | Rodar Kling 3.0 ou Artlist (→ **Felipe executa manualmente**) |
| Aguardar GATE 1 (Felipe aprova prompts de imagem) | Montar o vídeo final (→ **Felipe faz no CapCut**) |
| Aguardar GATE 2 (Felipe aprova prompts de animação) | Escrever roteiro de fala (→ **script-agent**) |
| Garantir consistência visual da Dra. Julia entre as 8 cenas | Decidir tema ou pilar (→ **julia-chief**) |
| | Publicar em redes sociais (→ **publisher-agent**) |

> ⚠️ REGRA CRÍTICA: video-prompt-agent é um GERADOR DE TEXTO DE PROMPTS — não chama nenhuma API de imagem ou vídeo. A ferramenta de geração de imagem é escolha de Felipe na hora (Gemini, DALL-E, etc.).

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

### Fluxo de Reel (Pipeline de Vídeo — 24/04/2026)
```
julia-chief (decide tema + formato + pilar + visual)
  → @hormozi-hooks (hook dos 5 primeiros segundos)
  → script-agent (roteiro 8 cenas + fala + legenda + trilha)
  → video-prompt-agent FASE 1 (8 prompts de imagem)
  → [GATE 1: Felipe aprova + gera imagens na ferramenta de sua escolha]
  → video-prompt-agent FASE 2 (8 prompts de animação Kling)
  → [GATE 2: Felipe aprova + roda Kling manualmente no Artlist]
  → Felipe manual (monta Reel no CapCut)
  → publisher-agent (publica no Instagram e Facebook)
```
> Sem approval-agent (montagem manual = aprovação implícita de Felipe). Sem video-assembly-agent (CANCELADO — montagem é manual).

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

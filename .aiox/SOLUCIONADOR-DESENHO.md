# O SOLUCIONADOR — Desenho Completo

> **Status:** 🟡 desenho fechado no papel, **não implementado**. 17 de 17 buracos endereçados; pendências reais listadas na seção 12.
> **Escrito em:** 02/09/2026 pelo @aiox-master (Orion), a partir do que foi construído em conversa entre 30/08 e 02/09/2026.
> **Por que este arquivo existe:** até 02/09/2026 o desenho **só existia no `.jsonl` da sessão**, diluído em 27.742 linhas (achado E82). Se o terminal fechasse, o desenho se perdia. Este arquivo é a fonte da verdade a partir de agora.
> **Registro de origem:** os itens `E1`–`E84`, `D1`–`D17` e `DEC-1`–`DEC-14` citados aqui estão em `.aiox/itens-em-aberto.md`, com data e autor.

---

## 1. O problema que ele resolve

O framework AIOX tem ~37 BLOCOs no `CLAUDE.md`, 57 customizações no Manual e 4 hooks de enforcement. Mesmo assim, **erros do mesmo tipo se repetem**: agente diz que verificou e não verificou, agente reescreve seletor já validado, agente troca de persona sem registrar, achado importante fica só na conversa e some.

O padrão comum não é falta de regra — é que **a regra depende do agente perceber sozinho que deveria aplicá-la** (o PRINCÍPIO registrado no `CLAUDE.md`, antes da BLOCO 0-K). O Solucionador é a resposta estrutural: em vez de mais regras que dependem de autopercepção, um **fluxo com portões que produzem artefato verificável**.

---

## 2. A regra fundadora: o Solucionador é FLUXO, nunca AGENTE

> **E26 — regra estrutural, inegociável.**

| ❌ Proibido | ✅ Obrigatório |
|---|---|
| Um agente ler a definição do Pedro e escrever "⚙️ Pedro Valério: …" | O Pedro ser **ativado de verdade** (BLOCO 0-AC): arquivo de definição carregado, saudação visível, `.current-agent` atualizado |
| Um agente incorporar o framework de outro (ex: @architect usando o método do @qa) | Cada framework é executado por quem é dono dele |
| Concluir "os 3 convergiram" quando os 3 foram escritos pela mesma cabeça | Convergência só conta se cada persona foi ativada separadamente |

**O bug que originou a regra:** o @analyst escrevia as visões dos 3 do squad-creator e concluía "convergência total". Claro que convergia — era a mesma cabeça escrevendo os 3. O Felipe pegou perguntando *"como o Pedro, o Alan e o Finch estão dando a resposta se eles não estão sendo ativados?"*.

---

## 2.5 Ativação — como o fluxo começa (fecha o E105)

**Gatilho:** o Felipe escreve a frase **"/Solucionador"** em qualquer mensagem, pra qualquer agente, em qualquer momento — mesmo padrão universal do "Modo Navegador" e "Momento de Pausa".

**Regra completa, implementada em `.claude/CLAUDE.md` → BLOCO 0-AH** (esta seção só resume — a BLOCO é a fonte da verdade do comportamento, este arquivo é a fonte da verdade do desenho):

```
Felipe escreve "/Solucionador"
  → Portão 0 classifica o problema primeiro, sempre (seção 3, determinístico)
  → segue a trilha correspondente (seção 4)
  → cada portão da trilha é ativado de verdade, troca de persona visível (E26)
  → se não classificar → estado 3, para e chama o Felipe (seção 7)
  → nada volta silenciosamente (seção 9.5)
```

Não precisa mais decidir manualmente qual agente chamar a cada passo — a frase-gatilho ativa a sequência fixa sozinha. Isso resolve o E105 (achado na auditoria do "vou parar" de 02/09/2026): a resposta pra "precisa de gatilho de frase?" sempre foi sim, só nunca tinha virado regra ativa.

---

## 3. Portão 0 — o classificador

Antes de qualquer coisa, o item entrante é classificado. **Não é julgamento — é aritmética determinística.**

**Já existe implementado:** `.aiox-core/core/orchestration/task-complexity-classifier.js` (E80) e `.aiox-core/core/orchestration/fast-path-gate.js` (E79). Nenhum dos dois chama LLM.

### Como o `fast-path-gate.js` decide (E79)

| Sinais de automação | Peso | Sinais de risco | Peso |
|---|---|---|---|
| bulk-edit | 3 | architecture | 3 |
| structured-transform | 3 | security | 3 |
| mechanical-edit | 3 | destructive | 3 |
| map-then-apply | 2 | production | 2 |
| repetition | 2 | migration | 2 |
| parallelizable | 2 | | |

```
confiança = (automação + arquivos×0.45 + estruturados×0.55 + lote×0.35 − risco×1.35) / 13
passa = confiança >= 0.58  E  nenhum sinal de risco
```

🔑 **O risco pesa 1.35× mais que a automação, e um único sinal de risco reprova mesmo com confiança alta.** É a Loss Aversion 2.5:1 do Finch já dentro da fórmula — não precisou ser inventada.

**Saída:** `confidence`, `riskLevel`, `reasons[]`, `evidence{}`, `actions[]` — que é a rastreabilidade do E36 e o `risk_level` do E32, prontos.

### Quando o classificador não consegue classificar

`confidence` baixo (E80) ou padrão que não bate com nada conhecido → **estado 3** (seção 7). Isso generaliza a BLOCO 0-AD: ela deixa de ser só do pipeline Karzen e passa a valer para o Solucionador inteiro (**D2**).

---

## 4. As 4 trilhas

| Trilha | Quando | Quem entra | Orçamento (DEC-10) |
|---|---|---|---|
| 🟢 **Rápida** | mecânico, sem risco, escopo conhecido | @dev + @qa | **6** interações |
| 🟡 **Média** | toca regra ou mais de um arquivo | @dev + @qa + @po | **15** interações |
| 🔵 **Completa** | muda desenho, decisão nova, risco | os 9 portões inteiros | **30** interações |
| ⚫ **Estado 3** | não classificável | para e chama o Felipe | — |

**1 interação = mensagem do Felipe + resposta.** Estourou o orçamento → avisa no formato do estado 3: *"esse ciclo já está na interação N, o esperado era M. Continua, ajusta ou para?"* — **não trava, torna visível** (mitigação do **D16**).

🔑 **A trilha 🟢 é mais barata que o jeito atual.** 2 agentes contra o ad-hoc de hoje, que produziu os erros desta sessão inteira. Custo não é argumento contra o Solucionador.

---

## 5. Os 9 portões da trilha 🔵 — e o artefato de cada um

> **Este é o mecanismo central: a CADEIA DE ARTEFATOS.** Fechou 2 buracos de uma vez (**D5** e **D10**).
> ⚠️ **Ressalva (E91):** o D10 fecha como *conceito* (ler artefatos em disco pra saber onde parou) — mas o arquivo de estado que a seção 11 citava como pronto pra isso não existe mais nesse formato. Precisa adaptar a partir de `session-state.js`, não copiar `workflow-state-schema.yaml`.

| # | Portão | Quem | Artefato produzido | Recusa de partida se… |
|---|---|---|---|---|
| **1** | Viabilidade | 🎯 **Finch** | registro de triagem + `VIABILITY_ASSESSMENT` | — (é o primeiro) |
| **2** | Insumos | 🧠 **Alan** | evidências com `[SOURCE:]`, **mínimo 15 citações + 5 signature phrases** | não há registro de triagem |
| **3** | Processo | ⚙️ **Pedro** | `ARTEFATOS_READY` | `INSUMOS_READY` ausente |
| **4** | Validação de story | 📋 **@po** | status da story muda `Draft` → `Ready` **no arquivo** | `ARTEFATOS_READY` ausente |
| **4.5** | Handshake semântico | *(automático)* | relatório de conformidade | story não está `Ready` |
| **5** | Implementação | 💻 **@dev** | código + **3 bugs + 3 edge cases** no Dev Notes | story não está `Ready` |
| **6-8** | Qualidade | 🧪 **@qa** | arquivo de gate com veredito PASS/CONCERNS/FAIL/WAIVED | File List incompleta |
| **9** | Assinatura | 👤 **Felipe** | mensagem aprovando | qualquer gate anterior sem artefato |

### Por que a cadeia de artefatos funciona

O modelo veio do **@po**: ele não *diz* que validou — ele **muda o status da story de `Draft` para `Ready` no arquivo**, e dá `HALT` se o estado real não bater. Não depende de confiança: **o artefato existe ou não existe.**

**A evidência de que era necessário:** nesta sessão houve **86 ofertas de handoff, 74 sem a linha de auditoria exigida pela BLOCO 0-K, e zero bloqueios**. A regra existia. Ninguém aplicou. O artefato não tem como não ser aplicado — sem ele o portão seguinte não começa.

### Portão 4.5 — o handshake semântico

**⚠️ Correção (E104, 02/09/2026): NÃO existe implementado, ao contrário do que este documento dizia.** O código (`.aiox-core/core/synapse/context/semantic-handshake-engine.js`, E77) existe no disco, mas está **órfão** no `entity-registry.yaml` (`usedBy: []`, `lifecycle: orphan`) — nunca foi checado contra o registro antes de ser citado aqui. É o 8º mecanismo na mesma situação dos 4 que o E89 já achou mortos. Precisa ser construído/religado do zero, não só "reaproveitado".

> *"Turns planning constraints into executable checks that can run before implementation. It is **deterministic by default and does not call an LLM**."*

```
registerConstraints(texto do plano)
  → validateExecutionIntent({files})
    → passed / failed
      → generateComplianceReport()
```

🔑 **O desenho original pedia "teste ao vivo antes do código, com o Felipe olhando". Isso roda sozinho, sem LLM, e barra antes de escrever a primeira linha.** Regras já suportadas: PostgreSQL, escrita de estado local em serverless, imports absolutos, banimento de `eval`; aceita customizadas via `addConstraint()`.

---

## 6. Os 3 mecanismos anti-teatro

Portão com artefato impede pular etapa. Não impede **passar pela etapa sem olhar**. Para isso, 3 mecanismos:

### 6.1 — Cota obrigatória de discordância (E27, aprovado DEC-6)

Todo agente que recebe artefato do anterior é obrigado a produzir **no mínimo 1 objeção concreta**, OU listar explicitamente os checks que fez e não acharam nada:

> ✅ *"conferi: 15/15 citações com fonte, 6 signature phrases, 0 inferências não marcadas. Aceito."*
> ❌ *"Está bom, pode seguir."*

**Concordância sem check listado é proibida. Silêncio deixa de ser resposta válida.** Mesmo padrão da autocrítica obrigatória do @dev (3 bugs + 3 edge cases), que funciona por ser checável.

### 6.2 — Detector de convergência suspeita (E28, aprovado DEC-7)

**Inverte o sinal da convergência:**

| Antes | Agora |
|---|---|
| 3 agentes concordando = 🟢 validação | 3 agentes com **zero objeções** = 🔴 **alerta** |

Dispara `*post-mortem` obrigatório: ou o problema era trivial, ou ninguém olhou de verdade.

Ataca direto a frase que o Alan escreveu: *"os 4 convergimos e a convergência estava errada — convergência se sentiu como validação, e não era."* Agora ela **não pode** se sentir como validação.

### 6.3 — Cadeia de artefatos (seção 5)

---

## 7. O estado 3 — quando o fluxo para e chama o Felipe

Não são 2 estados (passa / reprova). São **3**.

| Estado | Significado | Ação |
|---|---|---|
| ✅ **1 — passa** | artefato existe, checks listados | segue pro próximo portão |
| ❌ **2 — reprova** | artefato falta ou check falhou | volta pro portão anterior |
| ⚫ **3 — não sei** | não classificável, sem executor, padrão inédito, orçamento estourado | **para e chama o Felipe** |

**O estado 3 nunca é resolvido por adivinhação.** É a BLOCO 0-AD generalizada.

### O 4º estado que o framework já tinha e o desenho não previa (E81)

O `.aiox-core/core/ids/circuit-breaker.js` tem **`HALF_OPEN`**: depois de 60s de bloqueio, libera **exatamente 1 sonda** e observa o resultado. Nem passar tudo, nem barrar tudo.

⚠️ **Contradição real, ainda aberta:** o `ids-principles.md` diz *"warn-and-proceed"* e *"Development NEVER blocked by IDS failures"* — **mas o código bloqueia** (`isAllowed()` retorna `false` em `OPEN`). É exatamente a pergunta do Felipe (*"se o vigia bugar, trava ou deixa passar?"*), e **o framework responde as duas coisas, em lugares diferentes**. Precisa ser decidido antes de o Solucionador depender do circuit breaker.

---

## 8. Quem vigia o Solucionador (D8) — a torre para no Felipe

A torre de vigias é infinita se a resposta for "outro vigia". Ela só para em algo **fora da máquina**.

### Camada 0 — o comando `status` (E6, DEC-1, DEC-2)

O Felipe digita, com os próprios dedos, a palavra **`status`** — sem prefixo, sem `>`, sem símbolo — e vê o estado real.

| Item | Decisão |
|---|---|
| Arquivos a criar (opção 🆎) | **`status.cmd`** (cmd.exe, digita `status`) **e** `status` (script sh para Git Bash, digita `./status`) |
| Por que os dois | A rotina do Felipe começa com `cmd + r` e usa `cd packages\karzen` (jeito de cmd), mas o CLAUDE.md pessoal dele diz Git Bash. Criar os dois elimina a chance de digitar e não funcionar |
| Executor | 💻 **@dev** |
| Custo | ~2h |

**O `status` mostra:** agente ativo (`.current-agent`) · portão atual do ciclo · artefatos esperados vs existentes (a lacuna do **D5**) · tamanho da fila (**D11**) · itens vetados e arquivados (**D7**) · se o Solucionador foi usado ou abandonado (**D16**).

🔴 **A Camada 0 é o único bloqueio real para voltar à planilha (DEC-14).** Nada mais na lista trava.

### Complemento: batimento cardíaco (E7)

Dentro da sessão, um sinal periódico de que o fluxo está vivo — no `synapse-wrapper.cjs`. Cobre o meio da sessão, onde o `status` (que é digitado no início) não alcança.

---

## 9. Como o fluxo lida com o Felipe

### 9.1 — Ausência temporária (D9)

O fluxo **espera**. Não avança sem ele. Complemento já implementado: retomada automática na volta se passou mais de 30 min (BLOCO 0-Y, PASSO 2-B).

### 9.2 — Ele muda de ideia no meio (D12)

O ciclo aceita **reset** em qualquer ponto: o item volta pra FASE 0 com a premissa nova. Barato, porque a triagem é barata.

### 9.3 — Escalada assimétrica (D6)

Erro de classificação do Finch para **cima** (classificou 🟢 o que era 🔵) é caro; para **baixo** é só lento. Logo: **em dúvida, sobe de trilha.** A mesma lógica vale para o E29 (em dúvida, trata como se mudasse o rumo).

### 9.4 — A 2ª rodada de assinatura

Depois do portão 9, a solução aprovada volta a passar pelos agentes — não para refazer, mas para checar **se a solução aprovada quebra algo já validado**. É o "Validador" depois do "Solucionador". Impasse na 2ª rodada não sobe automaticamente para o Felipe: itera internamente com o E27 e o E28 ligados. Só o **estado 3** chega até ele.

### 9.5 — Nada volta silenciosamente

Regra do Pedro: **"Nada volta num fluxo. NUNCA."** Quando um portão reprova, o retorno é **explícito e registrado**, com o motivo — nunca um "volta lá e refaz" invisível.

---

## 10. Alternância — Solucionador × planilha (D17, achado pelo Felipe)

Os dois disputam **o mesmo @dev e o mesmo Chrome do Modo Navegador**. Rodar juntos corrompe dado silenciosamente (foi o que aconteceu em 19/08/2026 com 2 cópias do mesmo script).

**Já implementado como BLOCO 0-U REGRA 5:** nunca 2 frentes disputando o mesmo executor e o mesmo recurso. **Alternância, nunca paralelismo.**

---

## 11. Onde o Solucionador mora no framework

> **Não precisa ser inventado — precisa ser escrito no formato que já existe (E67).**

| O que | Onde | Fonte |
|---|---|---|
| Categoria | **hybrid workflow** (`cross_context`) — usa agentes de core **e** de squad | `workflow-patterns.yaml` |
| Resolução de nome | `squad-first, core-fallback`; prefixo explícito `core:architect` / `squad:validator` | idem |
| Local do arquivo | `squads/{squad_name}/workflows/` | idem |
| Estado do ciclo | `.aiox/{instance-id}-state.yaml` | `workflow-state-schema.yaml` |
| Comandos | `*run-workflow start / continue / status / skip / abort` | `run-workflow.md` |

### ⚠️ CORREÇÃO (E91, 02/09/2026): o `workflow-state-schema.yaml` NÃO resolve o D10 — o mecanismo real é outro, e o formato é diferente

> A versão original desta seção dizia que o schema abaixo "já existe, é só usar". **Isso estava errado — verificado arquivo por arquivo.**

**A cadeia real, checada uma por uma:**

| Camada | Arquivo | Status |
|---|---|---|
| 1 | `workflow-state-schema.yaml` | ❌ Órfão (E68) |
| 2 | `workflow-state-manager.js` | ❌ **Também descontinuado** — `@deprecated Superseded by session-state.js (Story 11.5)` |
| 3 | `core/orchestration/session-state.js` | ✅ **Real, em produção** — `SESSION_STATE_VERSION '1.2'`, salva em `.session-state.yaml` |

**O mecanismo de verdade (`session-state.js`) não usa os campos abaixo.** Ele estrutura o estado em torno de `epic.id` / `progress.current_story` / `workflow.current_phase` — feito pro ciclo Epic→Story→Fase, não pra portões. **O D10 continua aberto**: o Solucionador precisa de um schema de estado adaptado do formato real de `session-state.js`, não pode só copiar a tabela abaixo (mantida como registro do que foi assumido errado, não como plano):

| Campo (assumido, NÃO existe assim de verdade) | O que resolveria, se existisse |
|---|---|
| ~~`current_step_index`~~ | em qual portão parou |
| ~~`steps[].artifacts_created[]`~~ | a cadeia de artefatos |
| ~~`steps[].session_id`~~ | qual sessão produziu |
| ~~`artifacts[].status: created \| pending`~~ | a lacuna do D5 |
| ~~`decisions[].rationale`~~ | por que foi decidido assim |
| ~~`status: active \| paused \| completed \| aborted`~~ | ciclo suspenso no "vou parar" |

**Achado relacionado:** `core/orchestration/master-orchestrator.js` tem um `StubEpicExecutor` — executor de mentirinha pra Epics numerados sem implementação real. Parece ser sistema separado do caminho que o Solucionador usaria (`run-workflow-engine`, confirmado real), mas vale checar antes de assumir que qualquer coisa via `master-orchestrator.js` está implementada de verdade.

### Outros mecanismos que já existem — **checados contra o `entity-registry.yaml` de verdade, 02/09/2026 (E89)**

> ⚠️ **4 de 7 são código morto.** A tabela abaixo era uma lista de "reaproveitar de graça" — não é mais. Cada linha agora tem o veredito real, não a promessa da seção original.

| Mecanismo | Arquivo | Veredito (E89) | Substituiria, no desenho |
|---|---|---|---|
| **Agent Immortality Protocol** (E76) | `core/resilience/agent-immortality.js` | ❌ **Órfão** — cadeia morre em 2 passos: `agent-immortality` → `resilience-index` → `core/index.js` → `usedBy: []` | autópsia da falha sem reidratar contexto + fila de reencarnação — **precisa escrever o 1º caller do zero** |
| **Entity Registry** (E72, E78) | `.aiox/entity-registry.yaml` | ✅ **Real** — `lifecycle: production`, `usedBy: [doctor-checks-index]` | 821 entidades com `usedBy`/`dependencies` = checagem cruzada do **D3** — pode ser usado como está |
| **`bob_orchestration`** (E70) | @pm | 🟡 **Parcial** — `bob-orchestrator.js` e `spawn-terminal` são reais (produção, via @pm); `wave-execute` continua órfão/experimental (01-5) | o paralelismo real via spawn-terminal funciona; **"rodar em ondas" não** |
| **Framework TOK** (E71) | `tool-registry.yaml` + 5 scripts | ❌ **Órfão** | `tokenCost` por ferramenta — **precisa escrever o 1º caller do zero** |
| **Etapas 9, 1.1 e 8.1 do @po** (E22) | `validate-next-story.md` | ✅ **Real** — `usedBy: [po-close-story, dev, po]` | Anti-Hallucination · Executor Assignment · No Duplicate Functionality — já rodam quando o @po valida uma story |

**Impacto na seção 13 (Ordem de implementação):** a Fase E ("Ligar aos mecanismos que já existem") está subestimada — pra 4 dos 7 mecanismos acima, "ligar" significa escrever a primeira integração do zero, não reaproveitar algo pronto.

---

## 12. O que está aberto — pendências reais

| # | Pendência | Gravidade |
|---|---|---|
| **E66** | **O método AIOX exige contexto NOVO por agente** (*"ALWAYS start new chat between SM, Dev, and QA work"*), e o Solucionador roda 9-12 agentes na mesma conversa. **Os sintomas que o framework prevê são exatamente os desta sessão**: persona confundida 3×, leitura parcial, 11 mensagens órfãs. Não é coincidência | ✅ **DECIDIDO (DEC-17, 02/09/2026): opção A — manter tudo numa conversa só.** Risco aceito conscientemente; mitigado pelos mecanismos já aprovados (E27 cota de discordância, E28 detector de convergência, E33/E100 hook de identidade — ainda a implementar) |
| **E61** | O próprio `SC_SCP_001` do framework **vetaria o Solucionador**: `agents_needed >= 8 → VETO`, `workflows_mapped >= 10 → VETO` → exige PRD com Epics/Stories antes | ✅ **DECIDIDO (DEC-19, 03/09/2026): Caminho A — seguiu o veto do framework.** Spec Pipeline completo já rodou (`docs/stories/SOLUCIONADOR/`) — requirements → complexity (COMPLEX) → research → spec (APPROVED 4.85/5) → implementation.yaml. Esta própria seção de ativação (E105) e a BLOCO 0-AH nasceram desse PRD |
| **E81** | Circuit breaker: código bloqueia, documentação diz que nunca bloqueia | 🟡 decidir antes de depender dele |
| **E69** | Drift `Approved` × `Ready` em 3 documentos oficiais | 🟡 quebra automação que cheque status por nome |
| **D1** | Qualidade de julgamento em domínio novo — **limitado, não fechado**. Mitigação: conclusão em domínio novo nasce marcada `não validado` e não pode virar regra até um evento real confirmar | 🟡 limite conhecido |
| **D11** | A fila crescer mais rápido que o conserto — **visível, não impedido**. Evidência real: 16 → 23 → 35 → 37 → 42 partes; 7 → 10 → 17 buracos | 🟡 medido pelo `status` |
| **E31** | 4 conflitos com as BLOCOs (0-K, 1, 1-A, 0-R×0-T) — correções aprovadas (DEC-11), **não implementadas** | 🟠 implementar na FASE 5 |
| **E32** | 8 ajustes em BLOCOs — aprovados (DEC-12), **não implementados** | 🟠 implementar na FASE 5 |
| **E30** | Varrer todas as regras anteriores a 28/08/2026 que assumem que o agente ativo escreve (2 casos confirmados: A3 e E29) | 🟠 varredura pendente |
| **E73** | `learned-patterns.yaml` vazio desde 26/12/2025; `registry-update-log.jsonl` com 2 linhas. **O framework tem onde acumular aprendizado e nunca foi alimentado** — é onde o `*post-mortem` deveria escrever | 🟡 |
| **E74** | Nenhum portão do desenho diz **o que o agente carrega ao entrar**, mesmo o framework tendo isso definido por agente em `agent-config-requirements.yaml` | 🟡 |

### A ressalva que o próprio desenho carrega

As 4 correções do E31 são análise do @analyst, **não passaram por nenhum portão** — mesma categoria de tudo que ele errou nesta sessão. São o mínimo para o Solucionador nascer, e são o **primeiro alvo do `*post-mortem` do próprio nascimento**, com o detector de convergência (E28) ligado: **se o post-mortem passar pelas 4 e não achar nenhuma objeção, isso é 🔴 alerta, não 🟢 validação.**

---

## 13. Ordem de implementação

| Fase | O que | Quem | Bloqueia a planilha? |
|---|---|---|---|
| **A** | Camada 0 — `status.cmd` + `status` + batimento no `synapse-wrapper.cjs` | 💻 @dev | 🔴 **SIM — é o único** |
| **B** | Decidir E61 (PRD/Epics) — **E66 já decidido (DEC-17): opção A, mesma conversa** | 👤 Felipe | não |
| **C** | Implementar E31 (4 correções) + E32 (8 ajustes) nas BLOCOs | 👑 @aiox-master | não |
| **D** | Escrever o workflow no formato `cross_context` + `workflow-state-schema` | 👑 @aiox-master | não |
| **E** | Ligar aos mecanismos que já existem (seção 11) | 💻 @dev | não |
| **F** | `*post-mortem` do nascimento, com E28 ligado | 🎯 Finch | não |

🔑 **DEC-14:** ler as 552.488 linhas do framework **não é pré-requisito** para voltar à planilha. O item **A8** já registrava isso desde 29/08. A Camada 0 é o único bloqueio.

---

*Fonte de cada afirmação: `.aiox/itens-em-aberto.md` (136 itens, com data e autor). Este documento consolida — não substitui.*

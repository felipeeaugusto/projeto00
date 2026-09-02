# PLANO DE EXECUÇÃO — 6 fases

> **Origem:** proposto pelo 🔍 @analyst (Atlas) em **02/09/2026 09:28**, autorizado pelo Felipe em seguida (*"1) autorizo · 2) sim, vamos começar pela FASE 0"*).
> **Por que este arquivo existe (E85):** o plano vivia **só na conversa**. O `RETOMAR-AQUI.md` tinha as 6 fases em resumo, mas perdia os sub-passos, os tempos e o método de cada fase. Mesmo padrão do E82 (o desenho do Solucionador só existia no `.jsonl`), um nível abaixo. Recuperado do `.jsonl` linha **27804** e gravado aqui.
> **Regra de manutenção:** o `status` de cada linha é atualizado conforme a execução avança. Quem avançar uma fase e não atualizar aqui reabre exatamente o buraco que este arquivo fecha.

---

## 🔀 ORDEM REAL DE EXECUÇÃO (DEC-16, Felipe, 02/09/2026 — substitui a ordem numérica das seções abaixo)

```
0 → 1 → 2 → 3 → 5 → [reavaliar FASE 4] → 6
```

**Os números das seções abaixo (FASE 0 a FASE 6) ficam como estão** — mudar o número quebraria toda referência já feita a "FASE 4"/"FASE 5" em commits e no `itens-em-aberto.md`. O que muda é **a ordem em que elas são executadas**: a FASE 5 roda **antes** da FASE 4, não depois.

**Por que:** a FASE 4 (comando `status`) foi colocada cedo por causa da DEC-14 (*"a Camada 0 é o único bloqueio real pra voltar à planilha"*) — mas isso confundiu duas coisas diferentes:

| | O que é |
|---|---|
| FASE 4 (`status`) | Só um **espelho** — mostra o estado do que já existe. Não resolve nada, só relata |
| FASE 5 (resolver as partes) | O trabalho de verdade — os 17 buracos, as correções nas BLOCOs (E31/E32), ligar os pedaços do Solucionador que a **E89** achou espalhados no AIOX/squad-creator-premium/pastas do trio (Pedro, Alan, Finch) |

A FASE 5 **não depende** da FASE 4 pra rodar — nada no trabalho de resolver as partes precisa do comando `status` existir. A única coisa que dependia da FASE 4 era o Felipe poder voltar pra planilha — e a decisão dele agora é **não voltar até tudo estar resolvido mesmo** (todas as partes + o caderno inteiro). Então a única razão pra fazer a FASE 4 cedo deixou de valer.

**Motivo técnico extra, não só preferência:** se o `status` fosse construído **antes** da FASE 5, e a FASE 5 mexesse nas BLOCOs (que é exatamente o que ela faz), o `status` ficaria desatualizado no meio do caminho e precisaria ser mexido de novo depois. Construindo **depois**, ele já nasce refletindo o estado final — sem retrabalho.

**A FASE 4 não é garantida — vai ser reavaliada, não só adiada.** Depois que a FASE 5 terminar, pode ser que o jeito de verificar o estado já esteja resolvido de outro jeito (um dos mecanismos religados na FASE 5 pode cobrir isso), e a FASE 4 vire redundante — ou pode continuar fazendo sentido do jeito que está. **Isso só dá pra saber depois da FASE 5, não antes.**

**Palavras dele:** *"Não quero voltar pra Planilha enquanto não tiver com todas as partes mapeadas... E depois deles resolverem TUDO das PARTES e do CADERNO AÍ SIM! Se ainda fizer sentido entrar com essa parte [FASE 4]..."*

---

## 🔒 FASE 0 — Garantir o que já existe *(~10 min)*

**Sem isso, tudo que vem depois trabalha em cima de coisa que pode sumir.**

| # | Ação | Quem | Por quê | Status |
|---|---|---|---|---|
| 0.1 | Registrar os achados de ontem (E66–E80) | 👑 @aiox-master | Só existem na conversa | ✅ **feito — 19 achados (E66–E84), não 15** |
| 0.2 | 🔴 Escrever o **DESENHO DO SOLUCIONADOR** em arquivo | 👑 @aiox-master | O mais crítico — só existia no `.jsonl` | ✅ `.aiox/SOLUCIONADOR-DESENHO.md` |
| 0.3 | Atualizar o **E65** com o ponto exato da leitura | 👑 @aiox-master | Pra saber onde continuar | ✅ volume real + método de retomada |
| 0.4 | Criar `.aiox/RETOMAR-AQUI.md` + linha na **BLOCO 1** | 👑 @aiox-master | Ponteiro pro próximo agente | ✅ **+ extra:** BLOCO 3 PASSO 3-C |
| 0.5 | Commit + **push** (`97b71d1` + novo) | 👑 → ⚡ @devops | Seu outro PC | 🔶 commit `f6825c1` ✅ · push ⏳ |
| **0.6** | *(não planejado)* CUSTOMIZAÇÕES **58** e **59** no `MANUAL.md` | 👑 @aiox-master | Obrigação da BLOCO 0-E | ✅ feito |
| **0.7** | *(não planejado)* Gravar **este arquivo** + registrar **E85** | 👑 @aiox-master | O plano não estava em lugar nenhum | ✅ feito |

---

## 📖 FASE 1 — Ler as 541.000 linhas *(~60–90 min)*

| # | Ação | Como | Tempo | Status |
|---|---|---|---|---|
| 1.1 | **Script de extração estrutural** dos 1.626 arquivos | Determinístico, sem LLM → `.aiox/leitura/indice.md` | ~1 min | ✅ **1.605/1.626 indexados, 21 excluídos com motivo (binários/marcadores), 586.668 linhas reconciliadas 100% com disco** |
| 1.2 | Dividir em **N fatias** por pasta, sem sobreposição | Script gera o plano de fatias | ~1 min | ✅ **33 fatias, 17.681–19.677 linhas cada, integridade verificada (1605/1605 arquivos, 0 duplicado, 0 faltando)** |
| 1.3 | ~~Sub-agentes em paralelo lendo tudo bruto~~ → **MÉTODO TROCADO (E87/E88)**: script determinístico varre 100% das linhas sem IA, filtra por padrão conhecido | `.aiox/leitura/buscar-padroes.js` → `.aiox/leitura/candidatos.md` | ~1 min | ✅ **Feito, com ressalva conhecida — ver seção 14** |
| 1.4 | *(fundida com 1.3 — o script já consolida)* | — | — | ✅ Feito |
| 1.5 | @analyst lê os candidatos filtrados (**opção C**, decisão do Felipe 02/09) | Sabendo que o filtro pode ter buraco em achados raros (tipo comparação) — investiga direto no arquivo original se algo não bater | ~20–30 min | ✅ **Concluído** — as 7 categorias revisadas por completo, cada achado verificado antes de reportar |

> 🔑 **A fidelidade fica no arquivo, não na resposta.** É por isso que não perde.
> ⚠️ **Correção de número:** o plano original dizia "os 115 itens" — hoje são **143** (`.aiox/itens-em-aberto.md`).

## ✅ FASE 1 — CONCLUÍDA (02/09/2026)

**Resultado das 7 categorias revisadas (712 KB, 21.765 linhas, por completo):**

| Categoria | Marcado pelo filtro | Achados reais confirmados |
|---|---|---|
| 🧟 Órfão | 567 | **145 reais** (com ressalva: registro tem ponto cego pra arquivos de dado carregados sob demanda) |
| 🔀 Contradição | 121 | 0 — só uso normal da palavra |
| 👯 Duplicata | 166 | 0 — 1 pista investigada e descartada (relatório citado não existe) |
| ⚠️ Descontinuado | 65 | **1 real** → **E90** |
| 🚧 Inacabado | 345 | 1 padrão sistemático fora de escopo (6 checklists faltando) |
| 🗂️ Estado de workflow | 199 | **1 real, o mais importante da sessão** → **E91** |
| 🚦 Veto/gate | 910 | Confirmado vocabulário legítimo, 1 nota menor (circuit breaker duplicado em `code-intel-client.js`) |

**Achados novos registrados nesta FASE: E85 a E91** (7 itens) — destaque pra **E89** (4 de 7 mecanismos "prontos" do desenho são código morto) e **E91** (o mecanismo de estado real do framework não é o que a seção 11 assumia — `session-state.js`, não `workflow-state-schema.yaml`).

---

## 🗺️ FASE 2 — Mapeamento completo desde 13/08 *(~30 min)* — 🔍 @analyst (Atlas)

> Mesmo padrão da FASE 1: script determinístico primeiro (barato, zero token), @analyst interpreta depois — **nunca mais sub-agentes de IA lendo texto bruto em massa** (E87).

| # | Ação | Como | Status |
|---|---|---|---|
| 2.1 | ~~Script extrai o esqueleto das 27.742 linhas (já feito 3×)~~ → **REFEITO DO ZERO**: as 3 extrações antigas (`extrair.js`/`2`/`3`, no scratchpad) emendavam uma na outra sem prova de encaixe — descartadas | `.aiox/mapeamento/extrair-esqueleto-sessao.js` — lê o `.jsonl` inteiro desde a linha 1 | ✅ **29.354 linhas, 0 não contabilizadas — cobertura 100% provada** |
| 2.2 | @analyst mapeia o conteúdo do esqueleto | `.aiox/mapeamento/esqueleto.md` (1.832 KB, 4.020 entradas cronológicas) | 🔶 Em andamento — @analyst sendo chamado agora |
| 2.3 | Incluir as **sessões compactadas** | Pedido explícito do Felipe; não está na BLOCO 3 | ✅ **11 de 11 compactações capturadas com resumo completo** — feito junto com 2.1 |
| 2.4 | Consolidar em partes numeradas | Substitui o documento de 33 KB desatualizado | ⏳ |

> ⚠️ O `.jsonl` cresce em tempo real — a extração de 2.1 é "até o momento em que rodou" (29.354 linhas, 02/09). Se a sessão continuar depois da FASE 2, rodar de novo antes da FASE 3 pra pegar o resto.

---

## 📋 FASE 3 — Plano final *(~30 min)* — 👑 @aiox-master (Orion)

| # | Ação | Regra de verificação | Status |
|---|---|---|---|
| 3.1 | @aiox-master monta `.aiox/PLANO-FINAL.md` das 4 saídas + todos os itens | 🔑 **Todo item aparece no plano ou é marcado "fora de escopo" com motivo** | ⏳ |
| 3.2 | Reconciliar contra o desenho | Conta na entrada = conta na saída | ⏳ |

---

## 🔧 FASE 4 — Camada 0 *(~2h)* — 💻 @dev (Dex) — ⚠️ **RODA DEPOIS DA FASE 5 (DEC-16)**

> **Não iniciar esta fase antes da FASE 5 estar concluída.** E ao chegar aqui, primeiro **reavaliar se ainda é necessária** — não construir de forma automática só porque estava planejada.

| # | Ação | Quem | Status |
|---|---|---|---|
| 4.0 | 🔍 **Reavaliar necessidade** — algum mecanismo religado na FASE 5 já cobre isso? | 👑 @aiox-master + 💻 @dev | ⏳ (só depois da FASE 5) |
| 4.1 | `status.cmd` + `status` (opção 🆎 — os dois arquivos, DEC-2) — **se ainda fizer sentido após 4.0** | 💻 @dev | ⏳ |
| 4.2 | Batimento cardíaco no `synapse-wrapper.cjs` — **se ainda fizer sentido após 4.0** | 💻 @dev | ⏳ |

> 🎯 **Aqui a planilha destrava** (se a FASE 4 ainda for necessária após a reavaliação). Item **A8**: *"pode ser retomada assim que a Camada 0 estiver de pé"*.

---

## 🎯 FASE 5 — Rodar as partes *(variável)* — 👑 @aiox-master + 💻 @dev (alternando por item) — ⚠️ **RODA ANTES DA FASE 4 (DEC-16)**

| # | Ação | Quem | Status |
|---|---|---|---|
| 5.1 | **28 partes sem conteúdo** → sub-agentes escrevem em arquivo | 🤖 paralelo | ⏳ |
| 5.2 | Decisões do Felipe **em lotes**, não uma a uma | 👤 Felipe | ⏳ |
| 5.3 | Implementar os **17 buracos** + as **12 correções** nas BLOCOs (E31 + E32) | 👑 💻 | ⏳ |

---

## 📊 FASE 6 — Planilha *(final)* — 💻 @dev (Dex)

| | |
|---|---|
| Retomar | **Linha 151 de 736** |
| Regra | ❌ Sem paralelo · ✅ **Alternância** (BLOCO 0-U REGRA 5) |
| Status | ⏳ bloqueada pela FASE 5 → FASE 4 (nessa ordem, DEC-16) — **não volta até TODAS as partes e o caderno estarem resolvidos** |

---

## ⏱️ Expectativa de tempo (avaliação original do @analyst, ordem atualizada pela DEC-16)

| Fases (na ordem real) | Tempo | Dá hoje? |
|---|---|---|
| **0 a 3** | ~2h30 | ✅ Sim |
| **5** (rodar as partes) | Depende das decisões do Felipe | ⚠️ Parcial |
| **4** (reavaliar + talvez Camada 0) | 0 (se redundante) a ~2h | ⚠️ Depende do resultado da 5 |
| **6** (planilha) | 586 linhas restantes | ❌ Trabalho próprio, de vários dias |

> **Fases 0–3 hoje: realista.** A **5** depende de quantas decisões o Felipe bate — é o trabalho de verdade, e agora vem antes da 4. A **4** pode nem ser necessária, só se sabe depois da 5. A **6** é o trabalho da planilha em si, que não comprime, e só começa depois de tudo.
> 📌 *"Eu quero terminar tudo HOJE! E não estou falando da planilha"* — Felipe, 02/09/2026.
> 📌 *"Não quero voltar pra Planilha enquanto não tiver com todas as partes mapeadas... e depois deles resolverem TUDO das PARTES e do CADERNO"* — Felipe, 02/09/2026 (DEC-16).

---

## 🔁 Regra de desvio (DEC-15 — Felipe, 02/09/2026)

Quando aparecer qualquer coisa fora do plano no meio da execução:

```
1. PARAR o passo atual
2. Chamar o 👑 @aiox-master → registra o achado
3. O 👑 @aiox-master COMMITA na hora
4. Chamar o ⚡ @devops → push
5. VOLTAR e continuar o passo a passo de onde parou
```

**Palavras dele:** *"se aparecer alguma coisa diferente pede pra registrar (chamar o orion — e ele comitar também — chamar o devops pro push) e depois continuar seguindo o fluxo!"*

**Não é o mesmo que a BLOCO 2-B.** A 2-B manda registrar; esta define a **sequência completa até o push** e o **retorno ao ponto exato** — o que faltava era o "e depois continuar".

---

## 🔍 Seção 14 — E87/E88: método da etapa 1.3 trocado, e a ressalva pro @analyst

**O que aconteceu:** sub-agentes lendo os arquivos brutos (33 fatias em paralelo) estouraram o limite de sessão do Felipe 2× na mesma manhã — 1 fatia de teste (1 arquivo, 19.677 linhas) sozinha custou 434.912 tokens. Extrapolado pro total: 10-13 milhões de tokens. **Método abandonado (E87).**

**O que substituiu:** `.aiox/leitura/buscar-padroes.js` — script determinístico, **zero IA, zero token**, varre as **588.273 linhas de 100% dos 1.605 arquivos** em 0,4 segundos, procurando 7 padrões conhecidos (órfão/não-usado, inacabado, descontinuado, duplicata, contradição, veto/gate, estado-de-workflow). Saída: `.aiox/leitura/candidatos.md` (**712 KB**, 21.765 linhas — 0,12% do custo da leitura bruta).

**2 defeitos achados e corrigidos durante a construção (E88):**
1. Ruído — o filtro pegava código genérico (`usedBy: []` em `.js` comum) e a palavra "CRITICAL" (que é só estilo de escrita do framework). Corrigido: `ORFAO` restrito a `.yaml/.yml/.json`; "CRITICAL" e "already exists" removidos.
2. **Mais grave** — um teto de 40 ocorrências por arquivo escondia achado real: num arquivo de 19.677 linhas, o teto era atingido nas primeiras ~1.474 linhas, cortando tudo depois. Testado contra os **9 achados reais** que uma IA achou ontem lendo esse mesmo arquivo por completo: **só 3 de 15 citações apareciam**. Corrigido com agrupamento por entidade (evita contar `usedBy`/`dependencies`/`lifecycle` da mesma entidade 3x) + teto removido dessa categoria → **14 de 15** depois do conserto.

**O que NUNCA vai fechar 15/15, e por quê:** o 1 achado que sobra é do tipo *"o desenho afirma que X depende de Y, mas Y não está na lista real"* — uma comparação entre 2 documentos, não uma palavra escrita em algum lugar. Nenhum filtro de padrão pega isso — exige leitura de verdade.

**⚠️ RESSALVA OFICIAL PRO @ANALYST (decisão do Felipe, opção C, 02/09/2026):** o filtro foi validado contra **apenas 1 dos 1.605 arquivos** (o único onde existia gabarito — uma IA já tinha lido ele inteiro antes). Nos outros 1.604, **não há garantia do mesmo nível de acerto**. Por isso:

- O @analyst lê os candidatos **sabendo que pode haver buraco em achados raros** — o filtro é a 1ª peneira, não a palavra final
- Ao notar qualquer coisa que **não bate** (uma citação do `SOLUCIONADOR-DESENHO.md` sem correspondência clara nos candidatos, um número que não fecha, uma alegação de "já implementado" sem confirmação) → **investigar direto no arquivo original**, não assumir que "não achou = não existe"
- Atenção específica: os **~7 mecanismos da seção 11** do desenho ("já existe, é só reaproveitar") são onde o achado perdido morava — vale conferir cada um deles contra `entity-registry.yaml` diretamente, não só contra os candidatos

---

*Fonte: `.jsonl` linha 27804 (02/09/2026 09:28). Recuperado e gravado em 02/09/2026 por 👑 @aiox-master.*

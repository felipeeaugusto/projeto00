# PLANO DE EXECUÇÃO — 6 fases

> **Origem:** proposto pelo 🔍 @analyst (Atlas) em **02/09/2026 09:28**, autorizado pelo Felipe em seguida (*"1) autorizo · 2) sim, vamos começar pela FASE 0"*).
> **Por que este arquivo existe (E85):** o plano vivia **só na conversa**. O `RETOMAR-AQUI.md` tinha as 6 fases em resumo, mas perdia os sub-passos, os tempos e o método de cada fase. Mesmo padrão do E82 (o desenho do Solucionador só existia no `.jsonl`), um nível abaixo. Recuperado do `.jsonl` linha **27804** e gravado aqui.
> **Regra de manutenção:** o `status` de cada linha é atualizado conforme a execução avança. Quem avançar uma fase e não atualizar aqui reabre exatamente o buraco que este arquivo fecha.

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
| 1.1 | **Script de extração estrutural** dos 1.626 arquivos | Determinístico, sem LLM → `.aiox/leitura/indice.md` | ~1 min | ⏳ |
| 1.2 | Dividir em **N fatias** por pasta, sem sobreposição | Script gera o plano de fatias | ~1 min | ⏳ |
| 1.3 | 🤖 **Sub-agentes em paralelo** — cada um recebe: sua fatia + os itens em aberto + o desenho | 🔑 **Cada um ESCREVE em `.aiox/leitura/{fatia}.md`.** Nenhum devolve pro contexto de quem chamou | ~40–60 min | ⏳ |
| 1.4 | **Script consolida** os deltas — dedup + conflitos | Determinístico → `.aiox/leitura/delta-consolidado.md` | ~1 min | ⏳ |
| 1.5 | @analyst lê **só o delta consolidado** | Pequeno por construção | ~15 min | ⏳ |

> 🔑 **A fidelidade fica no arquivo, não na resposta.** É por isso que não perde.
> ⚠️ **Correção de número:** o plano original dizia "os 115 itens" — hoje são **136** (`.aiox/itens-em-aberto.md`).

---

## 🗺️ FASE 2 — Mapeamento completo desde 13/08 *(~30 min)*

| # | Ação | Como | Status |
|---|---|---|---|
| 2.1 | Script extrai o esqueleto das **27.742 linhas** | Já feito 3× — ~30s | ⏳ |
| 2.2 | Sub-agentes mapeiam fatias do transcript | Escrevem em `.aiox/mapeamento/{fatia}.md` | ⏳ |
| 2.3 | Incluir as **sessões compactadas** | Pedido explícito do Felipe; não está na BLOCO 3 | ⏳ |
| 2.4 | Consolidar em partes numeradas | Substitui o documento de 33 KB desatualizado | ⏳ |

> ⚠️ O `.jsonl` cresceu: **27.974 linhas** na última varredura (02/09, ~10h40).

---

## 📋 FASE 3 — Plano final *(~30 min)*

| # | Ação | Regra de verificação | Status |
|---|---|---|---|
| 3.1 | @aiox-master monta `.aiox/PLANO-FINAL.md` das 4 saídas + todos os itens | 🔑 **Todo item aparece no plano ou é marcado "fora de escopo" com motivo** | ⏳ |
| 3.2 | Reconciliar contra o desenho | Conta na entrada = conta na saída | ⏳ |

---

## 🔧 FASE 4 — Camada 0 *(~2h)*

| # | Ação | Quem | Status |
|---|---|---|---|
| 4.1 | `status.cmd` + `status` (opção 🆎 — os dois arquivos, DEC-2) | 💻 @dev | ⏳ |
| 4.2 | Batimento cardíaco no `synapse-wrapper.cjs` | 💻 @dev | ⏳ |

> 🎯 **Aqui a planilha destrava.** Item **A8**: *"pode ser retomada assim que a Camada 0 estiver de pé"*.

---

## 🎯 FASE 5 — Rodar as partes *(variável)*

| # | Ação | Quem | Status |
|---|---|---|---|
| 5.1 | **28 partes sem conteúdo** → sub-agentes escrevem em arquivo | 🤖 paralelo | ⏳ |
| 5.2 | Decisões do Felipe **em lotes**, não uma a uma | 👤 Felipe | ⏳ |
| 5.3 | Implementar os **17 buracos** + as **12 correções** nas BLOCOs (E31 + E32) | 👑 💻 | ⏳ |

---

## 📊 FASE 6 — Planilha

| | |
|---|---|
| Retomar | **Linha 151 de 736** |
| Regra | ❌ Sem paralelo · ✅ **Alternância** (BLOCO 0-U REGRA 5) |
| Status | ⏳ bloqueada pela FASE 4 |

---

## ⏱️ Expectativa de tempo (avaliação original do @analyst, mantida)

| Fases | Tempo | Dá hoje? |
|---|---|---|
| **0 a 3** | ~2h30 | ✅ Sim |
| **4** (Camada 0) | ~2h | ✅ Sim |
| **5** | Depende das decisões do Felipe | ⚠️ Parcial |
| **6** (planilha) | 586 linhas restantes | ❌ Trabalho próprio, de vários dias |

> **Fases 0–4 hoje: realista.** A **5** depende de quantas decisões o Felipe bate. A **6** é o trabalho da planilha em si, que não comprime.
> 📌 *"Eu quero terminar tudo HOJE! E não estou falando da planilha"* — Felipe, 02/09/2026.

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

*Fonte: `.jsonl` linha 27804 (02/09/2026 09:28). Recuperado e gravado em 02/09/2026 por 👑 @aiox-master.*

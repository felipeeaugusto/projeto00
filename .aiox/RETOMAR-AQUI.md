# 🧭 RETOMAR AQUI

> **Leia este arquivo ANTES de qualquer outra coisa.** Ele é o ponteiro entre sessões — diz onde tudo parou e o que fazer a seguir.
> **Atualizado em:** 02/09/2026 · **Por:** 👑 @aiox-master (Orion)
> **Ordem de leitura ao abrir uma sessão:** ① este arquivo → ② `.aiox/itens-em-aberto.md` → ③ o caderno do projeto ativo (`packages/karzen/PROJETO-STATUS.md`).

---

## ⚡ Resposta curta: o que fazer agora

| | |
|---|---|
| 🔴 **A única coisa que trava a planilha** | Camada 0 — criar `status.cmd` + `status` + batimento no `synapse-wrapper.cjs`. **~2h do 💻 @dev.** (FASE 4, ainda reavaliada, roda DEPOIS da FASE 5 — DEC-16) |
| ➡️ **Próximo passo concreto** | **FASE 0, 1, 2 e 3 concluídas** (`.aiox/PLANO-EXECUCAO.md`, `.aiox/PLANO-FINAL.md`). **E66 já decidido (DEC-17)**. Entrar na **FASE 5** — rodar as 153 partes classificadas no `PLANO-FINAL.md`, começando pelos itens 🟢 RÁPIDA (implementação direta) e priorizando **D5** (o mais crítico) |
| 👤 **Decisão que só o Felipe toma** | **E61** ainda pendente (seção 4 abaixo) — **E66 resolvido** |

---

## 1. Estado das duas frentes

> ⚠️ **BLOCO 0-U REGRA 5:** as duas disputam o mesmo @dev e o mesmo Chrome. **Alternância, nunca as duas ao mesmo tempo.**

### 📊 Frente A — Planilha Karzen (Mercado Livre Ads)

| | |
|---|---|
| Arquivo | `Analise Oficial.xlsx` |
| Onde parou | **linha 151 de 736** |
| Piloto | linhas 145–170 rodadas, **5 bugs reais achados e corrigidos** |
| Estado | ✅ script pronto, formatação aplicada, tudo commitado |
| Trava | 🔴 **Não volta até a Frente B terminar por completo** (FASE 5 → reavaliar FASE 4 → só então FASE 6) — decisão do Felipe, DEC-16, 02/09/2026 |

### 🛠️ Frente B — O Solucionador (framework)

| | |
|---|---|
| Desenho | ✅ **`.aiox/SOLUCIONADOR-DESENHO.md`** — escrito em 02/09/2026 (antes disso só existia no `.jsonl`, achado E82) |
| Buracos | 17 de 17 endereçados no papel |
| Implementação | ❌ **nada implementado ainda** |
| Leitura do framework | **~11.000 de 552.488 linhas (2%)** — checkpoint exato no **E65** |

---

## 2. As fases do plano — ver `.aiox/PLANO-EXECUCAO.md` (fonte completa, com sub-passos)

> ⚠️ **DEC-16 (02/09/2026): a ORDEM DE EXECUÇÃO real é `0 → 1 → 2 → 3 → 5 → [reavaliar 4] → 6`** — os números das fases não mudaram (pra não quebrar referência), mas a FASE 5 roda **antes** da FASE 4, e a FASE 4 **não é garantida** — só se decide se ainda faz sentido depois que a FASE 5 terminar.

| Fase | O que | Quem | Estado |
|---|---|---|---|
| **0** | Registrar achados · escrever o desenho em arquivo · checkpoint · este arquivo | 👑 @aiox-master | ✅ **feita (02/09)** |
| **1** | Ler o framework inteiro — método trocado (E87/E88): script determinístico filtra, @analyst interpreta o filtrado | 🔍 @analyst | ✅ **concluída (02/09)** — 7 achados novos (E85-E91), destaque E89 e E91 |
| **2** | Mapear a sessão desde 13/08 (27.742+ linhas de `.jsonl`, **incluindo as compactadas**) | 🔍 @analyst | ⏳ próximo passo |
| **3** | `.aiox/PLANO-FINAL.md` — cada um dos 144 itens aparece ou é marcado fora de escopo **com motivo** | 👑 @aiox-master | ⏳ pendente |
| **5** ⚠️ *(roda antes da 4)* | Implementar E31 (4 correções) + E32 (8 ajustes) + os 17 buracos — as partes de verdade | 👑 @aiox-master + 💻 @dev | ⏳ pendente |
| **4** ⚠️ *(roda depois da 5, e é reavaliada)* | Reavaliar se ainda é necessária → se sim, Camada 0 (`status.cmd` + `status` + batimento) | 💻 @dev | ⏳ pendente — **não inicia antes da 5** |
| **6** | Voltar à planilha, linha 151 → 736 — **só depois de TUDO acima** | 💻 @dev | ⏳ pendente |

---

## 3. Método obrigatório da FASE 1 (DEC-13)

```
sub-agente recebe: fatia de arquivos + os 136 itens + SOLUCIONADOR-DESENHO.md
       ↓
escreve o achado em .aiox/leitura/{fatia}.md
       ↓
NUNCA devolve ao contexto de quem chamou
       ↓
script consolida → delta-consolidado.md → @analyst lê só o delta
```

| ✅ Permitido | ❌ Proibido |
|---|---|
| Sub-agente **lendo** arquivos e **escrevendo achado em arquivo** | Sub-agente "atuando como" Finch, Alan, Pedro ou qualquer agente AIOX |
| Paralelismo de leitura | Troca de persona via sub-agente (**BLOCO 0-AC, DEC-9 — continua fechada**) |

---

## 4. 👤 Decisões que só o Felipe toma

| # | Decisão | Por quê |
|---|---|---|
| **E66** ✅ | **DECIDIDO (DEC-17, 02/09/2026): opção A — manter todos os agentes na mesma conversa**, como já era. Risco aceito conscientemente; mitigado por E27 (cota de discordância), E28 (detector de convergência) e E100 (hook de identidade, ainda a implementar) | resolvido, não bloqueia mais nada |
| **E61** | O próprio `SC_SCP_001` do framework **vetaria o Solucionador** (`agents_needed >= 8 → VETO`) e exigiria um PRD com Epics/Stories antes | bloqueante em princípio — ainda pendente |
| **E81** | Circuit breaker: **o código bloqueia, a documentação diz que nunca bloqueia**. É a pergunta dele — *"se o vigia bugar, trava ou deixa passar?"* — e o framework responde as duas coisas | decidir antes de depender dele |

---

## 5. Regras vivas que valem sempre

| Regra | O quê |
|---|---|
| ✍️ **Escrita** | Só **@aiox-master, @dev e @devops** editam arquivos (28/08/2026) |
| 🚀 **Push** | Só **@devops** (`agent-authority.md`) |
| 🌐 **Modo Navegador** | Execução exclusiva do **@dev** (BLOCO 0-X) |
| 🔀 **Alternância** | Nunca 2 frentes no mesmo executor + recurso (BLOCO 0-U REGRA 5) |
| ⏸️ **"momento de pausa"** | Formato de 5 blocos (BLOCO 0-Y) — retomada automática se passar de 30 min |
| 🛑 **"vou parar"** | BLOCO 3 inteira, sem pular passo — inclui fechar o Chrome do Modo Navegador (PASSO 3-B) |
| 📌 **Achado que muda o rumo** | **PARA o fluxo na hora** e registra (E29 / DEC-5) — marcar e seguir só vale pro que não muda o rumo |

---

## 6. Arquivos-chave

| Arquivo | O que é |
|---|---|
| `.aiox/itens-em-aberto.md` | **136 itens** — E1–E84, D1–D17, DEC-1–DEC-14. Fonte da verdade de tudo que está aberto |
| `.aiox/SOLUCIONADOR-DESENHO.md` | O desenho completo do Solucionador |
| `.aiox/itens-resolvidos-arquivo.md` | O que já foi fechado |
| `packages/karzen/PROJETO-STATUS.md` | Caderno do projeto ativo |
| `.claude/CLAUDE.md` | As ~37 BLOCOs |
| `CUSTOMIZACOES-FELIPE/MANUAL.md` | As 57 customizações |
| `.aiox-core/development/tasks/modo-navegador-browser-access.md` | Procedimento do Chrome via CDP |

---

*Este arquivo substitui a memória entre sessões. Quem o mantiver desatualizado reabre exatamente o problema que ele existe pra fechar (E83).*

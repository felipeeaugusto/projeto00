# 🧭 RETOMAR AQUI

> **Leia este arquivo ANTES de qualquer outra coisa.** Ele é o ponteiro entre sessões — diz onde tudo parou e o que fazer a seguir.
> **Atualizado em:** 02/09/2026 · **Por:** 👑 @aiox-master (Orion)
> **Ordem de leitura ao abrir uma sessão:** ① este arquivo → ② `.aiox/itens-em-aberto.md` → ③ o caderno do projeto ativo (`packages/karzen/PROJETO-STATUS.md`).

---

## ⚡ Resposta curta: o que fazer agora

| | |
|---|---|
| 🔴 **A única coisa que trava a planilha** | Camada 0 — criar `status.cmd` + `status` + batimento no `synapse-wrapper.cjs`. **~2h do 💻 @dev.** |
| ➡️ **Próximo passo concreto** | FASE 1 (ler 541k linhas via sub-agentes) **ou** pular direto pra Camada 0 e voltar à planilha — **DEC-14 diz que ler tudo NÃO é pré-requisito** |
| 👤 **Decisão que só o Felipe toma** | E61 e E66 (seção 4 abaixo) |

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
| Trava | 🔴 Camada 0 (comando `status`) |

### 🛠️ Frente B — O Solucionador (framework)

| | |
|---|---|
| Desenho | ✅ **`.aiox/SOLUCIONADOR-DESENHO.md`** — escrito em 02/09/2026 (antes disso só existia no `.jsonl`, achado E82) |
| Buracos | 17 de 17 endereçados no papel |
| Implementação | ❌ **nada implementado ainda** |
| Leitura do framework | **~11.000 de 552.488 linhas (2%)** — checkpoint exato no **E65** |

---

## 2. As fases do plano

| Fase | O que | Quem | Estado |
|---|---|---|---|
| **0** | Registrar achados · escrever o desenho em arquivo · checkpoint · este arquivo | 👑 @aiox-master | ✅ **feita (02/09)** |
| **1** | Ler as 541.000 linhas restantes via sub-agentes em paralelo | 🔍 @analyst + sub-agentes | ⏳ pendente |
| **2** | Mapear a sessão desde 13/08 (27.742 linhas de `.jsonl`, **incluindo as compactadas**) | 🔍 @analyst | ⏳ pendente |
| **3** | `.aiox/PLANO-FINAL.md` — cada um dos 136 itens aparece ou é marcado fora de escopo **com motivo** | 🔍 @analyst | ⏳ pendente |
| **4** | 🔴 **Camada 0** — `status.cmd` + `status` + batimento (~2h) | 💻 @dev | ⏳ **desbloqueia a planilha** |
| **5** | Implementar E31 (4 correções) + E32 (8 ajustes) + os 17 buracos | 👑 @aiox-master | ⏳ pendente |
| **6** | Voltar à planilha, linha 151 → 736 | 💻 @dev | ⏳ pendente |

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
| **E66** | O método AIOX exige **contexto novo por agente** (*"ALWAYS start new chat between SM, Dev, and QA work"*). O Solucionador roda 9-12 agentes na mesma conversa. **Os sintomas que o framework prevê aconteceram nesta sessão**: persona confundida 3×, leitura parcial, 11 mensagens órfãs | conflito de fundo do desenho |
| **E61** | O próprio `SC_SCP_001` do framework **vetaria o Solucionador** (`agents_needed >= 8 → VETO`) e exigiria um PRD com Epics/Stories antes | bloqueante em princípio |
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

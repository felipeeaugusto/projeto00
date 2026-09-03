# 🧭 RETOMAR AQUI

> **Leia este arquivo ANTES de qualquer outra coisa.** Ele é o ponteiro entre sessões — diz onde tudo parou e o que fazer a seguir.
> **Atualizado em:** 02/09/2026 · **Por:** 👑 @aiox-master (Orion), no fechamento da sessão (BLOCO 3)
> **Ordem de leitura ao abrir uma sessão:** ① este arquivo → ② `.aiox/itens-em-aberto.md` → ③ o caderno do projeto ativo (`packages/karzen/PROJETO-STATUS.md`).

---

## ⚡ Resposta curta: o que fazer agora

| | |
|---|---|
| ✅ **FASE 0, 1, 2 e 3 concluídas** | `.aiox/PLANO-EXECUCAO.md` e `.aiox/PLANO-FINAL.md` fechados. 153 itens classificados nas 4 trilhas do Solucionador |
| ✅ **E66 decidido (DEC-17)** | Opção A — Solucionador roda numa conversa só. Não bloqueia mais nada |
| ✅ **Investigação do trio oficial concluída (E101-E104)** | Trio não tem "conselho" oficial pra copiar; 2 ferramentas genéricas úteis achadas (E102, E103); 1 correção feita (E104 — mecanismo que o desenho citava como pronto é código morto) |
| ➡️ **Próximo passo concreto** | **FASE 5** — implementar os itens do `PLANO-FINAL.md`, começando pelos **52 itens 🟢 RÁPIDA** (zero ambiguidade), priorizando **D5** (cadeia de artefatos — o buraco mais grave) dentro desse lote |
| 👤 **Decisão que só o Felipe toma, ainda pendente** | **E61** (o framework vetaria o Solucionador por escopo grande — `SC_SCP_001`) |
| 🔴 **A única coisa que trava a planilha** | Camada 0 (comando `status`) — **FASE 4, roda DEPOIS da FASE 5, e só se ainda fizer sentido (DEC-16)** |

---

## 1. Estado das duas frentes

> ⚠️ **BLOCO 0-U REGRA 5:** as duas disputam o mesmo @dev e o mesmo Chrome. **Alternância, nunca as duas ao mesmo tempo.**

### 📊 Frente A — Planilha Karzen (Mercado Livre Ads)

| | |
|---|---|
| Arquivo | `Analise Oficial.xlsx` |
| Onde parou | **linha 151 de 736** |
| Estado | ✅ script pronto, formatação aplicada, tudo commitado |
| Trava | 🔴 **Não volta até a Frente B terminar por completo** (FASE 5 → reavaliar FASE 4 → só então FASE 6) — decisão do Felipe, DEC-16 |

### 🛠️ Frente B — O Solucionador (framework)

| | |
|---|---|
| Desenho | ✅ `.aiox/SOLUCIONADOR-DESENHO.md` |
| Plano final | ✅ `.aiox/PLANO-FINAL.md` — 153 itens roteados (35 VETO/arquivar · 52 RÁPIDA · 44 MÉDIA · 5 COMPLETA · 17 fora de escopo) |
| Buracos do desenho | 17 de 17 endereçados no papel (D1-D17) — **1 correção feita na auditoria de hoje: portão 4.5 não tinha mecanismo pronto (E104)** |
| E66 (conflito de contexto) | ✅ Decidido — DEC-17, opção A |
| Investigação do trio oficial | ✅ Concluída (E101-E104) — ver seção 7 |
| Implementação | ❌ **nada implementado ainda** — é a FASE 5 |
| Leitura do AIOX/squad-creator | 100% coberto pelo script (`buscar-padroes.js`) + ~14.700 linhas lidas com compreensão real (trio + workflows + heurísticas + mecanismos-chave do `core/`) |

---

## 2. As fases do plano — ver `.aiox/PLANO-EXECUCAO.md` (fonte completa, com sub-passos)

> ⚠️ **DEC-16: a ORDEM DE EXECUÇÃO real é `0 → 1 → 2 → 3 → 5 → [reavaliar 4] → 6`** — a FASE 5 roda **antes** da FASE 4, e a FASE 4 **não é garantida**.

| Fase | O que | Quem | Estado |
|---|---|---|---|
| **0** | Registrar achados · escrever o desenho em arquivo · checkpoint | 👑 @aiox-master | ✅ feita |
| **1** | Ler o framework — script filtra, @analyst interpreta | 🔍 @analyst | ✅ feita — 7 achados (E85-E91) |
| **2** | Mapear a sessão inteira desde 13/08 (incluindo compactadas) | 🔍 @analyst | ✅ feita — 8 achados (E92-E97) |
| **3** | `.aiox/PLANO-FINAL.md` — todo item roteado ou fora de escopo, com motivo | 👑 @aiox-master | ✅ feita — inclui reconciliação com o caderno Karzen (E98-E100) e a investigação do trio (E101-E104) |
| **5** ⚠️ *(roda antes da 4)* | Implementar os 153 itens do `PLANO-FINAL.md` — começar pelo lote 🟢 RÁPIDA, priorizando D5 | 👑 @aiox-master + 💻 @dev | ⏳ **próximo passo** |
| **4** ⚠️ *(depois da 5, reavaliada)* | Reavaliar se ainda é necessária → se sim, Camada 0 | 💻 @dev | ⏳ pendente |
| **6** | Voltar à planilha, linha 151 → 736 | 💻 @dev | ⏳ pendente |

---

## 3. Método obrigatório de leitura em volume (DEC-13)

```
Sub-agente AUTORIZADO só para: ler e escrever achado em arquivo
NUNCA para: troca de persona (BLOCO 0-AC, DEC-9 — continua fechada)
```

Para volumes pequenos (até ~15.000 linhas), leitura DIRETA pelo próprio agente é mais segura e já validada nesta sessão (trio + workflows do squad-creator-pro, ~14.700 linhas, sem sub-agente). Sub-agente só se justifica pra volumes muito maiores (100k+ linhas) — e mesmo assim, NUNCA devolve pro contexto de quem chamou, só escreve em arquivo.

---

## 4. 👤 Decisões que só o Felipe toma

| # | Decisão | Status |
|---|---|---|
| **E61** | O `SC_SCP_001` do framework vetaria o Solucionador por escopo grande (`agents_needed >= 8`) — exigiria PRD/Epics antes | ⏳ **ainda pendente** |
| **E81** | Circuit breaker: o código bloqueia, a documentação diz que nunca bloqueia | ⏳ decidir antes de depender dele |
| ~~E66~~ | ~~Contexto novo por agente vs mesma conversa~~ | ✅ **DECIDIDO — DEC-17, opção A** |

---

## 5. Regras vivas que valem sempre

| Regra | O quê |
|---|---|
| ✍️ **Escrita** | Só **@aiox-master, @dev e @devops** editam arquivos |
| 🚀 **Push** | Só **@devops** |
| 🌐 **Modo Navegador** | Execução exclusiva do **@dev** |
| 🔀 **Alternância** | Nunca 2 frentes no mesmo executor + recurso |
| ⏸️ **"momento de pausa"** | Formato de 5 blocos — retomada automática se passar de 30 min |
| 🛑 **"vou parar"** | BLOCO 3 inteira, sem pular passo |
| 📌 **Achado que muda o rumo** | PARA o fluxo na hora e registra (E29 / DEC-5) |
| 🇧🇷 **Português sempre** | BLOCO 0-AF — nem uma frase em inglês, sem exceção (novo hoje) |
| 🧯 **Teto de leitura direta do framework** | Máximo 3 lotes adicionais, só governança (.md/.yaml), para se rendimento < 20% do lote 1 — bloqueio físico em `.aiox/leitura/teto-leitura.yaml` (DEC-18, novo 03/09/2026) |

---

## 6. Arquivos-chave

| Arquivo | O que é |
|---|---|
| `.aiox/itens-em-aberto.md` | **153 itens** — E1–E104, D1–D17, A1-A8, DEC-1–DEC-17. Fonte da verdade de tudo que está aberto |
| `.aiox/SOLUCIONADOR-DESENHO.md` | O desenho completo do Solucionador |
| `.aiox/PLANO-EXECUCAO.md` | As 6 fases, com sub-passos e status |
| `.aiox/PLANO-FINAL.md` | Os 153 itens classificados nas 4 trilhas — **o mapa da FASE 5** |
| `.aiox/itens-resolvidos-arquivo.md` | O que já foi fechado |
| `packages/karzen/PROJETO-STATUS.md` | Caderno do projeto ativo — atualizado hoje com a sessão inteira |
| `.claude/CLAUDE.md` | As BLOCOs (inclui a 0-AF, nova hoje) |
| `CUSTOMIZACOES-FELIPE/MANUAL.md` | 60 customizações |

---

## 7. Resumo da investigação do trio oficial (E101-E104) — pra não repetir

Felipe pediu pra confirmar se o Solucionador foi validado contra o trio oficial (Pedro/Alan/Finch, `squads/squad-creator-pro/`) antes de implementar qualquer coisa. Resultado, caso a pergunta volte:

- O trio oficial existe pra **clonar a mente de pessoas reais e vender como produto de IA** — nada a ver com governança de framework
- **Finch nunca aparece em nenhum dos 15 workflows oficiais** — o papel dele (viabilidade, Loss Aversion) nunca foi tecnicamente conectado a nada, nem na origem
- Não existe um padrão oficial de "conselho de 3 pareceres" — o real é uma pipeline linear Alan→Pedro
- 2 achados úteis, nunca incorporados ao Solucionador: **E102** (Meta Decision Flow, checklist de decisão em 10 passos) e **E103** (Context Death Test, checklist pra saber se um documento sobrevive à morte do contexto)
- Conflito real, não hipotético: a regra do Finch ("nunca hesitar") contradiz o **estado 3** do Solucionador — ainda sem decisão de como resolver

**Conclusão:** continuar com o desenho do Solucionador como está, sem reescrever em cima de um padrão oficial (porque ele não existe pronto) — só religar as peças reais que existem (já mapeado no `PLANO-FINAL.md`).

---

*Este arquivo substitui a memória entre sessões. Quem o mantiver desatualizado reabre exatamente o problema que ele existe pra fechar (E83).*

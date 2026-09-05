# 🧭 RETOMAR AQUI

> **Leia este arquivo ANTES de qualquer outra coisa.** Ele é o ponteiro entre sessões — diz onde tudo parou e o que fazer a seguir.
> **Atualizado em:** 05/09/2026 · **Por:** 👑 @aiox-master (Orion), no fechamento da sessão (BLOCO 3, auditoria profunda pedida pelo Felipe)
> **Ordem de leitura ao abrir uma sessão:** ① este arquivo → ② `.aiox/itens-em-aberto.md` → ③ o caderno do projeto ativo (`packages/karzen/PROJETO-STATUS.md`).

---

## ⚡ Resposta curta: o que fazer agora

| | |
|---|---|
| ✅ **Solucionador — Spec Pipeline completo, implementado, desenho+plano consolidados** | Ver seção 8 abaixo — tudo isso já estava fechado antes desta sessão de auditoria (03-04/09) |
| 🔄 **RE-INVESTIGAÇÃO LINHA POR LINHA EM ANDAMENTO — é a frente ativa agora** | `.aiox/mapeamento/MAPEAMENTO-LINHA-POR-LINHA.md` — 21 achados + 4 adendos, **~37% do `esqueleto-parte1` coberto** (até linha ~11.909 de ~32.322), 0% do `esqueleto-parte2` (~1.600 linhas). Ver seção 9 |
| ➡️ **Próximo passo concreto** | Continuar a leitura linha por linha a partir da linha **11.909** de `esqueleto-parte1-89427cf3.md`, mesmo ritmo/metodologia (pedaço → Atlas investiga → Felipe confirma → Orion persiste → próximo pedaço) |
| ⏳ **Pendente de confirmação (não persistido)** | Adendo ao Achado 14 (bug "Médio" em Nível de visitas) — investigado, apresentado, sessão encerrada antes da confirmação. Perguntar ao Felipe ao retomar |
| 🔴 **Divergência real aberta, atribuída ao @dev** | Achado 2 — E92 (`PAS23-BIV`, `statusCatalogo: null`) não compartilha causa raiz com o bug de 13/08 como hipotetizado; nunca foi investigado de verdade. Precisa o @dev checar |
| 🚀 **Push pendente** | 24 commits locais do `MAPEAMENTO-LINHA-POR-LINHA.md` (todo o trabalho de hoje) ainda não foram pro GitHub — pedir ao @devops quando o Felipe quiser |
| 🔴 **A única coisa que trava a planilha Karzen** | `Analise Oficial.xlsx`, linha 151/736 — segue pausada, sem tocar (BLOCO 0-U REGRA 5, nunca 2 frentes ao mesmo tempo) |

---

## 1. Estado das duas frentes

> ⚠️ **SUPERADO PELA DEC-19 (03/09/2026):** as seções 1 e 2 abaixo descrevem o plano de 153 itens em 4 trilhas (implementação direta, FASE 5). O Felipe escolheu o **Caminho A** — seguir o veto do framework e formalizar via Spec Pipeline em vez de implementar direto. Isso mudou tudo: o Solucionador foi inteiro especificado e implementado por outro caminho (ver seção 8). Mantido aqui só como registro histórico de como se chegou à decisão — **não é mais o próximo passo**.

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
| **E81** | Circuit breaker: o código bloqueia, a documentação diz que nunca bloqueia | ⏳ decidir antes de depender dele |
| ~~E66~~ | ~~Contexto novo por agente vs mesma conversa~~ | ✅ **DECIDIDO — DEC-17, opção A** |
| ~~E61~~ | ~~O `SC_SCP_001` do framework vetaria o Solucionador por escopo grande — exigiria PRD/Epics antes~~ | ✅ **DECIDIDO — DEC-19, Caminho A (seguir o veto do framework, formalizar com PRD antes de continuar)** |

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

## 8. O que realmente aconteceu com o Solucionador (03-04/09/2026) — supera as seções 1-2

| Etapa | Resultado |
|---|---|
| **DEC-19 (03/09)** | Felipe escolheu Caminho A — seguir o veto `SC_SCP_001` do framework, formalizar via Spec Pipeline em vez de implementar direto |
| **Spec Pipeline (6 fases, 03/09)** | Gather (@pm) → Assess COMPLEX 16/25 (@architect) → Research, achou E107/E108 (@analyst) → Write Spec (@pm) → Critique NEEDS_REVISION 4.10 → revisão v2 → re-crítica APPROVED 4.85 (@qa) → Plan, 5 subtasks (@architect). PRD formal completo em `docs/stories/SOLUCIONADOR/` |
| **E107/E109 (03/09)** | Achado de pesquisa errado (arquivo "não existe") causou sobrescrita real de `handoff-insumos-tmpl.yaml` — revertida, causa raiz era `Glob` sem `path` explícito (cwd tinha driftado). Gerou a **BLOCO 0-AG** (`CLAUDE.md`) — `path` explícito obrigatório antes de concluir ausência de arquivo |
| **Implementação (03-04/09)** | 5 subtasks do `implementation.yaml` resolvidas — gatilho `/Solucionador` documentado (**BLOCO 0-AH**), seção de ativação fechada no desenho, Portão 0 registrado em `workflow-chains.yaml`. **Teste real de ponta a ponta (Felipe digitar `/Solucionador` numa conversa nova) ainda não foi feito** |
| **Desenho + Plano consolidados (04/09)** | `.aiox/DESENHO-E-PLANO-CONSOLIDADO-04-09.md` — mostra os 2 arquivos reais (`SOLUCIONADOR-DESENHO.md`, `PLANO-FINAL.md`) num único documento visual, aprovado pelo Felipe. Commit `951af78`, já no GitHub |
| **Item 1/1.1 do pedido de 13/08 (04/09)** | `MAPEAMENTO-COMPLETO-13-08-A-04-09.md` — mapeamento em blocos/partes, mas **depois descoberto como construído em cima dos resumos de compactação, não linha por linha de verdade** (ver seção 9) |

---

## 9. Re-investigação linha por linha — a frente ATIVA agora (04-05/09/2026)

**Por que existe:** o `checkpoint-leitura.md` (criado durante o mapeamento acima) revelou, no próprio texto, que o método usado foi ler os 12 resumos de compactação como "coluna vertebral" em vez de ler a sessão mensagem por mensagem. O Felipe pediu uma re-investigação genuína, sem rodar nada em background, parando a cada pedaço.

| | |
|---|---|
| Arquivo | `.aiox/mapeamento/MAPEAMENTO-LINHA-POR-LINHA.md` — 24 commits locais (`babe957`..`44c8a38`), **nenhum pushado ainda** |
| Metodologia | Ler pedaço do `esqueleto-parte1-89427cf3.md` → `@analyst` (Atlas) investiga contra arquivos reais, apresenta achado no formato Pedaço/Achado/Investigação/Validação/Agente Responsável → Felipe confirma → `@aiox-master` (Orion) **só persiste** (nunca investiga — regra reforçada após violação real) → commit → volta pro Atlas |
| Progresso | **~37% do `esqueleto-parte1`** (até linha ~11.909 de ~32.322, 13/08 → 17/08 18:46) · **0% do `esqueleto-parte2`** (~1.600 linhas, 03-04/09) |
| Achados registrados | 21 achados + adendos aos Achados 12 (x2), 13, 17 — 20 "BATEM" com alta fidelidade |
| 🔴 Divergência real aberta | **Achado 2** — E92 (`PAS23-BIV`, `statusCatalogo: null`) não compartilha causa raiz com o bug de 13/08 (janela de 2200 caracteres) como hipotetizado. Nunca investigado de verdade. **Atribuído ao @dev** |
| ⏳ Pendente de confirmação | Adendo ao Achado 14 (bug "Médio" em Nível de visitas) — investigado e apresentado, sessão fechou antes da confirmação do Felipe |
| ➡️ Retomar em | Linha **11.909** de `esqueleto-parte1-89427cf3.md`, mesmo ritmo pedaço-por-pedaço |
| Regra nova desta sessão | Troca de persona sempre via `Skill` tool explícito (não só `.current-agent` por baixo dos panos) — o próprio `Bash`+`Skill` já é o mecanismo de confirmação do BLOCO 0-D, sem precisar de pergunta de texto redundante quando o próximo agente já é óbvio pelo contexto |

---

*Este arquivo substitui a memória entre sessões. Quem o mantiver desatualizado reabre exatamente o problema que ele existe pra fechar (E83).*

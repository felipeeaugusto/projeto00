# Desenho e Plano Final do Solucionador — consolidado (04/09/2026)

> **O que é este documento:** uma cópia consolidada, no mesmo nível de detalhe dos dois arquivos-fonte, pra você ter tudo num lugar só sem precisar abrir os dois separados.
> **Fontes reais (não invente nada além disso):** `.aiox/SOLUCIONADOR-DESENHO.md` (333 linhas) + `.aiox/PLANO-FINAL.md` (262 linhas, já com o E61 atualizado) + `.aiox/PLANO-EXECUCAO.md` (223 linhas, já com a atualização da DEC-19).
> **Regra de manutenção:** se qualquer um dos 3 arquivos-fonte mudar depois de 04/09/2026, este documento fica desatualizado até alguém sincronizar de novo — ele é uma fotografia, não um espelho automático.
> **Gerado por:** 👑 @aiox-master (Orion), a pedido do Felipe, 04/09/2026.

---

# 🎯 DESENHO FINAL — completo (`SOLUCIONADOR-DESENHO.md`)

**Status do arquivo:** 🟡 fechado no papel, não implementado — 17 de 17 buracos endereçados no papel.

## 1. O problema que ele resolve

O framework tem ~37 BLOCOs, 60 customizações e 4 hooks de enforcement — mesmo assim erros do mesmo tipo se repetem. O padrão comum: **a regra depende do agente perceber sozinho que deveria aplicá-la**. O Solucionador troca isso por um fluxo com portões que produzem artefato verificável.

## 2. Regra fundadora (E26)

| ❌ Proibido | ✅ Obrigatório |
|---|---|
| Um agente escrever "⚙️ Pedro Valério: …" sem ativar de verdade | Ativação real (BLOCO 0-AC): arquivo carregado, saudação visível, `.current-agent` atualizado |
| Um agente incorporar o framework de outro | Cada framework é executado por quem é dono dele |
| Concluir "os 3 convergiram" quando os 3 foram escritos pela mesma cabeça | Convergência só conta se cada persona foi ativada separadamente |

## 2.5 Ativação — o gatilho `/Solucionador`

| Passo | O que acontece |
|---|---|
| 1 | Você escreve "/Solucionador" em qualquer mensagem, pra qualquer agente |
| 2 | Portão 0 classifica primeiro, sempre — determinístico, sem IA |
| 3 | Segue a trilha correspondente à classificação |
| 4 | Cada portão da trilha é ativado de verdade (E26) |
| 5 | Se não classificar → estado 3, para e chama você |
| 6 | Nada volta silenciosamente |

## 3. Portão 0 — o classificador

| Sinal de automação | Peso | Sinal de risco | Peso |
|---|---|---|---|
| bulk-edit | 3 | architecture | 3 |
| structured-transform | 3 | security | 3 |
| mechanical-edit | 3 | destructive | 3 |
| map-then-apply | 2 | production | 2 |
| repetition | 2 | migration | 2 |
| parallelizable | 2 | | |

`confiança = (automação + arquivos×0.45 + estruturados×0.55 + lote×0.35 − risco×1.35) / 13` — passa se `confiança ≥ 0.58` **e** nenhum sinal de risco.

🔑 O risco pesa 1,35× mais que a automação, e **1 sinal de risco reprova mesmo com confiança alta**. Implementado de verdade: `fast-path-gate.js` + `task-complexity-classifier.js`, nenhum chama LLM.

## 4. As 4 trilhas

| Trilha | Quando | Quem entra | Orçamento |
|---|---|---|---|
| 🟢 Rápida | mecânico, sem risco, escopo conhecido | @dev + @qa | 6 interações |
| 🟡 Média | toca regra ou mais de 1 arquivo | @dev + @qa + @po | 15 interações |
| 🔵 Completa | muda desenho, decisão nova, risco | os 9 portões inteiros | 30 interações |
| ⚫ Estado 3 | não classificável | para e chama você | — |

Estourou o orçamento → avisa, não trava: *"esse ciclo já está na interação N, o esperado era M. Continua, ajusta ou para?"*

## 5. Os 9 portões da trilha 🔵 completa

| # | Portão | Quem | Artefato produzido | Recusa de partida se… |
|---|---|---|---|---|
| 1 | Viabilidade | 🎯 Finch | registro de triagem + `VIABILITY_ASSESSMENT` | — (é o primeiro) |
| 2 | Insumos | 🧠 Alan | evidências `[SOURCE:]`, mín. 15 citações + 5 signature phrases | não há registro de triagem |
| 3 | Processo | ⚙️ Pedro | `ARTEFATOS_READY` | `INSUMOS_READY` ausente |
| 4 | Validação story | 📋 @po | `Draft`→`Ready` no arquivo | `ARTEFATOS_READY` ausente |
| 4.5 | Handshake semântico ⚠️ | automático | relatório de conformidade — **NÃO existe implementado**, código órfão (E104) | story não está `Ready` |
| 5 | Implementação | 💻 @dev | código + 3 bugs + 3 edge cases no Dev Notes | story não está `Ready` |
| 6-8 | Qualidade | 🧪 @qa | gate PASS/CONCERNS/FAIL/WAIVED | File List incompleta |
| 9 | Assinatura | 👤 Você | mensagem aprovando | qualquer gate anterior sem artefato |

🔑 A evidência de que era necessário: nesta sessão houve **86 ofertas de handoff, 74 sem a linha de auditoria da BLOCO 0-K, e 0 bloqueios**. A regra existia. Ninguém aplicou.

## 6. Os 3 mecanismos anti-teatro

| # | Mecanismo | O que garante |
|---|---|---|
| 6.1 | Cota obrigatória de discordância (E27, DEC-6) | Todo agente que recebe artefato do anterior produz ≥1 objeção concreta OU lista os checks feitos. Silêncio deixa de ser resposta válida |
| 6.2 | Detector de convergência suspeita (E28, DEC-7) | 3 agentes com **zero objeções** = 🔴 alerta (não mais 🟢 validação) — dispara `*post-mortem` obrigatório |
| 6.3 | Cadeia de artefatos (§5) | Portão não avança sem artefato real em disco |

## 7. O estado 3

| Estado | Significado | Ação |
|---|---|---|
| ✅ 1 — passa | artefato existe, checks listados | segue pro próximo portão |
| ❌ 2 — reprova | artefato falta ou check falhou | volta pro portão anterior |
| ⚫ 3 — não sei | não classificável, sem executor, padrão inédito, orçamento estourado | para e chama você |

Achado relacionado (§7): o `circuit-breaker.js` já tem `HALF_OPEN` (libera 1 sonda após 60s de bloqueio) — mas há uma **contradição real, ainda aberta** (E81): a documentação diz "nunca bloqueia", o código bloqueia de fato.

## 8. Quem vigia o Solucionador — Camada 0

| Item | Decisão |
|---|---|
| Comando | você digita `status` (sem prefixo) |
| Arquivos a criar | `status.cmd` (cmd.exe) **e** `status` (Git Bash) — os dois, porque sua rotina usa os dois |
| Executor | 💻 @dev |
| Status real | ⏳ **ainda não construída** — único bloqueio real pra voltar à planilha (DEC-14), só entra depois da FASE 5 |
| O que mostra | agente ativo · portão atual · artefatos esperados vs. existentes · tamanho da fila · itens vetados/arquivados · se foi usado ou abandonado |

Complemento: batimento cardíaco (E7) no `synapse-wrapper.cjs` — cobre o meio da sessão, também não construído.

## 9. Como o fluxo lida com você

| Sub-seção | Regra |
|---|---|
| 9.1 Ausência temporária (D9) | O fluxo espera, não avança sozinho. Retomada automática se passou +30min (BLOCO 0-Y) |
| 9.2 Você muda de ideia no meio (D12) | Ciclo aceita reset em qualquer ponto, volta pra FASE 0 |
| 9.3 Escalada assimétrica (D6) | Erro de classificação pra cima é caro, pra baixo é só lento → **em dúvida, sobe de trilha** |
| 9.4 2ª rodada de assinatura | Depois do portão 9, checa se a solução quebra algo já validado — só o estado 3 chega até você |
| 9.5 Nada volta silenciosamente | Retorno de portão reprovado é sempre explícito e registrado, nunca "volta lá e refaz" invisível |

## 10. Alternância — Solucionador × planilha (D17)

Os dois disputam o mesmo @dev e o mesmo Chrome do Modo Navegador. **Já implementado como BLOCO 0-U REGRA 5**: nunca 2 frentes disputando o mesmo executor e recurso — alternância, nunca paralelismo.

## 11. Onde mora no framework — mecanismos existentes, veredito real (E89)

| Mecanismo | Veredito real | O que substituiria |
|---|---|---|
| Agent Immortality Protocol (E76) | ❌ Órfão — cadeia morre em 2 passos | precisa escrever o 1º caller do zero |
| Entity Registry (E72/E78) | ✅ Real, produção | 821 entidades = checagem cruzada do D3, pode usar como está |
| `bob_orchestration` (E70) | 🟡 Parcial — `spawn-terminal` real, `wave-execute` órfão | paralelismo real funciona, "ondas" não |
| Framework TOK (E71) | ❌ Órfão | precisa escrever o 1º caller do zero |
| Etapas do @po (E22) | ✅ Real, `usedBy` confirmado | já rodam quando @po valida uma story |
| `workflow-state-schema.yaml` | ❌ Órfão (E68) | — |
| `workflow-state-manager.js` | ❌ Descontinuado, `@deprecated` | superseded by `session-state.js` |
| `session-state.js` | ✅ Real, produção (E91) | mecanismo de estado de verdade, mas precisa ser adaptado — não serve pronto pro formato de portões |

⚠️ **4 de 7 mecanismos "prontos pra reaproveitar" são código morto** — "ligar" significa escrever a 1ª integração do zero pra maioria deles.

## 12. Pendências reais (o que o próprio desenho reconhece como aberto)

| # | Pendência | Gravidade |
|---|---|---|
| E66 | Método AIOX exige contexto novo por agente, Solucionador roda tudo numa conversa | ✅ **DECIDIDO (DEC-17)** — opção A, risco aceito, mitigado por E27+E28 |
| E61 | O próprio framework vetaria o Solucionador (≥8 agentes) | ✅ **DECIDIDO (DEC-19)** — Caminho A, Spec Pipeline completo já rodou |
| E81 | Circuit breaker: código bloqueia, doc diz que nunca bloqueia | 🟡 decidir antes de depender dele |
| E69 | Drift `Approved`×`Ready` em 3 documentos oficiais | 🟡 quebra automação por nome |
| D1 | Qualidade de julgamento em domínio novo | 🟡 limitado, não fechado |
| D11 | Fila crescer mais rápido que o conserto (16→23→35→37→42 partes) | 🟡 visível, não impedido |
| E31 | 4 conflitos com as BLOCOs — aprovados (DEC-11), não implementados | 🟠 |
| E32 | 8 ajustes em BLOCOs — aprovados (DEC-12), não implementados | 🟠 |
| E30 | Varrer regras pré-28/08 que assumem que o agente ativo escreve | 🟠 |
| E73 | `learned-patterns.yaml` vazio — framework nunca alimentado | 🟡 |
| E74 | Nenhum portão diz o que o agente carrega ao entrar | 🟡 |

---

# 🗺️ PLANO FINAL — completo (`PLANO-FINAL.md` + `PLANO-EXECUCAO.md`)

## Resumo por trilha

| Trilha | Quantos | O que significa |
|---|---|---|
| 🔴 VETO/arquivar | 38 | Remover de `itens-em-aberto.md` (+1: E66, +2: E101/E104, +1: E61) |
| 🟢 RÁPIDA | 53 | Implementação direta, @dev+@qa, sem trio |
| 🟡 MÉDIA | 46 | Trio decide o como antes de virar story |
| 🔵 COMPLETA | 4 | E39, E44, E87, E92 — investigação técnica |
| ⚪ FORA DE ESCOPO | 17 | Pertence à planilha Karzen |
| **Total** | **158** | |

## Bloco 1 — Itens pré-Solucionador (24/08 a 29/08)

| Item | Resumo | Destino | Motivo |
|---|---|---|---|
| (sem ID) | 3 camadas de proteção mortas | 🟢 | Vira o próprio Solucionador (D1-D17), falta implementar |
| A1 | Onde instalar o guardião | 🔵 | Decisão sua — mas só entra depois do E66 |
| A2 | Quando implementar o guardião | 🔴 | Respondido pela prática |
| A3 | `project-log.md` contradiz decisão 28/08 | 🟢 | Correção textual |
| A4 | 3 afirmações falsas no CLAUDE.md | 🟢 | Correção textual |
| A5 | `.current-agent` órfão em Karzen | 🟢 | Apagar arquivo |
| A6 | Hook só vê QUEM, não QUAL arquivo | 🟡 | Desenhar tabela separada |
| A7 | Guia de criação de projeto novo não existe | 🟡 | Bloqueado por A1 |
| A8 | Planilha pausada na linha 150 | ⚪ | FASE 6 |
| Desenho original do guardião | Camadas 0-3 | 🔴 | Superado pelo Solucionador |
| `--so-regenerar` | Melhoria do script | ⚪ | Pipeline Karzen |
| Compromisso "mostrar comando real" | Norma comportamental | 🔴 | Já é regra ativa |
| Retrofit 0-C/N/O/L | Aplicar o PRINCÍPIO | 🟡 | Framework, mas menor |
| `check-handoff-audit.js` só 3 cenários testados | Falta teste real | 🟢 | Testar com casos reais |
| Página renomeada na Planilha do Ads | Dado desatualizado | ⚪ | Google Sheets, não é FASE 6 |
| `page.close()` não garantido | Bug de automação | ⚪ | Pipeline Karzen |
| Pipeline não testado com muitos cards | Cobertura | ⚪ | Pipeline Karzen |
| ID Family baseado em 1 caso | Regra frágil | ⚪ | Pipeline Karzen |
| Regex `condicao` só 2 faixas | Cobertura futura | ⚪ | Só se aparecer caso real |
| Altura de linha + regra 2 MLBs | Bugs confirmados no Excel | ⚪ | Aguardando `*elicit` |

## Bloco 2 — E1 a E20 (itens soltos, 30-31/08)

| Item | Destino | Motivo |
|---|---|---|
| E1 | 🔴 | Já resolvido no próprio commit |
| E2 | 🟡 | B10 precisa de spec — trio decide |
| E3 | 🟢 | Viraram E31/E32, fecha junto |
| E4 | 🔴 | Já resolvido |
| E5 | 🟢 | Correção textual (10 pontos, não 6) |
| E6 | 🟡 | Camada 0 — falta implementação real |
| E7 | 🟡 | Batimento cardíaco — trio decide mecanismo |
| E8 | 🔴 | Decisão registrada |
| E9 | 🟢 | Solucionador escreve as 28 partes na FASE 5.4 |
| E10 | 🟢 | Versionar o arquivo |
| E11 | 🔴 | Erro pontual já reconhecido |
| E12 | 🔴 | Já implementado |
| E13 | 🔴 | Decisão registrada |
| E14 | 🔴 | Erro pontual já reconhecido |
| E15 | 🟢 | Falta remover cláusula da BLOCO 0-X |
| E16 | 🟢 | Parcialmente implementado (0-U regra 5), falta lock técnico |
| E17 | 🔴 | Decisão aprovada |
| E18 | 🟡 | Precisa virar seção do documento |
| E19 | 🔴 | Terminologia já padronizada |
| E20 | 🔴 | Virou fato registrado (42 partes) |

## Bloco 3 — D1 a D17 (os 17 buracos)

Todos ✅ fechados **no papel**. Destino único: 🟢 implementar na FASE 5.3, exceto:

| Item | Nota |
|---|---|
| D1-D4, D6-D14, D17 | 🟢 implementação direta |
| D5 | 🟢 mas é o **mais crítico** — priorizar primeiro |
| D15 | 🟡 os 4 conflitos (E31) + 8 ajustes (E32) exigem cuidado |
| D16 | 🟢 já com 3 frentes de mitigação decididas |

## Bloco 4 — E21 a E30 (achados FASE 3, etapas 3.1-3.4)

| Item | Destino | Motivo |
|---|---|---|
| E21 | 🟢 | Corrigir drift (10 pontos = escala) |
| E22 | 🟢 | Só ativar o uso |
| E23 | 🔴 | Decisão já registrada (DEC-10) |
| E24 | 🟢 | Verificação simples |
| E25 | 🟡 | Depende do hook E33 |
| E26 | 🟡 | Virar texto explícito no documento |
| E27 | 🔴 | Já aprovado (DEC-6) |
| E28 | 🔴 | Já aprovado (DEC-7) |
| E29 | 🔴 | Já aprovado (DEC-8) |
| E30 | 🟡 | Varredura ampla, trabalho real |

## Bloco 5 — Decisões (DEC-1 a DEC-16)

Não são itens a triar — já tomadas, só precisam ser implementadas onde apontam (maioria dentro da FASE 5.3).

## Bloco 6 — E31 e E32 (cruzamento contra as 37 BLOCOs)

| Item | Destino | Motivo |
|---|---|---|
| E31 (4 conflitos reais) | 🟡 | Editar CLAUDE.md em 4 pontos sensíveis (DEC-11) |
| E32 (8 ajustes) | 🟢 | Já aprovados (DEC-12), implementação direta |

## Bloco 7 — E33 a E65 (etapas 3.6-3.7 + leitura do framework)

| Item | Destino | Motivo |
|---|---|---|
| E33, E56 | 🟡 | Construir `check-agent-identity.js` + os 5 riscos |
| E34, E36, E43 | 🟢 | Adotar mecanismo existente, não criar |
| E37 | 🟡 | Regra nova de fluxo — trio formaliza |
| E38 | 🟡 | Decomposição obrigatória — vira seção |
| E39, E44 | 🔵 | Pendente de revisão contra Executor Patterns |
| E40 | 🟢 | Correção de template |
| E41 | 🟡 | Portão 4.5 — desenho novo |
| E42 | 🟢 | Passo 12 (encerramento explícito) |
| E45, E48 | 🟢 | Segue padrão de `story-lifecycle.md` |
| E46 | 🔴 | Mecanismo já existe |
| E47, E49, E50, E51, E53, E55 | 🟡 | Regras do ciclo — texto formal coerente |
| E52 | 🔴 | Escalação já existe |
| E54 | 🔴 | Princípio, não tarefa |
| E57, E58, E59 | 🟢 | Formatação do formulário |
| E60 | 🔴 | Constatação sobre método |
| E61 | ✅ **RESOLVIDO (DEC-19)** | Ver seção dedicada — saiu de COMPLETA |
| E62, E63 | 🟡 | Adaptar frameworks de qualidade aos 9 portões |
| E64 | 🟢 | 7 mecanismos mapeados, só religar |
| E65 | 🔴 | Checkpoint substituído |

## Bloco 8 — E66 a E84 (leitura integral do framework)

| Item | Destino | Motivo |
|---|---|---|
| E66 | ✅ RESOLVIDO (DEC-17) | opção A |
| E67, E68, E69, E70 | 🟡 | Adotar formatos já existentes |
| E71 | 🟢 | Usar framework de custo em token já existente |
| E72 | 🔴 | `entity-registry.yaml` já resolve o D3 |
| E73 | 🟡 | Ativar mecanismos de aprendizado vazios |
| E74 | 🟢 | Especificar arquivos que cada agente carrega |
| E75-E81 | 🟡 | Cada um exige religar um subsistema real |
| E82, E83, E84 | 🔴 | Já resolvidos nesta sessão |

## Bloco 9 — E85 a E97 (sessão 02/09)

| Item | Destino | Motivo |
|---|---|---|
| E85, E86 | 🔴 | Já resolvidos |
| E87 | 🔵 | Fechado na prática — script determinístico substituiu sub-agentes |
| E89 | 🟡 | Corrigir §11 do desenho |
| E90 | ⚪ | Bug do squad-creator, fora do Solucionador |
| E91 | 🟡 | `session-state.js` precisa adaptação real |
| E92 | 🔵 | 🔴 Bug de dado real na planilha — prioridade quando FASE 6 voltar |
| E93 | 🟢 | Padrão já validado, só replicar |
| E94 | 🟡 | Reaproveitar `check-handoff-audit.js` |
| E95 | 🟢 | 2 correções diretas |
| E96 | 🟡 | A13/A14 — desenho novo |
| E97 | ⚪ | Investigação técnica do pipeline Karzen |

## Bloco 10 — Reconciliação com o caderno Karzen

| Achado | Destino |
|---|---|
| E98 — ferramenta de geração automática de "fluxo em andamento" | 🟡 |
| E99 — generalizar hook da BLOCO 0-K pras BLOCOs de formato | 🟡 |
| E100 — hook técnico de detecção de idioma (BLOCO 0-AF só tem texto) | 🟡 |

Customizações: **60 reais** (não 61 — 1 era template de exemplo). Não auditadas linha-a-linha as 3 mais novas contra as 37 BLOCOs.

## Bloco 11 — E101 a E105 (investigação do trio)

| Item | Destino | Motivo |
|---|---|---|
| E101 | 🔴 | Achado informativo — vira contexto |
| E102 | 🟡 | Incorporar Meta Decision Flow num portão |
| E103 | 🟢 | Rodar Context Death Test contra os 4 documentos |
| E104 | 🔴 | Já corrigido |
| E105 | ✅ **RESOLVIDO** | Gatilho `/Solucionador` — BLOCO 0-AH |

## As 6 fases — status real (04/09, após DEC-19)

| Fase | O que | Status real |
|---|---|---|
| 🔒 0 | Garantir o que existe | ✅ Concluída |
| 📖 1 | Ler 541.000 linhas | ✅ Concluída (E85-E91) |
| 🗺️ 2 | Mapear sessão desde 13/08 | ✅ Concluída (E92-E97) |
| 📋 3 | Montar `PLANO-FINAL.md` | ✅ Concluída |
| 🎯 5 | Rodar as partes | 🟡 Só E61 rodou (Spec Pipeline) — 154 partes restantes intocadas |
| 🔧 4 | Camada 0 (`status`) | ⏳ Aguardando a 5 |
| 📊 6 | Planilha (linha 151/736) | ⏳ Bloqueada |

---

*Documento consolidado — não substitui os 3 arquivos-fonte, que continuam sendo a referência viva e atualizável. Gerado em 04/09/2026.*

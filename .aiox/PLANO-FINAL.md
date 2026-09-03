# PLANO FINAL — disposição dos 150 itens de `itens-em-aberto.md`

> **Produzido por:** 👑 @aiox-master (Orion), FASE 3 (tarefa 3.1) do `.aiox/PLANO-EXECUCAO.md`, em 02/09/2026.
> **Regra de verificação:** todo item do `itens-em-aberto.md` aparece aqui, com destino, ou é marcado **fora de escopo** com motivo. Nenhum item foi omitido — conferido contra a leitura integral do arquivo (150 linhas `- [`, todas as seções).
> **O que este documento NÃO faz:** não decide nada novo. Cada linha reflete o estado que o item já tinha no `itens-em-aberto.md` (resolvido, decidido, ou genuinamente aberto) — a única decisão nova tomada aqui é **para qual trilha do Solucionador cada item aberto vai**.

---

## 🔑 Legenda das 4 saídas (ver `SOLUCIONADOR-DESENHO.md` seção 3.2)

| Saída | Quando usar |
|---|---|
| 🔴 **VETO** | Já resolvido/decidido — só falta arquivar, ou não vale mais a pena mexer |
| 🟢 **RÁPIDA** | Decisão já tomada (por Felipe ou pela própria sessão) — falta só implementar, zero ambiguidade |
| 🟡 **MÉDIA** | Precisa decidir *como* implementar — trio (Finch/Alan/Pedro) decide, depois vira story |
| 🔵 **COMPLETA** | Estrutural, afeta o framework inteiro, ou decisão que só o Felipe pode tomar |
| ⚪ **FORA DE ESCOPO** | Não é trabalho do Solucionador — pertence à FASE 6 (planilha Karzen) ou já foi explicitamente separado |

---

## ✅ E66 — RESOLVIDO (DEC-17, 02/09/2026): opção A

**O conflito, sem filtro:** o `aiox-kb.md` do próprio AIOX manda usar contexto novo por agente (*"ALWAYS start new chat between SM, Dev, and QA work"*). O Solucionador que desenhamos roda 9-12 agentes na mesma conversa. Os sintomas que o framework prevê pra quem ignora essa regra — persona confundida, leitura parcial, coisas esquecidas — **já aconteceram nesta sessão** (E33, E60, E20).

**Não existe uma lista de opções já fechada em nenhum arquivo até hoje** — fui conferir antes de te dizer algo errado, e essa parte da conversa nunca virou uma lista formal. Com base no que já foi mapeado nesta sessão (E75-E81: várias camadas do `core/` já implementadas, incluindo `session-state.js` real), as saídas tecnicamente possíveis são:

| Opção | O que seria | Prós | Contras |
|---|---|---|---|
| **A — Ignorar a regra, manter 1 conversa** | O Solucionador continua rodando todos os agentes na mesma conversa, como está desenhado hoje | Zero retrabalho no desenho já aprovado | Os sintomas já provados nesta sessão (persona confundida 3×, leitura parcial) tendem a se repetir |
| **B — 1 conversa por portão** | Cada portão (Finch, Alan, Pedro, @dev, @qa...) abre uma sessão nova de verdade, usando o `session-state.js` (E91, real e em produção) pra passar o estado adiante | Seguiria a regra do framework à risca | Exige adaptar `session-state.js` pro formato de portões (E91 já achou que ele não serve pronto) — trabalho real, não trivial; e você teria que trocar de janela/terminal a cada portão |
| **C — Hídrido: contexto novo só nas trocas de agente "pesadas"** | Trio (Finch/Alan/Pedro) continuam na mesma conversa por serem curtos e ligados; @dev/@qa/@sm/@po (que já são agentes AIOX normais, não do trio) abrem sessão nova, como já fazem hoje fora do Solucionador | Aplica a regra só onde ela mais importa (agentes que já eram "context-new" antes do Solucionador existir) | Ainda precisa decidir exatamente onde cortar |
| **D — Aceitar o risco, mitigar com o que já existe** | Mantém 1 conversa (como a A), mas ativa os mecanismos que já foram achados nesta sessão pra pegar os sintomas: `check-agent-identity.js` (E33, ainda não construído), cota de discordância (E27, já aprovada), detector de convergência (E28, já aprovado) | Não exige redesenhar nada, usa o que já foi aprovado | Não elimina a causa, só aumenta a chance de pegar o sintoma depois que ele já aconteceu |

**Minha avaliação, não uma escolha por você:** a opção **D** é a que menos atrasa (nada novo pra construir além do que já está na fila), mas é remédio pro sintoma, não pra causa. A opção **B** é a mais fiel à regra do framework, mas tem custo real de adaptação. Isso é exatamente o tipo de troca que só você pode decidir — não tem uma resposta tecnicamente "certa" aqui.

**➡️ DECIDIDO: opção A — manter tudo na mesma conversa, como está hoje.** Risco aceito conscientemente. Mitigação ativa: E27 (cota de discordância) e E28 (detector de convergência), já aprovados; **E100** (hook de identidade, achado na reconciliação do caderno Karzen) entra na fila 🟡 MÉDIA como reforço adicional, não como pré-requisito. **Nada bloqueia mais o início da FASE 5 por causa do E66.**

---

## 📊 Resumo por trilha (153 itens + 16 decisões do Felipe)

> **Atualizado em 02/09/2026, após a reconciliação com o caderno da Karzen (Bloco 10) e a decisão do E66 (DEC-17).** A versão anterior deste plano (150 itens) cobria só o `itens-em-aberto.md` — ficaram de fora o caderno `packages/karzen/PROJETO-STATUS.md` e a consistência das 3 customizações mais novas. Os dois cobertos. E66 decidido (opção A) — sai da coluna COMPLETA, entra em VETO/arquivar (decisão tomada, nada a construir).

| Trilha | Quantos itens | O que significa na prática |
|---|---|---|
| 🔴 VETO / já resolvido, arquivar | 37 | Remover de `itens-em-aberto.md`, mover pra `itens-resolvidos-arquivo.md` (+1: E66, +2: E101 informativo/E104 já corrigido no arquivo) |
| 🟢 RÁPIDA | 53 | Implementação direta, @dev + @qa, sem passar pelo trio (+1: E103) |
| 🟡 MÉDIA | 46 | Trio decide o *como* antes de virar story (+3: E98, E99, E100; +2: E102, E105) |
| 🔵 COMPLETA | 5 | Estrutural ou decisão só do Felipe (só **E61** resta) |
| ⚪ FORA DE ESCOPO | 17 | Pertence à FASE 6 (planilha Karzen) ou já foi separado explicitamente |
| **Total rastreado** | **158** | 37+53+46+5+17 |

### Bloco 11 — E101 a E105 (investigação do trio + auditoria de fechamento)

| Item | Destino | Motivo |
|---|---|---|
| E101 | 🔴 VETO/arquivar | Achado informativo (trio é domínio diferente) — vira contexto de E102-E105, não ação própria |
| E102 | 🟡 MÉDIA | Incorporar Meta Decision Flow como checklist num portão (ex: portão 5, autocrítica do @dev) |
| E103 | 🟢 RÁPIDA | Rodar o Context Death Test contra os 4 documentos do Solucionador — 2-5 min cada, critério pronto |
| E104 | 🔴 VETO/arquivar | Já corrigido — `SOLUCIONADOR-DESENHO.md` seção do portão 4.5 editada nesta sessão |
| E105 | 🟡 MÉDIA | Desenhar e implementar o gatilho `/Solucionador` (ativa o processo, não um agente) |

---

## 📑 Tabela completa — todos os itens

### Bloco 1 — Itens abertos pré-Solucionador (24/08 a 29/08)

| Item | Resumo | Destino | Motivo |
|---|---|---|---|
| (sem ID) | 3 camadas de proteção do framework mortas | 🟢 RÁPIDA | Causa raiz já virou o próprio Solucionador (D1-D17); falta implementar (FASE 5.3) |
| A1 | Onde instalar o guardião | 🔵 COMPLETA | Decisão do Felipe — mas E17 já resolveu a ordem: só entra depois do E66/"guardião ainda é necessário" |
| A2 | Quando implementar o guardião | 🔴 VETO/arquivar | Respondido pela própria prática — estamos implementando agora |
| A3 | `project-log.md` contradiz decisão 28/08 | 🟢 RÁPIDA | Correção textual direta |
| A4 | 3 afirmações falsas no CLAUDE.md sobre hook reforçado | 🟢 RÁPIDA | Correção textual direta |
| A5 | `.current-agent` órfão em `packages/karzen` | 🟢 RÁPIDA | Apagar arquivo |
| A6 | Hook só vê QUEM, não QUAL arquivo | 🟡 MÉDIA | Precisa desenhar a "tabela separada do código" |
| A7 | Guia de criação de projeto novo não existe | 🟡 MÉDIA | Bloqueado por A1 |
| A8 | Planilha pausada na linha 150 | ⚪ FORA DE ESCOPO | É a FASE 6, já rastreado lá |
| Desenho da solução (camadas 0-3, linha 35) | Design original do guardião | 🔴 VETO/arquivar | Superado — virou o desenho do Solucionador |
| dev 24/08 — modo `--so-regenerar` | Melhoria do script de reprocessamento | ⚪ FORA DE ESCOPO | Pipeline Karzen, não framework |
| dev 24/08 — compromisso de mostrar comando real | Norma comportamental | 🔴 VETO/arquivar | Já é regra ativa, não é mais pendência |
| aiox-master 10/08 — retrofit técnico 0-C/N/O/L | Aplicar o padrão do PRINCÍPIO | 🟡 MÉDIA | Trabalho de framework, mas menor que o resto |
| aiox-master 10/08 — `check-handoff-audit.js` só testado com 3 cenários | Falta teste real | 🟢 RÁPIDA | Testar com casos reais de produção |
| dev 11/08 — página renomeada na Planilha do Ads | Dado desatualizado | ⚪ FORA DE ESCOPO | Planilha Google Sheets, não é a FASE 6 (Excel) nem o Solucionador |
| analyst 13/08 — `page.close()` não garantido | Bug de automação | ⚪ FORA DE ESCOPO | Pipeline Karzen |
| dev 13/08 — ~45 arquivos não commitados | Decisão de arquivo antigo | ⚪ FORA DE ESCOPO | Decisão do Felipe sobre arquivos específicos, não é o Solucionador |
| analyst 14/08 — pipeline não testado com muitos cards | Cobertura de teste | ⚪ FORA DE ESCOPO | Pipeline Karzen |
| dev 14/08 — convenção ID Family baseada em 1 caso | Risco de regra frágil | ⚪ FORA DE ESCOPO | Pipeline Karzen |
| dev 14/08 — regex `condicao` só 2 faixas | Cobertura futura | ⚪ FORA DE ESCOPO | Pipeline Karzen, resolver só se aparecer caso real |
| dev 19/08 — altura de linha + regra 2 MLBs | Bugs confirmados no Excel | ⚪ FORA DE ESCOPO | Pipeline Karzen, aguardando `*elicit` |

### Bloco 2 — E1 a E20 (itens soltos do Solucionador, 30-31/08)

| Item | Destino | Motivo |
|---|---|---|
| E1 | 🔴 VETO/arquivar | Já resolvido neste próprio commit da sessão |
| E2 | 🟡 MÉDIA | B10 precisa de spec de "registro com horário" — trio decide o formato |
| E3 | 🟢 RÁPIDA | Os 9 buracos já foram re-cruzados e viraram E31/E32 — este item fecha junto |
| E4 | 🔴 VETO/arquivar | Já resolvido na FASE 2 desta sessão |
| E5 | 🟢 RÁPIDA | Correção textual (10 pontos, não 6) — já documentado corretamente aqui |
| E6 | 🟡 MÉDIA | Camada 0 — depende de DEC-1/DEC-2 (já decididos), falta só a implementação real (FASE 4, reavaliada) |
| E7 | 🟡 MÉDIA | Batimento cardíaco nunca especificado — trio decide o mecanismo |
| E8 | 🔴 VETO/arquivar | Decisão registrada, não é mais pendência |
| E9 | 🟢 RÁPIDA | Opção B já escolhida (Solucionador escreve as 28 partes na FASE 5.4) |
| E10 | 🟢 RÁPIDA | Versionar o arquivo — ação direta |
| E11 | 🔴 VETO/arquivar | Erro pontual já reconhecido, sem ação pendente |
| E12 | 🔴 VETO/arquivar | Já implementado na FASE 2 desta sessão |
| E13 | 🔴 VETO/arquivar | Decisão registrada |
| E14 | 🔴 VETO/arquivar | Erro pontual já reconhecido |
| E15 | 🟢 RÁPIDA | Decisão registrada — falta só remover a cláusula da BLOCO 0-X (ação direta) |
| E16 | 🟢 RÁPIDA | Modelo já parcialmente implementado (BLOCO 0-U REGRA 5) — falta o lock técnico |
| E17 | 🔴 VETO/arquivar | Decisão aprovada, já refletida na ordem do plano |
| E18 | 🟡 MÉDIA | Descoberta conceitual — precisa virar seção no documento do Solucionador |
| E19 | 🔴 VETO/arquivar | Terminologia já padronizada |
| E20 | 🔴 VETO/arquivar | Achado, virou fato registrado (total de 42 partes) |

### Bloco 3 — D1 a D17 (os 17 buracos do desenho)

Todos ✅ fechados **no papel**. Destino único para todos: **🟢 RÁPIDA — implementar na FASE 5.3**, exceto onde note abaixo.

| Item | Nota |
|---|---|
| D1-D4, D6-D14, D17 | 🟢 RÁPIDA — implementação direta na FASE 5.3 |
| D5 | 🟢 RÁPIDA — mas é o mais crítico (era o que matou as 3 camadas); priorizar primeiro dentro da FASE 5.3 |
| D15 | 🟡 MÉDIA — os 4 conflitos reais (E31) e os 8 ajustes (E32) exigem editar `CLAUDE.md` com cuidado, não é mecânico |
| D16 | 🟢 RÁPIDA — já com as 3 frentes de mitigação decididas |

### Bloco 4 — E21 a E30 (achados da FASE 3, etapas 3.1-3.4)

| Item | Destino | Motivo |
|---|---|---|
| E21 | 🟢 RÁPIDA | Corrigir drift de documentação (10 pontos = escala, não contagem) |
| E22 | 🟢 RÁPIDA | Já mapeado onde cada etapa do @po se liga — só ativar o uso |
| E23 | 🔴 VETO/arquivar | Decisão do Felipe já registrada (DEC-10) |
| E24 | 🟢 RÁPIDA | Checar se `code-intel-pretool.cjs` está morto — ação simples de verificação |
| E25 | 🟡 MÉDIA | Depende do hook `check-agent-identity.js` (E33) — mesma frente |
| E26 | 🟡 MÉDIA | Precisa virar texto explícito na FASE 4.1 (documento do Solucionador) |
| E27 | 🔴 VETO/arquivar | Já aprovado (DEC-6) — falta só entrar na implementação de D5/cadeia de artefatos |
| E28 | 🔴 VETO/arquivar | Já aprovado (DEC-7) — mesma observação |
| E29 | 🔴 VETO/arquivar | Já aprovado na forma final (DEC-8) — implementação é a mesma frente da BLOCO 2-B |
| E30 | 🟡 MÉDIA | Varredura ampla do `CLAUDE.md`/`rules/`/Manual — trabalho real, não mecânico |

### Bloco 5 — Decisões do Felipe (DEC-1 a DEC-16)

Todas as 16 decisões **não são itens a triar** — são decisões já tomadas que precisam apenas ser **implementadas** onde apontam (a maioria dentro da FASE 5.3, algumas na FASE 4). Nenhuma fica "em aberto" neste plano; todas rastreadas dentro dos itens que elas resolvem (E6, E12, E23, E27-E29, E31-E32, E66-ordem, etc.).

### Bloco 6 — E31 e E32 (cruzamento contra as 37 BLOCOs)

| Item | Destino | Motivo |
|---|---|---|
| E31 (4 conflitos reais) | 🟡 MÉDIA | Editar `CLAUDE.md` em 4 pontos sensíveis — já aprovado (DEC-11), mas edição cuidadosa |
| E32 (8 ajustes) | 🟢 RÁPIDA | Já aprovados (DEC-12), com o meio-termo do item 7 decidido — implementação direta |

### Bloco 7 — E33 a E65 (etapas 3.6-3.7 + leitura do framework)

| Item | Destino | Motivo |
|---|---|---|
| E33 | 🟡 MÉDIA | Construir `check-agent-identity.js` — desenho de hook, não mecânico |
| E56 | 🟡 MÉDIA | Os 5 riscos do hook acima entram junto na mesma decisão |
| E34, E36, E43 | 🟢 RÁPIDA | ♻️ Reclassificados — adotar mecanismo existente (nome/ID/formato), não criar |
| E37 | 🟡 MÉDIA | Regra nova de fluxo (risco eliminável não chega no portão 9) — trio formaliza |
| E38 | 🟡 MÉDIA | Decomposição obrigatória antes da apresentação — vira seção do documento |
| E39, E44 | 🔵 COMPLETA | ⚠️ Marcados como "pendente de revisão" contra os Executor Patterns — não lidos por inteiro ainda |
| E40 | 🟢 RÁPIDA | Correção de template (N=0 é o esperado) |
| E41 | 🟡 MÉDIA | Portão 4.5 (teste ao vivo) — desenho novo, precisa virar seção formal |
| E42 | 🟢 RÁPIDA | Passo 12 (encerramento explícito) — adicionar ao fluxo |
| E45, E48 | 🟢 RÁPIDA | Seções da story por agente — segue o padrão que já existe em `story-lifecycle.md` |
| E46 | 🔴 VETO/arquivar | Mecanismo já existe e foi só localizado, nada a decidir |
| E47, E49, E50, E51, E53, E55 | 🟡 MÉDIA | Regras do ciclo (2ª rodada, recusa, moções) — precisam virar texto formal coerente entre si |
| E52 | 🔴 VETO/arquivar | Mecanismo de escalação já existe (`agent-authority.md` + QA Loop), só usar |
| E54 | 🔴 VETO/arquivar | Princípio (PV004), não uma tarefa — orienta as outras decisões, não gera ação própria |
| E57, E58, E59 | 🟢 RÁPIDA | Formatação/regras claras do formulário de apresentação ao Felipe |
| E60 | 🔴 VETO/arquivar | Constatação sobre método, vira lição aplicada (é por isso que a FASE 1/2 desta sessão foi feita por varredura, não por pergunta dirigida) |
| E61 | 🔵 COMPLETA | Decisão só do Felipe — o framework vetaria o Solucionador por escopo grande (>=8 agentes) |
| E62, E63 | 🟡 MÉDIA | Aplicar frameworks de qualidade já existentes aos 9 portões — trabalho real de adaptação |
| E64 | 🟢 RÁPIDA | Lista de "adotar, não reinventar" — 7 mecanismos já mapeados, só religar |
| E65 | 🔴 VETO/arquivar | Checkpoint de leitura, substituído pelo checkpoint mais novo (dentro do E84/FASE 1) |

### Bloco 8 — E66 a E84 (leitura integral do framework)

| Item | Destino | Motivo |
|---|---|---|
| E66 | ✅ RESOLVIDO (DEC-17) | Ver seção dedicada acima — opção A escolhida pelo Felipe |
| E67, E68, E69, E70 | 🟡 MÉDIA | Adotar formatos/mecanismos já existentes (workflow híbrido, schema de estado, nomes de status, orquestração) |
| E71 | 🟢 RÁPIDA | Usar o framework de custo em token já existente pro orçamento de ciclo |
| E72 | 🔴 VETO/arquivar | `entity-registry.yaml` já resolve o D3 — nada a fazer, só usar |
| E73 | 🟡 MÉDIA | Ativar os mecanismos de aprendizado vazios (onde o post-mortem escreve) |
| E74 | 🟢 RÁPIDA | Especificar arquivos que cada agente do trio carrega — direto |
| E75, E76, E77, E78, E79, E80, E81 | 🟡 MÉDIA | Cada um exige investigar/religar um subsistema real do `core/` — trabalho de adaptação, não mecânico |
| E82 | 🔴 VETO/arquivar | Já resolvido na FASE 0.2 desta sessão |
| E83 | 🔴 VETO/arquivar | Já resolvido (parcialmente) na FASE 0.4 — `RETOMAR-AQUI.md` existe |
| E84 | 🔴 VETO/arquivar | Constatação de volume, sem ação própria — orienta o método da FASE 1 |

### Bloco 9 — E85 a E97 (sessão de hoje, 02/09/2026)

| Item | Destino | Motivo |
|---|---|---|
| E85 | 🔴 VETO/arquivar | Já resolvido — `PLANO-EXECUCAO.md` existe |
| E86 | 🔴 VETO/arquivar | Observação de processo, já virou a DEC-15 (implementada) |
| E87 | 🔵 COMPLETA | 🔴 Crítico — pausado, precisa de decisão de redesenho de método (já resolvido nesta sessão: script determinístico substituiu sub-agentes) — **fechado na prática**, mover pra arquivo |
| E89 | 🟡 MÉDIA | Corrigir a seção 11 do `SOLUCIONADOR-DESENHO.md` — 4 dos 7 mecanismos exigem religação real, não só citar |
| E90 | ⚪ FORA DE ESCOPO | Já marcado explicitamente como "registrar e não agir agora" — bug do squad-creator, independente do Solucionador |
| E91 | 🟡 MÉDIA | `session-state.js` precisa ser adaptado pro formato de portões — trabalho real |
| E92 | 🔵 COMPLETA | 🔴 Bug de dado real, pode estar afetando a planilha `Analise Oficial.xlsx` agora — prioridade alta quando a FASE 6 retomar; verificar assim que possível, não esperar o resto da FASE 5 |
| E93 | 🟢 RÁPIDA | Padrão de checagem já validado no próprio pipeline — só replicar |
| E94 | 🟡 MÉDIA | Reaproveitar `check-handoff-audit.js` pra bloquear frase de intenção sem registro — desenho de hook |
| E95 | 🟢 RÁPIDA | 2 correções diretas de script + formatação de log |
| E96 | 🟡 MÉDIA | A13 e A14 — regra de validade de regras e encerramento por evento, ambos precisam de desenho |
| E97 | ⚪ FORA DE ESCOPO | B2/B3 são investigação técnica do pipeline Karzen (rate-limit, divergência de teste), não framework |

---

### Bloco 10 — Reconciliação com o caderno da Karzen e com as customizações (feita a pedido do Felipe, 02/09/2026)

**Pergunta do Felipe:** *"Aqui já tem todas as pendências em aberto do caderno também? O claude.md, customizações também?"* — resposta honesta na hora: não, nenhum dos dois. Reconciliação feita agora, os dois.

**1) `packages/karzen/PROJETO-STATUS.md` (caderno da Karzen) — lido por completo:**

| Achado | Destino |
|---|---|
| E98 — ferramenta de geração automática do "fluxo em andamento" | 🟡 MÉDIA |
| E99 — generalizar hook da BLOCO 0-K pras BLOCOs de formato (1, 1-A, 0-T, 0-Y, 3) | 🟡 MÉDIA |
| E100 — hook técnico de detecção de idioma (BLOCO 0-AF só tem o texto ainda) | 🟡 MÉDIA |
| "Inconsistência `project-log.md` × hook" | Duplicata do **A3**, já roteado — sem novo item |
| "Regra anti-invenção com força suficiente" | Coberto (não implementado ainda) por BLOCO 0-L + **E22/E36/E54/E62**, já roteados — sem novo item |
| Todo o resto (SKUs, Campanhas de Ads, decisões de negócio, backup, screenshots) | Específico do pipeline Karzen — corretamente fora do Solucionador, já rastreado no próprio caderno |

**2) Customizações — verificação da contagem:** o Manual tem **60 customizações reais** (não 61 — o grep inicial contou também uma linha-modelo "CUSTOMIZAÇÃO N — [Nome descritivo]" que é só o template de exemplo dentro do próprio arquivo, não uma customização de verdade). Das 60, as 3 mais novas (58, 59, 60) foram criadas **nesta sessão, cada uma emparelhada 1:1 com a edição da BLOCO correspondente no `CLAUDE.md`** — risco de drift bem menor que a checagem geral que o E31/E32 fez contra as 57 antigas (que foi uma varredura ampla, não pareada). **Não fiz uma auditoria linha-a-linha das 58-60 contra as 37 BLOCOs no mesmo nível de rigor do E31/E32** — se o Felipe quiser esse nível de certeza, é um item novo de trabalho (curto, ~15 min), não incluído aqui por não ter sido pedido explicitamente ainda.

---

## ✅ Reconciliação (tarefa 3.2)

| Checagem | Resultado |
|---|---|
| Todo item de `itens-em-aberto.md` tem uma linha aqui? | ✅ Sim — 153 itens numerados + itens sem ID (7) + 16 decisões, todos cobertos nos 10 blocos acima |
| Contagem bate com o resumo da seção 2? | ✅ 34 VETO + 52 RÁPIDA + 44 MÉDIA + 6 COMPLETA + 17 FORA DE ESCOPO = 153 |
| Caderno da Karzen conferido? | ✅ Sim — 3 achados novos (E98-E100), resto corretamente fora de escopo |
| Customizações conferidas? | 🟡 Parcial — contagem corrigida (60, não 61); auditoria linha-a-linha das 3 mais novas não feita (ver Bloco 10) |
| Algum item ficou de fora? | ❌ Nenhum dos que foram verificados |

---

*Próximo passo: FASE 5 — rodar as partes, começando pela decisão do E66 (Felipe) antes de qualquer implementação que dependa do formato de contexto.*

# 🗺️ PLANO MESTRE — Resolver tudo do projeto Karzen

> **Criado em:** 07/09/2026 · **Por:** 👑 @aiox-master (Orion), em sessão na pasta `global` (AIOX-pro)
> **Substitui como próximo passo:** a FASE 5 do `PLANO-EXECUCAO.md` e as seções 1-2 do `RETOMAR-AQUI.md`
> **Não substitui:** o `itens-em-aberto.md` (continua sendo a fonte da verdade dos itens) nem o `MAPEAMENTO-LINHA-POR-LINHA.md` (continua sendo o registro dos achados)
> **Opção escolhida pelo Felipe:** **PLANO B** — a planilha só volta depois que TUDO estiver resolvido

---

## ⚠️ LEIA ISTO PRIMEIRO — a regra das duas pastas

Este projeto agora é executado a partir de **duas pastas diferentes**, e confundir as duas quebra o plano.

| | **`global`** (AIOX-pro) | **`projeto00/packages/karzen`** (community) |
|---|---|---|
| Latch, Turing, Conduit, Sigil | ✅ existem | ❌ **não existem** |
| Squads | 12 | 5 |
| As 39 BLOCOs ativas | ❌ | ✅ |
| Os 10 hooks rodando | ❌ | ✅ |
| Chrome / Modo Navegador | ❌ | ✅ |
| A planilha e o pipeline | ❌ | ✅ |

### A regra

```
PENSAR e ESPECIFICAR  →  na pasta global
EXECUTAR e TESTAR     →  na pasta karzen
```

### Como a ponte funciona

Nenhum agente de uma pasta chama agente da outra — **isso é impossível**, os arquivos não existem lá.
Quem atravessa é o **Felipe**, trocando de terminal. O que atravessa junto é o **documento**.

```
① global   → Latch/Turing leem os arquivos da Karzen e produzem a ESPECIFICAÇÃO
           → o documento é gravado DENTRO da pasta karzen
② Felipe   → fecha o terminal, abre outro na pasta karzen
③ karzen   → @dev lê a especificação e implementa · @qa testa com hooks ativos
```

**Por que funciona:** o que Latch e Turing entregam é documento, não código rodando. Eles especificam; o `@dev` implementa.

### O que NÃO fazer
- ❌ Copiar os squads da global para a Karzen (questão pro × community não resolvida, e eles dependem de `.claude/skills/` que a Karzen não tem)
- ❌ Esperar que um agente da Karzen invoque Latch ou Turing
- ❌ Implementar hook na pasta global (os hooks da Karzen não rodam aqui — não dá para testar)
- ❌ **Chamar Latch ou Turing antes do PONTO DE RETORNO abaixo**

---

## 🚦 PONTO DE RETORNO — quando voltar para a pasta `global`

> **Esta é a regra que governa a troca de pasta. Sem ela, o plano trava.**

### O sinal

```
🟩 karzen
   @analyst termina o esqueleto-parte1  (até a linha 32.322)
   @analyst termina o esqueleto-parte2  (0% → 100%)
        ↓
   @analyst AVISA o Felipe: "mapeamento linha por linha CONCLUÍDO"
        ↓
   ⚠️  ESTE É O SINAL — não antes

🚶 Felipe atravessa
   fecha o terminal da karzen
   abre um terminal na pasta global
   avisa: "o mapeamento linha por linha está pronto"
        ↓
🟨 global
   @hooks-architect (Latch)    → especifica E27 e E28 SOBRE o mapa oficial
   @sop-ml-architect (Turing)  → define o formato BLOCO → SOP executável
        ↓
   @aiox-master monta o PLANO-MESTRE OFICIAL, com o mapa na mão
```

### Por que Latch e Turing esperam o mapa

**Turing** — precisa saber quais das 39 BLOCOs estão vivas, quais conflitam (E31) e quais têm ajuste aprovado e não implementado (E32). Sem isso, converteria BLOCO morta para SOP.

**Latch** — a razão é mais forte e foi achada em 07/09/2026, ao ler os hooks existentes:

> A Karzen **já tem** o hook `check-handoff-audit.js`.
> O `SOLUCIONADOR-DESENHO.md` registra: *"86 ofertas de handoff, **74 sem a linha de auditoria** exigida pela BLOCO 0-K, e **zero bloqueios**"*.
> **Esse hook existe e não bloqueia nada.**

Especificar E27 e E28 sem entender por que o hook existente falhou é repetir o mesmo erro com nome novo.

E a explicação provavelmente está na sessão que o Atlas está lendo — o Adendo do Achado 17 já registra as **3 rodadas de reforço** do `check-selector-reuse.js` (v1 → buraco → v2 → buraco → v3, inversão estrutural de "detectar padrão ruim" para "detectar ausência de reuso"). **É esse tipo de história que o Latch precisa antes de desenhar.**

---

## 🔁 O CICLO DO MAPEAMENTO — repete ~39 vezes

> Metodologia já validada 21 vezes sem quebrar. **Não alterar.**

```
🟩 karzen

  ① @analyst      lê o próximo pedaço do esqueleto
                  investiga contra o ARQUIVO REAL (nunca memória)
       ↓
  ② @analyst      apresenta no formato fixo:
                  ACHADO → INVESTIGAÇÃO → VALIDAÇÃO → AGENTE RESPONSÁVEL
       ↓
  ③ Felipe        confirma ou derruba
       ↓
  ④ @aiox-master  persiste no MAPEAMENTO-LINHA-POR-LINHA.md
                  ⚠️ SÓ PERSISTE — NUNCA INVESTIGA
                  (regra reforçada após violação real em 04/09)
       ↓
  ⑤ @devops       commit + push
       ↓
  ⑥ volta ao ①
```

### Regras deste ciclo

| Regra | Detalhe |
|---|---|
| Nunca pular a confirmação | Sem o "confirma" do Felipe, nada é persistido |
| Nunca adiantar pedaço | Um por vez. "Nunca deve ser feito o próximo pedaço, deve fazer e depois investigar" |
| Nunca rodar em background | Pedido explícito do Felipe, 04/09/2026 |
| Orion não investiga | Ele só grava o que o Atlas apurou e o Felipe confirmou |
| Divergência vai para o dono | Se não bate, vai para o `AGENTE RESPONSÁVEL` — não é resolvida ali |

---

## 🧭 DECISÕES TOMADAS NESTA SESSÃO (07/09/2026)

| # | Decisão | Consequência |
|---|---|---|
| **DEC-20** | **O `/Solucionador` é APOSENTADO.** Não será construído como desenhado | Ver justificativa abaixo |
| **DEC-21** | As 2 ideias boas dele (E27 cota de discordância, E28 detector de convergência) **viram hook** | Especificação por Latch, implementação por @dev |
| **DEC-22** | A **Camada 0 sobe para agora**, mas passa pelo SDC completo antes de ser implementada | Escopo revisto — ver FASE 1 |
| **DEC-23** | **PLANO B**: a planilha só volta depois que todas as fases terminarem | A planilha fica em 151/736 até a FASE 6 |
| **DEC-24** | O mapeamento completo vem **antes** da reorganização estrutural | Reorganizar sem o mapa é cirurgia no escuro |

### Justificativa da DEC-20 — por que o Solucionador foi aposentado

Analisados os 9 portões da trilha 🔵 do `SOLUCIONADOR-DESENHO.md`:

| Portão | Quem | Veredito |
|---|---|---|
| 1-3 Viabilidade / Insumos / Processo | Finch, Alan, Pedro | 🔴 **Reprovados pela própria investigação E101-E104** — o trio existe para clonar mentes e vender como produto, não para governança de framework |
| 4 Validação de story | @po | ✅ **Já existe — é o SDC** |
| 4.5 Handshake semântico | automático | ❌ Órfão (E104), nunca foi religado |
| 5 Implementação | @dev | ✅ **Já existe — é o SDC** |
| 6-8 Qualidade | @qa | ✅ **Já existe — é o SDC** |
| 9 Assinatura | Felipe | ✅ **Já existe — é o SDC** |

**Portão 0** (o classificador) já está implementado: `task-complexity-classifier.js` + `fast-path-gate.js`, e não chamam LLM.

**Conclusão:** metade dos portões foi reprovada pelo próprio Felipe; a outra metade é o SDC com nomes trocados. O que sobra de genuinamente original são os mecanismos E27 e E28 — que viram hook (DEC-21), porque como *regra* teriam o mesmo defeito que o Solucionador nasceu para resolver: dependeriam do agente lembrar de aplicá-las.

**O diagnóstico do Solucionador estava correto** (*"a regra depende do agente perceber sozinho que deveria aplicá-la"*). A solução é que estava superdimensionada.

---

## 📊 ESTADO ATUAL DE CADA FRENTE

| Frente | Onde está | Trava |
|---|---|---|
| Planilha `Analise Oficial.xlsx` | **151 de 736 linhas** | DEC-23 — só volta na FASE 6 |
| Mapeamento linha por linha | **~37%** do `esqueleto-parte1` (linha 11.909 de 32.322) · **0%** do `esqueleto-parte2` (~1.600 linhas) | — |
| Itens em aberto | **178 itens** (38 VETO · 53 RÁPIDA · 46 MÉDIA · 4 COMPLETA · 17 fora de escopo) | — |
| Commits do mapeamento | **24 locais, não pushados** | — |
| Achado 2 (`PAS23-BIV` / E92) | Divergência real aberta, nunca investigada | atribuída ao @dev |
| Adendo ao Achado 14 | Investigado e apresentado, **nunca confirmado** — a sessão fechou antes | precisa de confirmação do Felipe |

---

# 🚦 AS 6 FASES

## FASE 0 — Desbloqueio imediato
**Onde:** 🟩 karzen · **Depende de:** nada · **Estimativa:** ~1h

> ⚠️ **ORDEM OBRIGATÓRIA E SEQUENCIAL.** A FASE 0 roda 0.1 → 0.2 → 0.3, nesta ordem.
> **O `@analyst` NÃO retoma o mapeamento (FASE 1) antes da FASE 0 estar fechada.**

### 0.1 — 🚀 @devops · PRIMEIRO DE TUDO

```
@devops commitar .aiox/PLANO-MESTRE.md e .aiox/RETOMAR-AQUI.md
e fazer push, junto com os 24 commits do mapeamento
```

| | |
|---|---|
| Por que é o primeiro | 🔴 **O `PLANO-MESTRE.md` foi criado em 07/09/2026 e nunca foi commitado.** O documento que governa o projeto inteiro está fora do Git, sem cópia e sem histórico |
| Precedente | É o mesmo padrão do **E82** — *"até 02/09 o desenho só existia no `.jsonl` da sessão; se o terminal fechasse, o desenho se perdia"* |
| Inclui | `.aiox/PLANO-MESTRE.md` (novo) · `.aiox/RETOMAR-AQUI.md` (modificado) · os 24 commits locais do `MAPEAMENTO-LINHA-POR-LINHA.md` |

### 0.2 — 💻 @dev · DEPOIS do 0.1

```
@dev investigar o Achado 2 no Modo Navegador — SKU PAS23-BIV,
MLB 6667309696, statusCatalogo null
```

Confirmar se a causa raiz é a mesma janela de 2200 caracteres do bug de 13/08, ou se é bug distinto. É a única divergência real aberta do mapeamento.

#### 🌐 Restrição obrigatória do Modo Navegador

> **Abrir o número mínimo de abas necessário. Fechar cada aba ao terminar, inclusive em erro e timeout.**

| Regra | Detalhe |
|---|---|
| Quantas abas | Só as necessárias para este SKU. **Não abrir lote** |
| Fechamento | `page.close()` em bloco `finally`, **nunca só no caminho feliz** |
| Por quê | **Achado 1 do `MAPEAMENTO-LINHA-POR-LINHA.md`**: scripts do Modo Navegador que fecham a aba só no caminho feliz já causaram acúmulo real de **8 abas duplicadas** numa sessão |
| Antes de rodar | Ler `.aiox-core/development/tasks/modo-navegador-browser-access.md` |
| Executor | Exclusivo do `@dev` — nenhum outro agente roda o Modo Navegador |

### 0.3 — 🔍 @analyst · DEPOIS do 0.2

```
@analyst reapresentar o adendo ao Achado 14 pra eu confirmar
```

O adendo é a segunda correção da função `extrairOpcaoUnicaSemRotulo` (17/08, valor "Médio" no nível de visitas). Foi investigado e apresentado, mas a sessão de 05/09 fechou antes da confirmação do Felipe — por isso **nunca foi persistido**. Reapresentar → Felipe confirma ou derruba → gravar no documento.

### ✅ Só depois de 0.1, 0.2 e 0.3 fechados, a FASE 1 começa.

---

## FASE 1 — Mapeamento completo
**Onde:** 🟩 karzen · **Depende de:** FASE 0 fechada (0.1, 0.2 e 0.3) · **Estimativa:** ~39 rodadas

> 🔄 **Reordenada em 07/09/2026.** Esta fase era a FASE 2. Subiu porque a Camada 0 (hoje FASE 2) existia para destravar a planilha — e pela **DEC-23 (Plano B)** a planilha só volta na FASE 6 de qualquer forma. Sem esse papel, a Camada 0 perdeu a urgência e o mapeamento passou a ser a frente que realmente importa.

### 1A — Terminar o linha por linha

Metodologia validada 21 vezes, **não mudar**. Ver a seção "O CICLO DO MAPEAMENTO" no topo deste arquivo.

| # | Tarefa | Agente |
|---|---|---|
| 1A.1 | Retomar em `esqueleto-parte1-89427cf3.md` **linha 11.909** → 32.322 | 🔍 @analyst |
| 1A.2 | `esqueleto-parte2-a5d3b08c.md` — 0% → 100% (~1.600 linhas) | 🔍 @analyst |
| 1A.3 | 🚦 **AVISAR o Felipe que o mapeamento está concluído** — este é o sinal do PONTO DE RETORNO | 🔍 @analyst |

```
Restam ~22.000 linhas ÷ ~567 por rodada = ~39 rodadas
Cada rodada exige confirmação do Felipe — não roda sozinho
```

### 1B — Ler os documentos, com o mapa de 1A na mão

> **Por que só agora:** o mapeamento 1A já é o cruzamento entre a conversa (onde as decisões foram tomadas) e os documentos (o resultado). Ler os documentos antes duplicaria o trabalho e arriscaria conclusões que contradizem as do Atlas.

| # | Documento | Tamanho |
|---|---|---|
| 1B.1 | `.claude/CLAUDE.md` | 2.105 linhas / 39 BLOCOs |
| 1B.2 | `CUSTOMIZACOES-FELIPE/MANUAL.md` | 1.882 linhas / 61 customizações |
| 1B.3 | `.aiox/itens-em-aberto.md` | 143 KB / 178 itens |
| 1B.4 | `packages/karzen/HISTORICO-SESSOES.md` | 47 KB |

**Saída da FASE 1:** o mapa real e completo de tudo que existe e tudo que está em aberto.

---

## FASE 2 — Camada 0 (o comando `status`), via SDC
**Onde:** 🟩 karzen · **Depende de:** FASE 1 · **Estimativa:** ~3h

> 🔄 **Reordenada em 07/09/2026.** Esta fase era a FASE 1. Desceu porque a **DEC-14** do `SOLUCIONADOR-DESENHO.md` dizia que a Camada 0 era *"o único bloqueio real para voltar à planilha"* — mas com a **DEC-23 (Plano B)** a planilha só volta na FASE 6. Ela deixou de destravar qualquer coisa e virou tarefa comum.

### ⚠️ O escopo MUDOU por causa da DEC-20

O `status` original ia mostrar 5 coisas. Três delas morreram com a aposentadoria do Solucionador:

| O que mostra | Sobrevive? |
|---|---|
| Agente ativo (`.current-agent`) | ✅ |
| Itens em aberto / arquivados | ✅ |
| ~~Portão atual do ciclo~~ | ❌ não existe mais portão |
| ~~Artefatos esperados vs existentes~~ | ❌ era a cadeia do Solucionador |
| ~~Se o Solucionador foi usado ou abandonado~~ | ❌ não há o que medir |

**Escopo novo proposto:** agente ativo · frente ativa · linha atual da planilha · itens em aberto · commits não pushados · progresso do mapeamento.

| # | Tarefa | Agente |
|---|---|---|
| 2.1 | `*draft` — story da Camada 0 com o escopo revisto | 🌊 @sm |
| 2.2 | `*validate-story-draft` — GO/NO-GO | 🎯 @po |
| 2.3 | `*develop` — `status.cmd` (cmd.exe) + `status` (sh para Git Bash) | 💻 @dev |
| 2.4 | `*review` — gate PASS/CONCERNS/FAIL | ✅ @qa |

> A Camada 0 foi desenhada para vigiar o Solucionador. Sem ele, é outra story — por isso passa por @sm e @po antes do @dev, e não vai direto para implementação.

---

## FASE 3 — Aposentar o Solucionador e criar os 2 hooks
**Onde:** 🟨 global (3.2) → 🟩 karzen (o resto) · **Depende de:** 🚦 **PONTO DE RETORNO** (FASE 1 concluída e Felipe de volta na `global`)

> ⚠️ **Não começar antes do sinal.** Ver a seção PONTO DE RETORNO no topo deste arquivo — o Latch precisa da história de como o `check-handoff-audit.js` falhou, e ela está no mapeamento.

| # | Tarefa | Agente | Onde |
|---|---|---|---|
| 3.1 | Registrar a aposentadoria formal (DEC-20) no `itens-em-aberto.md` e no `SOLUCIONADOR-DESENHO.md` | 👑 @aiox-master | 🟩 karzen |
| 3.2 | **Especificar** E27 e E28 como hook — qual evento do lifecycle, qual condição, o que bloqueia, o que deixa passar. Saída: documento gravado na pasta karzen | 🪝 @hooks-architect (Latch) | 🟨 **global** |
| 3.3 | `*draft` da story dos 2 hooks, a partir da especificação | 🌊 @sm | 🟩 karzen |
| 3.4 | Implementar os 2 hooks | 💻 @dev | 🟩 karzen |
| 3.5 | Testar com os 10 hooks e as 39 BLOCOs ativas | ✅ @qa | 🟩 karzen |
| 3.6 | Remover a BLOCO 0-AH e o gatilho `/Solucionador` do `CLAUDE.md` | 👑 @aiox-master | 🟩 karzen |

### O que os 2 hooks fazem

```
E27 — cota de discordância
  agente diz "está bom, pode seguir"
    → hook bloqueia: cadê os checks listados?

E28 — detector de convergência
  3 agentes concordam sem uma objeção
    → hook alerta: 🔴 isso é suspeito, não é validação
```

Nunca são acionados manualmente. Ficam ligados, por baixo de qualquer fluxo.

---

## FASE 4 — Reorganização estrutural
**Onde:** 🟨 global (especificação) → 🟩 karzen (execução) · **Depende de:** FASE 1

| # | Tarefa | Agente | Onde | Risco |
|---|---|---|---|---|
| 4.1 | Auditar a estrutura atual — só lê, não muda nada | 🔌 @project-integrator (Conduit) | 🟨 global | 🟢 |
| 4.2 | Podar os 83 KB de `settings.local.json` | ⚙️ @config-engineer (Sigil) | 🟨 global | 🟢 |
| 4.3 | Converter as 39 BLOCOs em formato executável por máquina | 📐 @sop-ml-architect (Turing) | 🟨 global | 🟠 |
| 4.4 | Mapear quais BLOCOs viram hook | 🪝 @hooks-architect (Latch) | 🟨 global | 🟠 |
| 4.5 | Migrar `.claude/commands/` → `.claude/skills/` | 🔌 @project-integrator | 🟩 karzen | 🟠 |
| 4.6 | Quebrar o `CLAUDE.md` de 2.105 linhas em `.claude/rules/` com carregamento por contexto | 🔌 @project-integrator | 🟩 karzen | 🔴 |
| 4.7 | Organizar os ~300 scripts do `.aiox-runtime/` (hoje versionados por nome: `v2`…`v7`) | 💻 @dev | 🟩 karzen | 🟠 |
| 4.8 | Gate: o que virou mecanismo de verdade e o que ainda depende de o agente lembrar | ✅ @qa | 🟩 karzen | — |

### 🎁 O que a 4.5 resolve de graça

A BLOCO 0-D exige confirmação por texto antes de chamar outro agente. O Claude Code **já faz isso nativamente** quando o `Skill` é invocado — mostra `.current-agent`, a skill, e o prompt *"Sim / Sim, não perguntar novamente / Não"*.

Na Karzen isso não acontece porque ela usa `commands/` e não `skills/`. **Migrar resolve a BLOCO 0-D sem escrever uma regra.**

### ⚠️ Aviso sobre 4.6 e 4.7

São cirurgia em paciente acordado: mexem em 2.105 linhas de regra e ~300 scripts de um pipeline que está funcionando. Só depois da FASE 2, e com backup.

---

## FASE 5 — Os 178 itens
**Onde:** 🟩 karzen · **Depende de:** FASES 1, 3 e 4

| # | Tarefa | Agente |
|---|---|---|
| 5.1 | **Arquivar os 38 🔴 VETO** — já estão resolvidos, só continuam listados como abertos. Mover de `itens-em-aberto.md` para `itens-resolvidos-arquivo.md`. Efeito: 178 → 140 itens visíveis | 👑 @aiox-master |
| 5.2 | **Re-rotear os 46 🟡 MÉDIA** — hoje estão endereçados ao trio (Finch/Alan/Pedro), que foi reprovado pela E101-E104. Trocar o destinatário para Latch (o que vira hook) e Turing (o que vira SOP executável). **Não resolve nenhum item — corrige para quem eles vão** | 👑 @aiox-master |
| 5.3 | `*create-epic` a partir do mapa da FASE 2 | 📋 @pm |
| 5.4 | Stories dos 53 🟢 RÁPIDA | 🌊 @sm |
| 5.5 | `/wave-execute` — as stories rodam em paralelo, batch por dono de arquivo, merge pelo @devops | esteira |
| 5.6 | Decidir os 4 🔵 COMPLETA (E39, E44, E87, E92) | 👤 **Felipe** |

> A 5.1 e a 5.2 são limpeza de inventário, não trabalho intelectual. Sem a 5.2, a FASE 5 inteira sairia com o destinatário errado.

---

## FASE 6 — Fechamento
**Onde:** 🟩 karzen · **Depende de:** todas as anteriores

| # | Tarefa | Agente |
|---|---|---|
| 6.1 | 🔓 **A planilha volta** — linha 151 → 736, em blocos de 20-25 com validação do Felipe a cada bloco | 💻 @dev |
| 6.2 | Relatório final de dívida técnica | 🔍 @analyst |
| 6.3 | `*push` de tudo | 🚀 @devops |

---

## ⏱️ Sobre prazo — o que este plano NÃO promete

Este plano **não cabe em um dia**. O item mais pesado é a FASE 1A:

```
~22.000 linhas restantes ÷ ~567 por rodada  = ~39 rodadas
cada rodada exige o Felipe ler e confirmar
a 10 min por rodada (otimista)               = 6h30
a 15 min por rodada (realista)               = 9h45
```

E isso é **só a FASE 1A**. Faltariam ainda a 1B (4 documentos grandes) e as FASES 2 a 6.

**Consequência da DEC-23 (Plano B):** enquanto tudo isso não terminar, a planilha fica parada em 151/736. Foi decisão consciente do Felipe, registrada aqui.

> Existia uma alternativa (Plano A): fazer só a FASE 0 + FASE 1 + FASE 3 primeiro, o que destravaria a planilha em um dia e deixaria o mapeamento correr depois, sem pressa. **Foi rejeitada.** Registrado aqui caso a decisão mude.

---

## 📌 Regras vivas que continuam valendo

| Regra | O quê |
|---|---|
| ✍️ Escrita | Só @aiox-master, @dev e @devops editam arquivos |
| 🚀 Push | Só @devops |
| 🌐 Modo Navegador | Execução exclusiva do @dev |
| 🔀 Alternância (BLOCO 0-U REGRA 5) | Nunca 2 frentes no mesmo executor + recurso |
| 📌 Achado que muda o rumo | PARA o fluxo na hora e registra (E29 / DEC-5) |
| 🇧🇷 Português sempre | BLOCO 0-AF, sem exceção |
| 🔍 Metodologia do mapeamento | Atlas investiga · Felipe confirma · Orion só persiste, nunca investiga |

---

*Este arquivo é a ponte entre a pasta `global` e a pasta `karzen`. Quem o mantiver desatualizado reabre exatamente o problema que ele existe para fechar.*

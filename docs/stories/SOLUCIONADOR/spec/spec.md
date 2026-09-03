# Spec: Solucionador

> **Story ID:** SOLUCIONADOR
> **Complexity:** COMPLEX
> **Generated:** 2026-09-03
> **Status:** Draft (v2 — revisado após critique.json, NEEDS_REVISION)

---

## 1. Overview

Reconhecer um problema (de qualquer tipo) e seguir uma sequência fixa de portões, cada um com um agente especializado, até chegar numa solução validada — sem repetir os erros já vividos nesta sessão (estouro de token no E87, escopo grande demais no E61, agente fantasma no incidente de 19/08/2026).

### 1.1 Goals

- Reconhecer um problema e seguir uma sequência fixa de portões até solução validada (FR-1)
- Ter um gatilho de frase (`/Solucionador`) que ative a sequência sem redecidir manualmente o próximo agente (FR-2)
- Manter cada portão como troca de persona visível na mesma conversa (FR-3)
- Reaproveitar mecanismos que já existem no framework em vez de reinventar (FR-4)

### 1.2 Non-Goals

- Sub-agente real rodando em paralelo, fingindo ser outro agente (CON técnico ligado a FR-3, DEC-9)
- Competir por @dev/Chrome com a validação da Planilha Karzen ao mesmo tempo (CON-2)
- Leitura exaustiva do framework sem teto (já rejeitado — DEC-18)

---

## 2. Requirements Summary

### 2.1 Functional Requirements

| ID | Description | Priority | Source |
|---|---|---|---|
| FR-1 | Reconhecer um problema (de qualquer tipo) e seguir uma sequência fixa de portões até uma solução validada | P0 | requirements.json |
| FR-2 | Ter um gatilho de frase (`/Solucionador`) que ative a sequência fixa sem precisar redecidir manualmente qual agente chamar a cada passo | P0 | requirements.json |
| FR-3 | Cada portão continua sendo troca de persona visível na mesma conversa — nunca sub-agente real | P0 | requirements.json |
| FR-4 | Reaproveitar mecanismos que já existem no framework em vez de reinventar | P1 | requirements.json |

### 2.2 Non-Functional Requirements

| ID | Category | Requirement | Metric |
|---|---|---|---|
| NFR-1 | reliability | Não pode repetir o estouro de token do E87 | Teto de 3 lotes, `.aiox/leitura/teto-leitura.yaml` |
| NFR-2 | usability | Cada resposta de agente vem organizada (tabela/emoji/semáforo) | Conformidade BLOCO 0-AE |

### 2.3 Constraints

| ID | Type | Constraint | Impact |
|---|---|---|---|
| CON-1 | technical | Escopo grande (10 agentes, 12+ portões) já bateu o veto do SC_SCP_001 | Bloqueia implementação direta; exige Spec Pipeline completo |
| CON-2 | business | Não pode competir por @dev/Chrome com a Planilha Karzen | BLOCO 0-U REGRA 5 |

---

## 3. Technical Approach

### 3.1 Architecture Overview

Gatilho `/Solucionador` (FR-2) detectado → sequência fixa de portões inicia → cada portão é uma troca de persona visível na mesma conversa (FR-3), exatamente como já validado nesta própria sessão (Orion → Atlas → Finch → Pedro → Morgan → Aria) → reaproveita 3 mecanismos confirmados pela pesquisa (Tier 0, 5-Layer QG Taxonomy, Executor Patterns) → usa um Template de Handoff que precisa ser criado (E107, research.json).

*Derivado de FR-1, FR-2, FR-3, FR-4 e research.json.*

**Nota (NFR-2, adicionada na revisão CRIT-2):** cada portão, ao responder, segue BLOCO 0-AE (tabela + emoji + semáforo) — não é escolha estética, é requisito verificável a cada resposta.

### 3.2 Component Design

| Entidade | Atributos | Relacionamento |
|---|---|---|
| Portão | agente_responsável, critério_de_entrada, critério_de_saída | pertence a 1 Sequência |
| Achado | numero_E, descrição, gravidade, arquivo_fonte | tem 1 Decisão |
| Decisão | numero_DEC, opção_escolhida, motivo, quem_decidiu | tem muitos Achados |
| LoteDeLeitura | linhas_lidas, achados_novos, rendimento_pct | pertence a 1 Frente de leitura |

*Derivado de requirements.json → domainModel.*

### 3.3 Data Flow

Usuário digita `/Solucionador` → sequência fixa inicia → cada portão troca persona visível → usuário pode interromper a qualquer momento → se portão travar (ex: veto), mostra motivo e para, não avança escondido → se chamado sem problema definido, pergunta qual é o problema antes de continuar.

*Derivado de requirements.json → interactions (INT-1).*

---

## 4. Dependencies

### 4.1 External Dependencies

Nenhuma — confirmado em research.json (zero API externa, NFR/CON não exigem biblioteca de terceiros).

### 4.2 Internal Dependencies

| Module | Purpose | Verified |
|---|---|---|
| Tier 0 (Foundation & Diagnosis) | Portão inicial de diagnóstico | ✅ — mas só existe em `squad-creator/`, não em `squad-creator-pro/` (⚠️ E108) |
| 5-Layer QG Taxonomy | Classificação de qualidade dos portões | ✅ `squad-creator-pro/data/hybridops-patterns.md:774` |
| Executor Patterns (Human/Agent/Hybrid/Worker) | Triagem de tipo de execução por portão | ✅ `squad-creator-pro/data/hybridops-patterns.md:1328` |
| Template de Handoff (`handoff-insumos-tmpl.yaml`) | Formato de passagem de insumos entre portões | ❌ Não existe como arquivo — precisa ser criado (E107) |

---

## 5. Files to Modify/Create

### 5.1 New Files

| File Path | Purpose | Template |
|---|---|---|
| `squads/squad-creator/templates/handoff-insumos-tmpl.yaml` | Criar o Template de Handoff que a documentação já descreve mas não existe (E107) | Baseado na descrição em `hybridops-patterns.md:1276-1310` |

### 5.2 Modified Files

| File Path | Changes | Risk |
|---|---|---|
| `.claude/CLAUDE.md` | Nova BLOCO pro gatilho `/Solucionador` (FR-2), mesmo padrão do "Modo Navegador" e "momento de pausa" | **Alto** — regra vale pra todos os agentes do projeto |
| `.aiox/SOLUCIONADOR-DESENHO.md` | Fechar a seção de ativação, ainda em aberto desde o E105 | Médio |
| `.aiox-core/data/workflow-chains.yaml` | Registrar a sequência fixa de portões do Solucionador | Médio |

*Derivado de complexity.json → dimensions.scope (score 4/5, cross-cutting).*

---

## 6. Testing Strategy

### 6.1 Acceptance Tests (Given-When-Then)

```gherkin
Feature: Solucionador

  Scenario: Reconhecimento e resolução completa (FR-1)
    Given um problema qualquer é apresentado ao usuário
    When o Solucionador é ativado
    Then a sequência fixa de portões é seguida do início ao fim
    And o resultado final é uma solução validada, não apenas um diagnóstico parcial

  Scenario: Ativação via gatilho de frase (FR-2)
    Given o usuário tem um problema pra resolver
    When digita "/Solucionador"
    Then a sequência fixa de portões começa, sem precisar escolher agente manualmente

  Scenario: Troca de persona sempre visível (FR-3)
    Given um portão está ativo na sequência
    When o Solucionador avança pro próximo portão
    Then a troca aparece visível na mesma conversa, com saudação nova
    And nunca em processo escondido ou sub-agente real

  Scenario: Portão trava por veto
    Given um portão identifica uma condição de veto
    When a condição é atingida
    Then o Solucionador mostra o motivo e para
    And não avança escondido pro próximo portão

  Scenario: Reaproveitamento de mecanismo confirmado (FR-4)
    Given o portão de triagem precisa classificar o tipo de execução
    When consulta os Executor Patterns já confirmados (research.json)
    Then usa Human/Agent/Hybrid/Worker sem reinventar a classificação

  Scenario: Formatação obrigatória (NFR-2)
    Given qualquer portão responde dentro do Solucionador
    When a resposta contém decisão, achado ou comparação
    Then vem organizada em tabela, com emoji e semáforo (BLOCO 0-AE)
```

---

## 7. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Template de Handoff não existe (E107) | Alta (confirmado) | Médio | Criar o arquivo antes de codificar FR-4 |
| Tier System ausente no squad-creator-pro (E108) | Alta (confirmado) | Baixo | Decidir qual versão usar antes da Fase 6 (Plan) |
| Escopo cross-cutting no `CLAUDE.md` (complexity.json score 4/5) | Média | Alto | Considerar quebrar em stories menores — já sinalizado pela avaliação de complexidade |
| Regra grande demais reabrir os 3 sintomas já vistos (cobertura incompleta, priorização ruim, contexto perdido) | Média | Alto | É exatamente o que o pipeline COMPLEX (2 rodadas de crítica) existe para prevenir |

---

## 8. Open Questions

| ID | Question | Blocking | Assigned To |
|---|---|---|---|
| E108 | Usa o Tier System do `squad-creator` antigo, ou o conceito nunca foi portado pro `squad-creator-pro`? | Não | @architect (decidir antes da Fase 6) |
| OQ-3 | Quebrar o Solucionador em stories menores (ex: gatilho separado do reaproveitamento do E64) antes de planejar? | **Sim, pra Fase 6** | @architect (CRIT-3, critique.json) |

---

## 9. Implementation Checklist

- [ ] Criar `squads/squad-creator/templates/handoff-insumos-tmpl.yaml` (E107)
- [ ] Decidir a questão do Tier System (E108) antes de prosseguir
- [ ] Escrever a nova BLOCO do gatilho `/Solucionador` no `CLAUDE.md`
- [ ] Fechar a seção de ativação do `SOLUCIONADOR-DESENHO.md`
- [ ] Registrar a sequência fixa em `workflow-chains.yaml`
- [ ] Escrever os 4 testes de aceite (seção 6.1)
- [ ] Considerar quebrar em stories menores antes da Fase 6 (Plan), per aviso do complexity.json

---

## Metadata

- **Generated by:** @pm via spec-write-spec
- **Inputs:** requirements.json, complexity.json, research.json, critique.json (v1)
- **Iteration:** 2 — revisado após critique.json (NEEDS_REVISION): CRIT-1 e CRIT-2 resolvidos, CRIT-3 formalizado como OQ-3

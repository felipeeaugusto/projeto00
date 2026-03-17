# Squad Dr. Julia Resende

Automated content generation for Instagram + Facebook — parentalidade/psicologia infantil.

## Purpose

Gerar posts, carrosséis e stories automaticamente para a persona @drjuliaresende, com approval gate obrigatório antes de qualquer publicação. Objetivo: vender ebook "O Poder da Rotina" (R$27) e atingir R$50k+/mês.

## Agents

| Agent | Tier | Function |
|-------|------|----------|
| `julia-chief` | Orchestrator | Ciclo semanal, contadores, dispatch |
| `copy-agent` | Tier 1 | Copy seguindo Voice DNA da Dra. Julia |
| `image-agent` | Tier 1 | Prompts DALL-E por camada |
| `approval-agent` | Tier 0 | Human approval gate |
| `ebook-agent` | Tier 2 | Reescrita mínima do ebook |

## Workflows

| Workflow | Phases | Frequency |
|----------|--------|-----------|
| `wf-weekly-cycle` | 4 | Semanal (7 peças/semana) |
| `wf-ebook-rewrite` | 3 | Uma vez (antes do primeiro ciclo) |

## Key Files

- **Design System:** `C:\Users\felip\Documents\DR-JULIA-RESENDE-DS.yaml`
- **Handoff:** `C:\Users\felip\Documents\HANDOFF-DR-JULIA-RESENDE-v5.md`
- **Ebook:** `C:\Users\felip\Documents\ebook em texto.txt`

## Voice DNA Sources

Tom de voz enriquecido com Voice DNA de 3 especialistas reais:
- **Vera Iaconelli** — vocabulário de desenvolvimento infantil
- **Ana Luiza Pinheiro** — formato Instagram-native para parentalidade
- **Luciane Najar** — fórmula de validação emocional

## Monthly Output

- 16 feed posts (4 educativo + 4 emocional + 4 prova social + 4 CTA)
- 12 stories (8 frase impacto + 4 sticker interativo)
- **Total: 28 peças/mês**

## Approval Gate

**OBRIGATÓRIO.** Nenhum conteúdo é finalizado sem aprovação explícita do usuário.
Opções: APROVAR | REJEITAR | REVISAR

## Quick Start

1. Executar `wf-ebook-rewrite` (uma vez)
2. Ativar `julia-chief` para iniciar ciclo semanal
3. Cada peça passa por: planning → copy → image → approval

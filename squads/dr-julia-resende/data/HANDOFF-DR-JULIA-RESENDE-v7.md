# HANDOFF — Dra. Julia Resende — v7
**Data:** 2026-03-15
**Agente:** Atlas (analyst)
**Sessão:** Continuação do v6

---

## O que foi feito nessa sessão

### 1. DS.yaml atualizado → v2.0
- **Arquivo:** `C:\Users\felip\Documents\DR-JULIA-RESENDE-DS.yaml`
- Adicionado: `python_compositor` (sistema compositor para fidelidade de cor)
- Adicionado: `formats_extended` — 10 novos formatos (formato_06 ao formato_15)
- Adicionado: `formats_map` — mapa completo dos 15 formatos
- Adicionado: `facebook_profile` e `facebook_cover` — specs dos assets

### 2. Logo Facebook — APROVADO
- **Arquivo:** `C:\Users\felip\Pictures\Camera Roll\logo-facebook-drjuliaresende.png`
- Spec: 800×800px, fundo #03bb85, hug mark branca (68% do canvas)
- Gerado via Node.js canvas com bounding-box automático
- Status: **APROVADO e pronto para upload**

### 3. Capa Facebook — APROVADA
- **Arquivo:** `C:\Users\felip\Pictures\Camera Roll\capa-facebook-drjuliaresende.png`
- Spec: 1702×630px (2x para qualidade), verde + ebook diagonal + tagline + @drjuliaresende
- Ebook posicionado em W×0.80 (ponto de equilíbrio aprovado)
- Status: **APROVADO e pronta para upload**

---

## O que ficou pendente (em ordem de execução)

### Pendência 1 — Link Eduzz (João Paulo)
Pegar com o patrão o link de pagamento do ebook na Eduzz. Sem esse link, o botão CTA da LP fica como `href="#"` (funciona, mas não vende).

### Pendência 2 — Landing Page PRD (@pm)
Acionar `@pm (Morgan)` para criar o PRD completo da Landing Page.

**Sites de referência já analisados:**
- `aiox.academialendaria.ai/advanced` — estrutura piramidal, depoimentos com fotos, timeline visual
- `cdrgroup.com.br` — números animados, metodologia 3 passos, FAQ antes do CTA

**Decisões sobre a LP:**
- Stack: HTML + CSS + JS puro (sem frameworks complexos)
- Animações: GSAP + ScrollTrigger (ativadas por scroll, NÃO ao entrar na página)
- Visual: fundo claro/branco + verde (NÃO dark mode — mais acolhedor para mães)
- Deploy: Vercel

### Pendência 3 — Stories da LP (@sm)
Após PRD aprovado, criar stories seguindo o wave plan:

| Wave | Stories | Paralelo? |
|------|---------|-----------|
| Wave 1 | 1.1 HTML + 1.2 CSS | Sim (ao mesmo tempo) |
| Wave 2 | 1.3 JavaScript + GSAP | Não (aguarda Wave 1) |
| Wave 3 | 1.4 Eduzz + Deploy | Não (aguarda Wave 2) |

### Pendência 4 — Desenvolvimento (@dev)
Executar stories por wave com `wave-parallel-develop.md`.

### Pendência 5 (baixa prioridade) — Sistema Compositor Python
Criar script Python para geração de imagens com fidelidade de cor.
Especificações no DS.yaml → `python_compositor`.
Usar `squad-creator-pro` quando precisar do agente compositor.

---

## Como retomar amanhã

1. Abrir Claude Code no projeto `C:\Users\felip\projeto00`
2. Acionar: `/AIOX:agents:pm`
3. Solicitar: `*create-doc` para o PRD da Landing Page ebook "O Poder da Rotina"
4. Informar ao @pm sobre os sites de referência e as decisões já tomadas

---

## Assets e arquivos de referência

| Arquivo | Localização |
|---------|------------|
| Logo master (hug mark) | `C:\Users\felip\Pictures\Camera Roll\01.png` |
| Ebook mockup 3D | `C:\Users\felip\Pictures\Camera Roll\05.png` |
| Logo Facebook (pronto) | `C:\Users\felip\Pictures\Camera Roll\logo-facebook-drjuliaresende.png` |
| Capa Facebook (pronta) | `C:\Users\felip\Pictures\Camera Roll\capa-facebook-drjuliaresende.png` |
| DS.yaml v2.0 | `C:\Users\felip\Documents\DR-JULIA-RESENDE-DS.yaml` |
| Handoff v6 | `C:\Users\felip\Documents\HANDOFF-DR-JULIA-RESENDE-v6.md` |
| Handoff AIOX | `C:\Users\felip\projeto00\.aiox\handoffs\handoff-analyst-2026-03-15.yaml` |

---

## Contexto geral do projeto

- **Persona IA:** Dra. Julia Resende — psicologia infantil + parentalidade
- **Produto:** Ebook "O Poder da Rotina" — R$27
- **Plataforma de venda:** Eduzz (link pendente com o patrão)
- **Canal principal:** Instagram + Facebook (@drjuliaresende)
- **Cor principal:** #03bb85 (verde)
- **Fonte:** Poppins
- **Squad IA existente:** julia-chief (criado via squad-creator-premium)
- **Estado Facebook:** Logo + Capa aprovados, prontos para upload

---

*Handoff gerado por Atlas (analyst) — 2026-03-15*
*Próximo handoff será v8 após conclusão da Landing Page*

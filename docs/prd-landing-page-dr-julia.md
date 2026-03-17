# Landing Page "O Poder da Rotina" — Product Requirements Document (PRD)

> **Projeto:** dr-julia-resende
> **Produto:** Ebook "O Poder da Rotina" — Landing Page de conversão
> **Cliente:** João Paulo R. Costa
> **Persona IA:** Dra. Julia Resende

---

## Change Log

| Date | Version | Description | Author |
|---|---|---|---|
| 2026-03-15 | 1.0 | Criação inicial | Morgan (@pm) |

---

## 1. Goals

- Criar uma Landing Page de alta conversão para o ebook **"O Poder da Rotina"**
- Vender o ebook a R$27 (Super Combo) via plataforma Eduzz usando estratégia de precificação decoy
- Comunicar valor para o público de **mães** interessadas em psicologia infantil e parentalidade
- Gerar conversão com animações suaves ativadas por scroll (ScrollTrigger)
- Publicar via Vercel com deploy rápido e performance otimizada

## 2. Background Context

A Dra. Julia Resende é uma persona de IA criada para o cliente João Paulo R. Costa, especializada em psicologia infantil e parentalidade. O produto é um ebook de entrada chamado "O Poder da Rotina", vendido via Eduzz em dois formatos: ebook simples (R$10) e Super Combo (R$27 com 9 bônus).

A Landing Page é o principal canal de conversão — ela precisa comunicar autoridade, acolhimento e clareza de valor para mães que buscam orientação sobre rotina infantil. A estratégia de precificação usa o e-book de R$10 como "decoy" para tornar o Combo de R$27 irresistível (+R$17 por 9 bônus extras).

---

## 3. Requirements

### Functional Requirements

**Estrutura e Conteúdo:**
- **FR1:** A LP deve exibir uma headline principal de alto impacto voltada para o público de mães com dores relacionadas a rotina infantil.
- **FR2:** A LP deve apresentar uma seção "antes/depois" evidenciando a transformação que o produto entrega.
- **FR3:** A LP deve listar os benefícios do método com foco em resultado prático e rápido (ex: "7 minutos por dia").
- **FR4:** A LP deve exibir seção de depoimentos com no mínimo 3 provas sociais com foto.
- **FR5:** A LP deve exibir seção de FAQ com no mínimo 4 perguntas frequentes (formato digital, acesso, pagamento, garantia).

**Precificação (Decoy Strategy):**
- **FR6:** A LP deve exibir dois produtos lado a lado: E-book simples (R$149,90 → R$10) e Super Combo (R$297,90 → R$27), com o Combo destacado visualmente como "Mais Escolhido".
- **FR7:** O Super Combo deve listar os 9 bônus incluídos de forma clara e visível.
- **FR8:** Ambos os CTAs devem usar as constantes centralizadas do `config.js`.

**Conversão:**
- **FR9:** A LP deve ter um countdown timer de urgência visível acima do CTA principal.
- **FR10:** A LP deve exibir um selo de garantia de 14 dias com texto de reforço ("experimente sem risco").
- **FR11:** A LP deve ter múltiplos CTAs distribuídos ao longo da página (mínimo 3 pontos).
- **FR12:** A LP deve exibir opção de parcelamento (ex: "ou 5x no cartão").
- **FR13:** A LP deve ter botão/link de contato via WhatsApp para dúvidas.

**Animações:**
- **FR14:** Elementos da LP devem ter animações de entrada ativadas por scroll via ScrollTrigger (não automáticas ao carregar a página).
- **FR15:** Números/estatísticas devem ter animação de contagem ao entrar na viewport.

**Configuração:**
- **FR16:** Deve existir `js/config.js` com as constantes centralizadas:
  - `EDUZZ_URL_EBOOK = 'https://chk.eduzz.com/69KAGXG70O'`
  - `EDUZZ_URL_COMBO = 'https://chk.eduzz.com/7WXQD3GG9A'`
  - `WHATSAPP_NUMBER = '5537999996699'`

### Non-Functional Requirements

- **NFR1:** A LP deve carregar em menos de 3 segundos em conexão 4G (PageSpeed mobile >= 85).
- **NFR2:** A LP deve ser totalmente responsiva para mobile (breakpoints: 375px, 768px, 1280px).
- **NFR3:** O código deve ser HTML + CSS + JS puro, sem frameworks complexos.
- **NFR4:** A LP deve ser deployada via Vercel (drag-and-drop ou CLI).
- **NFR5:** A LP deve usar a paleta de cores da marca: verde #03bb85, fundo branco/verde claro, fonte Poppins.
- **NFR6:** A LP não deve usar dark mode — design deve transmitir acolhimento e leveza.
- **NFR7:** O link Eduzz deve ser centralizado no `config.js` para facilitar substituição.

---

## 4. User Interface Design Goals

### Overall UX Vision
LP acolhedora, limpa e focada em conversão para mães sobrecarregadas. Design transmite **autoridade + empatia** — a Dra. Julia é especialista de confiança, não vendedora agressiva.

### Key Interaction Paradigms
- Scroll-driven storytelling — narrativa se revela conforme a mãe desce a página
- Urgência não invasiva — countdown e preços com desconto, sem pop-ups agressivos
- CTA progressivo — após problema/solução, após prova social, após garantia
- Contato humanizado — botão WhatsApp flutuante

### Core Screens and Views
1. **Hero Section** — Headline + subheadline + CTA primário + Foto Dra. Julia (esq) + Mockup ebook 3D (dir)
2. **Seção Dor** — Lista de problemas que a mãe enfrenta
3. **Seção Solução** — O método e seus benefícios principais
4. **Seção Produtos** — Cards lado a lado: E-book R$10 vs Super Combo R$27 (destaque)
5. **Seção Bônus** — Grid dos 9 bônus com ícones e descrições
6. **Seção Autoridade** — Bio da Dra. Julia + credenciais
7. **Seção Depoimentos** — 3 cards com foto, nome e relato
8. **Seção Garantia** — Selo 14 dias + texto de reforço
9. **Seção FAQ** — Accordion com 4+ perguntas
10. **CTA Final** — Repetição dos cards de produto + countdown timer

### Accessibility
WCAG AA — contraste mínimo 4.5:1. Fonte mínima 16px no corpo.

### Branding
- **Cor primária:** #03bb85 (verde)
- **Fundo:** Branco (#FFFFFF) e verde muito claro (#f0fdf9)
- **Fonte:** Poppins (Bold títulos, SemiBold destaques, Regular corpo)
- **Assets:** `assets/images/dr-julia-oficial.jpeg`, `assets/images/05.png` (ebook mockup)

### Target Device
Web Responsiva — prioridade **mobile-first** (público mães usa celular como dispositivo principal).

---

## 5. Technical Assumptions

### Repository Structure
Monorepo simples:
```
landing-page-dr-julia/
├── index.html
├── js/
│   ├── config.js      ← constantes Eduzz + WhatsApp
│   └── main.js
├── css/
│   └── style.css
└── assets/
    ├── fonts/         ← Poppins (Bold, SemiBold, Regular)
    ├── images/        ← dr-julia-oficial.jpeg, 05.png
    └── content/       ← copy-lp.md, biografia-dr-julia.txt
```

### Service Architecture
Estático puro — HTML + CSS + JS servido pela Vercel via CDN global. Sem backend.

### Testing Requirements
Manual + Visual — checklist em 375px, 768px e 1280px. PageSpeed Insights antes do launch.

### Additional Technical Assumptions
- GSAP carregado via CDN (sem npm, sem build step)
- Poppins via `@font-face` local (sem Google Fonts)
- Deploy: Vercel drag-and-drop ou CLI
- Sem analytics no MVP

---

## 6. Epic List

### Epic 1: Landing Page "O Poder da Rotina" — Build & Deploy

**Goal:** Construir e publicar uma Landing Page de alta conversão para o ebook "O Poder da Rotina", com design fiel ao DS.yaml v2.0, estratégia de precificação decoy (R$10 / R$27), animações scroll-driven via GSAP e deploy na Vercel.

---

## 7. Epic 1 — Stories

### Story 1.0 — Conteúdo & Copy da Landing Page *(Wave 0)*

> Como @dev,
> eu quero ter todos os textos, depoimentos e assets de conteúdo organizados e aprovados,
> para que eu possa construir o HTML da LP sem placeholders críticos.

**Acceptance Criteria:**
1. Arquivo `assets/content/copy-lp.md` criado com todos os textos organizados por seção
2. Headline principal definida (adaptada da LP de referência para a voz da Dra. Julia)
3. Bio da Dra. Julia confirmada em `assets/content/biografia-dr-julia.txt` ✅
4. 3 depoimentos fictícios aprovados:
   - **Camila R.** (mãe do Miguel, 4 anos — SP): foco em birra e sono
   - **Fernanda L.** (mãe da Isadora, 6 anos — BH): foco em rotina e culpa materna
   - **Patrícia M.** (mãe do Lucas, 8 anos — Curitiba): foco em TDAH
5. Textos dos 9 bônus revisados e aprovados
6. Textos do FAQ revisados (mínimo 4 perguntas)
7. João Paulo revisa e aprova o `copy-lp.md` antes da Story 1.1 iniciar

---

### Story 1.1 — Estrutura HTML + Todas as Seções *(Wave 1 — paralelo com 1.2)*

> Como visitante da LP,
> eu quero ver todas as seções da página organizadas e com conteúdo real,
> para que eu possa entender o produto e tomar decisão de compra.

**Acceptance Criteria:**
1. `index.html` criado com estrutura semântica (header, main, footer, sections com IDs)
2. Seções na ordem: Hero, Dor, Solução, Produtos, Bônus, Autoridade, Depoimentos, Garantia, FAQ, CTA Final
3. Hero exibe `assets/images/dr-julia-oficial.jpeg` à esquerda e `assets/images/05.png` à direita
4. Seção Produtos: card E-book (R$149,90 → R$10) e card Super Combo (R$297,90 → R$27) com badge "Mais Escolhido"
5. Seção Bônus lista os 9 bônus com ícone e descrição
6. Seção FAQ com mínimo 4 perguntas em estrutura accordion (HTML/CSS, sem JS ainda)
7. `js/config.js` criado com `EDUZZ_URL_EBOOK`, `EDUZZ_URL_COMBO` e `WHATSAPP_NUMBER`
8. Todos os CTAs usam as constantes do `config.js`
9. Página abre sem erros no browser

---

### Story 1.2 — CSS + Design System + Responsividade *(Wave 1 — paralelo com 1.1)*

> Como visitante da LP,
> eu quero que a página tenha visual acolhedor, profissional e responsivo,
> para que eu tenha uma boa experiência tanto no celular quanto no desktop.

**Acceptance Criteria:**
1. `css/style.css` com CSS variables: `--verde: #03bb85`, fontes e espaçamentos
2. Poppins via `@font-face` local (`assets/fonts/Poppins-*.ttf`)
3. Layout mobile-first com breakpoints: 375px, 768px, 1280px
4. Hero: foto + mockup lado a lado (desktop) / empilhados (mobile)
5. Cards de produto: Combo 2x maior, borda verde, badge destacado
6. Seção Bônus: grid 3 colunas (desktop) / 2 colunas (tablet) / 1 coluna (mobile)
7. Countdown timer posicionado acima do CTA principal com destaque visual
8. Selo de garantia com borda arredondada e ícone de escudo
9. PageSpeed Insights mobile >= 85
10. Nenhum layout quebrado em 375px, 768px e 1280px

---

### Story 1.3 — JavaScript + GSAP Animations + ScrollTrigger *(Wave 2)*

> Como visitante da LP,
> eu quero que elementos se animem suavemente conforme eu rolo a página,
> para que a experiência seja envolvente e moderna.

**Acceptance Criteria:**
1. GSAP e ScrollTrigger carregados via CDN no `index.html`
2. Todas as seções têm animação de entrada (fade + slide) ativada por scroll — não automática
3. Números/estatísticas animam contagem ao entrar na viewport
4. Countdown timer funcional com sessionStorage para persistir por sessão
5. FAQ accordion funcional via JS com animação suave
6. Botão WhatsApp flutuante aparece após 3s de scroll, usa `WHATSAPP_NUMBER` do `config.js`
7. Animações desabilitadas em `prefers-reduced-motion: reduce`
8. Zero erros no console do browser em mobile e desktop

---

### Story 1.4 — Integração Eduzz + Deploy Vercel *(Wave 3)*

> Como João Paulo,
> eu quero que a LP esteja publicada na internet com os links de compra funcionando,
> para que eu possa divulgar e começar a vender o ebook.

**Acceptance Criteria:**
1. Todos os CTAs verificados: `EDUZZ_URL_EBOOK` e `EDUZZ_URL_COMBO` corretos
2. Teste manual dos links de compra em mobile e desktop
3. Link do WhatsApp testado e abrindo conversa corretamente
4. Deploy realizado na Vercel (drag-and-drop ou CLI)
5. URL pública da Vercel funcionando e acessível
6. Teste final de responsividade na URL pública (não localhost)
7. PageSpeed na URL pública: mobile >= 85, desktop >= 95
8. Checklist de launch completo: CTAs, WhatsApp, countdown, imagens, fontes, depoimentos e bio preenchidos

---

## 8. Checklist Results Report

| Categoria | Status | Observações |
|---|---|---|
| 1. Problem Definition & Context | PASS | Problema claro, público definido, métricas implícitas |
| 2. MVP Scope Definition | PASS | 5 stories delimitadas, out-of-scope documentado |
| 3. User Experience Requirements | PASS | Jornada mapeada, mobile-first, WCAG AA |
| 4. Functional Requirements | PASS | 16 FRs testáveis |
| 5. Non-Functional Requirements | PASS | Performance, stack e deploy definidos |
| 6. Epic & Story Structure | PASS | 1 épico, 5 stories, wave plan, ACs testáveis |
| 7. Technical Guidance | PASS | Stack fechada, config.js centralizado |
| 8. Cross-Functional Requirements | PARTIAL | Sem analytics no MVP — aceito |
| 9. Clarity & Communication | PASS | Terminologia consistente |

**Completude: 93% | MVP Scope: Just Right | Status: READY FOR @sm**

---

## 9. Next Steps

### @sm Prompt
Acione `@sm` (River) para criar as 4 stories de desenvolvimento a partir deste PRD.
Comando: `/AIOX:agents:sm` com instrução `*create-story` para cada story do Epic 1 (Stories 1.0 a 1.4), respeitando o wave plan definido.

### @ux-design-expert Prompt
Opcional antes do desenvolvimento: acionar `@ux-design-expert` (Uma) para validar o layout das seções e a hierarquia visual dos cards de produto.

---

*PRD gerado por Morgan (@pm) — Synkra AIOX v2.0 — 2026-03-15*

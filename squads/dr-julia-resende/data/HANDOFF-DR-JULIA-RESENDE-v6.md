# HANDOFF v6 — Projeto Dr. Julia Resende
**Data:** 13/03/2026 — sessão noite (antes de dormir)
**De:** Atlas (@analyst) + squad-chief + aaron-draplin
**Para:** Próxima sessão (amanhã)
**Supersede:** HANDOFF-DR-JULIA-RESENDE-v5.md — este documento é o DEFINITIVO

---

## RESUMO EXECUTIVO — LEIA PRIMEIRO (3 minutos)

```
PRODUTO:    E-book "O Poder da Rotina" — R$27
PERSONA:    Dra. Julia Resende (@drjuliaresende) — personagem IA
PATRÃO:     João Paulo R. Costa
FERRAMENTA: ChatGPT (imagens) — ÚNICA ferramenta, nunca misturar
META:       R$50k+/mês via Instagram + Facebook

═══════════════════════════════════════════════════════
ESTADO ATUAL DO PROJETO (13/03/2026 noite):
═══════════════════════════════════════════════════════

Passo 1 — Fonte (Poppins):                ✅ APROVADO
Passo 2 — Tom de voz + Voice DNA:         ✅ APROVADO (3 especialistas clonados)
Passo 3 — Estrutura dos formatos:         ✅ APROVADO (5 formatos + 10 novos identificados)
Passo 4 — Lógica de alternância:          ✅ APROVADO
Passo 5 — Logo "O J do Abraço":           ⏳ PENDENTE → @aaron-draplin
Passo 6 — DS.yaml compilado:              ✅ CONCLUÍDO → C:\Users\felip\Documents\DR-JULIA-RESENDE-DS.yaml
Passo 7 — Squad automatizado:             ✅ CRIADO em squads/dr-julia-resende/
Passo 8 — Ebook v2 reescrito:             ✅ APROVADO → C:\Users\felip\Documents\ebook_v2.txt
Passo 9 — Post #1 gerado:                 ✅ APROVADO (Carrossel Educativo Verde #1)
Passo 10 — Análise de referências visuais: ✅ CONCLUÍDA (5 pastas analisadas nesta sessão)
Passo 11 — Novos formatos documentados:   ✅ CONCLUÍDO nesta sessão
Passo 12 — Solução fidelidade IA:         ✅ DOCUMENTADO nesta sessão

═══════════════════════════════════════════════════════
PENDÊNCIAS PARA AMANHÃ (em ordem de prioridade):
═══════════════════════════════════════════════════════

1. Atualizar DS.yaml com 10 novos formatos + sistema de assets fixos
2. Logo "drjuliaresende" para ícone do Facebook (170×170px)
3. Foto de Capa para página do Facebook (851×315px)
4. Brandbook da Dra. Julia Resende (conceito + estrutura)
5. Landing page do ebook com animações scroll-based
```

---

## 1. PROTOCOLO DE SESSÃO (REGRAS INEGOCIÁVEIS)

```
REGRA 1: Antes de cada passo → perguntar se pode avançar
REGRA 2: Antes de chamar qualquer agente → perguntar se quer que chame
REGRA 3: NADA acontece automático — usuário sempre aprova primeiro
REGRA 4: Approval gate em TODO conteúdo gerado (APROVAR | REJEITAR | REVISAR)
```

---

## 2. ARQUIVOS DO PROJETO — MAPA COMPLETO

```
DESIGN SYSTEM (fonte da verdade):
→ C:\Users\felip\Documents\DR-JULIA-RESENDE-DS.yaml

EBOOK:
→ Original: C:\Users\felip\Documents\ebook em texto.txt
→ V2 (aprovado): C:\Users\felip\Documents\ebook_v2.txt
   Diferença: prefácio "Para você, mãe" + 8 aplicações de parentalidade

SQUAD (pasta completa):
→ C:\Users\felip\projeto00\squads\dr-julia-resende\
   ├── config.yaml
   ├── README.md
   ├── agents/
   │   ├── julia-chief.md     (orchestrator — controla ciclo semanal)
   │   ├── copy-agent.md      (gera copy seguindo Voice DNA)
   │   ├── image-agent.md     (gera prompts DALL-E por camada)
   │   ├── approval-agent.md  (approval gate humano OBRIGATÓRIO)
   │   └── ebook-agent.md     (reescrita mínima — já executou)
   └── workflows/
       ├── wf-weekly-cycle.yaml   (4 fases: plan→copy→image→approval)
       └── wf-ebook-rewrite.yaml  (3 fases — já executado e concluído)

HANDOFFS ANTERIORES:
→ C:\Users\felip\Documents\HANDOFF-DR-JULIA-RESENDE-v5.md (superseded)
→ C:\Users\felip\Documents\HANDOFF-DR-JULIA-RESENDE-v6.md ← ESTE ARQUIVO

REFERÊNCIAS VISUAIS ANALISADAS:
→ C:\Users\felip\Pictures\Referencias\ref00\ (10 imagens — Academia Lendária)
→ C:\Users\felip\Pictures\Referencias\ref01\ (4 imagens — Grupo Boticário)
→ C:\Users\felip\Pictures\Referencias\ref02\ (4 imagens — Pag Emana Pay/Natura)
→ C:\Users\felip\Pictures\Referencias\ref03\ (5 imagens — Dove)
→ C:\Users\felip\Pictures\Referencias\ref04\ (4 imagens — Dove Motion)
```

---

## 3. DESIGN SYSTEM — RESUMO DAS DEFINIÇÕES APROVADAS

```yaml
IDENTIDADE VISUAL:
  cores:
    verde_primario: "#03bb85"
    branco: "#FFFFFF"
    texto_escuro: "#1A1A1A"
    verde_escuro: "#0a2e2a"
  fonte: "Poppins (Regular, SemiBold, Bold, ExtraBold)"
  formato: "1080×1080px (feed) | 1080×1920px (stories)"

PERSONA:
  nome: "Dra. Julia Resende"
  instagram: "@drjuliaresende"
  nicho: "psicologia infantil + parentalidade + rotina"
  produto: "E-book O Poder da Rotina — R$27"
  bridge_phrase: "A rotina que transforma a sua vida, também transforma a vida dos seus filhos."

VOICE DNA (enriquecido com 3 especialistas reais):
  especialistas_clonados:
    - Vera Iaconelli (vocabulário desenvolvimento infantil)
    - Ana Luiza Pinheiro (formato Instagram-native parentalidade)
    - Luciane Najar (fórmula de validação emocional)
  tom: "validação emocional primeiro, educação depois, nunca culpa"
  anti_patterns:
    - Culpar a mãe
    - Jargão frio/clínico
    - Tom professoral/distante
    - Perfeicionismo como meta

FORMATOS ORIGINAIS DO SQUAD (5 aprovados):
  E = carrossel_educativo (verde, pillar educativo)
  M = post_unico_emocional (branco, pilar emocional)
  P = carrossel_prova_social (verde, pilar prova social)
  C = post_unico_cta (branco, pilar CTA)
  S = story (fundo verde ou branco)

ALTERNÂNCIA SEMANAL:
  Segunda: E (educativo verde)
  Terça:   M (emocional branco) + S (story)
  Quarta:  P (prova social verde)
  Quinta:  C (CTA branco) + S (story)
  Sexta:   E (educativo verde)
  Sábado:  S (story interativo)
  Domingo: descanso

STATE ATUAL:
  post_number: 1 (primeiro post aprovado e publicado)
  cycle_position: 1
  last_post_date: "2026-03-13"
```

---

## 4. POST #1 — JÁ APROVADO E PUBLICADO

```
Tipo: Carrossel Educativo Verde (formato E)
Pilar: Educativo
Tema: Por que meu filho faz birra? (rotina como resposta)
Capítulo do ebook: Cap. 1
Status: APROVADO pelo usuário (opção 1)
State: post_number=1, cycle_position=1

CAPTION APROVADA (para publicação no Instagram/Facebook):
"Você sabia que a birra do seu filho pode ser um sinal de que ELE
precisa de mais previsibilidade?

Quando a rotina é estável, o sistema nervoso da criança fica seguro.
E criança com sistema nervoso seguro = menos birras.

Não é fraqueza sua. É neurociência.

Salva esse post pra lembrar nos dias difíceis 💚

#parentalidade #rotina #psicologiainfantil #criancas #maternidade
#drjuliaresende #bircas #desenvolvimentoinfantil"

PROMPTS DALL-E (gerados pelo image-agent) — guardados no squad.
```

---

## 5. ANÁLISE COMPLETA DAS 5 PASTAS DE REFERÊNCIA

### REF00 — Academia Lendária / Alan Nicolas

| Formato | Descrição |
|---------|-----------|
| Meme/Tirinha | Stick figures P&B, humor situacional sem cor |
| Infográfico de Dados | Pontos = escala de pessoas, legenda de cores na base |
| Screenshot Social | Simula tweet/X + card de gradiente azul/roxo dentro |
| Educativo Conceitual | Fundo PRETO, ilustração geométrica branca, diagrama de escala |
| Prova Social WhatsApp | Carrossel 6 slides: celular com WhatsApp + fundo escuro + frase de impacto + screenshot de mensagem |

### REF01 — Grupo Boticário / Eudora

| Formato | Descrição |
|---------|-----------|
| Pessoa Real + Balões de Chat | Foto corpo como fundo, produtos flutuando, balões com benefícios |
| Flat Lay Editorial | Produtos espalhados, textos sobrepostos em vários pontos, fundo bege |
| Visual Impact | Fundo colorido intenso + elemento natural gigante (flor) + produto central |
| Slide de Fechamento | Branco limpo + texto centralizado + CTA (último slide) |

### REF02 — Pag Emana Pay / Natura

| Formato | Descrição |
|---------|-----------|
| Interface TikTok/Reels Simulada | Pessoa real + UI completa de TikTok sobreposta (likes, comentários, salvar) |
| Fundo Sólido + Barra de Busca + Lista | Laranja intenso + barra de busca simulada + bullets com seta |
| Gradiente + Formas Orgânicas | Fundo teal + ondas laranja cortando a imagem + produto diagonal |

### REF03 — Dove

| Formato | Descrição |
|---------|-----------|
| Lifestyle Flatlay + Barra de Busca | Foto ambiente, produtos reais, barra de busca centralizada, emojis |
| Carrossel de Revelação Progressiva | Produto desfocado → vai ficando nítido. Cada slide = 1 benefício |

### REF04 — Dove Motion

| Formato | Descrição |
|---------|-----------|
| Word Reveal Carrossel | Fundo sólido com grain/textura, frase revelada letra por letra entre slides |
| Texto gradiente no final | Último slide revela conclusão da frase em gradiente |

---

## 6. NOVOS FORMATOS A ADICIONAR AO SQUAD

**10 novos formatos identificados — ainda NÃO estão no DS.yaml:**

| # | Formato | Referência | Exemplo para Julia |
|---|---------|------------|-------------------|
| 1 | Meme/Tirinha P&B | ref00/00 | Situação de birra no mercado, humor |
| 2 | Prova Social WhatsApp | ref00/1.1-1.6 | Screenshot mãe elogiando ebook + frase verde |
| 3 | Educativo Conceitual | ref00/03 | Diagrama: Caos→Rotina→Paz |
| 4 | Screenshot Social (tweet) | ref00/02 | Citação de pesquisa + card verde |
| 5 | Interface Reels Simulada | ref02/00,03 | UI de Reels sobreposta + Julia ou foto |
| 6 | Barra de Busca Simulada | ref02/01, ref03/00 | "O que mães pesquisam às 22h:" + lista |
| 7 | Lifestyle Flatlay | ref03/00 | Mesa com café + caderno + barra de busca |
| 8 | Revelação Progressiva | ref03/1.0-1.3 | Conteúdo desfocado → revelado por slides |
| 9 | Word Reveal | ref04 | "Você não é uma mãe ruiiiiiiiim... só está sem rotina" |
| 10 | Visual Impact | ref01/1.2 | Fundo verde + elemento humano grande + frase mínima |

**AÇÃO AMANHÃ:** Adicionar esses 10 formatos ao DS.yaml antes de gerar novos posts.

---

## 7. SOLUÇÃO — FIDELIDADE DE COR ENTRE CAMADAS (CRÍTICO)

**Problema identificado pelo usuário:** DALL-E muda cor de fundo e elementos entre prompts diferentes. Frustrante e inutilizável.

**Solução definitiva aprovada:**

```
REGRA 1 — NUNCA usar DALL-E para texto dentro da imagem
  → DALL-E erra ortografia, muda fontes
  → TODO texto é adicionado no Canva/Figma depois

REGRA 2 — Assets de fundo gerados UMA VEZ e reutilizados
  → fundo_verde_01.png (#03bb85)
  → fundo_branco_01.png (branco puro)
  → fundo_escuro_01.png (#0a2e2a verde escuro)
  → Esses 3 arquivos são FIXOS. Nunca regenerados.

REGRA 3 — HEX obrigatório em TODO prompt de cor
  → NUNCA: "green background"
  → SEMPRE: "solid background color exactly #03bb85 RGB(3,187,133)"

REGRA 4 — Camadas nomeadas
  → layer_01_fundo.png
  → layer_02_elemento_visual.png
  → layer_03_overlay.png
  → Cada prompt referencia o arquivo da camada anterior

REGRA 5 — Canva como compositor final
  → Canva recebe todos os layers + adiciona texto/logo/marca
  → Garante 100% de fidelidade tipográfica e de cor
  → A IA gera elementos artísticos, Canva monta e finaliza

FLUXO DO IMAGE-AGENT (atualizado):
  Brief → gera apenas visual (sem texto)
        → salva como layer_XX_nome.png
        → instrui composição no Canva:
          "Abrir Canva → fundo #03bb85 → adicionar layer_02
          → texto [FRASE_BOLD] em Poppins Bold
          → adicionar @drjuliaresende em 14px branco"
```

---

## 8. PENDÊNCIAS COMPLETAS — AMANHÃ

### 8.1 PRIORIDADE ALTA (fazer primeiro)

**A — Atualizar DS.yaml com novos formatos**
- Adicionar os 10 novos formatos de conteúdo
- Adicionar sistema de assets fixos (nomes dos arquivos de fundo)
- Adicionar regras de fidelidade de cor
- Agente: squad-chief ou edição direta

**B — Logo Facebook (Passo 5 ainda pendente)**
- Logo "O J do Abraço" com nome "drjuliaresende"
- Ícone de perfil: 170×170px (exibido em círculo)
- Agente: @Design:agents:aaron-draplin
- Após aprovação: atualizar DS.yaml

**C — Foto de Capa do Facebook**
- Dimensões: 851×315px desktop / 640×360px mobile
- Precisa definir conceito (3 opções sugeridas):
  1. Fundo verde #03bb85 + frase central + logo branca
  2. Foto da Dra. Julia (se tiver) + overlay verde + tagline
  3. Ilustração de mãe e filho em abraço + logo
- Agente: @Design:agents:design-chief ou @Design:agents:aaron-draplin
- Após aprovação: atualizar DS.yaml

### 8.2 PRIORIDADE MÉDIA

**D — Brandbook da Dra. Julia Resende**

O que é: documento que define "quem é a marca" — identidade completa.

Diferença do DS.yaml:
- DS.yaml = operacional (como produzir conteúdo)
- Brandbook = estratégico + visual (quem somos)

Estrutura do brandbook a criar:
1. Propósito e posicionamento da marca
2. Personalidade e valores
3. Logo e variações
4. Paleta de cores com significado
5. Tipografia com hierarquia
6. Estilo fotográfico
7. Tom de voz e vocabulário
8. Padrões e texturas
9. Mockups em aplicações reais
10. Anti-patterns (o que não fazer)

Formato: PDF + site interativo (como shaktijaya.com.br)
Agente: @Design:agents:design-chief + @AIOX:agents:ux-design-expert

### 8.3 PRIORIDADE FUTURA

**E — Landing Page do Ebook**

Animações aprovadas pelo usuário:
- Ebook entra girando 360° conforme usuário desce (GSAP + ScrollTrigger)
- Ebook se posiciona à esquerda com texto à direita
- Segunda animação: ebook flutuando (cima e baixo em loop — CSS keyframes)

Stack técnica recomendada:
- HTML5 + CSS3 + JavaScript puro
- GSAP + ScrollTrigger para animações scroll
- Hospedagem: Vercel ou GitHub Pages (grátis)

Usar DS.yaml como fonte de verdade para cores/fontes.
Agente: @AIOX:agents:dev

---

## 9. CONTEXTO IMPORTANTE — NÃO ESQUECER

```
SOBRE O USUÁRIO:
- Nome: João Paulo R. Costa
- Não sabe inglês
- Está construindo isso do zero
- Quer Instagram diferenciado (não padronizado)
- Quer aprovação em tudo antes de publicar
- Aprecia velocidade mas não abre mão de qualidade

SOBRE A PERSONA:
- Dra. Julia Resende é uma personagem/persona IA
- Não há foto real dela (a ser definido)
- Tom: carinhosa, validadora, nunca culpa a mãe
- Nicho: mães com filhos pequenos (0-10 anos)

SOBRE O PRODUTO:
- Ebook "O Poder da Rotina" — R$27
- Ebook fala de produtividade pessoal (não parentalidade)
- A BRIDGE PHRASE resolve o gap:
  "A rotina que transforma a sua vida, também transforma a vida dos seus filhos."
- Ebook v2 tem prefácio + 8 aplicações de parentalidade adicionados (aprovados)

SOBRE O SQUAD:
- Squad criado em: squads/dr-julia-resende/
- 5 agentes: julia-chief, copy-agent, image-agent, approval-agent, ebook-agent
- Approval gate é OBRIGATÓRIO em todo conteúdo
- Post #1 aprovado e com caption para publicação

SOBRE AS FERRAMENTAS:
- ChatGPT = única ferramenta de imagem (DALL-E 3)
- Canva = compositor final (adiciona texto, logo, elementos de marca)
- Nunca usar DALL-E para gerar texto dentro da imagem

SOBRE O PROBLEMA DE FIDELIDADE:
- Resolvido via sistema de assets fixos + Canva como compositor
- Ver Seção 7 deste handoff para detalhes completos
```

---

## 10. PRÓXIMA SESSÃO — ONDE COMEÇAR

**Mensagem para copiar e colar na próxima sessão:**

```
Olá! Continuando o projeto Dra. Julia Resende.
Handoff completo em: C:\Users\felip\Documents\HANDOFF-DR-JULIA-RESENDE-v6.md

Onde paramos: análise das 5 pastas de referências visuais concluída.
Post #1 aprovado. Squad criado e funcionando.

Próximo passo: atualizar o DS.yaml com os 10 novos formatos de conteúdo
identificados na análise de referências (Seção 6 do handoff).
Depois: logo "drjuliaresende" para Facebook com @aaron-draplin.

Pode começar?
```

---

*HANDOFF v6 — Gerado em 13/03/2026 — Sessão noite*
*Próxima sessão: amanhã (14/03/2026)*
*Gerado por: Atlas (@analyst) + squad-chief + claude-sonnet-4-6*

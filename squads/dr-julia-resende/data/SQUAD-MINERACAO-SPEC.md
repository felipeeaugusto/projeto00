# SPEC — Squad de Mineração de Conteúdo
> Documento de planejamento. Aprovação do Felipe obrigatória antes da criação.
> Criado por: Atlas (@analyst) — 2026-03-19
> Atualizado por: Atlas (@analyst) — 2026-03-20 (publisher-agent + Meta Graph API adicionados)

---

## 🎯 Propósito

Minerar os posts de maior performance dos 30 perfis de referência do Instagram,
extrair padrões estruturais (não copiar conteúdo) e gerar **briefings prontos**
para o julia-chief usar na produção de posts da @drjuliaresende.

**Metáfora simples:** o squad é um pesquisador que assiste 100 vídeos virais
e te entrega um resumo: "esses 3 formatos funcionam, esses são os hooks mais
usados, esses são os gatilhos emocionais que mais geram salvamento".

---

## 🏗️ Arquitetura do Squad

```
Squad Mineração de Conteúdo
│
├── scout-agent        → Coleta dados brutos via Apify (Instagram scraper)
├── analyst-agent      → Processa e classifica os dados coletados
└── briefing-agent     → Monta a tabela de briefing para o julia-chief
         │
         └──► julia-chief (squad existente) recebe o briefing e produz posts
                    │
                    └──► compositor-agent → gera PNG via HTML/CSS + Playwright
                                │
                                └──► publisher-agent → posta via Meta Graph API
```

**Fluxo 100% automático (visão completa):**
```
SEGUNDA-FEIRA (mineração):
scout-agent (Apify) → posts virais brutos dos 30 perfis
         ↓
analyst-agent → classifica: hook | formato | pilar | gatilho | engajamento
         ↓
briefing-agent → tabela top 5 oportunidades da semana

TERÇA A DOMINGO (produção e publicação):
julia-chief → lê briefing → decide formato/pilar/cor/dia
         ↓
copy-agent → escreve legenda + hook adaptados para @drjuliaresende
         ↓
image-agent → define layout, elementos visuais, texto do card
         ↓
compositor-agent → HTML/CSS + Playwright → PNG 1080x1080 (feed) ou 1080x1920 (story)
         ↓
publisher-agent → Meta Graph API → posta no Instagram + Facebook
         ↓
✅ Post publicado automaticamente, sem Felipe tocar em nada
```

---

## 👥 Agentes

### 1. scout-agent
**Responsabilidade:** Coletar os posts com maior engajamento dos perfis de referência.

**Ferramenta:** Apify — Instagram Profile Scraper + Instagram Post Scraper

**Inputs:**
- Lista de perfis de referência (30 perfis — ver seção abaixo)
- Filtros: posts dos últimos 90 dias, mínimo de engajamento (ver thresholds)
- Tipo de conteúdo: Reels, Carrossel, Imagem

**Outputs:**
```
posts_brutos.json
├── url
├── tipo (reel | carrossel | imagem)
├── likes
├── comments
├── shares / saves (quando disponível)
├── caption (legenda completa)
├── hashtags
├── data_publicacao
└── perfil_origem
```

**Thresholds mínimos de engajamento (filtros de qualidade):**
| Tipo | Likes | Comments |
|------|-------|----------|
| Reels | 5.000 | 100 |
| Carrossel | 3.000 | 50 |
| Imagem | 2.000 | 30 |

**Frequência:** 1x por semana (segunda-feira de manhã)

---

### 2. analyst-agent
**Responsabilidade:** Processar os dados brutos e extrair padrões estruturais.

**Lógica central (baseada no Método Subido de Mineração 1.0 — Pedro Sobral):**

Para cada post coletado, extrair:
1. **Hook** — primeira linha da legenda ou texto na capa do carrossel
2. **Estrutura** — problema → agitação → solução? Pergunta → resposta? Lista?
3. **Formato** — reel / carrossel / imagem estática
4. **Pilar de conteúdo** — Educativo / Emocional / Prova Social / CTA / Entretenimento
5. **Gatilho emocional** — curiosidade / medo de perder / identidade / esperança / pertencimento
6. **Assunto central** — tema do post em 1 linha
7. **Taxa de engajamento estimada** — (likes + comments) / seguidores do perfil × 100
8. **Ângulo de adaptação** — como esse post se conecta com o universo da Dra. Julia (rotina, sono, organização, maternidade)

**Output:**
```
posts_analisados.json
├── (todos os campos do scout)
├── hook_extraido
├── estrutura_narrativa
├── formato
├── pilar
├── gatilho_emocional
├── assunto
├── taxa_engajamento
└── angulo_adaptacao
```

---

### 3. briefing-agent
**Responsabilidade:** Montar a tabela de oportunidades ranqueadas e entregar ao julia-chief.

**Critério de ranqueamento:**
1. Taxa de engajamento (peso 40%)
2. Relevância para o nicho da Dra. Julia (peso 30%)
3. Ângulo novo / ainda não explorado no feed (peso 30%)

**Output — Tabela de Briefing (top 5 oportunidades da semana):**

| # | Assunto | Hook sugerido | Formato | Pilar | Gatilho | Referência |
|---|---------|--------------|---------|-------|---------|------------|
| 1 | ... | ... | Carrossel | Educativo | Curiosidade | @academialendaria |
| 2 | ... | ... | Reel | Emocional | Esperança | @oalanicolas |
| ... | | | | | | |

**Entrega:** arquivo `briefing-semanal-YYYY-MM-DD.md` em
`squads/dr-julia-resende/data/briefings/`

**Handoff para julia-chief:**
> "Julia Chief, aqui estão as 5 melhores oportunidades da semana baseadas em
> conteúdo viral dos perfis de referência. Use o briefing #1 para o próximo post."

---

### 4. compositor-agent
**Responsabilidade:** Receber o output do image-agent e gerar o PNG final via HTML/CSS + Playwright.

**Inputs:**
- Briefing do image-agent: layout, cores, textos, formato (feed/story)
- DS.yaml v4.0 — referência de estilos aprovados
- Dimensões: 1080x1080 (feed) ou 1080x1920 (story)

**Processo:**
1. Monta o HTML/CSS baseado no estilo definido pelo image-agent
2. Executa Playwright → captura screenshot → salva PNG
3. Passa o caminho do arquivo para o publisher-agent

**Output:** PNG salvo em `squads/dr-julia-resende/output/YYYY-MM-DD-{tipo}-{numero}.png`

**Nota:** Este agente ainda precisa ser criado via squad-creator-pro (pendência ativa).

---

### 5. publisher-agent
**Responsabilidade:** Publicar o PNG gerado no Instagram e Facebook via Meta Graph API.

**Inputs:**
- Caminho do PNG gerado pelo compositor-agent
- Legenda escrita pelo copy-agent
- Tipo de publicação: feed (imagem/carrossel) ou story
- Agendamento: data e hora de publicação (definida pelo julia-chief)

**Processo de publicação (Meta Graph API — 2 passos obrigatórios):**

**Passo 1 — Upload da mídia (criar container):**
```
POST https://graph.facebook.com/v19.0/{IG_USER_ID}/media
  image_url = URL pública da imagem
  caption   = legenda com hashtags
  access_token = {TOKEN}
→ retorna: { id: "CREATION_ID" }
```

**Passo 2 — Publicar o container:**
```
POST https://graph.facebook.com/v19.0/{IG_USER_ID}/media_publish
  creation_id = CREATION_ID do passo 1
  access_token = {TOKEN}
→ retorna: { id: "POST_ID" } ← post publicado ✅
```

**Para Facebook Page** (publicação simultânea):
```
POST https://graph.facebook.com/v19.0/{PAGE_ID}/photos
  url          = URL pública da imagem
  message      = legenda
  access_token = {PAGE_TOKEN}
```

**Output:** ID do post publicado + confirmação de sucesso

---

## 🔑 Requisitos — Meta Graph API (pré-configuração obrigatória)

Para o publisher-agent funcionar, Felipe precisa configurar **uma única vez**:

### Pré-requisitos de conta
| Item | Status | O que fazer |
|------|--------|------------|
| Conta Instagram Professional | ✅ (@drjuliaresende já existe) | Confirmar que está em modo Business ou Creator |
| Página do Facebook vinculada | ✅ (já criada) | Confirmar que o Instagram está vinculado à Página |
| Facebook Developer App | ❌ Não criado | Criar em developers.facebook.com |

### Permissões necessárias no App
O App precisa ter aprovadas:
- `instagram_basic` — leitura da conta
- `instagram_content_publish` — **publicação de posts** ← a mais importante
- `pages_read_engagement` — leitura da página Facebook
- `pages_manage_posts` — publicação na página Facebook

### Tokens necessários
| Token | Para que serve | Validade |
|-------|---------------|---------|
| **User Access Token** (curta duração) | Trocar por token longa duração | 1 hora |
| **Long-lived User Access Token** | Autenticação do publisher-agent | 60 dias |
| **Page Access Token** | Publicar na Página Facebook | Não expira (se gerado de long-lived) |

**Importante:** O Page Access Token gerado a partir de um Long-lived User Token **não expira** — o publisher-agent funciona indefinidamente sem precisar renovar.

### Onde guardar os tokens (seguro)
```
squads/dr-julia-resende/config/
└── publisher-secrets.yaml  ← NÃO commitar no GitHub (adicionar ao .gitignore)
    ├── ig_user_id: "..."
    ├── page_id: "..."
    ├── long_lived_token: "..."
    └── page_access_token: "..."
```

### Passos para configurar (fazer uma vez)
1. Acessar https://developers.facebook.com → criar App do tipo "Business"
2. Adicionar produto "Instagram Graph API"
3. Gerar User Access Token com as 4 permissões listadas acima
4. Trocar por Long-lived Token (válido 60 dias)
5. Gerar Page Access Token a partir do Long-lived (não expira)
6. Salvar IDs e tokens em `publisher-secrets.yaml`
7. Testar com um post manual via publisher-agent

**Estimativa:** ~1 hora de configuração no total, feita uma vez só.

---

## 📋 30 Perfis de Referência

### Camada 1 — Mesmo Nicho (maternidade, rotina, pedagogia)
1. @oalanicolas — 2,1M — conteúdo parental de alta performance
2. @academialendaria — educação comportamental e hábitos
3. @maedemenino_oficial — maternidade real + humor
4. @institutoneurosaber — neurociência aplicada à família
5. @draanaluizasilveira — pediatria + desenvolvimento infantil
6. @pedagogajaquelineribeiro — dicas pedagógicas práticas
7. @camilaferreirapsico — psicologia do comportamento infantil
8. @drrenatadomingues — TDAH + comportamento infantil
9. @eusoumaedetea — maternidade atípica
10. @maternidadepratica — rotina e organização familiar

### Camada 2 — Criadores de Conteúdo de Alto Engajamento
11. @pedrosobral — metodologia de conteúdo orgânico
12. @finclass_grupoprimo — educação financeira + produção premium
13. @bruno_perini — finanças pessoais + engajamento alto
14. @kleberpayam — copywriting e persuasão
15. @lucasinutile — storytelling + roteiro de vídeo
16. @camilaportella_ — conteúdo para infoprodutores
17. @rodrigocampos.mkt — marketing digital com resultados
18. @nataliabittencourt — produção de conteúdo para Instagram
19. @rafaelfeio — orgânico + vídeo curto
20. @vivianmelo.conteudo — estratégia de conteúdo feminino

### Camada 3 — Referências Visuais e Narrativas
21. @drauziovarella — autoridade médica + comunicação simples
22. @tuliofarias — comportamento humano + viralização
23. @leandrodesouza — hábitos e desenvolvimento pessoal
24. @taispadilha — mulher, carreira e equilíbrio
25. @camila_coutinho — lifestyle feminino + estética premium
26. @brazilianteacher — comunicação direta + humor leve
27. @viihmoraes — formato UGC + prova social
28. @juromanos — rotina, organização e produtividade
29. @dani_hyodo — maternidade + empreendedorismo
30. @kerolaynasciimento — rotina feminina + criação de filhos

---

## 🔗 Integração com o Squad da Dra. Julia

```
Squad Mineração               Squad Dra. Julia (existente)
─────────────────────         ─────────────────────────────
scout-agent                   julia-chief (orchestrator)
analyst-agent         ──►     copy-agent
briefing-agent                image-agent
                               approval-agent
                               ebook-agent
```

**Protocolo de entrega:**
- briefing-agent gera `briefing-semanal-YYYY-MM-DD.md`
- julia-chief OBRIGATORIAMENTE usa os top 3 do briefing como input para a semana
- julia-chief NÃO opera sem briefing válido — se não houver briefing da semana, aguarda
- O briefing expira em 7 dias (uma nova rodada sobrescreve)
- Razão: o briefing é baseado em padrões que já viralizaram — ignorá-lo significa produzir conteúdo sem dados, perdendo presença e alcance no mercado

---

## ⚙️ Configuração Técnica

### Ferramenta de coleta: Apify
- **Actor para perfis:** `apify/instagram-profile-scraper`
- **Actor para posts:** `apify/instagram-post-scraper`
- **Limite por perfil:** 20 posts mais recentes (filtra por engagement depois)
- **Output format:** JSON
- **Credenciais:** MCP Apify já configurado em `~/.docker/mcp/catalogs/docker-mcp.yaml`

### Armazenamento
```
squads/dr-julia-resende/data/
├── mineracao/
│   ├── posts_brutos/           ← saída do scout-agent
│   ├── posts_analisados/       ← saída do analyst-agent
│   └── briefings/              ← saída do briefing-agent
├── perfis-referencia.yaml      ← lista dos 30 perfis com metadados
└── SQUAD-MINERACAO-SPEC.md     ← este arquivo
```

### Frequência de operação
| Fase | Quando | Duração estimada |
|------|--------|-----------------|
| Coleta (scout) | Segunda-feira 08h | ~20-30 min |
| Análise (analyst) | Segunda-feira após coleta | ~10 min |
| Briefing | Segunda-feira após análise | ~5 min |
| Uso pelo julia-chief | Segunda a domingo | conforme demanda |

---

## ✅ Critérios de Sucesso

1. **Relevância:** ≥ 3 dos 5 briefings semanais geram posts com engagement acima da média atual
2. **Qualidade:** 0 cópias diretas de conteúdo — apenas estrutura e padrões
3. **Cobertura:** ≥ 15 dos 30 perfis coletados com sucesso (Apify pode ter limitações)
4. **Velocidade:** briefing completo entregue em até 45 minutos do início da coleta

---

## 🚫 O Que Este Squad NÃO Faz

- ❌ Não copia legendas de outros perfis
- ❌ Não acessa stories privados ou contas privadas
- ❌ Não faz follow/unfollow em nenhuma conta
- ❌ Não opera sem aprovação prévia do Felipe
- ❌ O briefing NÃO é sugestão — é o input obrigatório de toda semana de produção

---

## 📌 Status

| Item | Status |
|------|--------|
| Spec escrita | ✅ Feito |
| publisher-agent + Meta Graph API documentados | ✅ Feito |
| Aprovação do Felipe | ⏳ Aguardando |
| Criação dos agentes (scout, analyst, briefing) | ❌ Bloqueado até aprovação |
| Criação compositor-agent | ❌ Bloqueado até aprovação |
| Criação publisher-agent | ❌ Bloqueado até aprovação |
| Configuração Meta Graph API (Felipe faz 1x) | ❌ Bloqueado até agentes criados |
| Teste piloto (5 perfis) | ❌ Aguarda criação |
| Expansão para 30 perfis | ❌ Aguarda teste piloto |
| Publicação automática ativa | ❌ Aguarda tudo acima |

---

*Spec criada por Atlas (@analyst) — 2026-03-19*
*Atualizada por Atlas (@analyst) — 2026-03-20 — publisher-agent + Meta Graph API adicionados*
*Próximo passo: Felipe aprova → squad-creator-pro cria os agentes → Felipe configura Meta Graph API (1x)*

# PRD — Compositor Python de Imagens
**Projeto:** @drjuliaresende
**Versão:** 1.0
**Data:** 2026-03-17
**Responsável:** Felipe (executor) | João Paulo (aprovador final)
**Status:** Draft

---

## 1. Problema

O DALL-E não mantém a cor `#03bb85` fiel entre gerações. Cada imagem sai com um verde ligeiramente diferente, quebrando a identidade visual da marca.

Além disso, texto gerado pelo DALL-E tem qualidade inconsistente — letras erradas, fontes aleatórias.

**Resultado atual sem o compositor:** imagens publicadas com cor e tipografia fora do padrão da marca.

---

## 2. Solução

Um script Python que monta as imagens por camadas:

- **Camada 1:** fundo gerado por código — cor 100% fiel (`#03bb85`, branco ou escuro)
- **Camada 2:** elemento artístico gerado pelo DALL-E (fornecido manualmente pelo Felipe)
- **Camada 3:** texto em Poppins (adicionado por código)
- **Camada 4:** assinatura `@drjuliaresende` (fixo, bottom-right)
- **Camada 5:** logo do abraço (PNG fixo)

---

## 3. Fases de Entrega

### FASE 1 — Validação Manual (implementar agora)

**O que acontece na prática:**

1. Felipe abre o script e diz qual formato quer criar (ex: post verde educativo)
2. O script mostra o prompt pronto para usar no ChatGPT
3. Felipe copia o prompt, vai no ChatGPT, pede a imagem pro DALL-E
4. Felipe baixa a imagem gerada no PC (ex: `Downloads/elemento.png`)
5. Felipe informa o caminho dessa imagem pro script
6. O script monta o post completo: fundo com cor exata + imagem do DALL-E + texto + logo
7. O post final é salvo como PNG 1080x1080 — pronto para publicar
8. Felipe abre, vê o resultado e valida

**O script não chama o DALL-E sozinho nessa fase. Felipe traz a imagem do ChatGPT e o script monta tudo.**

**Exemplo de uso:**
```bash
python compositor.py \
  --formato VE \
  --elemento "C:/Users/felip/Downloads/elemento-01.png" \
  --texto "7 minutos por dia mudam tudo." \
  --saida "C:/Users/felip/Downloads/post-final-01.png"
```

**3 posts de teste obrigatórios antes de avançar:**
- Teste 1 — Formato `VE` (Visual Educativo — fundo verde)
- Teste 2 — Formato `QC` (Quote Card — fundo branco)
- Teste 3 — Formato `MT` (Meme/Tirinha — fundo branco)

**Critério de aprovação da Fase 1:** Felipe vê os 3 posts finais e aprova cor, tipografia e composição.

---

### FASE 2 — Automação Total (só após Fase 1 aprovada)

Nessa fase o script passa a chamar o DALL-E automaticamente — sem precisar que Felipe baixe nada manualmente. O script gera o prompt, pede a imagem pra API do DALL-E, recebe e já monta o post sozinho.

> **Esta fase só começa quando Felipe liberar após validar a Fase 1.**

---

## 4. Especificações Técnicas

| Item | Valor |
|------|-------|
| Linguagem | Python 3.10+ |
| Biblioteca imagem | Pillow (PIL) |
| Biblioteca texto | Pillow ImageFont |
| Fonte | Poppins (.ttf) |
| Output feed | PNG 1080x1080px, RGB, 72dpi, sRGB |
| Output story | PNG 1080x1920px |
| Localização do script | `squads/dr-julia-resende/scripts/compositor.py` |
| Assets fixos | `squads/dr-julia-resende/assets/` |

**Cores hardcoded no script (nunca mudam):**

| Nome | HEX | RGB |
|------|-----|-----|
| Verde principal | `#03bb85` | `(3, 187, 133)` |
| Branco | `#FFFFFF` | `(255, 255, 255)` |
| Escuro | `#0a2e2a` | `(10, 46, 42)` |

---

## 5. Parâmetros do Script (Fase 1)

| Parâmetro | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `--formato` | Sim | Código do formato (VE, QC, MT, etc.) |
| `--elemento` | Sim | Caminho do PNG que Felipe baixou do ChatGPT |
| `--texto` | Sim | Texto principal do post |
| `--saida` | Sim | Caminho onde o post final será salvo |
| `--fundo` | Não | Override de cor (verde/branco/escuro) |
| `--assinatura` | Não | Default: `@drjuliaresende` |

---

## 6. O que o @dev NÃO deve fazer

- ❌ Não integrar API do DALL-E na Fase 1
- ❌ Não criar interface gráfica
- ❌ Não remover fundo da imagem automaticamente (Felipe pede "sem fundo" direto no ChatGPT)
- ❌ Não alterar o DS.yaml

---

## 7. Critérios de Aceite (Fase 1)

- [ ] Script roda com `python compositor.py --ajuda` e exibe os parâmetros
- [ ] Fundo verde gerado com exatamente `RGB(3, 187, 133)` — verificável via color picker
- [ ] Texto em Poppins, branco sobre verde, sem serrilhado
- [ ] `@drjuliaresende` posicionado bottom-right com 24px de margem
- [ ] Logo do abraço aplicado sobre o fundo
- [ ] Output salvo no caminho informado em `--saida`
- [ ] 3 posts de teste validados pelo Felipe

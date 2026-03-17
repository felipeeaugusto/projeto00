# Setup — Compositor Python

## 1. Instalar Python

Baixe e instale em: https://www.python.org/downloads/
- Marque a opção **"Add Python to PATH"** durante a instalação

## 2. Instalar dependências

Abra o terminal na pasta do projeto e rode:

```bash
pip install Pillow
```

## 3. Verificar instalação

```bash
python --version
python -c "from PIL import Image; print('Pillow OK')"
```

## 4. Como usar

### Ver o prompt DALL-E para um formato:
```bash
python compositor.py --formato VE --prompt-dalle
```

### Compor um post (após baixar o elemento do ChatGPT):
```bash
python compositor.py --formato VE --elemento "C:/Users/felip/Downloads/elemento.png" --texto "7 minutos por dia mudam tudo." --saida "C:/Users/felip/Downloads/post-final.png"
```

### Ver todos os parâmetros:
```bash
python compositor.py --ajuda
```

## Formatos disponíveis

| Código | Nome | Fundo |
|--------|------|-------|
| VE | Visual Educativo | Verde #03bb85 |
| QC | Quote Card | Branco |
| MT | Meme / Tirinha P&B | Branco |
| PSW | Prova Social WhatsApp | Escuro #0a2e2a |
| EC | Educativo Conceitual | Verde |
| CI | Carrossel Informativo | Verde |
| DP | Dado + Problema | Verde |
| DT | Dica Prática | Verde |
| BI | Bio / Apresentação | Branco |
| CV | CTA de Venda | Verde |

## 3 posts de teste (Fase 1)

Rode em ordem para validar:

```bash
# Teste 1 — Formato VE (fundo verde)
python compositor.py --formato VE --prompt-dalle
# (baixe o elemento, então:)
python compositor.py --formato VE --elemento "elemento-VE.png" --texto "7 minutos por dia mudam tudo." --saida "teste-01-VE.png"

# Teste 2 — Formato QC (fundo branco)
python compositor.py --formato QC --prompt-dalle
python compositor.py --formato QC --elemento "elemento-QC.png" --texto "A rotina é o abraço invisível." --saida "teste-02-QC.png"

# Teste 3 — Formato MT (fundo branco)
python compositor.py --formato MT --prompt-dalle
python compositor.py --formato MT --elemento "elemento-MT.png" --texto "Toda segunda-feira às 17h. Sem falta." --saida "teste-03-MT.png"
```

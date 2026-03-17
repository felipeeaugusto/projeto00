# -*- coding: utf-8 -*-
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

"""
compositor.py — Compositor de Imagens Dra. Julia Resende
=========================================================
Monta posts finais por camadas — estilo Dove (Style A).

Layout Dove:
  - Elemento visual ocupa 60-70% da tela (herói)
  - Texto fica num canto (top-left), pequeno e preciso
  - Fundo limpo (branco ou verde sólido)
  - Logo discreta no canto inferior esquerdo
  - Assinatura no canto inferior direito

Cada formato tem sua própria função montar_{formato}().
NÃO existe fluxo único — cada formato tem regras independentes.

Uso:
  python compositor.py --formato VE --elemento elemento.png --texto "Seu texto" --saida post-final.png
  python compositor.py --formato QC --texto "A rotina é o abraço invisível" --subtexto "Dra. Julia Resende" --saida quote.png
  python compositor.py --formato MT --elemento meme.png --texto "Quando você tenta 5 minutos de paz" --saida meme.png

Fase 1: Felipe fornece o elemento PNG manualmente (baixado do ChatGPT).
        Este script NÃO chama a API do DALL-E.
"""

import argparse
import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ============================================================
# CORES — HARDCODED (nunca mudar)
# ============================================================
CORES = {
    "verde":  (3, 187, 133),    # #03bb85
    "branco": (255, 255, 255),  # #FFFFFF
    "escuro": (10, 46, 42),     # #0a2e2a
}

COR_TEXTO_SOBRE = {
    "verde":  (255, 255, 255),  # branco sobre verde
    "branco": (26, 26, 26),     # #1A1A1A sobre branco
    "escuro": (255, 255, 255),  # branco sobre escuro
}

# ============================================================
# DIMENSOES
# ============================================================
DIMENSOES = {
    "feed":  (1080, 1080),
    "story": (1080, 1920),
}

# ============================================================
# MAPA DE FORMATOS -> fundo padrao
# ============================================================
FORMATOS = {
    "VE":  {"nome": "Visual Educativo",        "fundo": "verde"},
    "QC":  {"nome": "Quote Card",              "fundo": "branco"},
    "MT":  {"nome": "Meme / Tirinha P&B",      "fundo": "branco"},
    "PSW": {"nome": "Prova Social WhatsApp",   "fundo": "escuro"},
    "EC":  {"nome": "Educativo Conceitual",    "fundo": "verde"},
    "CI":  {"nome": "Carrossel Informativo",   "fundo": "verde"},
    "DP":  {"nome": "Dado + Problema",         "fundo": "verde"},
    "DT":  {"nome": "Dica Pratica",            "fundo": "verde"},
    "BI":  {"nome": "Bio / Apresentacao",      "fundo": "branco"},
    "CV":  {"nome": "CTA de Venda",            "fundo": "verde"},
}

# ============================================================
# CAMINHOS BASE
# ============================================================
BASE_DIR = Path(__file__).parent.parent  # squads/dr-julia-resende/
ASSETS_DIR = BASE_DIR / "assets"
FONTS_DIR = Path(__file__).parent.parent.parent.parent / "assets" / "fonts"

# Fontes disponiveis
FONTES = {
    "bold":    FONTS_DIR / "Poppins-Bold.ttf",
    "regular": FONTS_DIR / "Poppins-Regular.ttf",
    "semibold": FONTS_DIR / "Poppins-SemiBold.ttf",
}

# Logos disponiveis
LOGOS = {
    "sem-fundo": ASSETS_DIR / "logo-sem-fundo.png",  # simbolo branco, fundo transparente
    "padrao":    ASSETS_DIR / "01.png",               # fallback com fundo verde
}


# ============================================================
# PROMPTS DALL-E — ESTILO DOVE (fotorrealista, fundo branco limpo)
# ============================================================
PROMPTS_DALLE = {
    "VE": """Editorial illustration for Instagram post, 1080x1080px.
Central subject: a calm Brazilian mother (30s) in a peaceful home moment — reading, organizing, or hugging a child.
Style: soft photorealistic illustration, warm and gentle light, clean white background (no scene background).
The figure occupies center of frame, surrounded by empty white space.
Mood: serene, organized, hopeful. Warm skin tones. Minimal clothing, neutral colors (beige, white, soft green).
NO text, NO logo, NO watermark, NO busy background, NO extra elements, NO pattern.""",

    "QC": None,  # QC e tipografia pura — sem elemento DALL-E

    "MT": """Minimalist black and white stick figure comic, single panel, white background.
Scene: funny everyday parenting moment — mother trying to do something while child interrupts.
Style: thin clean lines only, no fill, no shading, no color. Similar to xkcd webcomic style.
Two characters max. Clear readable action. Light humor, relatable situation for Brazilian mothers.
NO text, NO speech bubbles, NO logo, NO watermark, NO gray tones.""",
}


# ============================================================
# FUNCOES UTILITARIAS
# ============================================================

def gerar_fundo(cor_nome: str, modo: str = "feed") -> Image.Image:
    """Gera fundo com cor exata por codigo Python."""
    largura, altura = DIMENSOES.get(modo, DIMENSOES["feed"])
    cor_rgb = CORES[cor_nome]
    return Image.new("RGB", (largura, altura), cor_rgb)


def remover_fundo_branco(elemento: Image.Image, limiar: int = 235) -> Image.Image:
    """
    Remove apenas pixels brancos/quase-brancos (todos os canais RGB acima do limiar).
    Preserva todas as cores da ilustracao (pele, roupas, objetos).
    Aplica feathering nas bordas para transicao suave.
    """
    elemento = elemento.convert("RGBA")
    pixels = elemento.load()
    w, h = elemento.size

    for x in range(w):
        for y in range(h):
            r, g, b, a = pixels[x, y]
            if r >= limiar and g >= limiar and b >= limiar:
                brancura = min(r, g, b)
                alpha_novo = int(255 - ((brancura - limiar) / (255 - limiar)) * 255)
                pixels[x, y] = (r, g, b, alpha_novo)

    # Suavizar bordas do alpha
    r_ch, g_ch, b_ch, a_ch = elemento.split()
    a_ch = a_ch.filter(ImageFilter.SMOOTH)
    return Image.merge("RGBA", (r_ch, g_ch, b_ch, a_ch))


def carregar_fonte(estilo: str, tamanho: int) -> ImageFont.ImageFont:
    """Carrega fonte Poppins. Fallback para fonte padrao se nao encontrada."""
    fonte_path = str(FONTES[estilo])
    if not Path(fonte_path).exists():
        print(f"  Aviso: Fonte nao encontrada: {fonte_path}. Usando fonte padrao.")
        return ImageFont.load_default()
    return ImageFont.truetype(fonte_path, tamanho)


def quebrar_texto(draw: ImageDraw.ImageDraw, texto: str, fonte: ImageFont.ImageFont,
                  largura_max: int, max_linhas: int = None) -> list:
    """
    Quebra texto em linhas respeitando largura maxima.
    Se max_linhas definido, trunca com '...' na ultima linha.
    """
    palavras = texto.split()
    linhas = []
    linha_atual = []

    for palavra in palavras:
        linha_atual.append(palavra)
        linha_teste = " ".join(linha_atual)
        bbox = draw.textbbox((0, 0), linha_teste, font=fonte)
        if bbox[2] - bbox[0] > largura_max:
            if len(linha_atual) > 1:
                linha_atual.pop()
                linhas.append(" ".join(linha_atual))
                linha_atual = [palavra]
            else:
                linhas.append(linha_teste)
                linha_atual = []

    if linha_atual:
        linhas.append(" ".join(linha_atual))

    if max_linhas and len(linhas) > max_linhas:
        linhas = linhas[:max_linhas]
        if len(linhas[-1]) > 3:
            linhas[-1] = linhas[-1][:-3].rstrip() + "..."

    return linhas


def salvar_output(imagem: Image.Image, saida: str) -> None:
    """Salva imagem final como PNG RGB 72dpi sRGB."""
    Path(saida).parent.mkdir(parents=True, exist_ok=True)
    imagem = imagem.convert("RGB")
    imagem.save(saida, "PNG", dpi=(72, 72))
    print(f"  Post salvo em: {saida}")


def adicionar_logo_canto(imagem: Image.Image, tamanho_logo: int = 72,
                         margem: int = 28) -> Image.Image:
    """
    Adiciona logo no canto inferior esquerdo.
    Usa logo-sem-fundo.png (branco transparente).
    """
    resultado = imagem.copy()
    largura, altura = resultado.size

    logo_path = LOGOS["sem-fundo"] if LOGOS["sem-fundo"].exists() else LOGOS["padrao"]

    if not logo_path.exists():
        print(f"  Aviso: Logo nao encontrada: {logo_path}. Pulando camada de logo.")
        return resultado

    try:
        logo = Image.open(logo_path).convert("RGBA")
    except Exception as e:
        print(f"  Aviso: Erro ao carregar logo: {e}. Pulando camada de logo.")
        return resultado

    # Redimensionar proporcionalmente
    logo_w, logo_h = logo.size
    ratio = tamanho_logo / max(logo_w, logo_h)
    novo_w = int(logo_w * ratio)
    novo_h = int(logo_h * ratio)
    logo = logo.resize((novo_w, novo_h), Image.LANCZOS)

    # Posicionar bottom-left
    pos_x = margem
    pos_y = altura - novo_h - margem
    resultado.paste(logo, (pos_x, pos_y), logo)
    return resultado


def adicionar_assinatura_canto(imagem: Image.Image, assinatura: str,
                                cor_texto: tuple, tamanho: int = 26,
                                margem: int = 28) -> Image.Image:
    """
    Adiciona assinatura no canto inferior direito (Poppins Regular).
    """
    resultado = imagem.copy()
    draw = ImageDraw.Draw(resultado)
    largura, altura = resultado.size

    fonte = carregar_fonte("regular", tamanho)
    bbox = draw.textbbox((0, 0), assinatura, font=fonte)
    largura_texto = bbox[2] - bbox[0]
    altura_texto = bbox[3] - bbox[1]

    pos_x = largura - largura_texto - margem
    pos_y = altura - altura_texto - margem

    draw.text((pos_x, pos_y), assinatura, font=fonte, fill=cor_texto)
    return resultado


# ============================================================
# MONTAGEM POR FORMATO — FUNCOES INDEPENDENTES
# ============================================================

def montar_VE(elemento_path: str, texto: str, assinatura: str,
              modo: str, saida: str) -> None:
    """
    VE — Visual Educativo
    ---------------------
    Fundo: verde #03bb85
    Elemento: centralizado, ocupa 65% da tela, deslocado levemente para baixo (centro optico)
    Texto: top-left, margem 56px, largura max 420px, Poppins Bold 44px, branco, max 2 linhas
    Assinatura: bottom-right, 28px margem, Poppins Regular 26px, branco
    Logo: bottom-left, 28px margem, 72px
    """
    largura, altura = DIMENSOES.get(modo, DIMENSOES["feed"])
    COR_FUNDO = CORES["verde"]
    COR_TEXTO = (255, 255, 255)  # branco

    print("  [1/5] Gerando fundo verde...")
    imagem = Image.new("RGBA", (largura, altura), COR_FUNDO + (255,))

    # --- ELEMENTO (heroi) ---
    print("  [2/5] Compondo elemento heroi...")
    try:
        elemento = Image.open(elemento_path).convert("RGBA")
    except FileNotFoundError:
        print(f"  ERRO: Elemento nao encontrado: {elemento_path}")
        sys.exit(1)

    elemento = remover_fundo_branco(elemento)

    # Ocupar 65% da dimensao menor
    max_dim = int(min(largura, altura) * 0.65)
    elem_w, elem_h = elemento.size
    ratio = min(max_dim / elem_w, max_dim / elem_h)
    novo_w = int(elem_w * ratio)
    novo_h = int(elem_h * ratio)
    elemento = elemento.resize((novo_w, novo_h), Image.LANCZOS)

    # Centro optico: centralizado horizontalmente, levemente abaixo do centro vertical
    pos_x = (largura - novo_w) // 2
    pos_y = int((altura - novo_h) // 2 + altura * 0.05)  # 5% abaixo do centro
    imagem.paste(elemento, (pos_x, pos_y), elemento)

    imagem = imagem.convert("RGB")

    # --- TEXTO (top-left) ---
    print("  [3/5] Adicionando texto top-left...")
    draw = ImageDraw.Draw(imagem)
    fonte_texto = carregar_fonte("bold", 44)
    margem_texto = 56
    largura_max_texto = 420

    linhas = quebrar_texto(draw, texto, fonte_texto, largura_max_texto, max_linhas=2)
    altura_linha = 44 + 10  # tamanho + espaco
    pos_y_texto = margem_texto

    for linha in linhas:
        draw.text((margem_texto, pos_y_texto), linha, font=fonte_texto, fill=COR_TEXTO)
        pos_y_texto += altura_linha

    # --- ASSINATURA (bottom-right) ---
    print("  [4/5] Adicionando assinatura bottom-right...")
    imagem = adicionar_assinatura_canto(imagem, assinatura, COR_TEXTO,
                                        tamanho=26, margem=28)

    # --- LOGO (bottom-left) ---
    print("  [5/5] Adicionando logo bottom-left...")
    imagem = adicionar_logo_canto(imagem, tamanho_logo=72, margem=28)

    salvar_output(imagem, saida)


def montar_QC(texto: str, subtexto: str, assinatura: str,
              modo: str, saida: str) -> None:
    """
    QC — Quote Card (tipografia pura — SEM elemento artistico externo)
    ------------------------------------------------------------------
    Fundo: branco #FFFFFF
    Texto principal: centralizado vertical e horizontal, Poppins Bold #1A1A1A 52px, max 3 linhas
    Subtexto: abaixo do texto, Poppins Regular 28px, cor #666666
    Assinatura: bottom-right, 28px margem, Poppins Regular 26px, #1A1A1A
    Logo: bottom-left, 28px margem, 72px (versao preta)
    """
    largura, altura = DIMENSOES.get(modo, DIMENSOES["feed"])
    COR_FUNDO = CORES["branco"]
    COR_TEXTO_PRINCIPAL = (26, 26, 26)    # #1A1A1A
    COR_SUBTEXTO = (102, 102, 102)        # #666666
    COR_ASSINATURA = (26, 26, 26)         # #1A1A1A

    print("  [1/4] Gerando fundo branco...")
    imagem = Image.new("RGB", (largura, altura), COR_FUNDO)

    draw = ImageDraw.Draw(imagem)

    # --- TEXTO PRINCIPAL (centralizado) ---
    print("  [2/4] Compondo texto principal centralizado...")
    fonte_principal = carregar_fonte("bold", 52)
    margem_lateral = 100
    largura_max = largura - (margem_lateral * 2)

    linhas = quebrar_texto(draw, texto, fonte_principal, largura_max, max_linhas=3)
    altura_linha_principal = 52 + 16  # tamanho + espaco
    altura_bloco_texto = len(linhas) * altura_linha_principal

    # Calcular subtexto se existir
    altura_subtexto_bloco = 0
    fonte_subtexto = None
    linhas_subtexto = []
    if subtexto:
        fonte_subtexto = carregar_fonte("regular", 28)
        linhas_subtexto = quebrar_texto(draw, subtexto, fonte_subtexto, largura_max)
        altura_subtexto_bloco = len(linhas_subtexto) * (28 + 8) + 24  # +24 espacamento entre blocos

    # Altura total do bloco central
    altura_total = altura_bloco_texto + altura_subtexto_bloco
    pos_y = (altura - altura_total) // 2  # centralizado verticalmente

    # Desenhar texto principal (centralizado horizontalmente)
    for linha in linhas:
        bbox = draw.textbbox((0, 0), linha, font=fonte_principal)
        largura_linha = bbox[2] - bbox[0]
        pos_x = (largura - largura_linha) // 2
        draw.text((pos_x, pos_y), linha, font=fonte_principal, fill=COR_TEXTO_PRINCIPAL)
        pos_y += altura_linha_principal

    # Desenhar subtexto abaixo
    if subtexto and fonte_subtexto:
        print("  [3/4] Adicionando subtexto...")
        pos_y += 24  # espaco entre texto e subtexto
        for linha in linhas_subtexto:
            bbox = draw.textbbox((0, 0), linha, font=fonte_subtexto)
            largura_linha = bbox[2] - bbox[0]
            pos_x = (largura - largura_linha) // 2
            draw.text((pos_x, pos_y), linha, font=fonte_subtexto, fill=COR_SUBTEXTO)
            pos_y += 28 + 8
    else:
        print("  [3/4] Sem subtexto.")

    # --- ASSINATURA (bottom-right) ---
    print("  [4/4] Adicionando assinatura e logo...")
    imagem = adicionar_assinatura_canto(imagem, assinatura, COR_ASSINATURA,
                                        tamanho=26, margem=28)

    # Logo no QC: usa a mesma logo-sem-fundo mas sobre fundo branco ela fica invisivel.
    # Tentamos carregar e se simbolo for branco puro, coloca uma versao escura.
    # Por ora: usa adicionar_logo_canto com a logo padrao (fallback para 01.png que tem fundo verde).
    imagem = adicionar_logo_canto(imagem, tamanho_logo=72, margem=28)

    salvar_output(imagem, saida)


def montar_MT(elemento_path: str, texto: str, assinatura: str,
              modo: str, saida: str) -> None:
    """
    MT — Meme / Tirinha P&B
    -----------------------
    Fundo: branco #FFFFFF
    Elemento: centralizado, ocupa 60% da tela, posicao centro-baixo
    Texto: top-left, margem 48px, largura max 400px, Poppins Bold #1A1A1A 40px, max 2 linhas
    Assinatura: bottom-right, 28px margem, Poppins Regular 26px, #1A1A1A
    Logo: bottom-left, 28px margem, 72px (versao preta — usa fallback 01.png)
    """
    largura, altura = DIMENSOES.get(modo, DIMENSOES["feed"])
    COR_FUNDO = CORES["branco"]
    COR_TEXTO = (26, 26, 26)  # #1A1A1A

    print("  [1/5] Gerando fundo branco...")
    imagem = Image.new("RGBA", (largura, altura), COR_FUNDO + (255,))

    # --- ELEMENTO (centro-baixo) ---
    print("  [2/5] Compondo elemento heroi (centro-baixo)...")
    try:
        elemento = Image.open(elemento_path).convert("RGBA")
    except FileNotFoundError:
        print(f"  ERRO: Elemento nao encontrado: {elemento_path}")
        sys.exit(1)

    elemento = remover_fundo_branco(elemento)

    # Ocupar 60% da dimensao menor
    max_dim = int(min(largura, altura) * 0.60)
    elem_w, elem_h = elemento.size
    ratio = min(max_dim / elem_w, max_dim / elem_h)
    novo_w = int(elem_w * ratio)
    novo_h = int(elem_h * ratio)
    elemento = elemento.resize((novo_w, novo_h), Image.LANCZOS)

    # Centro-baixo: centralizado horizontalmente, parte inferior da tela
    pos_x = (largura - novo_w) // 2
    # Posicionar o elemento de modo que o centro fique a 65% da altura total
    centro_y_alvo = int(altura * 0.65)
    pos_y = centro_y_alvo - (novo_h // 2)
    pos_y = max(pos_y, 0)  # nao sair da tela

    imagem.paste(elemento, (pos_x, pos_y), elemento)
    imagem = imagem.convert("RGB")

    # --- TEXTO (top-left) ---
    print("  [3/5] Adicionando texto top-left...")
    draw = ImageDraw.Draw(imagem)
    fonte_texto = carregar_fonte("bold", 40)
    margem_texto = 48
    largura_max_texto = 400

    linhas = quebrar_texto(draw, texto, fonte_texto, largura_max_texto, max_linhas=2)
    altura_linha = 40 + 10
    pos_y_texto = margem_texto

    for linha in linhas:
        draw.text((margem_texto, pos_y_texto), linha, font=fonte_texto, fill=COR_TEXTO)
        pos_y_texto += altura_linha

    # --- ASSINATURA (bottom-right) ---
    print("  [4/5] Adicionando assinatura bottom-right...")
    imagem = adicionar_assinatura_canto(imagem, assinatura, COR_TEXTO,
                                        tamanho=26, margem=28)

    # --- LOGO (bottom-left) ---
    print("  [5/5] Adicionando logo bottom-left...")
    imagem = adicionar_logo_canto(imagem, tamanho_logo=72, margem=28)

    salvar_output(imagem, saida)


# ============================================================
# PROMPTS DALL-E
# ============================================================

def mostrar_prompt_dalle(formato: str) -> None:
    """Exibe o prompt DALL-E para o formato escolhido."""
    if formato == "QC":
        print("\n" + "="*60)
        print("QC e tipografia pura -- nao precisa de elemento DALL-E.")
        print("Use --texto e --subtexto.")
        print("="*60 + "\n")
        sys.exit(0)

    prompt = PROMPTS_DALLE.get(formato)
    if prompt:
        print("\n" + "="*60)
        print(f"PROMPT DALL-E para o formato {formato}:")
        print("="*60)
        print(prompt.strip())
        print("="*60)
        print("\nCopie o prompt acima, va ao ChatGPT, peca a imagem,")
        print("baixe o PNG e informe o caminho em --elemento\n")
    else:
        print(f"  Prompt DALL-E nao cadastrado para o formato '{formato}'.")
        print("  Use qualquer elemento PNG que desejar em --elemento")


# ============================================================
# CLI
# ============================================================

def criar_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="compositor.py",
        description="Compositor de imagens Dra. Julia Resende -- monta posts estilo Dove.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos:
  # Ver prompt DALL-E para formato VE:
  python compositor.py --formato VE --prompt-dalle

  # Compor post VE com elemento baixado do ChatGPT:
  python compositor.py --formato VE --elemento elemento.png --texto "7 minutos por dia mudam tudo" --saida post-VE.png

  # Formato QC (tipografia pura -- sem elemento):
  python compositor.py --formato QC --texto "A rotina e o abraco invisivel" --subtexto "Dra. Julia Resende" --saida post-QC.png

  # Formato MT (meme/tirinha):
  python compositor.py --formato MT --elemento meme.png --texto "Quando voce tenta 5 minutos de paz" --saida post-MT.png

Formatos disponiveis:
  VE  = Visual Educativo (fundo verde)
  QC  = Quote Card (fundo branco, tipografia pura)
  MT  = Meme/Tirinha P&B (fundo branco)
  PSW = Prova Social WhatsApp (fundo escuro)
  EC  = Educativo Conceitual (fundo verde)
  CI  = Carrossel Informativo (fundo verde)
  DP  = Dado + Problema (fundo verde)
  DT  = Dica Pratica (fundo verde)
  BI  = Bio / Apresentacao (fundo branco)
  CV  = CTA de Venda (fundo verde)
        """
    )

    parser.add_argument("--formato", "-f", required=False,
                        choices=list(FORMATOS.keys()), metavar="FORMATO",
                        help="Codigo do formato (VE, QC, MT, etc.)")
    parser.add_argument("--elemento", "-e",
                        help="Caminho do PNG gerado pelo DALL-E (baixado do ChatGPT). Ignorado para QC.")
    parser.add_argument("--texto", "-t",
                        help="Texto principal do post")
    parser.add_argument("--subtexto",
                        help="Linha de apoio abaixo do texto principal (somente QC)")
    parser.add_argument("--saida", "-s",
                        help="Caminho onde o post final sera salvo (ex: post-final.png)")
    parser.add_argument("--assinatura", default="@drjuliaresende",
                        help="Texto da assinatura (padrao: @drjuliaresende)")
    parser.add_argument("--modo", choices=["feed", "story"], default="feed",
                        help="Dimensao do output: feed=1080x1080 (padrao) | story=1080x1920")
    parser.add_argument("--prompt-dalle", action="store_true",
                        help="Exibe o prompt DALL-E para o formato escolhido e encerra")
    parser.add_argument("--ajuda", action="store_true",
                        help="Exibe esta ajuda")

    return parser


def main():
    parser = criar_parser()

    if "--ajuda" in sys.argv:
        parser.print_help()
        sys.exit(0)

    args = parser.parse_args()

    # Modo: so mostrar prompt DALL-E
    if args.prompt_dalle:
        if not args.formato:
            print("  ERRO: Informe --formato junto com --prompt-dalle")
            sys.exit(1)
        mostrar_prompt_dalle(args.formato)
        sys.exit(0)

    # Validacoes basicas
    if not args.formato:
        print("  ERRO: --formato e obrigatorio (ex: --formato VE)")
        sys.exit(1)
    if not args.texto:
        print("  ERRO: --texto e obrigatorio (texto principal do post)")
        sys.exit(1)
    if not args.saida:
        print("  ERRO: --saida e obrigatorio (caminho do arquivo final)")
        sys.exit(1)

    # Aviso: --elemento passado para QC sera ignorado
    if args.formato == "QC" and args.elemento:
        print("  Aviso: QC e tipografia pura. --elemento sera ignorado.")

    # Elemento obrigatorio para formatos com heroi visual
    if args.formato not in ("QC",) and not args.elemento:
        print(f"  ERRO: --elemento e obrigatorio para o formato {args.formato}")
        sys.exit(1)

    formato_info = FORMATOS[args.formato]

    print(f"\nCompositor Dra. Julia Resende — estilo Dove")
    print(f"  Formato  : {args.formato} — {formato_info['nome']}")
    print(f"  Modo     : {args.modo} {DIMENSOES[args.modo]}")
    if args.elemento and args.formato != "QC":
        print(f"  Elemento : {args.elemento}")
    print(f"  Texto    : {args.texto}")
    if args.subtexto:
        print(f"  Subtexto : {args.subtexto}")
    print()

    # DESPACHAR PARA FUNCAO DO FORMATO
    if args.formato == "VE":
        montar_VE(
            elemento_path=args.elemento,
            texto=args.texto,
            assinatura=args.assinatura,
            modo=args.modo,
            saida=args.saida,
        )

    elif args.formato == "QC":
        montar_QC(
            texto=args.texto,
            subtexto=args.subtexto or "",
            assinatura=args.assinatura,
            modo=args.modo,
            saida=args.saida,
        )

    elif args.formato == "MT":
        montar_MT(
            elemento_path=args.elemento,
            texto=args.texto,
            assinatura=args.assinatura,
            modo=args.modo,
            saida=args.saida,
        )

    else:
        # Formatos sem template proprio ainda — usa VE como base com fundo do formato
        print(f"  Aviso: Formato {args.formato} ainda nao tem template proprio.")
        print(f"  Usando logica base do VE com fundo {formato_info['fundo']}.")
        montar_VE(
            elemento_path=args.elemento,
            texto=args.texto,
            assinatura=args.assinatura,
            modo=args.modo,
            saida=args.saida,
        )

    print(f"\nPronto! Abra o arquivo para validar:")
    print(f"  {Path(args.saida).resolve()}\n")


if __name__ == "__main__":
    main()

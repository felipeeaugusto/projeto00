# -*- coding: utf-8 -*-
"""
carrossel.py — Gerador de carrossel 6 slides para @drjuliaresende
Estilo inspirado em Academia Lendária (ref00/1.1.png a 1.6.png)
Paleta: fundo #0a2e2a, accent #03bb85, texto #FFFFFF, apoio #a0c4b8
"""

import os
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# ──────────────────────────────────────────────
# PATHS
# ──────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent
ASSETS_DIR = BASE_DIR.parent / "assets"
FONTS_DIR = Path("C:/Users/felip/projeto00/assets/fonts")
OUTPUT_DIR = BASE_DIR / "carrossel"

LOGO_PATH = ASSETS_DIR / "logo-sem-fundo.png"

# ──────────────────────────────────────────────
# PALETA
# ──────────────────────────────────────────────
BG        = "#0a2e2a"
ACCENT    = "#03bb85"
WHITE     = "#FFFFFF"
SUPPORT   = "#a0c4b8"
CARD_BG   = "#FFFFFF"
CARD_TEXT = "#1A1A1A"
CARD_TS   = "#999999"
CARD_NAME = "#03bb85"
FOOTER_BG = "#1a4a3a"
SLIDE_NUM = "#a0c4b8"

SIZE = (1080, 1080)

# ──────────────────────────────────────────────
# FONTES
# ──────────────────────────────────────────────
def load_fonts():
    fonts = {}
    try:
        fonts["bold_80"]   = ImageFont.truetype(str(FONTS_DIR / "Poppins-Bold.ttf"), 80)
        fonts["bold_64"]   = ImageFont.truetype(str(FONTS_DIR / "Poppins-Bold.ttf"), 64)
        fonts["bold_56"]   = ImageFont.truetype(str(FONTS_DIR / "Poppins-Bold.ttf"), 56)
        fonts["bold_34"]   = ImageFont.truetype(str(FONTS_DIR / "Poppins-Bold.ttf"), 34)
        fonts["bold_28"]   = ImageFont.truetype(str(FONTS_DIR / "Poppins-Bold.ttf"), 28)
        fonts["bold_26"]   = ImageFont.truetype(str(FONTS_DIR / "Poppins-Bold.ttf"), 26)
        fonts["bold_120"]  = ImageFont.truetype(str(FONTS_DIR / "Poppins-Bold.ttf"), 120)
        fonts["bold_90"]   = ImageFont.truetype(str(FONTS_DIR / "Poppins-Bold.ttf"), 90)
        fonts["reg_36"]    = ImageFont.truetype(str(FONTS_DIR / "Poppins-Regular.ttf"), 36)
        fonts["reg_32"]    = ImageFont.truetype(str(FONTS_DIR / "Poppins-Regular.ttf"), 32)
        fonts["reg_30"]    = ImageFont.truetype(str(FONTS_DIR / "Poppins-Regular.ttf"), 30)
        fonts["reg_28"]    = ImageFont.truetype(str(FONTS_DIR / "Poppins-Regular.ttf"), 28)
        fonts["reg_24"]    = ImageFont.truetype(str(FONTS_DIR / "Poppins-Regular.ttf"), 24)
        fonts["reg_22"]    = ImageFont.truetype(str(FONTS_DIR / "Poppins-Regular.ttf"), 22)
        fonts["reg_38"]    = ImageFont.truetype(str(FONTS_DIR / "Poppins-Regular.ttf"), 38)
        fonts["semi_28"]   = ImageFont.truetype(str(FONTS_DIR / "Poppins-SemiBold.ttf"), 28)
    except Exception as e:
        print(f"[AVISO] Erro ao carregar Poppins: {e}. Usando fonte padrão.")
        default = ImageFont.load_default()
        for key in ["bold_80","bold_64","bold_56","bold_34","bold_28","bold_26",
                    "bold_120","bold_90","reg_36","reg_32","reg_30","reg_28",
                    "reg_24","reg_22","reg_38","semi_28"]:
            fonts[key] = default
    return fonts

# ──────────────────────────────────────────────
# HELPERS
# ──────────────────────────────────────────────
def new_canvas():
    img = Image.new("RGB", SIZE, BG)
    draw = ImageDraw.Draw(img)
    return img, draw

def draw_header(draw, fonts, left_text="@drjuliaresende", right_text="All rights reserved"):
    """Linha superior: handle esq, copyright dir."""
    draw.text((48, 44), left_text,  font=fonts["reg_22"], fill=SUPPORT)
    w = draw.textlength(right_text, font=fonts["reg_22"])
    draw.text((SIZE[0] - 48 - w, 44), right_text, font=fonts["reg_22"], fill=SUPPORT)

def draw_footer_swipe(draw, fonts, y=None):
    """Botao 'Deslize para o lado >' no canto inferior direito."""
    if y is None:
        y = SIZE[1] - 80
    label = "Deslize para o lado  >"
    font = fonts["reg_24"]
    tw = draw.textlength(label, font=font)
    pad_x, pad_y = 28, 14
    rx1 = SIZE[0] - 48 - tw - pad_x * 2
    ry1 = y - pad_y
    rx2 = SIZE[0] - 48
    ry2 = y + 32 + pad_y
    draw.rounded_rectangle([rx1, ry1, rx2, ry2], radius=20, fill=FOOTER_BG)
    draw.text((rx1 + pad_x, y), label, font=font, fill=WHITE)

def draw_slide_number(draw, fonts, number, y=None):
    """Indicador de slide: • • N • •"""
    if y is None:
        y = SIZE[1] - 148
    dots = []
    total = 6
    for i in range(1, total + 1):
        if i == number:
            dots.append(str(i))
        else:
            dots.append("•")
    label = "  ".join(dots)
    font = fonts["reg_22"]
    tw = draw.textlength(label, font=font)
    draw.text(((SIZE[0] - tw) / 2, y), label, font=font, fill=SLIDE_NUM)

def draw_logo(img, size=60, position="bottom_left"):
    """Desenha logo no canto."""
    if not LOGO_PATH.exists():
        return
    try:
        logo = Image.open(LOGO_PATH).convert("RGBA")
        logo = logo.resize((size, size), Image.LANCZOS)
        if position == "bottom_left":
            pos = (48, SIZE[1] - size - 40)
        else:
            pos = (SIZE[0] - size - 48, SIZE[1] - size - 40)
        img.paste(logo, pos, logo)
    except Exception as e:
        print(f"[AVISO] Erro ao carregar logo: {e}")

def wrap_text(text, font, draw, max_width):
    """Quebra texto em linhas que caibam em max_width."""
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = (current + " " + word).strip()
        if draw.textlength(test, font=font) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines

def text_height(font):
    """Altura estimada de uma linha."""
    bbox = font.getbbox("Ay")
    return bbox[3] - bbox[1]

def draw_whatsapp_card(img, draw, fonts, name, message, timestamp, reaction,
                       top_y=260, card_width_pct=0.82):
    """Card estilo WhatsApp com fundo branco e cantos arredondados."""
    card_w = int(SIZE[0] * card_width_pct)
    card_x = (SIZE[0] - card_w) // 2
    pad = 36
    inner_w = card_w - pad * 2

    # Calcular altura total do card
    name_h   = text_height(fonts["bold_26"]) + 10
    msg_font = fonts["reg_28"]
    lines    = wrap_text(message, msg_font, draw, inner_w)
    line_h   = text_height(msg_font) + 8
    msg_h    = len(lines) * line_h + 10
    ts_h     = text_height(fonts["reg_22"]) + 8
    react_h  = text_height(fonts["reg_22"]) + 12
    card_h   = pad + name_h + msg_h + ts_h + react_h + pad

    card_x2 = card_x + card_w
    card_y2 = top_y + card_h
    draw.rounded_rectangle([card_x, top_y, card_x2, card_y2],
                            radius=20, fill=CARD_BG)

    # Nome
    cy = top_y + pad
    draw.text((card_x + pad, cy), name, font=fonts["bold_26"], fill=CARD_NAME)
    cy += name_h

    # Mensagem (wrap)
    for line in lines:
        draw.text((card_x + pad, cy), line, font=msg_font, fill=CARD_TEXT)
        cy += line_h
    cy += 4

    # Timestamp (dir)
    ts_w = draw.textlength(timestamp, font=fonts["reg_22"])
    draw.text((card_x2 - pad - ts_w, cy), timestamp, font=fonts["reg_22"], fill=CARD_TS)
    cy += ts_h

    # Reação
    draw.text((card_x + pad, cy), reaction, font=fonts["reg_22"], fill=CARD_TS)

    return card_y2

# ──────────────────────────────────────────────
# SLIDE 1 — HOOK
# ──────────────────────────────────────────────
def slide_01(fonts):
    img, draw = new_canvas()
    draw_header(draw, fonts)

    # Bloco principal — começa em y=200
    cy = 200

    # "Tem" + "mãe" em bold 80
    line1 = "Tem"
    line2 = "mãe"
    lh = text_height(fonts["bold_80"])
    draw.text((80, cy), line1, font=fonts["bold_80"], fill=WHITE)
    cy += lh + 8
    draw.text((80, cy), line2, font=fonts["bold_80"], fill=WHITE)
    cy += lh + 40

    # Checklist
    checklist = [
        "Que já tentou de tudo",
        "Que ainda não viu resultado",
        "Que quer parar de improvisar",
    ]
    check_font = fonts["reg_36"]
    check_h = text_height(check_font)
    bullet_size = 28
    for item in checklist:
        # Bullet verde desenhado — tick via linhas
        bx = 80
        by = cy + (check_h - bullet_size) // 2
        draw.rounded_rectangle([bx, by, bx + bullet_size, by + bullet_size],
                                radius=6, fill=ACCENT)
        # Desenha tick (V) com duas linhas
        cx0 = bx + 7
        cy0 = by + 14
        cx1 = bx + 12
        cy1 = by + 20
        cx2 = bx + 21
        cy2 = by + 8
        draw.line([(cx0, cy0), (cx1, cy1)], fill=WHITE, width=3)
        draw.line([(cx1, cy1), (cx2, cy2)], fill=WHITE, width=3)
        draw.text((bx + bullet_size + 16, cy), item, font=check_font, fill=WHITE)
        cy += check_h + 20
    cy += 36

    # Texto de conclusão
    part1 = "A diferença está em "
    part2 = "começar."
    tw1 = draw.textlength(part1, font=fonts["reg_36"])
    draw.text((80, cy), part1, font=fonts["reg_36"], fill=WHITE)
    draw.text((80 + tw1, cy), part2, font=fonts["bold_34"], fill=ACCENT)

    draw_footer_swipe(draw, fonts)
    draw_logo(img, size=56)
    return img

# ──────────────────────────────────────────────
# SLIDE 2 — DEPOIMENTO 1
# ──────────────────────────────────────────────
def slide_02(fonts):
    img, draw = new_canvas()
    draw_header(draw, fonts)

    # Headline
    headline = "Quando a rotina funciona."
    draw.text((80, 160), headline, font=fonts["bold_56"], fill=WHITE)

    # Card
    draw_whatsapp_card(
        img, draw, fonts,
        name="~ Ana Paula",
        message="Minha filha de 4 anos dormiu no horário pela primeira vez em meses. "
                "Segui só o passo 1 da rotina. Não acreditei quando aconteceu.",
        timestamp="21:14",
        reaction="(coracao) 3",
        top_y=300,
    )

    draw_slide_number(draw, fonts, 2)
    draw_footer_swipe(draw, fonts)
    draw_logo(img, size=56)
    return img

# ──────────────────────────────────────────────
# SLIDE 3 — DEPOIMENTO 2
# ──────────────────────────────────────────────
def slide_03(fonts):
    img, draw = new_canvas()
    draw_header(draw, fonts)

    headline = "A virada foi real."
    draw.text((80, 160), headline, font=fonts["bold_56"], fill=WHITE)

    draw_whatsapp_card(
        img, draw, fonts,
        name="~ Camila M.",
        message="Eu chorei quando vi meu filho me agradecer pela rotina. Ele tem 6 anos. "
                "Disse que gosta quando a casa tem hora certa. Nunca imaginei que 7 minutos "
                "por dia fariam isso.",
        timestamp="08:47",
        reaction="(coracao) (maos) 5",
        top_y=300,
    )

    draw_slide_number(draw, fonts, 3)
    draw_footer_swipe(draw, fonts)
    draw_logo(img, size=56)
    return img

# ──────────────────────────────────────────────
# SLIDE 4 — DADO / RESULTADO
# ──────────────────────────────────────────────
def slide_04(fonts):
    img, draw = new_canvas()
    draw_header(draw, fonts)

    # Número gigante centralizado
    num = "15.000"
    nw = draw.textlength(num, font=fonts["bold_120"])
    ny = 220
    draw.text(((SIZE[0] - nw) / 2, ny), num, font=fonts["bold_120"], fill=WHITE)

    # Subtexto
    sub = "mães que transformaram a rotina"
    sw = draw.textlength(sub, font=fonts["reg_38"])
    sy = ny + text_height(fonts["bold_120"]) + 16
    draw.text(((SIZE[0] - sw) / 2, sy), sub, font=fonts["reg_38"], fill=WHITE)

    # Linha separadora
    sep_y = sy + text_height(fonts["reg_38"]) + 40
    draw.line([(120, sep_y), (SIZE[0] - 120, sep_y)], fill=ACCENT, width=3)

    # Texto abaixo
    below = "Em menos de 30 dias de método."
    bw = draw.textlength(below, font=fonts["reg_32"])
    by = sep_y + 36
    draw.text(((SIZE[0] - bw) / 2, by), below, font=fonts["reg_32"], fill=SUPPORT)

    draw_slide_number(draw, fonts, 4)
    draw_footer_swipe(draw, fonts)
    draw_logo(img, size=56)
    return img

# ──────────────────────────────────────────────
# SLIDE 5 — DEPOIMENTO 3
# ──────────────────────────────────────────────
def slide_05(fonts):
    img, draw = new_canvas()
    draw_header(draw, fonts)

    headline = "Execução gera resultado."
    draw.text((80, 160), headline, font=fonts["bold_56"], fill=WHITE)

    draw_whatsapp_card(
        img, draw, fonts,
        name="~ Fernanda S.",
        message="Estava com 3 clientes projetos pra fazer hoje. Consegui organizar tudo "
                "usando a rotina da Julia. Minha chefe perguntou o que tinha mudado.",
        timestamp="04:28",
        reaction="(coracao) (aviao) (foguete) 5",
        top_y=300,
    )

    draw_slide_number(draw, fonts, 5)
    draw_footer_swipe(draw, fonts)
    draw_logo(img, size=56)
    return img

# ──────────────────────────────────────────────
# SLIDE 6 — CTA
# ──────────────────────────────────────────────
def slide_06(fonts):
    img, draw = new_canvas()

    # "All rights reserved" topo direita (sem handle esq no CTA)
    rr = "All rights reserved"
    rw = draw.textlength(rr, font=fonts["reg_22"])
    draw.text((SIZE[0] - 48 - rw, 44), rr, font=fonts["reg_22"], fill=SUPPORT)

    # Ano topo esquerda
    draw.text((48, 44), "2026", font=fonts["reg_22"], fill=SUPPORT)

    # Badge circular: "Turma" + "003" + "últimas vagas"
    badge_cx = SIZE[0] // 2
    badge_cy = 210
    badge_r  = 90

    # Anel accent
    draw.ellipse(
        [badge_cx - badge_r, badge_cy - badge_r,
         badge_cx + badge_r, badge_cy + badge_r],
        outline=ACCENT, width=4
    )

    # "Turma" acima do número
    turma_txt = "Turma"
    turma_font = fonts["reg_22"]
    tw = draw.textlength(turma_txt, font=turma_font)
    draw.text((badge_cx - tw / 2, badge_cy - badge_r + 18), turma_txt,
              font=turma_font, fill=SUPPORT)

    # "003"
    num_txt  = "003"
    num_font = fonts["bold_90"]
    nh = text_height(num_font)
    nw = draw.textlength(num_txt, font=num_font)
    draw.text((badge_cx - nw / 2, badge_cy - nh / 2 + 6), num_txt,
              font=num_font, fill=WHITE)

    # "últimas vagas" abaixo
    uv_txt  = "últimas vagas"
    uv_font = fonts["reg_22"]
    uw = draw.textlength(uv_txt, font=uv_font)
    draw.text((badge_cx - uw / 2, badge_cy + badge_r - 34), uv_txt,
              font=uv_font, fill=SUPPORT)

    # Espaço após badge
    cy = badge_cy + badge_r + 52

    # "O Poder da Rotina" — italic via regular (fallback: regular + cor accent)
    brand_txt  = "O Poder da Rotina"
    brand_font = fonts["bold_34"]
    bw = draw.textlength(brand_txt, font=brand_font)
    draw.text(((SIZE[0] - bw) / 2, cy), brand_txt, font=brand_font, fill=ACCENT)
    cy += text_height(brand_font) + 16

    # Headline: "Pare de" + "improvisar"
    h1 = "Pare de"
    h2 = "improvisar"
    h_font = fonts["bold_64"]
    hh = text_height(h_font)
    h1w = draw.textlength(h1, font=h_font)
    h2w = draw.textlength(h2, font=h_font)
    draw.text(((SIZE[0] - h1w) / 2, cy), h1,  font=h_font, fill=WHITE)
    cy += hh + 6
    draw.text(((SIZE[0] - h2w) / 2, cy), h2, font=h_font, fill=WHITE)
    cy += hh + 32

    # Subtexto (wrapped)
    sub = ("Comece a construir a rotina que sua família merece. "
           "O ebook já está disponível!")
    sub_font = fonts["reg_30"]
    sub_lines = wrap_text(sub, sub_font, draw, SIZE[0] - 160)
    sub_lh = text_height(sub_font) + 8
    for line in sub_lines:
        lw = draw.textlength(line, font=sub_font)
        draw.text(((SIZE[0] - lw) / 2, cy), line, font=sub_font, fill=SUPPORT)
        cy += sub_lh
    cy += 40

    # Botão CTA
    btn_label = ">> Link na BIO para garantir!"
    btn_font  = fonts["bold_28"]
    btw = draw.textlength(btn_label, font=btn_font)
    btn_pad_x, btn_pad_y = 48, 20
    btn_w = btw + btn_pad_x * 2
    btn_h = text_height(btn_font) + btn_pad_y * 2
    btn_x = (SIZE[0] - btn_w) / 2
    draw.rounded_rectangle(
        [btn_x, cy, btn_x + btn_w, cy + btn_h],
        radius=30, fill=ACCENT
    )
    draw.text((btn_x + btn_pad_x, cy + btn_pad_y), btn_label,
              font=btn_font, fill=WHITE)

    # Logo canto inferior esquerdo
    draw_logo(img, size=60)
    return img

# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────
def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print("Carregando fontes...")
    fonts = load_fonts()

    slides = [
        ("slide-01.png", slide_01),
        ("slide-02.png", slide_02),
        ("slide-03.png", slide_03),
        ("slide-04.png", slide_04),
        ("slide-05.png", slide_05),
        ("slide-06.png", slide_06),
    ]

    generated = []
    for filename, fn in slides:
        print(f"  Gerando {filename}...")
        img = fn(fonts)
        out_path = OUTPUT_DIR / filename
        img.save(str(out_path), "PNG")
        generated.append(str(out_path))
        print(f"  OK: {out_path}")

    print()
    print("Carrossel gerado: 6 slides em squads/dr-julia-resende/scripts/carrossel/")
    print()
    for p in generated:
        print(f"   {p}")

if __name__ == "__main__":
    main()

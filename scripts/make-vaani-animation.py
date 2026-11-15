"""Render the /try-ai-call hero animation: Vaani, an AI admission counsellor with a headset,
talking and blinking, with a live waveform and four icon cards that pop in turn (graduation
cap, chat, calendar check, star). Seamless 4 s loop, transparent background, 12 fps, 300 px.

Kept small on purpose (about 270 KB): anything that moves across the whole canvas makes every
frame change edge to edge and multiplies the file size, so the voice rings and the gentle bob
are CSS on the page (VaaniAnimation in src/components/TryAiCallVisuals.tsx), not baked in.
No text either: Pillow without libraqm cannot shape Indic scripts, so greetings stay in HTML.

usage: python scripts/make-vaani-animation.py public/try-ai-call [--sheet]   (needs Pillow)
writes vaani.webp and vaani-still.webp (the reduced-motion frame); --sheet adds a 4-frame
review sheet, vaani-sheet.png, which should not be committed.
"""
import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

OUT = Path(next(a for a in sys.argv[1:] if not a.startswith("--")))
OUT.mkdir(parents=True, exist_ok=True)

SIZE = 300          # final px
SS = 2              # supersampling
W = SIZE * SS
FPS = 12
T = 4.0             # loop seconds
N = int(FPS * T)

INK = (10, 15, 28)
BRAND = (20, 196, 124)
BRAND_300 = (111, 223, 171)
BRAND_700 = (10, 134, 86)
PAPER = (245, 247, 250)
AMBER = (245, 165, 36)
SKY = (59, 130, 246)
VIOLET = (124, 108, 242)
SKIN_SHADOW = (226, 232, 240)
DARK = (10, 15, 28)

cx, cy = W // 2, int(W * 0.47)
R = int(W * 0.24)   # avatar radius


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(len(a)))


def radial_glow(radius, color, alpha):
    g = Image.new("L", (radius * 2, radius * 2), 0)
    d = ImageDraw.Draw(g)
    steps = 40
    for i in range(steps, 0, -1):
        r = int(radius * i / steps)
        a = int(alpha * (1 - i / steps) ** 1.6)
        d.ellipse([radius - r, radius - r, radius + r, radius + r], fill=a)
    layer = Image.new("RGBA", g.size, color + (0,))
    layer.putalpha(g)
    return layer


def gradient_disc(radius, top, bottom):
    disc = Image.new("RGBA", (radius * 2, radius * 2), (0, 0, 0, 0))
    grad = Image.new("RGBA", disc.size)
    gd = ImageDraw.Draw(grad)
    for y in range(radius * 2):
        # diagonal-ish: blend by y with a slight bias
        gd.line([(0, y), (radius * 2, y)], fill=lerp(top, bottom, y / (radius * 2)) + (255,))
    mask = Image.new("L", disc.size, 0)
    ImageDraw.Draw(mask).ellipse([0, 0, radius * 2 - 1, radius * 2 - 1], fill=255)
    disc.paste(grad, (0, 0), mask)
    return disc


AVATAR_DISC = gradient_disc(R, BRAND_300, BRAND_700)
SHADOW = radial_glow(int(R * 0.9), (0, 0, 0), 150)


def ease(x):
    return 0.5 - 0.5 * math.cos(math.pi * x)


def draw_icon_card(base, kind, x, y, s, alpha):
    """A small rounded card with a simple glyph, centred at (x, y), scale s."""
    card = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(card)
    w = int(78 * SS * s / 2)
    color = {"cal": BRAND, "cap": AMBER, "chat": SKY, "star": VIOLET}[kind]
    d.rounded_rectangle([x - w, y - w, x + w, y + w], radius=int(w * 0.42), fill=PAPER + (int(255 * alpha),))
    u = w / 22.0
    a = int(255 * alpha)
    if kind == "cal":
        d.rounded_rectangle([x - 14 * u, y - 12 * u, x + 14 * u, y + 13 * u], radius=int(4 * u), outline=color + (a,), width=int(3 * u))
        d.rectangle([x - 14 * u, y - 12 * u, x + 14 * u, y - 4 * u], fill=color + (a,))
        for k in (-7, 7):
            d.line([(x + k * u, y - 16 * u), (x + k * u, y - 9 * u)], fill=color + (a,), width=int(3 * u))
        d.line([(x - 7 * u, y + 4 * u), (x - 2 * u, y + 9 * u), (x + 8 * u, y - 1 * u)], fill=color + (a,), width=int(3.4 * u), joint="curve")
    elif kind == "cap":
        d.polygon([(x - 15 * u, y - 3 * u), (x, y - 11 * u), (x + 15 * u, y - 3 * u), (x, y + 5 * u)], fill=color + (a,))
        d.rounded_rectangle([x - 9 * u, y, x + 9 * u, y + 10 * u], radius=int(4 * u), fill=color + (a,))
        d.line([(x + 12 * u, y - 2 * u), (x + 12 * u, y + 9 * u)], fill=color + (a,), width=int(2.2 * u))
        d.ellipse([x + 10 * u, y + 8 * u, x + 14 * u, y + 12 * u], fill=color + (a,))
    elif kind == "chat":
        d.rounded_rectangle([x - 14 * u, y - 11 * u, x + 14 * u, y + 7 * u], radius=int(6 * u), fill=color + (a,))
        d.polygon([(x - 6 * u, y + 6 * u), (x - 10 * u, y + 13 * u), (x + 1 * u, y + 6 * u)], fill=color + (a,))
        for k in (-7, 0, 7):
            d.ellipse([x + k * u - 2.4 * u, y - 4.4 * u, x + k * u + 2.4 * u, y + 0.4 * u], fill=PAPER + (a,))
    else:  # star
        pts = []
        for k in range(10):
            ang = -math.pi / 2 + k * math.pi / 5
            rr = (13 if k % 2 == 0 else 5.5) * u
            pts.append((x + rr * math.cos(ang), y + rr * math.sin(ang)))
        d.polygon(pts, fill=color + (a,))
    base.alpha_composite(card)


# (kind, anchor x, anchor y in units of R from the avatar centre, pop phase)
CARDS = [("cap", -1.55, -0.62, 0.0), ("chat", 1.58, -0.30, 0.25), ("cal", -1.48, 0.70, 0.5), ("star", 1.50, 0.82, 0.75)]


def frame(i):
    t = i / N                      # 0..1 loop phase
    img = Image.new("RGBA", (W, W), (0, 0, 0, 0))

    # No background glow here: a large soft area changing every frame tripled the file
    # size. The page draws the glow in CSS behind the animation instead.

    d = ImageDraw.Draw(img)

    # Voice rings are CSS on the page (sparkles were dropped): they touch the whole canvas, so baked in
    # they made every frame change edge to edge and nothing could be reused between frames.
    d = ImageDraw.Draw(img)

    bob = 0  # the bob is CSS on the <img> (float-soft): moving the whole avatar per frame tripled the size
    # avatar shadow + disc
    img.alpha_composite(SHADOW, (cx - SHADOW.width // 2, int(cy + R * 0.95 - SHADOW.height // 2)))
    ay = int(cy + bob)
    img.alpha_composite(AVATAR_DISC, (cx - R, ay - R))
    d = ImageDraw.Draw(img)

    # hair (behind) then face
    fr = int(R * 0.56)
    fy = ay + int(R * 0.08)
    d.rounded_rectangle([cx - int(fr * 1.08), fy - int(fr * 0.9), cx + int(fr * 1.08), fy + int(fr * 0.95)],
                        radius=int(fr * 0.6), fill=DARK + (255,))
    d.ellipse([cx - int(fr * 1.1), fy - int(fr * 1.18), cx + int(fr * 1.1), fy + int(fr * 0.55)], fill=DARK + (255,))
    ff = int(fr * 0.9)
    fcy = fy + int(fr * 0.12)
    d.ellipse([cx - ff, fcy - ff, cx + ff, fcy + ff], fill=PAPER + (255,))
    # side-swept fringe
    d.chord([cx - ff, fcy - ff, cx + ff, fcy + ff], start=200, end=300, fill=DARK + (255,))
    # headset band
    bw = int(R * 0.80)
    d.arc([cx - bw, fy - bw - int(R * 0.06), cx + bw, fy + bw - int(R * 0.06)], start=185, end=355,
          fill=DARK + (255,), width=int(9 * SS))
    # ear cups
    cw, ch = int(R * 0.17), int(R * 0.34)
    for sx in (-1, 1):
        ex = cx + sx * int(R * 0.74)
        d.rounded_rectangle([ex - cw, fy - ch // 2, ex + cw, fy + ch // 2], radius=cw, fill=DARK + (255,))
        d.rounded_rectangle([ex - cw // 2, fy - ch // 3, ex + cw // 2, fy + ch // 3], radius=cw // 2, fill=BRAND + (255,))
    # mic boom
    mx = cx + int(R * 0.74)
    d.arc([cx - int(R * 0.05), fy - int(R * 0.15), mx + int(R * 0.05), fy + int(R * 0.62)], start=10, end=95,
          fill=DARK + (255,), width=int(6 * SS))
    d.ellipse([cx + int(R * 0.16) - int(9 * SS), fy + int(R * 0.53) - int(9 * SS),
               cx + int(R * 0.16) + int(9 * SS), fy + int(R * 0.53) + int(9 * SS)], fill=DARK + (255,))

    # eyes (blink near t=0.62)
    blink = max(0.0, 1 - abs(t - 0.62) / 0.025)
    eh = max(1, int(R * 0.085 * (1 - blink)))
    for sx in (-1, 1):
        ex = cx + sx * int(R * 0.21)
        ey = fy - int(R * 0.05)
        d.ellipse([ex - int(R * 0.06), ey - eh, ex + int(R * 0.06), ey + eh], fill=DARK + (255,))
        if blink < 0.5:
            d.ellipse([ex + int(R * 0.01), ey - int(eh * 0.6), ex + int(R * 0.035), ey - int(eh * 0.15)],
                      fill=(255, 255, 255, 255))
    # cheeks
    for sx in (-1, 1):
        kx = cx + sx * int(R * 0.33)
        ky = fy + int(R * 0.14)
        d.ellipse([kx - int(R * 0.08), ky - int(R * 0.045), kx + int(R * 0.08), ky + int(R * 0.045)],
                  fill=(251, 146, 160, 150))
    # mouth: talking, syllable-like rhythm that loops
    talk = abs(math.sin(2 * math.pi * t * 7)) * (0.55 + 0.45 * abs(math.sin(2 * math.pi * t * 3)))
    mw = int(R * 0.17)
    mh = int(R * (0.03 + 0.13 * talk))
    my = fy + int(R * 0.25)
    d.rounded_rectangle([cx - mw, my - mh, cx + mw, my + mh], radius=max(2, min(mw, mh)), fill=(190, 40, 70, 255))
    if mh > R * 0.07:
        d.ellipse([cx - int(mw * 0.55), my + int(mh * 0.1), cx + int(mw * 0.55), my + mh], fill=(255, 120, 140, 255))

    # floating cards beside the avatar: each pops in turn and drifts
    for kind, ax, ay_, ph in CARDS:
        p = (t - ph) % 1.0
        pop = 1.0 + (0.18 * math.sin(math.pi * p / 0.12) if p < 0.12 else 0.0)
        fx = cx + ax * R
        fy2 = cy + ay_ * R
        draw_icon_card(img, kind, fx, fy2, 0.95 * pop, 1.0)

    # waveform under the avatar
    wave_y = int(cy + R * 1.38)
    bars = 13
    gap = int(11 * SS)
    for b in range(bars):
        amp = abs(math.sin(2 * math.pi * (t * 4 + b * 0.13))) * (0.4 + 0.6 * abs(math.sin(2 * math.pi * (t * 2 + b * 0.07))))
        h = int((8 + 34 * amp) * SS)
        x = cx + (b - bars // 2) * gap
        d.rounded_rectangle([x - int(2.5 * SS), wave_y - h, x + int(2.5 * SS), wave_y + h], radius=int(2.5 * SS),
                            fill=lerp(BRAND_300, BRAND, b / bars) + (255,))

    return img.resize((SIZE, SIZE), Image.LANCZOS)


frames = [frame(i) for i in range(N)]
frames[0].save(OUT / "vaani-still.webp", quality=80)
frames[0].save(OUT / "vaani.webp", save_all=True, append_images=frames[1:], duration=int(1000 / FPS),
               loop=0, quality=64, alpha_quality=70, method=6, minimize_size=True, allow_mixed=True)
# contact sheet for review
if "--sheet" in sys.argv:
    sheet = Image.new("RGBA", (SIZE * 4, SIZE), INK + (255,))
    for k, idx in enumerate([0, N // 4, N // 2, 3 * N // 4]):
        sheet.alpha_composite(frames[idx], (k * SIZE, 0))
    sheet.save(OUT / "vaani-sheet.png")
for f in ("vaani.webp", "vaani-still.webp"):
    print(f, (OUT / f).stat().st_size // 1024, "KB")

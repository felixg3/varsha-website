#!/usr/bin/env python3
"""
Builds self-hosted woff2 web fonts for the five scripts this site serves.

  Latin (EN/DE/FR) ....... Lora, variable weight
  Devanagari (HI) ........ Noto Serif Devanagari
  Tamil (TA) ............. Noto Serif Tamil

Latin is subsetted to latin + latin-ext, which covers English, German and
French including all diacritics. The Indic faces are NOT aggressively
subsetted: Devanagari and Tamil rely on conjuncts, reordering and ligature
substitution, and dropping glyphs or GSUB/GPOS features silently breaks
rendering. Their full script coverage is retained.

    python3 tools/make-fonts.py
"""

import os
import subprocess
import sys

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "fonts")
os.makedirs(OUT, exist_ok=True)

G = "/usr/share/fonts/truetype/google-fonts"
N = "/usr/share/fonts/truetype/noto"

# latin + latin-ext: ASCII, Latin-1 Supplement, Latin Extended-A/B, punctuation
LATIN = (
    "U+0000-00FF,U+0100-017F,U+0180-024F,U+0259,U+1E00-1EFF,"
    "U+2000-206F,U+2074,U+20A0-20CF,U+2113,U+2122,U+2190-2193,"
    "U+2212,U+2215,U+FEFF,U+FFFD"
)

JOBS = [
    # (source, output, unicodes or None for full coverage, extra flags)
    (f"{G}/Lora-Variable.ttf", "lora-latin.woff2", LATIN, []),
    (f"{G}/Lora-Italic-Variable.ttf", "lora-latin-italic.woff2", LATIN, []),
    (f"{N}/NotoSerifDevanagari-Regular.ttf", "noto-serif-devanagari-400.woff2", None, []),
    (f"{N}/NotoSerifDevanagari-Bold.ttf", "noto-serif-devanagari-700.woff2", None, []),
    (f"{N}/NotoSerifTamil-Regular.ttf", "noto-serif-tamil-400.woff2", None, []),
    (f"{N}/NotoSerifTamil-Bold.ttf", "noto-serif-tamil-700.woff2", None, []),
]

missing = [src for src, *_ in JOBS if not os.path.exists(src)]
if missing:
    sys.exit("Missing source fonts:\n  " + "\n  ".join(missing))

total = 0
for src, out, unicodes, extra in JOBS:
    dest = os.path.join(OUT, out)
    cmd = [
        sys.executable, "-m", "fontTools.subset", src,
        f"--output-file={dest}",
        "--flavor=woff2",
        "--layout-features=*",   # keep every OpenType feature: Indic needs them
        "--no-hinting",
        "--desubroutinize",
        "--name-IDs=*",
        "--drop-tables+=DSIG",
    ] + extra

    if unicodes:
        cmd.append(f"--unicodes={unicodes}")
    else:
        cmd.append("--unicodes=*")
        cmd.append("--glyphs=*")

    subprocess.run(cmd, check=True)
    kb = os.path.getsize(dest) / 1024
    total += kb
    print(f"  {out:38} {kb:7.1f} KB")

print(f"\n  {'total':38} {total:7.1f} KB")

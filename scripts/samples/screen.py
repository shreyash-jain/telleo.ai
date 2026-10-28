"""Screen every candidate voice: render the sales line in each language it speaks,
transcribe it back (Sarvam speech-to-text) and measure the character error rate
and median pitch. Appends to WORK/screen.jsonl; re-running skips what is done.

    python screen.py [--only navana,google]
"""
import argparse
import asyncio
import json
import re
import sys
import unicodedata
from pathlib import Path

import aiohttp
import soundfile as sf

import engines
from catalog import candidates
from texts import BENGALI_NAMES, GALLERY, fill

WORK = Path("/Volumes/shreyash_ex/Vacademy/telleo-samples-work")


def norm(s: str) -> str:
    s = unicodedata.normalize("NFC", s.lower())
    return re.sub(r"[\W_]+", "", s)


def cer(ref: str, hyp: str) -> float:
    a, b = norm(ref), norm(hyp)
    if not a:
        return 1.0
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[-1] / len(a)


# Speech-to-text writes Hinglish's English words in Devanagari, so the Hinglish
# line is scored against this spelling of it.
HI_REF = ("नमस्ते, मैं ग्रीनवुड होम्स से {name} बोल {rahi} हूँ। आपने हमारे टू बीएचके फ्लैट्स के "
          "बारे में इंक्वायरी की थी, तो क्या इस सैटरडे सुबह ग्यारह बजे साइट विज़िट का टाइम ठीक "
          "रहेगा?")


def ref_for(c, lang):
    if lang == "hi":
        return fill(HI_REF, name=c["name"], gender=c["gender"])
    return line_for(c, lang)


def line_for(c, lang, use_case="sales"):
    name = BENGALI_NAMES.get(c["ids"]["bn"], c["name"]) if lang == "bn" else c["name"]
    return fill(GALLERY[lang][use_case], name=name, gender=c["gender"])


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", default="")
    args = ap.parse_args()
    only = set(filter(None, args.only.split(",")))
    (WORK / "screen").mkdir(parents=True, exist_ok=True)
    out = WORK / "screen.jsonl"
    done = set()
    if out.exists():
        for l in out.read_text().splitlines():
            r = json.loads(l)
            done.add((r["key"], r["lang"]))
    engines.load_secrets()
    todo = [(c, lang) for c in candidates() for lang in c["ids"]
            if (not only or c["engine"] in only) and (c["key"], lang) not in done]
    print(f"{len(todo)} renders to screen", flush=True)
    async with aiohttp.ClientSession() as session:
        for i, (c, lang) in enumerate(todo, 1):
            text = line_for(c, lang)
            rec = {"key": c["key"], "engine": c["engine"], "name": c["name"],
                   "gender": c["gender"], "voice": c["ids"][lang], "lang": lang}
            try:
                audio = await engines.render(session, c["engine"], c["ids"][lang], text, lang)
                if len(audio) < engines.SR * 1.0:
                    raise RuntimeError(f"only {len(audio) / engines.SR:.2f}s of audio")
                path = WORK / "screen" / f"{c['key'].replace(':', '__')}__{lang}.wav"
                sf.write(path, audio, engines.SR)
                hyp = await engines.transcribe(session, audio, lang)
                rec.update(secs=round(len(audio) / engines.SR, 2), f0=round(engines.median_f0(audio)),
                           cer=round(cer(ref_for(c, lang), hyp), 3), hyp=hyp,
                           peak=round(float(abs(audio).max()), 3))
            except Exception as e:
                rec["error"] = str(e)[:200]
            with out.open("a") as f:
                f.write(json.dumps(rec, ensure_ascii=False) + "\n")
            print(f"[{i}/{len(todo)}] {c['key']} {lang} "
                  + (f"ERR {rec['error'][:80]}" if "error" in rec else
                     f"cer={rec['cer']} f0={rec['f0']} {rec['secs']}s"), flush=True)
            await asyncio.sleep(0.8)


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))

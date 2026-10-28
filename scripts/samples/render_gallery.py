"""Render the library: every selected voice says the three gallery lines in each
language it speaks. Writes public/samples/voices/<voice>/<lang>-<script>.mp3;
existing files are kept (delete one to re-render it)."""
import asyncio
import json
import sys
from pathlib import Path

import aiohttp
import soundfile as sf

import engines
from audio import level, trim, write_mp3
from screen import WORK, line_for
from texts import USE_CASES

OUT = Path(__file__).resolve().parents[2] / "public" / "samples" / "voices"


def slug(c) -> str:
    return c["name"].lower()


async def main():
    picks = json.loads((WORK / "selection.json").read_text())
    engines.load_secrets()
    todo = [(c, lang, uc) for c in picks for lang in c["ids"] for uc in USE_CASES
            if not (OUT / slug(c) / f"{lang}-{uc}.mp3").exists()]
    print(f"{len(todo)} clips to render", flush=True)
    failed = []
    async with aiohttp.ClientSession() as session:
        for i, (c, lang, uc) in enumerate(todo, 1):
            screened = WORK / "screen" / f"{c['key'].replace(':', '__')}__{lang}.wav"
            try:
                if uc == "sales" and screened.exists():
                    x, _ = sf.read(screened, dtype="float32")
                else:
                    x = await engines.render(session, c["engine"], c["ids"][lang],
                                             line_for(c, lang, uc), lang)
                    await asyncio.sleep(0.6)
                write_mp3(OUT / slug(c) / f"{lang}-{uc}.mp3", level(trim(x)))
                print(f"[{i}/{len(todo)}] {slug(c)} {lang} {uc}", flush=True)
            except Exception as e:
                failed.append((slug(c), lang, uc, str(e)[:120]))
                print(f"[{i}/{len(todo)}] {slug(c)} {lang} {uc} FAILED {str(e)[:120]}", flush=True)
    print(f"done, {len(failed)} failed", failed)


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))

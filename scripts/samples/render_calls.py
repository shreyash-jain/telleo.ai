"""Render the 12 sample calls (4 use cases x English, Hinglish, Bengali).

Cast from the library: the agent is the lowest-error voice of the call's gender
in that language not already an agent in another call; the caller is the next
voice of the caller's gender. Both sides go through the telephone band; the
caller answers 0.5-0.8 s after the agent stops and the agent 0.75-1.0 s after the
caller, about what a live Telleo call takes. Writes public/samples/calls/ and
WORK/calls.json (cast + the start of every turn, for the transcript).
"""
import asyncio
import json
import random
import sys
from pathlib import Path

import aiohttp
import numpy as np

import engines
from audio import SR, hiss, level, phone, trim, write_mp3
from screen import WORK
from texts import BENGALI_NAMES, CALLS, fill

OUT = Path(__file__).resolve().parents[2] / "public" / "samples" / "calls"


def cast(picks):
    ranked = sorted(picks, key=lambda c: sum(c["cer"].values()) / len(c["cer"]))
    out, used = {}, {}
    for lang in ("en", "hi", "bn"):
        pool = [c for c in ranked if lang in c["ids"]]
        agents = set()
        for uc, call in CALLS.items():
            agent = next(c for c in pool if c["gender"] == call["agent"] and c["key"] not in agents)
            agents.add(agent["key"])
            caller = next(c for c in pool if c["gender"] == call["caller"]
                          and c["key"] != agent["key"] and c["key"] not in agents
                          and used.get((lang, c["key"]), 0) < 2)
            used[(lang, caller["key"])] = used.get((lang, caller["key"]), 0) + 1
            out[(uc, lang)] = (agent, caller)
    return out


def speaker_name(c, lang):
    return BENGALI_NAMES.get(c["ids"].get("bn", ""), c["name"]) if lang == "bn" else c["name"]


async def main():
    picks = json.loads((WORK / "selection.json").read_text())
    engines.load_secrets()
    random.seed(11)
    manifest = []
    async with aiohttp.ClientSession() as session:
        for (uc, lang), (agent, caller) in cast(picks).items():
            call = CALLS[uc]
            pieces, turns, t = [np.zeros(int(0.4 * SR), np.float32)], [], 0.4
            prev = None
            for who, text in call[lang]:
                c = agent if who == "A" else caller
                line = fill(text, gender=c["gender"], agent=speaker_name(agent, lang))
                x = await engines.render(session, c["engine"], c["ids"][lang], line, lang)
                await asyncio.sleep(0.6)
                x = level(trim(x, pad=0.05), rms_db=-20 if who == "A" else -21.5)
                x = phone(x, lift_db=2.5 if who == "A" else 0.0)
                if prev is not None:
                    gap = (0.75 + random.random() * 0.25) if who == "A" else (0.5 + random.random() * 0.3)
                    pieces.append(np.zeros(int(gap * SR), np.float32))
                    t += gap
                turns.append({"who": "agent" if who == "A" else "caller", "text": line,
                              "t": round(t, 2)})
                pieces.append(x)
                t += len(x) / SR
                prev = who
            pieces.append(np.zeros(int(0.6 * SR), np.float32))
            mix = np.concatenate(pieces)
            mix = mix + hiss(len(mix))
            write_mp3(OUT / f"{uc}-{lang}.mp3", np.clip(mix, -0.98, 0.98), sr=16000, quality=0.5)
            manifest.append({"useCase": uc, "lang": lang, "secs": round(len(mix) / SR, 1),
                             "agent": agent["name"], "agentKey": agent["key"],
                             "agentGender": agent["gender"], "caller": caller["key"],
                             "turns": turns})
            print(f"{uc} {lang}: {len(mix) / SR:.1f}s agent={agent['key']} caller={caller['key']}",
                  flush=True)
    (WORK / "calls.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))

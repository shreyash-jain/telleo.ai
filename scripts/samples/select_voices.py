"""Pick the library's voices from the screening results (WORK/screen.jsonl).

Dropped: any render that failed, a pitch that contradicts the voice's gender
(the Hindi verb follows it: बोल रहा / बोल रही), a pace far from the median, or
a high error rate on the speech-to-text round trip. Then the lowest-error voices
per engine, balanced by gender, each name once. Writes WORK/selection.json.
"""
import json
import statistics
from collections import defaultdict

from catalog import candidates
from screen import WORK

QUOTA = {"navana": 22, "google": 10, "sarvam_v4": 13, "smallest": 4, "smallest_pro": 4,
         "sarvam": 6, "edge": 2}
ORDER = ["navana", "google", "sarvam_v4", "smallest_pro", "smallest", "sarvam", "edge"]
MAX_CER = {"en": 0.20, "hi": 0.25, "bn": 0.25}


def main():
    rows = [json.loads(l) for l in (WORK / "screen.jsonl").read_text().splitlines()]
    by_key = defaultdict(dict)
    for r in rows:
        by_key[r["key"]][r["lang"]] = r
    med = {l: statistics.median([r["secs"] for r in rows if r["lang"] == l and "secs" in r])
           for l in ("en", "hi", "bn")}
    cands = {c["key"]: c for c in candidates()}
    scored, dropped = [], []
    for key, langs in by_key.items():
        c = cands[key]
        why = []
        for l, r in langs.items():
            if "error" in r:
                why.append(f"{l}: {r['error'][:60]}")
                continue
            if r["cer"] > MAX_CER[l]:
                why.append(f"{l}: cer {r['cer']}")
            if not 0.72 * med[l] <= r["secs"] <= 1.35 * med[l]:
                why.append(f"{l}: {r['secs']}s vs median {med[l]:.1f}s")
            f0 = r.get("f0") or 0
            if f0 and ((c["gender"] == "female" and f0 < 160) or (c["gender"] == "male" and f0 > 185)):
                why.append(f"{l}: pitch {f0} Hz for a {c['gender']} voice")
        if why or set(langs) != set(c["ids"]):
            dropped.append((key, why or ["not every language screened"]))
            continue
        scored.append((statistics.mean(r["cer"] for r in langs.values()), c))
    picks, names = [], set()
    for engine in ORDER:
        pool = sorted(((s, c) for s, c in scored if c["engine"] == engine), key=lambda p: p[0])
        want = QUOTA[engine]
        by_g = {g: [c for s, c in pool if c["gender"] == g] for g in ("female", "male")}
        take, i = [], 0
        while len(take) < want and (by_g["female"] or by_g["male"]):
            g = ("female", "male")[i % 2]
            i += 1
            while by_g[g]:
                c = by_g[g].pop(0)
                if c["name"].lower() not in names:
                    take.append(c)
                    names.add(c["name"].lower())
                    break
        picks += take
    for c in picks:
        c["cer"] = {l: by_key[c["key"]][l]["cer"] for l in c["ids"]}
    (WORK / "selection.json").write_text(json.dumps(picks, ensure_ascii=False, indent=1))
    print(f"picked {len(picks)}:",
          {e: sum(1 for c in picks if c["engine"] == e) for e in ORDER},
          {g: sum(1 for c in picks if c["gender"] == g) for g in ("female", "male")},
          "bengali:", sum(1 for c in picks if "bn" in c["ids"]))
    print(f"dropped {len(dropped)}")
    for k, why in dropped:
        print("  ", k, "|", "; ".join(why)[:150])


if __name__ == "__main__":
    main()

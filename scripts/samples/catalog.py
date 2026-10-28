"""Candidate voices for the site's voice library, from the agent picker's catalog
(admin_core TtsVoiceCatalog). Each candidate lists only the languages a client's
agent on that voice really speaks today:

  navana              English, Hinglish, Bengali (language follows the agent)
  google · smallest   Hinglish and English
  sarvam (v3, v4)     Hinglish and English — a live call sends Sarvam no language,
                      so its Bengali voices would get a Hindi target; left out
  edge                one locale per voice

Left out: Rumik (mispronounces Hindi), Google Neural2/WaveNet, Deepgram (American
English only).
"""
import re
from pathlib import Path

from texts import GOOGLE_NAMES

NAVANA_M = ("achu anirban basava basheer bijay chhotu elango faizal gurdeep imran kannan kishan "
            "murugan savio shivanna srinu sulaiman tanaji temjen vetri xavier").split()
NAVANA_F = ("ammu ann arasi ayesha bhavana bimla champa falguni flavia harleen ipsita jayita jessy "
            "kayal mahadevi malar maria merin mukta nasrin nayeema netra nila ponni porkavi rukhiya "
            "rukhsana selvi shabnam sharon shikha vanaja yasmin zoya").split()
GOOGLE_M = "Achird Charon Fenrir Orus Puck Schedar".split()
GOOGLE_F = "Achernar Aoede Kore Leda Zephyr Sulafat".split()
SMALLEST = {"devansh": "male", "kaustubh": "male", "virat": "male", "karan": "male",
            "yash": "male", "debashis": "male", "imogen": "female", "nirupma": "female",
            "niharika": "female"}
SMALLEST_PRO = {"mandar": "male", "mathan": "male", "barath": "male", "manasi": "female",
                "mrunal": "female", "ketaki": "female", "meher": "female"}
SARVAM_V3_F = ("ritu priya neha pooja simran kavya ishita shreya roopa tanya shruti suhani "
               "kavitha rupali niharika").split()
SARVAM_V3_M = ("shubh aditya rahul rohan amit dev ratan varun manan sumit kabir aayan ashutosh "
               "advait anand tarun sunny mani gokul vijay mohit rehan soham").split()
EDGE = [("en-IN-NeerjaNeural", "Neerja", "female", ["en"]),
        ("en-IN-PrabhatNeural", "Prabhat", "male", ["en"]),
        ("hi-IN-SwaraNeural", "Swara", "female", ["hi"]),
        ("hi-IN-MadhurNeural", "Madhur", "male", ["hi"])]

# Bulbul v4 styles that suit a business call, best first.
_V4_STYLES = ["customer", "conversational", "conversation", "sales", "assistant", "customer_warm",
              "customer_utility", "banking", "edtech", "companion", "insurance", "ecomm",
              "feedback", "kyc", "market", "social"]


def _v4_sets():
    src = (Path(__file__).with_name("sarvam_v4_voices.py")).read_text()
    def grab(name):
        m = re.search(name + r"\s*=\s*frozenset\(\{(.*?)\}\)", src, re.S)
        return set(re.findall(r'"([a-z0-9_]+)"', m.group(1)))
    return grab("SARVAM_V4_MALE"), grab("SARVAM_V4_FEMALE")


def _v4_candidates():
    male, female = _v4_sets()
    by_speaker = {}
    for vid in male | female:
        spk, lang, style = vid.split("_", 2)
        by_speaker.setdefault(spk, {"gender": "male" if vid in male else "female", "ids": {}})
        by_speaker[spk]["ids"].setdefault(lang, []).append(style)
    out = []
    for spk, d in sorted(by_speaker.items()):
        ids = {}
        for want, langs in (("hi", ("enhi", "hi")), ("en", ("en",))):
            for lang in langs:
                styles = [s for s in _V4_STYLES if s in d["ids"].get(lang, [])]
                if styles:
                    ids[want] = f"{spk}_{lang}_{styles[0]}"
                    break
        if ids:
            out.append({"engine": "sarvam_v4", "name": spk.title(), "gender": d["gender"],
                        "ids": ids})
    return out


def candidates():
    c = []
    for g, names in (("male", NAVANA_M), ("female", NAVANA_F)):
        for n in names:
            c.append({"engine": "navana", "name": n.title(), "gender": g,
                      "ids": {"en": n, "hi": n, "bn": n}})
    for g, names in (("male", GOOGLE_M), ("female", GOOGLE_F)):
        for n in names:
            v = f"hi-IN-Chirp3-HD-{n}"
            c.append({"engine": "google", "name": GOOGLE_NAMES[n], "gender": g,
                      "ids": {"hi": v, "en": v}})
    for engine, table in (("smallest", SMALLEST), ("smallest_pro", SMALLEST_PRO)):
        for n, g in table.items():
            c.append({"engine": engine, "name": n.title(), "gender": g, "ids": {"hi": n, "en": n}})
    for g, names in (("female", SARVAM_V3_F), ("male", SARVAM_V3_M)):
        for n in names:
            c.append({"engine": "sarvam", "name": n.title(), "gender": g,
                      "ids": {"hi": n, "en": n}})
    c += _v4_candidates()
    for vid, name, g, langs in EDGE:
        c.append({"engine": "edge", "name": name, "gender": g, "ids": {l: vid for l in langs}})
    for x in c:
        x["key"] = f"{x['engine']}:{x['name'].lower()}"
    return c


if __name__ == "__main__":
    from collections import Counter
    cs = candidates()
    print(len(cs), Counter(x["engine"] for x in cs),
          sum(len(x["ids"]) for x in cs), "renders")

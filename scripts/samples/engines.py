"""Render one line in one voice, the way Telleo's voice preview does it.

Mirrors voice_bot_service/app/main.py (preview.mp3) engine by engine, so a clip on
the site is what the agent editor's preview plays for the same voice:

  google    Cloud TTS, the voice's own locale (hi-IN for every Chirp3-HD voice)
  edge      Microsoft Edge neural voices
  smallest  Lightning v3.1 / v3.1 Pro over the websocket, language en or hi
  navana    POST /tts/bytes, language from the agent's language
  sarvam    Bulbul v3, and Bulbul v4 Flash (voice ids carry their language)

Sarvam gets target_language_code hi-IN for every language: a live call passes no
language to Sarvam TTS, and pipecat's default is Language.HI.

Secrets are read from the voice-bot box over ssh into this process's memory
(load_secrets) and are never printed or written to disk.
"""
from __future__ import annotations

import asyncio
import base64
import io
import json
import subprocess
import time

import aiohttp
import numpy as np
import soundfile as sf
from scipy.signal import resample_poly

BOX = "root@voice-bot-in.vacademy.io"
SR = 24000
_SECRETS: dict = {}


def load_secrets() -> None:
    out = subprocess.run(
        ["ssh", "-o", "ConnectTimeout=15", BOX,
         "cat /opt/voice-bot/.env; echo; echo '#==SA=='; cat /opt/voice-bot/vertex-sa.json"],
        capture_output=True, text=True, check=True).stdout
    env, sa = out.split("#==SA==", 1)
    for line in env.splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        _SECRETS[k.strip()] = v.strip().strip('"').strip("'")
    _SECRETS["_SA"] = json.loads(sa)


def _key(name: str) -> str:
    v = _SECRETS.get(name, "")
    if not v:
        raise RuntimeError(f"{name} missing")
    return v


# ── the live box: never take a Navana slot while a call is on ──────────────────
_idle_checked = 0.0


def box_idle() -> bool:
    global _idle_checked
    if time.time() - _idle_checked < 15:
        return True
    n = subprocess.run(
        ["ssh", "-o", "ConnectTimeout=15", BOX,
         "docker logs --since 25s voice-bot-voice-bot-1 2>&1 | grep -c app.bot"],
        capture_output=True, text=True).stdout.strip()
    if n == "0":
        _idle_checked = time.time()
        return True
    return False


async def wait_for_idle_box() -> None:
    while not box_idle():
        print("    (a call is on — waiting)", flush=True)
        await asyncio.sleep(30)


# ── audio helpers ─────────────────────────────────────────────────────────────
def _to_sr(x: np.ndarray, sr: int) -> np.ndarray:
    x = x.astype(np.float32)
    if x.ndim > 1:
        x = x.mean(axis=1)
    if sr != SR:
        from math import gcd
        g = gcd(sr, SR)
        x = resample_poly(x, SR // g, sr // g).astype(np.float32)
    return x


def _decode(data: bytes) -> np.ndarray:
    x, sr = sf.read(io.BytesIO(data), dtype="float32")
    return _to_sr(x, sr)


def _pcm16(data: bytes, sr: int) -> np.ndarray:
    return _to_sr(np.frombuffer(data, dtype="<i2").astype(np.float32) / 32768.0, sr)


# ── engines ───────────────────────────────────────────────────────────────────
async def _google(text: str, voice: str) -> np.ndarray:
    from google.cloud import texttospeech
    from google.oauth2 import service_account
    creds = service_account.Credentials.from_service_account_info(_SECRETS["_SA"])

    def run():
        client = texttospeech.TextToSpeechClient(credentials=creds)
        lang = "-".join(voice.split("-")[:2])
        r = client.synthesize_speech(
            input=texttospeech.SynthesisInput(text=text),
            voice=texttospeech.VoiceSelectionParams(language_code=lang, name=voice),
            audio_config=texttospeech.AudioConfig(
                audio_encoding=texttospeech.AudioEncoding.LINEAR16, sample_rate_hertz=SR))
        return r.audio_content
    return _decode(await asyncio.to_thread(run))


async def _edge(text: str, voice: str) -> np.ndarray:
    import edge_tts
    out = b""
    async for chunk in edge_tts.Communicate(text, voice, rate="+0%").stream():
        if chunk.get("type") == "audio" and chunk.get("data"):
            out += chunk["data"]
    return _decode(out)


async def _smallest(text: str, voice: str, model: str, lang: str) -> np.ndarray:
    import websockets
    pcm = bytearray()
    async with websockets.connect(
            "wss://api.smallest.ai/waves/v1/tts/live",
            additional_headers={"Authorization": f"Bearer {_key('SMALLEST_API_KEY')}"},
            open_timeout=15) as ws:
        await ws.send(json.dumps({
            "text": text, "voice_id": voice, "model": model,
            "language": "en" if lang == "en" else "hi", "sample_rate": SR,
            "output_format": "pcm", "speed": 1.0, "continue": False, "flush": True}))
        while True:
            msg = await asyncio.wait_for(ws.recv(), timeout=30)
            if isinstance(msg, (bytes, bytearray)):
                pcm += msg
                continue
            ev = json.loads(msg)
            chunk = (ev.get("data") or {}).get("audio")
            if chunk:
                pcm += base64.b64decode(chunk)
            if ev.get("status") in ("complete", "error"):
                if ev.get("status") == "error":
                    raise RuntimeError(f"smallest: {str(ev)[:160]}")
                break
    return _pcm16(bytes(pcm), SR)


async def _navana(session, text: str, voice: str, lang: str) -> np.ndarray:
    await wait_for_idle_box()
    keys = [k.strip() for k in _key("NAVANA_API_KEY").split(",") if k.strip()]
    body = {"text": text, "lang": lang, "voice": voice, "output_format": "24000:pcm16"}
    last = ""
    for key in keys:
        async with session.post("https://tts.navana.ai/tts/bytes", json=body,
                                headers={"X-API-Key": key},
                                timeout=aiohttp.ClientTimeout(total=60)) as r:
            if r.status == 200:
                return _pcm16(await r.read(), int(r.headers.get("X-Sample-Rate") or 24000))
            last = f"{r.status} {(await r.text())[:160]}"
    raise RuntimeError(f"navana: {last}")


async def _sarvam(session, text: str, voice: str, model: str) -> np.ndarray:
    body = {"target_language_code": "hi-IN", "speaker": voice, "model": model,
            "speech_sample_rate": SR, "output_audio_codec": "wav", "pace": 1.0}
    if model.startswith("bulbul:v4"):
        body["text"] = text
    else:
        body["inputs"] = [text]
    for attempt in range(4):
        async with session.post("https://api.sarvam.ai/text-to-speech", json=body,
                                headers={"api-subscription-key": _key("SARVAM_API_KEY")},
                                timeout=aiohttp.ClientTimeout(total=40)) as r:
            if r.status == 429:
                await asyncio.sleep(5 * (attempt + 1))
                continue
            if r.status != 200:
                raise RuntimeError(f"sarvam {r.status}: {(await r.text())[:160]}")
            data = await r.json()
            return _decode(b"".join(base64.b64decode(a) for a in data.get("audios") or []))
    raise RuntimeError("sarvam: rate limited")


async def render(session, engine: str, voice: str, text: str, lang: str) -> np.ndarray:
    """lang: en | hi (Hinglish) | bn."""
    if engine == "google":
        return await _google(text, voice)
    if engine == "edge":
        return await _edge(text, voice)
    if engine == "smallest":
        return await _smallest(text, voice, "lightning_v3.1", lang)
    if engine == "smallest_pro":
        return await _smallest(text, voice, "lightning_v3.1_pro", lang)
    if engine == "navana":
        return await _navana(session, text, voice, lang)
    if engine == "sarvam":
        return await _sarvam(session, text, voice, "bulbul:v3")
    if engine == "sarvam_v4":
        return await _sarvam(session, text, voice, "bulbul:v4-flash")
    raise ValueError(engine)


# ── screening: Sarvam speech-to-text round trip ───────────────────────────────
_STT_LANG = {"en": "en-IN", "hi": "hi-IN", "bn": "bn-IN"}


async def transcribe(session, audio: np.ndarray, lang: str) -> str:
    buf = io.BytesIO()
    sf.write(buf, resample_poly(audio, 2, 3).astype(np.float32), 16000, format="WAV",
             subtype="PCM_16")
    for attempt in range(4):
        form = aiohttp.FormData()
        form.add_field("file", buf.getvalue(), filename="a.wav", content_type="audio/wav")
        form.add_field("model", "saarika:v2.5")
        form.add_field("language_code", _STT_LANG[lang])
        async with session.post("https://api.sarvam.ai/speech-to-text", data=form,
                                headers={"api-subscription-key": _key("SARVAM_API_KEY")},
                                timeout=aiohttp.ClientTimeout(total=60)) as r:
            if r.status == 429:
                await asyncio.sleep(5 * (attempt + 1))
                continue
            if r.status != 200:
                raise RuntimeError(f"stt {r.status}: {(await r.text())[:160]}")
            return (await r.json()).get("transcript") or ""
    raise RuntimeError("stt: rate limited")


def median_f0(x: np.ndarray, sr: int = SR) -> float:
    """Median pitch of the voiced frames (autocorrelation), Hz; 0 if none."""
    frame, hop = int(0.04 * sr), int(0.01 * sr)
    lo, hi = int(sr / 400), int(sr / 70)
    rms_all = float(np.sqrt(np.mean(x ** 2)) + 1e-9)
    f0s = []
    for i in range(0, len(x) - frame, hop):
        f = x[i:i + frame]
        if np.sqrt(np.mean(f ** 2)) < 0.5 * rms_all:
            continue
        f = f - f.mean()
        ac = np.correlate(f, f, "full")[frame - 1:]
        if ac[0] <= 0:
            continue
        seg = ac[lo:hi]
        k = int(np.argmax(seg))
        if seg[k] / ac[0] > 0.45:
            f0s.append(sr / (lo + k))
    return float(np.median(f0s)) if f0s else 0.0

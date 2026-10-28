"""Clip finishing: trim, level, phone band, MP3."""
import numpy as np
import soundfile as sf
from scipy.signal import butter, lfilter, resample_poly, sosfilt

SR = 24000


def trim(x: np.ndarray, sr: int = SR, pad: float = 0.12, floor_db: float = -45) -> np.ndarray:
    win = int(0.02 * sr)
    if len(x) < win * 3:
        return x
    env = np.sqrt(np.convolve(x ** 2, np.ones(win) / win, "same"))
    loud = np.where(env > 10 ** (floor_db / 20) * max(env.max(), 1e-6))[0]
    if not len(loud):
        return x
    a, b = max(0, loud[0] - int(pad * sr)), min(len(x), loud[-1] + int(pad * sr))
    return x[a:b]


def level(x: np.ndarray, rms_db: float = -20.0, peak_db: float = -1.5) -> np.ndarray:
    """Match speech loudness (RMS of the louder half of 20 ms frames), cap the peak."""
    win = int(0.02 * SR)
    frames = x[: len(x) // win * win].reshape(-1, win)
    rms = np.sqrt((frames ** 2).mean(axis=1))
    active = rms[rms >= np.median(rms)] if len(rms) else rms
    cur = float(np.sqrt((active ** 2).mean())) if len(active) else 1e-6
    y = x * (10 ** (rms_db / 20) / max(cur, 1e-6))
    peak = float(np.abs(y).max()) or 1.0
    lim = 10 ** (peak_db / 20)
    if peak > lim:
        y = np.tanh(y / lim * 0.9) * lim / np.tanh(0.9)
    return y.astype(np.float32)


def phone(x: np.ndarray, lift_db: float = 2.5) -> np.ndarray:
    """The telephone band, as the live call's voice-eq: 300-3400 Hz, a presence lift
    at 1.7 kHz, through an 8 kHz line."""
    sos = butter(4, [300, 3400], btype="band", fs=SR, output="sos")
    y = sosfilt(sos, x)
    if lift_db:
        y = _peak(y, 1700, lift_db, 1.0)
    y = resample_poly(resample_poly(y, 1, 3), 3, 1)   # 24 kHz -> 8 kHz -> 24 kHz
    return y.astype(np.float32)


def _peak(x, f0, gain_db, q):
    a = 10 ** (gain_db / 40)
    w0 = 2 * np.pi * f0 / SR
    alpha = np.sin(w0) / (2 * q)
    b = [1 + alpha * a, -2 * np.cos(w0), 1 - alpha * a]
    den = [1 + alpha / a, -2 * np.cos(w0), 1 - alpha / a]
    return lfilter(np.array(b) / den[0], np.array(den) / den[0], x)


def hiss(n: int, db: float = -58.0, seed: int = 7) -> np.ndarray:
    rng = np.random.default_rng(seed)
    w = rng.standard_normal(n).astype(np.float32)
    w = sosfilt(butter(2, [300, 3400], btype="band", fs=SR, output="sos"), w)
    return (w / (np.sqrt((w ** 2).mean()) + 1e-9) * 10 ** (db / 20)).astype(np.float32)


def write_mp3(path, x: np.ndarray, sr: int = SR, quality: float = 0.7) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if sr != SR:
        x = resample_poly(x, sr, SR)
    sf.write(path, np.clip(x, -1, 1), sr, format="MP3", subtype="MPEG_LAYER_III",
             compression_level=quality)

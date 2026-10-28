# Voice samples

Renders the site's voice library and sample calls with Telleo's own voices, the way the agent editor's voice
preview renders them (`voice_bot_service/app/main.py`, `preview.mp3`).

Needs the voice-bot venv (aiohttp, numpy, scipy, soundfile with MP3, edge-tts, websockets,
google-cloud-texttospeech) and ssh to the voice-bot box: `engines.load_secrets()` reads the API keys from the
box into memory; nothing is written to disk. Navana renders wait while a call is on, so they never take a
call's slot. Work files go to `/Volumes/shreyash_ex/Vacademy/telleo-samples-work`.

    python screen.py          # every candidate voice: render, speech-to-text round trip, pitch
    python select_voices.py   # the library: drops failures, wrong-gender pitch, odd pace; per-engine quotas
    python render_gallery.py  # public/samples/voices/<voice>/<lang>-<script>.mp3
    python render_calls.py    # public/samples/calls/<use-case>-<lang>.mp3 (+ turn timings)
    python manifest.py        # src/content/voiceSamples.ts

What the samples say lives in `texts.py`; which voices are candidates, in `catalog.py`
(`sarvam_v4_voices.py` is a copy of the voice bot's list). Each script skips work already done:
delete a file to re-render it.

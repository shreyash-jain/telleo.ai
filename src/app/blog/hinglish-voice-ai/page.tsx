import { BlogShell, postMetadata, Callout, Steps, Table, WhereTelleoFits, Sources } from "@/components/BlogShell";
import Link from "next/link";

export const metadata = postMetadata("hinglish-voice-ai");

const CHECKED = "2026-09-25";

export default function Page() {
  return (
    <BlogShell
      slug="hinglish-voice-ai"
      takeaways={[
        "Hinglish switches language inside a sentence, so a voice agent has to hear, understand and speak both languages together.",
        "Script matters for speech: Sarvam’s TTS docs say romanised Hindi “significantly degrades output quality”. They recommend Hindi in Devanagari with English words in English.",
        "Gendered verbs, the respectful “aap” and everyday phone Hindi show quickly whether an agent was built for Indian callers.",
        "Short answers like “haan” are the hardest for speech recognition. In the Voice of India benchmark, error rates rose sharply on clips under two seconds.",
        "Don’t trust a scripted demo. Run the 10-point listening test at the end of this post on any vendor.",
      ]}
      toc={[
        { id: "code-switching", label: "Code-switching is not taking turns" },
        { id: "script", label: "Devanagari, romanised or mixed" },
        { id: "grammar", label: "Gender, honorifics and “aap”" },
        { id: "phone-hindi", label: "Everyday phone Hindi" },
        { id: "backchannels", label: "Haan, achha, hmm: backchannels" },
        { id: "numbers", label: "Numbers, dates and phone numbers" },
        { id: "names", label: "Brand names and people’s names" },
        { id: "accuracy-claims", label: "How to read accuracy claims" },
        { id: "listening-test", label: "A 10-point listening test" },
      ]}
      faqs={[
        {
          q: "What is Hinglish voice AI?",
          a: "It is a voice agent that can listen to and speak the Hindi–English mix many Indian callers use, switching languages mid-sentence the way people do. It needs speech recognition that handles both languages together, a language model that replies in the same mix, and a voice engine that pronounces both correctly.",
        },
        {
          q: "Should Hindi text for text-to-speech be in Devanagari or Roman script?",
          a: "For Indian TTS engines such as Sarvam’s Bulbul, the vendor recommends Devanagari for Hindi words and Latin script for English words, for example “आपका order confirm हो गया है”. Sarvam’s documentation calls romanised input like “Aapka order confirm ho gaya hai” the most common integration mistake and says it significantly degrades output quality. Check your own engine’s documentation, but ask any vendor which script their agent writes.",
        },
        {
          q: "Why does my Hindi voice bot sound formal or robotic?",
          a: "Usually because the text it speaks is textbook or machine-translated Hindi (“कृपया प्रतीक्षा करें”) instead of the Hindi people use on the phone (“एक second रुकिए”). Other common causes are English words written in Devanagari, verbs that don’t match the voice’s gender, and numbers read out digit by digit when they should be amounts.",
        },
        {
          q: "How accurate is Hindi speech recognition on phone calls?",
          a: "It depends heavily on the system. On the Voice of India benchmark, built from unscripted telephonic conversations, Hindi word error rates ranged from 5 to 33.9 across the 14 systems tested. Short clips and poor audio quality pushed error rates up. Test with your own callers’ audio before you trust a number.",
        },
        {
          q: "Can a voice agent handle “haan” and “hmm” while it is speaking?",
          a: "A good one can. It should keep talking through a short acknowledgement, still count a “haan” as a yes when it answers a question, and stop when the caller really interrupts. Test both cases on a real call: say “haan… haan” while it talks, then cut in with a full sentence.",
        },
      ]}
    >
      <p>
        Listen to a sales call in Delhi, Indore or Patna and you will hear sentences like “Sir, आपका loan approve हो
        गया है, बस एक document pending है।” Many callers don’t speak only Hindi or only English. They speak both, and they
        switch inside the same sentence.
      </p>
      <p>
        For a voice AI, that mix is the hardest test there is. A Hinglish call exposes every weak point in the system:
        how it hears, what it writes before speaking, how it pronounces, and whether it sounds like someone from here.
        This post explains where things break and ends with a listening test you can run on any vendor’s demo, including
        ours.
      </p>

      <h2 id="code-switching">Code-switching is not two languages taking turns</h2>
      <p>
        In Hinglish, English nouns sit inside Hindi grammar (“form fill कर दिया”), Hindi verbs attach to English words
        (“cancel करवाना है”), and an English phrase can sit in the middle of a Hindi sentence (“basically मैं यह पूछ रहा
        था”). A system that detects one language per sentence, or per call, gets this wrong all the time.
      </p>
      <p>A voice agent has three parts, and Hinglish tests each one differently:</p>
      <ul>
        <li>
          <strong>Listening (speech recognition).</strong> It has to catch English words spoken with an Indian accent in
          the middle of Hindi. It also has to write them down in some script, and there is no single correct spelling. The
          authors of the Voice of India benchmark point out that strict word error rate penalises “non standardized
          spellings of code-mixed English origin words”, so they allowed several valid transcripts per clip. When you
          judge a vendor’s transcript, judge the meaning, not the spelling.
        </li>
        <li>
          <strong>Understanding and replying (the language model).</strong> It has to reply in the same mix the caller
          used, not switch to pure English or to formal Hindi.
        </li>
        <li>
          <strong>Speaking (text-to-speech).</strong> It has to pronounce the Hindi as Hindi and the English as Indian
          English, in one voice, without an odd jump in accent between the two.
        </li>
      </ul>

      <h2 id="script">Devanagari, romanised or mixed: why the script changes the voice</h2>
      <p>
        Most people never see the text a voice agent speaks from, but it shapes how the agent sounds. The same sentence
        can be written three ways:
      </p>
      <Table
        head={["How it is written", "Example", "What tends to happen"]}
        rows={[
          ["Romanised Hindi", "Aapka order confirm ho gaya hai", "The engine has to guess the Hindi vowels from Roman spelling, which has no fixed standard"],
          ["All Devanagari", "आपका ऑर्डर कन्फ़र्म हो गया है", "English words may be read in a Hindi way, or unevenly"],
          ["Mixed script", "आपका order confirm हो गया है", "Hindi read from Devanagari, English read as English"],
        ]}
      />
      <p>
        Sarvam, which makes the Bulbul TTS models, is direct about this in its documentation. It says to “always use
        native script for Indic words”. Its list of known limitations says that “Romanised/transliterated Indic input
        significantly degrades output quality: this is the most common integration mistake”. Its advice for mixed text is
        to “write English words in English script, Hindi words in Devanagari” and to keep brand names in English. It
        also recommends ending Hindi sentences with । and English ones with a full stop.
      </p>
      <p>
        That is one vendor’s guidance for its own engine, but the reasoning applies more widely. Romanised Hindi has no
        standard spelling (“hai”, “he”, “h”), so the engine has to guess. Devanagari spells out the sounds. English
        words written in Latin script are read as the English words they are.
      </p>
      <Callout tone="tip" title="Ask to see the text">
        <p>
          Ask any vendor to show you the text their agent sent to the speech engine on a demo call. If the Hindi is
          romanised, expect odd vowels and stress. That is fixable, but only if they know it is a problem.
        </p>
      </Callout>

      <h2 id="grammar">Gender, honorifics and “aap”</h2>
      <p>
        Hindi verbs mark the speaker’s gender. A female voice should say “मैं check कर रही हूँ” and a male voice “मैं
        check कर रहा हूँ”. The language model writes the words and the voice engine speaks them, and they are separate
        systems. Unless the model is told which voice it is writing for, you get a woman’s voice saying “कर रहा हूँ”.
        Callers notice at once.
      </p>
      <p>
        The caller’s gender matters too. Hindi forms addressed to another person often change with their gender (“आप
        आए थे” or “आप आई थीं”). An agent that doesn’t know who it is speaking to should not guess. Adding “ji” to the
        name, or rephrasing to avoid the gendered form, is safer.
      </p>
      <p>
        On a business call, respect is not optional. The agent should always use “आप”, never “तुम”, with the matching
        plural verb forms (“आप क्या करते हैं?”). An agent that slips into “tum” even once sounds rude, whatever else it
        gets right.
      </p>

      <h2 id="phone-hindi">Everyday phone Hindi, not textbook Hindi</h2>
      <p>
        Machine-translated Hindi tends towards formal, Sanskrit-heavy words that no one uses on the phone. On a sales or
        support call this sounds like a railway announcement, and callers stop listening.
      </p>
      <Table
        head={["Textbook Hindi", "Phone Hindi", "Meaning"]}
        rows={[
          ["आपका आवेदन स्वीकृत हो गया है", "आपका application approve हो गया है", "Your application is approved"],
          ["कृपया प्रतीक्षा करें", "एक second रुकिए", "Please wait a moment"],
          ["क्या आप कल उपलब्ध रहेंगे?", "कल आप free हैं?", "Are you free tomorrow?"],
          ["शुल्क का भुगतान", "fees का payment", "Fee payment"],
        ]}
      />
      <p>
        The right mix depends on who you call. A caller in a small town and one in a metro office may use very different
        amounts of English. A good agent follows the caller’s lead: if the caller answers in pure Hindi, it uses fewer
        English words.
      </p>

      <h2 id="backchannels">Haan, achha, hmm: backchannels and barge-in</h2>
      <p>
        Indian callers say “haan”, “achha”, “hmm” and “ji” all the time while the other person is talking. It means “I’m
        listening”, not “stop”. This is where many voice agents fail on real calls:
      </p>
      <ul>
        <li>An agent that stops every time it hears “haan” keeps breaking off mid-sentence and sounds broken.</li>
        <li>An agent that never stops can’t be interrupted when the caller really wants to say something.</li>
        <li>
          An agent that ignores the “haan” completely may miss that it was the answer to the question it just asked.
        </li>
      </ul>
      <p>
        The right behaviour is a judgement call. Talk through a short acknowledgement, and count it as a yes if it answers
        a question. Stop and listen when the caller starts a real sentence (“नहीं नहीं, मैंने already…”).
      </p>
      <p>
        Short answers are also where speech recognition is weakest. The Voice of India benchmark measured error rates by
        clip length. Averaged across languages, Amazon’s speech-to-text went from a 10.45% word error rate on clips over
        five seconds to 18.74% on clips under two seconds. Microsoft’s went from 10.90% to 18.59%. A soft one-word “haan” or “नहीं” on a phone line
        is exactly the clip most likely to be misheard, so test it on purpose.
      </p>

      <h2 id="numbers">Numbers, dates and phone numbers</h2>
      <p>
        Hinglish speakers mix number systems freely: “साढ़े तीन हज़ार”, “thirty-five hundred”, “3,500”, “ढाई lakh”,
        “twenty-five thousand”. Lakh and crore are normal. Things to check:
      </p>
      <ul>
        <li>
          <strong>Amounts</strong> should be spoken as amounts, in the caller’s language. ₹25,000 read as “two five zero
          zero zero” is a failure. Sarvam’s docs suggest commas in numbers over four digits and, for mixed text, setting
          the language code to “the language in which you want entities (e.g numbers) in speech”.
        </li>
        <li>
          <strong>Phone numbers</strong> should be read digit by digit, in groups, and read back once to confirm. A
          ten-digit number spoken as “nine hundred eighty-seven crore…” is useless.
        </li>
        <li>
          <strong>Dates and times</strong> such as “कल शाम”, “परसों” and “next Monday” have to become a specific date.
          “कल” means both yesterday and tomorrow in Hindi, and only the context tells you which.
        </li>
      </ul>

      <h2 id="names">Brand names, product names and people’s names</h2>
      <p>
        Your brand, your product names and your customers’ names come up on almost every call. Some acronyms are said as
        letters (“EMI”) and some as words (“NEET”). Names from Tamil Nadu, Punjab and Bengal follow different sound
        rules. A TTS engine will get some of these wrong. Sarvam’s docs recommend “a pronunciation dictionary to correct
        mispronounced names, brands, or domain-specific terms instead of relying on phonetic spelling workarounds”. Ask
        whether your vendor has one and who maintains it.
      </p>

      <h2 id="accuracy-claims">How to read vendor accuracy claims</h2>
      <p>
        Speech recognition accuracy is usually reported as word error rate (WER): the share of words the system got wrong.
        Lower is better. The number depends heavily on the test audio. The Voice of India benchmark, from researchers at
        IIT Madras and Josh Talks, uses 536 hours of unscripted two-person telephonic conversations from 36,691 speakers in
        15 languages. On its Hindi set, WER ranged from 5 (Sarvam Audio) to 33.9 (GPT-4o Transcribe) across the 14
        systems tested. Same audio, a nearly seven-fold difference.
      </p>
      <p>The paper found two more things that matter to buyers:</p>
      <ul>
        <li>
          District-level results vary widely, from about 4% to 44% WER. Districts in the Hindi belt clustered below 10%,
          while linguistically diverse regions scored much worse. Ask where a vendor’s test audio came from.
        </li>
        <li>
          Poorer audio quality consistently pushed error rates up. Phone lines, speakerphones and noisy streets are your
          real conditions.
        </li>
      </ul>
      <p>
        The authors also conclude that public benchmarks “can overestimate real world performance”. A good score on a
        clean public test set tells you little about your callers. The only test that counts is your own audio.
      </p>

      <h2 id="listening-test">A 10-point listening test for any vendor’s demo</h2>
      <p>
        Call the demo line yourself, from an ordinary phone, not a laptop. Score each point 0 (fails), 1 (mostly) or 2
        (natural). Run it twice: once as a friendly caller and once as a busy, distracted one.
      </p>
      <Steps
        items={[
          { title: "Mixed sentence", body: "Say “मेरा form submit हो गया था, पर payment fail हो गया।” Does it understand both halves and reply in the same mix?" },
          { title: "Script check", body: "Ask for the text log of what the agent said. Is the Hindi in Devanagari and the English in English? Romanised Hindi is a warning sign." },
          { title: "Gender agreement", body: "Listen for “कर रही हूँ” or “कर रहा हूँ” matching the voice. Switch to a voice of the other gender and test again." },
          { title: "Respect", body: "Does it always use “आप”? How does it address you when it doesn’t know your gender?" },
          { title: "Register", body: "Does it sound like a person on the phone, or does it use textbook words like “कृपया”, “उपलब्ध” and “स्वीकृत”?" },
          { title: "Backchannels and barge-in", body: "Say “haan… haan” while it talks. It should carry on. Then interrupt with a full sentence. It should stop and listen." },
          { title: "One-word answers", body: "Answer a yes/no question with only a soft “haan” or “nahi”. Did it catch it, and did it act on it?" },
          { title: "Numbers and dates", body: "Give a phone number in mixed Hindi and English, an amount (“ढाई lakh”) and a time (“कल शाम सात बजे”). Does it read the number back digit by digit and get the date right?" },
          { title: "Names and brands", body: "Ask about your own brand and products, and give three names from different states. Note every mispronunciation." },
          { title: "A bad line", body: "Call on speakerphone from a noisy street. When it can’t hear you, does it recover politely or apologise in a loop?" },
        ]}
      />
      <p>
        A score of 16 or more out of 20 on both runs means the agent is ready for a pilot with real leads. Anything below
        that needs fixing before your customers hear it. Whatever the score, listen to the recordings afterwards. Things
        you missed live are obvious on replay.
      </p>

      <WhereTelleoFits>
        <p>
          Telleo’s agents are built for these problems. Hindi is written in Devanagari with English business words in
          English. First-person verbs match the voice’s gender. When the caller’s gender is unknown, the agent says
          “&lt;name&gt; ji” instead of guessing. It speaks everyday phone Hindi. A short “haan”, “achha”, “okay” or
          “hello” while the agent is talking doesn’t derail it, and the “yes” still counts. Numbers are spoken as words
          and phone numbers digit by digit.
        </p>
        <p>
          You can hear any of the 80+ voices across 7 speech engines before you choose (see{" "}
          <Link href="/voices-and-languages/">voices and languages</Link>). Hindi, English and Hinglish are in
          production. Other Indian languages are set up on request. Run the test above on our live line: +91 80356
          14126.
        </p>
      </WhereTelleoFits>

      <Sources
        items={[
          { label: "Sarvam AI — Best Practices for Writing Text for TTS (docs)", url: "https://docs.sarvam.ai/api/api-guides-tutorials/text-to-speech/best-practices", checked: CHECKED },
          { label: "Sarvam AI — Bulbul text-to-speech model (docs)", url: "https://docs.sarvam.ai/api-reference-docs/models/bulbul", checked: CHECKED },
          { label: "Bhogale et al. — Voice of India: A Large-Scale Benchmark for Real-World Speech Recognition in India, arXiv 2604.19151 (v4, July 2026)", url: "https://arxiv.org/abs/2604.19151", checked: CHECKED },
        ]}
      />
    </BlogShell>
  );
}

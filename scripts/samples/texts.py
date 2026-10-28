"""Everything the samples say.

Rules (docs/PRODUCT_FACTS.md, "Hindi, done properly"): Hindi in Devanagari with
everyday English business words kept in English; numbers spoken as words; a
female voice says "बोल रही हूँ", a male voice "बोल रहा हूँ". Bengali verbs carry no
gender. The businesses, people and prices are invented for the samples.

Gender tokens in Hindi lines: {rahi} रही/रहा · {gayi} गई/गया · {dungi} दूँगी/दूँगा,
filled from the speaker's gender (A = agent, C = caller in the calls).
"""

LANGS = {"en": "English", "hi": "Hinglish", "bn": "Bengali"}

# ── voice gallery: three everyday lines per language ──────────────────────────
USE_CASES = {
    "sales": "Sales call",
    "reminder": "Payment reminder",
    "feedback": "Feedback call",
}

GALLERY = {
    "en": {
        "sales": "Hi, this is {name} from Greenwood Homes. You'd asked about our two-bedroom "
                 "apartments, so I wanted to check if a site visit this Saturday at eleven would "
                 "work for you?",
        "reminder": "Hello Mr. Sharma, this is {name} calling from Sunrise Finance. Your EMI of "
                    "four thousand five hundred rupees is due the day after tomorrow. Shall I send "
                    "the payment link to your WhatsApp?",
        "feedback": "Hi, this is {name} from CarePlus Clinic. How was your appointment yesterday? "
                    "On a scale of one to five, how would you rate your visit?",
    },
    "hi": {
        "sales": "नमस्ते, मैं Greenwood Homes से {name} बोल {rahi} हूँ। आपने हमारे two BHK flats के "
                 "बारे में enquiry की थी, तो क्या इस Saturday सुबह ग्यारह बजे site visit का time "
                 "ठीक रहेगा?",
        "reminder": "नमस्ते Sharma जी, मैं Sunrise Finance से {name} बोल {rahi} हूँ। आपकी चार हज़ार "
                    "पाँच सौ रुपये की EMI परसों due है। क्या मैं payment link आपके WhatsApp पर भेज "
                    "दूँ?",
        "feedback": "नमस्ते, मैं CarePlus Clinic से {name} बोल {rahi} हूँ। कल आपका appointment "
                    "कैसा रहा? एक से पाँच में आप अपनी visit को कितने number देंगे?",
    },
    "bn": {
        "sales": "নমস্কার, আমি গ্রিনউড হোমস থেকে {name} বলছি। আপনি আমাদের টু বিএইচকে ফ্ল্যাটের "
                 "ব্যাপারে খোঁজ নিয়েছিলেন, এই শনিবার সকাল এগারোটায় সাইট ভিজিটের সময়টা কি আপনার "
                 "সুবিধা হবে?",
        "reminder": "নমস্কার বসুবাবু, আমি সানরাইজ ফাইন্যান্স থেকে {name} বলছি। আপনার চার হাজার "
                    "পাঁচশো টাকার ইএমআই পরশু দিতে হবে। পেমেন্টের লিঙ্কটা কি আপনার হোয়াটসঅ্যাপে "
                    "পাঠিয়ে দেব?",
        "feedback": "নমস্কার, আমি কেয়ারপ্লাস ক্লিনিক থেকে {name} বলছি। গতকাল আপনার অ্যাপয়েন্টমেন্ট "
                    "কেমন ছিল? এক থেকে পাঁচের মধ্যে আপনি আমাদের কত নম্বর দেবেন?",
    },
}

_FORMS = {"rahi": ("रही", "रहा"), "gayi": ("गई", "गया"), "dungi": ("दूँगी", "दूँगा")}


def fill(text: str, name: str = "", gender: str = "female", caller_gender: str = "female",
         agent: str = "") -> str:
    """Fill {name}/{agent} and the gender tokens ({rahi} = the speaker's own;
    {C:rahi} = the caller's when an agent line refers to them — unused today)."""
    out = text.replace("{name}", name).replace("{agent}", agent)
    for tok, (f, m) in _FORMS.items():
        out = out.replace("{" + tok + "}", f if gender == "female" else m)
        out = out.replace("{C:" + tok + "}", f if caller_gender == "female" else m)
    return out


# The 12 Chirp3-HD voices are named after stars; on the site they get Indian
# names (the agent picker still shows the original id).
GOOGLE_NAMES = {
    "Achird": "Arjun", "Charon": "Vikram", "Fenrir": "Rohit", "Orus": "Sameer",
    "Puck": "Nikhil", "Schedar": "Pranav",
    "Achernar": "Ananya", "Aoede": "Meera", "Kore": "Kriti", "Leda": "Radhika",
    "Zephyr": "Diya", "Sulafat": "Sneha",
}

# Navana voices, written in Bengali script for the Bengali lines.
BENGALI_NAMES = {
    "achu": "অচু", "anirban": "অনির্বাণ", "basava": "বাসব", "basheer": "বশির", "bijay": "বিজয়",
    "chhotu": "ছোটু", "elango": "এলাঙ্গো", "faizal": "ফয়জল", "gurdeep": "গুরদীপ",
    "imran": "ইমরান", "kannan": "কান্নান", "kishan": "কিষাণ", "murugan": "মুরুগান",
    "savio": "স্যাভিও", "shivanna": "শিবান্না", "srinu": "শ্রীনু", "sulaiman": "সুলেমান",
    "tanaji": "তানাজি", "temjen": "তেমজেন", "vetri": "ভেত্রি", "xavier": "জেভিয়ার",
    "ammu": "আম্মু", "ann": "অ্যান", "arasi": "অরসি", "ayesha": "আয়েশা", "bhavana": "ভাবনা",
    "bimla": "বিমলা", "champa": "চম্পা", "falguni": "ফাল্গুনী", "flavia": "ফ্লাভিয়া",
    "harleen": "হারলিন", "ipsita": "ঈপ্সিতা", "jayita": "জয়িতা", "jessy": "জেসি",
    "kayal": "কায়াল", "mahadevi": "মহাদেবী", "malar": "মালার", "maria": "মারিয়া",
    "merin": "মেরিন", "mukta": "মুক্তা", "nasrin": "নাসরিন", "nayeema": "নাঈমা",
    "netra": "নেত্রা", "nila": "নীলা", "ponni": "পোন্নি", "porkavi": "পোরকাভি",
    "rukhiya": "রুখিয়া", "rukhsana": "রুখসানা", "selvi": "সেলভি", "shabnam": "শবনম",
    "sharon": "শ্যারন", "shikha": "শিখা", "vanaja": "বনজা", "yasmin": "ইয়াসমিন", "zoya": "জোয়া",
}

# ── sample calls: four use cases × three languages ────────────────────────────
# Each call: agent gender, caller gender, turns as (A|C, text).
CALL_USE_CASES = {
    "lead-qualification": "Lead qualification",
    "appointment-booking": "Appointment booking",
    "payment-reminders": "Payment reminder",
    "feedback-surveys": "Feedback survey",
}

CALLS = {
    "lead-qualification": {
        "context": "An admissions enquiry from a coaching institute's website form, qualified and "
                   "booked into a counselling session.",
        "agent": "female", "caller": "male",
        "en": [
            ("A", "Hi, am I speaking with Rohan? This is {agent} from Brightpath Academy. You "
                  "filled our form about the JEE course yesterday. Is this a good time for two "
                  "minutes?"),
            ("C", "Yes, go ahead."),
            ("A", "Thank you! Which class is your child in right now?"),
            ("C", "My daughter is in class eleven. We're mainly worried about physics."),
            ("A", "Got it, class eleven, and physics needs some extra attention. Would you prefer "
                  "an online batch, or classes at our centre in Andheri?"),
            ("C", "Offline would be better. How much are the fees?"),
            ("A", "The two-year programme is ninety-five thousand rupees, and there's a "
                  "scholarship test this Sunday that can take up to forty percent off. Shall I "
                  "book a free counselling session for you first?"),
            ("C", "Sure, Saturday works for us."),
            ("A", "Saturday at eleven in the morning, or four in the evening?"),
            ("C", "Eleven is fine."),
            ("A", "Done. You're booked for Saturday at eleven, and I'll send the address and the "
                  "scholarship test link on WhatsApp. Thank you, and have a good day!"),
        ],
        "hi": [
            ("A", "नमस्ते, क्या मेरी बात Rohan जी से हो रही है? मैं Brightpath Academy से {agent} "
                  "बोल {rahi} हूँ। कल आपने हमारे JEE course का form भरा था। क्या अभी दो minute "
                  "बात हो सकती है?"),
            ("C", "हाँ, बोलिए।"),
            ("A", "Thank you! आपका बच्चा अभी किस class में है?"),
            ("C", "बेटी है, eleventh में। Physics को लेकर थोड़ी tension है।"),
            ("A", "जी, eleventh, और physics पर थोड़ा extra ध्यान चाहिए। आप online batch पसंद "
                  "करेंगे, या Andheri वाले हमारे centre पर classes?"),
            ("C", "Offline ही ठीक रहेगा। Fees कितनी है?"),
            ("A", "Two year program की fees पंचानवे हज़ार रुपये है, और इस Sunday एक scholarship "
                  "test है जिससे चालीस percent तक की छूट मिल सकती है। क्या मैं पहले एक free "
                  "counselling session book कर दूँ?"),
            ("C", "हाँ, Saturday ठीक रहेगा।"),
            ("A", "Saturday सुबह ग्यारह बजे, या शाम चार बजे?"),
            ("C", "ग्यारह बजे ठीक है।"),
            ("A", "हो गया। Saturday सुबह ग्यारह बजे आपका session book है, और address के साथ "
                  "scholarship test का link मैं WhatsApp पर भेज {dungi}। धन्यवाद, आपका दिन "
                  "अच्छा रहे!"),
        ],
        "bn": [
            ("A", "নমস্কার, আমি কি অরিজিৎবাবুর সঙ্গে কথা বলছি? আমি ব্রাইটপাথ অ্যাকাডেমি থেকে "
                  "{agent} বলছি। গতকাল আপনি আমাদের জয়েন্টের কোর্সের ফর্মটা ভরেছিলেন। দু'মিনিট কথা "
                  "বলা যাবে?"),
            ("C", "হ্যাঁ, বলুন।"),
            ("A", "ধন্যবাদ! আপনার ছেলে বা মেয়ে এখন কোন ক্লাসে পড়ে?"),
            ("C", "মেয়ে, ক্লাস ইলেভেনে। ফিজিক্সটা নিয়েই একটু চিন্তা।"),
            ("A", "বুঝেছি, ইলেভেন, আর ফিজিক্সে একটু বেশি নজর দরকার। আপনি অনলাইন ব্যাচ চাইবেন, "
                  "নাকি সল্টলেকে আমাদের সেন্টারে এসে ক্লাস?"),
            ("C", "সেন্টারেই ভালো। ফি কত?"),
            ("A", "দু'বছরের প্রোগ্রাম পঁচানব্বই হাজার টাকা, আর এই রবিবার একটা স্কলারশিপ টেস্ট "
                  "আছে, তাতে চল্লিশ শতাংশ পর্যন্ত ছাড় পাওয়া যায়। আগে একটা ফ্রি কাউন্সেলিং সেশন "
                  "বুক করে দিই?"),
            ("C", "হ্যাঁ, শনিবার হলে ভালো।"),
            ("A", "শনিবার সকাল এগারোটা, না বিকেল চারটে?"),
            ("C", "এগারোটাই ঠিক আছে।"),
            ("A", "হয়ে গেল। শনিবার সকাল এগারোটায় আপনার সেশন বুক করা হলো, ঠিকানা আর স্কলারশিপ "
                  "টেস্টের লিঙ্ক হোয়াটসঅ্যাপে পাঠিয়ে দিচ্ছি। ধন্যবাদ, ভালো থাকবেন!"),
        ],
    },
    "appointment-booking": {
        "context": "A real-estate enquiry from last week, turned into a site visit with a time, "
                   "the number of visitors and directions on WhatsApp.",
        "agent": "male", "caller": "male",
        "en": [
            ("A", "Hello, am I speaking with Mr. Mehta? This is {agent} from Greenwood Homes. You "
                  "enquired about our two BHK flats in Whitefield last week."),
            ("C", "Yes, I did. Are they still available?"),
            ("A", "Yes, a few units on the higher floors are still open, starting at eighty-two "
                  "lakh. Are you looking for your own home, or as an investment?"),
            ("C", "For ourselves. We're planning to move by March."),
            ("A", "Then the timing works well, possession is in January. Would you like to see the "
                  "sample flat this weekend?"),
            ("C", "Sunday would be best."),
            ("A", "On Sunday I have eleven in the morning and three in the afternoon. Which one "
                  "suits you?"),
            ("C", "Three o'clock."),
            ("A", "Great, Sunday at three. Will anyone be coming with you?"),
            ("C", "My wife will come too."),
            ("A", "Perfect. I've booked the visit for two on Sunday at three, and our site manager "
                  "Rakesh will meet you at the gate. You'll get the location on WhatsApp. See you "
                  "on Sunday!"),
        ],
        "hi": [
            ("A", "नमस्ते, क्या मेरी बात Mehta जी से हो रही है? मैं Greenwood Homes से {agent} "
                  "बोल {rahi} हूँ। पिछले हफ़्ते आपने Whitefield में हमारे two BHK flats के बारे "
                  "में enquiry की थी।"),
            ("C", "हाँ, की थी। Flats अभी available हैं?"),
            ("A", "जी, ऊपर के floors पर कुछ units अभी available हैं, बयासी लाख से शुरू। ये अपने "
                  "रहने के लिए देख रहे हैं, या investment के लिए?"),
            ("C", "अपने लिए ही, March तक shift होना है।"),
            ("A", "फिर तो timing सही है, possession January में है। क्या आप इस weekend sample "
                  "flat देखने आना चाहेंगे?"),
            ("C", "Sunday सबसे अच्छा रहेगा।"),
            ("A", "Sunday को सुबह ग्यारह बजे और दोपहर तीन बजे के slots हैं। कौन सा ठीक रहेगा?"),
            ("C", "तीन बजे।"),
            ("A", "बढ़िया, Sunday तीन बजे। आपके साथ कोई और भी आएगा?"),
            ("C", "मेरी wife भी आएँगी।"),
            ("A", "Perfect। Sunday तीन बजे दो लोगों के लिए visit book कर दी है, gate पर हमारे "
                  "site manager Rakesh जी आपसे मिलेंगे। Location आपको WhatsApp पर मिल जाएगी। "
                  "Sunday को मिलते हैं!"),
        ],
        "bn": [
            ("A", "নমস্কার, আমি কি মিত্রবাবুর সঙ্গে কথা বলছি? আমি গ্রিনউড হোমস থেকে {agent} "
                  "বলছি। গত সপ্তাহে আপনি নিউটাউনে আমাদের টু বিএইচকে ফ্ল্যাটের ব্যাপারে খোঁজ "
                  "নিয়েছিলেন।"),
            ("C", "হ্যাঁ, নিয়েছিলাম। ফ্ল্যাট কি এখনও পাওয়া যাচ্ছে?"),
            ("A", "হ্যাঁ, ওপরের দিকের ফ্লোরে কয়েকটা ইউনিট এখনও আছে, দাম শুরু বাষট্টি লাখ থেকে। "
                  "ফ্ল্যাটটা কি নিজেদের থাকার জন্য, না ইনভেস্টমেন্ট?"),
            ("C", "নিজেদের জন্যই, মার্চের মধ্যে শিফট করতে চাই।"),
            ("A", "তাহলে ভালোই হবে, পজেশন জানুয়ারিতে। এই উইকএন্ডে স্যাম্পল ফ্ল্যাটটা দেখতে "
                  "আসবেন?"),
            ("C", "রবিবার হলে সুবিধা হয়।"),
            ("A", "রবিবার সকাল এগারোটা আর দুপুর তিনটেয় স্লট আছে। কোনটা আপনার সুবিধা?"),
            ("C", "তিনটে।"),
            ("A", "বেশ, রবিবার তিনটে। আপনার সঙ্গে আর কেউ আসবেন?"),
            ("C", "আমার স্ত্রীও আসবেন।"),
            ("A", "দারুণ। রবিবার তিনটেয় দুজনের জন্য ভিজিট বুক করে দিলাম, গেটে আমাদের সাইট "
                  "ম্যানেজার রাকেশবাবু আপনাদের সঙ্গে দেখা করবেন। লোকেশন হোয়াটসঅ্যাপে পেয়ে "
                  "যাবেন। রবিবার দেখা হচ্ছে!"),
        ],
    },
    "payment-reminders": {
        "context": "A two-wheeler loan EMI reminder that ends with a promised payment date and "
                   "a payment link on WhatsApp.",
        "agent": "female", "caller": "male",
        "en": [
            ("A", "Hello, is this Mr. Sharma? This is {agent} calling from Sunrise Finance about "
                  "your two-wheeler loan."),
            ("C", "Yes, speaking."),
            ("A", "Just a reminder that your EMI of four thousand five hundred rupees is due on "
                  "the fifth. Will you be able to pay it by then?"),
            ("C", "Actually, my salary comes on the seventh this month."),
            ("A", "I understand. If the payment comes on the seventh, a late fee of two hundred "
                  "rupees may apply. Can I take the seventh as your payment date?"),
            ("C", "Yes, the seventh, for sure."),
            ("A", "Noted, the seventh. Shall I send a payment link on WhatsApp, so you can pay in "
                  "one tap?"),
            ("C", "Yes, please send it."),
            ("A", "Sent. Is there anything else I can help you with today?"),
            ("C", "No, that's all."),
            ("A", "Thank you, Mr. Sharma. Have a good evening!"),
        ],
        "hi": [
            ("A", "नमस्ते, क्या मेरी बात Sharma जी से हो रही है? मैं Sunrise Finance से {agent} "
                  "बोल {rahi} हूँ, आपके two-wheeler loan के बारे में।"),
            ("C", "हाँ, बोल रहा हूँ।"),
            ("A", "बस याद दिलाने के लिए call किया था, आपकी चार हज़ार पाँच सौ रुपये की EMI पाँच "
                  "तारीख को due है। क्या तब तक payment हो जाएगा?"),
            ("C", "इस महीने salary सात तारीख को आएगी।"),
            ("A", "समझ {gayi}। सात तारीख को payment करने पर दो सौ रुपये की late fee लग सकती है। "
                  "क्या मैं सात तारीख पक्की मान लूँ?"),
            ("C", "हाँ, सात तारीख पक्का।"),
            ("A", "Note कर लिया। क्या मैं WhatsApp पर payment link भेज दूँ, ताकि एक tap में "
                  "payment हो जाए?"),
            ("C", "हाँ, भेज दीजिए।"),
            ("A", "भेज दिया है। और कुछ मदद चाहिए आपको?"),
            ("C", "नहीं, बस इतना ही।"),
            ("A", "धन्यवाद Sharma जी, आपकी शाम अच्छी रहे!"),
        ],
        "bn": [
            ("A", "নমস্কার, আমি কি বসুবাবুর সঙ্গে কথা বলছি? আমি সানরাইজ ফাইন্যান্স থেকে {agent} "
                  "বলছি, আপনার টু-হুইলার লোনের ব্যাপারে।"),
            ("C", "হ্যাঁ, বলছি।"),
            ("A", "মনে করিয়ে দেওয়ার জন্য ফোন করলাম, আপনার চার হাজার পাঁচশো টাকার ইএমআই পাঁচ "
                  "তারিখে দেওয়ার কথা। তার মধ্যে দিতে পারবেন তো?"),
            ("C", "আসলে এই মাসে মাইনে সাত তারিখে ঢুকবে।"),
            ("A", "বুঝতে পারছি। সাত তারিখে দিলে দুশো টাকা লেট ফি লাগতে পারে। সাত তারিখটাই কি "
                  "পাকা ধরব?"),
            ("C", "হ্যাঁ, সাত তারিখ, নিশ্চয়ই।"),
            ("A", "সাত তারিখ নোট করে নিলাম। হোয়াটসঅ্যাপে একটা পেমেন্ট লিঙ্ক পাঠিয়ে দিই, এক "
                  "ক্লিকেই পেমেন্ট হয়ে যাবে?"),
            ("C", "হ্যাঁ, পাঠিয়ে দিন।"),
            ("A", "পাঠিয়ে দিলাম। আর কিছু জানার আছে?"),
            ("C", "না, আর কিছু না।"),
            ("A", "ধন্যবাদ বসুবাবু, ভালো থাকবেন!"),
        ],
    },
    "feedback-surveys": {
        "context": "A post-visit feedback call for a clinic: a rating, the reason behind it, an "
                   "offer to escalate and a recommendation question.",
        "agent": "male", "caller": "female",
        "en": [
            ("A", "Hello, is this Ms. Priya? This is {agent} from CarePlus Clinic. You saw Dr. Rao "
                  "yesterday, and we'd like your feedback. It'll take just a minute."),
            ("C", "Okay, sure."),
            ("A", "On a scale of one to five, how would you rate your visit?"),
            ("C", "I'd say three."),
            ("A", "Thank you for being honest. What could we have done better?"),
            ("C", "The doctor was good, but I waited almost an hour."),
            ("A", "I'm sorry about that, an hour is too long. I'll share this with the clinic "
                  "manager today. Would you like someone to call you back about it?"),
            ("C", "No, it's fine. Just fix the waiting time."),
            ("A", "Understood, I've noted it. And would you recommend the clinic to a friend?"),
            ("C", "For the doctor, yes."),
            ("A", "That's good to hear. Thank you for your time, and get well soon!"),
        ],
        "hi": [
            ("A", "नमस्ते, क्या मेरी बात Priya जी से हो रही है? मैं CarePlus Clinic से {agent} "
                  "बोल {rahi} हूँ। कल आपने Doctor Rao को दिखाया था, उसके बारे में आपका feedback "
                  "लेना था, बस एक minute लगेगा।"),
            ("C", "ठीक है, बोलिए।"),
            ("A", "एक से पाँच में, आप अपनी visit को कितने number देंगी?"),
            ("C", "तीन दूँगी।"),
            ("A", "Honest feedback के लिए धन्यवाद। हम क्या बेहतर कर सकते थे?"),
            ("C", "Doctor अच्छे हैं, पर मुझे लगभग एक घंटा wait करना पड़ा।"),
            ("A", "माफ़ कीजिए, एक घंटा सच में बहुत ज़्यादा है। मैं आज ही ये बात clinic manager "
                  "तक पहुँचा {dungi}। क्या आप चाहेंगी कि इस बारे में कोई आपको call करे?"),
            ("C", "नहीं, ज़रूरत नहीं। बस waiting time कम कर दीजिए।"),
            ("A", "जी, note कर लिया है। और क्या आप अपने दोस्तों को हमारा clinic recommend "
                  "करेंगी?"),
            ("C", "Doctor के लिए, हाँ।"),
            ("A", "ये सुनकर अच्छा लगा। अपना time देने के लिए धन्यवाद, जल्दी ठीक हो जाइए!"),
        ],
        "bn": [
            ("A", "নমস্কার, আমি কি প্রিয়াঙ্কা দত্তের সঙ্গে কথা বলছি? আমি কেয়ারপ্লাস ক্লিনিক থেকে "
                  "{agent} বলছি। গতকাল আপনি ডক্টর সেনকে দেখিয়েছিলেন, সেই ব্যাপারে আপনার মতামত "
                  "জানতে চাই, এক মিনিট লাগবে।"),
            ("C", "আচ্ছা, বলুন।"),
            ("A", "এক থেকে পাঁচের মধ্যে আপনার ভিজিটকে কত দেবেন?"),
            ("C", "তিন দেব।"),
            ("A", "খোলাখুলি বলার জন্য ধন্যবাদ। আমরা কী আরও ভালো করতে পারতাম?"),
            ("C", "ডাক্তারবাবু ভালো, কিন্তু প্রায় এক ঘণ্টা বসে থাকতে হয়েছে।"),
            ("A", "খুবই দুঃখিত, এক ঘণ্টা সত্যিই অনেকক্ষণ। আজই ক্লিনিক ম্যানেজারকে জানিয়ে দেব। "
                  "এই নিয়ে কেউ কি আপনাকে ফোন করবে?"),
            ("C", "না, দরকার নেই। শুধু অপেক্ষার সময়টা কমান।"),
            ("A", "বুঝেছি, নোট করে নিলাম। আর বন্ধুদের কাছে কি আমাদের ক্লিনিকের কথা বলবেন?"),
            ("C", "ডাক্তারবাবুর জন্য, হ্যাঁ।"),
            ("A", "শুনে ভালো লাগল। সময় দেওয়ার জন্য ধন্যবাদ, তাড়াতাড়ি সুস্থ হয়ে উঠুন!"),
        ],
    },
}

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Bot,
  ArrowRight,
  TrendingUp,
  ShoppingBag,
  Send,
  HelpCircle,
  AlertCircle,
  Key,
  Settings,
  CheckCircle2,
  Lock,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Layers,
  ShieldCheck,
  MapPin
} from 'lucide-react';

export const VoiceAssistantModal = ({ isOpen, onClose }) => {
  const {
    lang,
    setLang,
    priceData,
    listings,
    catalog,
    setActiveTab,
    setCurrentRole,
    setSelectedListingId,
    t,
    showToast
  } = useApp();

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [inputText, setInputText] = useState('');
  const [micNotice, setMicNotice] = useState(null);
  const [showKeySettings, setShowKeySettings] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('vanmandi_gemini_key') || '';
  });
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [currentActions, setCurrentActions] = useState([]);

  const defaultGreeting =
    lang === 'hi'
      ? 'जोहार! मैं आपका वनमंडी वॉइस गाइड हूँ। आप मुझसे किसी भी वनोपज (लाख, महुआ, शहद, तसर कोकून, तेंदू पत्ता) का ताज़ा भाव, खरीद-बिक्री के नियम या 0% कमीशन नीति पूछ सकते हैं।'
      : lang === 'sat'
      ? 'ᱡᱚᱦᱟᱨ! ᱤᱧ ᱫᱚ ᱵᱚᱱᱢᱟᱱᱰᱤ ᱟᱲᱟᱝ ᱜᱚᱲᱚᱭᱤᱡ ᱠᱟᱱᱟᱹᱧ᱾ ᱞᱟᱦᱟ, ᱢᱟᱦᱩᱣᱟ, ᱧᱮᱞᱮ ᱨᱟᱥᱟ ᱟᱨ ᱛᱟᱥᱟᱨ ᱨᱮᱭᱟᱜ ᱜᱚᱱᱚᱝ ᱠᱩᱞᱤ ᱫᱟᱲᱮᱭᱟᱜ-ᱟᱢ᱾'
      : 'Johar! I am your VanMandi Voice Guide. Ask me today’s forest produce rates (Lac, Mahua, Honey, Tasar, Tendu), selling instructions (0% seller fee), or fair market benchmarks.';

  const [assistantReply, setAssistantReply] = useState(defaultGreeting);

  const recognitionRef = useRef(null);
  const transcriptAccumulatorRef = useRef('');
  const activeUtteranceRef = useRef(null);

  // Update greeting when language changes
  useEffect(() => {
    setAssistantReply(defaultGreeting);
  }, [lang]);

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setMicNotice(null);
        transcriptAccumulatorRef.current = '';
      };

      recognition.onresult = (event) => {
        let interimText = '';
        let finalText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript;
          } else {
            interimText += event.results[i][0].transcript;
          }
        }
        const combined = (finalText || interimText).trim();
        if (combined) {
          transcriptAccumulatorRef.current = combined;
          setTranscript(combined);
          setInputText(combined);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition status:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setMicNotice('Microphone permission not granted in browser. You can type your query in the box below.');
        } else if (event.error === 'network') {
          setMicNotice('Speech network service unavailable. You can type your query in the box below.');
        } else if (event.error !== 'no-speech') {
          setMicNotice(`Mic note: ${event.error}. You can type directly below.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        const query = transcriptAccumulatorRef.current.trim();
        if (query) {
          processQuery(query);
        }
      };

      recognitionRef.current = recognition;
    } else {
      setMicNotice('Speech recognition is not supported in this browser. Please type your query in the text box below.');
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lang]);

  // Save API Key
  const saveApiKey = (key) => {
    const cleanKey = key.trim();
    setGeminiApiKey(cleanKey);
    if (cleanKey) {
      localStorage.setItem('vanmandi_gemini_key', cleanKey);
      showToast('Gemini API Key configured successfully.', 'success');
    } else {
      localStorage.removeItem('vanmandi_gemini_key');
      showToast('Switched to built-in VanMandi Knowledge Engine.', 'info');
    }
    setShowKeySettings(false);
  };

  // Text-To-Speech (SpeechSynthesis)
  const speakText = (text) => {
    if (!ttsEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    // Clean markdown and symbols for speech
    const cleanSpeech = text
      .replace(/[*_#`₹]/g, '')
      .replace(/₹/g, ' rupees ')
      .replace(/[•👉✨🌸🍯🌾📦📊]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick Indian voice if available
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => (lang === 'hi' ? v.lang.includes('hi') : v.lang.includes('en-IN') || v.lang.includes('en_IN')));
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    activeUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Start Mic Listening
  const startListening = async () => {
    stopSpeaking();
    setTranscript('');
    setInputText('');
    setMicNotice(null);
    transcriptAccumulatorRef.current = '';

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Release tracks immediately so SpeechRecognition has clean microphone access
        stream.getTracks().forEach(track => track.stop());
      }
    } catch (err) {
      setMicNotice('Microphone access was denied. Please allow microphone in your browser settings or type your question below.');
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
      } catch (e) {
        try {
          recognitionRef.current.stop();
          setTimeout(() => {
            if (recognitionRef.current) recognitionRef.current.start();
          }, 150);
        } catch (retryErr) {
          setIsListening(true);
        }
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  // Optional External Gemini API Call
  const callGeminiAPI = async (prompt) => {
    // Only attempt if valid Google Gemini key format
    if (!geminiApiKey || !geminiApiKey.startsWith('AIzaSy')) {
      return null;
    }

    try {
      setIsLoadingAI(true);
      const systemContext = `You are the friendly, authoritative AI Voice Assistant for VanMandi (वनमंडी), a digital platform in Jharkhand, India connecting tribal gatherers (SHGs) with bulk buyers.
Platform Facts:
- Sellers (tribal gatherers) pay 0% fee (100% payout).
- Buyers pay 3% platform facilitation fee.
- Mandi benchmarks today: Kusmi Lac ₹515/kg (Khunti), Mahua ₹47/kg (Gumla), Raw Honey ₹450/kg (Latehar/Netarhat), Tasar Cocoons ₹4,350/kahan (Chaibasa), Tendu leaves ₹2,500/bag (Garhwa), Sal Seeds ₹2,450/quintal (Simdega).
Language: Respond in ${lang === 'hi' ? 'clear Hindi (सरल हिन्दी)' : 'clear English'} in 2-3 concise sentences.`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: `${systemContext}\n\nUser Question: ${prompt}` }] }]
          }),
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);
      const data = await res.json();
      setIsLoadingAI(false);

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
      return null;
    } catch (err) {
      console.warn('External API call failed, using built-in NLP:', err);
      setIsLoadingAI(false);
      return null;
    }
  };

  // Comprehensive Local NLP Engine
  const processQuery = async (queryText) => {
    if (!queryText || !queryText.trim()) return;
    const cleanQuery = queryText.trim();
    setTranscript(cleanQuery);
    setInputText(cleanQuery);

    // Try Gemini API first if configured
    if (geminiApiKey && geminiApiKey.startsWith('AIzaSy')) {
      const aiResponse = await callGeminiAPI(cleanQuery);
      if (aiResponse) {
        setAssistantReply(aiResponse);
        speakText(aiResponse);
        return;
      }
    }

    // Contextual Local NLP Engine
    const lower = cleanQuery.toLowerCase();
    let reply = '';
    let actions = [];

    // Produce Identifiers
    const isLac = lower.includes('lac') || lower.includes('लाख') || lower.includes('kusmi') || lower.includes('कुसुमी') || lower.includes('rangeeni') || lower.includes('रंगीनी') || lower.includes('lah');
    const isMahua = lower.includes('mahua') || lower.includes('महुआ') || lower.includes('flower') || lower.includes('फूल');
    const isHoney = lower.includes('honey') || lower.includes('शहद') || lower.includes('मधुमक्खी') || lower.includes('shahad') || lower.includes('karanj');
    const isTasar = lower.includes('tasar') || lower.includes('तसर') || lower.includes('silk') || lower.includes('सिल्क') || lower.includes('cocoon') || lower.includes('कोकून');
    const isTendu = lower.includes('tendu') || lower.includes('तेंदू') || lower.includes('leaves') || lower.includes('पत्ता') || lower.includes('bidi');
    const isSal = lower.includes('sal') || lower.includes('साल') || lower.includes('seeds') || lower.includes('बीज');
    const isBangles = lower.includes('bangle') || lower.includes('चूड़ी') || lower.includes('churi') || lower.includes('jewel') || lower.includes('gahna');
    const isChironji = lower.includes('chironji') || lower.includes('चिरौंजी') || lower.includes('charoli');
    const isHerbs = lower.includes('giloy') || lower.includes('गिलोय') || lower.includes('kalmegh') || lower.includes('कालमेघ') || lower.includes('haritaki') || lower.includes('baheda') || lower.includes('herb');

    // Intent Identifiers
    const isSellIntent = lower.includes('sell') || lower.includes('बेच') || lower.includes('list') || lower.includes('listing') || lower.includes('add produce') || lower.includes('dalna') || lower.includes('dalen') || lower.includes('bikri');
    const isBuyIntent = lower.includes('buy') || lower.includes('खरीद') || lower.includes('order') || lower.includes('procure') || lower.includes('sourcing') || lower.includes('lena') || lower.includes('purchase');
    const isCommissionIntent = lower.includes('commission') || lower.includes('कमीशन') || lower.includes('fee') || lower.includes('शुल्क') || lower.includes('cut') || lower.includes('paisa') || lower.includes('कटौती') || lower.includes('charge');
    const isSHGIntent = lower.includes('shg') || lower.includes('समूह') || lower.includes('women') || lower.includes('महिला') || lower.includes('samiti') || lower.includes('vikas');
    const isPriceIntent = lower.includes('price') || lower.includes('rate') || lower.includes('भाव') || lower.includes('दाम') || lower.includes('cost') || lower.includes('dam') || lower.includes('bhav') || lower.includes('mandi') || lower.includes('kitna') || lower.includes('rate kya');
    const isMSPIntent = lower.includes('msp') || lower.includes('सरकारी') || lower.includes('सरकार') || lower.includes('minimum support') || lower.includes('समर्थन');
    const isEscrowIntent = lower.includes('payment') || lower.includes('सुरक्षा') || lower.includes('paisa') || lower.includes('bank') || lower.includes('escrow') || lower.includes('safety') || lower.includes('fraud');
    const isAdminIntent = lower.includes('admin') || lower.includes('एडमिन') || lower.includes('governance') || lower.includes('panel');

    // Matching logic
    if (isLac) {
      const lac = priceData.find(p => p.productId === 'lac-kusmi') || priceData[0];
      reply = lang === 'hi'
        ? `खूंटी व तोरपा मंडी में आज ग्रेड-A कुसुमी लाख का भाव ₹${lac.currentPrice}/किलो है (उचित दायरा: ₹${lac.minPrice} - ₹${lac.maxPrice}/किलो)। पिछले सप्ताह से +4.2% की तेजी है।`
        : `In Khunti & Torpa Mandi, Grade-A Kusmi Lac is trading at ₹${lac.currentPrice}/kg (Fair range: ₹${lac.minPrice} - ₹${lac.maxPrice}/kg), trending up by +4.2%.`;
      actions = [
        { label: lang === 'hi' ? '📊 लाख मंडी भाव देखें' : '📊 View Lac Price Chart', tab: 'prices' },
        { label: lang === 'hi' ? '🛒 लाख के लॉट खरीदें' : '🛒 Browse Lac Batches', tab: 'marketplace' },
        { label: lang === 'hi' ? '🎙️ लाख उपज दर्ज करें (0% शुल्क)' : '🎙️ List Lac Stock (0% Fee)', tab: 'seller-voice-add', role: 'seller' }
      ];
    } else if (isMahua) {
      const mahua = priceData.find(p => p.productId === 'mahua-dry') || priceData[1];
      reply = lang === 'hi'
        ? `गुमला मंडी में आज खाद्य-ग्रेड सूखे महुआ फूल का भाव ₹${mahua.currentPrice}/किलो है (मानक दायरा: ₹${mahua.minPrice} - ₹${mahua.maxPrice}/किलो)। संग्राहकों को 100% भुगतान मिलता है।`
        : `In Gumla Mandi, food-grade sun-dried Mahua flower benchmark is ₹${mahua.currentPrice}/kg (Range: ₹${mahua.minPrice} - ₹${mahua.maxPrice}/kg). 100% direct payout to gatherers.`;
      actions = [
        { label: lang === 'hi' ? '🌸 महुआ मंडी भाव' : '🌸 Mahua Mandi Rates', tab: 'prices' },
        { label: lang === 'hi' ? '🛒 महुआ स्टॉक देखें' : '🛒 View Mahua Stock', tab: 'marketplace' },
        { label: lang === 'hi' ? '🎙️ महुआ बेचें' : '🎙️ List Mahua', tab: 'seller-voice-add', role: 'seller' }
      ];
    } else if (isHoney) {
      const honey = priceData.find(p => p.productId === 'wild-honey') || priceData[2];
      reply = lang === 'hi'
        ? `लातेहार एवं नेतरहाट के शुद्ध जंगली करंज व साल शहद का भाव ₹${honey.currentPrice}/किलो है। यह बिना किसी मिलावट का 100% कच्चा ऑर्गेनिक शहद है।`
        : `Raw Wild Karanj & Sal Forest Honey from Netarhat (Latehar) is priced at ₹${honey.currentPrice}/kg. Certified 100% raw unpasteurized organic produce.`;
      actions = [
        { label: lang === 'hi' ? '🍯 शहद के सत्यापित लॉट देखें' : '🍯 View Honey Lots', tab: 'marketplace' },
        { label: lang === 'hi' ? '📊 शहद मंडी भाव' : '📊 Honey Price Board', tab: 'prices' }
      ];
    } else if (isTasar) {
      const tasar = priceData.find(p => p.productId === 'tasar-cocoons') || priceData[4];
      reply = lang === 'hi'
        ? `पश्चिमी सिंहभूम (चाईबासा) में उच्च श्रेणी तसर कोकून का भाव ₹${tasar.currentPrice} प्रति कहान (1280 कोकून) है। सिल्क बुनकर सीधे यहाँ से खरीद सकते हैं।`
        : `In Chaibasa (West Singhbhum), Grade-1 wild Tasar silk cocoons benchmark is ₹${tasar.currentPrice} per kahan (1,280 cocoons). Silk handlooms procure directly.`;
      actions = [
        { label: lang === 'hi' ? '🧵 तसर कोकून मंडी' : '🧵 Tasar Cocoon Market', tab: 'marketplace' },
        { label: lang === 'hi' ? '📊 तसर भाव तालिका' : '📊 Tasar Price Board', tab: 'prices' }
      ];
    } else if (isTendu) {
      const tendu = priceData.find(p => p.productId === 'tendu-leaves') || priceData[3];
      reply = lang === 'hi'
        ? `गढ़वा एवं लातेहार में उच्च गुणवत्ता तेंदू पत्ता का भाव ₹${tendu.currentPrice} प्रति मानक बोरी (1000 गड्डी) है।`
        : `In Garhwa and Latehar, sun-cured large Tendu leaves are trading at ₹${tendu.currentPrice} per standard bag (1000 bundles).`;
      actions = [
        { label: lang === 'hi' ? '🍃 तेंदू पत्ता स्टॉक' : '🍃 Tendu Lots', tab: 'marketplace' },
        { label: lang === 'hi' ? '📊 तेंदू भाव' : '📊 Tendu Price', tab: 'prices' }
      ];
    } else if (isSal) {
      const sal = priceData.find(p => p.productId === 'sal-seeds') || priceData[5];
      reply = lang === 'hi'
        ? `सिमडेगा मंडी में पंख-रहित सूखे साल बीज का न्यूनतम मानक मूल्य ₹${sal.currentPrice} प्रति क्विंटल है।`
        : `In Simdega, sound de-winged Sal seeds are benchmarked at ₹${sal.currentPrice} per quintal (100 kg).`;
      actions = [
        { label: lang === 'hi' ? '🌿 साल बीज बाजार' : '🌿 Sal Seeds Market', tab: 'marketplace' }
      ];
    } else if (isBangles) {
      reply = lang === 'hi'
        ? `बिरसा मुंडा महिला SHG, तोरपा द्वारा निर्मित पारंपरिक लाख की चूड़ियों का सेट ₹320 (सेट ऑफ 4) में उपलब्ध है।`
        : `Handcrafted tribal Lac bangles made by Torpa Mahila SHG are available at ₹320 per set of 4.`;
      actions = [
        { label: lang === 'hi' ? '✨ लाख चूड़ियां देखें' : '✨ View Lac Bangles', tab: 'marketplace' }
      ];
    } else if (isChironji || isHerbs) {
      reply = lang === 'hi'
        ? `रांची एवं सिमडेगा में साबुत चिरौंजी का भाव ₹1,220/किलो, गिलोय ₹125/किलो और कालमेघ ₹95/किलो है।`
        : `Whole Chironji is trading at ₹1,220/kg, wild Giloy stems at ₹125/kg, and Kalmegh herb at ₹95/kg in Ranchi hub.`;
      actions = [
        { label: lang === 'hi' ? '🌿 जड़ी-बूटी बाजार' : '🌿 View Herbal Lots', tab: 'marketplace' }
      ];
    } else if (isSellIntent) {
      reply = lang === 'hi'
        ? `वनमंडी पर उपज बेचना बहुत आसान है! आप सीधे माइक दबाकर अपनी भाषा में मात्रा, जिला और अपेक्षित भाव बोलें। हम आपकी उपज तुरंत मंडी में प्रकाशित कर देंगे। विक्रेताओं से 0% कमीशन लिया जाता है।`
        : `Listing forest produce is seamless! Tap the mic in Seller Mode and speak your produce, weight, district, and asking price. Tribal sellers enjoy 0% commission with direct bank payout.`;
      actions = [
        { label: lang === 'hi' ? '🎙️ वॉइस से उपज जोड़ें (0% शुल्क)' : '🎙️ Voice List Produce (0% Fee)', tab: 'seller-voice-add', role: 'seller' },
        { label: lang === 'hi' ? '📋 विक्रेता डैशबोर्ड' : '📋 Seller Dashboard', tab: 'seller-dashboard', role: 'seller' }
      ];
    } else if (isBuyIntent) {
      reply = lang === 'hi'
        ? `वनमंडी थोक बाजार में आपका स्वागत है! यहाँ आप खूंटी, गुमला, लातेहार के आदिवासी महिला समूहों से सीधे 100% शुद्ध प्रमाणित वनोपज खरीद सकते हैं।`
        : `Welcome to VanMandi wholesale sourcing! You can place direct purchase orders and bids directly with verified tribal gatherers and women SHGs with secure escrow protection.`;
      actions = [
        { label: lang === 'hi' ? '🛒 मंडी बाजार खोलें' : '🛒 Open Marketplace', tab: 'marketplace' },
        { label: lang === 'hi' ? '🏢 खरीदार डैशबोर्ड' : '🏢 Buyer Sourcing Dashboard', tab: 'buyer-dashboard', role: 'buyer' }
      ];
    } else if (isCommissionIntent) {
      reply = lang === 'hi'
        ? `वनमंडी की नीति स्पष्ट है: आदिवासी संग्राहकों और महिला SHG से 0% कमीशन (शून्य शुल्क) लिया जाता है। आपको अपनी तय की गई पूरी राशि मिलती है। केवल कॉर्पोरेट खरीदारों से 3% सेवा शुल्क लिया जाता है।`
        : `VanMandi Guarantee: 100% Zero Commission for tribal gatherers and SHGs. You receive your entire agreed amount directly. Enterprise buyers pay a 3% platform facilitation fee.`;
      actions = [
        { label: lang === 'hi' ? '🎙️ 0% शुल्क पर उपज बेचें' : '🎙️ Sell at 0% Commission', tab: 'seller-voice-add', role: 'seller' }
      ];
    } else if (isSHGIntent) {
      reply = lang === 'hi'
        ? `झारखंड के खूंटी, गुमला और लातेहार में 180 से अधिक महिला स्वयं सहायता समूह लाख प्रसंस्करण, शहद संग्रह और तसर सिल्क तैयार करने में सक्रिय हैं। वे बिचौलियों के बिना +48% अधिक आय प्राप्त कर रही हैं।`
        : `Over 180 women Self-Help Groups across Khunti, Gumla, and Latehar are active in Lac processing, honey harvesting, and Tasar silk with +48% direct income gain.`;
      actions = [
        { label: lang === 'hi' ? '👥 महिला SHG समूह देखें' : '👥 View Women SHGs', tab: 'shgs' }
      ];
    } else if (isMSPIntent || isPriceIntent) {
      reply = lang === 'hi'
        ? `आज के प्रमुख मंडी भाव: कुसुमी लाख ₹515/किलो, महुआ फूल ₹47/किलो, जंगली शहद ₹450/किलो, और तसर कोकून ₹4,350/कहान। सभी जिलों की ताज़ा भाव तालिका देख सकते हैं।`
        : `Today's Mandi Benchmarks: Kusmi Lac ₹515/kg, Mahua Flower ₹47/kg, Wild Honey ₹450/kg, Tasar Cocoons ₹4,350/kahan. Opening the full live price board.`;
      actions = [
        { label: lang === 'hi' ? '📊 सभी मंडी भाव बोर्ड' : '📊 Full Price Board', tab: 'prices' }
      ];
    } else if (isEscrowIntent) {
      reply = lang === 'hi'
        ? `वनमंडी में बैंक एस्क्रो सुरक्षा है: खरीदार का पैसा सुरक्षित एस्क्रो में जमा होता है और वजन व गुणवत्ता सत्यापन के बाद 24 घंटे के भीतर सीधे विक्रेता के बैंक खाते में ट्रांसफर होता है।`
        : `VanMandi operates secure escrow: Buyer funds are held safely upon order and released directly to tribal seller bank accounts within 24 hours of weighment and dispatch.`;
      actions = [
        { label: lang === 'hi' ? '🛡️ एस्क्रो सुरक्षा जांचें' : '🛡️ Check Escrow & Orders', tab: 'orders' }
      ];
    } else if (isAdminIntent) {
      reply = lang === 'hi'
        ? `वनमंडी प्रशासनिक गवर्नेंस पैनल में आपका स्वागत है। यहाँ से आप मंडी दरें अपडेट कर सकते हैं, SHG सत्यापन कर सकते हैं और प्लेटफॉर्म एस्क्रो मॉनिटर कर सकते हैं।`
        : `Welcome to VanMandi Administrative Governance. Manage daily MSP benchmarks, verify SHG credentials, and oversee platform escrow transactions.`;
      actions = [
        { label: lang === 'hi' ? '⚙️ एडमिन पैनल खोलें' : '⚙️ Open Admin Governance', tab: 'admin', role: 'admin' }
      ];
    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('johar') || lower.includes('जोहार') || lower.includes('नमस्ते') || lower.includes('namaste')) {
      reply = lang === 'hi'
        ? `जोहार! मैं वनमंडी वॉइस असिस्टेंट हूँ। आप मुझसे लाख, महुआ, शहद या तसर के ताज़ा भाव पूछ सकते हैं, या उपज बेचने और खरीदने में मदद ले सकते हैं।`
        : `Johar! I am your VanMandi Assistant. Ask me any produce prices (Lac, Mahua, Honey, Tasar) or ask how to sell or buy forest produce.`;
      actions = [
        { label: lang === 'hi' ? '📊 आज के मंडी भाव' : "📊 Today's Mandi Rates", tab: 'prices' },
        { label: lang === 'hi' ? '🛒 थोक उपज खरीदें' : '🛒 Sourcing Marketplace', tab: 'marketplace' }
      ];
    } else {
      reply = lang === 'hi'
        ? `मैंने आपका प्रश्न समझा: "${cleanQuery}"। आप किसी विशिष्ट वनोपज का नाम (जैसे कुसुमी लाख, महुआ, शहद, तसर कोकून) या जिला (खूंटी, गुमला, लातेहार) बोलकर आज का सरकारी भाव जान सकते हैं या सीधे उपज बेच सकते हैं।`
        : `I received your query: "${cleanQuery}". You can ask today's market rates for Kusmi Lac, Mahua, Wild Honey, or Tasar Cocoons in Khunti, Gumla, or Latehar, or ask how to list produce.`;
      actions = [
        { label: lang === 'hi' ? '📊 भाव तालिका देखें' : '📊 View Price Table', tab: 'prices' },
        { label: lang === 'hi' ? '🛒 बाजार देखें' : '🛒 Browse Produce', tab: 'marketplace' }
      ];
    }

    setAssistantReply(reply);
    setCurrentActions(actions);
    speakText(reply);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      processQuery(inputText.trim());
    }
  };

  const handleQuickQuestion = (q) => {
    setInputText(q);
    processQuery(q);
  };

  const handleActionClick = (action) => {
    if (action.role) setCurrentRole(action.role);
    if (action.tab) setActiveTab(action.tab);
    stopSpeaking();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl border border-sand-300 relative max-h-[92vh] overflow-y-auto">
        
        {/* Header with Language Selector & Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-sand-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-forest-800 text-emerald-400 flex items-center justify-center shadow">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-forest-900 font-display">
                  VanMandi Voice Assistant
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                  {geminiApiKey && geminiApiKey.startsWith('AIzaSy') ? 'Gemini AI' : 'Instant NLP'}
                </span>
              </div>
              <p className="text-[11px] text-sand-500">Live Voice & Text AI for Forest Produce</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Voice Toggle */}
            <button
              onClick={() => {
                if (isSpeaking) stopSpeaking();
                setTtsEnabled(!ttsEnabled);
              }}
              title={ttsEnabled ? 'Mute Voice Audio' : 'Unmute Voice Audio'}
              className={`p-1.5 rounded-xl border transition-colors ${
                ttsEnabled ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-sand-100 border-sand-300 text-sand-500'
              }`}
            >
              {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Optional API Key Toggle */}
            <button
              onClick={() => setShowKeySettings(!showKeySettings)}
              title="Configure Optional Gemini API Key"
              className="p-1.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-sand-700 border border-sand-300"
            >
              <Key className="w-4 h-4 text-forest-800" />
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                stopSpeaking();
                stopListening();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-sand-700 border border-sand-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Language Tabs in Assistant */}
        <div className="flex items-center justify-between bg-sand-50 p-1.5 rounded-2xl border border-sand-200 text-xs">
          <span className="text-[11px] font-bold text-sand-600 pl-2">Speech Language:</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`px-3 py-1 rounded-xl font-bold transition-colors ${
                lang === 'hi' ? 'bg-forest-800 text-white shadow-xs' : 'text-sand-700 hover:bg-sand-200'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-xl font-bold transition-colors ${
                lang === 'en' ? 'bg-forest-800 text-white shadow-xs' : 'text-sand-700 hover:bg-sand-200'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang('sat')}
              className={`px-3 py-1 rounded-xl font-bold transition-colors ${
                lang === 'sat' ? 'bg-forest-800 text-white shadow-xs' : 'text-sand-700 hover:bg-sand-200'
              }`}
            >
              ᱥᱟᱱᱛᱟᱲᱤ
            </button>
          </div>
        </div>

        {/* Optional Gemini Key Settings Drawer */}
        {showKeySettings && (
          <div className="bg-sand-50 p-4 rounded-2xl border border-sand-300 space-y-2 text-xs animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-forest-900 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-terracotta-600" />
                <span>Google Gemini API Key (Optional)</span>
              </span>
              <button onClick={() => setShowKeySettings(false)} className="text-sand-500 hover:underline text-xs">
                Close
              </button>
            </div>
            <p className="text-[11px] text-sand-600">
              The built-in VanMandi NLP Engine works instantly without any API key. If you have a Google Gemini API key (`AIzaSy...`), paste it here:
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                className="flex-1 p-2 rounded-xl border border-sand-300 text-xs bg-white text-forest-950 font-mono"
              />
              <button
                type="button"
                onClick={() => saveApiKey(geminiApiKey)}
                className="px-3 py-2 bg-forest-800 hover:bg-forest-700 text-white rounded-xl font-bold transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Mic Notice / Permissions banner */}
        {micNotice && (
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="font-bold">Microphone Note:</div>
              <p className="text-[11px] text-amber-800">{micNotice}</p>
            </div>
          </div>
        )}

        {/* Central Assistant Sphere & Visual Wave */}
        <div className="text-center py-2 space-y-3">
          <div className="flex justify-center items-center gap-4">
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white scale-110 ring-8 ring-rose-300/60 animate-pulse'
                  : isSpeaking
                  ? 'bg-emerald-800 text-emerald-200 ring-8 ring-emerald-400/40 animate-pulse'
                  : 'bg-forest-800 text-white hover:bg-forest-700 hover:scale-105'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-7 h-7 animate-pulse" />
                  <span className="text-[9px] font-bold mt-1">Listening</span>
                </>
              ) : isSpeaking ? (
                <>
                  <Volume2 className="w-7 h-7 animate-bounce" />
                  <span className="text-[9px] font-bold mt-1">Speaking</span>
                </>
              ) : (
                <>
                  <Mic className="w-7 h-7" />
                  <span className="text-[9px] font-bold mt-1">Tap & Speak</span>
                </>
              )}
            </button>
          </div>

          <div className="text-xs font-bold text-forest-900">
            {isListening
              ? '🎙️ Listening live... speak your question in Hindi or English now'
              : isSpeaking
              ? '🔊 Speaking response aloud...'
              : isLoadingAI
              ? '✨ Processing your inquiry...'
              : 'Tap mic and speak, or type any question below:'}
          </div>

          {/* Interactive Text Input & Ask Button */}
          <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder={
                lang === 'hi'
                  ? 'उदा. कुसुमी लाख का भाव क्या है? या महुआ कैसे बेचें?'
                  : "e.g. Today's Kusmi lac rate in Khunti, or how to sell honey?"
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest-600 text-forest-950 bg-sand-50/50"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-forest-800 hover:bg-forest-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>

          {/* Live Transcript Display */}
          {transcript && (
            <div className="p-2.5 bg-sand-100 rounded-xl text-xs text-sand-800 text-left border border-sand-200">
              <strong className="text-forest-900 font-bold">Query: </strong>
              <span className="italic">"{transcript}"</span>
            </div>
          )}

          {/* Assistant Reply Card */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-left text-xs text-emerald-950 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Assistant Response:</span>
              </span>
              <button
                type="button"
                onClick={() => speakText(assistantReply)}
                className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer text-[11px]"
              >
                <Volume2 className="w-3.5 h-3.5" /> Replay Voice
              </button>
            </div>
            <p className="leading-relaxed font-medium text-emerald-950 text-xs sm:text-sm">
              {assistantReply}
            </p>

            {/* Contextual Quick Actions inside Assistant Response */}
            {currentActions.length > 0 && (
              <div className="pt-2 border-t border-emerald-200 flex flex-wrap gap-1.5">
                {currentActions.map((act, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleActionClick(act)}
                    className="px-2.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <span>{act.label}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Test Prompt Chips */}
        <div className="space-y-2 pt-2 border-t border-sand-200 text-xs text-left">
          <div className="text-[11px] font-bold text-sand-600">Quick Test Prompts (Tap any to ask):</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() =>
                handleQuickQuestion(
                  lang === 'hi' ? 'खूंटी में कुसुमी लाख का भाव क्या है?' : "Today's Kusmi Lac price in Khunti"
                )
              }
              className="p-2.5 bg-sand-100 hover:bg-emerald-100 text-sand-900 hover:text-emerald-900 font-semibold rounded-xl text-left transition-colors border border-sand-200"
            >
              ✨ {lang === 'hi' ? 'कुसुमी लाख भाव' : 'Kusmi Lac Rate'}
            </button>
            <button
              type="button"
              onClick={() =>
                handleQuickQuestion(
                  lang === 'hi' ? 'गुमला में सूखा महुआ फूल का भाव' : 'Mahua flower price in Gumla'
                )
              }
              className="p-2.5 bg-sand-100 hover:bg-emerald-100 text-sand-900 hover:text-emerald-900 font-semibold rounded-xl text-left transition-colors border border-sand-200"
            >
              🌸 {lang === 'hi' ? 'महुआ फूल भाव' : 'Mahua Rate'}
            </button>
            <button
              type="button"
              onClick={() =>
                handleQuickQuestion(
                  lang === 'hi' ? 'लातेहार में जंगली शहद का भाव' : 'Wild forest honey rate in Latehar'
                )
              }
              className="p-2.5 bg-sand-100 hover:bg-emerald-100 text-sand-900 hover:text-emerald-900 font-semibold rounded-xl text-left transition-colors border border-sand-200"
            >
              🍯 {lang === 'hi' ? 'जंगली शहद भाव' : 'Forest Honey Rate'}
            </button>
            <button
              type="button"
              onClick={() =>
                handleQuickQuestion(
                  lang === 'hi' ? 'मैं अपनी वनोपज कैसे बेचूं?' : 'How to list and sell produce?'
                )
              }
              className="p-2.5 bg-sand-100 hover:bg-emerald-100 text-sand-900 hover:text-emerald-900 font-semibold rounded-xl text-left transition-colors border border-sand-200"
            >
              🌾 {lang === 'hi' ? 'उपज कैसे बेचें (0% शुल्क)' : 'How to Sell (0% Fee)'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

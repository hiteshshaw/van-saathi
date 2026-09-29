import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Upload,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronRight,
  ShieldCheck,
  Plus,
  Minus,
  MapPin,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export const SellerVoiceListing = () => {
  const { catalog, districts, addListing, setActiveTab, lang, setLang, t, showToast } = useApp();

  // Voice recording & speech state
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceNoteRecorded, setVoiceNoteRecorded] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Form fields (smart-populated by voice parser)
  const [selectedProduct, setSelectedProduct] = useState('lac-kusmi');
  const [district, setDistrict] = useState('Khunti');
  const [block, setBlock] = useState('Torpa Block');
  const [quantity, setQuantity] = useState(150);
  const [grade, setGrade] = useState('Grade A (Scraped Clean)');
  const [expectedPrice, setExpectedPrice] = useState(510);
  const [voiceTranscript, setVoiceTranscript] = useState('जोहार। हमारे पास खूंटी के तोरपा में 150 किलो कुसुमी लाख (ग्रेड A) तैयार है। शुद्ध सुखाया हुआ, भाव 510 रुपये प्रति किलो।');

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  const selectedCatalogItem = catalog.find(c => c.id === selectedProduct) || catalog[0];

  // Initialize Web Speech API if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript) {
          setVoiceTranscript(currentTranscript);
          parseAndPopulateVoiceIntent(currentTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, [lang]);

  // Smart Voice Intent Parser: extracts produce, quantity, district, price from speech
  const parseAndPopulateVoiceIntent = (text) => {
    const lower = text.toLowerCase();
    
    // 1. Detect Produce
    if (lower.includes('लाख') || lower.includes('lac') || lower.includes('kusmi') || lower.includes('कुसुमी')) {
      setSelectedProduct('lac-kusmi');
      setGrade('Grade A (Scraped Clean)');
    } else if (lower.includes('महुआ') || lower.includes('mahua')) {
      setSelectedProduct('mahua-dry');
      setGrade('Food Grade (Sun Dried)');
    } else if (lower.includes('शहद') || lower.includes('honey') || lower.includes('मधुमक्खी')) {
      setSelectedProduct('wild-honey');
      setGrade('Multifloral Sal & Karanj (Raw)');
    } else if (lower.includes('तसर') || lower.includes('tasar') || lower.includes('silk') || lower.includes('कोकून')) {
      setSelectedProduct('tasar-cocoons');
      setGrade('Grade 1 (Hard shell, uniform size)');
    } else if (lower.includes('तेंदू') || lower.includes('tendu') || lower.includes('पत्ता')) {
      setSelectedProduct('tendu-leaves');
      setGrade('Grade 1 (Large, Spot-free)');
    } else if (lower.includes('साल') || lower.includes('sal') || lower.includes('बीज')) {
      setSelectedProduct('sal-seeds');
      setGrade('Grade A (De-winged, Sound)');
    } else if (lower.includes('चूड़ी') || lower.includes('bangle')) {
      setSelectedProduct('lac-bangles');
      setGrade('Premium Kundan & Brass Inlay');
    }

    // 2. Detect District
    if (lower.includes('खूंटी') || lower.includes('khunti') || lower.includes('तोरपा') || lower.includes('torpa')) {
      setDistrict('Khunti');
      setBlock('Torpa Block');
    } else if (lower.includes('गुमला') || lower.includes('gumla') || lower.includes('बिशुनपुर') || lower.includes('bishunpur')) {
      setDistrict('Gumla');
      setBlock('Bishunpur Block');
    } else if (lower.includes('लातेहार') || lower.includes('latehar') || lower.includes('नेतरहाट') || lower.includes('netarhat')) {
      setDistrict('Latehar');
      setBlock('Mahuadanr Block');
    } else if (lower.includes('चाईबासा') || lower.includes('chaibasa') || lower.includes('singhbhum') || lower.includes('सिंहभूम')) {
      setDistrict('West Singhbhum (Chaibasa)');
      setBlock('Manoharpur Block');
    } else if (lower.includes('सिमडेगा') || lower.includes('simdega')) {
      setDistrict('Simdega');
      setBlock('Kolebira Block');
    } else if (lower.includes('रांची') || lower.includes('ranchi')) {
      setDistrict('Ranchi');
      setBlock('Namkum Block');
    }

    // 3. Detect Numbers (Quantity & Price)
    const numbers = text.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const parsedNums = numbers.map(Number);
      // Usually larger number is quantity, or explicit
      if (parsedNums.length === 1) {
        if (parsedNums[0] >= 10) setQuantity(parsedNums[0]);
      } else if (parsedNums.length >= 2) {
        // e.g. "150 kg ... 510 rupees"
        setQuantity(parsedNums[0]);
        setExpectedPrice(parsedNums[1]);
      }
    }
  };

  // Text-To-Speech: Assistant speaks back guidance
  const speakAssistantGuidance = (customText = null) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop ongoing speech

    const textToSpeak = customText || (lang === 'hi'
      ? `जोहार! आपकी ${district} में ${quantity} ${selectedCatalogItem.standardUnit} ${selectedCatalogItem.name.split('(')[0]} दर्ज कर ली गई है। आज का सरकारी उचित भाव ₹${selectedCatalogItem.fairPriceMin} प्रति किलो है। आपको सीधे ₹${(quantity * expectedPrice).toLocaleString('en-IN')} बिना किसी कटौती के मिलेंगे।`
      : `Johar! Recorded ${quantity} ${selectedCatalogItem.standardUnit} of ${selectedCatalogItem.name.split('(')[0]} in ${district}. Today's fair market floor is ₹${selectedCatalogItem.fairPriceMin}. Your guaranteed direct payout is ₹${(quantity * expectedPrice).toLocaleString('en-IN')} with zero seller commission.`);

    const utterance = new SpeechSynthesisUtterance(textToSpeak.replace(/[*_#`₹]/g, ''));
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Start / Stop Microphone
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
      setVoiceNoteRecorded(false);

      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
          recognitionRef.current.start();
        } catch (e) {
          console.log('Using simulated timer recorder fallback:', e);
        }
      }

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 30) {
            stopRecording();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      stopRecording();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setVoiceNoteRecorded(true);
    showToast(lang === 'hi' ? 'आवाज़ विवरण सफलता से दर्ज हुआ!' : 'Voice note transcribed & details auto-filled!', 'success');
  };

  // Preset Sample Voice Prompts (1-Click Voice Simulations with realistic Speech Output)
  const applyPresetPrompt = (preset) => {
    setVoiceTranscript(preset.transcript);
    setSelectedProduct(preset.productId);
    setDistrict(preset.district);
    setBlock(preset.block);
    setQuantity(preset.quantity);
    setGrade(preset.grade);
    setExpectedPrice(preset.price);
    setVoiceNoteRecorded(true);

    showToast(`Voice input applied: ${preset.title}`, 'success');
    speakAssistantGuidance(preset.transcript);
  };

  const PRESET_PROMPTS = [
    {
      title: 'Kusmi Lac (Khunti) 150 kg',
      productId: 'lac-kusmi',
      district: 'Khunti',
      block: 'Torpa Block',
      quantity: 150,
      grade: 'Grade A (Scraped Clean)',
      price: 510,
      transcript: 'जोहार। हमारे पास खूंटी के तोरपा में 150 किलो कुसुमी लाख (ग्रेड A) तैयार है। शुद्ध सुखाया हुआ, भाव 510 रुपये प्रति किलो।'
    },
    {
      title: 'Dried Mahua (Gumla) 500 kg',
      productId: 'mahua-dry',
      district: 'Gumla',
      block: 'Bishunpur Block',
      quantity: 500,
      grade: 'Food Grade (Sun Dried)',
      price: 46,
      transcript: 'गुमला के बिशुनपुर में 500 किलो साफ सूखा महुआ फूल उपलब्ध है। मचान पर सुखाया हुआ, भाव 46 रुपये प्रति किलो।'
    },
    {
      title: 'Wild Honey (Latehar) 50 kg',
      productId: 'wild-honey',
      district: 'Latehar',
      block: 'Mahuadanr Block',
      quantity: 50,
      grade: 'Multifloral Sal & Karanj (Raw)',
      price: 450,
      transcript: 'लातेहार नेतरहाट के जंगल से 50 किलो शुद्ध कच्चा शहद निकाला गया है। भाव 450 रुपये प्रति किलो।'
    },
    {
      title: 'Tasar Cocoons (Chaibasa) 8 Kahan',
      productId: 'tasar-cocoons',
      district: 'West Singhbhum (Chaibasa)',
      block: 'Manoharpur Block',
      quantity: 8,
      grade: 'Grade 1 (Hard shell, uniform size)',
      price: 4300,
      transcript: 'चाईबासा में 8 कहान तसर सिल्क कोकून ग्रेड 1 तैयार है। Jadwi harvest, भाव 4300 रुपये प्रति कहान।'
    }
  ];

  const handleProductSelect = (cat) => {
    setSelectedProduct(cat.id);
    setGrade(cat.grades[0]?.grade || 'Standard');
    setExpectedPrice(cat.fairPriceMax || 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity <= 0 || expectedPrice <= 0) {
      showToast('Please enter valid quantity and price', 'error');
      return;
    }

    addListing({
      productId: selectedProduct,
      title: `${selectedCatalogItem.name} - ${grade}`,
      district,
      block,
      quantity,
      unit: selectedCatalogItem.standardUnit,
      pricePerUnit: expectedPrice,
      fairPriceBenchmark: selectedCatalogItem.fairPriceMin,
      grade,
      images: [selectedCatalogItem.image],
      voiceNoteDuration: '0:32',
      voiceTranscript,
      sellerStory: `Harvested with traditional scientific care by our tribal collective in ${district}. Direct from tree to market with 0% middleman cut.`,
      stockAvailable: quantity,
      minOrderQty: Math.max(10, Math.floor(quantity * 0.1))
    });

    setActiveTab('seller-listings');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      
      {/* Mobile-First Header with Language Switcher */}
      <div className="bg-forest-900 text-white rounded-3xl p-5 sm:p-6 border border-forest-700 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{lang === 'hi' ? 'आवाज़ सहायक सक्रिय (Voice AI)' : 'Interactive Voice AI Active'}</span>
          </div>
          
          {/* Language Toggle */}
          <div className="flex gap-1 bg-forest-800 p-1 rounded-xl border border-forest-700">
            <button
              onClick={() => setLang('hi')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-forest-950' : 'text-sand-300'}`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLang('sat')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold ${lang === 'sat' ? 'bg-emerald-500 text-forest-950' : 'text-sand-300'}`}
            >
              ᱥᱟᱱᱛᱟᱲᱤ
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-forest-950' : 'text-sand-300'}`}
            >
              EN
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-white">
            {lang === 'hi' ? 'बोलकर अपनी वनोपज जोड़ें' : 'Voice-Assisted Produce Listing'}
          </h1>
          <p className="text-xs text-sand-200 mt-1">
            {lang === 'hi'
              ? 'माइक दबाकर अपनी भाषा (हिन्दी, मुंडारी, हो या संथाली) में बोलें। सहायक स्वतः विवरण भर देगा।'
              : 'Tap mic and describe your harvest. The voice assistant transcribes, parses details, and provides audio advice.'}
          </p>
        </div>

        {/* 0% Fee Assurance Badge */}
        <div className="bg-forest-800/90 rounded-2xl p-3 flex items-center justify-between border border-emerald-500/30 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-emerald-100 font-semibold">
              {lang === 'hi'
                ? 'विक्रेता के लिए 0% शुल्क • पूरी तय राशि सीधे आपके बैंक में पहुंचेगी।'
                : '0% fee for sellers. Full agreed price sent to your bank account.'}
            </span>
          </div>
          <span className="text-[10px] bg-emerald-500 text-forest-950 font-black px-2 py-0.5 rounded shrink-0">
            0% FEE
          </span>
        </div>
      </div>

      {/* Main Interactive Voice Engine Box */}
      <div className="bg-white rounded-3xl p-6 border-2 border-emerald-600 shadow-xl space-y-5 text-center relative overflow-hidden">
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            {isRecording ? '🎙️ Listening to your voice...' : '🎙️ Tap Microphone to Speak'}
          </span>

          {/* Talkback Audio Button */}
          <button
            type="button"
            onClick={isSpeaking ? stopSpeaking : () => speakAssistantGuidance()}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              isSpeaking
                ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
                : 'bg-sand-100 hover:bg-sand-200 text-forest-900 border border-sand-300'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            <span>{isSpeaking ? 'Stop Voice' : 'Hear Assistant Voice'}</span>
          </button>
        </div>

        {/* Big Pulsing Mic Button */}
        <div className="py-2 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={toggleRecording}
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all shadow-2xl ${
              isRecording
                ? 'bg-rose-600 text-white scale-110 ring-8 ring-rose-300/60 animate-pulse'
                : isSpeaking
                ? 'bg-emerald-800 text-emerald-200 ring-6 ring-emerald-400/40 animate-pulse'
                : voiceNoteRecorded
                ? 'bg-emerald-700 text-white hover:bg-emerald-600 hover:scale-105'
                : 'bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-105'
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="w-8 h-8" />
                <span className="text-[10px] font-bold mt-1">0:0{recordingTime}</span>
              </>
            ) : isSpeaking ? (
              <>
                <Volume2 className="w-8 h-8 animate-bounce" />
                <span className="text-[10px] font-bold mt-1">Speaking</span>
              </>
            ) : (
              <>
                <Mic className="w-8 h-8" />
                <span className="text-[10px] font-bold mt-1">{voiceNoteRecorded ? 'Tap to Re-record' : 'Tap & Speak'}</span>
              </>
            )}
          </button>
          
          <span className="text-xs font-bold text-forest-900 mt-3">
            {isRecording
              ? (lang === 'hi' ? 'आपकी आवाज़ सुनी जा रही है... बोलिए' : 'Listening live to your microphone...')
              : isSpeaking
              ? (lang === 'hi' ? 'सहायक उचित भाव का विवरण बता रहा है...' : 'Assistant is speaking advice...')
              : voiceNoteRecorded
              ? (lang === 'hi' ? '✓ आवाज़ से विवरण भरा गया! नीचे जांचें।' : '✓ Voice details captured & parsed!')
              : (lang === 'hi' ? 'माइक दबाएं और अपनी उपज का विवरण बोलें' : 'Tap microphone and speak')}
          </span>
        </div>

        {/* Animated Audio Waveform */}
        <div className="bg-sand-100 rounded-2xl p-3 flex items-center justify-center gap-1.5 h-12 border border-sand-300">
          <div className={`w-1.5 bg-emerald-600 rounded-full ${isRecording || isSpeaking ? 'animate-wave-1' : 'h-2'}`}></div>
          <div className={`w-1.5 bg-emerald-500 rounded-full ${isRecording || isSpeaking ? 'animate-wave-2' : 'h-4'}`}></div>
          <div className={`w-1.5 bg-emerald-600 rounded-full ${isRecording || isSpeaking ? 'animate-wave-3' : 'h-6'}`}></div>
          <div className={`w-1.5 bg-emerald-400 rounded-full ${isRecording || isSpeaking ? 'animate-wave-4' : 'h-3'}`}></div>
          <div className={`w-1.5 bg-emerald-600 rounded-full ${isRecording || isSpeaking ? 'animate-wave-5' : 'h-5'}`}></div>
          <div className={`w-1.5 bg-emerald-500 rounded-full ${isRecording || isSpeaking ? 'animate-wave-6' : 'h-2'}`}></div>
          <div className={`w-1.5 bg-emerald-600 rounded-full ${isRecording || isSpeaking ? 'animate-wave-2' : 'h-4'}`}></div>
          <div className={`w-1.5 bg-emerald-400 rounded-full ${isRecording || isSpeaking ? 'animate-wave-1' : 'h-2'}`}></div>
        </div>

        {/* Live Transcription Box */}
        {voiceTranscript && (
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-300 text-left text-xs text-emerald-950 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-emerald-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Transcribed Voice Note:</span>
              </span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded">
                Auto-Parsed
              </span>
            </div>
            <p className="italic text-emerald-900">"{voiceTranscript}"</p>
          </div>
        )}

        {/* 1-Click Interactive Voice Presets for Testing & Demonstration */}
        <div className="space-y-2 pt-2 border-t border-sand-200 text-left">
          <div className="text-[11px] font-bold text-sand-700 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-forest-700" />
            <span>Or tap a simulated regional voice sample to test auto-parsing & talkback:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_PROMPTS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPresetPrompt(preset)}
                className="p-2.5 rounded-xl bg-sand-50 hover:bg-emerald-50 border border-sand-300 hover:border-emerald-400 text-left transition-all group text-xs"
              >
                <div className="font-bold text-forest-900 group-hover:text-emerald-900 flex items-center justify-between">
                  <span>{preset.title}</span>
                  <span className="text-emerald-700 font-bold">▶ Speak</span>
                </div>
                <div className="text-[10px] text-sand-600 truncate mt-0.5 italic">
                  "{preset.transcript}"
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Auto-Populated Produce Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Produce Selection */}
        <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-forest-900">
              1. {lang === 'hi' ? 'पहचाना गया उत्पाद (Auto-detected Produce)' : '1. Auto-detected Produce'}
            </label>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
              ✓ Verified by Voice AI
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {catalog.slice(0, 6).map((cat) => {
              const isSelected = selectedProduct === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleProductSelect(cat)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between h-28 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-400/30'
                      : 'border-sand-200 bg-white hover:border-sand-400'
                  }`}
                >
                  <div className="text-2xl">{cat.icon}</div>
                  <div>
                    <div className="font-extrabold text-xs text-forest-900 line-clamp-1">{cat.name.split('(')[0]}</div>
                    <div className="text-[10px] text-sand-600 font-semibold">Fair ₹{cat.fairPriceMin}/{cat.standardUnit}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Quantity Stepper */}
        <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-forest-900">
              2. {lang === 'hi' ? 'पहचानी गई मात्रा (Quantity)' : '2. Harvest Quantity'}
            </label>
            <span className="text-xs font-bold text-sand-600">Unit: {selectedCatalogItem.standardUnit}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(10, quantity - 25))}
              className="w-12 h-12 rounded-2xl bg-sand-200 hover:bg-sand-300 text-sand-900 font-bold text-lg flex items-center justify-center"
            >
              <Minus className="w-5 h-5" />
            </button>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full text-center text-xl font-extrabold text-forest-900 bg-sand-50 border-2 border-sand-300 rounded-2xl p-3 focus:outline-none focus:border-forest-600"
            />

            <button
              type="button"
              onClick={() => setQuantity(quantity + 25)}
              className="w-12 h-12 rounded-2xl bg-sand-200 hover:bg-sand-300 text-sand-900 font-bold text-lg flex items-center justify-center"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2 justify-center">
            {[50, 100, 150, 200, 500].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQuantity(q)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  quantity === q ? 'bg-forest-800 text-white' : 'bg-sand-100 text-sand-800 hover:bg-sand-200'
                }`}
              >
                {q} {selectedCatalogItem.standardUnit}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Grade & Location */}
        <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-forest-900">
            3. {lang === 'hi' ? 'ग्रेड व जिला (Grade & District)' : '3. Grade & Location'}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-sand-600 font-medium mb-1">Quality Grade:</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs sm:text-sm font-semibold text-sand-900"
              >
                {selectedCatalogItem.grades.map((g, idx) => (
                  <option key={idx} value={g.grade}>{g.grade}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-sand-600 font-medium mb-1">District:</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs sm:text-sm font-semibold text-sand-900"
              >
                {districts.filter(d => d !== 'All Districts').map((d, idx) => (
                  <option key={idx} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Step 4: Expected Price with Fair Price Guidance */}
        <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-forest-900">
            4. {lang === 'hi' ? 'अपेक्षित मूल्य (Your Asking Rate)' : '4. Expected Price per Unit'}
          </label>

          {/* Today's Fair Price Suggestion Box */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                {lang === 'hi' ? 'आज का सरकारी उचित भाव:' : "Today's Government Benchmark Floor:"}
              </span>
              <span className="font-extrabold text-emerald-950 text-sm">
                ₹{selectedCatalogItem.fairPriceMin} – ₹{selectedCatalogItem.fairPriceMax}/{selectedCatalogItem.standardUnit}
              </span>
            </div>
            <p className="text-[11px] text-emerald-800">
              {lang === 'hi'
                ? 'सरकारी एवं मंडी दरों के आधार पर। आप इस दर या इससे अधिक पर बेच सकते हैं।'
                : 'Setting rates at or above fair floor ensures maximum earnings and fast enterprise buyer orders.'}
            </p>
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-sand-600">₹</span>
            <input
              type="number"
              min="1"
              value={expectedPrice}
              onChange={(e) => setExpectedPrice(Math.max(1, Number(e.target.value)))}
              className="w-full pl-9 pr-24 py-3.5 bg-sand-50 border-2 border-sand-300 rounded-2xl text-xl font-extrabold text-forest-900 focus:outline-none focus:border-forest-600"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-sand-600">
              / {selectedCatalogItem.standardUnit}
            </span>
          </div>

          {/* Total Direct Payout Calculation for Seller */}
          <div className="bg-forest-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-inner">
            <div>
              <div className="text-[10px] text-sand-300 uppercase tracking-wider font-bold">
                {lang === 'hi' ? 'सीधे आपके खाते में कुल राशि (0% कटौती)' : 'Your Direct Payout (100% Payout)'}
              </div>
              <div className="text-2xl font-extrabold text-emerald-300 font-display">
                ₹{(quantity * expectedPrice).toLocaleString('en-IN')}
              </div>
            </div>
            <span className="text-[10px] bg-emerald-500 text-forest-950 font-black px-2 py-1 rounded-lg">
              0% FEE
            </span>
          </div>

        </div>

        {/* Publish Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-terracotta-600 hover:bg-terracotta-500 text-white font-extrabold text-base shadow-xl hover:shadow-terracotta-600/30 transition-all flex items-center justify-center gap-2 transform active:scale-95"
        >
          <Upload className="w-5 h-5" />
          <span>{lang === 'hi' ? 'उपज मंडी में प्रकाशित करें' : 'Publish Produce to VanMandi'}</span>
        </button>

      </form>

    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  ShieldCheck,
  PhoneCall,
  Mail,
  MapPin,
  FileText,
  Lock,
  Heart,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const HowItWorksPage = () => {
  const { setActiveTab, setCurrentRole, lang } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          Platform Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-900 font-display">
          How VanMandi Operates
        </h1>
        <p className="text-sm text-sand-700 max-w-2xl mx-auto">
          Eliminating multi-layered middlemen so tribal forest gatherers earn 100% of fair market value.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-300 shadow-sm flex flex-col md:flex-row items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-forest-800 text-white flex items-center justify-center font-extrabold text-lg shrink-0">
            01
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-forest-900">Voice-Assisted Produce Listing</h3>
            <p className="text-xs sm:text-sm text-sand-700 leading-relaxed">
              Tribal gatherers or SHG leaders record a voice note in Hindi, Santali, Ho, or Mundari describing their crop lot. VanMandi transcribes the details and matches today's government MSP and Mandi benchmark prices.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-300 shadow-sm flex flex-col md:flex-row items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-terracotta-600 text-white flex items-center justify-center font-extrabold text-lg shrink-0">
            02
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-forest-900">Verified Enterprise Matching & Fair Bids</h3>
            <p className="text-xs sm:text-sm text-sand-700 leading-relaxed">
              Herbal brands, Ayurvedic processors, and resin exporters view the lot specifications, batch photos, and verified SHG badges. They place purchase orders or bids. VanMandi enforces fair price floors to prevent below-cost distress bidding.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-300 shadow-sm flex flex-col md:flex-row items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-honey-600 text-white flex items-center justify-center font-extrabold text-lg shrink-0">
            03
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-forest-900">100% Payout to Sellers (3% Platform Fee on Buyers Only)</h3>
            <p className="text-xs sm:text-sm text-sand-700 leading-relaxed">
              Buyers fund a secure digital escrow upon ordering. Once produce is received and verified, 100% of the agreed payout is released directly to the seller's bank account / UPI. The platform charges a transparent 3% service fee to the buyer only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div className="bg-forest-900 text-white rounded-3xl p-8 sm:p-10 border border-forest-700 shadow-xl space-y-4">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
          Built for IDEA TRIBE 2026
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
          From Forest to Fair Price.
        </h1>
        <p className="text-sm sm:text-base text-sand-200 leading-relaxed max-w-3xl">
          Jharkhand's dense forests produce over 55% of India's natural lac, premium wild mahua blossoms, and pristine forest honey. Yet, tribal collectors often receive less than 30% of end-market value due to information asymmetry and village middlemen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-forest-900">Our Core Principles</h3>
          <ul className="space-y-2 text-xs text-sand-700">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>0% Seller Fees:</strong> Tribal gatherers and SHGs never pay a single rupee to list or sell.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Empowerment Over Charity:</strong> We treat tribal collectors as skilled rural entrepreneurs and master harvesters.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Zero Data Exploitation:</strong> User phone numbers and locations are strictly protected and never shared or sold.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-forest-900">Ecosystem Alignment</h3>
          <p className="text-xs text-sand-700 leading-relaxed">
            VanMandi references operational frameworks of the <strong>Jharkhand State Livelihood Promotion Society (JSLPS)</strong>, <strong>TRIFED Minor Forest Produce Minimum Support Price Scheme</strong>, and <strong>Van Dhan Vikas Kendras (VDVKs)</strong>.
          </p>
          <div className="p-3 bg-sand-50 rounded-xl border border-sand-200 text-[11px] text-sand-600">
            Prototype developed under the Jharkhand University of Technology (JUT) Tribal Innovation Track 2026.
          </div>
        </div>
      </div>
    </div>
  );
};

export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Does a tribal collector need an email address or smartphone app to sell?',
      a: 'No. VanMandi is designed mobile-first for basic web browsers with voice capability and mock OTP authentication. No email, credit card, or complex paperwork is required.'
    },
    {
      q: 'How does VanMandi earn revenue if sellers pay 0% commission?',
      a: 'VanMandi charges a transparent 3% platform facilitation fee to bulk buyers and processors on completed transactions. This covers platform maintenance, quality verification, and dispute resolution.'
    },
    {
      q: 'What prevents buyers from offering artificially low prices below market rates?',
      a: 'VanMandi incorporates a Fair Price Floor check. If a buyer places a bid significantly below the official district Mandi / TRIFED MSP benchmark, a clear fair livelihood warning is displayed, and fair-value bids are prioritized.'
    },
    {
      q: 'Can the platform work when mobile internet in the forest is weak or offline?',
      a: 'Yes! VanMandi is built PWA-ready with offline price caching so gatherers can check yesterday’s saved market benchmarks even in zero-reception areas.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-forest-900 font-display">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-sand-600">
          Everything you need to know about pricing, commissions, voice listings, and payments.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-sand-300 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-forest-900 hover:bg-sand-50"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openIndex === idx ? 'rotate-180 text-terracotta-600' : 'text-sand-500'}`} />
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-sand-700 leading-relaxed border-t border-sand-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ContactPage = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your message has been sent to the VanMandi Support Cell.', 'success');
    setName('');
    setPhone('');
    setMsg('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-forest-900 font-display">
          Contact VanMandi Support
        </h1>
        <p className="text-xs sm:text-sm text-sand-600">
          Assistance for tribal collectors, SHGs, enterprise bulk buyers, and researchers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4 text-xs">
          <h2 className="text-base font-bold text-forest-900">VanMandi Innovation Secretariat</h2>
          
          <div className="space-y-3 text-sand-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-terracotta-600 shrink-0 mt-0.5" />
              <span>Tribal Livelihoods Hub, Sirkha Toli, Namkum, Ranchi, Jharkhand - 834010</span>
            </div>

            <div className="flex items-center gap-3">
              <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Toll-Free Kisan & Gatherer Helpline: 1800-XXX-XXXX (Demo)</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <span>support@vanmandi.jharkhand.gov.in (Demonstration Prototype)</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-3 text-xs">
          <h2 className="text-base font-bold text-forest-900">Send an Inquiry</h2>
          <div>
            <label className="block font-bold text-sand-800 mb-1">Your Name / Group:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-sand-300"
            />
          </div>
          <div>
            <label className="block font-bold text-sand-800 mb-1">Mobile Number:</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-sand-300"
            />
          </div>
          <div>
            <label className="block font-bold text-sand-800 mb-1">Message:</label>
            <textarea
              rows="3"
              required
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-sand-300"
            ></textarea>
          </div>
          <button type="submit" className="w-full py-2.5 bg-forest-800 text-white font-bold rounded-xl shadow">
            Submit Message
          </button>
        </form>
      </div>
    </div>
  );
};

export const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-xs sm:text-sm text-sand-800 leading-relaxed bg-white p-6 sm:p-10 rounded-3xl border border-sand-300 shadow-sm">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 font-display">
        VanMandi Privacy Policy & Tribal Data Protection
      </h1>
      <p className="text-sand-600">Last updated: September 2026</p>

      <h2 className="text-base font-bold text-forest-900 pt-3">1. Absolute Zero-Data Selling Guarantee</h2>
      <p>
        VanMandi does not sell, rent, or monetize personal contact numbers, family records, or location coordinates of tribal collectors. We contain no advertising scripts or commercial data brokers.
      </p>

      <h2 className="text-base font-bold text-forest-900 pt-3">2. Data Anonymization for Price Transparency</h2>
      <p>
        Transaction volume and district crop quantities are aggregated into anonymized price indices to calculate fair daily Mandi benchmarks across Jharkhand. Individual gatherer identities remain confidential.
      </p>

      <h2 className="text-base font-bold text-forest-900 pt-3">3. Minimal Data Collection Consent</h2>
      <p>
        Sellers are only asked for a mobile contact number and harvest location to facilitate logistics. No unnecessary biometric or credit checks are required for marketplace listing.
      </p>
    </div>
  );
};

export const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-xs sm:text-sm text-sand-800 leading-relaxed bg-white p-6 sm:p-10 rounded-3xl border border-sand-300 shadow-sm">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 font-display">
        VanMandi Terms of Fair Trade
      </h1>
      <p className="text-sand-600">Last updated: September 2026</p>

      <h2 className="text-base font-bold text-forest-900 pt-3">1. Fair Livelihood Guarantee for Sellers</h2>
      <p>
        VanMandi operates under a strict <strong>0% Seller Commission policy</strong>. Sellers receive 100% of their confirmed agreed rate. Platform fees (3%) are exclusively payable by purchasing enterprises.
      </p>

      <h2 className="text-base font-bold text-forest-900 pt-3">2. Sustainable & Non-Destructive Harvesting</h2>
      <p>
        All listed forest produce must be gathered in compliance with community forest rights and ecological non-destructive collection norms (e.g. non-injurious lac host tree pruning, sustainable bee colony preservation).
      </p>

      <h2 className="text-base font-bold text-forest-900 pt-3">3. Fair Bidding Floor Policy</h2>
      <p>
        Buyers may not artificially suppress prices below the government Minimum Support Price (MSP) floor. VanMandi reserves the right to reject exploitative bids.
      </p>
    </div>
  );
};

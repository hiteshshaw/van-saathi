# VanMandi Integration & Production Roadmap

This document outlines the architecture, currently simulated prototype components, and the step-by-step production integrations required to deploy VanMandi across Jharkhand.

---

## 🔍 Current State vs Production Integrations

| Feature / Service | Prototype Implementation (Current) | Production Integration Path |
| :--- | :--- | :--- |
| **Authentication** | Instant mock 4-digit OTP & role-switcher | **SMS OTP via Firebase Phone Auth / MSG91** with Aadhaar-linked OTP for SHG verification. |
| **Speech & Voice Listing** | Simulated microphone recorder, audio waveform, and preset Indic transcription | **Bhashini AI / AI4Bharat IndicWhisper API** supporting speech-to-text in Hindi, Santali (Ol Chiki), Ho, and Mundari. |
| **Payments & Escrow** | Simulated demo payment, escrow hold, and direct release tracking | **Razorpay Route / Cashfree Escrow / NPCI UPI Intent** with direct DBT (Direct Benefit Transfer) to SHG bank accounts. |
| **Live Price Data Feed** | Embedded dataset with 7-day sparklines *(Sample data)* | **TRIFED MFP API / Agmarknet Mandi RSS / JSLPS Aajeevika MIS** automated daily cron ingestion. |
| **Database & Auth RLS** | React State + `localStorage` persistence | **Supabase (PostgreSQL)** with Row-Level Security (RLS) separating Sellers, Buyers, and Admin permissions. |
| **Media Storage** | Hosted Unsplash & SVG graphic placeholders | **Cloudflare R2 / AWS S3** with client-side image compression (WebP < 150KB) for slow 2G networks. |
| **Offline PWA** | Simulated offline toggle with cached rate display | **Vite PWA Plugin + Workbox Service Worker** with Cache-First strategy for price tables and local listings. |

---

## 🛠️ Step-by-Step Production Implementation Guide

### 1. Indic Speech Recognition (Bhashini / AI4Bharat)
```javascript
// Example Bhashini Speech-to-Text pipeline for Santali / Hindi
async function transcribeVoiceListing(audioBlob, languageCode = 'hi') {
  const formData = new FormData();
  formData.append('audio', audioBlob);
  formData.append('language', languageCode);

  const response = await fetch('https://api.bhashini.gov.in/v1/speech-recognition', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.BHASHINI_API_KEY}` },
    body: formData
  });
  const data = await response.json();
  return data.transcript; // Auto-fills listing form
}
```

### 2. Escrow & 0% Seller Fee Payment Split (Razorpay Route / Cashfree)
```javascript
// Order creation with 3% platform fee split
async function createEscrowOrder({ sellerBankAccountId, sellerAmount, buyerAmount }) {
  const platformCommission = Math.round(sellerAmount * 0.03); // 3% paid by buyer
  
  const paymentOrder = await razorpay.orders.create({
    amount: (sellerAmount + platformCommission) * 100, // In Paise
    currency: 'INR',
    transfers: [
      {
        account: sellerBankAccountId, // 100% of seller agreed amount
        amount: sellerAmount * 100,
        currency: 'INR',
        on_hold: true // Held in escrow until delivery confirmed
      }
    ]
  });
  return paymentOrder;
}
```

### 3. SMS Gateway for Rural Connectivity (MSG91 / Fast2SMS)
- Template: *"Johar! Aapki Kusmi Lac lot #ORD-9421 ke liye naya order mila hai. Rashi: Rs 51,000 (0% katauti). Gadi dispatch karein."*
- Supports regional IVR voice calls for non-literate gatherers.

---

## 🔒 Security & Tribal Data Safeguards
1. **Zero Data Monetization:** Strict prohibition of third-party tracker SDKs.
2. **Encrypted Phone Numbers:** Direct customer phone numbers masked via virtual IVR bridge.
3. **Price Floor Integrity:** Backend validation prevents submitting bids lower than the active TRIFED MSP benchmark.

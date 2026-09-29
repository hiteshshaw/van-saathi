# VanMandi (वनमंडी) - "From forest to fair price."

> **A digital marketplace and fair price platform for tribal forest produce in Jharkhand, India.**
> Built for tribal collectors, women Self-Help Groups (SHGs), and verified bulk buyers.
> *Built for IDEA TRIBE 2026 Demonstration.*

---

## 🌲 Key Objectives & Business Logic

1. **Direct Market Access:** Connects tribal forest gatherers and SHGs across Khunti, Gumla, Latehar, West Singhbhum (Chaibasa), and Simdega directly with certified processing units, Ayurvedic brands, silk weavers, and exporters.
2. **100% Fair Payout (0% Seller Fee):** Tribal sellers and SHGs **never pay any commission, listing fee, or subscription**. They receive 100% of their agreed price.
3. **Transparent 3% Buyer Commission:** The platform is sustained via a **3% platform facilitation fee charged strictly to bulk buyers** on completed transactions.
4. **Fair Price Floor & Anti-Distress Protection:** Shows real-time TRIFED MSP & Mandi benchmarks. Warns buyers against exploitative below-cost bidding.
5. **Mobile-First & High Accessibility:** Designed for basic Android phones on 2G/3G networks, with large tap targets (minimum 48px), high contrast earthy color palette, voice-assisted produce listing, and support for **Hindi, English, and Santali**.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Execution
```bash
# 1. Clone or navigate to the project root
cd vanmandi

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open the displayed local URL in your browser (e.g. http://localhost:5173)
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📱 User Personas & Included Features

### 1. Public Marketplace View
- **Hero & Impact Metrics:** Tagline *"From forest to fair price"*, 1,420+ gatherers, 180+ SHGs, ₹1.82 Cr payouts *(clearly labeled sample data)*.
- **Live Price Ticker & Price Board:** District-wise benchmark rates for Kusmi/Rangeeni Lac, Mahua, Forest Honey, Tendu leaves, Tasar cocoons, Sal seeds, and Chironji.
- **Harvest Lot Catalog:** Filter by produce type, district, quality grade, and verified SHG badges.
- **Produce Detail Page:** High-resolution produce photos, grade specifications, collector story, voice note audio player simulator with native language transcript, and instant order/bid calculator.
- **Tribal SHG Directory & Profiles:** Dedicated spotlight pages for women collectives (e.g., *Birsa Munda Mahila SHG, Torpa*).
- **Quality & Grading Guide:** Practical pictorial guide for gatherers on achieving Grade-A export quality.

### 2. Seller Experience (Mobile-First)
- **Voice-Assisted Produce Listing:** Tap-to-record voice note with simulated audio waveform and automatic transcription in Hindi/Santali.
- **Today's Fair Price Guidance:** Real-time feedback showing current Mandi floors and calculating the 100% direct payout before listing.
- **Visual Stepper & Large Tap Targets:** Simple form with one-tap produce icons, quantity steppers, and district selectors.
- **My Listings, Orders & Passbook:** Color-coded order tracking (Confirmed -> Dispatched -> Paid) with 1-tap dispatch confirmation and bank passbook view.

### 3. Buyer Experience (Enterprise Dashboard)
- **Verified Buyer Portal:** Sourcing analytics, total volume procured, and supplier network management.
- **Fair Bidding & Order Placement:** Direct ordering or bidding with automatic anti-distress floor alerts.
- **Transparent Invoicing:** Digital tax invoices with 3% platform fee itemization and 0% seller deduction guarantee.
- **Seller Rating & Quality Feedback:** 5-star review system for honoring high-purity tribal harvests.

### 4. Admin Portal (JUT / JSLPS Governance Secretariat)
- **User Verifications:** 1-tap approval/rejection queue for SHG members and buyer GSTIN credentials.
- **Fair Benchmark Rules Editor:** Live updating of district floor rates and MSP benchmarks.
- **Order Monitoring & Revenue Metrics:** Platform health tracking with real-time 3% fee tally.
- **Circulars Publisher:** Publishing training workshops and government scheme notices.

---

## 🎨 Design Philosophy
- **Earthy, Respectful, and Authentic:** Forest Green (`#1B4332`), Terracotta / Lac Red (`#C84C32`), Warm Sand (`#FAF7F2`), and Honey Gold (`#DDA15E`).
- **Ethical Representation:** Presents tribal gatherers as skilled entrepreneurs and master harvesters; zero stereotyping or exoticising.
- **Accessible & Fast:** High contrast, keyboard navigable, responsive down to 360px wide screens, lazy-loaded images, and offline simulation toggle.

---

## 📂 Project Structure

```
vanmandi/
├── public/                 # Static assets & metadata
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── buyer/          # Buyer dashboard & invoices
│   │   ├── seller/         # Voice listing, passbook, orders
│   │   ├── Footer.jsx      # Multi-column footer
│   │   ├── LiveTicker.jsx  # Real-time scrolling MSP ticker
│   │   ├── MobileBottomNav.jsx # Fixed mobile navigation
│   │   └── Navbar.jsx      # Navigation, role & language switcher
│   ├── context/
│   │   └── AppContext.jsx  # Central state management & localStorage persistence
│   ├── data/
│   │   ├── mockData.js     # Minor forest produce catalog, district rates, SHGs
│   │   └── translations.js # Hindi, English, and Santali dictionaries
│   ├── pages/              # Public & Admin pages
│   │   ├── AdminPanel.jsx
│   │   ├── GradingGuidePage.jsx
│   │   ├── HomePage.jsx
│   │   ├── InfoPages.jsx   # About, How It Works, FAQ, Contact, Privacy, Terms
│   │   ├── ListingDetailPage.jsx
│   │   ├── LivePriceBoard.jsx
│   │   ├── MarketplacePage.jsx
│   │   └── SHGDirectoryPage.jsx
│   ├── App.jsx             # Root application router & toast manager
│   ├── index.css           # Tailwind base styles & subtle tribal accents
│   └── main.jsx            # React root provider
├── DEMO_SCRIPT.md          # 5-minute walkthrough script for presentations
├── INTEGRATION_GUIDE.md    # Production integration roadmap (SMS, UPI, Speech)
├── package.json
├── tailwind.config.js
└── vite.config.js
```

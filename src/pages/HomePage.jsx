import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Users,
  Sparkles,
  MapPin,
  Scale,
  Award,
  Lock,
  PhoneCall,
  Volume2
} from 'lucide-react';

export const HomePage = () => {
  const {
    t,
    lang,
    setActiveTab,
    setCurrentRole,
    setSelectedListingId,
    setSelectedShgId,
    listings,
    priceData,
    shgs
  } = useApp();

  const featuredListings = listings.slice(0, 3);
  const featuredShg = shgs[0];

  const handleSellClick = () => {
    setCurrentRole('seller');
    setActiveTab('seller-voice-add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyClick = () => {
    setCurrentRole('buyer');
    setActiveTab('marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleListingClick = (id) => {
    setSelectedListingId(id);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShgClick = (id) => {
    setSelectedShgId(id);
    setActiveTab('shg-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forest-900 via-forest-800 to-forest-900 text-white pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 border-b-4 border-terracotta-600">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-terracotta-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-700/80 border border-forest-600 text-emerald-300 text-xs sm:text-sm font-semibold shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{t('heroTag')}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
                {t('heroTitlePrefix')}<span className="text-emerald-400 underline decoration-terracotta-500 underline-offset-8">{t('heroTitleHighlight')}</span>
              </h1>

              <p className="text-base sm:text-lg text-sand-200 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t('subtagline')}
              </p>

              {/* Zero Commission Callout Card */}
              <div className="bg-forest-800/80 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-4 text-left max-w-xl mx-auto lg:mx-0 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-400/30 text-emerald-300">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{t('zeroCommHeroTitle')}</span>
                    <span className="text-[10px] bg-emerald-500 text-forest-950 font-black px-1.5 py-0.5 rounded">
                      0% FEE
                    </span>
                  </div>
                  <p className="text-xs text-sand-300 mt-0.5">
                    {t('zeroCommHeroDesc')}
                  </p>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={handleSellClick}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-terracotta-600 hover:bg-terracotta-500 text-white font-bold text-base shadow-xl hover:shadow-terracotta-600/30 transition-all flex items-center justify-center gap-2.5 group transform hover:-translate-y-0.5"
                >
                  <Mic className="w-5 h-5 text-sand-200 group-hover:scale-110 transition-transform" />
                  <span>{t('btnSell')}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={handleBuyClick}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-sand-100 text-forest-950 font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2.5 border-2 border-forest-600"
                >
                  <ShoppingBag className="w-5 h-5 text-forest-800" />
                  <span>{t('btnBuy')}</span>
                </button>
              </div>

              {/* Badges */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-xs text-sand-300 pt-2">
                <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <Volume2 className="w-4 h-4" /> {t('voiceAssistedBadge')}
                </span>
                <span>•</span>
                <span>{t('langSupportBadge')}</span>
                <span>•</span>
                <span>{t('offlineBadge')}</span>
              </div>
            </div>

            {/* Right Column: Live Price Snapshot */}
            <div className="lg:col-span-5">
              <div className="bg-sand-50 text-sand-900 rounded-3xl p-6 shadow-2xl border-4 border-forest-700/50 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-sand-300">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse"></span>
                    <h2 className="text-base font-bold text-forest-900">
                      {t('livePriceTitle')}
                    </h2>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-honey-100 text-honey-800 rounded border border-honey-300">
                    {t('sampleDataNotice')}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {priceData.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveTab('prices')}
                      className="p-3 bg-white rounded-xl border border-sand-200 hover:border-forest-600 cursor-pointer transition-all flex items-center justify-between shadow-xs hover:shadow"
                    >
                      <div>
                        <div className="font-bold text-sm text-forest-900">{item.productName.split('(')[0]}</div>
                        <div className="text-[11px] text-sand-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-sand-500" />
                          <span>{item.district} Mandi</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-base text-forest-900">₹{item.currentPrice} <span className="text-xs font-normal text-sand-600">/{item.unit}</span></div>
                        <span className="text-[11px] font-bold text-emerald-700">
                          +{item.change}% vs last week
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab('prices')}
                  className="w-full py-2.5 text-center text-xs font-bold text-forest-800 hover:text-forest-950 bg-sand-200/80 hover:bg-sand-200 rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  <span>{t('btnViewPrices')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Impact Counters Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-300 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700">
              {t('impactTitle')}
            </span>
            <span className="ml-2 text-[10px] text-sand-500 font-medium">({t('sampleDataNotice')})</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-sand-200">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-forest-800 font-display">1,420+</div>
              <div className="text-xs sm:text-sm font-semibold text-sand-700 mt-1">{t('impactGatherers')}</div>
              <div className="text-[11px] text-sand-500">{t('impactGatherersSub')}</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-terracotta-600 font-display">180+</div>
              <div className="text-xs sm:text-sm font-semibold text-sand-700 mt-1">{t('impactSHGs')}</div>
              <div className="text-[11px] text-sand-500">{t('impactSHGsSub')}</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-forest-800 font-display">₹1.82 Cr</div>
              <div className="text-xs sm:text-sm font-semibold text-sand-700 mt-1">{t('impactPayouts')}</div>
              <div className="text-[11px] text-sand-500">{t('impactPayoutsSub')}</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-honey-600 font-display">100%</div>
              <div className="text-xs sm:text-sm font-semibold text-sand-700 mt-1">{t('impactMSP')}</div>
              <div className="text-[11px] text-sand-500">{t('impactMSPSub')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step "How It Works" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold text-forest-700 uppercase tracking-wider bg-forest-100 px-3 py-1 rounded-full">
            {t('step01Tag')} • {t('step02Tag')} • {t('step03Tag')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-forest-900 font-display">
            {t('howItWorksTitle')}
          </h2>
          <p className="text-sm sm:text-base text-sand-700">
            {t('howItWorksSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-7 border border-sand-300 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-forest-100 rounded-bl-full -mr-6 -mt-6"></div>
            <div className="space-y-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-forest-800 text-white flex items-center justify-center shadow">
                <Mic className="w-7 h-7 text-emerald-300" />
              </div>
              <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">{t('step01Tag')}</span>
              <h3 className="text-xl font-bold text-forest-900">{t('step1Title')}</h3>
              <p className="text-sm text-sand-700 leading-relaxed">
                {t('step1Desc')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-sand-200 text-xs font-semibold text-forest-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t('step1Sub')}</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-7 border border-sand-300 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-terracotta-100 rounded-bl-full -mr-6 -mt-6"></div>
            <div className="space-y-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-terracotta-600 text-white flex items-center justify-center shadow">
                <ShoppingBag className="w-7 h-7 text-sand-100" />
              </div>
              <span className="text-xs font-bold text-terracotta-700 uppercase tracking-wider">{t('step02Tag')}</span>
              <h3 className="text-xl font-bold text-forest-900">{t('step2Title')}</h3>
              <p className="text-sm text-sand-700 leading-relaxed">
                {t('step2Desc')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-sand-200 text-xs font-semibold text-terracotta-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t('step2Sub')}</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-7 border border-sand-300 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-honey-100 rounded-bl-full -mr-6 -mt-6"></div>
            <div className="space-y-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-honey-600 text-white flex items-center justify-center shadow">
                <ShieldCheck className="w-7 h-7 text-sand-100" />
              </div>
              <span className="text-xs font-bold text-honey-700 uppercase tracking-wider">{t('step03Tag')}</span>
              <h3 className="text-xl font-bold text-forest-900">{t('step3Title')}</h3>
              <p className="text-sm text-sand-700 leading-relaxed">
                {t('step3Desc')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-sand-200 text-xs font-semibold text-honey-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t('step3Sub')}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Marketplace Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold text-terracotta-700 uppercase tracking-wider bg-terracotta-100 px-3 py-1 rounded-full">
              {t('freshHarvestsTag')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 font-display mt-2">
              {t('featuredProducerLots')}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('marketplace')}
            className="text-sm font-bold text-forest-800 hover:text-forest-950 flex items-center gap-1.5 underline underline-offset-4"
          >
            <span>{t('browseAllLots')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredListings.map((listing) => (
            <div
              key={listing.id}
              onClick={() => handleListingClick(listing.id)}
              className="bg-white rounded-3xl overflow-hidden border border-sand-300 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-sand-200">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-forest-900/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{listing.district}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-terracotta-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {listing.grade.split('(')[0]}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-forest-900 text-base group-hover:text-terracotta-600 transition-colors line-clamp-2">
                    {listing.title}
                  </h3>

                  <div className="text-xs text-sand-700 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                    <span className="font-semibold text-forest-900">{listing.sellerName}</span>
                  </div>

                  <div className="text-[11px] text-sand-600 bg-sand-100 p-2 rounded-lg">
                    <span>{listing.shgName}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-sand-200 mt-2 flex items-center justify-between">
                <div>
                  <div className="text-xs text-sand-600 font-medium">{t('askingRateLabel')}</div>
                  <div className="text-lg font-extrabold text-forest-900">
                    ₹{listing.pricePerUnit} <span className="text-xs font-normal text-sand-600">/{listing.unit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-sand-600 font-medium">{t('lotAvailableLabel')}</div>
                  <div className="text-sm font-bold text-forest-800">
                    {listing.quantity} {listing.unit}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SHG Entrepreneurship Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-forest-800 to-forest-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-forest-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {t('shgSpotlightTag')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                {featuredShg.name}
              </h2>
              <p className="text-sm sm:text-base text-sand-200 leading-relaxed">
                "{featuredShg.story}"
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-forest-700/60 p-3 rounded-xl border border-forest-600">
                  <div className="text-xl font-bold text-emerald-300">12 {t('shgMembersBadge')}</div>
                  <div className="text-xs text-sand-300">{t('shgTribalWomen')}</div>
                </div>
                <div className="bg-forest-700/60 p-3 rounded-xl border border-forest-600">
                  <div className="text-xl font-bold text-honey-300">{t('shgIncomeGain')}</div>
                  <div className="text-xs text-sand-300">Torpa SHG</div>
                </div>
                <div className="bg-forest-700/60 p-3 rounded-xl border border-forest-600 col-span-2 sm:col-span-1">
                  <div className="text-xl font-bold text-white">Torpa, Khunti</div>
                  <div className="text-xs text-sand-300">{t('shgLacCenter')}</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleShgClick(featuredShg.id)}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-sm transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>{t('viewSHGProfileBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
                <div className="text-sm font-bold text-sand-100 flex items-center gap-2">
                  <Award className="w-4 h-4 text-honey-400" />
                  <span>{t('keyProductsHarvested')}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {featuredShg.products.map((p, idx) => (
                    <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-forest-950/60 text-sand-100 border border-forest-600">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
                <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
                  {t('recognitionsTitle')}
                </div>
                <ul className="space-y-1 text-xs text-sand-200">
                  {featuredShg.achievements.map((a, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ecosystem Reference Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-sand-600">
          {t('ecosystemTag')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-sand-700 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
          <div className="px-3 py-1.5 bg-white rounded-lg border border-sand-300 shadow-sm">
            Jharkhand State Livelihood Promotion Society (JSLPS Reference)
          </div>
          <div className="px-3 py-1.5 bg-white rounded-lg border border-sand-300 shadow-sm">
            TRIFED Minor Forest Produce Guidelines
          </div>
          <div className="px-3 py-1.5 bg-white rounded-lg border border-sand-300 shadow-sm">
            Van Dhan Vikas Kendra (VDVK) Network
          </div>
          <div className="px-3 py-1.5 bg-white rounded-lg border border-sand-300 shadow-sm">
            Jharkhand University of Technology (JUT)
          </div>
        </div>
      </section>

    </div>
  );
};

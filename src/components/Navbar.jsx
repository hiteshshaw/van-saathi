import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sprout,
  ShoppingBag,
  TrendingUp,
  Users,
  ShieldCheck,
  Menu,
  X,
  Globe,
  UserCheck,
  Building2,
  Mic,
  FileText,
  HelpCircle,
  PhoneCall,
  Wifi,
  WifiOff,
  Sparkles,
  Sliders,
  User
} from 'lucide-react';

export const Navbar = () => {
  const {
    lang,
    setLang,
    currentRole,
    setCurrentRole,
    activeTab,
    setActiveTab,
    isOffline,
    setIsOffline,
    setDemoPanelOpen,
    activePersona,
    t
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const handleNav = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchRole = (role) => {
    setCurrentRole(role);
    setRoleMenuOpen(false);
    if (role === 'seller') {
      setActiveTab('seller-listings');
    } else if (role === 'buyer') {
      setActiveTab('buyer-dashboard');
    } else if (role === 'admin') {
      setActiveTab('admin-panel');
    } else {
      setActiveTab('home');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-sand-50/95 backdrop-blur-md border-b border-sand-300 shadow-sm">
      {/* Top Banner - 0% Seller Fee Guarantee */}
      <div className="bg-forest-800 text-forest-100 text-xs py-1 px-4 text-center font-medium border-b border-forest-700 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 mx-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{t('zeroCommissionTag')}</span>
          <span className="hidden sm:inline text-forest-300">|</span>
          <span className="text-[11px] text-honey-300 hidden md:inline">{t('sampleDataNotice')}</span>
        </div>

        {/* Quick Demo Dock Trigger in top banner */}
        <button
          onClick={() => setDemoPanelOpen(true)}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 text-[11px] font-bold border border-emerald-400/30 transition-all shrink-0"
        >
          <Sliders className="w-3 h-3 text-emerald-300" />
          <span>Mog Control Dock</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Logo & Tagline */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-forest-800 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform border border-forest-600">
              <div className="relative">
                <Sprout className="w-6 h-6 md:w-7 md:h-7 text-emerald-400" />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-terracotta-500 rounded-full border-2 border-forest-800"></span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-xl md:text-2xl tracking-tight text-forest-900 font-display">
                  Van<span className="text-terracotta-600">Mandi</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-forest-100 text-forest-800 uppercase tracking-wide">
                  JHARKHAND
                </span>
              </div>
              <p className="text-[11px] text-forest-700 font-medium tracking-tight -mt-0.5 hidden xs:block">
                "From forest to fair price."
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'home' ? 'bg-forest-800 text-white' : 'text-sand-900 hover:bg-sand-200/70'
              }`}
            >
              {t('navHome')}
            </button>
            <button
              onClick={() => handleNav('prices')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'prices' ? 'bg-forest-800 text-white' : 'text-sand-900 hover:bg-sand-200/70'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              {t('navPrices')}
            </button>
            <button
              onClick={() => handleNav('marketplace')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'marketplace' ? 'bg-forest-800 text-white' : 'text-sand-900 hover:bg-sand-200/70'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-terracotta-600" />
              {t('navMarketplace')}
            </button>
            <button
              onClick={() => handleNav('shgs')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'shgs' ? 'bg-forest-800 text-white' : 'text-sand-900 hover:bg-sand-200/70'
              }`}
            >
              <Users className="w-4 h-4 text-honey-600" />
              {t('navSHGs')}
            </button>
            <button
              onClick={() => handleNav('grading-guide')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'grading-guide' ? 'bg-forest-800 text-white' : 'text-sand-900 hover:bg-sand-200/70'
              }`}
            >
              {t('navGradingGuide')}
            </button>
            <button
              onClick={() => handleNav('how-it-works')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'how-it-works' ? 'bg-forest-800 text-white' : 'text-sand-900 hover:bg-sand-200/70'
              }`}
            >
              {t('navHowItWorks')}
            </button>
          </nav>

          {/* Right Controls: Role Switcher + Language + Offline Simulation */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector */}
            <div className="relative flex items-center bg-white border border-sand-300 rounded-lg p-1 shadow-sm">
              <Globe className="w-4 h-4 text-sand-600 ml-1 mr-1.5" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-xs font-bold text-sand-900 focus:outline-none cursor-pointer pr-1"
                aria-label="Language Selector"
              >
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="en">English</option>
                <option value="sat">ᱥᱟᱱᱛᱟᱲᱤ (Santali*)</option>
              </select>
            </div>

            {/* Offline Simulation Toggle */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              title={isOffline ? 'Switch to Online Mode' : 'Simulate Low-Internet / 2G Offline Mode'}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                isOffline
                  ? 'bg-amber-100 border-amber-400 text-amber-900 animate-pulse'
                  : 'bg-white border-sand-300 text-sand-700 hover:bg-sand-100'
              }`}
            >
              {isOffline ? <WifiOff className="w-4 h-4 text-amber-700" /> : <Wifi className="w-4 h-4 text-emerald-600" />}
              <span className="hidden xl:inline">{isOffline ? 'Offline Mode' : 'Online'}</span>
            </button>

            {/* Role Switcher Button */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-xs sm:text-sm border shadow-sm transition-all ${
                  currentRole === 'seller'
                    ? 'bg-emerald-700 text-white border-emerald-800 ring-2 ring-emerald-400/40'
                    : currentRole === 'buyer'
                    ? 'bg-blue-800 text-white border-blue-900 ring-2 ring-blue-400/40'
                    : currentRole === 'admin'
                    ? 'bg-purple-800 text-white border-purple-900 ring-2 ring-purple-400/40'
                    : 'bg-forest-800 text-white border-forest-900 hover:bg-forest-700'
                }`}
              >
                {currentRole === 'seller' && <Mic className="w-4 h-4 text-emerald-200" />}
                {currentRole === 'buyer' && <Building2 className="w-4 h-4 text-blue-200" />}
                {currentRole === 'admin' && <ShieldCheck className="w-4 h-4 text-purple-200" />}
                {currentRole === 'public' && <UserCheck className="w-4 h-4 text-emerald-300" />}

                <span className="capitalize">
                  {currentRole === 'seller'
                    ? t('roleSeller')
                    : currentRole === 'buyer'
                    ? t('roleBuyer')
                    : currentRole === 'admin'
                    ? t('roleAdmin')
                    : t('switchRoleBtn')}
                </span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">▼</span>
              </button>

              {/* Role Dropdown Menu */}
              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-sand-300 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-sand-500 uppercase tracking-wider border-b border-sand-200">
                    Switch User Perspective
                  </div>
                  
                  <button
                    onClick={() => switchRole('public')}
                    className={`w-full text-left px-3 py-2.5 text-xs flex items-start gap-2.5 hover:bg-sand-100 ${
                      currentRole === 'public' ? 'bg-sand-100 font-bold' : ''
                    }`}
                  >
                    <Globe className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sand-900">Public Marketplace View</div>
                      <div className="text-[11px] text-sand-600">Explore listings, live rates & stories</div>
                    </div>
                  </button>

                  <button
                    onClick={() => switchRole('seller')}
                    className={`w-full text-left px-3 py-2.5 text-xs flex items-start gap-2.5 hover:bg-emerald-50 ${
                      currentRole === 'seller' ? 'bg-emerald-50 font-bold' : ''
                    }`}
                  >
                    <Mic className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-emerald-900">Tribal Seller / SHG (Mobile-first)</div>
                      <div className="text-[11px] text-emerald-700">Voice listing, 0% fee, instant payout</div>
                    </div>
                  </button>

                  <button
                    onClick={() => switchRole('buyer')}
                    className={`w-full text-left px-3 py-2.5 text-xs flex items-start gap-2.5 hover:bg-blue-50 ${
                      currentRole === 'buyer' ? 'bg-blue-50 font-bold' : ''
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-blue-900">Enterprise Buyer / Processor</div>
                      <div className="text-[11px] text-blue-700">Bulk procurement, bids, 3% commission</div>
                    </div>
                  </button>

                  <button
                    onClick={() => switchRole('admin')}
                    className={`w-full text-left px-3 py-2.5 text-xs flex items-start gap-2.5 hover:bg-purple-50 ${
                      currentRole === 'admin' ? 'bg-purple-50 font-bold' : ''
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-purple-900">Admin Portal (JUT / JSLPS)</div>
                      <div className="text-[11px] text-purple-700">Verifications, price rules, order oversight</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-sand-200/80 text-sand-900 hover:bg-sand-300 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Role-Specific Sub-Navbar Navigation */}
      {currentRole === 'seller' && (
        <div className="bg-emerald-900 text-white px-4 py-2 text-xs border-t border-emerald-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-bold text-emerald-200">{lang === 'hi' ? 'विक्रेता खाता:' : 'Seller Portal:'}</span>
              <span className="font-semibold text-white">{activePersona.name} ({activePersona.district})</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setActiveTab('seller-voice-add')}
                className={`px-3 py-1 rounded-md font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'seller-voice-add' ? 'bg-terracotta-600 text-white' : 'bg-emerald-800 text-emerald-100 hover:bg-emerald-700'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                {t('sellerVoiceListing')}
              </button>
              <button
                onClick={() => setActiveTab('seller-listings')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  activeTab === 'seller-listings' ? 'bg-white text-emerald-900' : 'text-emerald-100 hover:bg-emerald-800'
                }`}
              >
                {t('sellerMyListings')}
              </button>
              <button
                onClick={() => setActiveTab('seller-orders')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  activeTab === 'seller-orders' ? 'bg-white text-emerald-900' : 'text-emerald-100 hover:bg-emerald-800'
                }`}
              >
                {t('sellerMyOrders')}
              </button>
              <button
                onClick={() => setActiveTab('seller-payments')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  activeTab === 'seller-payments' ? 'bg-white text-emerald-900' : 'text-emerald-100 hover:bg-emerald-800'
                }`}
              >
                {t('sellerMyPayments')}
              </button>
              <button
                onClick={() => setActiveTab('seller-profile')}
                className={`px-3 py-1 rounded-md font-bold flex items-center gap-1 transition-all ${
                  activeTab === 'seller-profile' ? 'bg-white text-emerald-900' : 'text-emerald-100 hover:bg-emerald-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>KYC & Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {currentRole === 'buyer' && (
        <div className="bg-blue-900 text-white px-4 py-2 text-xs border-t border-blue-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span className="font-bold text-blue-200">Buyer Account:</span>
              <span className="font-semibold text-white">{activePersona.name} (GST: {activePersona.gstin} • Verified)</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('marketplace')}
                className="px-3 py-1 rounded-md font-bold bg-blue-800 hover:bg-blue-700 text-blue-100"
              >
                + Browse Sourcing Lots
              </button>
              <button
                onClick={() => setActiveTab('buyer-dashboard')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  activeTab === 'buyer-dashboard' ? 'bg-white text-blue-900' : 'text-blue-100 hover:bg-blue-800'
                }`}
              >
                Procurement Dashboard
              </button>
              <button
                onClick={() => setActiveTab('buyer-orders')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  activeTab === 'buyer-orders' ? 'bg-white text-blue-900' : 'text-blue-100 hover:bg-blue-800'
                }`}
              >
                My Orders & Invoices
              </button>
              <button
                onClick={() => setActiveTab('buyer-profile')}
                className={`px-3 py-1 rounded-md font-bold flex items-center gap-1 transition-all ${
                  activeTab === 'buyer-profile' ? 'bg-white text-blue-900' : 'text-blue-100 hover:bg-blue-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Enterprise Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {currentRole === 'admin' && (
        <div className="bg-purple-950 text-white px-4 py-2 text-xs border-t border-purple-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 shrink-0">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-purple-200">Admin Console:</span>
              <span className="text-purple-100">JUT VanMandi Governance Cell ({activePersona.name})</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('admin-panel')}
                className="px-3 py-1 rounded-md font-bold bg-purple-800 hover:bg-purple-700 text-white"
              >
                Control Center (Users, Verifications, Prices, Disputes)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offline Alert Banner */}
      {isOffline && (
        <div className="bg-amber-500 text-amber-950 px-4 py-1.5 text-xs font-bold text-center flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>{t('offlineNotice')}</span>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-sand-100 border-b border-sand-300 px-4 py-4 space-y-2 animate-in slide-in-from-top-4">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm ${
              activeTab === 'home' ? 'bg-forest-800 text-white' : 'text-sand-900 hover:bg-sand-200'
            }`}
          >
            {t('navHome')}
          </button>
          <button
            onClick={() => handleNav('prices')}
            className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm flex items-center gap-2 ${
              activeTab === 'prices' ? 'bg-forest-800 text-white' : 'text-sand-900 hover:bg-sand-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            {t('navPrices')}
          </button>
          <button
            onClick={() => handleNav('marketplace')}
            className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm flex items-center gap-2 ${
              activeTab === 'marketplace' ? 'bg-forest-800 text-white' : 'text-sand-900 hover:bg-sand-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-terracotta-600" />
            {t('navMarketplace')}
          </button>
          <button
            onClick={() => handleNav('shgs')}
            className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm flex items-center gap-2 ${
              activeTab === 'shgs' ? 'bg-forest-800 text-white' : 'text-sand-900 hover:bg-sand-200'
            }`}
          >
            <Users className="w-4 h-4 text-honey-600" />
            {t('navSHGs')}
          </button>
          <button
            onClick={() => handleNav('grading-guide')}
            className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm ${
              activeTab === 'grading-guide' ? 'bg-forest-800 text-white' : 'text-sand-900 hover:bg-sand-200'
            }`}
          >
            {lang === 'hi' ? 'ग्रेडिंग मार्गदर्शिका' : 'Quality & Grading Guide'}
          </button>
          <button
            onClick={() => handleNav('how-it-works')}
            className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm ${
              activeTab === 'how-it-works' ? 'bg-forest-800 text-white' : 'text-sand-900 hover:bg-sand-200'
            }`}
          >
            {t('navHowItWorks')}
          </button>

          <div className="pt-3 border-t border-sand-300 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                switchRole('seller');
                setActiveTab('seller-voice-add');
                setMobileMenuOpen(false);
              }}
              className="py-3 px-3 bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow"
            >
              <Mic className="w-4 h-4" />
              {lang === 'hi' ? 'उपज बेचें' : 'Sell Produce'}
            </button>
            <button
              onClick={() => {
                switchRole('buyer');
                setActiveTab('marketplace');
                setMobileMenuOpen(false);
              }}
              className="py-3 px-3 bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow"
            >
              <Building2 className="w-4 h-4" />
              {lang === 'hi' ? 'थोक खरीदें' : 'Buy Bulk'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const { setActiveTab, setCurrentRole, lang, t } = useApp();

  const handleNav = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRole = (role, tab) => {
    setCurrentRole(role);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest-950 text-sand-300 border-t-4 border-terracotta-600 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top brand row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-forest-800 flex items-center justify-center text-emerald-400 border border-forest-700">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-display">
                Van<span className="text-terracotta-500">Mandi</span>
              </span>
            </div>
            <p className="text-xs text-sand-300 leading-relaxed">
              "{t('tagline')}" {t('subtagline')}
            </p>
            <div className="text-[11px] text-emerald-400 font-bold bg-forest-900/80 p-2.5 rounded-xl border border-forest-800">
              ✓ {t('zeroCommissionTag')}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">{t('navMarketplace')}</h3>
            <ul className="space-y-2 text-sand-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">{t('navHome')}</button>
              </li>
              <li>
                <button onClick={() => handleNav('prices')} className="hover:text-white transition-colors">{t('navPrices')}</button>
              </li>
              <li>
                <button onClick={() => handleNav('marketplace')} className="hover:text-white transition-colors">{t('navMarketplace')}</button>
              </li>
              <li>
                <button onClick={() => handleNav('shgs')} className="hover:text-white transition-colors">{t('navSHGs')}</button>
              </li>
              <li>
                <button onClick={() => handleNav('grading-guide')} className="hover:text-white transition-colors">{t('navGradingGuide')}</button>
              </li>
            </ul>
          </div>

          {/* Role Portals */}
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">{t('switchPersonaLabel')}</h3>
            <ul className="space-y-2 text-sand-400">
              <li>
                <button onClick={() => handleRole('seller', 'seller-voice-add')} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  🌾 <span>{t('sellerVoiceTitle')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleRole('seller', 'seller-orders')} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  📦 <span>{t('myOrdersReceivedTitle')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleRole('buyer', 'buyer-dashboard')} className="hover:text-blue-300 transition-colors flex items-center gap-1">
                  🏢 <span>{t('buyerProcurementTitle')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleRole('admin', 'admin-panel')} className="hover:text-purple-300 transition-colors flex items-center gap-1">
                  ⚙️ <span>{t('adminPortalTitle')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Transparency */}
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">{t('navHowItWorks')}</h3>
            <ul className="space-y-2 text-sand-400">
              <li>
                <button onClick={() => handleNav('how-it-works')} className="hover:text-white transition-colors">{t('navHowItWorks')}</button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">{t('navAbout')}</button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-white transition-colors">{t('navFAQ')}</button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-white transition-colors">{t('navPrivacy')}</button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-white transition-colors">{t('navTerms')}</button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">{t('navContact')}</button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 border-t border-forest-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-sand-400 gap-4">
          <div>
            © 2026 VanMandi Jharkhand • Built for IDEA TRIBE 2026 • ({t('sampleDataNotice')})
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

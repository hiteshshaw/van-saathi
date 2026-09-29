import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  TrendingUp,
  ShoppingBag,
  Mic,
  User,
  Users
} from 'lucide-react';

export const MobileBottomNav = () => {
  const { activeTab, setActiveTab, currentRole, setCurrentRole, lang } = useApp();

  const handleNav = (tabId, role = null) => {
    if (role) setCurrentRole(role);
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-sand-300 py-1.5 px-2 shadow-2xl">
      <div className="grid grid-cols-5 gap-1 items-center max-w-md mx-auto">
        
        {/* Home */}
        <button
          onClick={() => handleNav('home', 'public')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            activeTab === 'home' ? 'text-forest-900 font-bold' : 'text-sand-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{lang === 'hi' ? 'होम' : 'Home'}</span>
        </button>

        {/* Live Prices */}
        <button
          onClick={() => handleNav('prices')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            activeTab === 'prices' ? 'text-forest-900 font-bold' : 'text-sand-600'
          }`}
        >
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <span className="text-[10px] mt-0.5">{lang === 'hi' ? 'भाव' : 'Prices'}</span>
        </button>

        {/* Big Center "Sell by Voice" button */}
        <button
          onClick={() => handleNav('seller-voice-add', 'seller')}
          className="flex flex-col items-center justify-center -mt-5"
        >
          <div className="w-12 h-12 rounded-full bg-terracotta-600 text-white flex items-center justify-center shadow-lg ring-4 ring-white active:scale-95 transition-transform">
            <Mic className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[10px] font-extrabold text-terracotta-700 mt-1">
            {lang === 'hi' ? 'बेचें (Voice)' : 'Sell'}
          </span>
        </button>

        {/* Marketplace */}
        <button
          onClick={() => handleNav('marketplace')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            activeTab === 'marketplace' ? 'text-forest-900 font-bold' : 'text-sand-600'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{lang === 'hi' ? 'मंडी' : 'Market'}</span>
        </button>

        {/* Portal (My Account / Orders) */}
        <button
          onClick={() => {
            if (currentRole === 'seller') handleNav('seller-orders');
            else if (currentRole === 'buyer') handleNav('buyer-dashboard');
            else if (currentRole === 'admin') handleNav('admin-panel');
            else handleNav('shgs');
          }}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            activeTab.includes('seller') || activeTab.includes('buyer') || activeTab.includes('admin') || activeTab === 'shgs'
              ? 'text-forest-900 font-bold'
              : 'text-sand-600'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">
            {currentRole === 'seller'
              ? (lang === 'hi' ? 'ऑर्डर' : 'Orders')
              : currentRole === 'buyer'
              ? 'Buyer'
              : currentRole === 'admin'
              ? 'Admin'
              : (lang === 'hi' ? 'समूह' : 'SHGs')}
          </span>
        </button>

      </div>
    </div>
  );
};

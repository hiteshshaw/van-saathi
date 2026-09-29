import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sliders,
  Users,
  Zap,
  RotateCcw,
  TrendingUp,
  WifiOff,
  Wifi,
  ShieldCheck,
  X,
  Sparkles,
  ChevronRight,
  UserCheck,
  Layers
} from 'lucide-react';

export const DemoControlPanel = () => {
  const {
    demoPanelOpen,
    setDemoPanelOpen,
    activePersonaKey,
    selectPersona,
    demoPersonas,
    currentRole,
    simulateIncomingBuyerOrder,
    simulateMarketPriceHike,
    resetAllData,
    isOffline,
    setIsOffline,
    setActiveTab,
    t
  } = useApp();

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 z-50">
        <button
          onClick={() => setDemoPanelOpen(!demoPanelOpen)}
          className="px-4 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-white font-extrabold text-xs shadow-2xl border-2 border-emerald-400/80 flex items-center gap-2 group transition-all hover:scale-105"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <Sliders className="w-4 h-4 text-emerald-300 group-hover:rotate-45 transition-transform" />
          <span>{t('mogDockTitle')}</span>
        </button>
      </div>

      {/* Slide-out / Floating Modal Dock */}
      {demoPanelOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-end p-0 sm:p-6">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-sand-300 max-h-[90vh] overflow-y-auto animate-in slide-in-from-right-4">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-sand-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-forest-800 text-emerald-400 flex items-center justify-center font-bold">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-forest-900 font-display">{t('mogDockTitle')}</h3>
                  <p className="text-[10px] text-sand-500">{t('mogDockSubtitle')}</p>
                </div>
              </div>
              <button
                onClick={() => setDemoPanelOpen(false)}
                className="p-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 text-sand-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Persona Switcher Section */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-forest-900 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-forest-700" />
                <span>{t('switchPersonaLabel')}</span>
              </label>

              <div className="space-y-1.5">
                {Object.entries(demoPersonas).map(([key, p]) => (
                  <button
                    key={key}
                    onClick={() => selectPersona(key)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                      activePersonaKey === key
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                        : 'border-sand-200 hover:bg-sand-50 text-sand-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{p.avatar}</span>
                      <div>
                        <div className="font-bold">{p.name}</div>
                        <div className="text-[10px] text-sand-500">{p.groupName || p.businessType || p.department}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      p.role === 'seller' ? 'bg-emerald-200 text-emerald-900' : p.role === 'buyer' ? 'bg-blue-200 text-blue-900' : 'bg-purple-200 text-purple-900'
                    }`}>
                      {p.role}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Triggers */}
            <div className="space-y-2 pt-2 border-t border-sand-200">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-forest-900 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-honey-600" />
                <span>{t('eventSimulationsLabel')}</span>
              </label>

              <div className="grid grid-cols-1 gap-2 text-xs">
                <button
                  onClick={simulateIncomingBuyerOrder}
                  className="p-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold flex items-center justify-between shadow-xs transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>⚡</span>
                    <span>{t('simulateOrderBtn')}</span>
                  </div>
                  <span className="text-[10px] bg-forest-950 px-2 py-0.5 rounded">Run Order</span>
                </button>

                <button
                  onClick={simulateMarketPriceHike}
                  className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold flex items-center justify-between shadow-xs transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>{t('simulatePriceSpikeBtn')}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-900 px-2 py-0.5 rounded">Spike Rate</span>
                </button>

                <button
                  onClick={() => setIsOffline(!isOffline)}
                  className={`p-2.5 rounded-xl border font-bold flex items-center justify-between transition-colors ${
                    isOffline ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-sand-100 hover:bg-sand-200 text-sand-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isOffline ? <WifiOff className="w-4 h-4 text-amber-700" /> : <Wifi className="w-4 h-4 text-emerald-700" />}
                    <span>{isOffline ? 'Offline Mode Active' : t('toggleOfflineModeBtn')}</span>
                  </div>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-sand-300">Toggle</span>
                </button>
              </div>
            </div>

            {/* Quick Profile Panel Navigators */}
            <div className="space-y-2 pt-2 border-t border-sand-200 text-xs">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-forest-900 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-700" />
                <span>{t('dedicatedPanelsLabel')}</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    selectPersona('seller-1');
                    setActiveTab('seller-profile');
                    setDemoPanelOpen(false);
                  }}
                  className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold rounded-xl text-center"
                >
                  🌾 {t('sellerKYCTitle')}
                </button>
                <button
                  onClick={() => {
                    selectPersona('buyer-1');
                    setActiveTab('buyer-profile');
                    setDemoPanelOpen(false);
                  }}
                  className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-950 font-bold rounded-xl text-center"
                >
                  🏢 {t('buyerProfileTitle')}
                </button>
                <button
                  onClick={() => {
                    selectPersona('admin-1');
                    setActiveTab('admin-panel');
                    setDemoPanelOpen(false);
                  }}
                  className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold rounded-xl text-center col-span-2"
                >
                  ⚙️ {t('adminPortalTitle')}
                </button>
              </div>
            </div>

            {/* Reset data */}
            <div className="pt-2 border-t border-sand-200">
              <button
                onClick={resetAllData}
                className="w-full py-2 bg-sand-200 hover:bg-sand-300 text-sand-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('resetDemoDataBtn')}</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

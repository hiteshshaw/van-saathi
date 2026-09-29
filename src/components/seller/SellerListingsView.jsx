import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Plus,
  Eye,
  CheckCircle,
  Clock,
  MapPin,
  Trash2,
  Mic,
  ArrowRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const SellerListingsView = () => {
  const { listings, setActiveTab, setSelectedListingId, showToast, lang, t } = useApp();
  
  // Filter current seller's listings (mock: SEL-001)
  const myListings = listings.filter(l => l.sellerId === 'SEL-001');

  const handleListingClick = (id) => {
    setSelectedListingId(id);
    setActiveTab('product-detail');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sand-300 shadow-sm">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
            {t('sellerKYCTitle')}
          </div>
          <h1 className="text-2xl font-extrabold text-forest-900 mt-2 font-display">
            {t('myListingsTitle')}
          </h1>
          <p className="text-xs text-sand-600">
            Birsa Munda Mahila SHG, Torpa • {t('statusVerified')}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('seller-voice-add')}
          className="px-5 py-3 rounded-2xl bg-terracotta-600 hover:bg-terracotta-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all shrink-0"
        >
          <Mic className="w-4 h-4" />
          <span>{t('publishNewLotBtn')}</span>
        </button>
      </div>

      {/* Zero Fee Reminder */}
      <div className="bg-forest-900 text-white p-4 rounded-2xl flex items-center justify-between text-xs border border-forest-700">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{t('zeroCommHeroDesc')}</span>
        </div>
        <span className="font-extrabold bg-emerald-500 text-forest-950 px-2 py-0.5 rounded text-[10px] hidden sm:inline">
          0% FEE
        </span>
      </div>

      {/* Listings Grid */}
      {myListings.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-sand-300 space-y-3">
          <p className="text-sm text-sand-700">{t('myListingsTitle')}</p>
          <button
            onClick={() => setActiveTab('seller-voice-add')}
            className="px-4 py-2 bg-forest-800 text-white font-bold text-xs rounded-xl"
          >
            {t('publishNewLotBtn')}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {myListings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-sand-300 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-20 h-20 rounded-2xl object-cover border border-sand-200 shrink-0 bg-sand-100"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {t('statusActive')}
                    </span>
                    <span className="text-xs text-sand-500">{item.grade}</span>
                  </div>
                  
                  <h3 className="font-bold text-forest-900 text-base line-clamp-1">{item.title}</h3>
                  
                  <div className="flex items-center gap-4 text-xs text-sand-700">
                    <span>{t('lotAvailableLabel')}: <strong className="text-forest-900">{item.quantity} {item.unit}</strong></span>
                    <span>{t('askingRateLabel')}: <strong className="text-forest-900">₹{item.pricePerUnit}/{item.unit}</strong></span>
                    <span className="hidden sm:inline text-sand-500">📍 {item.district}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-sand-200">
                <button
                  onClick={() => handleListingClick(item.id)}
                  className="px-4 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-sand-900 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-4 h-4 text-sand-600" />
                  <span>{t('viewLotDetailsOrder')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

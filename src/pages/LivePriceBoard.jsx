import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Calendar,
  Database,
  Filter,
  Calculator,
  AlertCircle,
  HelpCircle,
  CheckCircle,
  Sparkles,
  Search
} from 'lucide-react';

export const LivePriceBoard = () => {
  const { priceData, districts, catalog, lang, t, showToast, setActiveTab, setCurrentRole } = useApp();
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [searchQuery, setSearchQuery] = useState('');

  // Price Calculator state
  const [calcProduce, setCalcProduce] = useState('lac-kusmi');
  const [calcQty, setCalcQty] = useState(100);

  const filteredPrices = priceData.filter((item) => {
    const matchDistrict = selectedDistrict === 'All Districts' || item.district.toLowerCase().includes(selectedDistrict.toLowerCase());
    const matchSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase()) || item.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDistrict && matchSearch;
  });

  const selectedCalcItem = catalog.find(c => c.id === calcProduce) || catalog[0];
  const estMinEarnings = selectedCalcItem ? selectedCalcItem.fairPriceMin * calcQty : 0;
  const estMaxEarnings = selectedCalcItem ? selectedCalcItem.fairPriceMax * calcQty : 0;

  const handleReportMismatch = () => {
    showToast(lang === 'hi' ? 'मूल्य विसंगति की सूचना व्यवस्थापक को भेज दी गई है।' : 'Price mismatch reported to JUT Mandi Cell for review.', 'info');
  };

  const handleListWithPrice = () => {
    setCurrentRole('seller');
    setActiveTab('seller-voice-add');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-8 border border-forest-700 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{t('heroTag')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            {t('livePriceTitle')}
          </h1>
          <p className="text-sm sm:text-base text-sand-200 max-w-3xl">
            {t('livePriceSubtitle')}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-sand-300 pt-2 border-t border-forest-800">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" /> {t('lastUpdatedLabel')}
            </span>
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-honey-400" /> {t('sourceLabel')}
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-sand-300 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-sand-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('searchProducePlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-forest-600 text-sm"
            />
          </div>

          {/* District Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-sand-600 shrink-0 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-forest-700" /> {t('filterDistrictLabel')}
            </span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              aria-label="District Filter"
              className="bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-sand-900 focus:ring-2 focus:ring-forest-600 cursor-pointer"
            >
              {districts.map((d, idx) => (
                <option key={idx} value={d}>{d}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Price Table and Trends */}
      <div className="bg-white rounded-3xl border border-sand-300 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-sand-200 flex items-center justify-between bg-sand-50/50">
          <div>
            <h2 className="text-lg font-bold text-forest-900">{t('livePriceTitle')}</h2>
            <p className="text-xs text-sand-600">{t('livePriceSubtitle')}</p>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 bg-honey-100 text-honey-800 rounded border border-honey-300">
            {t('sampleDataNotice')}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand-100/70 text-sand-700 text-xs font-bold uppercase tracking-wider border-b border-sand-300">
              <tr>
                <th className="px-5 py-4">{t('tableColProduce')}</th>
                <th className="px-5 py-4">{t('tableColDistrict')}</th>
                <th className="px-5 py-4">{t('tableColBenchmark')}</th>
                <th className="px-5 py-4">{t('tableColTrajectory')}</th>
                <th className="px-5 py-4">{t('tableColBand')}</th>
                <th className="px-5 py-4">{t('tableColSynced')}</th>
                <th className="px-5 py-4 text-right">{t('tableColAction')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200 text-sand-900">
              {filteredPrices.map((item) => (
                <tr key={item.id} className="hover:bg-sand-50/80 transition-colors">
                  
                  {/* Produce Name */}
                  <td className="px-5 py-4 font-bold text-forest-900">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>{item.productName}</span>
                    </div>
                  </td>

                  {/* District */}
                  <td className="px-5 py-4 font-semibold text-sand-800">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
                      <span>{item.district}</span>
                    </div>
                  </td>

                  {/* Current Price */}
                  <td className="px-5 py-4">
                    <div className="text-base font-extrabold text-forest-900">
                      ₹{item.currentPrice.toLocaleString('en-IN')} <span className="text-xs font-normal text-sand-600">/{item.unit}</span>
                    </div>
                    {item.change > 0 ? (
                      <span className="text-emerald-700 text-xs font-bold inline-flex items-center">
                        <TrendingUp className="w-3 h-3 mr-0.5" /> +{item.change}%
                      </span>
                    ) : item.change < 0 ? (
                      <span className="text-rose-700 text-xs font-bold inline-flex items-center">
                        <TrendingDown className="w-3 h-3 mr-0.5" /> {item.change}%
                      </span>
                    ) : (
                      <span className="text-sand-600 text-xs inline-flex items-center">
                        <Minus className="w-3 h-3 mr-0.5" /> Stable
                      </span>
                    )}
                  </td>

                  {/* 7-Day Trend Sparkline */}
                  <td className="px-5 py-4">
                    <div className="flex items-end gap-1 h-8">
                      {item.weeklyTrend?.map((val, idx) => {
                        const min = Math.min(...item.weeklyTrend);
                        const max = Math.max(...item.weeklyTrend);
                        const range = max - min || 1;
                        const heightPct = Math.round(20 + ((val - min) / range) * 80);
                        return (
                          <div
                            key={idx}
                            title={`Day ${idx + 1}: ₹${val}`}
                            style={{ height: `${heightPct}%` }}
                            className={`w-2 rounded-t transition-all ${
                              idx === item.weeklyTrend.length - 1 ? 'bg-emerald-600' : 'bg-sand-300'
                            }`}
                          ></div>
                        );
                      })}
                    </div>
                    <span className="text-[10px] text-sand-500">7-day</span>
                  </td>

                  {/* Range */}
                  <td className="px-5 py-4 text-xs font-semibold text-sand-700">
                    ₹{item.minPrice} – ₹{item.maxPrice}
                  </td>

                  {/* Updated */}
                  <td className="px-5 py-4 text-xs text-sand-600">
                    {item.lastUpdated}
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={handleListWithPrice}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition-all"
                    >
                      {t('actionListAtRate')}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info bar */}
        <div className="p-4 bg-sand-50 border-t border-sand-200 flex flex-col sm:flex-row items-center justify-between text-xs text-sand-700 gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-terracotta-600 shrink-0" />
            <span>{t('priceDisclaimer')}</span>
          </div>
          <button
            onClick={handleReportMismatch}
            className="text-terracotta-700 hover:text-terracotta-900 font-bold underline shrink-0"
          >
            {t('reportDiscrepancy')}
          </button>
        </div>
      </div>

      {/* Interactive Fair Earnings Calculator */}
      <div className="bg-gradient-to-br from-sand-100 to-sand-200 rounded-3xl p-6 sm:p-8 border border-sand-300 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center">
            <Calculator className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-forest-900">
              {t('calcTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-sand-700">
              {t('calcSubtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          <div>
            <label className="block text-xs font-bold text-forest-900 uppercase tracking-wider mb-2">
              {t('calcSelectProduce')}
            </label>
            <select
              value={calcProduce}
              onChange={(e) => setCalcProduce(e.target.value)}
              className="w-full bg-white border border-sand-300 rounded-xl p-3 text-sm font-semibold text-sand-900 focus:ring-2 focus:ring-forest-600"
            >
              {catalog.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name} ({cat.standardUnit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-forest-900 uppercase tracking-wider mb-2">
              {t('calcQuantityLabel')} ({selectedCalcItem?.standardUnit}):
            </label>
            <input
              type="number"
              min="1"
              max="50000"
              value={calcQty}
              onChange={(e) => setCalcQty(Math.max(1, Number(e.target.value)))}
              className="w-full bg-white border border-sand-300 rounded-xl p-3 text-sm font-bold text-sand-900 focus:ring-2 focus:ring-forest-600"
            />
          </div>

          {/* Result card */}
          <div className="bg-forest-900 text-white rounded-2xl p-5 border border-forest-700 shadow-lg space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              {t('calcGuaranteedRange')}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              ₹{estMinEarnings.toLocaleString('en-IN')} – ₹{estMaxEarnings.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-sand-300">
              {t('calcZeroFeeNote')}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

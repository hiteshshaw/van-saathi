import React from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

export const LiveTicker = () => {
  const { priceData, setActiveTab, lang } = useApp();

  return (
    <div className="bg-forest-900 text-sand-100 border-b border-forest-800 text-xs py-2 px-4 overflow-hidden relative shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-terracotta-700/80 text-white font-semibold text-[11px] uppercase tracking-wider animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            {lang === 'hi' ? 'ताज़ा भाव' : 'Live MSP & Mandi Rates'}
          </span>
          <span className="text-sand-300 text-[11px] hidden sm:inline">
            (Jharkhand MFP Benchmarks • <span className="text-honey-400 font-medium">Sample data</span>)
          </span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto w-full md:w-auto py-1 scrollbar-none text-nowrap">
          {priceData.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab('prices')}
              className="inline-flex items-center gap-2 cursor-pointer hover:text-white transition-colors bg-forest-800/60 px-2.5 py-1 rounded border border-forest-700/50"
            >
              <span className="font-medium text-sand-200">{item.productName.split('(')[0]}:</span>
              <span className="font-bold text-white">₹{item.currentPrice}/{item.unit}</span>
              <span className="text-[10px] text-sand-400">({item.district})</span>
              {item.change > 0 ? (
                <span className="text-emerald-400 flex items-center text-[11px] font-semibold">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> +{item.change}%
                </span>
              ) : item.change < 0 ? (
                <span className="text-rose-400 flex items-center text-[11px] font-semibold">
                  <TrendingDown className="w-3 h-3 mr-0.5" /> {item.change}%
                </span>
              ) : (
                <span className="text-sand-400 flex items-center text-[11px]">
                  <Minus className="w-3 h-3 mr-0.5" /> 0%
                </span>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setActiveTab('prices')}
          className="text-honey-300 hover:text-honey-200 text-xs font-semibold underline underline-offset-2 shrink-0 hidden lg:block"
        >
          {lang === 'hi' ? 'पूरी तालिका देखें →' : 'View Full Board →'}
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  TrendingUp,
  ShoppingBag,
  ShieldCheck,
  ArrowRight,
  PackageCheck,
  FileText,
  Clock,
  Sparkles,
  MapPin
} from 'lucide-react';

export const BuyerDashboard = () => {
  const { orders, setActiveTab, setSelectedListingId, listings, lang, t } = useApp();

  const totalSpend = orders.reduce((acc, curr) => acc + curr.buyerTotalAmount, 0);
  const totalCommissionPaid = orders.reduce((acc, curr) => acc + curr.buyerCommissionAmount, 0);
  const totalLotsProcured = orders.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>{t('buyerPortalBadge')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            BioVeda Naturals Pvt Ltd
          </h1>
          <p className="text-xs sm:text-sm text-blue-200">
            GSTIN: 20AABCB1234F1Z5 • Chotanagpur Herbal & Natural Resins Processing Division
          </p>
        </div>

        <button
          onClick={() => setActiveTab('marketplace')}
          className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-sm flex items-center gap-2 shadow-lg transition-all shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{t('sourcingMarketLots')}</span>
        </button>
      </div>

      {/* Sourcing Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-sand-300 shadow-sm space-y-2">
          <div className="text-xs font-bold text-sand-500 uppercase tracking-wider">{t('totalForestSourcingSpend')}</div>
          <div className="text-3xl font-extrabold text-forest-900 font-display">
            ₹{totalSpend.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-sand-600">{t('supportingTribalFamilies')}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-sand-300 shadow-sm space-y-2">
          <div className="text-xs font-bold text-sand-500 uppercase tracking-wider">{t('totalOrdersLots')}</div>
          <div className="text-3xl font-extrabold text-blue-900 font-display">
            {totalLotsProcured} {t('batchesLabel')}
          </div>
          <div className="text-xs text-sand-600">{t('jharkhandClusters')}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-sand-300 shadow-sm space-y-2">
          <div className="text-xs font-bold text-sand-500 uppercase tracking-wider">{t('platformCommission3')}</div>
          <div className="text-3xl font-extrabold text-forest-800 font-display">
            ₹{totalCommissionPaid.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-700 font-semibold">{t('feeDeductedFromSellers')}</div>
        </div>

      </div>

      {/* Active Orders Quick Summary */}
      <div className="bg-white rounded-3xl border border-sand-300 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-forest-900">{t('recentPurchaseOrders')}</h2>
          <button
            onClick={() => setActiveTab('buyer-orders')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 underline"
          >
            {t('viewAllInvoicesOrders')}
          </button>
        </div>

        <div className="divide-y divide-sand-200 text-xs">
          {orders.slice(0, 3).map((ord) => (
            <div key={ord.id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-forest-900 text-sm">
                  {ord.productName} ({ord.quantity} {ord.unit})
                </div>
                <div className="text-sand-600">
                  {t('harvestedByLabel')} {ord.sellerName} • {ord.district}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-bold text-forest-900 text-sm">₹{ord.buyerTotalAmount.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-sand-500">{t('includesPlatformFee')}</div>
                </div>

                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 capitalize">
                  {ord.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Sourcing Lots */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-forest-900">{t('recommendedHarvestLots')}</h2>
          <button
            onClick={() => setActiveTab('marketplace')}
            className="text-xs font-bold text-forest-800 hover:text-forest-950 underline"
          >
            {t('browseFullMarketplace')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedListingId(item.id);
                setActiveTab('product-detail');
              }}
              className="bg-white p-5 rounded-3xl border border-sand-300 shadow-sm hover:shadow-md transition-shadow cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-terracotta-700 bg-terracotta-100 px-2 py-0.5 rounded">
                  {item.grade}
                </span>
                <span className="text-sand-500">📍 {item.district}</span>
              </div>
              <h3 className="font-bold text-forest-900 text-sm line-clamp-1">{item.title}</h3>
              <div className="flex justify-between text-xs pt-2 border-t border-sand-200">
                <span className="font-semibold text-sand-700">{t('lotAvailableLabel')}: {item.quantity} {item.unit}</span>
                <span className="font-extrabold text-forest-900">₹{item.pricePerUnit}/{item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

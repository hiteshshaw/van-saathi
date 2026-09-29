import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  Building2,
  Phone,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const SellerOrdersView = () => {
  const { orders, updateOrderStatus, lang, t } = useApp();

  // Filter seller orders (SEL-001)
  const sellerOrders = orders.filter(o => o.sellerId === 'SEL-001' || !o.sellerId);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {t('statusPending')}</span>;
      case 'dispatched':
        return <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-bold text-xs flex items-center gap-1"><Truck className="w-3 h-3" /> {t('statusDispatched')}</span>;
      case 'delivered':
        return <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-1"><PackageCheck className="w-3 h-3" /> {t('statusDelivered')}</span>;
      case 'paid':
        return <span className="px-3 py-1 rounded-full bg-green-100 text-green-900 font-bold text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {t('statusPaid')}</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-sand-200 text-sand-800 font-bold text-xs">{status}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-sand-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            {t('sellerKYCTitle')}
          </span>
          <h1 className="text-2xl font-extrabold text-forest-900 mt-2 font-display">
            {t('myOrdersReceivedTitle')}
          </h1>
          <p className="text-xs text-sand-600">
            {t('step2Desc')}
          </p>
        </div>
      </div>

      {sellerOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-sand-300">
          <p className="text-sm text-sand-700">{t('myOrdersReceivedTitle')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sellerOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4"
            >
              
              {/* Top row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-sand-200">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-forest-900 text-base">{t('orderIdLabel')} #{ord.id}</span>
                  <span className="text-xs text-sand-500">{t('orderDateLabel')}: {ord.placedAt}</span>
                </div>
                {getStatusBadge(ord.status)}
              </div>

              {/* Order Info & Buyer details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* Produce & Quantity */}
                <div className="bg-sand-50 p-3.5 rounded-2xl border border-sand-200 space-y-1">
                  <div className="font-bold text-forest-900 text-sm">{ord.productName}</div>
                  <div className="text-sand-700 font-semibold">
                    {t('specAvailable')}: {ord.quantity} {ord.unit} • {t('askingRateLabel')}: ₹{ord.unitPrice}/{ord.unit}
                  </div>
                  <div className="text-sand-500 text-[11px]">
                    {t('specMandi')}: {ord.district}
                  </div>
                </div>

                {/* Buyer Company */}
                <div className="bg-sand-50 p-3.5 rounded-2xl border border-sand-200 space-y-1">
                  <div className="font-bold text-forest-900 text-sm flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-700" />
                    <span>{ord.buyerName}</span>
                  </div>
                  <div className="text-sand-700 font-medium">
                    {ord.buyerContact}
                  </div>
                  <div className="text-sand-500 text-[11px]">
                    GSTIN: {ord.buyerGstin} ({t('statusVerified')})
                  </div>
                </div>

              </div>

              {/* Payout & Action Bar */}
              <div className="bg-forest-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] text-emerald-300 uppercase font-extrabold tracking-wider">
                    {t('yourDirectPayoutLabel')}
                  </div>
                  <div className="text-2xl font-extrabold text-white font-display">
                    ₹{ord.sellerAgreedAmount.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Status action buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {ord.status === 'confirmed' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'dispatched')}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow"
                    >
                      <Truck className="w-4 h-4" />
                      <span>{t('btnMarkDispatched')}</span>
                    </button>
                  )}

                  {ord.status === 'dispatched' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'paid')}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-forest-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t('btnSimulatePayout')}</span>
                    </button>
                  )}

                  {ord.status === 'paid' && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold bg-forest-800 px-3 py-1.5 rounded-xl border border-forest-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{t('escrowReleasedNotice')}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

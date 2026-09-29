import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowDownLeft,
  Building,
  CreditCard,
  Lock
} from 'lucide-react';

export const SellerPaymentsView = () => {
  const { orders, lang, t } = useApp();

  const sellerOrders = orders.filter(o => o.sellerId === 'SEL-001' || !o.sellerId);
  const totalEarned = sellerOrders.reduce((acc, curr) => acc + curr.sellerAgreedAmount, 0);
  const paidAmount = sellerOrders.filter(o => o.status === 'paid').reduce((acc, curr) => acc + curr.sellerAgreedAmount, 0);
  const inEscrowAmount = sellerOrders.filter(o => o.status !== 'paid').reduce((acc, curr) => acc + curr.sellerAgreedAmount, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-sand-300 shadow-sm">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          {t('sellerKYCTitle')}
        </span>
        <h1 className="text-2xl font-extrabold text-forest-900 mt-2 font-display">
          {t('myPaymentsTitle')}
        </h1>
        <p className="text-xs text-sand-600">
          {t('zeroCommHeroDesc')}
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-forest-900 text-white p-5 rounded-3xl border border-forest-700 shadow-md">
          <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">{t('totalPlatformVolume')}</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
            ₹{totalEarned.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-sand-300 mt-1">{t('feeDeductedFromSellers')}</div>
        </div>

        <div className="bg-emerald-800 text-white p-5 rounded-3xl border border-emerald-700 shadow-md">
          <div className="text-xs text-emerald-200 font-bold uppercase tracking-wider">{t('earningsTotalPaid')}</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
            ₹{paidAmount.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-200 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {t('statusPaid')}
          </div>
        </div>

        <div className="bg-sand-100 p-5 rounded-3xl border border-sand-300 shadow-sm">
          <div className="text-xs text-sand-700 font-bold uppercase tracking-wider">{t('statusPending')}</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-forest-900 font-display mt-1">
            ₹{inEscrowAmount.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-sand-600 mt-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> {t('escrowProtectionNote')}
          </div>
        </div>

      </div>

      {/* Linked Bank Account Card (Demo) */}
      <div className="bg-white p-6 rounded-3xl border border-sand-300 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center">
              <Building className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-forest-900">Linked Tribal SHG Bank Account (Demo)</div>
              <div className="text-xs text-sand-600">State Bank of India (Torpa Branch) • A/C: XXXXXXXX4921</div>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-300 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified
          </span>
        </div>
        <p className="text-[11px] text-sand-600 bg-sand-50 p-2.5 rounded-xl border border-sand-200">
          Payment releases are deposited directly into this SHG account through Reserve Bank of India NEFT/IMPS / Aadhaar Enabled Payment System (AePS).
        </p>
      </div>

      {/* Transaction Records */}
      <div className="bg-white rounded-3xl border border-sand-300 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-sand-200 flex items-center justify-between bg-sand-50/50">
          <h2 className="text-base font-bold text-forest-900">Transaction History</h2>
          <span className="text-xs text-sand-500">Sample payout log</span>
        </div>

        <div className="divide-y divide-sand-200 text-xs">
          {sellerOrders.map((ord) => (
            <div key={ord.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-sand-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <ArrowDownLeft className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-forest-900 text-sm">₹{ord.sellerAgreedAmount.toLocaleString('en-IN')}</div>
                  <div className="text-sand-600">
                    Order #{ord.id} • {ord.productName} ({ord.quantity} {ord.unit})
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-forest-900">
                  {ord.status === 'paid' ? (
                    <span className="text-emerald-700 font-bold">✓ Direct UPI Released</span>
                  ) : (
                    <span className="text-amber-700 font-bold">⏳ Escrow Secured</span>
                  )}
                </div>
                <div className="text-[11px] text-sand-500">{ord.placedAt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

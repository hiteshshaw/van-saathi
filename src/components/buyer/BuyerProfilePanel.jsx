import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  ShieldCheck,
  FileCheck,
  CreditCard,
  MapPin,
  Phone,
  CheckCircle2,
  Lock,
  Award
} from 'lucide-react';

export const BuyerProfilePanel = () => {
  const { activePersona, orders, t } = useApp();

  const totalSpend = orders.reduce((acc, curr) => acc + curr.buyerTotalAmount, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Buyer Header Banner */}
      <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 border border-blue-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-3xl border border-blue-400/30">
              {activePersona.avatar || '🏢'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold font-display">{activePersona.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-400 text-blue-950 font-bold text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {t('statusVerified')}
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">GSTIN: {activePersona.gstin} • {activePersona.district}, Jharkhand</p>
            </div>
          </div>

          <div className="text-left sm:text-right bg-blue-950/80 p-3 rounded-2xl border border-blue-800">
            <div className="text-[10px] text-blue-300 font-bold uppercase">{t('totalForestSourcingSpend')}</div>
            <div className="text-xl font-extrabold text-white font-display">₹{totalSpend.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="text-xs text-blue-200 bg-black/20 p-3 rounded-xl border border-white/10 flex items-center justify-between">
          <span>{t('businessCategory')}: <strong>{activePersona.businessType}</strong></span>
          <span className="text-emerald-300 font-bold">{activePersona.creditLine}</span>
        </div>
      </div>

      {/* Verification & Compliance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Compliance Credentials */}
        <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-forest-900 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-700" />
            <span>Enterprise Compliance Credentials</span>
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-sand-50 rounded-xl border border-sand-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-sand-900">GST Registration:</span>
                <div className="text-sand-500">{activePersona.gstin}</div>
              </div>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>

            <div className="p-3 bg-sand-50 rounded-xl border border-sand-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-sand-900">FSSAI / Ayush Trade License:</span>
                <div className="text-sand-500">Reg #10020030040019</div>
              </div>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>

            <div className="p-3 bg-sand-50 rounded-xl border border-sand-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-sand-900">Authorized Procurement Officer:</span>
                <div className="text-sand-500">{activePersona.representative}</div>
              </div>
              <span className="text-sand-600">{activePersona.phone}</span>
            </div>
          </div>
        </div>

        {/* Escrow Credit & Settlement */}
        <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-forest-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-700" />
            <span>Escrow & Digital Billing Line</span>
          </h2>

          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-2 text-xs">
            <div className="font-bold text-blue-950 text-sm">Escrow Facility: ICICI Digital Rural Escrow</div>
            <div className="text-blue-800">Approved Sourcing Limit: {activePersona.creditLine}</div>
            <div className="text-blue-800">Platform Fee Term: 3% on delivered batch weight</div>
            <div className="pt-2 border-t border-blue-200 text-[11px] text-blue-900 font-medium">
              🔒 Funds are secured in escrow and auto-disbursed to tribal SHGs upon verified delivery.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  ShieldCheck,
  Building,
  MapPin,
  Phone,
  Calendar,
  Award,
  CreditCard,
  FileCheck,
  CheckCircle2,
  Users,
  Sprout
} from 'lucide-react';

export const SellerProfilePanel = () => {
  const { activePersona, orders, listings, lang } = useApp();

  const sellerOrders = orders.filter(o => o.sellerId === activePersona.id || !o.sellerId);
  const totalEarned = sellerOrders.reduce((acc, curr) => acc + curr.sellerAgreedAmount, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Profile Header Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-forest-900 to-forest-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-700 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/30 flex items-center justify-center text-3xl border border-emerald-400/40 shadow-inner">
              {activePersona.avatar || '🌾'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold font-display">{activePersona.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-forest-950 font-bold text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified Gatherer
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">{activePersona.groupName} • {activePersona.block}, {activePersona.district}</p>
            </div>
          </div>

          <div className="text-left sm:text-right bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800">
            <div className="text-[10px] text-emerald-300 font-bold uppercase">Total Lifetime Sales (0% Fee)</div>
            <div className="text-xl font-extrabold text-white font-display">₹{totalEarned.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <p className="text-xs text-sand-200 leading-relaxed italic bg-black/20 p-3 rounded-xl border border-white/10">
          "{activePersona.bio}"
        </p>
      </div>

      {/* KYC & Verification Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Verification Badges */}
        <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-forest-900 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-700" />
            <span>Tribal Identity & SHG Verification</span>
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-sand-50 rounded-xl border border-sand-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-sand-900">Aadhaar Identity:</span>
                <div className="text-sand-500">Verified via UIDAI OTP (Demo)</div>
              </div>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Approved
              </span>
            </div>

            <div className="p-3 bg-sand-50 rounded-xl border border-sand-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-sand-900">SHG Passbook & Resolution:</span>
                <div className="text-sand-500">Torpa Mahila Vikas Samiti Reg. #8841</div>
              </div>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Approved
              </span>
            </div>

            <div className="p-3 bg-sand-50 rounded-xl border border-sand-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-sand-900">Community Forest Rights (CFR) Title:</span>
                <div className="text-sand-500">Torpa Gram Sabha Endorsement 2024</div>
              </div>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active
              </span>
            </div>
          </div>
        </div>

        {/* Bank & DBT Details */}
        <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-forest-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-700" />
            <span>Direct Benefit Transfer (DBT) Payout Account</span>
          </h2>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-xs">
            <div className="font-bold text-emerald-950 text-sm">{activePersona.bankAccount}</div>
            <div className="text-emerald-800">Account Type: SHG Joint Savings Account</div>
            <div className="text-emerald-800">IFSC Code: SBIN0001234 (Torpa Main Branch)</div>
            <div className="pt-2 border-t border-emerald-200 text-[11px] text-emerald-900 font-medium">
              ✓ All buyer payments are settled directly to this account with zero platform fee deduction.
            </div>
          </div>

          <div className="text-xs text-sand-600 bg-sand-50 p-3 rounded-xl border border-sand-200">
            <strong>Contact Mobile:</strong> {activePersona.phone} (Masked on public marketplace for privacy)
          </div>
        </div>

      </div>

    </div>
  );
};

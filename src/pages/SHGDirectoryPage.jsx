import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  ShieldCheck,
  Award,
  MapPin,
  ArrowRight,
  Heart,
  Sparkles
} from 'lucide-react';

export const SHGDirectoryPage = () => {
  const { shgs, setSelectedShgId, setActiveTab, lang } = useApp();

  const handleShgClick = (id) => {
    setSelectedShgId(id);
    setActiveTab('shg-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-8 border border-forest-700 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
          <Users className="w-4 h-4 text-emerald-400" />
          <span>Tribal Collectives & Women SHGs</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
          Jharkhand Tribal Producer Collectives
        </h1>
        <p className="text-xs sm:text-sm text-sand-200 max-w-3xl">
          Meet the self-help groups (SHGs) and forest protection committees transforming minor forest produce into sustainable rural livelihood enterprises.
        </p>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shgs.map((shg) => (
          <div
            key={shg.id}
            onClick={() => handleShgClick(shg.id)}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-300 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-sand-600">
                  <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
                  <span>{shg.block}, {shg.district}</span>
                </div>
                {shg.verified && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified SHG
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-forest-900 group-hover:text-terracotta-600 transition-colors">
                {shg.name}
              </h2>

              <p className="text-xs text-sand-700 line-clamp-3 leading-relaxed">
                "{shg.story}"
              </p>

              {/* Products tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {shg.products.map((p, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-sand-100 text-sand-800 text-[10px] font-semibold">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-sand-200 flex items-center justify-between text-xs">
              <span className="font-bold text-forest-900">{shg.membersCount} Tribal Women Members</span>
              <span className="font-bold text-terracotta-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Story & Lots</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export const SHGDetailPage = () => {
  const { shgs, selectedShgId, setActiveTab, setSelectedListingId, listings, lang } = useApp();
  const shg = shgs.find(s => s.id === selectedShgId) || shgs[0];

  const shgListings = listings.filter(l => l.shgName.includes('Birsa') || l.sellerName.includes('Sumati'));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <button
        onClick={() => setActiveTab('shgs')}
        className="inline-flex items-center gap-2 text-sm font-bold text-forest-800 hover:text-forest-950"
      >
        ← Back to SHG Directory
      </button>

      {/* SHG Banner */}
      <div className="bg-gradient-to-br from-forest-900 to-forest-800 text-white rounded-3xl p-6 sm:p-10 border border-forest-700 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Community Producer Group
          </span>
          <span className="text-xs text-sand-300">Est. {shg.establishedYear} • {shg.membersCount} Active Members</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
          {shg.name}
        </h1>

        <div className="flex items-center gap-2 text-xs text-sand-200">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>{shg.block}, District: {shg.district}, Jharkhand</span>
        </div>

        <p className="text-sm sm:text-base text-sand-100 max-w-4xl leading-relaxed pt-2">
          "{shg.story}"
        </p>
      </div>

      {/* Member Roster & Key Accolades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Leadership */}
        <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-forest-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-forest-800" />
            <span>Key Collective Leaders & Artisans</span>
          </h2>

          <div className="divide-y divide-sand-200 text-xs">
            {shg.members?.map((m, idx) => (
              <div key={idx} className="py-2.5 flex justify-between items-center">
                <span className="font-bold text-forest-900">{m.name}</span>
                <span className="text-sand-600">{m.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Accolades */}
        <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-forest-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-honey-600" />
            <span>Community Recognitions</span>
          </h2>

          <div className="space-y-2 text-xs">
            {shg.achievements?.map((a, idx) => (
              <div key={idx} className="p-3 bg-sand-50 rounded-xl border border-sand-200 font-semibold text-sand-800">
                ✓ {a}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Current Marketplace Lots Available from this SHG */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-forest-900">
          Current Produce Lots Available from {shg.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shgListings.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedListingId(item.id);
                setActiveTab('product-detail');
              }}
              className="bg-white p-5 rounded-3xl border border-sand-300 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-20 h-20 rounded-2xl object-cover shrink-0 bg-sand-200"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-terracotta-100 text-terracotta-800">
                  {item.grade}
                </span>
                <h3 className="font-bold text-forest-900 text-sm">{item.title}</h3>
                <div className="text-xs font-extrabold text-forest-800">
                  ₹{item.pricePerUnit}/{item.unit} • {item.quantity} {item.unit} Available
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

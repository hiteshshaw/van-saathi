import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  MapPin,
  ShieldCheck,
  Star,
  Mic,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Layers,
  Scale
} from 'lucide-react';

export const MarketplacePage = () => {
  const {
    listings,
    districts,
    setSelectedListingId,
    setActiveTab,
    setActiveCheckoutListing,
    setCurrentRole,
    lang,
    t
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'All', label: lang === 'hi' ? 'सभी वनोपज' : lang === 'sat' ? 'ᱥᱟᱱᱟᱢ ᱡᱤᱱᱤᱥ' : 'All Forest Lots' },
    { id: 'lac-kusmi', label: lang === 'hi' ? 'कुसुमी व रंगीनी लाख' : lang === 'sat' ? 'ᱠᱩᱥᱢᱤ ᱞᱟᱦᱟ' : 'Kusmi & Rangeeni Lac' },
    { id: 'mahua-dry', label: lang === 'hi' ? 'महुआ फूल' : lang === 'sat' ? 'ᱢᱟᱦᱩᱣᱟ ᱵᱟᱦᱟ' : 'Mahua Flowers' },
    { id: 'wild-honey', label: lang === 'hi' ? 'जंगली शुद्ध शहद' : lang === 'sat' ? 'ᱵᱤᱨ ᱧᱮᱞᱮ ᱨᱟᱥᱟ' : 'Wild Forest Honey' },
    { id: 'tasar-cocoons', label: lang === 'hi' ? 'तसर सिल्क कोकून' : lang === 'sat' ? 'ᱛᱟᱥᱟᱨ ᱠᱳᱠᱩᱱ' : 'Tasar Silk Cocoons' },
    { id: 'tendu-leaves', label: lang === 'hi' ? 'तेंदू पत्ता' : lang === 'sat' ? 'ᱛᱤᱨᱤᱞ ᱥᱟᱠᱟᱢ' : 'Tendu Leaves' },
    { id: 'sal-seeds', label: lang === 'hi' ? 'साल बीज' : lang === 'sat' ? 'ᱥᱟᱨᱡᱚᱢ ᱡᱟᱝ' : 'Sal Seeds' },
    { id: 'lac-bangles', label: lang === 'hi' ? 'लाख की चूड़ियां' : lang === 'sat' ? 'ᱞᱟᱦᱟ ᱥᱟᱠᱚᱢ' : 'SHG Lac Bangles' }
  ];

  const filteredListings = listings
    .filter((item) => {
      const matchCategory = selectedCategory === 'All' || item.productId === selectedCategory;
      const matchDistrict = selectedDistrict === 'All Districts' || item.district.toLowerCase().includes(selectedDistrict.toLowerCase());
      const matchVerified = !verifiedOnly || item.isVerified;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchDistrict && matchVerified && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerUnit - b.pricePerUnit;
      if (sortBy === 'price-desc') return b.pricePerUnit - a.pricePerUnit;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default recent
    });

  const handleCardClick = (id) => {
    setSelectedListingId(id);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickBuy = (e, item) => {
    e.stopPropagation();
    setActiveCheckoutListing(item);
    setCurrentRole('buyer');
    setSelectedListingId(item.id);
    setActiveTab('product-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-sand-100 rounded-3xl p-6 sm:p-8 border border-sand-300 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-terracotta-700 uppercase tracking-wider bg-terracotta-100 px-3 py-1 rounded-full">
            B2B & Bulk Marketplace
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-forest-900 font-display mt-2">
            {t('marketplaceTitle')}
          </h1>
          <p className="text-sm text-sand-700 mt-1">
            {t('marketplaceSubtitle')}
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentRole('seller');
            setActiveTab('seller-voice-add');
          }}
          className="px-5 py-3 rounded-xl bg-terracotta-600 hover:bg-terracotta-500 text-white font-bold text-sm flex items-center gap-2 shadow-md shrink-0"
        >
          <Mic className="w-4 h-4" />
          <span>{t('btnListProduce')}</span>
        </button>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-forest-800 text-white shadow-xs'
                : 'bg-white text-sand-800 border border-sand-300 hover:bg-sand-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-sand-300 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-sand-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('searchLotsPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-sand-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600"
          />
        </div>

        {/* District */}
        <div>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            aria-label="District"
            className="w-full bg-sand-50 border border-sand-300 rounded-xl p-2 text-sm font-semibold text-sand-900 focus:ring-2 focus:ring-forest-600"
          >
            {districts.map((d, idx) => (
              <option key={idx} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort options"
            className="w-full bg-sand-50 border border-sand-300 rounded-xl p-2 text-sm font-semibold text-sand-900 focus:ring-2 focus:ring-forest-600"
          >
            <option value="recent">{t('sortRecent')}</option>
            <option value="price-asc">{t('sortPriceLow')}</option>
            <option value="price-desc">{t('sortPriceHigh')}</option>
            <option value="rating">{t('sortRating')}</option>
          </select>
        </div>

        {/* Verified checkbox */}
        <div className="flex items-center gap-2 pl-2">
          <input
            type="checkbox"
            id="verifiedFilter"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="w-4 h-4 text-forest-700 rounded border-sand-300 focus:ring-forest-600 cursor-pointer"
          />
          <label htmlFor="verifiedFilter" className="text-xs sm:text-sm font-bold text-forest-900 flex items-center gap-1 cursor-pointer">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t('verifiedSHGsOnly')}</span>
          </label>
        </div>

      </div>

      {/* Active Results Count */}
      <div className="flex items-center justify-between text-xs font-semibold text-sand-600 px-1">
        <span>{filteredListings.length} {t('showingLotsCount')}</span>
        <span>{t('buyerCommissionExpl')}</span>
      </div>

      {/* Product Cards Grid */}
      {filteredListings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-sand-300 space-y-3">
          <ShoppingBag className="w-12 h-12 text-sand-400 mx-auto" />
          <h3 className="text-lg font-bold text-sand-800">No matching produce lots found</h3>
          <p className="text-xs text-sand-600 max-w-sm mx-auto">
            Try adjusting your search filters or district selection to view available forest harvests.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className="bg-white rounded-3xl overflow-hidden border border-sand-300 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                
                {/* Photo & Badge Overlays */}
                <div className="relative h-52 bg-sand-200 overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  <div className="absolute top-3 left-3 bg-forest-900/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{item.district} ({item.block})</span>
                  </div>

                  {item.isVerified && (
                    <div className="absolute top-3 right-3 bg-emerald-700 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  )}

                  {/* Voice Note Indicator */}
                  {item.voiceNoteDuration && (
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Mic className="w-3 h-3 text-emerald-400 animate-pulse" />
                      <span>Voice Note ({item.voiceNoteDuration})</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  
                  {/* Grade Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-terracotta-100 text-terracotta-800">
                      {item.grade}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-honey-700">
                      <Star className="w-3.5 h-3.5 fill-honey-400 text-honey-500" />
                      <span>{item.rating} ({item.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-forest-900 text-base group-hover:text-terracotta-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Seller / SHG Info */}
                  <div className="bg-sand-50 p-2.5 rounded-xl border border-sand-200 text-xs space-y-0.5">
                    <div className="font-bold text-forest-900">{item.sellerName}</div>
                    <div className="text-[11px] text-sand-600 font-medium truncate">{item.shgName}</div>
                  </div>

                  {/* Lot Availability & Harvest Date */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-sand-700 pt-1">
                    <div>
                      <span className="text-sand-500">{t('lotAvailableLabel')}:</span>
                      <div className="font-bold text-forest-900 text-xs">{item.quantity} {item.unit}</div>
                    </div>
                    <div>
                      <span className="text-sand-500">{t('minOrderLabel')}:</span>
                      <div className="font-bold text-forest-900 text-xs">{item.minOrderQty} {item.unit}</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Price & Order Action Strip */}
              <div className="p-5 pt-3 border-t border-sand-200 bg-sand-50/50 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase font-bold text-sand-500">{t('askingRateLabel')}</div>
                  <div className="text-xl font-extrabold text-forest-900 font-display">
                    ₹{item.pricePerUnit} <span className="text-xs font-normal text-sand-600">/{item.unit}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => handleQuickBuy(e, item)}
                  className="px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105"
                >
                  <span>{t('btnOrderBid')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

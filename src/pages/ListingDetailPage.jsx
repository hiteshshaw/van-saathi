import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Star,
  Mic,
  Play,
  Pause,
  Calendar,
  Layers,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Info,
  Building2,
  Heart,
  Share2,
  Volume2
} from 'lucide-react';

export const ListingDetailPage = () => {
  const {
    listings,
    selectedListingId,
    setActiveTab,
    setSelectedShgId,
    createOrder,
    currentRole,
    setCurrentRole,
    lang,
    t,
    showToast
  } = useApp();

  const listing = listings.find((l) => l.id === selectedListingId) || listings[0];
  
  // Voice note simulator state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  // Order / Bid configuration state
  const [orderQty, setOrderQty] = useState(listing ? Math.max(listing.minOrderQty, 50) : 50);
  const [bidPrice, setBidPrice] = useState(listing ? listing.pricePerUnit : 500);
  const [orderType, setOrderType] = useState('direct'); // 'direct' or 'bid'
  const [orderSuccessModal, setOrderSuccessModal] = useState(false);
  const [createdOrderDetails, setCreatedOrderDetails] = useState(null);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center">
        <p>Produce listing not found.</p>
        <button onClick={() => setActiveTab('marketplace')} className="mt-4 px-4 py-2 bg-forest-800 text-white rounded-xl">
          Back to Marketplace
        </button>
      </div>
    );
  }

  const toggleAudioPlay = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      if (window.speechSynthesis && listing.voiceTranscript) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(listing.voiceTranscript);
        utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => {
          setIsPlayingAudio(false);
        }, 8000);
      }
    } else {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    }
  };

  // Calculations
  const sellerSubtotal = orderQty * bidPrice;
  const buyerCommissionRate = 0.03; // 3%
  const buyerCommissionAmount = Math.round(sellerSubtotal * buyerCommissionRate);
  const buyerTotalPayable = sellerSubtotal + buyerCommissionAmount;

  // Fair floor warning check
  const isBelowFairFloor = bidPrice < listing.fairPriceBenchmark * 0.92;

  const handlePlaceOrder = () => {
    if (orderQty < listing.minOrderQty) {
      showToast(`Minimum order quantity for this lot is ${listing.minOrderQty} ${listing.unit}`, 'error');
      return;
    }

    const newOrder = createOrder({
      listing,
      quantity: orderQty,
      unitPrice: bidPrice,
      bidType: orderType
    });

    setCreatedOrderDetails(newOrder);
    setOrderSuccessModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => setActiveTab('marketplace')}
        className="inline-flex items-center gap-2 text-sm font-bold text-forest-800 hover:text-forest-950 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('backToMarketplace')}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Photo Gallery */}
          <div className="bg-white rounded-3xl overflow-hidden border border-sand-300 shadow-sm relative">
            <div className="h-80 sm:h-96 w-full bg-sand-200 relative">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-forest-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{listing.district} ({listing.block})</span>
              </div>
              <div className="absolute top-4 right-4 bg-terracotta-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                {listing.grade}
              </div>
            </div>
          </div>

          {/* Voice-Assisted Listing Audio Player */}
          {listing.voiceTranscript && (
            <div className="bg-emerald-900 text-white rounded-3xl p-5 sm:p-6 border border-emerald-700 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/30 flex items-center justify-center text-emerald-300">
                    <Mic className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{t('voiceNoteDurationLabel')}</h3>
                    <p className="text-xs text-emerald-200">Duration {listing.voiceNoteDuration} • Voice AI Verified</p>
                  </div>
                </div>
                
                <button
                  onClick={toggleAudioPlay}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs flex items-center gap-2 transition-all shadow"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingAudio ? t('pauseAudioBtn') : t('playAudioBtn')}</span>
                </button>
              </div>

              {/* Animated Waveform Visualizer */}
              <div className="bg-emerald-950/60 rounded-xl p-3 flex items-center gap-1.5 justify-center h-12">
                <div className={`w-1.5 bg-emerald-400 rounded-full ${isPlayingAudio ? 'animate-wave-1' : 'h-2'}`}></div>
                <div className={`w-1.5 bg-emerald-300 rounded-full ${isPlayingAudio ? 'animate-wave-2' : 'h-4'}`}></div>
                <div className={`w-1.5 bg-emerald-400 rounded-full ${isPlayingAudio ? 'animate-wave-3' : 'h-6'}`}></div>
                <div className={`w-1.5 bg-emerald-200 rounded-full ${isPlayingAudio ? 'animate-wave-4' : 'h-3'}`}></div>
                <div className={`w-1.5 bg-emerald-400 rounded-full ${isPlayingAudio ? 'animate-wave-5' : 'h-5'}`}></div>
                <div className={`w-1.5 bg-emerald-300 rounded-full ${isPlayingAudio ? 'animate-wave-6' : 'h-2'}`}></div>
                <div className={`w-1.5 bg-emerald-400 rounded-full ${isPlayingAudio ? 'animate-wave-2' : 'h-4'}`}></div>
                <div className={`w-1.5 bg-emerald-200 rounded-full ${isPlayingAudio ? 'animate-wave-1' : 'h-2'}`}></div>
              </div>

              {/* Transcript */}
              <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-800/80 text-xs text-emerald-100 italic">
                <span className="font-bold not-italic text-emerald-300">Transcript: </span>
                "{listing.voiceTranscript}"
              </div>
            </div>
          )}

          {/* Specifications */}
          <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-forest-900">{t('specificationsTitle')}</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                <div className="text-sand-500 font-medium">{t('specGrade')}</div>
                <div className="font-bold text-forest-900 text-sm mt-0.5">{listing.grade}</div>
              </div>
              <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                <div className="text-sand-500 font-medium">{t('specBatch')}</div>
                <div className="font-bold text-forest-900 text-sm mt-0.5">{listing.harvestDate}</div>
              </div>
              <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                <div className="text-sand-500 font-medium">{t('specAvailable')}</div>
                <div className="font-bold text-forest-900 text-sm mt-0.5">{listing.quantity} {listing.unit}</div>
              </div>
              <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                <div className="text-sand-500 font-medium">{t('specMinOrder')}</div>
                <div className="font-bold text-forest-900 text-sm mt-0.5">{listing.minOrderQty} {listing.unit}</div>
              </div>
              <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                <div className="text-sand-500 font-medium">{t('specMandi')}</div>
                <div className="font-bold text-forest-900 text-sm mt-0.5">{listing.district}</div>
              </div>
              <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                <div className="text-sand-500 font-medium">{t('specVerified')}</div>
                <div className="font-bold text-emerald-700 text-sm mt-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </div>
              </div>
            </div>
          </div>

          {/* Seller & SHG Story */}
          <div className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-sand-500 uppercase tracking-wider">{t('harvestedByLabel')}</span>
                <h3 className="text-lg font-bold text-forest-900">{listing.sellerName}</h3>
                <p className="text-xs text-sand-600">{listing.shgName}</p>
              </div>
              <div className="flex items-center gap-1 bg-honey-100 text-honey-800 px-3 py-1 rounded-xl text-xs font-bold border border-honey-300">
                <Star className="w-4 h-4 fill-honey-400 text-honey-500" />
                <span>{listing.rating} ({listing.reviewsCount} reviews)</span>
              </div>
            </div>

            <p className="text-sm text-sand-700 leading-relaxed italic bg-sand-50 p-4 rounded-2xl border border-sand-200">
              "{listing.sellerStory}"
            </p>

            <button
              onClick={() => {
                setSelectedShgId('SHG-001');
                setActiveTab('shg-detail');
              }}
              className="text-xs font-bold text-forest-800 hover:text-forest-950 underline underline-offset-4"
            >
              {t('viewFullSHGProfile')}
            </button>
          </div>

        </div>

        {/* Right Column: Pricing & Order Form */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-300 shadow-xl space-y-6">
            
            <div>
              <span className="text-xs font-bold text-sand-500 uppercase tracking-wider">{t('askingRateLabel')}</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-forest-900 font-display">
                  ₹{listing.pricePerUnit}
                </span>
                <span className="text-sm font-semibold text-sand-600">/ {listing.unit}</span>
              </div>

              {/* Fair Benchmark Indicator */}
              <div className="mt-2.5 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                <span className="text-emerald-900 font-medium">{t('fairBenchmarkGuidance')}</span>
                <span className="font-bold text-emerald-800">₹{listing.fairPriceBenchmark}/{listing.unit}</span>
              </div>
            </div>

            {/* Order Configuration Form */}
            <div className="space-y-4 pt-2 border-t border-sand-200">
              
              {/* Mode Selection */}
              <div className="grid grid-cols-2 gap-2 bg-sand-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setOrderType('direct');
                    setBidPrice(listing.pricePerUnit);
                  }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    orderType === 'direct' ? 'bg-forest-800 text-white shadow' : 'text-sand-700 hover:text-sand-900'
                  }`}
                >
                  {t('directOrderTab')}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('bid')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    orderType === 'bid' ? 'bg-forest-800 text-white shadow' : 'text-sand-700 hover:text-sand-900'
                  }`}
                >
                  {t('customBidTab')}
                </button>
              </div>

              {/* Quantity Input */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-forest-900 mb-1.5">
                  <span>{t('specAvailable')} ({listing.unit}):</span>
                  <span className="text-sand-500">Max: {listing.quantity} {listing.unit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={listing.minOrderQty}
                    max={listing.quantity}
                    value={orderQty}
                    onChange={(e) => setOrderQty(Math.min(listing.quantity, Math.max(1, Number(e.target.value))))}
                    className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-sm font-bold text-sand-900 focus:ring-2 focus:ring-forest-600"
                  />
                  <div className="flex gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setOrderQty(listing.minOrderQty)}
                      className="px-2.5 py-2 text-xs font-bold bg-sand-200 hover:bg-sand-300 rounded-lg"
                    >
                      Min
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderQty(listing.quantity)}
                      className="px-2.5 py-2 text-xs font-bold bg-sand-200 hover:bg-sand-300 rounded-lg"
                    >
                      Max
                    </button>
                  </div>
                </div>
              </div>

              {/* Custom Bid Price Input */}
              {orderType === 'bid' && (
                <div className="space-y-1.5 animate-in fade-in">
                  <label className="block text-xs font-bold text-forest-900">
                    Your Bid Price per {listing.unit} (₹):
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-sm font-bold text-sand-900 focus:ring-2 focus:ring-forest-600"
                  />
                  
                  {isBelowFairFloor && (
                    <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-2 text-xs text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">{t('fairFloorWarningTitle')} </span>
                        {t('fairFloorWarningText')}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Cost Breakdown */}
              <div className="bg-sand-50 rounded-2xl p-4 border border-sand-200 space-y-2 text-xs">
                <div className="font-bold text-sand-800 uppercase tracking-wider text-[11px] pb-1 border-b border-sand-200">
                  {t('costBreakdownTitle')}
                </div>
                
                <div className="flex justify-between text-sand-700">
                  <span>{t('sellerPayoutItem')} ({orderQty} {listing.unit} × ₹{bidPrice}):</span>
                  <span className="font-bold text-forest-900">₹{sellerSubtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {t('sellerDeductionZero')}
                  </span>
                  <span>₹0</span>
                </div>

                <div className="flex justify-between text-sand-700 pt-1 border-t border-sand-200">
                  <span className="flex items-center gap-1">
                    {t('platformFeeBuyerItem')}
                  </span>
                  <span className="font-bold text-sand-900">₹{buyerCommissionAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-forest-900 pt-2 border-t-2 border-forest-800">
                  <span>{t('totalBuyerPayableItem')}</span>
                  <span className="text-base text-forest-900">₹{buyerTotalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full py-4 rounded-2xl bg-terracotta-600 hover:bg-terracotta-500 text-white font-extrabold text-base shadow-lg hover:shadow-terracotta-600/30 transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                <Building2 className="w-5 h-5" />
                <span>{orderType === 'direct' ? t('confirmDirectOrderBtn') : t('submitBidBtn')}</span>
              </button>

              <div className="text-center text-[11px] text-sand-600 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('escrowProtectionNote')}</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {orderSuccessModal && createdOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-sand-300 animate-in zoom-in-95">
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-forest-900">
                Order #{createdOrderDetails.id} Confirmed!
              </h3>
              <p className="text-xs text-sand-600">
                Your procurement request has been dispatched to {createdOrderDetails.sellerName}.
              </p>
            </div>

            <div className="bg-sand-50 rounded-2xl p-4 border border-sand-200 text-xs space-y-2">
              <div className="flex justify-between font-bold text-forest-900">
                <span>Product:</span>
                <span>{createdOrderDetails.productName}</span>
              </div>
              <div className="flex justify-between text-sand-700">
                <span>Quantity:</span>
                <span className="font-semibold">{createdOrderDetails.quantity} {createdOrderDetails.unit}</span>
              </div>
              <div className="flex justify-between text-sand-700">
                <span>Seller Direct Payout (0% fee):</span>
                <span className="font-bold text-emerald-800">₹{createdOrderDetails.sellerAgreedAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sand-700">
                <span>VanMandi 3% Buyer Commission:</span>
                <span className="font-semibold">₹{createdOrderDetails.buyerCommissionAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-forest-900 pt-2 border-t border-sand-300">
                <span>Total Amount in Escrow (Demo):</span>
                <span>₹{createdOrderDetails.buyerTotalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setOrderSuccessModal(false);
                  setCurrentRole('buyer');
                  setActiveTab('buyer-orders');
                }}
                className="py-3 px-4 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs shadow"
              >
                Track in Buyer Dashboard
              </button>
              <button
                onClick={() => {
                  setOrderSuccessModal(false);
                  setCurrentRole('seller');
                  setActiveTab('seller-orders');
                }}
                className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow"
              >
                View as Seller Payout
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

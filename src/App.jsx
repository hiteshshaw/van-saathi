import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LiveTicker } from './components/LiveTicker';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DemoControlPanel } from './components/DemoControlPanel';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { LivePriceBoard } from './pages/LivePriceBoard';
import { MarketplacePage } from './pages/MarketplacePage';
import { ListingDetailPage } from './pages/ListingDetailPage';
import { SHGDirectoryPage, SHGDetailPage } from './pages/SHGDirectoryPage';
import { GradingGuidePage } from './pages/GradingGuidePage';
import {
  HowItWorksPage,
  AboutPage,
  FAQPage,
  ContactPage,
  PrivacyPolicyPage,
  TermsPage
} from './pages/InfoPages';

// Seller Views
import { SellerVoiceListing } from './components/seller/SellerVoiceListing';
import { SellerListingsView } from './components/seller/SellerListingsView';
import { SellerOrdersView } from './components/seller/SellerOrdersView';
import { SellerPaymentsView } from './components/seller/SellerPaymentsView';
import { SellerProfilePanel } from './components/seller/SellerProfilePanel';

// Buyer Views
import { BuyerDashboard } from './components/buyer/BuyerDashboard';
import { BuyerOrdersView } from './components/buyer/BuyerOrdersView';
import { BuyerProfilePanel } from './components/buyer/BuyerProfilePanel';

// Admin View
import { AdminPanel } from './pages/AdminPanel';

import { CheckCircle2, AlertCircle, Info, X, Mic, Bot } from 'lucide-react';

export function App() {
  const { activeTab, toast } = useApp();
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'prices':
        return <LivePriceBoard />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'product-detail':
        return <ListingDetailPage />;
      case 'shgs':
        return <SHGDirectoryPage />;
      case 'shg-detail':
        return <SHGDetailPage />;
      case 'grading-guide':
        return <GradingGuidePage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'about':
        return <AboutPage />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;

      // Seller views
      case 'seller-voice-add':
        return <SellerVoiceListing />;
      case 'seller-listings':
        return <SellerListingsView />;
      case 'seller-orders':
        return <SellerOrdersView />;
      case 'seller-payments':
        return <SellerPaymentsView />;
      case 'seller-profile':
        return <SellerProfilePanel />;

      // Buyer views
      case 'buyer-dashboard':
        return <BuyerDashboard />;
      case 'buyer-orders':
        return <BuyerOrdersView />;
      case 'buyer-profile':
        return <BuyerProfilePanel />;

      // Admin views
      case 'admin-panel':
        return <AdminPanel />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A251E] font-sans pb-16 lg:pb-0 relative">
      
      {/* Live Market Price Ticker */}
      <LiveTicker />

      {/* Main Navigation Header */}
      <Navbar />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-in slide-in-from-top-4 fade-in">
          <div className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 ${
            toast.type === 'success'
              ? 'bg-emerald-900 text-white border-emerald-700'
              : toast.type === 'error'
              ? 'bg-rose-900 text-white border-rose-700'
              : 'bg-forest-900 text-white border-forest-700'
          }`}>
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-honey-400 shrink-0 mt-0.5" />}
            
            <div className="text-xs font-semibold leading-relaxed flex-1">
              {toast.message}
            </div>
          </div>
        </div>
      )}

      {/* Main Active Page View */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Floating Voice Assistant Trigger (Bottom Left) */}
      <div className="fixed bottom-20 sm:bottom-6 left-4 z-40">
        <button
          onClick={() => setVoiceModalOpen(true)}
          className="px-4 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-2xl border-2 border-emerald-400/80 flex items-center gap-2 group transition-all hover:scale-105"
        >
          <Bot className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
          <span>Ask Voice Assistant 🎙️</span>
        </button>
      </div>

      {/* Footer */}
      <Footer />

      {/* Mobile-First Sticky Bottom Nav */}
      <MobileBottomNav />

      {/* Floating Demo / Mock Control Dock */}
      <DemoControlPanel />

      {/* Global Conversational Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />

    </div>
  );
}

export default App;

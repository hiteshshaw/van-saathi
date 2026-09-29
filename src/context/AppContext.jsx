import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PRODUCE_CATALOG,
  DISTRICTS_JHARKHAND,
  LIVE_PRICE_DATA,
  INITIAL_LISTINGS,
  INITIAL_SHGS,
  INITIAL_ORDERS,
  INITIAL_VERIFICATIONS,
  INITIAL_NOTICES
} from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

export const DEMO_PERSONAS = {
  'seller-1': {
    id: 'SEL-001',
    role: 'seller',
    name: 'Sumati Devi & Sima Topno',
    groupName: 'Birsa Munda Mahila SHG',
    district: 'Khunti',
    block: 'Torpa Block',
    phone: '+91 94311 88210',
    kycStatus: 'Verified (SHG Passbook + Aadhaar)',
    avatar: '🌾',
    bio: 'President of 12-member tribal women collective producing Grade-A Kusmi lac and artisanal lac bangles.',
    bankAccount: 'State Bank of India (Torpa) • A/C: ****4921',
    rating: 4.9
  },
  'seller-2': {
    id: 'SEL-002',
    role: 'seller',
    name: 'Mangal Oraon',
    groupName: 'Sarhul Van Suraksha Samiti',
    district: 'Gumla',
    block: 'Bishunpur',
    phone: '+91 94701 44520',
    kycStatus: 'Verified (Community Forest Rights Title)',
    avatar: '🌸',
    bio: 'Forest gatherer harvesting sun-dried organic Mahua and wild medicinal herbs from community forest.',
    bankAccount: 'Bank of India (Bishunpur) • A/C: ****7832',
    rating: 4.8
  },
  'buyer-1': {
    id: 'BUY-201',
    role: 'buyer',
    name: 'BioVeda Naturals Pvt Ltd',
    representative: 'Rajesh Sharma (Procurement VP)',
    gstin: '20AABCB1234F1Z5',
    district: 'Ranchi',
    phone: '+91 98200 12345',
    kycStatus: 'GST & FSSAI Verified',
    avatar: '🏢',
    businessType: 'Herbal Formulations & Natural Resins',
    creditLine: '₹25,00,000 (Escrow Approved)'
  },
  'buyer-2': {
    id: 'BUY-202',
    role: 'buyer',
    name: 'Chotanagpur Shellac & Resins Ltd',
    representative: 'Vikram Jalan (Managing Director)',
    gstin: '20AABCC4567M1ZX',
    district: 'West Singhbhum',
    phone: '+91 98350 99881',
    kycStatus: 'Export Council & GST Verified',
    avatar: '🏭',
    businessType: 'Industrial Shellac & Seedlac Processing Unit',
    creditLine: '₹50,00,000 (Escrow Approved)'
  },
  'admin-1': {
    id: 'ADM-001',
    role: 'admin',
    name: 'Sri Anup Kerketta',
    title: 'Nodal Officer - Minor Forest Produce',
    department: 'JUT / JSLPS Tribal Innovation Cell',
    phone: '+91 94310 00099',
    kycStatus: 'State Secretariat SuperAdmin',
    avatar: '⚙️'
  }
};

export const INITIAL_USERS_LIST = [
  { id: 'SEL-001', name: 'Sumati Devi', type: 'Seller (SHG)', district: 'Khunti', phone: '+91 94311 88210', status: 'Active', verified: true, sales: '₹1,02,000' },
  { id: 'SEL-002', name: 'Mangal Oraon', type: 'Seller (Collector)', district: 'Gumla', phone: '+91 94701 44520', status: 'Active', verified: true, sales: '₹55,200' },
  { id: 'SEL-003', name: 'Phulo Murmu', type: 'Seller (Honey SHG)', district: 'Latehar', phone: '+91 94711 00000', status: 'Active', verified: true, sales: '₹81,000' },
  { id: 'BUY-201', name: 'BioVeda Naturals', type: 'Buyer (Pharma)', district: 'Ranchi', phone: '+91 98200 12345', status: 'Active', verified: true, spend: '₹1,50,000' },
  { id: 'BUY-202', name: 'Chotanagpur Resins', type: 'Buyer (Exporter)', district: 'Chaibasa', phone: '+91 98350 99881', status: 'Active', verified: true, spend: '₹2,80,000' }
];

export const INITIAL_DISPUTES = [
  {
    id: 'DSP-801',
    orderId: 'ORD-9418',
    buyerName: 'Himalayan Organics Herbals',
    sellerName: 'Phulo Murmu (Netarhat Honey)',
    issue: 'Moisture level certificate requested for batch #2',
    status: 'Resolved by Admin',
    resolutionDate: '28 Sep 2026',
    notes: 'JSLPS lab moisture report (17.8% moisture) uploaded and approved. Escrow released.'
  }
];

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState('hi');
  const [currentRole, setCurrentRole] = useState('public');
  const [activePersonaKey, setActivePersonaKey] = useState('seller-1');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [selectedShgId, setSelectedShgId] = useState(null);

  // Core mutable state
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('vanmandi_listings_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure no old unsplash URLs remain
        return parsed.map(item => {
          if (item.images && item.images[0] && item.images[0].includes('unsplash')) {
            const catalogItem = INITIAL_LISTINGS.find(l => l.id === item.id);
            return catalogItem ? { ...item, images: catalogItem.images } : item;
          }
          return item;
        });
      } catch (e) {
        return INITIAL_LISTINGS;
      }
    }
    return INITIAL_LISTINGS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('vanmandi_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [verifications, setVerifications] = useState(() => {
    const saved = localStorage.getItem('vanmandi_verifications');
    return saved ? JSON.parse(saved) : INITIAL_VERIFICATIONS;
  });

  const [priceData, setPriceData] = useState(() => {
    const saved = localStorage.getItem('vanmandi_prices');
    return saved ? JSON.parse(saved) : LIVE_PRICE_DATA;
  });

  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('vanmandi_notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem('vanmandi_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS_LIST;
  });

  const [disputes, setDisputes] = useState(() => {
    const saved = localStorage.getItem('vanmandi_disputes');
    return saved ? JSON.parse(saved) : INITIAL_DISPUTES;
  });

  const [isOffline, setIsOffline] = useState(false);
  const [demoPanelOpen, setDemoPanelOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeCheckoutListing, setActiveCheckoutListing] = useState(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('vanmandi_listings_v3', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('vanmandi_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('vanmandi_verifications', JSON.stringify(verifications));
  }, [verifications]);

  useEffect(() => {
    localStorage.setItem('vanmandi_prices', JSON.stringify(priceData));
  }, [priceData]);

  useEffect(() => {
    localStorage.setItem('vanmandi_users', JSON.stringify(usersList));
  }, [usersList]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
  };

  const selectPersona = (personaKey) => {
    setActivePersonaKey(personaKey);
    const persona = DEMO_PERSONAS[personaKey];
    if (persona) {
      setCurrentRole(persona.role);
      if (persona.role === 'seller') setActiveTab('seller-listings');
      else if (persona.role === 'buyer') setActiveTab('buyer-dashboard');
      else if (persona.role === 'admin') setActiveTab('admin-panel');
      showToast(`Switched persona to ${persona.name} (${persona.role.toUpperCase()})`, 'info');
    }
  };

  // Add new listing
  const addListing = (newListingData) => {
    const id = `LIST-${100 + listings.length + 1}`;
    const persona = DEMO_PERSONAS[activePersonaKey] || DEMO_PERSONAS['seller-1'];
    const newListing = {
      id,
      sellerId: persona.id,
      sellerName: persona.name,
      shgName: persona.groupName || 'Birsa Munda Mahila SHG, Torpa',
      isShg: true,
      isVerified: true,
      rating: 5.0,
      reviewsCount: 1,
      harvestDate: 'Current Season 2026',
      ...newListingData
    };
    setListings([newListing, ...listings]);
    showToast(lang === 'hi' ? 'आपकी उपज सफलतापूर्वक मंडी में जुड़ गई है!' : 'Your produce listing has been published!', 'success');
    return newListing;
  };

  // Create order
  const createOrder = ({ listing, quantity, unitPrice, bidType = 'direct' }) => {
    const sellerAgreedAmount = quantity * unitPrice;
    const buyerCommissionRate = 0.03;
    const buyerCommissionAmount = Math.round(sellerAgreedAmount * buyerCommissionRate);
    const buyerTotalAmount = sellerAgreedAmount + buyerCommissionAmount;

    const buyerPersona = DEMO_PERSONAS[activePersonaKey]?.role === 'buyer'
      ? DEMO_PERSONAS[activePersonaKey]
      : DEMO_PERSONAS['buyer-1'];

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      listingId: listing.id,
      productName: listing.title || listing.productName,
      quantity,
      unit: listing.unit,
      unitPrice,
      sellerAgreedAmount,
      buyerCommissionRate,
      buyerCommissionAmount,
      buyerTotalAmount,
      sellerId: listing.sellerId,
      sellerName: listing.sellerName,
      sellerPhone: '+91 94311 00000',
      buyerId: buyerPersona.id,
      buyerName: buyerPersona.name,
      buyerContact: `${buyerPersona.representative || 'Procurement'} (${buyerPersona.phone})`,
      buyerGstin: buyerPersona.gstin || '20AABCB1234F1Z5',
      district: listing.district,
      status: 'confirmed',
      placedAt: new Date().toLocaleString(),
      dispatchDate: 'Pending dispatch by seller',
      trackingNumber: `VNM-EXP-${Math.floor(10000 + Math.random() * 90000)}`,
      paymentStatus: 'Escrow Held (Demo)',
      bidType
    };

    setOrders([newOrder, ...orders]);
    showToast(
      lang === 'hi'
        ? `ऑर्डर #${newOrder.id} स्वीकृत! विक्रेता को ₹${sellerAgreedAmount.toLocaleString('en-IN')} (0% कटौती) एवं 3% शुल्क जोड़ा गया।`
        : `Order #${newOrder.id} placed! Seller receives full ₹${sellerAgreedAmount.toLocaleString('en-IN')} with 3% buyer platform fee.`,
      'success'
    );
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: newStatus,
            paymentStatus: newStatus === 'paid' ? 'Direct UPI Released (Demo)' : ord.paymentStatus
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} updated to '${newStatus}'`, 'info');
  };

  const updateVerification = (id, newStatus) => {
    setVerifications(prev =>
      prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
    );
    showToast(`Verification ${id} marked as ${newStatus}`, 'info');
  };

  const toggleUserVerification = (userId) => {
    setUsersList(prev =>
      prev.map(u => u.id === userId ? { ...u, verified: !u.verified, status: u.verified ? 'Pending Review' : 'Active' } : u)
    );
    showToast(`User verification status updated`, 'info');
  };

  const updatePriceBenchmark = (priceId, newCurrentPrice) => {
    setPriceData(prev =>
      prev.map(p => {
        if (p.id === priceId) {
          const old = p.currentPrice;
          const diff = Math.round(((newCurrentPrice - old) / old) * 100 * 10) / 10;
          return {
            ...p,
            currentPrice: Number(newCurrentPrice),
            change: diff,
            trend: diff >= 0 ? 'up' : 'down',
            lastUpdated: 'Just now (Admin Update)'
          };
        }
        return p;
      })
    );
    showToast('Fair price benchmark updated successfully', 'success');
  };

  // Simulation Triggers for Demo
  const simulateIncomingBuyerOrder = () => {
    const targetListing = listings[0];
    const qty = 80;
    const newOrd = createOrder({
      listing: targetListing,
      quantity: qty,
      unitPrice: targetListing.pricePerUnit,
      bidType: 'direct'
    });
    setCurrentRole('seller');
    setActiveTab('seller-orders');
    showToast(`⚡ Simulation Event: New order #${newOrd.id} received from BioVeda Naturals!`, 'success');
  };

  const simulateMarketPriceHike = () => {
    setPriceData(prev =>
      prev.map(p => {
        if (p.productId === 'lac-kusmi') {
          return { ...p, currentPrice: p.currentPrice + 25, change: +8.5, trend: 'up', lastUpdated: 'Just now (Mandi Spike)' };
        }
        if (p.productId === 'mahua-dry') {
          return { ...p, currentPrice: p.currentPrice + 4, change: +6.2, trend: 'up', lastUpdated: 'Just now (Mandi Spike)' };
        }
        return p;
      })
    );
    showToast('📈 Simulation Event: Live Mandi price spike (+8.5% on Kusmi Lac) triggered!', 'info');
  };

  const resetAllData = () => {
    localStorage.clear();
    setListings(INITIAL_LISTINGS);
    setOrders(INITIAL_ORDERS);
    setVerifications(INITIAL_VERIFICATIONS);
    setPriceData(LIVE_PRICE_DATA);
    setNotices(INITIAL_NOTICES);
    setUsersList(INITIAL_USERS_LIST);
    setDisputes(INITIAL_DISPUTES);
    showToast('🔄 Demo data reset to original defaults.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        currentRole,
        setCurrentRole,
        activePersonaKey,
        setActivePersonaKey,
        activePersona: DEMO_PERSONAS[activePersonaKey] || DEMO_PERSONAS['seller-1'],
        demoPersonas: DEMO_PERSONAS,
        selectPersona,
        activeTab,
        setActiveTab,
        selectedListingId,
        setSelectedListingId,
        selectedShgId,
        setSelectedShgId,
        listings,
        orders,
        verifications,
        priceData,
        notices,
        usersList,
        disputes,
        isOffline,
        setIsOffline,
        demoPanelOpen,
        setDemoPanelOpen,
        toast,
        showToast,
        t,
        addListing,
        createOrder,
        updateOrderStatus,
        updateVerification,
        toggleUserVerification,
        updatePriceBenchmark,
        simulateIncomingBuyerOrder,
        simulateMarketPriceHike,
        resetAllData,
        activeCheckoutListing,
        setActiveCheckoutListing,
        districts: DISTRICTS_JHARKHAND,
        catalog: PRODUCE_CATALOG,
        shgs: INITIAL_SHGS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

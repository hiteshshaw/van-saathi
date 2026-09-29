export const PRODUCE_CATALOG = [
  {
    id: 'lac-kusmi',
    name: 'Kusmi Lac (कुसुमी लाख)',
    category: 'Resins & Gums',
    harvestSeason: 'Nov - Feb (Aghani) / Jun - Jul (Jethwi)',
    standardUnit: 'kg',
    fairPriceMin: 450,
    fairPriceMax: 520,
    grades: [
      { grade: 'Grade A (Scraped Clean)', basePrice: 510, desc: 'Purity > 90%, moisture < 5%' },
      { grade: 'Grade B (Sticklac Natural)', basePrice: 460, desc: 'Dry sticklac, minimal bark' },
    ],
    icon: '✨',
    image: '/images/kusmi_lac.jpg',
    description: 'High-purity resin harvested from Schleichera oleosa (Kusum) host trees in Khunti and Gumla forests.'
  },
  {
    id: 'mahua-dry',
    name: 'Dried Mahua Flower (महुआ फूल)',
    category: 'Forest Flowers',
    harvestSeason: 'March - April',
    standardUnit: 'kg',
    fairPriceMin: 38,
    fairPriceMax: 48,
    grades: [
      { grade: 'Food Grade (Sun Dried)', basePrice: 46, desc: 'Clean, sand-free, golden brown, moisture < 10%' },
      { grade: 'Distillery Grade', basePrice: 40, desc: 'Standard bulk collector grade' },
    ],
    icon: '🌸',
    image: '/images/mahua_dry.jpg',
    description: 'Sweet edible forest blossom hand-collected by tribal families at dawn, sun-dried on organic bamboo mats.'
  },
  {
    id: 'tendu-leaves',
    name: 'Tendu Leaves (तेंदू पत्ता)',
    category: 'Leaves & Wrappers',
    harvestSeason: 'April - May',
    standardUnit: 'standard bag (1000 bundles)',
    fairPriceMin: 2200,
    fairPriceMax: 2600,
    grades: [
      { grade: 'Grade 1 (Large, Spot-free)', basePrice: 2550, desc: 'Smooth texture, unbroken leaves, 50 leaves/puda' },
      { grade: 'Grade 2 (Standard)', basePrice: 2300, desc: 'Medium size, well cured' },
    ],
    icon: '🍃',
    image: '/images/tendu_leaves.jpg',
    description: 'Wild Diospyros melanoxylon leaves carefully harvested, cured, and bundled across Latehar and Garhwa.'
  },
  {
    id: 'wild-honey',
    name: 'Raw Forest Honey (जंगली शुद्ध शहद)',
    category: 'Honey & Bee Products',
    harvestSeason: 'April - June / Oct - Nov',
    standardUnit: 'kg',
    fairPriceMin: 380,
    fairPriceMax: 460,
    grades: [
      { grade: 'Multifloral Sal & Karanj (Raw Unheated)', basePrice: 450, desc: 'Cold strained, zero sugar feeding, moisture < 19%' },
      { grade: 'Wild Rock Bee Honey', basePrice: 400, desc: 'Traditional tribal sustainably harvested' },
    ],
    icon: '🍯',
    image: '/images/wild_honey.jpg',
    description: 'Pure, organic multifloral honey extracted without destroying bee colonies in Saranda & Netarhat forests.'
  },
  {
    id: 'sal-seeds',
    name: 'Sal Seeds (साल बीज)',
    category: 'Oilseeds',
    harvestSeason: 'May - June',
    standardUnit: 'quintal (100kg)',
    fairPriceMin: 2100,
    fairPriceMax: 2500,
    grades: [
      { grade: 'Grade A (De-winged, Sound)', basePrice: 2450, desc: 'Fat content > 19%, moisture < 8%' },
      { grade: 'Commercial Grade', basePrice: 2200, desc: 'Standard oil mill batch' },
    ],
    icon: '🌰',
    image: '/images/tendu_leaves.jpg',
    description: 'Shorea robusta seeds harvested from natural dense Sal reserves for organic butter and confectionery fats.'
  },
  {
    id: 'tasar-cocoons',
    name: 'Tasar Silk Cocoons (तसर कोकून)',
    category: 'Silk & Fibers',
    harvestSeason: 'Sept - Nov (Barsati) / Dec - Jan (Jadwi)',
    standardUnit: 'kahan (1280 cocoons)',
    fairPriceMin: 3800,
    fairPriceMax: 4400,
    grades: [
      { grade: 'Grade 1 (Hard shell, uniform size)', basePrice: 4300, desc: 'Reelable shell ratio > 14%' },
      { grade: 'Grade 2 (Medium)', basePrice: 3950, desc: 'Good for blending & spun silk' },
    ],
    icon: '🧵',
    image: '/images/tasar_cocoons.jpg',
    description: 'Nature-grown wild silkworm cocoons reared on Asan and Arjun trees by Ho & Munda tribal artisans in West Singhbhum.'
  },
  {
    id: 'lac-bangles',
    name: 'Handcrafted Lac Bangles (लाख की चूड़ियां)',
    category: 'SHG Value-Added',
    harvestSeason: 'Year Round',
    standardUnit: 'set of 4',
    fairPriceMin: 180,
    fairPriceMax: 350,
    grades: [
      { grade: 'Premium Kundan & Brass Inlay', basePrice: 320, desc: 'Artisanal finish, pure lac core, lead-free' },
      { grade: 'Traditional Plain Colored', basePrice: 190, desc: 'Classic tribal folk color palettes' },
    ],
    icon: '💍',
    image: '/images/kusmi_lac.jpg',
    description: 'Heritage jewelry made by Torpa Mahila SHG using purified natural lac, colored with mineral pigments.'
  },
  {
    id: 'chironji',
    name: 'Chironji / Charoli Nuts (चिरौंजी)',
    category: 'Nuts & Kernels',
    harvestSeason: 'April - May',
    standardUnit: 'kg',
    fairPriceMin: 950,
    fairPriceMax: 1250,
    grades: [
      { grade: 'Grade A (Whole Bold Kernels)', basePrice: 1200, desc: 'Clean, unbroken kernels, high oil content' },
      { grade: 'Grade B (Split & Mixed)', basePrice: 1020, desc: 'Standard confectionery grade' },
    ],
    icon: '🥜',
    image: '/images/mahua_dry.jpg',
    description: 'Buchanania lanzan kernels collected by Simdega tribal collectors, decorticated using traditional wooden presses.'
  },
  {
    id: 'kalmegh-giloy',
    name: 'Organic Giloy & Kalmegh (गिलोय एवं कालमेघ)',
    category: 'Medicinal Herbs',
    harvestSeason: 'Nov - Jan',
    standardUnit: 'kg',
    fairPriceMin: 85,
    fairPriceMax: 130,
    grades: [
      { grade: 'Neem-climber Giloy Dry Stems', basePrice: 125, desc: 'Thick mature stems, bitterness > 1.2%' },
      { grade: 'Kalmegh Whole Dry Herb', basePrice: 95, desc: 'Sun-dried with leaves and rootlets' },
    ],
    icon: '🌿',
    image: '/images/tendu_leaves.jpg',
    description: 'Ayurvedic grade wild medicinal botanicals gathered from pesticide-free native forest corridors.'
  }
];

export const DISTRICTS_JHARKHAND = [
  'All Districts',
  'Khunti',
  'Ranchi',
  'Gumla',
  'West Singhbhum (Chaibasa)',
  'Latehar',
  'Simdega',
  'Saraikela Kharsawan',
  'Dumka',
  'Garhwa',
  'East Singhbhum'
];

export const LIVE_PRICE_DATA = [
  {
    id: 'lp-1',
    productId: 'lac-kusmi',
    productName: 'Kusmi Lac (Scraped Grade A)',
    district: 'Khunti',
    currentPrice: 515,
    unit: 'kg',
    minPrice: 480,
    maxPrice: 530,
    change: +4.2,
    trend: 'up',
    lastUpdated: '2026-09-29 07:30 AM',
    source: 'JSLPS Mandi Cell & Torpa Market Hub (Sample data)',
    weeklyTrend: [490, 495, 502, 505, 510, 512, 515]
  },
  {
    id: 'lp-2',
    productId: 'mahua-dry',
    productName: 'Dried Mahua Flower (Food Grade)',
    district: 'Gumla',
    currentPrice: 47,
    unit: 'kg',
    minPrice: 42,
    maxPrice: 50,
    change: +2.1,
    trend: 'up',
    lastUpdated: '2026-09-29 08:00 AM',
    source: 'TRIFED Regional Benchmark (Sample data)',
    weeklyTrend: [43, 44, 44, 45, 46, 46, 47]
  },
  {
    id: 'lp-3',
    productId: 'wild-honey',
    productName: 'Raw Forest Multifloral Honey',
    district: 'Latehar (Netarhat)',
    currentPrice: 450,
    unit: 'kg',
    minPrice: 420,
    maxPrice: 475,
    change: 0.0,
    trend: 'stable',
    lastUpdated: '2026-09-29 06:45 AM',
    source: 'Van Dhan Vikas Kendra Latehar (Sample data)',
    weeklyTrend: [450, 450, 445, 450, 450, 450, 450]
  },
  {
    id: 'lp-4',
    productId: 'tendu-leaves',
    productName: 'Tendu Leaves (Standard Puda Bag)',
    district: 'Garhwa',
    currentPrice: 2500,
    unit: 'bag',
    minPrice: 2350,
    maxPrice: 2650,
    change: +1.6,
    trend: 'up',
    lastUpdated: '2026-09-28 05:00 PM',
    source: 'Jharkhand State Forest Development Corp (Sample data)',
    weeklyTrend: [2400, 2420, 2450, 2460, 2480, 2490, 2500]
  },
  {
    id: 'lp-5',
    productId: 'tasar-cocoons',
    productName: 'Tasar Silk Cocoons (A-Grade)',
    district: 'West Singhbhum',
    currentPrice: 4350,
    unit: 'kahan (1280)',
    minPrice: 4100,
    maxPrice: 4500,
    change: +3.8,
    trend: 'up',
    lastUpdated: '2026-09-29 07:15 AM',
    source: 'Central Silk Board & Chaibasa Mandi (Sample data)',
    weeklyTrend: [4150, 4200, 4220, 4280, 4300, 4320, 4350]
  },
  {
    id: 'lp-6',
    productId: 'sal-seeds',
    productName: 'Sal Seeds (Grade A Sound)',
    district: 'Simdega',
    currentPrice: 2450,
    unit: 'quintal',
    minPrice: 2300,
    maxPrice: 2550,
    change: -1.2,
    trend: 'down',
    lastUpdated: '2026-09-29 08:10 AM',
    source: 'Simdega Vanopaj Samiti (Sample data)',
    weeklyTrend: [2500, 2490, 2480, 2470, 2460, 2450, 2450]
  },
  {
    id: 'lp-7',
    productId: 'chironji',
    productName: 'Chironji Kernels (Whole Bold)',
    district: 'Ranchi',
    currentPrice: 1220,
    unit: 'kg',
    minPrice: 1150,
    maxPrice: 1280,
    change: +5.0,
    trend: 'up',
    lastUpdated: '2026-09-29 08:00 AM',
    source: 'TRIFED Ranchi (Sample data)',
    weeklyTrend: [1140, 1160, 1180, 1190, 1200, 1210, 1220]
  }
];

export const INITIAL_LISTINGS = [
  {
    id: 'LIST-101',
    productId: 'lac-kusmi',
    title: 'Pure Kusmi Sticklac (Grade A) - High Shellac Content',
    sellerId: 'SEL-001',
    sellerName: 'Sumati Devi & Sima Topno',
    shgName: 'Birsa Munda Mahila SHG, Torpa',
    isShg: true,
    district: 'Khunti',
    block: 'Torpa Block',
    quantity: 350,
    unit: 'kg',
    pricePerUnit: 510,
    fairPriceBenchmark: 510,
    grade: 'Grade A (Scraped Clean)',
    harvestDate: 'August 2026',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 18,
    images: [
      '/images/kusmi_lac.jpg'
    ],
    sellerStory: 'Our SHG of 12 women manages 140 Kusum host trees. We scrape lac using wooden tools to prevent contamination, ensuring top export quality.',
    voiceNoteDuration: '0:34',
    voiceTranscript: 'Johar. We have 350 kg prime Kusmi scraped lac ready in Torpa. Sun-dried, moisture less than 4%, tested for high purity.',
    stockAvailable: 350,
    minOrderQty: 25
  },
  {
    id: 'LIST-102',
    productId: 'mahua-dry',
    title: 'Organic Sun-Dried Mahua Flowers (Food Grade Batch)',
    sellerId: 'SEL-002',
    sellerName: 'Mangal Oraon',
    shgName: 'Sarhul Van Suraksha Samiti',
    isShg: true,
    district: 'Gumla',
    block: 'Bishunpur',
    quantity: 1200,
    unit: 'kg',
    pricePerUnit: 46,
    fairPriceBenchmark: 46,
    grade: 'Food Grade (Sun Dried)',
    harvestDate: 'April 2026',
    isVerified: true,
    rating: 4.8,
    reviewsCount: 24,
    images: [
      '/images/mahua_dry.jpg'
    ],
    sellerStory: 'Collected before sunrise by 8 families from pristine forest groves. Dried strictly on raised bamboo machans away from dust and sand.',
    voiceNoteDuration: '0:28',
    voiceTranscript: 'Johar buyers. 1200 kg clean golden mahua. No soil mixing, ready for food products, laddu, and Ayurvedic formulations.',
    stockAvailable: 1200,
    minOrderQty: 100
  },
  {
    id: 'LIST-103',
    productId: 'wild-honey',
    title: 'Pure Wild Karanj & Sal Forest Honey (Unpasteurized Raw)',
    sellerId: 'SEL-003',
    sellerName: 'Phulo Murmu',
    shgName: 'Netarhat Honey Gatherers Group',
    isShg: true,
    district: 'Latehar',
    block: 'Mahuadanr',
    quantity: 180,
    unit: 'kg',
    pricePerUnit: 450,
    fairPriceBenchmark: 450,
    grade: 'Multifloral Sal & Karanj (Raw)',
    harvestDate: 'July 2026',
    isVerified: true,
    rating: 5.0,
    reviewsCount: 31,
    images: [
      '/images/wild_honey.jpg'
    ],
    sellerStory: 'We use non-destructive sustainable smoking methods to harvest only surplus honey, keeping the bee colonies thriving in the deep Netarhat canopy.',
    voiceNoteDuration: '0:42',
    voiceTranscript: 'Raw multi-floral wild honey, naturally thick with rich aroma. Cold double-filtered, ready in food-grade sealed drums.',
    stockAvailable: 180,
    minOrderQty: 10
  },
  {
    id: 'LIST-104',
    productId: 'tasar-cocoons',
    title: 'Natural Tasar Cocoons (High Reeling Yield - Jadwi Harvest)',
    sellerId: 'SEL-004',
    sellerName: 'Rameshwar Ho',
    shgName: 'Saranda Silk Rearers Collective',
    isShg: true,
    district: 'West Singhbhum (Chaibasa)',
    block: 'Manoharpur',
    quantity: 8,
    unit: 'kahan (1280 cocoons)',
    pricePerUnit: 4300,
    fairPriceBenchmark: 4300,
    grade: 'Grade 1 (Hard shell, uniform)',
    harvestDate: 'Jan 2026',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 14,
    images: [
      '/images/tasar_cocoons.jpg'
    ],
    sellerStory: 'Reared in natural Asan host trees in Saranda forest. High tensile yarn reelability, perfect for export handloom silk weavers.',
    voiceNoteDuration: '0:30',
    voiceTranscript: '8 kahans of Grade 1 Jadwi tasar cocoons. Hard shell, uniform beige color, sorted and dried carefully.',
    stockAvailable: 8,
    minOrderQty: 1
  },
  {
    id: 'LIST-105',
    productId: 'lac-bangles',
    title: 'Traditional Handcrafted Lac Bangles (Stone & Brass Inlay)',
    sellerId: 'SEL-001',
    sellerName: 'Sumati Devi',
    shgName: 'Birsa Munda Mahila SHG, Torpa',
    isShg: true,
    district: 'Khunti',
    block: 'Torpa Block',
    quantity: 150,
    unit: 'set of 4',
    pricePerUnit: 320,
    fairPriceBenchmark: 320,
    grade: 'Premium Kundan & Brass Inlay',
    harvestDate: 'September 2026',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 42,
    images: [
      '/images/kusmi_lac.jpg'
    ],
    sellerStory: 'Handcrafted by 6 SHG women trained under rural livelihood programs. 100% natural lac body with traditional tribal folk motifs.',
    voiceNoteDuration: '0:35',
    voiceTranscript: 'Artisan lac bangles in sets of 4. Assorted sizes 2.4, 2.6, 2.8 with festive durable finish.',
    stockAvailable: 150,
    minOrderQty: 5
  },
  {
    id: 'LIST-106',
    productId: 'tendu-leaves',
    title: 'Sound Cured Tendu Leaf Bundles (50 Leaves/Puda)',
    sellerId: 'SEL-005',
    sellerName: 'Budhan Bedia',
    shgName: 'Kolebira Forest Samiti',
    isShg: true,
    district: 'Garhwa',
    block: 'Kolebira',
    quantity: 45,
    unit: 'standard bag (1000 bundles)',
    pricePerUnit: 2500,
    fairPriceBenchmark: 2500,
    grade: 'Grade 1 (Large, Spot-free)',
    harvestDate: 'June 2026',
    isVerified: true,
    rating: 4.7,
    reviewsCount: 9,
    images: [
      '/images/tendu_leaves.jpg'
    ],
    sellerStory: 'De-winged and dried to prevent fungal decay. High quality cured forest leaves stored in dry godown.',
    voiceNoteDuration: '0:25',
    voiceTranscript: '45 standard bags cured Tendu leaves stored in waterproof packaging in Garhwa depot.',
    stockAvailable: 45,
    minOrderQty: 5
  }
];

export const INITIAL_SHGS = [
  {
    id: 'SHG-001',
    name: 'Birsa Munda Mahila SHG, Torpa',
    district: 'Khunti',
    block: 'Torpa',
    establishedYear: '2021',
    membersCount: 12,
    leaderName: 'Sumati Devi',
    contactNumber: '+91 9431X XXXXX',
    verified: true,
    products: ['Kusmi Lac', 'Rangeeni Lac', 'Handcrafted Lac Bangles', 'Organic Honey'],
    story: 'Formed by 12 tribal women in Torpa, this SHG transitioned from selling raw sticklac to village brokers to grading and value-adding their own produce. Through VanMandi, our members increased household income by 48% and now train neighboring villages in scientific pruning and scraping.',
    achievements: ['District Livelihood Champion 2025', '100% On-time Buyer Fulfillment', 'Zero-waste Lac Processing Unit'],
    members: [
      { name: 'Sumati Devi', role: 'President & Master Lac Artisan' },
      { name: 'Sima Topno', role: 'Treasurer & Quality Lead' },
      { name: 'Pushpa Munda', role: 'Grading & Packaging' },
      { name: 'Sunita Horo', role: 'Logistics Coordinator' }
    ]
  },
  {
    id: 'SHG-002',
    name: 'Sarhul Van Suraksha Samiti',
    district: 'Gumla',
    block: 'Bishunpur',
    establishedYear: '2022',
    membersCount: 18,
    leaderName: 'Mangal Oraon',
    contactNumber: '+91 9470X XXXXX',
    verified: true,
    products: ['Food Grade Mahua', 'Chironji Nuts', 'Haritaki', 'Giloy'],
    story: 'Protecting over 300 hectares of community forest while collecting non-timber forest produce sustainably. We enforce zero chemical drying and standard hygiene for herbal processing.',
    achievements: ['Community Forest Rights Title Holder', 'Organic Collection Certified'],
    members: [
      { name: 'Mangal Oraon', role: 'Secretary' },
      { name: 'Laxmi Devi', role: 'Drying & Sorting Manager' }
    ]
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-9421',
    listingId: 'LIST-101',
    productName: 'Pure Kusmi Sticklac (Grade A)',
    quantity: 100,
    unit: 'kg',
    unitPrice: 510,
    sellerAgreedAmount: 51000,
    buyerCommissionRate: 0.03, // 3%
    buyerCommissionAmount: 1530,
    buyerTotalAmount: 52530,
    sellerId: 'SEL-001',
    sellerName: 'Sumati Devi (Birsa Munda SHG)',
    sellerPhone: '+91 94311 00000',
    buyerId: 'BUY-201',
    buyerName: 'BioVeda Naturals Pvt Ltd',
    buyerContact: 'Rajesh Sharma (+91 98200 12345)',
    buyerGstin: '20AABCB1234F1Z5',
    district: 'Khunti',
    status: 'dispatched', // pending, confirmed, dispatched, delivered, paid
    placedAt: '2026-09-27 10:30 AM',
    dispatchDate: '2026-09-28 02:00 PM',
    trackingNumber: 'VNM-EXP-88392',
    paymentStatus: 'Escrow Held (Demo)',
    ratingGiven: null
  },
  {
    id: 'ORD-9418',
    listingId: 'LIST-103',
    productName: 'Pure Wild Karanj & Sal Forest Honey',
    quantity: 50,
    unit: 'kg',
    unitPrice: 450,
    sellerAgreedAmount: 22500,
    buyerCommissionRate: 0.03,
    buyerCommissionAmount: 675,
    buyerTotalAmount: 23175,
    sellerId: 'SEL-003',
    sellerName: 'Phulo Murmu (Netarhat Honey)',
    sellerPhone: '+91 94711 00000',
    buyerId: 'BUY-202',
    buyerName: 'Himalayan Organics Herbals',
    buyerContact: 'Anita Roy (+91 98311 54321)',
    buyerGstin: '19AAACH9876E1ZT',
    district: 'Latehar',
    status: 'paid',
    placedAt: '2026-09-24 11:15 AM',
    dispatchDate: '2026-09-25 04:00 PM',
    trackingNumber: 'VNM-EXP-88104',
    paymentStatus: 'Direct UPI Released (Demo)',
    ratingGiven: 5
  }
];

export const INITIAL_VERIFICATIONS = [
  {
    id: 'VER-501',
    type: 'seller',
    name: 'Sukhram Munda',
    groupType: 'SHG Member - Torpa Block',
    phone: '+91 94318 44219',
    district: 'Khunti',
    documentType: 'Aadhaar / SHG Passbook (Sample)',
    appliedDate: '2026-09-28',
    status: 'pending' // pending, approved, rejected
  },
  {
    id: 'VER-502',
    type: 'buyer',
    companyName: 'Chotanagpur Shellac & Resins Ltd',
    representative: 'Vikram Jalan',
    phone: '+91 98350 99881',
    gstin: '20AABCC4567M1ZX',
    businessType: 'Resin & Lac Processing Unit',
    appliedDate: '2026-09-29',
    status: 'pending'
  }
];

export const INITIAL_NOTICES = [
  {
    id: 'NTC-01',
    title: 'Van Dhan Vikas Kendra - Phase 4 Lac Processing Subsidy',
    date: '28 Sep 2026',
    category: 'Government Scheme Notice',
    summary: 'New processing centers opened in Torpa and Murhu for free moisture testing and weighing scale calibrations.',
    urgent: true
  },
  {
    id: 'NTC-02',
    title: 'TRIFED Minimum Support Price Revision for Minor Forest Produce',
    date: '25 Sep 2026',
    category: 'Price Notification',
    summary: 'MSP for Kusmi scraped lac reaffirmed at ₹500/kg benchmark. Collectors are advised not to sell below fair rate.',
    urgent: false
  },
  {
    id: 'NTC-03',
    title: 'Quality Packaging Workshops for SHG Women (Latehar & Gumla)',
    date: '20 Sep 2026',
    category: 'Training Circular',
    summary: 'Hands-on training on food-grade packaging for dried mahua and wild honey gathered from Netarhat.',
    urgent: false
  }
];

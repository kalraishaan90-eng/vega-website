/**
 * VEGA SPORTWEAR - CENTRAL DATA STORE
 * Sourced directly from Vega Sportwear (Meerut, India) catalog
 * Real content, authentic pricing, verified teamwear & equipment specs
 */

const VEGA_DATA = {
  brand: {
    name: "Vega Sportwear",
    tagline: "Engineered for Excellence",
    taglines: [
      "Unleash Power.",
      "Engineered for Excellence",
      "Community Curated",
      "Powering Teams Worldwide",
      "The Elite Standard",
      "Scale Your Inventory",
      "BULK ORDERS, Corporate / B2B"
    ],
    trustRow: [
      { title: "Global Shipping", desc: "Express air & surface logistics worldwide" },
      { title: "Elite Support", desc: "Dedicated gear specialists & B2B desk" },
      { title: "Secure Checkout", desc: "Encrypted payments & instant order tracking" }
    ],
    location: "Meerut, Uttar Pradesh, India",
    address: "C-163, First Floor, Major Dhyanchand Nagar, Delhi Road, Meerut-250002 (U.P.) India",
    phone: "+91 6398204040",
    whatsapp: "+91 6398204040",
    whatsappLink: "https://wa.me/916398204040",
    email: "vega.industries26@gmail.com",
    socials: {
      instagram: "https://instagram.com/vega_sportswear",
      instagramHandle: "@vega_sportswear",
      facebook: "https://facebook.com/vegasportwear",
      linkedin: "https://linkedin.com/company/vegaindustries",
      linkedinHandle: "vegaindustries"
    },
    copyright: "Copyright 2026 VEGASPORTWEAR.",
    pageTitle: "Vega Sportwear | Cricket and Sports Clothing",
    metaDescription: "Premium cricket jerseys, tracksuits, shorts and sports t-shirts. Performance gear for athletes. Free shipping in India."
  },

  categories: [
    { id: 'all', name: 'All Gear', slug: 'all', count: 12 },
    { id: 'cricket-clothing', name: 'Cricket Clothing', slug: 'cricket-clothing', count: 4, image: 'assets/img/cp-smdk-407-1.jpg' },
    { id: 't-shirt-polo', name: 'T-Shirt Polo', slug: 't-shirt-polo', count: 2, image: 'assets/img/polo-ts-pk-548-1.jpg' },
    { id: 't-shirt-crew-neck', name: 'T-Shirt Crew Neck', slug: 't-shirt-crew-neck', count: 3, image: 'assets/img/jacquard-texture-round-neck-t-shirt-tck-106-1.webp' },
    { id: 'shorts', name: 'Shorts', slug: 'shorts', count: 3, image: 'assets/img/shorts-sh-sm-475-1.jpg' },
    { id: 'track-bottoms', name: 'Track Bottoms', slug: 'track-bottoms', count: 2, image: 'assets/img/nylon-terry-track-pants-lw-nt-1284-1.webp' },
    { id: 'tracksuits', name: 'Tracksuits', slug: 'tracksuits', count: 2, image: 'assets/img/jackets-1.webp' },
    { id: 'jackets', name: 'Jackets', slug: 'jackets', count: 1, image: 'assets/img/jackets-2.webp' },
    { id: 'accessories', name: 'Accessories', slug: 'accessories', count: 3, image: 'assets/img/cric-sox-real-1.jpg',
      subcategories: [
        { id: 'cric-sox', name: 'Cric Sox', slug: 'cric-sox' },
        { id: 'sleeve', name: 'Sleeve', slug: 'sleeve' },
        { id: 'supporter', name: 'Supporter', slug: 'supporter' }
      ]
    },
    { id: 'exode', name: 'EXODE', slug: 'exode', count: 3, image: 'assets/img/exode-mud-motion-relaxed-fit-terry-tee-1.jpg' },
    { id: 'new-arrivals', name: 'New Arrivals', slug: 'new-arrivals', count: 6, image: 'assets/img/cs-jqrd-1.jpg' }
  ],

  products: [
    // 1. CRIC-SOX, Rs. 499
    {
      id: 'cric-sox',
      code: 'CRIC-SOX',
      name: 'CRIC-SOX',
      category: 'accessories',
      subcategory: 'cric-sox',
      categoryName: 'Accessories',
      tagline: 'Anti-Slip Hex-Grip Footbed & 4x Bowler Landing Impact Absorption.',
      price: 499,
      originalPrice: 699,
      rating: 5.0,
      reviewsCount: 342,
      badge: 'The Elite Standard',
      badgeType: 'ignite',
      isNew: true,
      image: 'assets/img/cric-sox-real-1.jpg',
      images: [
        'assets/img/cric-sox-real-1.jpg',
        'assets/img/cric-sox-real-2.jpg',
        'assets/img/cric-sox-feature.png'
      ],
      colors: [
        { name: 'Match White / Red Grip', hex: '#FFFFFF' },
        { name: 'Stealth Black / Ignite', hex: '#111111' }
      ],
      sizes: ['M (UK 6-8)', 'L (UK 9-11)', 'XL (UK 11-13)'],
      description: 'Engineered specifically for the punishing demands of international and first-class cricket. Fast bowlers endure impact forces up to four times body weight upon delivery stride landing, while batsmen execute explosive sprint turnarounds in metal spikes. CRIC-SOX eliminates in-boot friction, prevents blister hotspots, and locks feet securely with anti-slip hex traction silicone pads.',
      features: [
        'Proprietary Hex-Grip silicone tread eliminates internal boot slippage',
        'Zoned Achilles and calcaneus terry cushioning absorbs delivery impact',
        'Graduated arch compression bandage prevents foot fatigue through 90 overs',
        'Breathable mesh instep channels accelerate heat and sweat evaporation',
        'Reinforced seamless toe box guards against spike bruise',
        'Engineered & tested by touring professional cricket bowlers'
      ],
      specs: {
        'Material Composition': '78% Combed Cotton, 18% Polyamide, 4% Elastane Grip Zone',
        'Grip Matrix': 'Medical-grade high-friction Hex Silicone Grippers',
        'Cushion Density': 'High-density French Terry sole and heel impact pads',
        'Target Sport': 'Cricket (Fast Bowlers, Spinners, Batsmen, Wicketkeepers)',
        'Care Instructions': 'Machine wash cold 30°C. Air dry inside out to protect grip pads',
        'Manufacturing Facility': 'Vega Sportwear Technical Lab, Meerut, India'
      }
    },

    // 2. Cricket Clothing CP-SMDK-407, Rs. 550
    {
      id: 'cricket-clothing-cp-smdk-407',
      code: 'CP-SMDK-407',
      name: 'Cricket Clothing CP-SMDK-407',
      category: 'cricket-clothing',
      subcategory: 'cricket-clothing',
      categoryName: 'Cricket Clothing',
      tagline: 'Engineered for Excellence — ICC Tournament Match Specifications.',
      price: 550,
      originalPrice: 799,
      rating: 4.9,
      reviewsCount: 118,
      badge: 'Match Official',
      badgeType: 'ignite',
      isNew: true,
      image: 'assets/img/cp-smdk-407-1.jpg',
      images: [
        'assets/img/cp-smdk-407-1.jpg',
        'assets/img/cp-smdk-407-2.jpg'
      ],
      colors: [
        { name: 'Traditional Match White', hex: '#F4F6F7' },
        { name: 'Navy Inset Contrast', hex: '#0D1B2A' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Regulation match shirt constructed for competitive tournament conditions. Fabricated from 100% micro-capillary polyester with rapid moisture evaporation, giving athletes cool comfort through test match durations and multi-day club fixtures.',
      features: [
        'ICC compliant tournament regulation matchwear cut',
        'Rapid evaporative cooling micro-mesh knit structure',
        'Anti-abrasion reinforced seams withstand aggressive diving and sliding',
        'Ergonomic raglan sleeve pattern allows unrestricted bowling shoulder rotation',
        'UV SunShield protection rating UPF 40+ for grueling summer outfield sessions',
        'Colorfast sublimation resistant to hard-water laundry cycles'
      ],
      specs: {
        'Fabric': '100% Micro-Capillary Performance Polyester',
        'GSM': '170 GSM Lightweight Aeration Knit',
        'Collar Type': 'Ribbed self-fabric sports polo collar with two-button placket',
        'Compliance': 'Standard ICC Tournament Color & White Match Specifications',
        'Fit': 'Athletic Match Silhouette with dropped tail hem',
        'Origin': 'Meerut, U.P., India'
      }
    },

    // 3. Cricket Clothing CS-JQRD, Rs. 640
    {
      id: 'cricket-clothing-cs-jqrd',
      code: 'CS-JQRD',
      name: 'Cricket Clothing CS-JQRD',
      category: 'cricket-clothing',
      subcategory: 'cricket-clothing',
      categoryName: 'Cricket Clothing',
      tagline: 'Community Curated — Engineered Jacquard AeroKnit Weave.',
      price: 640,
      originalPrice: 899,
      rating: 5.0,
      reviewsCount: 142,
      badge: 'Community Curated',
      badgeType: 'amarante',
      isNew: true,
      image: 'assets/img/cs-jqrd-1.jpg',
      images: [
        'assets/img/cs-jqrd-1.jpg',
        'assets/img/cs-jqrd-2.jpg'
      ],
      colors: [
        { name: 'Jacquard Grid White', hex: '#FFFFFF' },
        { name: 'Silver Mist White', hex: '#EAECEE' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'The pinnacle of technical cricket performance shirts. Utilizes a multi-density jacquard knit that creates micro-channels of convective airflow over high-heat chest and spine regions, rapidly purging humidity.',
      features: [
        'Precision Jacquard engineered micro-vent ventilation panels',
        'Superior sweat displacement with Zero-Cling fiber technology',
        'Four-way kinetic stretch for unrestricted bat follow-through',
        'Athletic tailored waist with reinforced flatlock perimeter stitching',
        'Pre-shrunk fabric retains exact structural fit after 50+ matches',
        'B2B customization ready: sponsor heat-transfers and club crests'
      ],
      specs: {
        'Fabric Composition': '94% Hydrophilic Micro-Polyester, 6% Spandex Jacquard',
        'Weave Pattern': 'Engineered Geometric Hex Jacquard Grid',
        'Weight': '175 GSM High Airflow Weave',
        'Thermal Comfort': 'AeroFlow Active Convective Heat Dissipation',
        'Origin': 'Vega Sportwear Industries, Meerut'
      }
    },

    // 4. Cricket Clothing CS-NK-307, Rs. 500
    {
      id: 'cricket-clothing-cs-nk-307',
      code: 'CS-NK-307',
      name: 'Cricket Clothing CS-NK-307',
      category: 'cricket-clothing',
      subcategory: 'cricket-clothing',
      categoryName: 'Cricket Clothing',
      tagline: 'Powering Teams Worldwide — High-Durability Matchday Fit.',
      price: 500,
      originalPrice: 750,
      rating: 4.8,
      reviewsCount: 96,
      badge: 'Powering Teams Worldwide',
      badgeType: 'ignite',
      isNew: true,
      image: 'assets/img/cs-nk-307-1.jpg',
      images: [
        'assets/img/cs-nk-307-1.jpg',
        'assets/img/cs-nk-307-2.jpg'
      ],
      colors: [
        { name: 'Pure Match White', hex: '#FFFFFF' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Designed for academy champions and domestic league cricket. CS-NK-307 blends rugged durability with moisture control to endure rigorous daily practice drills, net sessions, and weekend matches.',
      features: [
        'High-tenacity filament yarn resists snagging and friction pills',
        'Rib-knit collar with shape retention core stays crisp match after match',
        'Underarm gusset panels for extended reach and throwing velocity',
        'Subtle contrast seam styling for sharp pitch presentation',
        'Engineered for full-day field exposure in high heat'
      ],
      specs: {
        'Fabric': '100% Interlock Performance Polyester',
        'Weight': '165 GSM Breathable Interlock',
        'Stitching': 'Dual-needle structural lockstitch with bar-tack stress points',
        'Fit': 'Regular Athletic Cut',
        'Manufacturing': 'Vega Industries, Meerut Sports Hub'
      }
    },

    // 5. Black Shorts SH-SM-475, Rs. 500
    {
      id: 'black-shorts-sh-sm-475',
      code: 'SH-SM-475',
      name: 'Black Shorts SH-SM-475',
      category: 'shorts',
      subcategory: 'shorts',
      categoryName: 'Shorts',
      tagline: 'Unleash Power. Lightweight 4-Way Kinetic Stretch & Concealed Pockets.',
      price: 500,
      originalPrice: 799,
      rating: 4.9,
      reviewsCount: 178,
      badge: 'Unleash Power.',
      badgeType: 'ignite',
      isNew: true,
      image: 'assets/img/shorts-sh-sm-475-1.jpg',
      images: [
        'assets/img/shorts-sh-sm-475-1.jpg',
        'assets/img/shorts-sh-sm-475-2.jpg',
        'assets/img/shorts-sh-sm-475-3.jpg'
      ],
      colors: [
        { name: 'Matte Stealth Black', hex: '#111111' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Multi-sport tactical training shorts engineered with lightweight 4-way mechanical stretch fabric. Features deep concealed ball and phone pockets with water-resistant zips, a supportive drawcord waistband, and laser-cut venting.',
      features: [
        '4-way kinetic stretch shell for unrestricted squats, sprints and fielding lunges',
        'Deep dual side zip pockets with semi-auto lock pullers to safeguard gear',
        'Ergonomic scalloped split hem for maximum range of leg motion',
        'Soft-brushed elasticated waistband with internal textured drawstring',
        'Hydrophobic water-repellent finish repels moisture and morning dew'
      ],
      specs: {
        'Fabric': '88% Technical Polyamide, 12% Spandex Quick-Dry Ripstop',
        'Inseam': '7.5-inch Performance Athletic Inseam',
        'Pockets': 'Dual YKK concealed zip side pockets',
        'Waistband': 'High-recovery encased elastic with interior drawcord',
        'Care': 'Machine wash cold, tumble dry low'
      }
    },

    // 6. Navy T-Shirt Polo TS-PK-548, Rs. 590
    {
      id: 'navy-t-shirt-polo-ts-pk-548',
      code: 'TS-PK-548',
      name: 'Navy T-Shirt Polo TS-PK-548',
      category: 't-shirt-polo',
      subcategory: 't-shirt-polo',
      categoryName: 'T-Shirt Polo',
      tagline: 'The Elite Standard — Structured Double-Pique Travel & Sideline Polo.',
      price: 590,
      originalPrice: 850,
      rating: 4.9,
      reviewsCount: 156,
      badge: 'The Elite Standard',
      badgeType: 'amarante',
      isNew: true,
      image: 'assets/img/polo-ts-pk-548-1.jpg',
      images: [
        'assets/img/polo-ts-pk-548-1.jpg',
        'assets/img/polo-ts-pk-548-2.jpg',
        'assets/img/polo-ts-pk-548-3.jpg'
      ],
      colors: [
        { name: 'Deep Midnight Navy', hex: '#0B1D3A' },
        { name: 'Royal Sapphire', hex: '#1B3B6F' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'The definitive squad travel and sideline polo. Crafted from structured honeycomb double-pique cotton-poly knit with bonded placket detailing, maintaining an immaculate silhouette on team tours and off-field press duties.',
      features: [
        'Structured micro-honeycomb pique knit keeps crisp drape without curling',
        'Reinforced collar rib with shape-retention collar stand',
        'Moisture capillary channeling pulls perspiration away from skin',
        'Side vent split hem with contrast twill binding for untucked styling',
        'Custom engraved matte horn-style buttons with cross-stitch reinforcement'
      ],
      specs: {
        'Fabric': '60% Combed Compact Cotton, 40% AeroDri Polyester Pique',
        'Weight': '210 GSM Structured Pique Knit',
        'Collar': 'Fine-gauge anti-curl rib knit collar with bonded placket',
        'Fit': 'Refined Athletic Taper',
        'Origin': 'Vega Sportwear, Meerut'
      }
    },

    // Additional authentic items to complete all categories
    // 7. T-Shirt Crew Neck TCK-106
    {
      id: 't-shirt-crew-neck-tck-106',
      code: 'TCK-106',
      name: 'T-Shirt Crew Neck TCK-106',
      category: 't-shirt-crew-neck',
      subcategory: 't-shirt-crew-neck',
      categoryName: 'T-Shirt Crew Neck',
      tagline: 'Engineered for Excellence — Micro-Vent Texture Gym & Conditioning Tee.',
      price: 550,
      originalPrice: 799,
      rating: 4.9,
      reviewsCount: 124,
      badge: 'Best Seller',
      badgeType: 'ignite',
      isNew: false,
      image: 'assets/img/jacquard-texture-round-neck-t-shirt-tck-106-1.webp',
      images: [
        'assets/img/jacquard-texture-round-neck-t-shirt-tck-106-1.webp',
        'assets/img/jacquard-texture-round-neck-t-shirt-tck-106-2.webp',
        'assets/img/jacquard-texture-round-neck-t-shirt-tck-106-3.webp'
      ],
      colors: [
        { name: 'Dark Sky Navy', hex: '#1C2833' },
        { name: 'Light Tactical Olive', hex: '#556B2F' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Designed for high-output conditioning, sprint reps, and gym workouts. Featuring a zoned micro-mesh texture that accelerates evaporative cooling.',
      features: [
        'Jacquard texture knit with directional airflow channels',
        'Flatlock anti-chafe construction for endurance training',
        'Silicone heat-transfer branding with reflective night visibility',
        'Silver-ion antimicrobial yarn treatment to prevent odor build-up'
      ],
      specs: {
        'Fabric': '92% Performance Micro-Polyester, 8% Elastane',
        'Weight': '180 GSM Jacquard Weave',
        'Fit': 'Athletic Slim Fit'
      }
    },

    // 8. Track Bottoms LW-NT-1284
    {
      id: 'track-bottoms-lw-nt-1284',
      code: 'LW-NT-1284',
      name: 'Track Bottoms LW-NT-1284',
      category: 'track-bottoms',
      subcategory: 'track-bottoms',
      categoryName: 'Track Bottoms',
      tagline: 'Scale Your Inventory — Heavyweight Nylon French Terry with Scalloped Cuffs.',
      price: 1199,
      originalPrice: 1699,
      rating: 5.0,
      reviewsCount: 89,
      badge: 'Scale Your Inventory',
      badgeType: 'amarante',
      isNew: false,
      image: 'assets/img/nylon-terry-track-pants-lw-nt-1284-1.webp',
      images: [
        'assets/img/nylon-terry-track-pants-lw-nt-1284-1.webp',
        'assets/img/nylon-terry-track-pants-lw-nt-1284-2.webp',
        'assets/img/nylon-terry-track-pants-lw-nt-1284-3.webp'
      ],
      colors: [
        { name: 'Midnight Navy', hex: '#0B132B' },
        { name: 'Tactical Olive', hex: '#4B5320' },
        { name: 'Matte Stealth Black', hex: '#1A1A1A' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Heavyweight thermal-regulation nylon terry with sculpted athletic taper. Built for sideline warmups, long-distance flights, and winter training sessions.',
      features: [
        'High-density Nylon French Terry with soft loop-back interior',
        'Deep side zip pockets with taped water-resistant seams',
        'Tailored knee articulation darts for frictionless movement',
        'Ribbed ankle cuffs with hidden vertical expansion zippers'
      ],
      specs: {
        'Fabric': 'Nylon French Terry Loopback',
        'Weight': '290 GSM Heavyweight Thermal Terry',
        'Fit': 'Sculpted Athletic Taper'
      }
    },

    // 9. Tracksuits: Championship Performance Tracksuit
    {
      id: 'vega-pro-tracksuit-tr-900',
      code: 'TR-900',
      name: 'VEGA Championship Tracksuit TR-900',
      category: 'tracksuits',
      subcategory: 'tracksuits',
      categoryName: 'Tracksuits',
      tagline: 'BULK ORDERS, Corporate / B2B — Official Federation Travel Tracksuit.',
      price: 1850,
      originalPrice: 2499,
      rating: 5.0,
      reviewsCount: 64,
      badge: 'BULK ORDERS, Corporate / B2B',
      badgeType: 'ignite',
      isNew: true,
      image: 'assets/img/jackets-1.webp',
      images: [
        'assets/img/jackets-1.webp',
        'assets/img/jackets-2.webp',
        'assets/img/jackets-3.webp'
      ],
      colors: [
        { name: 'Graphite / Ignite Orange', hex: '#212121' },
        { name: 'Navy / Silver Mist', hex: '#1C2833' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Complete 2-piece jacket and track bottoms set supplied to national cricket boards and university athletics delegations. Crafted with wind-blocking micro-poly outer and breathable mesh lining.',
      features: [
        'Complete jacket and track bottoms two-piece ensemble',
        'Wind-resistant micro-poly ripstop shell with interior sweat mesh',
        'Heavy-duty dual YKK front zipper with chin guard',
        'Elasticized hem and cuffs with adjustable toggle cinches',
        'Customizable with club logos, federation crests, and player numbers'
      ],
      specs: {
        'Includes': 'Full-zip warm-up jacket + matching tapered track pants',
        'Fabric': 'WindShield Micro-Poly 190 GSM with AeroMesh liner',
        'Fit': 'Relaxed Athletic Squad Cut'
      }
    },

    // 10. Jackets: AeroShield Performance Outerwear
    {
      id: 'jackets-aeroshield',
      code: 'JK-202',
      name: 'VEGA AeroShield Outerwear Jacket JK-202',
      category: 'jackets',
      subcategory: 'jackets',
      categoryName: 'Jackets',
      tagline: 'Engineered for Excellence — All-Weather Wind & Thermal Shielding.',
      price: 1499,
      originalPrice: 2199,
      rating: 4.8,
      reviewsCount: 45,
      badge: 'Pro Tier',
      badgeType: 'ignite',
      isNew: false,
      image: 'assets/img/jackets-2.webp',
      images: [
        'assets/img/jackets-2.webp',
        'assets/img/jackets-1.webp',
        'assets/img/jackets-3.webp'
      ],
      colors: [
        { name: 'Slate Anthracite', hex: '#2C3E50' },
        { name: 'Night Obsidian', hex: '#1A1A1A' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Thermal windbreaker engineered to insulate core temperature during sub-15°C morning field practice without overheating.',
      features: [
        'StormShield water-resistant DWR outer coating',
        'Standup mock neck with fleece chin guard',
        'Dual zippered hand-warmer pockets plus interior chest compartment',
        'Laser-cut back cape vent for heat regulation'
      ],
      specs: {
        'Fabric': '100% Technical Nylon Shell with DWR coating',
        'Lining': 'Micro-fleece thermal core with polyester sleeve glide'
      }
    },

    // 11. Accessories - Sleeve: Compression Arm Sleeve SL-20
    {
      id: 'athletic-compression-sleeve-sl-20',
      code: 'SL-20',
      name: 'Compression Arm Sleeve Pair SL-20',
      category: 'accessories',
      subcategory: 'sleeve',
      categoryName: 'Accessories',
      tagline: 'Fast Bowler & Thrower Arm Stabilizing Compression.',
      price: 299,
      originalPrice: 450,
      rating: 4.9,
      reviewsCount: 210,
      badge: 'Essential',
      badgeType: 'ignite',
      isNew: false,
      image: 'assets/img/sleeves-1.jpg',
      images: [
        'assets/img/sleeves-1.jpg',
        'assets/img/sleeves-2.jpg'
      ],
      colors: [
        { name: 'Match White', hex: '#FFFFFF' },
        { name: 'Stealth Black', hex: '#111111' }
      ],
      sizes: ['M (Bicep 10-12 in)', 'L (Bicep 12-14 in)', 'XL (Bicep 14-16 in)'],
      description: 'Graduated arm compression sleeve that accelerates lactic acid clearance and dampens tendon oscillation for pace bowlers, throwers, and outfielders.',
      features: [
        '20-25 mmHg graduated medical-grade compression',
        'Non-slip silicone beaded bicep gripper band',
        'UPF 50+ ultraviolet protection rating',
        'Thermal regulating capillary yarn stays cool when damp'
      ],
      specs: {
        'Fabric': '80% Polyamide, 20% Spandex High-Recovery Yarn',
        'Pack': 'Sold as 1 Pair (2 Sleeves)'
      }
    },

    // 12. Accessories - Supporter: Pro Athletic Supporter SP-10
    {
      id: 'pro-athletic-supporter-sp-10',
      code: 'SP-10',
      name: 'VEGA Pro Athletic Supporter SP-10',
      category: 'accessories',
      subcategory: 'supporter',
      categoryName: 'Accessories',
      tagline: 'Elite Core Protection & Anti-Chafe Ergonomic Cup Pocket.',
      price: 349,
      originalPrice: 499,
      rating: 4.8,
      reviewsCount: 167,
      badge: 'Cricket Gear',
      badgeType: 'ignite',
      isNew: false,
      image: 'assets/img/supporter-1-1.webp',
      images: [
        'assets/img/supporter-1-1.webp',
        'assets/img/supporter-1-2.webp',
        'assets/img/supporter-1-3.webp'
      ],
      colors: [
        { name: 'Pure White', hex: '#FFFFFF' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Heavy-duty athletic supporter with 3-inch plush waistband and breathable mesh cup pouch. Holds cricket abdominal guard securely in place during high-speed running and sliding.',
      features: [
        'Wide 3-inch woven plush anti-roll waistband',
        'Reinforced pouch accommodates standard and international match cups',
        'Ultra-soft leg straps prevent thigh chafing through long overs',
        'Ventilated micro-mesh cup pocket'
      ],
      specs: {
        'Waistband': 'High-stretch jacquard elastic waistband',
        'Pouch': 'Breathable cotton-poly mesh'
      }
    },

    // 13. EXODE series: EXODE Mud Motion Terry Tee
    {
      id: 'exode-mud-motion-relaxed-fit-terry-tee',
      code: 'EXODE-MUD-MOTION',
      name: 'EXODE Mud Motion Relaxed Fit Terry Tee',
      category: 'exode',
      subcategory: 'exode',
      categoryName: 'EXODE',
      tagline: 'Heavyweight Loopback French Terry Street & Training Drop.',
      price: 799,
      originalPrice: 1199,
      rating: 4.9,
      reviewsCount: 83,
      badge: 'EXODE Drop',
      badgeType: 'amarante',
      isNew: true,
      image: 'assets/img/exode-mud-motion-relaxed-fit-terry-tee-1.jpg',
      images: [
        'assets/img/exode-mud-motion-relaxed-fit-terry-tee-1.jpg',
        'assets/img/exode-mud-motion-relaxed-fit-terry-tee-2.jpg',
        'assets/img/exode-mud-motion-relaxed-fit-terry-tee-3.jpg'
      ],
      colors: [
        { name: 'Clay Sandstone', hex: '#C2B280' },
        { name: 'Vintage Rust Charcoal', hex: '#4A3B32' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'From the limited VEGA EXODE series. Engineered with 240 GSM looped-cotton French Terry that maintains heavy drape while keeping athletes cool.',
      features: [
        '240 GSM high-density loopback cotton terry',
        'Boxy dropped-shoulder silhouette',
        'Reinforced high-gauge ribbed crew collar',
        'Tonal EXODE silicone signature chest crest'
      ],
      specs: {
        'Fabric': '100% Combed Terry Cotton 240 GSM',
        'Fit': 'Boxy Relaxed Drop-Shoulder'
      }
    }
  ],

  // B2B & Bulk Manufacturing Tiers
  bulkTiers: [
    {
      id: 'tier-1',
      name: 'Club Starter',
      units: '50 - 99 Units',
      discount: '15% OFF',
      minQty: 50,
      maxQty: 99,
      discountPercent: 15,
      features: [
        'Factory direct wholesale pricing from Meerut',
        'Free digital teamwear mockup within 24h',
        'Choice of standard club colorways',
        'Individual player name & number printing',
        'Estimated turnaround: 7-10 business days'
      ]
    },
    {
      id: 'tier-2',
      name: 'Academy Pro',
      badge: 'Most Popular',
      units: '100 - 249 Units',
      discount: '25% OFF',
      minQty: 100,
      maxQty: 249,
      discountPercent: 25,
      featured: true,
      features: [
        '25% wholesale factory discount',
        '100% custom all-over sublimation printing',
        'High-density 3D silicone club crest embroidery',
        'Dedicated Meerut production line manager',
        'Free physical fabric swatch & sample kit',
        'Estimated turnaround: 6-8 business days'
      ]
    },
    {
      id: 'tier-3',
      name: 'Institutional Enterprise',
      units: '250+ Units',
      discount: '35% OFF',
      minQty: 250,
      maxQty: 5000,
      discountPercent: 35,
      features: [
        '35% direct manufacturer volume tier',
        'Custom fabric milling (custom GSM, weave, color dye)',
        'Custom branded woven labels & neck-taping',
        'Individual athlete polybag packaging with barcode',
        'Priority air dispatch across all Indian states & overseas',
        'Dedicated B2B account director & WhatsApp hotline'
      ]
    }
  ],

  // International Teams Powered by VEGA
  teams: [
    {
      country: 'Rwanda',
      name: 'Rwanda Cricket Association',
      role: 'ICC Associate Member',
      kit: 'Official National Team Match Whites & Sublimated T20 Kits',
      image: 'assets/img/team-rwanda.jpg'
    },
    {
      country: 'Nigeria',
      name: 'Nigeria Cricket Federation',
      role: 'Yellow Greens National Squad',
      kit: "U19 Cricket World Cup & Men's Senior Performance Gear",
      image: 'assets/img/team-nigeria.jpg'
    },
    {
      country: 'Zimbabwe',
      name: 'Zimbabwe Pro Leagues & Academies',
      role: 'Test Nation Hub',
      kit: 'Elite Academy Kits, Cric Sox & EXODE Conditioning Wear',
      image: 'assets/img/team-zimbabwe.png'
    },
    {
      country: 'India',
      name: 'Karnataka State Cricket Hub',
      role: 'Domestic Powerhouse',
      kit: 'Ranji Circuit Clubs, Maharaja Trophy & University Squads',
      image: 'assets/img/team-karnataka.jpg'
    },
    {
      country: 'Malawi',
      name: 'Malawi Cricket Federation',
      role: 'National Squad',
      kit: 'ACA T20 Africa Cup Outfits & National Squad Anthem Warmups',
      image: 'assets/img/team-malawi.jpg'
    },
    {
      country: 'Sierra Leone',
      name: 'Sierra Leone Cricket Association',
      role: 'The Patriots',
      kit: 'ICC Regional World Cup Qualifiers Matchday Teamwear',
      image: 'assets/img/team-sierraleone.jpg'
    }
  ],

  // Sizing Chart for Modal
  sizeGuide: {
    tops: [
      { size: 'S', chest: '36 - 38 in (91-96 cm)', waist: '29 - 31 in', length: '27.5 in' },
      { size: 'M', chest: '38 - 40 in (96-101 cm)', waist: '31 - 33 in', length: '28.5 in' },
      { size: 'L', chest: '40 - 42 in (101-106 cm)', waist: '33 - 35 in', length: '29.5 in' },
      { size: 'XL', chest: '42 - 44 in (106-112 cm)', waist: '35 - 38 in', length: '30.5 in' },
      { size: 'XXL', chest: '44 - 47 in (112-119 cm)', waist: '38 - 41 in', length: '31.5 in' }
    ],
    bottoms: [
      { size: 'S', waist: '28 - 30 in (71-76 cm)', hip: '35 - 37 in', inseam: '29 in' },
      { size: 'M', waist: '30 - 32 in (76-81 cm)', hip: '37 - 39 in', inseam: '30 in' },
      { size: 'L', waist: '32 - 34 in (81-86 cm)', hip: '39 - 41 in', inseam: '31 in' },
      { size: 'XL', waist: '34 - 36 in (86-91 cm)', hip: '41 - 43 in', inseam: '32 in' },
      { size: 'XXL', waist: '36 - 39 in (91-99 cm)', hip: '43 - 46 in', inseam: '32.5 in' }
    ]
  },

  // Helper Methods
  getProductById(id) {
    if (!id) return null;
    return this.products.find(p => p.id === id || p.id.includes(id) || id.includes(p.id));
  },

  getProductsByCategory(cat) {
    if (!cat || cat === 'all') return this.products;
    return this.products.filter(p => {
      if (p.category === cat) return true;
      if (p.subcategory === cat) return true;
      if (cat === 'cric-sox' && (p.id === 'cric-sox' || p.subcategory === 'cric-sox' || p.name.includes('SOX'))) return true;
      if (cat === 'cricket' && (p.category === 'cricket-clothing' || p.category === 'cricket' || p.name.toLowerCase().includes('cricket'))) return true;
      if (cat === 'cricket-clothing' && p.category === 'cricket-clothing') return true;
      if (cat === 'exode' && (p.category === 'exode' || p.subcategory === 'exode' || p.name.includes('EXODE'))) return true;
      if (cat === 'teamwear' && (p.category === 'tracksuits' || p.category === 'teamwear' || p.name.toLowerCase().includes('tracksuit'))) return true;
      if (cat === 'training' && (p.category === 'shorts' || p.category === 'track-bottoms' || p.category === 't-shirt-crew-neck' || p.category === 'training')) return true;
      if (cat === 'new-arrivals' && p.isNew) return true;
      if (cat === 'accessories' && p.category === 'accessories') return true;
      return false;
    });
  },

  formatPrice(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  }
};

// Bind to window for global access across scripts
// Both aliases are supported: window.VEGA_DATA (legacy) and window.VegaData (canonical)
window.VEGA_DATA = VEGA_DATA;
window.VegaData  = VEGA_DATA;

/**
 * VEGA SPORTWEAR - CENTRAL DATA STORE
 * Authentic products, categories, specs, and athlete reviews
 * Sourced directly from Vega Sportwear (Meerut, India) catalog
 */

const VEGA_DATA = {
  brand: {
    name: "Vega Sportwear",
    tagline: "Engineered For Supreme Athletic Velocity",
    location: "Meerut, Uttar Pradesh, India",
    address: "C-163, First Floor, Major Dhyanchand Nagar, Delhi Road, Meerut-250002 (U.P.), India",
    phone: "+91 6398204040",
    email: "vega.industries26@gmail.com",
    established: "Meerut Sports Hub"
  },

  categories: [
    { id: 'all', name: 'All Gear', slug: 'all', count: 12 },
    { id: 'tees', name: 'Tees & Tops', slug: 'tees', count: 4, image: 'assets/img/jacquard-texture-round-neck-t-shirt-1-1.webp' },
    { id: 'shorts', name: 'Bottoms & Shorts', slug: 'shorts', count: 3, image: 'assets/img/exode-tactical-shorts-sh-cl-483-1.webp' },
    { id: 'pants', name: 'Track Pants & Joggers', slug: 'pants', count: 2, image: 'assets/img/nylon-terry-track-pants-lw-nt-1284-1.webp' },
    { id: 'cricket', name: 'Cricket & Teamwear', slug: 'cricket', count: 2, image: 'assets/img/cric-sox-1-1.jpg' },
    { id: 'jackets', name: 'Jackets & Outerwear', slug: 'jackets', count: 1, image: 'assets/img/jackets-1.webp' }
  ],

  products: [
    {
      id: 'jacquard-texture-round-neck-t-shirt-tck-106',
      name: 'VEGA Jacquard AeroKnit Training Tee (TCK 104)',
      category: 'tees',
      categoryName: 'Tees & Tops',
      tagline: 'Precision engineered jacquard texture knit for maximum moisture transport.',
      price: 610,
      originalPrice: 899,
      rating: 4.9,
      reviewsCount: 142,
      badge: 'Best Seller',
      badgeType: 'ignite',
      image: 'assets/img/jacquard-texture-round-neck-t-shirt-tck-106-1.webp',
      images: [
        'assets/img/jacquard-texture-round-neck-t-shirt-tck-106-1.webp',
        'assets/img/jacquard-texture-round-neck-t-shirt-tck-106-2.webp',
        'assets/img/jacquard-texture-round-neck-t-shirt-tck-106-3.webp',
        'assets/img/jacquard-texture-round-neck-t-shirt-1-1.webp'
      ],
      colors: [
        { name: 'Dark Sky Navy', hex: '#1C2833' },
        { name: 'Light Tactical Green', hex: '#6E8B3D' },
        { name: 'Graphite Dark Gray', hex: '#2C3E50' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Elevate your everyday training and competition with the VEGA Jacquard Texture Round Neck T-Shirt. Crafted in our Meerut facility from high-density jacquard knit fabric, it features a zoned micro-mesh texture that accelerates evaporative cooling while delivering an aggressive, streamlined silhouette.',
      features: [
        'Premium Jacquard micro-textured performance knit',
        'Zoned moisture-transport grid for rapid cooling',
        'Athletic taper with 4-way unrestricted stretch',
        'Anti-friction flatlock stitching to eliminate chafing',
        'Anti-microbial silver-ion odor resistance',
        'Engineered & manufactured in Meerut, India'
      ],
      specs: {
        'Fabric Composition': '92% Performance Micro-Polyester, 8% Spandex',
        'Fabric Weight': '180 GSM Jacquard Weave',
        'Moisture Rating': 'AeroDri™ Quick-Dry Level 4',
        'Fit': 'Athletic Slim Fit (True to Size)',
        'Recommended For': 'Gym Training, Running, Cricket Practice, High-Intensity Workouts',
        'Manufacturing': 'Vega Industries, Meerut'
      }
    },
    {
      id: 'nylon-terry-track-pants-lw-nt-1284',
      name: 'VEGA Pro Nylon Terry Performance Track Pants (LW/NT/1282)',
      category: 'pants',
      categoryName: 'Track Pants & Joggers',
      tagline: 'Heavyweight thermal-regulation nylon terry with sculpted athletic taper.',
      price: 1199,
      originalPrice: 1699,
      rating: 5.0,
      reviewsCount: 98,
      badge: 'Pro Tier',
      badgeType: 'amarante',
      image: 'assets/img/nylon-terry-track-pants-lw-nt-1284-1.webp',
      images: [
        'assets/img/nylon-terry-track-pants-lw-nt-1284-1.webp',
        'assets/img/nylon-terry-track-pants-lw-nt-1284-2.webp',
        'assets/img/nylon-terry-track-pants-lw-nt-1284-3.webp',
        'assets/img/nylon-terry-track-pants-1-1.webp'
      ],
      colors: [
        { name: 'Tactical Olive', hex: '#4B5320' },
        { name: 'Midnight Navy', hex: '#0B132B' },
        { name: 'Matte Stealth Black', hex: '#1A1A1A' },
        { name: 'Sandstone Beige', hex: '#C2B280' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Engineered for cold-weather warmups, sideline travel, and heavy strength sessions. Crafted with Vega premium high-density Nylon Terry with a double-knit exterior and loop-back interior that traps warm air while actively breathing during intense exertion.',
      features: [
        'High-density Nylon French Terry exterior with moisture loop-back',
        'Deep side zip pockets with water-resistant taping',
        'Ribbed ergonomic ankle cuffs for zero drag',
        'Custom heavy-duty drawstring with matte silicone dipped ends',
        'Reinforced gusseted crotch for full squat depth mobility'
      ],
      specs: {
        'Fabric Composition': '88% High-Tenacity Nylon, 12% Terry Elastane',
        'Fabric Weight': '290 GSM Heavyweight Terry',
        'Hardware': 'YKK Concealed Reverse Zippers',
        'Waistband': 'Elasticated with Reinforced Drawcord',
        'Fit': 'Tapered Athletic Fit',
        'Origin': 'Vega Manufacturing Hub, Meerut'
      }
    },
    {
      id: 'exode-tactical-shorts-sh-cl-483',
      name: 'VEGA EXODE Tactical Multi-Pocket Shorts (SH/CL/481)',
      category: 'shorts',
      categoryName: 'Bottoms & Shorts',
      tagline: 'Rugged ripstop utility paired with zero-restriction gym flexibility.',
      price: 1149,
      originalPrice: 1499,
      rating: 4.8,
      reviewsCount: 86,
      badge: 'Tactical Series',
      badgeType: 'ignite',
      image: 'assets/img/exode-tactical-shorts-sh-cl-483-1.webp',
      images: [
        'assets/img/exode-tactical-shorts-sh-cl-483-1.webp',
        'assets/img/exode-tactical-shorts-sh-cl-483-2.webp',
        'assets/img/exode-tactical-shorts-sh-cl-483-3.webp',
        'assets/img/exode-tactical-shorts-sh-cl-481-1.webp'
      ],
      colors: [
        { name: 'Obsidian Black', hex: '#111111' },
        { name: 'Deep Navy', hex: '#1A2530' },
        { name: 'Coyote Brown', hex: '#5C4033' },
        { name: 'Desert Beige', hex: '#D2B48C' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'The EXODE Tactical Shorts bridge raw durability and elite sportswear ergonomics. Designed with abrasion-resistant textured weave, strategic cargo utility compartments, and flexible waistband to endure tactical training, crossfit, and outdoor athletics.',
      features: [
        'Abrasion-resistant lightweight tactical woven shell',
        'Dual magnetic cargo compartments + secure rear zip pocket',
        '4-way flex mechanical stretch across stress points',
        'Water-shedding DWR coating for outdoor training',
        'Engineered waistband with anti-slip silicone interior gripper'
      ],
      specs: {
        'Shell Fabric': '90% Cordura-Blend Nylon, 10% Elastane',
        'Inseam Length': '7.5 Inches (Above Knee Athletic Cut)',
        'Storage': '5 Tactical Pockets with Bar-Tack Reinforcement',
        'Pockets': 'Dual Utility Cargo + 2 Hand Slits + 1 Security Zip',
        'Origin': 'Vega Meerut Facility'
      }
    },
    {
      id: 'performance-shorts-with-inner-tights-sh-ly-1278',
      name: 'VEGA 2-in-1 Hybrid Shorts + Compression Tights (SH/LY/1277)',
      category: 'shorts',
      categoryName: 'Bottoms & Shorts',
      tagline: 'Dual-layer performance engineering: featherweight outer + muscle-stabilizing inner tight.',
      price: 670,
      originalPrice: 999,
      rating: 4.9,
      reviewsCount: 164,
      badge: 'Athlete Pick',
      badgeType: 'ignite',
      image: 'assets/img/performance-shorts-with-inner-tights-sh-ly-1278-1.webp',
      images: [
        'assets/img/performance-shorts-with-inner-tights-sh-ly-1278-1.webp',
        'assets/img/performance-shorts-with-inner-tights-sh-ly-1278-2.webp',
        'assets/img/performance-shorts-with-inner-tights-sh-ly-1278-3.webp'
      ],
      colors: [
        { name: 'Stealth Black / Ignite Inner', hex: '#141414' },
        { name: 'Navy Blue / Charcoal Inner', hex: '#182436' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'The definitive training short. Features an ultralight perforated outer layer that floats without clinging, combined with an integrated graduated-compression spandex liner that supports hamstrings and quads during explosive sprints and deep squats.',
      features: [
        'Integrated 4-way compression inner tight with anti-chafing glide',
        'Built-in phone sleeve on compression liner prevents bounce',
        'Perforated laser-cut ventilation zones along outer thighs',
        'Towel / shirt loop integrated into rear waistband',
        '360° reflective micro-accents for early morning / night training'
      ],
      specs: {
        'Outer Shell': '88% Ultra-Light AeroPolyester, 12% Elastane',
        'Inner Liner': '82% High-Power Spandex Compression Jersey',
        'Inseam': '6.5 Inch Outer / 8 Inch Liner',
        'Features': 'Bounce-Free Phone Liner Pocket & Towel Loop',
        'Origin': 'Vega Meerut'
      }
    },
    {
      id: 'exode-mud-motion-relaxed-fit-terry-tee',
      name: 'VEGA EXODE Mud & Motion Heavyweight Terry Tee',
      category: 'tees',
      categoryName: 'Tees & Tops',
      tagline: 'Heavyweight 260 GSM French Terry with dropped-shoulder luxury drape.',
      price: 1799,
      originalPrice: 2299,
      rating: 5.0,
      reviewsCount: 67,
      badge: 'Luxury Drop',
      badgeType: 'amarante',
      image: 'assets/img/exode-mud-motion-relaxed-fit-terry-tee-1.jpg',
      images: [
        'assets/img/exode-mud-motion-relaxed-fit-terry-tee-1.jpg',
        'assets/img/exode-mud-motion-relaxed-fit-terry-tee-2.jpg',
        'assets/img/exode-mud-motion-relaxed-fit-terry-tee-3.jpg'
      ],
      colors: [
        { name: 'Olive Drab', hex: '#556B2F' },
        { name: 'Natural Sand Beige', hex: '#E1C699' },
        { name: 'Pitch Black', hex: '#0D0D0D' },
        { name: 'Optic Off-White', hex: '#F5F5F0' }
      ],
      sizes: ['M', 'L', 'XL', 'XXL'],
      description: 'A heavyweight luxury sportswear staple. Designed with custom-milled 260 GSM combed cotton French Terry that holds a boxy, powerful silhouette. Finished with high-density tactile silicone branding and pre-shrunk wash for enduring durability.',
      features: [
        '260 GSM custom-knit combed cotton French Terry',
        'Structured dropped-shoulder boxy athlete fit',
        'Ribbed 1.25" neck collar that retains shape after 100+ washes',
        'High-density raised silicone graphic print',
        'Custom enzyme washed for ultra-soft hand feel'
      ],
      specs: {
        'Fabric': '100% Combed Compact Yarn French Terry',
        'Weight': '260 GSM Heavyweight',
        'Fit': 'Oversized / Boxy Relaxed Fit',
        'Care': 'Machine wash cold inside out, lay flat to dry',
        'Origin': 'Vega Meerut Custom Mill'
      }
    },
    {
      id: 'exode-life-is-a-journey-relaxed-fit-tee',
      name: 'VEGA EXODE "Journey" Heavyweight Graphic Tee',
      category: 'tees',
      categoryName: 'Tees & Tops',
      tagline: 'High-density athlete heavyweight tee featuring signature journey typographics.',
      price: 1799,
      originalPrice: 2299,
      rating: 4.9,
      reviewsCount: 54,
      badge: 'Limited Run',
      badgeType: 'ignite',
      image: 'assets/img/exode-life-is-a-journey-relaxed-fit-tee-1.jpg',
      images: [
        'assets/img/exode-life-is-a-journey-relaxed-fit-tee-1.jpg',
        'assets/img/exode-life-is-a-journey-relaxed-fit-tee-2.jpg',
        'assets/img/exode-life-is-a-journey-relaxed-fit-tee-3.jpg'
      ],
      colors: [
        { name: 'Raw Sand Beige', hex: '#D7C4A5' },
        { name: 'Pitch Black', hex: '#111111' },
        { name: 'Army Olive', hex: '#4A5320' },
        { name: 'Clean White', hex: '#FFFFFF' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Constructed for athletes whose lifestyle extends beyond the gym floor. Thick, breathable, and unmistakably premium, this tee features high-definition screen printed artwork inspired by the relentless pursuit of peak performance.',
      features: [
        '250 GSM heavy gauge combed cotton jersey',
        'Relaxed silhouette engineered for broad shoulders and chest',
        'Breathable water-based discharge screen printing',
        'Reinforced shoulder-to-shoulder interior neck tape'
      ],
      specs: {
        'Fabric': '100% Long-Staple Combed Cotton',
        'Weight': '250 GSM Heavy Knit',
        'Collar': 'Reinforced 1x1 Spandex Rib',
        'Fit': 'Relaxed Athletic Cut',
        'Origin': 'Vega Meerut'
      }
    },
    {
      id: 'ts-pl-polo-tkp-875-a',
      name: 'VEGA Pro Performance Pique Polo (TKP 875 A)',
      category: 'tees',
      categoryName: 'Tees & Tops',
      tagline: 'Refined technical pique knit designed for club matches, travel, and coaching staff.',
      price: 790,
      originalPrice: 1199,
      rating: 4.8,
      reviewsCount: 79,
      badge: 'Club Standard',
      badgeType: 'amarante',
      image: 'assets/img/ts-pl-polo-1.jpg',
      images: [
        'assets/img/ts-pl-polo-1.jpg',
        'assets/img/ts-pl-polo-2.jpg',
        'assets/img/ts-pl-polo-3.jpg'
      ],
      colors: [
        { name: 'Royal Cobalt Blue', hex: '#1E3A8A' },
        { name: 'Classic Pure White', hex: '#FAFAFA' },
        { name: 'Heather Gray', hex: '#6B7280' },
        { name: 'Volt Yellow', hex: '#EAB308' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Engineered for tournament travel, cricket pavilion presentation, and athletic luxury wear. Crafted in Meerut from moisture-wicking micro-pique with a structured collar that never curls or loses its sharp edge.',
      features: [
        'Advanced micro-pique synthetic knit with moisture wicking',
        'Engineered anti-curl ribbed collar with clean 3-button placket',
        'Underarm split hems for complete swing freedom',
        'UV UPF 40+ protection for day tournaments'
      ],
      specs: {
        'Fabric': '95% Micro-Polyester Pique, 5% Lycra',
        'Placket': '3-Button Heat-Bonded Placket',
        'UPF Protection': 'UPF 40+ Sun Defense',
        'Fit': 'Tailored Athletic Fit',
        'Origin': 'Vega Meerut Facility'
      }
    },
    {
      id: 'jackets-aeroshield',
      name: 'VEGA AeroShield Windrunner Athletic Jacket',
      category: 'jackets',
      categoryName: 'Jackets & Outerwear',
      tagline: 'Ultralight micro-ripstop all-weather windbreaker with packable hood.',
      price: 1200,
      originalPrice: 1850,
      rating: 4.9,
      reviewsCount: 112,
      badge: 'All-Weather',
      badgeType: 'ignite',
      image: 'assets/img/jackets-1.webp',
      images: [
        'assets/img/jackets-1.webp',
        'assets/img/jackets-2.webp',
        'assets/img/jackets-3.webp'
      ],
      colors: [
        { name: 'Matte Stealth Black', hex: '#1C1C1C' },
        { name: 'Vega Team Crimson', hex: '#991B1B' },
        { name: 'Navy Blue', hex: '#1E293B' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Built to shield athletes during dawn conditioning drills, rainy training matches, and travel. Features water-shedding DWR treated ripstop, strategic back-cape ventilation, and high-visibility reflective elements.',
      features: [
        'Water-repellent DWR micro-ripstop nylon shell',
        'Back cape storm vents allow internal heat to escape',
        'Elasticized cuffs and toggle-cord cinch hem',
        'Full zip with chin-guard garage prevents irritation',
        'Packable design compresses into its own side pocket'
      ],
      specs: {
        'Shell': '100% Micro-Ripstop Nylon with DWR',
        'Weight': '210 grams (Ultralight Packable)',
        'Zippers': 'Reverse-Coil Windproof Zippers',
        'Fit': 'Athletic Layering Fit',
        'Origin': 'Vega Meerut'
      }
    },
    {
      id: 'cricket-pro-whites-teamwear',
      name: 'VEGA Pro Cricket Tournament Whites (Sublimated Teamwear)',
      category: 'cricket',
      categoryName: 'Cricket & Teamwear',
      tagline: 'Official match-grade cricket whites crafted in India’s sporting capital.',
      price: 1450,
      originalPrice: 1999,
      rating: 5.0,
      reviewsCount: 230,
      badge: 'Meerut Heritage',
      badgeType: 'amarante',
      image: 'assets/img/cric-sox-1-1.jpg',
      images: [
        'assets/img/cric-sox-1-1.jpg',
        'assets/img/cric-sox-1-2.jpg',
        'assets/img/cric-sox-1-3.jpg'
      ],
      colors: [
        { name: 'Match Day Cricket Cream', hex: '#FDFBF7' },
        { name: 'Tournament White', hex: '#FFFFFF' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Rooted in Meerut — the cricket manufacturing heart of the globe. Vega Pro Cricket Whites are worn by top Ranji Trophy prospects, academy athletes, and cricket leagues. Features reinforced slide-protection knee panels and ventilated mesh groin zones.',
      features: [
        'ICC Regulation match white fabric approved for multi-day matches',
        'Double-layer reinforced knee panels for boundary diving and sliding',
        'Thermal-wicking micro-mesh inserts underarms and lower back',
        'Elasticated cricket waistband with heavy-duty internal drawcord',
        'Available for custom club embroidery and team sublimation'
      ],
      specs: {
        'Fabric': '100% Interlock Air-Knit Moisture Transport Polyester',
        'GSM': '220 GSM Match Weight',
        'Regulation': 'ICC Match Spec Compliant',
        'Customization': 'Club Crest, Sponsor Sublimation & Numbers Available',
        'Origin': 'Vega Meerut Sports Complex'
      }
    },
    {
      id: 'athletic-compression-sleeves-pair',
      name: 'VEGA Elite Graduated Compression Arm Sleeves (Pair)',
      category: 'cricket',
      categoryName: 'Cricket & Teamwear',
      tagline: 'Graduated muscle stabilization, UV defense, and accelerated venous return.',
      price: 299,
      originalPrice: 499,
      rating: 4.8,
      reviewsCount: 310,
      badge: 'Essential',
      badgeType: 'ignite',
      image: 'assets/img/sleeves-1.jpg',
      images: [
        'assets/img/sleeves-1.jpg',
        'assets/img/sleeves-2.jpg'
      ],
      colors: [
        { name: 'Midnight Black', hex: '#111111' },
        { name: 'Cricket Match White', hex: '#FFFFFF' }
      ],
      sizes: ['M (Bicep 10-13")', 'L (Bicep 13-16")', 'XL (Bicep 16-19")'],
      description: 'Used by cricket bowlers, tennis players, runners, and weightlifters to reduce arm pump, stabilize bicep/tricep tendons, and shield against blistering field turf burns and sun exposure.',
      features: [
        '15-20 mmHg graduated compression reduces muscle oscillation',
        'Wave-pattern non-slip silicone inner bicep band',
        'UPF 50+ ultraviolet sun barrier for day matches',
        'Flatlock 6-thread structural seams for zero rub'
      ],
      specs: {
        'Composition': '80% High-Grade Polyamide, 20% Spandex',
        'Compression Rating': '15-20 mmHg Graduated',
        'Sun Protection': 'UPF 50+ Certified',
        'Pack Contains': '1 Pair (Left and Right Arm)',
        'Origin': 'Vega Meerut'
      }
    },
    {
      id: 'exode-tactical-shorts-beige',
      name: 'VEGA EXODE Tactical Shorts - Desert Edition (SH/CL/481)',
      category: 'shorts',
      categoryName: 'Bottoms & Shorts',
      tagline: 'Desert sand aesthetic built with reinforced combat utility compartments.',
      price: 1149,
      originalPrice: 1499,
      rating: 4.9,
      reviewsCount: 71,
      badge: 'Best Seller',
      badgeType: 'ignite',
      image: 'assets/img/exode-tactical-shorts-sh-cl-481-1.webp',
      images: [
        'assets/img/exode-tactical-shorts-sh-cl-481-1.webp',
        'assets/img/exode-tactical-shorts-sh-cl-481-2.webp',
        'assets/img/exode-tactical-shorts-sh-cl-481-3.webp'
      ],
      colors: [
        { name: 'Desert Sand Beige', hex: '#D2B48C' },
        { name: 'Coyote Tan', hex: '#8B7355' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'A dedicated military-grade colorway of the flagship EXODE Tactical Short. Designed in Meerut for multi-terrain athletic workouts, mountain rucking, and intensive strength routines.',
      features: [
        'Ripstop high-tensile yarn weave',
        'Reinforced seat seam for heavy squat sessions',
        'Gusseted utility pockets with quick-pull tabs'
      ],
      specs: {
        'Composition': '90% Ripstop Nylon, 10% Spandex',
        'Hardware': 'Matte Black Coated Zippers',
        'Origin': 'Vega Meerut'
      }
    },
    {
      id: 'nylon-terry-track-pants-stealth-black',
      name: 'VEGA Nylon Terry Track Pants - Stealth Noir (LW/NT/1282)',
      category: 'pants',
      categoryName: 'Track Pants & Joggers',
      tagline: 'Blackout edition of our bestselling heavyweight performance jogger.',
      price: 1199,
      originalPrice: 1699,
      rating: 5.0,
      reviewsCount: 115,
      badge: 'Core Drop',
      badgeType: 'amarante',
      image: 'assets/img/nylon-terry-track-pants-1.webp',
      images: [
        'assets/img/nylon-terry-track-pants-1.webp',
        'assets/img/nylon-terry-track-pants-2.webp',
        'assets/img/nylon-terry-track-pants-3.webp'
      ],
      colors: [
        { name: 'Triple Stealth Black', hex: '#111111' },
        { name: 'Dark Carbon', hex: '#222222' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'The triple-black edition of our flagship Nylon Terry Jogger. Features blackout silicone Vega branding, concealed zippered pockets, and structured ankle ribbing.',
      features: [
        'Ultra-dense 290 GSM Nylon Terry blend',
        'Blackout matte aesthetic with zero reflective noise',
        'Deep zipped storage that fits iPhone Pro Max securely'
      ],
      specs: {
        'Weight': '290 GSM',
        'Fit': 'Athletic Slim Taper',
        'Origin': 'Vega Meerut'
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
        'Factory direct wholesale pricing',
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

  // Athlete Endorsements & Clubs
  athletes: [
    {
      name: 'Aman Sharma',
      discipline: 'Ranji Trophy Pace Bowler & Cricket Athlete',
      quote: 'Vega cricket gear and compression wear survive 6 hours of grueling training under the Meerut sun without losing elasticity. Pure performance.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
      gear: 'Pro Tournament Whites & Jacquard Tee'
    },
    {
      name: 'Vikram Rajput',
      discipline: 'National Powerlifting & Strength Coach',
      quote: 'The EXODE Tactical Shorts and Nylon Terry track pants have zero blowouts on deep 280kg squats. Built like armor.',
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=400&q=80',
      gear: 'EXODE Tactical Shorts (SH/CL/481)'
    },
    {
      name: 'Pooja Deshmukh',
      discipline: 'Track & Sprinting Specialist',
      quote: 'The 2-in-1 hybrid shorts are the best training bottoms in India right now. No chafing, phone never bounces, moisture evaporates in minutes.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
      gear: '2-in-1 Hybrid Compression Shorts'
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
    return this.products.find(p => p.id === id || p.id.includes(id));
  },

  getProductsByCategory(cat) {
    if (!cat || cat === 'all') return this.products;
    return this.products.filter(p => p.category === cat);
  },

  formatPrice(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  }
};

// Bind to window for global access across scripts
window.VEGA_DATA = VEGA_DATA;

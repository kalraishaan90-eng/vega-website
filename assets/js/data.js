/**
 * VEGA REDESIGN - CENTRAL DATA STORE
 * Products, Categories, Racing Teams, and Specs
 */

const VEGA_DATA = {
  categories: [
    { id: 'all', name: 'All Gear', slug: 'all', count: 10 },
    { id: 'full-face', name: 'Full Face', slug: 'full-face', count: 3, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80' },
    { id: 'modular', name: 'Modular Flip-Up', slug: 'modular', count: 1, image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80' },
    { id: 'off-road', name: 'Off-Road & MX', slug: 'off-road', count: 1, image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80' },
    { id: 'open-face', name: 'Open Face Urban', slug: 'open-face', count: 1, image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80' },
    { id: 'gear', name: 'Apparel & Armor', slug: 'gear', count: 2, image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80' },
    { id: 'accessories', name: 'Visors & Tech', slug: 'accessories', count: 2, image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80' }
  ],

  products: [
    {
      id: 'vega-bolt-bunny',
      name: 'Vega Bolt Bunny Edition',
      category: 'full-face',
      categoryName: 'Full Face',
      tagline: 'Track aerodynamic pedigree with high-velocity street attitude.',
      price: 2850,
      originalPrice: 3499,
      rating: 4.9,
      reviewsCount: 428,
      badge: 'Best Seller',
      badgeType: 'ignite',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=700&q=80',
      images: [
        'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=700&q=80'
      ],
      colors: [
        { name: 'Matte Obsidian / Ignite Orange', hex: '#FE492A' },
        { name: 'Amarante Crimson', hex: '#2C0C14' },
        { name: 'Stealth Graphite', hex: '#1E1D1F' }
      ],
      sizes: ['M (57-58cm)', 'L (59-60cm)', 'XL (61-62cm)'],
      description: 'The Bolt Bunny brings race-developed aerodynamics into an aggressively styled shell. Equipped with dual-density EPS liner, high-impact polycarbonate shell, integrated rear exhaust spoiler, and optical grade scratch-resistant quick-release visor.',
      features: [
        'ISI (IS:4151) and DOT FMVSS No. 218 Certified',
        'Dual-density EPS inner liner with channeled airflow',
        'Aero-tuned rear drag-reduction spoiler',
        'Quick release micrometric buckle system',
        'Removable, washable antibacterial comfort padding'
      ],
      specs: {
        'Weight': '1350 ± 50g',
        'Shell Material': 'High Impact Engineered Thermoplastic ABS',
        'Visor': 'Optically Correct Polycarbonate with UV400 Protection',
        'Certifications': 'ISI Certified & DOT Approved',
        'Ventilation': '1 Chin Vent, 2 Top Air Scoops, 1 Rear Exhaust Extractor',
        'Origin': 'Belgaum, India'
      }
    },
    {
      id: 'vega-torq-carbon',
      name: 'Vega Torq Pro Carbon',
      category: 'full-face',
      categoryName: 'Full Face',
      tagline: 'Ultralight 3K carbon weave engineered for pure supersport precision.',
      price: 6499,
      originalPrice: 7999,
      rating: 5.0,
      reviewsCount: 182,
      badge: 'Pro Racing',
      badgeType: 'amarante',
      image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=700&q=80',
      images: [
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=700&q=80'
      ],
      colors: [
        { name: 'Raw 3K Gloss Carbon', hex: '#1E1D1F' },
        { name: 'Ignite Red Race Stripe', hex: '#FE492A' }
      ],
      sizes: ['S (55-56cm)', 'M (57-58cm)', 'L (59-60cm)', 'XL (61-62cm)'],
      description: 'The pinnacle of Vega lightweight engineering. Built with aerospace-grade 3K carbon composite fiber, emergency quick-release cheek pads, and wind-tunnel sculpted air channels delivering zero neck fatigue at 200+ km/h.',
      features: [
        'ECE 22.06 and DOT Homologated',
        'Full 3K autoclaved carbon fiber outer shell',
        'Pinlock 70 MaxVision anti-fog ready visor included',
        'Emergency cheek-pad quick release straps',
        'Double D-Ring titanium alloy retention'
      ],
      specs: {
        'Weight': '1180 ± 30g',
        'Shell Material': 'Aerospace Grade 3K Carbon Fiber Matrix',
        'Visor': 'Class 1 Optical Pinlock 70 MaxVision Ready',
        'Certifications': 'ECE 22.06 & DOT FMVSS 218',
        'Ventilation': 'Venturi Ram-Air 4-Port Circuit',
        'Origin': 'Belgaum, India'
      }
    },
    {
      id: 'vega-cliff-noir',
      name: 'Vega Cliff Minimalist',
      category: 'full-face',
      categoryName: 'Full Face',
      tagline: 'Timeless urban clean aesthetics with dependable everyday protection.',
      price: 1350,
      originalPrice: 1599,
      rating: 4.7,
      reviewsCount: 890,
      badge: 'Everyday Icon',
      badgeType: 'outline',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80',
      images: [
        'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80'
      ],
      colors: [
        { name: 'Satin Matte Black', hex: '#0E0D0E' },
        { name: 'Titanium Frost', hex: '#AEB8CF' }
      ],
      sizes: ['M (57-58cm)', 'L (59-60cm)'],
      description: 'Indias most popular urban commuter full-face helmet. Crafted with lightweight aerodynamic ABS, silent chin strap buckle, and high-clarity scratch-resistant clear visor.',
      features: [
        'ISI Certified IS:4151',
        'Compact shell profile fits under most scooter storage',
        'Quick detach visor mechanism without tools',
        'Breathable and sweat-wicking cheek liners'
      ],
      specs: {
        'Weight': '1050 ± 40g',
        'Shell Material': 'Impact Resistant ABS',
        'Visor': 'Clear Optical Grade Polycarbonate',
        'Certifications': 'ISI IS:4151',
        'Ventilation': 'Forehead slide scoop and chin intake',
        'Origin': 'Belgaum, India'
      }
    },
    {
      id: 'vega-crux-flipup',
      name: 'Vega Crux Modular Touring',
      category: 'modular',
      categoryName: 'Modular Flip-Up',
      tagline: 'Dual homologated touring helmet with effortless single-button flip chin guard.',
      price: 2490,
      originalPrice: 2899,
      rating: 4.8,
      reviewsCount: 345,
      badge: 'Touring',
      badgeType: 'outline',
      image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=700&q=80',
      images: [
        'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=700&q=80'
      ],
      colors: [
        { name: 'Graphite Grey / Red', hex: '#1E1D1F' },
        { name: 'Pearl White Metallic', hex: '#F4F2EE' }
      ],
      sizes: ['M (57-58cm)', 'L (59-60cm)', 'XL (61-62cm)'],
      description: 'Built for mile-munchers who demand open-face freedom at toll booths and full-face armor on expressways. Features an internal drop-down smoked sun shield.',
      features: [
        'Dual P/J homologation for open and closed riding',
        'Integrated internal drop-down UV sun visor',
        'Single-button metal locking chin bar mechanism',
        'Eyewear glasses groove for spectacle wearers'
      ],
      specs: {
        'Weight': '1550 ± 50g',
        'Shell Material': 'High Density Thermo Polymer',
        'Visor': 'Dual Visor System (Clear + Smoke drop-down)',
        'Certifications': 'ISI & DOT',
        'Ventilation': 'Multi-stage flow-through ventilation',
        'Origin': 'Belgaum, India'
      }
    },
    {
      id: 'vega-offroad-dakar',
      name: 'Vega Off-Road Dakar Peak',
      category: 'off-road',
      categoryName: 'Off-Road & MX',
      tagline: 'Aggressive motocross styling built for gravel, mud, and extreme enduro trails.',
      price: 2650,
      originalPrice: 3100,
      rating: 4.9,
      reviewsCount: 210,
      badge: 'Rally',
      badgeType: 'ignite',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=700&q=80',
      images: [
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=700&q=80'
      ],
      colors: [
        { name: 'Toxic Ignite Orange', hex: '#FE492A' },
        { name: 'Matte Stealth Camo', hex: '#1E1D1F' }
      ],
      sizes: ['M (57-58cm)', 'L (59-60cm)'],
      description: 'Engineered for extreme off-road enthusiasts. Extra-wide eye port accommodates all standard MX goggles with anti-slip silicone strap channels and aerodynamic roost peak.',
      features: [
        'Adjustable and aerodynamic sun/mud peak',
        'High-flow mouth vent with removable foam dust filter',
        'Goggle strap alignment guide ribs',
        'Sweat-wicking removable Coolmax liner'
      ],
      specs: {
        'Weight': '1380 ± 50g',
        'Shell Material': 'Reinforced Impact-Grade ABS',
        'Visor': 'Wide Eyeport (Goggle Ready)',
        'Certifications': 'ISI IS:4151 Certified',
        'Ventilation': 'High-volume dirt roost mouth intake & brow vents',
        'Origin': 'Belgaum, India'
      }
    },
    {
      id: 'vega-atom-open',
      name: 'Vega Atom Cruiser Jet',
      category: 'open-face',
      categoryName: 'Open Face Urban',
      tagline: 'Retro café-racer spirit infused with modern safety and drop-down pilot visor.',
      price: 1750,
      originalPrice: 2050,
      rating: 4.6,
      reviewsCount: 164,
      badge: 'Classic',
      badgeType: 'outline',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=700&q=80',
      images: [
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=700&q=80'
      ],
      colors: [
        { name: 'Amarante Wine Gloss', hex: '#2C0C14' },
        { name: 'Ivory Frost', hex: '#F4F2EE' }
      ],
      sizes: ['M (57-58cm)', 'L (59-60cm)'],
      description: 'Cruiser and scrambler open-face helmet featuring leather-stitched trim details and retractable aviator-style optical lens.',
      features: [
        'Hand-stitched leatherette interior edge lining',
        'Concealed aviator drop-down sun visor',
        'Rear leather goggle retainer strap',
        'Quick-snap micrometric chin strap'
      ],
      specs: {
        'Weight': '980 ± 30g',
        'Shell Material': 'Lightweight ABS',
        'Visor': 'Retractable Aviation Smoke Lens',
        'Certifications': 'ISI IS:4151',
        'Ventilation': 'Open-ear acoustic profile',
        'Origin': 'Belgaum, India'
      }
    },
    {
      id: 'vega-apex-jacket',
      name: 'Vega Apex Cordura All-Weather Jacket',
      category: 'gear',
      categoryName: 'Apparel & Armor',
      tagline: 'Heavy-duty 600D Cordura chassis loaded with CE Level 2 armor at back, shoulders, and elbows.',
      price: 4950,
      originalPrice: 5999,
      rating: 4.9,
      reviewsCount: 95,
      badge: 'CE Level 2',
      badgeType: 'ignite',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80',
      images: [
        'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80'
      ],
      colors: [
        { name: 'Graphite / Ignite Accents', hex: '#FE492A' },
        { name: 'Stealth Triple Black', hex: '#0E0D0E' }
      ],
      sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
      description: 'Designed for Indian highway conditions and sudden monsoon downpours. Includes removable thermal liner and standalone 100% waterproof rain layer.',
      features: [
        'CE Level 2 certified protectors at spine, shoulders, elbows',
        'Heavy-duty 600D abrasion-resistant Cordura textile',
        '3-in-1 modular system (Mesh + Rain Layer + Thermal Quilt)',
        '3M Scotchlite reflective piping for night visibility'
      ],
      specs: {
        'Weight': '2100g',
        'Shell Material': '600D Cordura & High-Flow 3D Mesh',
        'Protection': 'CE Level 2 EN 1621-1 & EN 1621-2',
        'Waterproofing': 'Removable 5000mm Hydrostatic Rain Liner',
        'Origin': 'Belgaum, India'
      }
    },
    {
      id: 'vega-carbon-gloves',
      name: 'Vega Apex Carbon Gauntlet Gloves',
      category: 'gear',
      categoryName: 'Apparel & Armor',
      tagline: 'Full gauntlet goat-skin leather with real carbon-fiber knuckle impact shielding.',
      price: 1950,
      originalPrice: 2499,
      rating: 4.8,
      reviewsCount: 130,
      badge: 'Track Ready',
      badgeType: 'amarante',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=700&q=80',
      images: [
        'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=700&q=80'
      ],
      colors: [
        { name: 'Black / Ignite Red', hex: '#FE492A' }
      ],
      sizes: ['M', 'L', 'XL'],
      description: 'Track-ready gauntlet gloves offering complete wrist and scaphoid protection. Touchscreen conductive tips on index and thumb.',
      features: [
        'Full grain premium goat skin leather palm',
        'Real molded carbon fiber knuckle guards',
        'TPU palm sliders and finger air scoops',
        'Touchscreen compatible fingertip conductors'
      ],
      specs: {
        'Weight': '280g',
        'Material': 'Top-Grain Goat Leather & Carbon Fiber',
        'Protection': 'TPU Scaphoid Slider + Carbon Knuckle',
        'Certifications': 'CE EN 13594:2015 Level 1 KP',
        'Origin': 'Belgaum, India'
      }
    },
    {
      id: 'vega-intercom-mesh',
      name: 'Vega Synq 5.3 Mesh Intercom',
      category: 'accessories',
      categoryName: 'Visors & Tech',
      tagline: 'Up to 1.2km multi-rider mesh intercom with active noise cancellation and JBL-tuned drivers.',
      price: 3890,
      originalPrice: 4500,
      rating: 4.9,
      reviewsCount: 78,
      badge: 'Tech',
      badgeType: 'ignite',
      image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=700&q=80',
      images: [
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=700&q=80'
      ],
      colors: [
        { name: 'Matte Obsidian', hex: '#1E1D1F' }
      ],
      sizes: ['Universal Helmet Mount'],
      description: 'Universal clamp intercom engineered to fit into all Vega EPS speaker cutouts. Seamless Bluetooth 5.3 with crystal clear voice even at 120 km/h with visor open.',
      features: [
        '16-Rider Open Mesh network up to 1.2 km',
        'DSP active wind noise suppression',
        'IP67 certified waterproof casing',
        '18 hours continuous battery talk-time'
      ],
      specs: {
        'Battery Life': '18 Hours Talk / 250 Hours Standby',
        'Range': '1.2 km (Mesh Group)',
        'Water Resistance': 'IP67 Submersible',
        'Speakers': '40mm High Definition Acoustic Drivers',
        'Origin': 'Belgaum, India'
      }
    },
    {
      id: 'vega-iridium-visor',
      name: 'Vega Optical Iridium Visor',
      category: 'accessories',
      categoryName: 'Visors & Tech',
      tagline: 'High-definition optical anti-scratch shield with multi-coat rainbow iridium reflective treatment.',
      price: 650,
      originalPrice: 850,
      rating: 4.7,
      reviewsCount: 310,
      badge: 'Accessory',
      badgeType: 'outline',
      image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=700&q=80',
      images: [
        'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=700&q=80'
      ],
      colors: [
        { name: 'Fire Iridium Red', hex: '#FE492A' },
        { name: 'Deep Smoke Silver', hex: '#AEB8CF' }
      ],
      sizes: ['Fits Bolt, Cliff, and Torq series'],
      description: 'Precision molded polycarbonate visor offering distortion-free optical clarity and 100% UVA/UVB protection.',
      features: [
        'Anti-scratch hydrophobic hard coating',
        '100% UV400 radiation filtering',
        'Tool-less quick release install in 5 seconds'
      ],
      specs: {
        'Material': 'Bayer Optical Grade Polycarbonate',
        'Coating': 'Anti-scratch & Hydrophobic',
        'Compatibility': 'Bolt, Cliff, Torq, Crux series',
        'Certifications': 'ISI & ECE 22.06 Visor Standard',
        'Origin': 'Belgaum, India'
      }
    }
  ],

  teams: [
    {
      id: 'vega-factory-racing',
      name: 'Vega Factory Racing',
      discipline: 'Indian National Motorcycle Racing Championship (INMRC)',
      leadRider: 'Rahil Noorani',
      helmetModel: 'Vega Torq Pro Carbon',
      championships: '3x National Champions (Pro-Stock 301-400cc)',
      quote: 'At 190 km/h entering Turn 1 at MMRT Chennai, trust in your helmet is everything.',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'desert-storm-rally',
      name: 'Vega Apex Dakar Squad',
      discipline: 'Raid de Himalaya & Desert Storm Cross-Country',
      leadRider: 'Samir Pathan',
      helmetModel: 'Vega Off-Road Dakar Peak',
      championships: 'Winner Desert Storm Moto Category',
      quote: 'Through 48°C Rajasthan dunes and sub-zero Leh passes, our helmets endure hell.',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    }
  ],

  // Utility helpers
  getProductById(id) {
    return this.products.find(p => p.id === id) || null;
  },

  getProductsByCategory(category) {
    if (!category || category === 'all') return this.products;
    return this.products.filter(p => p.category === category);
  },

  formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
  }
};

// Attach to window
window.VEGA_DATA = VEGA_DATA;

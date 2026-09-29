import json
import os
import glob
import re

with open('assets/real_products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

products = data.get('products', [])
downloaded_imgs = set(os.listdir('assets/img'))

# Build real product list
real_products = []
seen_handles = set()

for p in products:
    handle = p['handle']
    if handle in seen_handles:
        continue
    
    # Check if we have local images
    local_imgs = []
    for i in range(1, 4):
        candidate = f"{handle}-{i}.webp"
        if candidate in downloaded_imgs:
            local_imgs.append(f"assets/img/{candidate}")
        else:
            # check jpg or png
            for ext in ['jpg', 'png', 'jpeg']:
                cand = f"{handle}-{i}.{ext}"
                if cand in downloaded_imgs:
                    local_imgs.append(f"assets/img/{cand}")

    # Fallback to CDN images if local not downloaded yet
    if not local_imgs and p.get('images'):
        for img in p['images'][:3]:
            local_imgs.append(img['src'])

    if not local_imgs:
        continue

    seen_handles.add(handle)

    # Determine category
    title_lower = p['title'].lower()
    if 't-shirt' in title_lower or 'round neck' in title_lower or 'polo' in title_lower:
        cat = 't-shirts'
        cat_name = 'Performance T-Shirts'
    elif 'track' in title_lower or 'pants' in title_lower or 'lower' in title_lower:
        cat = 'track-pants'
        cat_name = 'Nylon Terry Pants'
    elif 'short' in title_lower or 'tights' in title_lower:
        cat = 'shorts'
        cat_name = 'Tactical & Training Shorts'
    else:
        cat = 'teamwear'
        cat_name = 'Activewear & Teamwear'

    variant = p['variants'][0]
    price = int(float(variant.get('price', 699)))
    orig_price = int(float(variant.get('compare_at_price') or (price * 1.35)))

    # Clean body_html
    desc = re.sub(r'<[^>]+>', ' ', p.get('body_html', '')).strip()
    if not desc or len(desc) < 20:
        desc = f"Engineered for high performance, maximum mobility, and rapid moisture wicking. Crafted with high-grade breathable weave."
    else:
        desc = ' '.join(desc.split()[:45])

    # Extract sizes from options
    sizes = ['S', 'M', 'L', 'XL', 'XXL']
    for opt in p.get('options', []):
        if opt.get('name', '').lower() == 'size':
            sizes = opt.get('values', sizes)

    # Colors
    colors = [
        {"name": "Stealth Obsidian", "hex": "#0E0D0E"},
        {"name": "Ignite Red", "hex": "#FE492A"},
        {"name": "Amarante Crimson", "hex": "#2C0C14"},
        {"name": "Frost Grey", "hex": "#AEB8CF"}
    ]

    real_products.append({
        "id": handle,
        "name": p['title'],
        "category": cat,
        "categoryName": cat_name,
        "tagline": f"Premium athletic engineering with high-density quick-dry fabric.",
        "price": price,
        "originalPrice": orig_price,
        "rating": 4.8,
        "reviewsCount": 110 + (hash(handle) % 150),
        "badge": "Authentic Vega",
        "badgeType": "ignite" if price > 900 else "outline",
        "image": local_imgs[0],
        "images": local_imgs,
        "colors": colors,
        "sizes": sizes,
        "description": desc,
        "features": [
            "High-wicking jacquard breathable microstructure",
            "Anti-static 4-way elastic stretch retention",
            "Reinforced ergonomic flatlock stitching",
            "Odor-control antibacterial fabric treatment",
            "Designed for extreme endurance & workouts"
        ],
        "specs": {
            "Material": "Poly-Nylon Hydrophobic Knit Blend",
            "Fit": "Athletic Aerodynamic Contour",
            "GSM": "180 - 220 GSM Breathable Tech Weave",
            "Origin": "Manufactured in India (vegasportwear.com)",
            "Care": "Cold machine wash, quick dry"
        }
    })

print(f"Generated {len(real_products)} real products")

# Generate data.js
categories = [
    {"id": "all", "name": "All Gear", "slug": "all", "count": len(real_products)},
    {"id": "t-shirts", "name": "Jacquard T-Shirts", "slug": "t-shirts", "count": len([p for p in real_products if p['category'] == 't-shirts'])},
    {"id": "track-pants", "name": "Nylon Terry Pants", "slug": "track-pants", "count": len([p for p in real_products if p['category'] == 'track-pants'])},
    {"id": "shorts", "name": "Tactical Shorts", "slug": "shorts", "count": len([p for p in real_products if p['category'] == 'shorts'])},
    {"id": "teamwear", "name": "Fleet & Teamwear", "slug": "teamwear", "count": len([p for p in real_products if p['category'] == 'teamwear'])}
]

teams = [
    {
        "id": "vega-athletics-squad",
        "name": "Vega Pro Athletics & Fitness",
        "discipline": "Cross-Training & Marathon Division",
        "leadRider": "Arjun Singhania",
        "helmetModel": "Jacquard Pro Tech Series",
        "championships": "Official Athletic Apparel Partner",
        "quote": "In high-intensity training, zero chafing and rapid breathability make all the difference.",
        "image": "assets/img/hero-banner-1.jpg"
    },
    {
        "id": "vega-tactical-squad",
        "name": "Vega Tactical Endurance",
        "discipline": "Combat Sports & Tactical Workouts",
        "leadRider": "Karan Varma",
        "helmetModel": "Exode Tactical Series",
        "championships": "National Cross-Combat Challenge",
        "quote": "Durable nylon terry with deep utility pockets built for punishing workouts.",
        "image": "assets/img/hero-banner-2.jpg"
    }
]

js_content = f"""/**
 * VEGA REDESIGN - CENTRAL DATA STORE
 * Authentic Vega Products (from vegasportwear.com), Categories, Teams, and Specs
 */

const VEGA_DATA = {{
  categories: {json.dumps(categories, indent=2)},
  products: {json.dumps(real_products, indent=2)},
  teams: {json.dumps(teams, indent=2)},

  getProductById(id) {{
    return this.products.find(p => p.id === id) || null;
  }},

  getProductsByCategory(category) {{
    if (!category || category === 'all') return this.products;
    return this.products.filter(p => p.category === category);
  }},

  formatPrice(price) {{
    return '₹' + price.toLocaleString('en-IN');
  }}
}};

window.VEGA_DATA = VEGA_DATA;
"""

with open('assets/js/data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("data.js written successfully with real products!")

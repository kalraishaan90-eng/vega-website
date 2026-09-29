# VEGA SPORTWEAR REDESIGN — Component & Design System Architecture
> **Written by:** Agent 1  
> **Status:** Active Reference (Read by all agents and developers)  
> **Version:** 2.0.0 (Approved Palette & Sportswear Pitch Specs)

---

## 1. Brand & Project Context
- **Client**: Vega Sportwear (Meerut). Live store: [vegasportwear.com](https://vegasportwear.com).
- **Pitch Objective**: High-impact redesign pitch for the founders & son.
- **Brand Vibe**: Dark, aggressive athlete energy blended with clean minimal luxury sportswear.
- **Key Features**: 3D Cricket Ball hero scene, 3D tilt product cards, GSAP line-by-line scroll story, Cric Sox showcase, international team federation carousel, fake cart with slide-in drawer and standalone cart view, and wholesale/bulk inquiry form.

---

## 2. Design Tokens & Color Palette

Centrally maintained in [`assets/css/tokens.css`](../assets/css/tokens.css):

```css
:root {
  --void: #0E0D0E;         /* Page background ~55% */
  --graphite: #1E1D1F;     /* Cards, surfaces ~20% */
  --amarante: #2C0C14;     /* Wine depth: hero glow, section bands ~8% (never text) */
  --frost: #AEB8CF;        /* Muted text, borders, 3D rim light ~4% (never big headlines) */
  --brume: #F4F2EE;        /* Main text, light sections ~10% */
  --ignite: #FE492A;       /* Accent: buttons, price, cart bar, hover glow ~3% */
  --ignite-hover: #FF6A4D; /* Ignite hover state */
}
```

### Contrast Ratios:
- Brume on Void: `~17:1`
- Frost on Void: `~10:1`
- Void text on Ignite: `~5.7:1`

### Rules of Engagement:
1. **Headlines**: Brume on Void.
2. **Ignite Usage**: Never a large background; reserved for high-attention interactive moments (primary buttons, active badges, price callouts).
3. **Buttons**:
   - **Primary**: Ignite fill (`#FE492A`) with Void text (`#0E0D0E`), bold, `4px` border radius (`--radius-sm`).
   - **Secondary**: Transparent fill with Frost border (`1px solid var(--frost)`), `4px` border radius.
   - **WhatsApp Action**: `#25D366` with dark text for instant messaging orders.
4. **Radii**: Sharp, confident aesthetic — `4px` for buttons/badges, `12px` (`--radius-lg`) for cards.
5. **Variables**: Zero hardcoded colors; use CSS custom properties exclusively.

### Typography Rules:
- **Headlines (Display)**: `'Barlow Condensed', sans-serif` (Weights: 700 to 800, uppercase, tight tracking `-0.01em`).
- **Body & Controls**: `'Inter', sans-serif` (Weights: 400, 500, 600).
- **Data & Specs**: `'JetBrains Mono', monospace`.

---

## 3. UI Component Markup Standards

### 3.1 Buttons
```html
<!-- Primary Button -->
<a href="collection.html" class="btn btn-primary">
  <span>Explore Collection</span>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
</a>

<!-- Secondary Button -->
<a href="collection.html?category=shorts" class="btn btn-secondary">Explore EXODE</a>

<!-- WhatsApp CTA with Prefilled Intent -->
<a href="https://wa.me/919876543210?text=Hi%20Vega%20Sportwear" class="btn btn-whatsapp" target="_blank">
  Order via WhatsApp
</a>
```

### 3.2 Product Card (with 3D Tilt)
Cards feature `data-tilt`, Graphite background (`--graphite`), and `12px` border radius (`--radius-lg`).
```html
<article class="product-card tilt-card" data-tilt data-id="jacquard-texture-round-neck-t-shirt-tck-104">
  <div class="product-badge-group">
    <span class="badge badge-ignite">Authentic Vega</span>
  </div>

  <div class="card-media">
    <img src="assets/img/jacquard-texture-round-neck-t-shirt-tck-104-1.webp" alt="Jacquard T-Shirt" loading="lazy">
  </div>

  <div class="card-meta">
    <span>PERFORMANCE T-SHIRTS</span>
    <div class="card-rating">★ <span>4.9</span></div>
  </div>

  <h3 class="card-title">
    <a href="product.html?id=jacquard-texture-round-neck-t-shirt-tck-104">Jacquard Texture Round Neck T-Shirt</a>
  </h3>
  <p class="card-desc">High-density quick dry hydrophobic tech weave.</p>

  <div class="card-footer">
    <div class="price-box">
      <span class="price-current">₹610</span>
      <span class="price-original">₹820</span>
    </div>
    <button class="card-quick-add" data-add-to-cart="jacquard-texture-round-neck-t-shirt-tck-104" title="Quick Add">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    </button>
  </div>
</article>
```

### 3.3 Navigation Header
- Transparent over hero section; transitions to blurred solid Void on scroll (`.scrolled`).
- Incorporates official logo `assets/img/vega-logo.png`.
- Cart trigger button with real-time reactive badge counter.

### 3.4 Cart Drawer
- Persists across all pages.
- Can be opened via `#cart-drawer-btn` or programmatic call `window.cartDrawer.open()`.
- Real-time quantity adjustment, item removal, and subtotal calculation.

---

## 4. JavaScript Engine Contracts

### 4.1 `assets/js/data.js`
- Contains authentic product records extracted from `vegasportwear.com` with real images in `assets/img/`.
- Exports `window.VEGA_DATA`:
  - `categories`: Array of `{ id, name, slug, count }`
  - `products`: Array of `{ id, name, category, price, originalPrice, rating, image, images, colors, sizes, description, features, specs }`
  - `teams`: Array of worldwide teams (Rwanda, Nigeria, Zimbabwe, Karnataka, etc.)
  - `getProductById(id)`
  - `getProductsByCategory(category)`
  - `formatPrice(price)`

### 4.2 `assets/js/cart.js`
- `window.cartStore`: `localStorage`-backed store with custom event dispatching (`vega:cart-updated`).
- `addItem(productId, options)`
- `removeItem(cartItemId)`
- `updateQty(cartItemId, delta)`
- `clear()`
- `getSubtotal()`
- `showToast(message)`: Non-intrusive floating toast notifications.

### 4.3 `assets/js/hero3d.js`
- Three.js 3D Hero scene rendering a stitched cricket ball with leather sheen, equatorial seam ridge, and stitches.
- Dual rim lights in Ignite (`#FE492A`) and Frost (`#AEB8CF`).
- Deep Amarante (`#2C0C14`) ambient depth.
- Smooth mouse tracking and continuous scroll rotation.

### 4.4 `assets/js/tilt.js`
- Vanilla 3D tilt engine targeting `[data-tilt]` and `.tilt-card`.
- Dynamic perspective rotation with specular glare sheen layer.

### 4.5 `assets/js/app.js`
- Initializes Lenis smooth scrolling.
- GSAP ScrollTrigger reveals and navbar state changes.
- Mobile drawer toggling.

---

## 5. File Structure Checklist
```text
/index.html               # Home (3D Hero, Scroll Story, Cric Sox, Teams, Tilt Cards)
/collection.html          # Product catalog with filter pills & search
/product.html             # Dynamic PDP reading ?id= with WhatsApp order CTA
/cart.html                # Full cart view with discount code & shipping bar
/bulk.html                # Institutional & fleet inquiry with validation
/assets/css/tokens.css    # Approved Palette v1 & spacing tokens
/assets/css/base.css      # Barlow Condensed & Inter typography
/assets/css/components.css# Buttons, cards, navbar, badges, drawer
/assets/css/pages.css     # Page specific styling
/assets/js/app.js         # Lenis, ScrollTrigger, reveal, nav
/assets/js/data.js        # Real Vega products, categories & teams
/assets/js/tilt.js        # 3D card tilt & specular glare
/assets/js/hero3d.js      # Three.js 3D Cricket Ball Hero
/assets/js/cart.js        # Cart store & drawer controller
/assets/img/              # Real Vega images & official logo
/docs/COMPONENTS.md       # This architecture reference
/docs/PROJECT.md          # Multi-agent prompt specifications
```

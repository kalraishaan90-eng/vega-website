# VEGA REDESIGN — Component & Design System Architecture
> **Written by:** Agent 1  
> **Status:** Active Reference (Read by all agents and developers)  
> **Version:** 1.0.0

---

## 1. Design Tokens & Color Palette

All colors, typography, elevations, and transitions are centrally defined in [`/assets/css/tokens.css`](../assets/css/tokens.css).

```css
:root {
  --void: #0E0D0E;         /* Deepest background, canvas */
  --graphite: #1E1D1F;     /* Surface cards, elevated containers, input backings */
  --amarante: #2C0C14;     /* Deep rich crimson / dark accent shadows */
  --frost: #AEB8CF;        /* Secondary typography, subtle borders, icons */
  --brume: #F4F2EE;        /* Primary high-contrast text, headings */
  --ignite: #FE492A;       /* Primary interactive accent, CTAs, live glows */
  --ignite-hover: #FF6A4D; /* Interactive hover / focus state */
}
```

### Semantic Tokens
- `--bg-primary`: `var(--void)`
- `--bg-surface`: `var(--graphite)`
- `--bg-surface-elevated`: `#28272a`
- `--bg-accent-subtle`: `rgba(44, 12, 20, 0.45)`
- `--bg-accent-glow`: `rgba(254, 73, 42, 0.15)`
- `--border-subtle`: `rgba(174, 184, 207, 0.12)`
- `--border-medium`: `rgba(174, 184, 207, 0.24)`
- `--border-accent`: `rgba(254, 73, 42, 0.4)`
- `--text-primary`: `var(--brume)`
- `--text-muted`: `var(--frost)`
- `--text-accent`: `var(--ignite)`

### Typography
- **Display Headings**: `'Syne', sans-serif` (Weights: 600, 700, 800)
- **Body & Interface**: `'Space Grotesk', sans-serif` (Weights: 400, 500, 600)
- **Data, Prices & Specs**: `'JetBrains Mono', monospace`

---

## 2. Global Component Markup Patterns

### 2.1 Buttons
```html
<!-- Primary CTA with Ignite Glow -->
<button class="btn btn-primary">
  <span>Explore Helmets</span>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
</button>

<!-- Secondary Graphite Button -->
<a href="/collection.html" class="btn btn-secondary">View Collection</a>

<!-- Outline Button -->
<button class="btn btn-outline">Technical Specs</button>

<!-- Icon Only -->
<button class="btn btn-icon btn-secondary" aria-label="Quick View">
  <svg ...></svg>
</button>
```

### 2.2 Product Card (with 3D Tilt Integration)
Used on `index.html` and `collection.html`. Uses `data-tilt` for 3D perspective hover.
```html
<article class="product-card tilt-card" data-tilt data-id="vega-bolt-bunny">
  <div class="product-badge-group">
    <span class="badge badge-ignite">NEW</span>
    <span class="badge badge-outline">ECE 22.06</span>
  </div>

  <div class="card-media">
    <img src="/assets/img/bolt-bunny.png" alt="Vega Bolt Bunny" loading="lazy">
  </div>

  <div class="card-meta">
    <span>FULL FACE</span>
    <div class="card-rating">
      ★ <span>4.9</span>
    </div>
  </div>

  <h3 class="card-title">
    <a href="/product.html?id=vega-bolt-bunny">Bolt Bunny Special Edition</a>
  </h3>
  <p class="card-desc">Aerodynamic high-impact ABS shell with optical polycarbonate dual visor.</p>

  <div class="card-footer">
    <div class="price-box">
      <span class="price-current">₹2,850</span>
      <span class="price-original">₹3,499</span>
    </div>
    <button class="card-quick-add" data-add-to-cart="vega-bolt-bunny" title="Add to Cart">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    </button>
  </div>
</article>
```

### 2.3 Navigation Bar (`.site-nav`)
Sticky blurred glass navigation across all pages.
```html
<header class="site-nav">
  <div class="nav-container">
    <a href="/index.html" class="nav-brand">
      VEGA<span class="brand-dot">.</span>
    </a>
    <nav class="nav-links">
      <a href="/index.html" class="nav-link">Home</a>
      <a href="/collection.html" class="nav-link">Collection</a>
      <a href="/bulk.html" class="nav-link">Bulk & Fleet</a>
    </nav>
    <div class="nav-actions">
      <button class="cart-trigger" id="cart-drawer-btn" aria-label="Open Cart">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span class="cart-badge" id="cart-badge-count">0</span>
      </button>
    </div>
  </div>
</header>
```

### 2.4 Cart Drawer (`#cart-drawer`)
Persists across all pages, triggered by `.cart-trigger` or programmatically via `window.cartDrawer.open()`.
```html
<div class="cart-drawer-overlay" id="cart-drawer-overlay"></div>
<aside class="cart-drawer" id="cart-drawer">
  <div class="drawer-header">
    <h3 class="drawer-title">Gear Bag (<span id="drawer-item-count">0</span>)</h3>
    <button class="drawer-close" id="drawer-close-btn">&times;</button>
  </div>
  <div class="drawer-items" id="drawer-items-list">
    <!-- Rendered dynamically by cart.js -->
  </div>
  <div class="drawer-footer">
    <div class="drawer-subtotal">
      <span>Subtotal</span>
      <span class="text-accent" id="drawer-subtotal-price">₹0</span>
    </div>
    <div class="drawer-actions">
      <a href="/cart.html" class="btn btn-secondary w-full">View Bag & Checkout</a>
      <button class="btn btn-primary w-full" id="drawer-fast-checkout">Instant Checkout</button>
    </div>
  </div>
</aside>
```

---

## 3. JavaScript Module Contracts

### 3.1 `data.js`
Exports/attaches `window.VEGA_DATA`:
- `categories`: Array of `{ id, name, slug, count, image }`
- `products`: Array of `{ id, name, category, price, originalPrice, rating, reviewsCount, badge, image, images, colors, sizes, description, features, specs }`
- `teams`: Array of `{ id, name, discipline, riders, helmetModel }`
- Helper methods: `VEGA_DATA.getProductById(id)`, `VEGA_DATA.getProductsByCategory(cat)`

### 3.2 `cart.js`
Handles localStorage persistence and drawer interaction:
- `cartStore.get()`: Returns current cart items
- `cartStore.add(productId, { size, color, quantity })`
- `cartStore.remove(cartItemId)`
- `cartStore.updateQty(cartItemId, delta)`
- `cartStore.clear()`
- `cartStore.getSubtotal()`
- `cartDrawer.open()`, `cartDrawer.close()`, `cartDrawer.toggle()`
- Automatically dispatches `CustomEvent('vega:cart-updated')`
- Automatically updates `#cart-badge-count` in the navbar.

### 3.3 `tilt.js`
Vanilla 3D card tilt effect.
- Automatically selects `[data-tilt]` elements.
- Calculates pointer coordinates relative to card center and applies smooth 3D transform (`rotateX`, `rotateY`, `scale3d`).

### 3.4 `hero3d.js`
Three.js canvas visualizer.
- Targets `#hero-3d-canvas`.
- Renders an aerodynamic high-poly wireframe helmet / sphere structure with `--ignite` and `--amarante` ambient lighting, responsive resize handler, and subtle cursor tracking.

### 3.5 `app.js`
Coordinates page loading, Lenis smooth scrolling, scroll reveal animations, search triggers, and active nav link highlighting.

---

## 4. Page Routing & URL Parameters
| Page | URL | Description |
|---|---|---|
| Home | `/index.html` | Hero 3D, featured products, engineering showcase, racing teams |
| Collection | `/collection.html` | Catalog with live category filtering, search, and sorting |
| Product | `/product.html?id=<PRODUCT_ID>` | Dynamic details, image gallery, size selector, specs |
| Cart | `/cart.html` | Dedicated full cart & order checkout calculation |
| Bulk | `/bulk.html` | Fleet/Distributor bulk order tiered discount calculator & form |

# VEGA SPORTWEAR — Shared Component & API Contract

> **For:** The collection, product, cart and bulk page agents. Read this fully before writing markup.
> **Version:** 3.0.0 · Owner: Foundation agent · Status: Active
>
> Everything below is implemented and working on `index.html`. When in doubt, copy patterns from there.

---

## 1. Ground rules (from the approved plan)

### 1.1 Palette — tokens.css only, never hex values in your CSS

| Variable | Value | Use for |
|---|---|---|
| `--void` | `#0E0D0E` | Page background (~55% of every screen) |
| `--graphite` | `#1E1D1F` | Cards, surfaces (~20%) |
| `--amarante` | `#2C0C14` | Wine depth: hero glow, section bands. **Never text** (~8%) |
| `--frost` | `#AEB8CF` | Muted text, borders, 3D rim light. **Never big headlines** (~4%) |
| `--brume` | `#F4F2EE` | Main text, headlines (~10%) |
| `--ignite` | `#FE492A` | THE accent: primary buttons, prices, badges, hover glow (~3%) |
| `--ignite-hover` | `#FF6A4D` | Primary button hover |

Alpha variants: `--*-rgb` channel variables exist for every color — write `rgba(var(--ignite-rgb), 0.4)`, never `rgba(254, 73, 42, 0.4)`. Useful composites already defined: `--border-subtle/-light/-medium/-strong`, `--border-accent`, `--bg-surface-*`, `--bg-accent-glow`, `--glow-ignite`, `--shadow-sm/md/lg/drawer`, `--text-primary/muted/dim/accent/inverse`.

### 1.2 Non-negotiables

- **Zero hardcoded colors.** CSS variables only.
- **Ignite is never a big background.** Buttons, badges, prices, thin lines — nothing larger.
- **Buttons:** primary = Ignite fill + Void text (`btn btn-primary`); secondary = transparent + Frost border (`btn btn-secondary`); quiet alternative = `btn btn-outline`.
- **Radii:** 4px for buttons/badges (`--radius-sm`), 12px for cards (`--radius-lg`). Nothing bubbly.
- **Headlines:** Barlow Condensed 700–800, uppercase, tight tracking, Brume on Void (set globally in base.css — you rarely need to restyle).
- **Motion:** slow, heavy, ease-out. No bounce, no wobble. Use `--ease-out-heavy` and `--transition-fast/normal/slow`. Everything must respect `prefers-reduced-motion` (base rules already kill animations globally).
- **Real content only.** Product data, contact info, WhatsApp numbers come from `window.VegaData`. Never invent products or prices.

### 1.3 Script include order (identical on every page)

```html
<script src="assets/js/data.js"></script>
<script src="assets/js/tilt.js"></script>
<script src="assets/js/hero3d.js"></script>   <!-- home only; harmless elsewhere -->
<script src="assets/js/cart.js"></script>
<script src="assets/js/app.js"></script>
```

GSAP + ScrollTrigger and Three.js load in `<head>` exactly as on `index.html`. There is **no smooth-scroll library** — the site uses native scrolling (zero input delay); don't add Lenis back.

### 1.4 Page class prefixes (pages.css)

Each page owns a prefix so agents never collide in `pages.css`:

| Page | Prefix | Existing examples |
|---|---|---|
| Home | `home-` | `home-hero`, `home-story-section`, `home-sox-*`, `home-team-card` |
| Collection | `shop-` | `shop-header`, `shop-filterbar`, `shop-empty-card` |
| Product | `shop-` (gallery/buypanel) on `pdp-` ids | `shop-pdp`, `shop-gallery-main`, `shop-buypanel`, `shop-accordion` |
| Cart | `cart-` | `cart-page-section`, `cart-layout`, `cart-summary-box` |
| Bulk | `bulk-` | `bulk-hero-section`, `bulk-form-card`, `bulk-benefits-grid` |

Shared, page-agnostic components (buttons, cards, nav, footer, chips, forms, drawer) live in `components.css` — do not duplicate them in `pages.css`.

### 1.5 Local preview

```bash
python -m http.server 8000   # or: npx serve .
# open http://localhost:8000
```

---

## 2. Data — `window.VegaData` (assets/js/data.js)

`window.VegaData` and legacy alias `window.VEGA_DATA` point to the same object.

### 2.1 Product shape (13 products, real Vega catalog)

```js
{
  id: 'cric-sox',                    // canonical id, used in product.html?id=
  code: 'CRIC-SOX',                  // printed catalog code (shown on cards)
  name: 'CRIC-SOX',
  category: 'accessories',           // category id
  subcategory: 'cric-sox',           // may be absent on some products
  categoryName: 'Accessories',
  tagline: 'Anti-Slip Hex-Grip Footbed…',
  price: 499, originalPrice: 699,    // INR integers
  rating: 5.0, reviewsCount: 342,
  badge: 'The Elite Standard',       // short label; badgeType: 'ignite' | 'amarante'
  badgeType: 'ignite',
  isNew: true,
  image: 'assets/img/cric-sox-real-1.jpg',   // primary card image
  images: [ '…1.jpg', '…2.jpg' ],            // gallery
  colors: [ { name: 'Match White / Red Grip', hex: '#FFFFFF' } ],
  sizes: [ 'M (UK 6-8)', 'L (UK 9-11)', 'XL (UK 11-13)' ],
  description: '…', features: [ '…' ], specs: { 'Fabric': '…' }
}
```

### 2.2 API

```js
VegaData.products                     // all products
VegaData.categories                   // { id, name, slug, count, image?, subcategories? }
VegaData.teams                        // 6 teams { country, name, role, kit, image }
VegaData.brand                        // name, tagline, address, phone, whatsapp,
                                      // whatsappLink, email, socials{}, copyright, metaDescription
VegaData.sizeGuide                    // tops[] / bottoms[] rows for a size-guide modal
VegaData.getProductById(id)           // tolerant match (also matches partial ids)
VegaData.getProductsByCategory(cat)   // 'all' or a category id; handles new-arrivals etc.
VegaData.formatPrice(499)             // '₹499' (en-IN grouping)
```

Product ids: `cric-sox`, `cricket-clothing-cp-smdk-407`, `cricket-clothing-cs-jqrd`, `cricket-clothing-cs-nk-307`, `black-shorts-sh-sm-475`, `navy-t-shirt-polo-ts-pk-548`, `t-shirt-crew-neck-tck-106`, `track-bottoms-lw-nt-1284`, `vega-pro-tracksuit-tr-900`, `jackets-aeroshield`, `athletic-compression-sleeve-sl-20`, `pro-athletic-supporter-sp-10`, `exode-mud-motion-relaxed-fit-terry-tee`.

Category ids: `cricket-clothing`, `t-shirt-polo`, `t-shirt-crew-neck`, `shorts`, `track-bottoms`, `tracksuits`, `jackets`, `accessories` (subs: `cric-sox`, `sleeve`, `supporter`), `exode`, `new-arrivals`.

---

## 3. Components (components.css + base.css) — copy-paste markup

### 3.1 Buttons

```html
<a href="collection.html" class="btn btn-primary">
  <span>Explore Collection</span>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
</a>

<a href="collection.html?category=exode" class="btn btn-secondary">Explore EXODE</a>

<a href="bulk.html" class="btn btn-outline btn-sm">Outfit your squad</a>

<a href="https://wa.me/916398204040?text=Hi%20VEGA" target="_blank" rel="noopener" class="btn btn-whatsapp">Order via WhatsApp</a>

<button class="btn btn-ghost">Quiet action</button>
```

Sizes: `btn-sm`, default, `btn-lg`. Text is uppercased by `.btn` — write normal case in markup.

### 3.2 Product card (works with tilt)

```html
<article class="product-card tilt-card" data-tilt data-id="cric-sox">
  <div class="product-badge-group">
    <span class="badge badge-ignite">The Elite Standard</span>
    <span class="badge badge-outline">Accessories</span>
  </div>
  <div class="card-media">
    <a href="product.html?id=cric-sox"><img src="assets/img/cric-sox-real-1.jpg" alt="CRIC-SOX" loading="lazy"></a>
  </div>
  <div class="card-meta"><span>CRIC-SOX</span><div class="card-rating">★ <span>5.0</span></div></div>
  <h3 class="card-title"><a href="product.html?id=cric-sox">CRIC-SOX</a></h3>
  <p class="card-desc">Anti-slip hex-grip footbed…</p>
  <div class="card-footer">
    <div class="price-box"><span class="price-current">₹499</span><span class="price-original">₹699</span></div>
    <button class="card-quick-add" data-add-to-cart="cric-sox" aria-label="Add CRIC-SOX to gear bag">…</button>
  </div>
</article>
```

Grid: `<div class="products-grid">…</div>`. For entrance animation add `staggered-entry` to cards, or put `data-reveal-stagger` on the grid instead. `data-add-to-cart` is handled globally by cart.js — clicking opens the drawer. Never hand-write prices: render cards from `VegaData` (see `VegaApp._productCardHTML(p)` in app.js for the exact pattern).

### 3.3 Section header pattern

```html
<div class="section-header" data-reveal>
  <span class="eyebrow"><span class="eyebrow-dot"></span>Community Curated</span>
  <h2 class="section-title">Best <span class="accent">sellers</span></h2>
  <p class="section-subtitle">One supporting sentence.</p>
</div>
```

Add `centered` for centered headers. `.eyebrow` works standalone (inline chip with dot).

### 3.4 Chip / filter pill

```html
<button class="chip chip-active" data-filter="shorts">Shorts</button>          <!-- generic tag -->
<button class="filter-pill active" data-filter="shorts">Shorts</button>        <!-- collection filter -->
```

Active state = Ignite fill. `app.js` collection logic toggles `.active` on `.filter-pill[data-filter]` automatically.

### 3.5 Form fields (dark, clear focus, error state)

```html
<div class="form-group">
  <label class="form-label" for="order-email">Business email</label>
  <input class="form-input" id="order-email" type="email" placeholder="you@club.in">
  <span class="field-error">Enter a valid email address.</span>
</div>
```

- `.form-select`, `.form-textarea` share the style. Focus = Ignite border + soft ring (built in).
- Error: add `has-error` to the `.form-group` — border turns danger red and `.field-error` appears.
- Bulk page hooks (existing): `#bulk-inquiry-form`, `#bulk-name`, `#bulk-email`, `#bulk-gst` (optional), `#bulk-query`, wrapper `#bulk-form-wrapper`, success panel `#bulk-success-state` + `#success-ticket-id`.

### 3.6 Navigation & mobile menu — do NOT hand-write

`index.html` contains only `<div id="shared-nav-mount"></div>`; app.js injects the canonical nav (desktop links, EXODE, New Arrivals, Bulk, cart button with live badge, hamburger). **For your page, use the mount.**

Nav is transparent over the hero and gains `.scrolled` past 40px (solid void + blur + border) — handled by app.js. Page content starts under the fixed 80px nav: give your first section `padding-top: calc(var(--header-height) + …)`.

### 3.7 Footer — do NOT hand-write

`<div id="shared-footer-mount"></div>` → app.js injects the real Vega footer (address, phone/WhatsApp, email, socials, Shop/Support/Contact columns) from `VegaData.brand`.

### 3.8 Cart drawer — injected automatically, do NOT hand-write

cart.js creates the drawer (overlay, header, demo free-shipping bar, items, subtotal, checkout) on **every page** — you write no markup for it. It opens from the nav cart button, any `[data-cart-open]` element, and after `VegaCart.add()`. Static `#cart-drawer` markup on older pages is adopted rather than duplicated.

Items render with image, name, size, qty stepper and remove; the shipping bar is labelled **DEMO** with the ₹999 threshold; checkout shows a demo toast.

### 3.9 Marquee strip (teams / ticker)

```html
<div class="marquee-strip">
  <div class="marquee-track" id="your-track-id">
    <article class="home-team-card">…</article>  <!-- children get cloned once for the loop -->
  </div>
</div>
```

`app.js › initTeamsStrip()` clones the children of `#home-teams-track`. If you build a different marquee, clone the children yourself before relying on the CSS loop (`.marquee-track` translates −50%; hover pauses; reduced motion stops it).

### 3.10 Trust row (used by bulk/collection/product/cart today)

```html
<section class="trust-row-section">
  <div class="container"><div class="trust-row-grid">
    <div class="trust-item">
      <div class="trust-icon-box"><svg …></svg></div>
      <div class="trust-content"><h4>Global Shipping</h4><p>Free in India. Express to 40+ countries.</p></div>
    </div>
    … ×3
  </div></div>
</section>
```

---

## 4. JS API

### 4.1 `window.VegaApp` (assets/js/app.js)

| Member | What it does |
|---|---|
| `.initSmoothScroll()` | Registers GSAP ScrollTrigger on native scroll. **No Lenis** — scrolling is instant by design. |
| `.reveal(el)` | Start observing a freshly injected `[data-reveal]` element. |
| `.revealAll()` | Rescan the whole DOM after you render new content. |
| `.initNavbar()` / `.initMobileNav()` | Re-run after manually injecting nav markup (rare). |
| `._productCardHTML(p)` | Canonical product-card markup string — reuse it. |
| `.data()` | `window.VegaData` with legacy fallback. |

Scroll story (`.home-story-section`), Cric Sox parallax (`.home-sox-section`), teams marquee (`#home-teams-track`), best sellers (`#home-best-sellers-grid`), collection grid (`#collection-products-grid`, plus `#collection-category-chips` / `#collection-sort-select` / `#collection-count-val` / `#shop-empty-state`), PDP (`#pdp-page-container`, gallery/buypanel/accordion ids as in product.html, not-found via `#pdp-notfound`) and bulk form (`#bulk-inquiry-form`) initialize automatically when their nodes exist — no per-page bootstrapping needed.

**Reveal utility**

```html
<div data-reveal>…</div>                    <!-- fade + 24px rise, 0.8s -->
<ul data-reveal-stagger><li>…</li>…</ul>    <!-- children stagger 0.08s (up to 12) -->
```

After JS-rendered content: `VegaApp.revealAll();`. Reduced motion = everything instantly visible.

**Page transitions:** automatic fade between internal pages (380ms overlay). Skip on a specific link with `data-no-transition`. Disabled under reduced motion.

### 4.2 Cart APIs — `window.VegaCart` (live) + legacy aliases

```js
VegaCart.add('cric-sox')                        // first size, qty 1; opens drawer + toast
VegaCart.add({ id, size, qty })                 // object form (product.html uses this)
VegaCart.remove(key)                            // key = "<id>__<size>"
VegaCart.setQty(key, 3)                         // qty <= 0 removes the line
VegaCart.clear()
VegaCart.getItems() / getCount() / getTotal()   // copies / totals, INR integers
VegaCart.subscribe(fn)                          // fn(snapshot{items,count,total,freeShippingThreshold}, type) on every change; returns unsubscribe
VegaCart.toast('Custom demo message')
VegaCart.openDrawer() / closeDrawer()
window.addEventListener('vega:cart-updated', e => e.detail.count)
```

- Storage: `localStorage 'vega_cart_v2'`, all access in try/catch.
- Free shipping: ₹999 demo threshold, bar labelled **DEMO**.
- Legacy aliases kept for older pages: `window.cartStore.addItem(id, {size, qty})`, `cartStore.getSubtotal()`, `window.cartDrawer.open()`. Prefer `VegaCart` in new code.
- Any element with `data-add-to-cart="productId"` works with no JS on your side.

### 4.3 `window.VegaTilt` (assets/js/tilt.js)

```js
VegaTilt.init('[data-tilt]', { max: 12, perspective: 1000, scale: 1.025, glare: true, maxGlare: 0.25 });
VegaTilt.bind(oneElement, { max: 8 });
window.initTiltCards();                    // legacy alias
```

Auto-runs on DOMContentLoaded for `[data-tilt], .tilt-card`. After injecting cards, call `VegaTilt.init('[data-tilt]')` again (bound nodes are skipped). Disabled on touch and reduced motion.

### 4.4 `window.VegaHero3D` (assets/js/hero3d.js)

```js
VegaHero3D.init();    // auto-runs on load; needs #home-hero + #hero-3d-canvas
VegaHero3D.destroy(); // dispose scene + listeners
```

Procedural cricket ball: wine leather (`--amarante`) with procedural color + roughness maps, dual Ignite seam ridges + instanced stitches, ember particles (240 desktop / 90 mobile), Ignite + Frost rim lights, Amarante glow sprite, slow rotation, subtle mouse follow, scroll-driven rotation + camera drift. Pauses rendering when the hero is off-screen or the tab is hidden. Adds `.webgl-fallback` to `#home-hero` (revealing the `home-hero-fallback` image) when WebGL is missing, `prefers-reduced-motion` is set, or the device looks weak (low memory/cores, Save-Data, coarse pointer + small screen). Home-only — other pages simply have no `#home-hero`.

---

## 5. Accessibility & QA checklist (verify before you finish)

- [ ] No hex colors in your CSS; tokens only.
- [ ] JS-rendered sections render from VegaData — never hardcoded product HTML.
- [ ] Keyboard: focus-visible ring appears (global); interactive elements are real `<a>`/`<button>`.
- [ ] Reduced motion: no motion, everything visible.
- [ ] Mobile ≤ 640px: grids collapse to one column; marquee/tilt/pinned effects degrade gracefully.
- [ ] Cart drawer opens from your page; badge updates after `data-add-to-cart`.
- [ ] Console clean: no 404s (check image paths!), no JS errors.
- [ ] `product.html?id=<every product id>` renders a full PDP (gallery, sizes, price, specs).
- [ ] Collection filters/sort and URL `?category=` deep links work.

---

## 6. File ownership map

| File | Owner |
|---|---|
| `index.html`, `assets/js/hero3d.js`, `home-` blocks in `pages.css` | Foundation (done) |
| `assets/css/tokens.css`, `base.css`, `components.css`, `assets/js/data.js`, `app.js`, `tilt.js`, `cart.js` | Foundation (done — propose changes, don't silently edit) |
| `collection.html` + `shop-` collection styles | Collection agent (done) |
| `product.html` + `shop-` PDP styles | Product agent (done) |
| `cart.html` + `cart-` styles | Cart agent |
| `bulk.html` + `bulk-` styles | Bulk agent |
| `docs/COMPONENTS.md` | Foundation — this file. Ping before editing. |

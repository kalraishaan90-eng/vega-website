# Shopify 2.0 Migration Blueprint: VEGA Redesign

> **Context:** This prototype is currently built in atomic vanilla HTML5/CSS/JavaScript with a simulated localStorage cart. When approved by Vega stakeholders, this document serves as the direct map to port all components cleanly into a custom Shopify 2.0 Theme (`Dawn`-compatible or bespoke Shopify CLI architecture).

---

## 1. Directory & File Mapping

| Static Prototype File / Component | Shopify 2.0 Architecture | Description |
|---|---|---|
| `assets/css/tokens.css` | `assets/tokens.css` | Global CSS Custom Properties (Void, Graphite, Ignite, typography) |
| `assets/css/base.css` | `assets/base.css` | Global typography, resets, utilities |
| `assets/css/components.css` | `assets/components.css` | Buttons, badges, drawer, navbar, mobile menu |
| `assets/css/pages.css` | `assets/pages.css` | Template-specific styles (hero, collection, PDP, bulk) |
| `assets/js/cart.js` | `assets/cart-ajax.js` | Replace `localStorage` with Shopify AJAX API (`/cart/add.js`, `/cart/change.js`, `/cart.js`) |
| `assets/js/tilt.js` | `assets/tilt.js` | Vanilla 3D tilt engine (desktop hover only) |
| `assets/js/hero3d.js` | `assets/hero-3d.js` | Three.js aerodynamic helmet visualization |
| `assets/js/app.js` | `assets/global.js` | Mobile drawer controller, scroll reveal, sticky bars |
| `<header class="site-nav">` | `sections/header.liquid` | Sticky glass navbar with cart counter and mobile trigger |
| `<aside class="cart-drawer">` | `snippets/cart-drawer.liquid` | Slide-out cart drawer with live subtotal |
| `<article class="product-card">` | `snippets/product-card.liquid` | Reusable card with variant image, rating, quick-add |
| `<section class="hero-section">` | `sections/hero-3d.liquid` | Dynamic hero with schema settings for heading & CTAs |
| `collection.html` | `templates/collection.json` + `sections/main-collection.liquid` | Collection catalog with live filters |
| `product.html` | `templates/product.json` + `sections/main-product.liquid` | PDP gallery, size swatches, specs table, WhatsApp CTA, sticky bar |
| `cart.html` | `templates/cart.json` + `sections/main-cart.liquid` | Dedicated gear bag review and checkout summary |
| `bulk.html` | `templates/page.bulk.json` + `sections/bulk-fleet.liquid` | Tiered B2B fleet calculator & inquiry form |

---

## 2. Component Decoupling & Liquid Snippets

### 2.1 Product Card Snippet (`snippets/product-card.liquid`)
All card markup is decoupled and relies strictly on standardized attributes:
```liquid
{% comment %}
  Renders a Vega product card
  Accepts:
  - product: {Object} Shopify Product object
  - show_badge: {Boolean}
{% endcomment %}

<article class="product-card tilt-card" data-tilt data-product-id="{{ product.id }}">
  <div class="product-badge-group">
    {% if product.tags contains 'new' %}
      <span class="badge badge-ignite">NEW</span>
    {% endif %}
    {% if product.metafields.vega.certification %}
      <span class="badge badge-outline">{{ product.metafields.vega.certification }}</span>
    {% endif %}
  </div>

  <div class="card-media">
    <img 
      src="{{ product.featured_image | image_url: width: 600 }}" 
      alt="{{ product.title | escape }}" 
      loading="lazy"
      width="300"
      height="300"
    >
  </div>

  <div class="card-meta">
    <span>{{ product.type | default: 'HELMET' }}</span>
    {% if product.metafields.reviews.rating.value %}
      <div class="card-rating">
        ★ <span>{{ product.metafields.reviews.rating.value }}</span>
      </div>
    {% endif %}
  </div>

  <h3 class="card-title">
    <a href="{{ product.url }}">{{ product.title }}</a>
  </h3>
  <p class="card-desc">{{ product.description | strip_html | truncatewords: 16 }}</p>

  <div class="card-footer">
    <div class="price-box">
      <span class="price-current">{{ product.price | money_without_trailing_zeros }}</span>
      {% if product.compare_at_price > product.price %}
        <span class="price-original">{{ product.compare_at_price | money_without_trailing_zeros }}</span>
      {% endif %}
    </div>
    <button 
      class="card-quick-add" 
      data-add-to-cart="{{ product.selected_or_first_available_variant.id }}" 
      title="Add to Cart"
      aria-label="Add {{ product.title | escape }} to Cart"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    </button>
  </div>
</article>
```

---

## 3. Cart Transition: `localStorage` to Shopify AJAX Cart

In `assets/js/cart.js`, the current local cart operations map 1:1 to Shopify endpoints:

| Action | Current Local JS | Shopify AJAX Endpoint |
|---|---|---|
| **Get Cart** | `cartStore.get()` | `fetch('/cart.js')` |
| **Add Item** | `cartStore.addItem(id, opts)` | `fetch('/cart/add.js', { body: JSON.stringify({ items: [{ id: variantId, quantity: qty }] }) })` |
| **Update Quantity** | `cartStore.updateQty(id, delta)` | `fetch('/cart/change.js', { body: JSON.stringify({ id: variantKey, quantity: newQty }) })` |
| **Remove Item** | `cartStore.removeItem(id)` | `fetch('/cart/change.js', { body: JSON.stringify({ id: variantKey, quantity: 0 }) })` |
| **Clear Cart** | `cartStore.clear()` | `fetch('/cart/clear.js')` |

---

## 4. Mobile Ergonomics Guardrails

When porting to Shopify:
1. **Never load tilt on mobile:** Maintain `window.matchMedia('(hover: none)').matches` check to prevent performance degradation on Indian mobile devices.
2. **Preserve sticky bottom PDP bar:** The sticky checkout bar is proven to boost mobile conversion in high-friction mobile browsing sessions.
3. **Preserve WhatsApp VIP Consultation:** Deep-link direct to official Vega support numbers (+91), vital for high-value Indian helmet sales.

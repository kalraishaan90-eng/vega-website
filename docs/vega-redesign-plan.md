# Vega Sportwear — Pitch Redesign Project

## Request Log
Add every new request here. Newest at the bottom. Status: Planned, In progress, Done, Dropped.

| # | Date | Request | Status | Notes |
|---|---|---|---|---|
| 1 | 2026-09-29 | Redesign vegasportwear.com as a pitch demo: aesthetic, interactive, 3D hero, tilt cards, scroll animation, full shop flow | In progress | Built in Antigravity with multiple agents |
| 2 | 2026-09-29 | Build palette from two reference palettes | Done | Palette v1 approved, see section 3 |
| 3 | 2026-09-29 | Make this editable md with all agent prompts | Done | This file |

---

## 1. Brief
- **Client**: Vega Sportwear (Meerut). Real site is on Shopify ([vegasportwear.com](https://vegasportwear.com)).
- **Who we pitch**: The owners' son, who is now joining the business.
- **Goal**: He says yes to a paid redesign. The demo must feel like a real, finished brand, not a school project.
- **Vibe**: Dark, aggressive athlete energy blended with clean premium minimal luxury sportswear.
- **Scope**: Full shop flow. Home, collection, product, cart, bulk inquiry.
- **Must have**: 3D hero scene, 3D tilt product cards, scroll-based animation, smooth scroll.
- **Assets**: Real Vega logo and product photos from their current site.
- **Brand spelling**: "Vega Sportwear" (as in their site title). Change here if wrong.

---

## 2. Reality check
- **Demo format**: Static code with a fake cart. If the son says yes, the real build becomes a Shopify theme. Keep components small and clean so they port easily.
- **Mobile-first priority**: Most Indian buyers browse on phones. The son will probably open the demo on a phone first. Mobile quality matters as much as desktop.
- **Asset rights**: Photos belong to Vega. Fine for showing them a demo. Do not publish the demo publicly.

---

## 3. Design system

### Palette v1 (approved)
| Token | Hex | Role |
|---|---|---|
| `--void` | `#0E0D0E` | Page background |
| `--graphite` | `#1E1D1F` | Cards, surfaces |
| `--amarante` | `#2C0C14` | Wine depth: hero glow, section bands. Never text |
| `--frost` | `#AEB8CF` | Muted text, borders, 3D rim light. Never big headlines |
| `--brume` | `#F4F2EE` | Main text, light sections |
| `--ignite` | `#FE492A` | Accent. Main buttons, price highlight, cart bar, hover glow |
| `--ignite-hover` | `#FF6A4D` | Ignite hover state |

- **Screen share target**: Void 55%, Graphite 20%, Brume 10%, Amarante 8%, Frost 4%, Ignite 3%.
- **Contrast**: Brume on Void ~17:1, Frost on Void ~10:1, Void text on Ignite ~5.7:1.

### Rules
- Headlines are Brume on Void.
- Ignite is never a big background. Only small, high-attention moments.
- Buttons: primary = Ignite fill with Void text. Secondary = transparent with Frost border.
- Radius: small (4px) for buttons, 12px for cards. Sharp and confident, not bubbly.
- No hardcoded colors anywhere. CSS variables only.

### Typography
- **Display**: Barlow Condensed, weight 700 to 800, uppercase, tight tracking.
- **Body**: Inter, weights 400 and 500.
- Load from Google Fonts. Give both a real fallback stack.
- Agents may propose a better pairing but must say so in their report.

### Motion rules
- Slow, smooth, heavy. Ease-out curves. No bounce, no wobble.
- Smooth scroll with Lenis, scroll animation with GSAP ScrollTrigger.
- Reveal on scroll: fade plus 24px rise, 0.8s, stagger 0.08s.
- Everything must respect `prefers-reduced-motion`.

---

## 4. Tech stack
- Plain static site. No framework, no build step. Run with a simple local server.
- Libraries from CDN, pinned versions: `three@0.160.0`, `gsap@3.12.5` (with ScrollTrigger), `lenis@1.1.13`. Use latest stable if a pin fails.
- Fake cart stored in `localStorage` (fine in Antigravity, this is not a Claude artifact).

### File structure
```text
/index.html               # Home page
/collection.html          # Product catalog
/product.html             # Product detail view (reads ?id= from URL)
/cart.html                # Full cart view (drawer is the main flow)
/bulk.html                # Bulk inquiry & fleet ordering
/assets/css/tokens.css    # Central design tokens & CSS variables
/assets/css/base.css      # Reset, layout & global base typography
/assets/css/components.css# Buttons, cards, navbar, badges, drawer
/assets/css/pages.css     # Page-specific styling rules
/assets/js/app.js         # Lenis, ScrollTrigger, reveal utility, nav
/assets/js/data.js        # Products, categories, teams dataset
/assets/js/tilt.js        # 3D tilt interaction for cards
/assets/js/hero3d.js      # Three.js 3D hero scene
/assets/js/cart.js        # Cart store & drawer controller
/assets/img/              # Real Vega assets & images
/docs/COMPONENTS.md       # Component & design system architecture
```

---

## 5. Pages

### Home (`/index.html`)
- **Nav**: Transparent over hero, transitions to solid on scroll.
- **3D Hero**: Cricket ball, floating particles, rim lights (Ignite and Frost), Amarante glow. Reacts to mouse and scroll. Headline: *"Unleash Power."* Sub: *"Engineered for Excellence."* Buttons: *Explore collection*, *Explore EXODE*.
- **Scroll story**: Pinned text that reveals line by line.
- **Cric Sox feature**: Pinned block, sock image scales and parallaxes. Copy: *"Designed to meet the rigorous standards of International Cricket."*
- **Powering Teams Worldwide**: Sliding strip of team images (Rwanda, Nigeria, Zimbabwe, Karnataka, Malawi, Sierra Leone).
- **Best sellers**: Three 3D tilt cards.
- **Bulk orders CTA strip**: Direct callout to bulk procurement.
- **Footer**: Brand links, support, contact info.

### Collection (`/collection.html`)
- Page header, category chips, sort, grid of tilt cards, staggered reveal.

### Product (`/product.html`)
- Gallery with thumbnails and hover zoom.
- Sticky buy panel, size picker, quantity selector, *Add to cart*.
- WhatsApp button with prefilled order inquiry message.
- Details accordion, related products carousel/grid.

### Cart (`/cart.html` & Drawer)
- Slide-in drawer accessible from any page.
- Free shipping progress bar, subtotal, demo checkout button.
- Dedicated `/cart.html` full-page summary view.

### Bulk inquiry (`/bulk.html`)
- Hero section, three benefit points.
- Form: Full name, Business email, GST number (optional), Query details.
- Form validation, dynamic success state.
- WhatsApp direct alternative.
- Reassurance note: *"Our sales team will get back to you within 24-48 business hours."*

---

## 6. Multi-Agent Swarm Prompts

Below are the exact instructions and prompts deployed to the Antigravity agent swarm for this project:

### Agent 1 — Design System & Component Architecture
```text
1. Brief
Client: Vega Sportwear (Meerut). Real site is on Shopify.
Who we pitch: the owners' son, who is now joining the business.
Goal: he says yes to a paid redesign. The demo must feel like a real, finished brand, not a school project.
Vibe: dark, aggressive athlete energy blended with clean premium minimal luxury sportswear.
Scope: full shop flow. Home, collection, product, cart, bulk inquiry.
Must have: 3D hero scene, 3D tilt product cards, scroll-based animation, smooth scroll.
Assets: real Vega logo and product photos from their current site.
Brand spelling: "Vega Sportwear" (as in their site title). Change here if wrong.
```

### Agent 2 — Practical Constraints & Cart Portability
```text
2. Reality check
Demo is static code with a fake cart. If the son says yes, the real build becomes a Shopify theme. Keep components small and clean so they port easily.
Most Indian buyers browse on phones. The son will probably open the demo on a phone first. Mobile quality matters as much as desktop.
Photos belong to Vega. Fine for showing them a demo. Do not publish the demo publicly.
```

### Agent 3 — Tokens, Color Ratios & Motion Rules
```text
3. Design system
Palette v1 (approved)
Token	Hex	Role
--void	#0E0D0E	Page background
--graphite	#1E1D1F	Cards, surfaces
--amarante	#2C0C14	Wine depth: hero glow, section bands. Never text
--frost	#AEB8CF	Muted text, borders, 3D rim light. Never big headlines
--brume	#F4F2EE	Main text, light sections
--ignite	#FE492A	Accent. Main buttons, price highlight, cart bar, hover glow
--ignite-hover	#FF6A4D	Ignite hover state

Screen share target: Void 55, Graphite 20, Brume 10, Amarante 8, Frost 4, Ignite 3. Contrast: Brume on Void about 17:1, Frost on Void about 10:1, Void text on Ignite about 5.7:1.

Rules
Headlines are Brume on Void.
Ignite is never a big background. Only small, high-attention moments.
Buttons: primary = Ignite fill with Void text. Secondary = transparent with Frost border.
Radius: small (4px) for buttons, 12px for cards. Sharp and confident, not bubbly.
No hardcoded colors anywhere. CSS variables only.
Typography
Display: Barlow Condensed, weight 700 to 800, uppercase, tight tracking.
Body: Inter, weights 400 and 500.
Load from Google Fonts. Give both a real fallback stack.
Agents may propose a better pairing but must say so in their report.
Motion rules
Slow, smooth, heavy. Ease-out curves. No bounce, no wobble.
Smooth scroll with Lenis, scroll animation with GSAP ScrollTrigger.
Reveal on scroll: fade plus 24px rise, 0.8s, stagger 0.08s.
Everything must respect prefers-reduced-motion
```

### Agent 4 — Technical Foundations & File Blueprint
```text
4. Tech stack
Plain static site. No framework, no build step. Run with a simple local server.
Libraries from CDN, pinned versions: three@0.160.0, gsap@3.12.5 (with ScrollTrigger), lenis@1.1.13. Use latest stable if a pin fails.
Fake cart stored in localStorage (fine in Antigravity, this is not a Claude artifact).
File structure
/index.html
/collection.html
/product.html          (reads ?id= from URL)
/cart.html             (full cart view, drawer is the main flow)
/bulk.html
/assets/css/tokens.css
/assets/css/base.css
/assets/css/components.css
/assets/css/pages.css
/assets/js/app.js         (Lenis, ScrollTrigger, reveal utility, nav)
/assets/js/data.js        (products, categories, teams)
/assets/js/tilt.js        (3D tilt cards)
/assets/js/hero3d.js      (Three.js hero)
/assets/js/cart.js        (cart store and drawer)
/assets/img/              (real Vega images)
/docs/COMPONENTS.md       (written by Agent 1, read by everyone)
```

### Agent 5 — Page Templates & Interaction Flows
```text
5. Pages
Home
Nav (transparent over hero, solid on scroll)
3D hero: cricket ball, floating particles, rim lights (Ignite and Frost), Amarante glow. Reacts to mouse and scroll. Headline "Unleash Power." Sub "Engineered for Excellence." Buttons: Explore collection, Explore EXODE
Scroll story: pinned text that reveals line by line
Cric Sox feature: pinned block, sock image scales and parallaxes. Copy: "Designed to meet the rigorous standards of International Cricket."
Powering Teams Worldwide: sliding strip of team images (Rwanda, Nigeria, Zimbabwe, Karnataka, Malawi, Sierra Leone)
Best sellers: three 3D tilt cards
Bulk orders CTA strip
Footer
Collection

Page header, category chips, sort, grid of tilt cards, staggered reveal.

Product

Gallery with thumbnails and hover zoom, sticky buy panel, size picker, quantity, Add to cart, WhatsApp button with prefilled message, details accordion, related products.

Cart

Slide-in drawer from any page. Free shipping progress bar, subtotal, demo checkout button. Plus a simple cart.html full view.

Bulk inquiry

Hero, three benefit points, form (Full name, Business email, GST number optional, Query details), validation, success state, WhatsApp alternative, note "Our sales team will get back to you within 24-48 business hours."
```

---

## 7. How to Preview Locally
Run any lightweight static HTTP server in the project directory:

```bash
# Using Python
python -m http.server 8000

# Using Node / npx
npx serve .
```

Open [http://localhost:8000](http://localhost:8000) in your desktop browser or mobile emulator.

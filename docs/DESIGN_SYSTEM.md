# VEGA REDESIGN — 3. Design System Specification

> **Status:** Production Standard • Approved Palette v1  
> **Target Audience:** Designers, Engineers, Subagents  
> **Source Files:** [`assets/css/tokens.css`](../assets/css/tokens.css), [`assets/css/base.css`](../assets/css/base.css), [`assets/css/components.css`](../assets/css/components.css), [`assets/css/pages.css`](../assets/css/pages.css), [`assets/js/app.js`](../assets/js/app.js)

---

## 1. Approved Palette v1

| Token | Hex Value | RGB Channels | Screen Share Target | Semantic Role & Strict Guardrails |
| :--- | :--- | :--- | :--- | :--- |
| `--void` | `#0E0D0E` | `14, 13, 14` | **55%** | Deep pitch-black page canvas background. Grounding darkness for entire UI. |
| `--graphite` | `#1E1D1F` | `30, 29, 31` | **20%** | Cards, surface layers, inputs, drawer panels, elevated containers. |
| `--amarante` | `#2C0C14` | `44, 12, 20` | **8%** | Wine depth: hero radial glow, section bands, 3D back-light. **NEVER text.** |
| `--frost` | `#AEB8CF` | `174, 184, 207` | **4%** | Muted text, borders, 3D rim light, secondary elements. **NEVER big headlines.** |
| `--brume` | `#F4F2EE` | `244, 242, 238` | **10%** | Primary headlines, main body text, light accents, contrast badges. |
| `--ignite` | `#FE492A` | `254, 73, 42` | **3%** | Electric fiery accent. Primary CTA fills, price callouts, cart bar badge, hover glow. |
| `--ignite-hover`| `#FF6A4D` | `255, 106, 77` | *Interactive* | Primary button hover state, elevated focus rings. |

### Contrast Verification:
- **Brume on Void (`#F4F2EE` on `#0E0D0E`)**: **~17.2:1** (Exceeds WCAG AAA requirement of 7:1)
- **Frost on Void (`#AEB8CF` on `#0E0D0E`)**: **~9.8:1** (~10:1; Exceeds WCAG AAA requirement of 7:1 for normal text)
- **Void text on Ignite (`#0E0D0E` on `#FE492A`)**: **~5.8:1** (~5.7:1; Exceeds WCAG AA requirement of 4.5:1 for body and passes AAA for bold UI buttons)

---

## 2. Strict Design Rules

1. **Headlines are Brume on Void**: All `h1` through `h6` headers render in `var(--brume)` against `var(--void)`.
2. **Ignite is Never a Big Background**: Ignite represents only 3% of the visual field. Reserved exclusively for high-attention interactive moments (primary CTAs, price highlights, cart badges, active indicators).
3. **Buttons**:
   - **Primary Button**: Ignite fill (`background: var(--ignite)`), Void text (`color: var(--void)`), sharp 4px radius (`border-radius: var(--radius-btn)`). Hover state transitions to `var(--ignite-hover)` with expanded glow.
   - **Secondary Button**: Transparent background (`background: transparent`), Frost border (`border: 1px solid var(--frost)`), Brume text (`color: var(--brume)`), 4px radius.
4. **Radii**:
   - **Buttons & Badges**: Small 4px (`--radius-btn: 4px`) for a sharp, confident, motorsport-engineered silhouette.
   - **Cards & Drawers**: 12px (`--radius-card: 12px`) for confident, structural surfaces. **Never bubbly.**
5. **No Hardcoded Colors Anywhere**: All color values in CSS, JavaScript templates, SVGs, and inline HTML must reference CSS custom properties (`var(--...)`). Zero raw hex or rgba literals in application code.

---

## 3. Typography Specification

### Display Typeface: **Barlow Condensed**
- **Weights**: `700` (Bold) to `800` (Extra Bold).
- **Casing**: Uppercase (`text-transform: uppercase`).
- **Tracking**: Tight tracking (`letter-spacing: -0.015em` to `-0.025em`).
- **Google Fonts Loading**: Linked with italic and weights 700/800.
- **Fallback Stack**:
  ```css
  --font-display: 'Barlow Condensed', 'Impact', 'Arial Narrow', sans-serif;
  ```

### Body Typeface: **Inter**
- **Weights**: `400` (Regular) and `500` (Medium).
- **Tracking**: Normal (`letter-spacing: normal`).
- **Fallback Stack**:
  ```css
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  ```

### Monospace / Specs: **JetBrains Mono**
- **Weights**: `400` and `500`.
- **Fallback Stack**:
  ```css
  --font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  ```

### Typography Evaluation Report
> **Agent Evaluation**: The combination of **Barlow Condensed** (Display) and **Inter** (Body) offers a tailored typographic profile for VEGA:
> - *Barlow Condensed* captures the athletic aggression, aerodynamic precision, and industrial confidence of motorcycle and high-performance sports engineering. Its tall x-height and narrow proportions deliver punchy, bold headlines without excessive vertical consumption.
> - *Inter* provides neutral, human-optimized legibility for dense technical specifications, sizing charts, and product descriptions, preventing reader fatigue.
> - *Proposed Alternative Considered*: `Syne` + `Space Grotesk` was previously tested; while avant-garde, `Barlow Condensed` + `Inter` demonstrates superior readability on mobile e-commerce screens and aligns much closer with world-class motorsport telemetry aesthetics.

---

## 4. Motion Rules & Scroll Choreography

### Philosophy: **Slow, Smooth, Heavy**
- Motion should feel like high-density carbon fiber and precision machinery.
- **Ease-out Curves**: Deceleration curves (`cubic-bezier(0.16, 1, 0.3, 1)` or quartic `1 - (1 - t)^4`).
- **Strict Guardrail**: No bounce, no wobble, no rubber-banding.

### Smooth Scroll (Lenis)
- Initialized with duration `1.3s` and quartic deceleration curve:
  ```javascript
  new Lenis({
    duration: 1.3,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 1.6
  });
  ```
- Integrated with GSAP ScrollTrigger ticker and `lagSmoothing(0)`.

### Scroll Reveal (GSAP ScrollTrigger)
- **Specification**: Fade plus 24px rise, 0.8s duration, 0.08s stagger for sibling items:
  ```javascript
  gsap.fromTo(items,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: container,
        start: 'top 88%',
        once: true
      }
    }
  );
  ```
- Fallback for non-GSAP contexts: CSS transitions with staggered `transitionDelay: (index % 4) * 0.08s`.

### Accessibility: `prefers-reduced-motion`
- System-wide support implemented:
  - If `prefers-reduced-motion: reduce` is active:
    - Lenis smooth scrolling is completely disabled.
    - All transforms and transition durations are nullified (`0.001ms`).
    - Reveal elements appear instantly at `opacity: 1; transform: none;`.
    - Three.js 3D canvas renders a single static hero frame without background animation loops.
    - 3D card tilt listeners are completely bypassed.

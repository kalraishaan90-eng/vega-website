/**
 * VEGA REDESIGN — APP CORE (shared foundation, loaded on every page)
 *
 * Responsibilities:
 *   1. Native scrolling (zero delay) with GSAP ScrollTrigger registered.
 *   2. Navbar: transparent over the hero, solid after ~40px.
 *   3. Reveal utility: [data-reveal] elements + [data-reveal-stagger] parents.
 *   4. Smooth page-transition fade between internal pages.
 *   5. Shared nav & footer injection from one canonical template (shared-nav-mount /
 *      shared-footer-mount). Pages with hand-written nav/footer markup keep working —
 *      the injection only runs when a mount node is present.
 *   6. Home-page hooks (best sellers render, teams marquee, scroll story, Cric Sox).
 *
 * Conventions:
 *   - Zero hardcoded colors: every value comes from tokens.css variables.
 *   - All motion respects prefers-reduced-motion.
 *   - No framework, no build step. Plain browser JS (no modules).
 */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var VegaApp = {
    lenis: null,

    /* ------------------------------------------------------------------ */
    /* Bootstrap                                                          */
    /* ------------------------------------------------------------------ */

    init() {
      this.injectSharedNavFooter(); // nav must exist before nav/scroll modules run
      this.initSmoothScroll();
      this.initNavbar();
      this.initMobileNav();
      this.initScrollProgress();
      this.initReveal();
      this.initPageTransitions();
      this.initScrollStory(); // One scroll-linked section per brief
      this.initScrollEngine(); // start centralized single rAF loop with cached measurements
      this.initTeamsStrip();
      this.initHomePageBestSellers();
      this.initCollectionPage();
      this.initProductPage();
      this.initBulkPage();
    },

    /* ------------------------------------------------------------------ */
    /* 1. Scrolling — native, zero interpolation delay                     */
    /* ------------------------------------------------------------------ */

    /**
     * Native scroll with unified rAF execution.
     * ScrollTrigger works directly with native scroll events.
     */
    initSmoothScroll() {
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.refresh();
      }
    },

    /* ------------------------------------------------------------------ */
    /* Centralized rAF Scroll & Measurement Engine                        */
    /* ------------------------------------------------------------------ */
    _scrollHandlers: [],
    _scrollTicking: false,
    _measureScheduled: false,

    addScrollModule(module) {
      this._scrollHandlers.push(module);
    },

    initScrollEngine() {
      var self = this;

      function measureAll() {
        self._measureScheduled = false;
        var vh = window.innerHeight || document.documentElement.clientHeight;
        var scrollY = window.scrollY || window.pageYOffset;
        for (var i = 0; i < self._scrollHandlers.length; i++) {
          if (self._scrollHandlers[i].measure) {
            self._scrollHandlers[i].measure(vh, scrollY);
          }
        }
      }

      function updateAll() {
        self._scrollTicking = false;
        var scrollY = window.scrollY || window.pageYOffset;
        for (var i = 0; i < self._scrollHandlers.length; i++) {
          if (self._scrollHandlers[i].render) {
            self._scrollHandlers[i].render(scrollY);
          }
        }
      }

      function onScroll() {
        if (!self._scrollTicking) {
          self._scrollTicking = true;
          requestAnimationFrame(updateAll);
        }
      }

      function onResize() {
        if (!self._measureScheduled) {
          self._measureScheduled = true;
          requestAnimationFrame(function () {
            measureAll();
            updateAll();
          });
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });

      // Run initial layout measurement & first render
      measureAll();
      updateAll();
    },

    /* ------------------------------------------------------------------ */
    /* 2. Navbar: transparent over hero, solid on scroll                  */
    /* ------------------------------------------------------------------ */

    initNavbar() {
      var nav = document.querySelector('.site-nav');
      if (!nav) return;

      var isScrolled = false;
      this.addScrollModule({
        render: function (scrollY) {
          var next = scrollY > 40;
          if (next !== isScrolled) {
            isScrolled = next;
            nav.classList.toggle('scrolled', isScrolled);
          }
        }
      });
    },

    /* ------------------------------------------------------------------ */
    /* 2b. Scroll progress: thin 1px line at top of viewport              */
    /* ------------------------------------------------------------------ */

    initScrollProgress() {
      var bar = document.getElementById('scroll-progress-line');
      if (!bar) return;

      var docHeight = 0;
      var lastScale = -1;

      this.addScrollModule({
        measure: function (vh) {
          docHeight = Math.max(0, (document.documentElement.scrollHeight || document.body.scrollHeight) - vh);
        },
        render: function (scrollY) {
          var progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
          var rounded = Math.round(progress * 1000) / 1000;
          if (rounded !== lastScale) {
            lastScale = rounded;
            bar.style.transform = 'scaleX(' + rounded + ')';
          }
        }
      });
    },

    /* ------------------------------------------------------------------ */
    /* 3. Scroll reveal utility                                           */
    /* ------------------------------------------------------------------ */

    /**
     * Any element with data-reveal fades in + rises 24px when scrolled into
     * view. A parent with data-reveal-stagger staggers its direct children.
     * Respects prefers-reduced-motion (everything visible immediately).
     *
     * JS API:  VegaApp.reveal(el)  — observe a freshly injected element
     *          VegaApp.revealAll() — rescan the DOM after dynamic renders
     */
    initReveal() {
      // Elements are static by default (no scroll fade-up on every element)
      document.querySelectorAll('[data-reveal], [data-reveal-stagger] > *').forEach(function (el) {
        el.classList.add('is-visible');
      });
    },

    revealAll() {
      document.querySelectorAll('[data-reveal], [data-reveal-stagger] > *').forEach(function (el) {
        el.classList.add('is-visible');
      });
    },

    reveal(el) {
      if (el) el.classList.add('is-visible');
    },

    /* ------------------------------------------------------------------ */
    /* 4. Page transitions                                                */
    /* ------------------------------------------------------------------ */

    /**
     * Creates a fixed void-colored overlay: fades in on internal navigation
     * (380ms), fades out on arrival. Skipped entirely for reduced motion.
     */
    initPageTransitions() {
      if (prefersReducedMotion) return;

      var overlay = document.querySelector('.page-transition-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);
      }

      // Fade out on arrival (next frame so the transition actually runs).
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          overlay.classList.remove('fading-out');
        });
      });

      document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href]');
        if (!link) return;

        var href = link.getAttribute('href');
        if (
          !href ||
          href.charAt(0) === '#' ||
          /^(https?:|mailto:|tel:)/i.test(href) ||
          link.hasAttribute('target') ||
          link.hasAttribute('download') ||
          link.hasAttribute('data-no-transition')
        ) return;

        // Ignore modified clicks (open in new tab, etc.)
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

        e.preventDefault();
        overlay.classList.add('fading-out');
        setTimeout(function () { window.location.href = href; }, 380);
      });
    },

    /* ------------------------------------------------------------------ */
    /* 5. Shared nav & footer injection                                   */
    /* ------------------------------------------------------------------ */

    /**
     * Pages include <div id="shared-nav-mount"></div> and
     * <div id="shared-footer-mount"></div>; this fills them from ONE template
     * so nav/footer stay in sync across all five pages. Pages that ship their
     * own .site-nav / .site-footer markup (no mount) simply keep it.
     */
    injectSharedNavFooter() {
      var navMount = document.getElementById('shared-nav-mount');
      var footerMount = document.getElementById('shared-footer-mount');

      if (navMount) navMount.innerHTML = this._navTemplate();
      if (footerMount && window.VegaData) footerMount.innerHTML = this._footerTemplate(window.VegaData.brand);
    },

    /**
     * Canonical site navigation. One source of truth for all pages.
     */
    _navTemplate() {
      return (
        '<header class="site-nav" id="site-nav">' +
          '<div class="nav-container">' +
            '<a href="index.html" class="nav-brand" aria-label="Vega Sportwear home">' +
              '<img src="assets/img/vega-logo-official.png" alt="Vega Sportwear" class="nav-brand-logo" width="140" height="34" decoding="async">' +
            '</a>' +
            '<nav class="nav-links" aria-label="Primary">' +
              '<a href="index.html" class="nav-link">Home</a>' +
              '<a href="collection.html?category=cricket-clothing" class="nav-link">Cricket Clothing</a>' +
              '<a href="collection.html?category=t-shirt-polo" class="nav-link">T-Shirt Polo</a>' +
              '<a href="collection.html?category=t-shirt-crew-neck" class="nav-link">T-Shirt Crew Neck</a>' +
              '<a href="collection.html?category=shorts" class="nav-link">Shorts</a>' +
              '<a href="collection.html?category=track-bottoms" class="nav-link">Track Bottoms</a>' +
              '<div class="nav-dropdown">' +
                '<a href="collection.html?category=accessories" class="nav-link">Accessories <span class="dropdown-arrow">&#9662;</span></a>' +
                '<div class="dropdown-menu">' +
                  '<a href="collection.html?category=cric-sox" class="dropdown-item">Cric Sox</a>' +
                  '<a href="collection.html?category=sleeve" class="dropdown-item">Sleeve</a>' +
                  '<a href="collection.html?category=supporter" class="dropdown-item">Supporter</a>' +
                  '<a href="collection.html?category=accessories" class="dropdown-item view-all">All Accessories &rarr;</a>' +
                '</div>' +
              '</div>' +
              '<a href="collection.html?category=exode" class="nav-link">EXODE</a>' +
              '<a href="collection.html?category=new-arrivals" class="nav-link"><span class="badge-dot-nav"></span>New Arrivals</a>' +
              '<a href="bulk.html" class="nav-link">Bulk Orders</a>' +
            '</nav>' +
            '<div class="nav-actions">' +
              '<button class="cart-trigger" id="cart-drawer-btn" aria-label="Open gear bag">' +
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                  '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>' +
                  '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>' +
                '</svg>' +
                '<span class="cart-badge" id="cart-badge-count">0</span>' +
              '</button>' +
              '<button class="mobile-toggle" id="mobile-toggle-btn" aria-label="Toggle navigation" aria-expanded="false" aria-controls="mobile-nav-menu">' +
                '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                  '<line x1="3" y1="6" x2="21" y2="6"></line>' +
                  '<line x1="3" y1="12" x2="21" y2="12"></line>' +
                  '<line x1="3" y1="18" x2="21" y2="18"></line>' +
                '</svg>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</header>' +
        '<div class="mobile-nav-menu" id="mobile-nav-menu" aria-hidden="true">' +
          '<div class="mobile-nav-backdrop" data-mobile-nav-close></div>' +
          '<div class="mobile-nav-drawer" role="dialog" aria-label="Navigation">' +
            '<div class="mobile-nav-header">' +
              '<a href="index.html" class="nav-brand">' +
                '<img src="assets/img/vega-logo-official.png" alt="Vega Sportwear" class="nav-brand-logo" width="140" height="34" decoding="async">' +
              '</a>' +
              '<button class="mobile-nav-close" id="mobile-nav-close-btn" aria-label="Close menu">&times;</button>' +
            '</div>' +
            '<nav class="mobile-nav-links" aria-label="Mobile">' +
              '<a href="index.html" class="mobile-nav-link">Home</a>' +
              '<a href="collection.html?category=cricket-clothing" class="mobile-nav-link">Cricket Clothing</a>' +
              '<a href="collection.html?category=t-shirt-polo" class="mobile-nav-link">T-Shirt Polo</a>' +
              '<a href="collection.html?category=t-shirt-crew-neck" class="mobile-nav-link">T-Shirt Crew Neck</a>' +
              '<a href="collection.html?category=shorts" class="mobile-nav-link">Shorts</a>' +
              '<a href="collection.html?category=track-bottoms" class="mobile-nav-link">Track Bottoms</a>' +
              '<a href="collection.html?category=accessories" class="mobile-nav-link">Accessories</a>' +
              '<a href="collection.html?category=exode" class="mobile-nav-link">EXODE Series</a>' +
              '<a href="collection.html?category=new-arrivals" class="mobile-nav-link">New Arrivals</a>' +
              '<a href="bulk.html" class="mobile-nav-link">Bulk Orders / B2B</a>' +
            '</nav>' +
            '<div class="mobile-nav-footer">' +
              '<div class="mobile-nav-cert">Engineered for Excellence</div>' +
              '<p class="mobile-nav-note">Free shipping in India &bull; Meerut Sports Hub</p>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    },

    /**
     * Canonical site footer. Real Vega content from data.js.
     */
    _footerTemplate(brand) {
      if (!brand) return '';
      return (
        '<footer class="site-footer">' +
          '<div class="container">' +
            '<div class="footer-grid">' +
              '<div class="footer-brand">' +
                '<a href="index.html" class="nav-brand">' +
                  '<img src="assets/img/vega-logo-official.png" alt="Vega Sportwear" class="nav-brand-logo nav-brand-logo-footer" width="180" height="44" decoding="async">' +
                '</a>' +
                '<p>' + brand.metaDescription + '</p>' +
                '<div class="footer-contact-item">' +
                  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>' +
                  '<span>' + brand.address + '</span>' +
                '</div>' +
                '<div class="footer-contact-item">' +
                  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>' +
                  '<a href="https://wa.me/916398204040" target="_blank" rel="noopener">' + brand.phone + ' (Phone &amp; WhatsApp)</a>' +
                '</div>' +
                '<div class="footer-contact-item">' +
                  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>' +
                  '<a href="mailto:' + brand.email + '">' + brand.email + '</a>' +
                '</div>' +
                '<div class="footer-social-links">' +
                  '<a href="' + brand.socials.instagram + '" target="_blank" rel="noopener" class="footer-social-btn" aria-label="Instagram @vega_sportswear">' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>' +
                  '</a>' +
                  '<a href="' + brand.socials.facebook + '" target="_blank" rel="noopener" class="footer-social-btn" aria-label="Facebook">' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>' +
                  '</a>' +
                  '<a href="' + brand.socials.linkedin + '" target="_blank" rel="noopener" class="footer-social-btn" aria-label="LinkedIn vegaindustries">' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>' +
                  '</a>' +
                '</div>' +
              '</div>' +
              '<div>' +
                '<h4 class="footer-heading">Shop</h4>' +
                '<div class="footer-links">' +
                  '<a href="collection.html?category=cricket-clothing">Cricket Clothing</a>' +
                  '<a href="collection.html?category=t-shirt-polo">T-Shirt Polo</a>' +
                  '<a href="collection.html?category=shorts">Shorts</a>' +
                  '<a href="collection.html?category=accessories">Accessories</a>' +
                  '<a href="collection.html?category=exode">EXODE Series</a>' +
                  '<a href="collection.html?category=new-arrivals">New Arrivals</a>' +
                '</div>' +
              '</div>' +
              '<div>' +
                '<h4 class="footer-heading">Support</h4>' +
                '<div class="footer-links">' +
                  '<a href="bulk.html">Bulk / B2B Orders</a>' +
                  '<a href="' + brand.whatsappLink + '" target="_blank" rel="noopener">WhatsApp Desk</a>' +
                  '<a href="mailto:' + brand.email + '">' + brand.email + '</a>' +
                  '<a href="tel:+916398204040">' + brand.phone + '</a>' +
                '</div>' +
              '</div>' +
              '<div>' +
                '<h4 class="footer-heading">Contact</h4>' +
                '<div class="footer-contact-item">' +
                  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>' +
                  '<span>' + brand.address + '</span>' +
                '</div>' +
                '<div class="footer-contact-item">' +
                  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>' +
                  '<a href="https://wa.me/916398204040" target="_blank" rel="noopener">' + brand.whatsapp + ' (WhatsApp)</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="footer-bottom">' +
              '<span>' + brand.copyright + '</span>' +
              '<span class="mono">Unleash Power. &bull; Engineered for Excellence</span>' +
            '</div>' +
          '</div>' +
        '</footer>'
      );
    },

    /* ------------------------------------------------------------------ */
    /* 6. Mobile navigation                                               */
    /* ------------------------------------------------------------------ */

    initMobileNav() {
      var toggle = document.querySelector('.mobile-toggle');
      var menu = document.getElementById('mobile-nav-menu');
      if (!toggle || !menu) return;

      var closeBtn = document.getElementById('mobile-nav-close-btn');
      var backdrop = menu.querySelector('[data-mobile-nav-close]');

      var setOpen = function (open) {
        menu.classList.toggle('active', open);
        menu.setAttribute('aria-hidden', String(!open));
        toggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      };

      toggle.addEventListener('click', function () {
        setOpen(!menu.classList.contains('active'));
      });

      if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });
      if (backdrop) backdrop.addEventListener('click', function () { setOpen(false); });

      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { setOpen(false); });
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('active')) setOpen(false);
      });
    },

    /* ------------------------------------------------------------------ */
    /* 7. Home page: scroll story (pinned, line-by-line)                  */
    /* ------------------------------------------------------------------ */

    initScrollStory() {
      var section = document.querySelector('.home-story-section');
      if (!section) return;

      var lines = section.querySelectorAll('.home-story-line');
      if (!lines.length) return;

      var sectionTop = 0;
      var total = 0;
      var lastActiveIndex = -1;

      this.addScrollModule({
        measure: function (vh, scrollY) {
          var rect = section.getBoundingClientRect();
          sectionTop = rect.top + scrollY;
          total = section.offsetHeight - vh;
        },
        render: function (scrollY) {
          if (total <= 0) return;
          var scrolled = scrollY - sectionTop;
          var progress;
          if (scrolled < 0) {
            progress = 0;
          } else if (scrolled > total) {
            progress = 1;
          } else {
            progress = scrolled / total;
          }

          var activeIndex = Math.min(lines.length - 1, Math.floor(progress * lines.length * 1.15));
          if (activeIndex !== lastActiveIndex) {
            lastActiveIndex = activeIndex;
            for (var i = 0; i < lines.length; i++) {
              lines[i].classList.toggle('active', i <= activeIndex);
            }
          }
        }
      });
    },

    /* ------------------------------------------------------------------ */
    /* 8. Home page: Cric Sox pinned feature                              */
    /* ------------------------------------------------------------------ */

    initCricSoxScroll() {
      var section = document.querySelector('.home-sox-section');
      if (!section) return;

      var image = section.querySelector('.home-sox-image');
      if (!image) return;

      if (prefersReducedMotion) return; // keep the image static

      var sectionTop = 0;
      var total = 0;
      var cachedVh = window.innerHeight;
      var lastProgress = -1;

      this.addScrollModule({
        measure: function (vh, scrollY) {
          cachedVh = vh;
          var rect = section.getBoundingClientRect();
          sectionTop = rect.top + scrollY;
          total = section.offsetHeight - vh;
        },
        render: function (scrollY) {
          if (total <= 0) return;
          var scrolled = scrollY - sectionTop;
          if (scrolled < -cachedVh || scrolled > total + cachedVh) return;

          var progress = Math.max(0, Math.min(1, scrolled / total));
          if (Math.abs(progress - lastProgress) < 0.002) return;
          lastProgress = progress;

          var scale = 1 + progress * 0.22;
          var translateY = (progress - 0.5) * -36;
          var rotate = (progress - 0.5) * 5;
          image.style.transform = 'scale(' + scale.toFixed(4) + ') translateY(' + translateY.toFixed(1) + 'px) rotate(' + rotate.toFixed(2) + 'deg)';
        }
      });
    },

    /* ------------------------------------------------------------------ */
    /* 9. Home page: Powering Teams Worldwide marquee                     */
    /* ------------------------------------------------------------------ */

    initTeamsStrip() {
      var track = document.getElementById('home-teams-track');
      if (!track || track.children.length === 0) return;
      if (track.dataset.cloned === 'true') return;

      // Duplicate children once; the CSS animation translates -50% for a seamless loop.
      Array.from(track.children).forEach(function (card) {
        var clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
      track.dataset.cloned = 'true';
    },

    /* ------------------------------------------------------------------ */
    /* 10. Home page: best sellers (three tilt cards from VegaData)       */
    /* ------------------------------------------------------------------ */

    initHomePageBestSellers() {
      var container = document.getElementById('home-best-sellers-grid');
      if (!container || !window.VegaData) return;

      var ids = [
        'cric-sox',
        'cricket-clothing-cs-jqrd',
        'navy-t-shirt-polo-ts-pk-548'
      ];

      var html = ids.map(function (id) {
        return window.VegaData.getProductById(id);
      }).filter(Boolean).map(function (product) {
        return VegaApp._productCardHTML(product);
      }).join('');

      container.innerHTML = html;

      if (window.VegaTilt) window.VegaTilt.init('[data-tilt]');
    },

    /* ------------------------------------------------------------------ */
    /* 11. Collection page (filters, sorting, grid render)                */
    /* ------------------------------------------------------------------ */

    initCollectionPage() {
      var grid = document.getElementById('collection-products-grid');
      if (!grid || !this.data()) return;

      var params = new URLSearchParams(window.location.search);
      var activeCategory = params.get('category') || 'all';
      var activeSort = 'featured';

      var chips = document.querySelectorAll('.filter-pill[data-filter]');
      var sortSelect = document.getElementById('collection-sort-select');
      var countEl = document.getElementById('collection-count-val');

      var render = function () {
        var products = VegaApp.data().getProductsByCategory(activeCategory);

        if (activeSort === 'price-low') products = products.slice().sort(function (a, b) { return a.price - b.price; });
        else if (activeSort === 'price-high') products = products.slice().sort(function (a, b) { return b.price - a.price; });
        else if (activeSort === 'rating') products = products.slice().sort(function (a, b) { return b.rating - a.rating; });
        else if (activeSort === 'name') products = products.slice().sort(function (a, b) { return a.name.localeCompare(b.name); });

        if (countEl) countEl.textContent = products.length + (products.length === 1 ? ' product' : ' products');

        // Empty state for categories with no products
        var emptyState = document.getElementById('shop-empty-state');
        if (!products.length) {
          grid.innerHTML = '';
          if (countEl) countEl.textContent = '0 products';
          if (emptyState) emptyState.hidden = false;
        } else {
          if (emptyState) emptyState.hidden = true;
          grid.innerHTML = products.map(function (p) { return VegaApp._productCardHTML(p); }).join('');
        }

        if (window.VegaTilt) window.VegaTilt.init('[data-tilt]');
        VegaApp.revealAll();
      };

      chips.forEach(function (chip) {
        chip.classList.toggle('active', chip.getAttribute('data-filter') === activeCategory);
        chip.addEventListener('click', function (e) {
          e.preventDefault();
          chips.forEach(function (c) { c.classList.remove('active'); });
          chip.classList.add('active');
          activeCategory = chip.getAttribute('data-filter');
          window.history.replaceState({}, '', 'collection.html?category=' + activeCategory);
          render();
        });
      });

      if (sortSelect) {
        sortSelect.addEventListener('change', function (e) {
          activeSort = e.target.value;
          render();
        });
      }

      render();
    },

    /** Shared product-card markup: Photo-first, cropped consistently, name + price only, quick-add on hover */
    _productCardHTML(p) {
      var d = this.data();
      return (
        '<article class="product-card tilt-card" data-tilt data-id="' + p.id + '">' +
          '<div class="card-media">' +
            '<a href="product.html?id=' + p.id + '">' +
              '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" decoding="async" width="400" height="500">' +
            '</a>' +
            '<button class="card-quick-add" data-add-to-cart="' + p.id + '" aria-label="Add ' + p.name + ' to gear bag">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>' +
            '</button>' +
          '</div>' +
          '<div class="card-info">' +
            '<h3 class="card-title"><a href="product.html?id=' + p.id + '">' + p.name + '</a></h3>' +
            '<div class="card-price">' +
              '<span class="price-current">' + d.formatPrice(p.price) + '</span>' +
              (p.originalPrice ? '<span class="price-original">' + d.formatPrice(p.originalPrice) + '</span>' : '') +
            '</div>' +
          '</div>' +
        '</article>'
      );
    },

    /* ------------------------------------------------------------------ */
    /* 12. Product detail page (gallery, size/qty, WhatsApp, related)     */
    /* ------------------------------------------------------------------ */

    initProductPage() {
      var root = document.getElementById('pdp-page-container');
      if (!root || !this.data()) return;

      var d = this.data();
      var params = new URLSearchParams(window.location.search);
      var requestedId = params.get('id');
      var product = requestedId ? d.getProductById(requestedId) : d.products[0];

      // Friendly not-found state for missing or mistyped ?id= links
      if (!product) {
        var viewEl = document.getElementById('pdp-view');
        var relatedEl = document.getElementById('shop-related');
        var notFoundEl = document.getElementById('pdp-notfound');
        if (viewEl) viewEl.hidden = true;
        if (relatedEl) relatedEl.hidden = true;
        if (notFoundEl) notFoundEl.hidden = false;
        var crumbEl0 = document.getElementById('breadcrumb-current');
        if (crumbEl0) crumbEl0.textContent = 'Not found';
        document.title = 'Product not found | Vega Sportwear';
        return;
      }

      document.title = product.name + ' | Vega Sportwear';

      var $ = function (id) { return document.getElementById(id); };

      var titleEl = $('pdp-title');
      if (titleEl) titleEl.textContent = product.name;
      var taglineEl = $('pdp-tagline');
      if (taglineEl) taglineEl.textContent = product.tagline || '';
      var crumbEl = $('breadcrumb-current');
      if (crumbEl) crumbEl.textContent = product.name;
      var priceCur = $('pdp-price-current');
      if (priceCur) priceCur.textContent = d.formatPrice(product.price);
      var priceOrig = $('pdp-price-original');
      if (priceOrig) {
        priceOrig.textContent = product.originalPrice ? d.formatPrice(product.originalPrice) : '';
        priceOrig.hidden = !product.originalPrice;
      }
      var ratingRow = $('pdp-rating-row');
      if (ratingRow) {
        ratingRow.innerHTML = '<span class="shop-price-note" style="color: var(--frost);">[TODO: Connect live Shopify customer reviews]</span>';
      }

      // Badges: No badges unless real
      var badgesEl = $('pdp-badges');
      if (badgesEl) {
        badgesEl.innerHTML = '';
      }

      var descEl = $('pdp-description');
      if (descEl) descEl.textContent = product.description || '';

      // Gallery: main image + hover zoom + thumbnails
      var mainImage = $('pdp-main-img');
      var mainWrap = $('pdp-main-image-container');
      if (mainImage) {
        mainImage.src = product.image;
        mainImage.alt = product.name;
        if (mainWrap) {
          var hint = document.getElementById('shop-gallery-hint');
          mainWrap.addEventListener('mousemove', function (e) {
            var rect = mainWrap.getBoundingClientRect();
            mainWrap.classList.add('zoomed');
            mainImage.style.transformOrigin =
              (((e.clientX - rect.left) / rect.width) * 100).toFixed(1) + '% ' +
              (((e.clientY - rect.top) / rect.height) * 100).toFixed(1) + '%';
            if (hint) hint.style.opacity = '0';
          });
          mainWrap.addEventListener('mouseleave', function () {
            mainWrap.classList.remove('zoomed');
            mainImage.style.transformOrigin = 'center center';
            if (hint) hint.style.opacity = '';
          });
          // Touch devices have no hover: point the hint at the swipe gesture
          if (hint && !window.matchMedia('(pointer: fine)').matches) {
            hint.textContent = 'Swipe to see more angles';
          }
        }
      }

      var thumbs = $('pdp-thumbs-list');
      if (thumbs && product.images && mainImage) {
        thumbs.innerHTML = product.images.map(function (src, i) {
          return '<button class="pdp-thumb' + (i === 0 ? ' active' : '') + '" data-thumb="' + src + '">' +
                 '<img src="' + src + '" alt="' + product.name + ' view ' + (i + 1) + '" loading="lazy" decoding="async" width="80" height="80"></button>';
        }).join('');
        thumbs.querySelectorAll('.pdp-thumb').forEach(function (btn) {
          btn.addEventListener('click', function () {
            thumbs.querySelectorAll('.pdp-thumb').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            mainImage.src = btn.getAttribute('data-thumb');
          });
        });
      }

      // Size chips
      var selectedSize = product.sizes ? product.sizes[0] : 'Standard';
      var sizeWrap = $('pdp-size-chips');
      if (sizeWrap && product.sizes) {
        sizeWrap.innerHTML = product.sizes.map(function (sz, i) {
          return '<button class="size-chip' + (i === 0 ? ' selected' : '') + '" data-size="' + sz + '">' + sz + '</button>';
        }).join('');
        sizeWrap.querySelectorAll('.size-chip').forEach(function (chip) {
          chip.addEventListener('click', function () {
            sizeWrap.querySelectorAll('.size-chip').forEach(function (c) { c.classList.remove('selected'); });
            chip.classList.add('selected');
            selectedSize = chip.getAttribute('data-size');
            updateWhatsApp();
          });
        });
      }

      // Quantity
      var qty = 1;
      var qtyVal = $('pdp-qty-val');
      var qtyMinus = $('pdp-qty-minus');
      var qtyPlus = $('pdp-qty-plus');
      if (qtyMinus && qtyPlus && qtyVal) {
        qtyMinus.addEventListener('click', function () { if (qty > 1) { qty--; qtyVal.textContent = qty; updateWhatsApp(); } });
        qtyPlus.addEventListener('click', function () { qty++; qtyVal.textContent = qty; updateWhatsApp(); });
      }

      // WhatsApp order link with prefilled message
      var waBtn = $('pdp-whatsapp-btn');
      function updateWhatsApp() {
        if (!waBtn) return;
        var text = encodeURIComponent(
          'Hi VEGA, I would like to order: ' + product.name +
          '\nCode: ' + (product.code || '-') +
          '\nSize: ' + selectedSize +
          '\nQuantity: ' + qty +
          '\nPrice: ' + d.formatPrice(product.price * qty) +
          '\nPlease share checkout and delivery details.'
        );
        waBtn.href = 'https://wa.me/916398204040?text=' + text;
      }
      updateWhatsApp();

      // Specs table (hidden entirely when a product has no specs)
      var specsBody = $('pdp-specs-body');
      var specsTable = $('pdp-specs-table');
      if (specsBody) {
        if (product.specs && Object.keys(product.specs).length) {
          specsBody.innerHTML = Object.entries(product.specs).map(function (entry) {
            return '<tr><td>' + entry[0] + '</td><td style="color: var(--text-primary); font-weight: 500;">' + entry[1] + '</td></tr>';
          }).join('');
          if (specsTable) specsTable.hidden = false;
        } else if (specsTable) {
          specsTable.hidden = true;
        }
      }

      // Feature list in the Details accordion
      var featuresEl = $('pdp-features');
      if (featuresEl) {
        featuresEl.innerHTML = (product.features || []).map(function (f) {
          return '<li>' + f + '</li>';
        }).join('');
        featuresEl.hidden = !(product.features && product.features.length);
      }

      // Accordion: one open at a time, aria-expanded kept in sync
      document.querySelectorAll('.accordion-trigger').forEach(function (trig) {
        trig.addEventListener('click', function () {
          var item = trig.closest('.accordion-item');
          var willOpen = !item.classList.contains('open');
          document.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
            openItem.classList.remove('open');
            var t = openItem.querySelector('.accordion-trigger');
            if (t) t.setAttribute('aria-expanded', 'false');
          });
          if (willOpen) {
            item.classList.add('open');
            trig.setAttribute('aria-expanded', 'true');
          }
        });
      });

      // Related products
      var related = $('related-products-grid');
      if (related) {
        related.innerHTML = d.products.filter(function (p) { return p.id !== product.id; }).slice(0, 3)
          .map(function (p) { return VegaApp._productCardHTML(p); }).join('');
        if (window.VegaTilt) window.VegaTilt.init('[data-tilt]');
        VegaApp.revealAll();
      }
    },

    /* ------------------------------------------------------------------ */
    /* 13. Bulk inquiry page (form validation + success state)            */
    /* ------------------------------------------------------------------ */

    initBulkPage() {
      var form = document.getElementById('bulk-inquiry-form');
      if (!form) return;

      var nameInput = document.getElementById('bulk-name');
      var emailInput = document.getElementById('bulk-email');
      var messageInput = document.getElementById('bulk-query');
      var gstInput = document.getElementById('bulk-gst');      // optional, may not exist
      var phoneInput = document.getElementById('bulk-phone');  // optional, may not exist
      var orgInput = document.getElementById('bulk-org');      // optional, may not exist
      var successCard = document.getElementById('bulk-success-state');
      var formCard = document.getElementById('bulk-form-wrapper');

      var validEmail = function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      };

      var setError = function (input, hasError) {
        if (!input) return;
        var group = input.closest('.form-group');
        if (group) group.classList.toggle('has-error', hasError);
      };

      var validate = function (input) {
        if (!input) return true;
        if (input === emailInput) return validEmail(input.value.trim());
        if (input === gstInput) return true; // GST is optional
        return input.value.trim().length > 0;
      };

      [nameInput, emailInput, gstInput, phoneInput, orgInput, messageInput].forEach(function (inp) {
        if (!inp) return;
        inp.addEventListener('blur', function () { setError(inp, !validate(inp)); });
        inp.addEventListener('input', function () { setError(inp, false); });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var ok = true;
        [nameInput, emailInput, phoneInput, orgInput, messageInput].forEach(function (inp) {
          var valid = validate(inp);
          setError(inp, !valid); // set AND clear, so stale errors never linger
          if (!valid) ok = false;
        });
        if (!ok) return;

        var refEl = document.getElementById('success-ticket-id');
        if (refEl) refEl.textContent = 'VEGA-B2B-' + Math.floor(10000 + Math.random() * 90000);

        if (formCard) formCard.style.display = 'none';
        if (successCard) {
          successCard.classList.add('active');
          successCard.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
        }
      });
    },

    /* ------------------------------------------------------------------ */
    /* Data helper: window.VegaData (canonical) with legacy fallback      */
    /* ------------------------------------------------------------------ */

    data() {
      return window.VegaData || window.VEGA_DATA || null;
    }
  };

  /* -------------------------------------------------------------------- */
  /* Bootstrap                                                             */
  /* -------------------------------------------------------------------- */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { VegaApp.init(); });
  } else {
    VegaApp.init();
  }

  window.VegaApp = VegaApp;
})();

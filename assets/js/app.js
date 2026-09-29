/**
 * VEGA REDESIGN - MAIN APPLICATION ORCHESTRATOR
 * Orchestrates:
 * 1. Navbar: Transparent over hero, solid dark glass on scroll
 * 2. Scroll Story: Pinned text revealing line by line
 * 3. Cric Sox Pinned Block: Image scaling & parallax on scroll
 * 4. Product Page: Hover zoom, size selector, qty, WhatsApp prefilled message, accordions
 * 5. Collection Page: Category filters, sorting, staggered entrance reveal
 * 6. Bulk Inquiry Page: Form validation, success state, WhatsApp alternative
 */

(function () {
  const VegaApp = {
    lenis: null,

    init() {
      this.initSmoothScroll();
      this.initNavbar();
      this.initScrollStory();
      this.initCricSoxScroll();
      this.initMobileNav();
      this.markActiveNavLink();
      this.initProductPage();
      this.initCollectionPage();
      this.initBulkPage();
      this.initHomePageBestSellers();
      this.initTeamsStrip();
    },

    /**
     * Smooth scroll setup with Lenis
     */
    initSmoothScroll() {
      if (typeof Lenis !== 'undefined') {
        try {
          this.lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
            smoothTouch: false
          });

          const raf = (time) => {
            this.lenis.raf(time);
            requestAnimationFrame(raf);
          };
          requestAnimationFrame(raf);
        } catch (e) {
          console.warn('Lenis scroll warning:', e);
        }
      }
    },

    /**
     * Navbar: Transparent over hero, solid dark glass on scroll
     */
    initNavbar() {
      const nav = document.querySelector('.site-nav');
      if (!nav) return;

      const handleScroll = () => {
        if (window.scrollY > 40) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    },

    /**
     * Scroll story: Pinned container with text that reveals line by line
     */
    initScrollStory() {
      const storySection = document.querySelector('.scroll-story-section');
      if (!storySection) return;

      const lines = storySection.querySelectorAll('.story-line');
      if (!lines.length) return;

      const updateStory = () => {
        const rect = storySection.getBoundingClientRect();
        const sectionHeight = storySection.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Progress from 0 when section hits top to 1 when leaving
        const scrolled = -rect.top;
        const totalScrollable = sectionHeight - viewportHeight;

        if (scrolled >= 0 && scrolled <= totalScrollable) {
          const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
          const activeIndex = Math.min(lines.length - 1, Math.floor(progress * lines.length * 1.15));

          lines.forEach((line, index) => {
            if (index <= activeIndex) {
              line.classList.add('active');
            } else {
              line.classList.remove('active');
            }
          });
        } else if (scrolled < 0) {
          lines.forEach((line, i) => {
            if (i === 0) line.classList.add('active');
            else line.classList.remove('active');
          });
        } else {
          lines.forEach(line => line.classList.add('active'));
        }
      };

      window.addEventListener('scroll', updateStory, { passive: true });
      updateStory();
    },

    /**
     * Cric Sox feature: Pinned block, sock image scales and parallaxes
     */
    initCricSoxScroll() {
      const soxSection = document.querySelector('.cric-sox-section');
      if (!soxSection) return;

      const soxImage = soxSection.querySelector('.cric-sox-image');
      if (!soxImage) return;

      const updateSox = () => {
        const rect = soxSection.getBoundingClientRect();
        const sectionHeight = soxSection.offsetHeight;
        const viewportHeight = window.innerHeight;

        const scrolled = -rect.top;
        const total = sectionHeight - viewportHeight;

        if (scrolled >= -viewportHeight && scrolled <= total + viewportHeight) {
          const progress = Math.max(0, Math.min(1, scrolled / total));
          // Scale smoothly from 1.0 to 1.25, with subtle rotation parallax
          const scale = 1.0 + (progress * 0.24);
          const translateY = (progress - 0.5) * -40;
          const rotate = (progress - 0.5) * 6;
          soxImage.style.transform = `scale(${scale}) translateY(${translateY}px) rotate(${rotate}deg)`;
        }
      };

      window.addEventListener('scroll', updateSox, { passive: true });
      updateSox();
    },

    /**
     * Infinite Teams Worldwide Strip cloning for seamless marquee loop
     */
    initTeamsStrip() {
      const track = document.getElementById('teams-strip-track');
      if (!track) return;

      // Duplicate cards to guarantee seamless infinite loop
      const cards = Array.from(track.children);
      cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
      });
    },

    /**
     * Home Page Best Sellers Renderer (3 3D Tilt Cards)
     */
    initHomePageBestSellers() {
      const container = document.getElementById('best-sellers-grid');
      if (!container || !window.VEGA_DATA) return;

      const bestSellerIds = ['vega-cric-sox', 'vega-exode-tactical-shorts', 'vega-cricket-match-whites'];
      const products = bestSellerIds.map(id => window.VEGA_DATA.getProductById(id)).filter(Boolean);

      container.innerHTML = products.map((product, idx) => `
        <article class="product-card tilt-card" data-tilt data-id="${product.id}" style="animation-delay: ${idx * 0.15}s;">
          <div class="product-badge-group">
            <span class="badge badge-${product.badgeType || 'ignite'}">${product.badge || 'Best Seller'}</span>
            <span class="badge badge-outline">${product.categoryName}</span>
          </div>

          <div class="card-media">
            <a href="product.html?id=${product.id}">
              <img src="${product.image}" alt="${product.name}" loading="lazy">
            </a>
          </div>

          <div class="card-meta">
            <span>${product.categoryName}</span>
            <div class="card-rating">
              ★ <span>${product.rating}</span> <span style="color: var(--text-muted); font-size: 11px;">(${product.reviewsCount})</span>
            </div>
          </div>

          <h3 class="card-title">
            <a href="product.html?id=${product.id}">${product.name}</a>
          </h3>
          <p class="card-desc">${product.tagline}</p>

          <div class="card-footer">
            <div class="price-box">
              <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
              ${product.originalPrice ? `<span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            </div>
            <button class="card-quick-add" data-add-to-cart="${product.id}" aria-label="Add ${product.name} to gear bag">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>
        </article>
      `).join('');

      if (window.initTiltCards) {
        window.initTiltCards();
      }
    },

    /**
     * Collection Page: Filters, Sorting & Staggered Reveal
     */
    initCollectionPage() {
      const grid = document.getElementById('collection-products-grid');
      if (!grid || !window.VEGA_DATA) return;

      const urlParams = new URLSearchParams(window.location.search);
      let activeCategory = urlParams.get('category') || 'all';
      let activeSort = 'featured';

      const filterChips = document.querySelectorAll('.filter-pill[data-filter]');
      const sortSelect = document.getElementById('collection-sort-select');
      const countEl = document.getElementById('collection-count-val');

      const render = () => {
        let products = window.VEGA_DATA.getProductsByCategory(activeCategory);

        // Sorting logic
        if (activeSort === 'price-low') {
          products = [...products].sort((a, b) => a.price - b.price);
        } else if (activeSort === 'price-high') {
          products = [...products].sort((a, b) => b.price - a.price);
        } else if (activeSort === 'rating') {
          products = [...products].sort((a, b) => b.rating - a.rating);
        } else if (activeSort === 'name') {
          products = [...products].sort((a, b) => a.name.localeCompare(b.name));
        }

        if (countEl) countEl.textContent = `${products.length} Products`;

        grid.innerHTML = products.map((product, idx) => `
          <article class="product-card tilt-card staggered-entry" data-tilt data-id="${product.id}" style="animation-delay: ${idx * 0.06}s;">
            <div class="product-badge-group">
              <span class="badge badge-${product.badgeType || 'ignite'}">${product.badge || 'Pro'}</span>
              <span class="badge badge-outline">${product.categoryName}</span>
            </div>

            <div class="card-media">
              <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
              </a>
            </div>

            <div class="card-meta">
              <span>${product.categoryName}</span>
              <div class="card-rating">
                ★ <span>${product.rating}</span>
              </div>
            </div>

            <h3 class="card-title">
              <a href="product.html?id=${product.id}">${product.name}</a>
            </h3>
            <p class="card-desc">${product.tagline}</p>

            <div class="card-footer">
              <div class="price-box">
                <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
                ${product.originalPrice ? `<span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
              </div>
              <button class="card-quick-add" data-add-to-cart="${product.id}" aria-label="Add to cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
            </div>
          </article>
        `).join('');

        if (window.initTiltCards) {
          window.initTiltCards();
        }
      };

      filterChips.forEach(chip => {
        if (chip.getAttribute('data-filter') === activeCategory) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }

        chip.addEventListener('click', (e) => {
          e.preventDefault();
          filterChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          activeCategory = chip.getAttribute('data-filter');
          window.history.replaceState({}, '', `collection.html?category=${activeCategory}`);
          render();
        });
      });

      if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
          activeSort = e.target.value;
          render();
        });
      }

      render();
    },

    /**
     * Product Detail Page: Gallery zoom, Sticky buy panel, Size, Qty, WhatsApp CTA, Accordion
     */
    initProductPage() {
      const pdpContainer = document.getElementById('pdp-page-container');
      if (!pdpContainer || !window.VEGA_DATA) return;

      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id') || 'vega-cric-sox';
      const product = window.VEGA_DATA.getProductById(productId) || window.VEGA_DATA.products[0];

      // Update page title
      document.title = `${product.name} | VEGA Cricket & Performance`;

      // Render product details
      const titleEl = document.getElementById('pdp-title');
      const taglineEl = document.getElementById('pdp-tagline');
      const priceCurrent = document.getElementById('pdp-price-current');
      const priceOrig = document.getElementById('pdp-price-original');
      const ratingEl = document.getElementById('pdp-rating-val');
      const descEl = document.getElementById('pdp-description');
      const mainImageEl = document.getElementById('pdp-main-img');
      const thumbsContainer = document.getElementById('pdp-thumbs-list');
      const sizeChipsContainer = document.getElementById('pdp-size-chips');
      const specsTable = document.getElementById('pdp-specs-body');
      const whatsappBtn = document.getElementById('pdp-whatsapp-btn');
      const addToCartBtn = document.getElementById('pdp-add-to-cart-btn');

      if (titleEl) titleEl.textContent = product.name;
      if (taglineEl) taglineEl.textContent = product.tagline;
      if (priceCurrent) priceCurrent.textContent = `₹${product.price.toLocaleString('en-IN')}`;
      if (priceOrig) {
        priceOrig.textContent = product.originalPrice ? `₹${product.originalPrice.toLocaleString('en-IN')}` : '';
      }
      if (ratingEl) ratingEl.textContent = `${product.rating} (${product.reviewsCount} reviews)`;
      if (descEl) descEl.textContent = product.description;

      // Gallery Images & Zoom
      let selectedImage = product.image;
      if (mainImageEl) {
        mainImageEl.src = selectedImage;
        mainImageEl.alt = product.name;

        // Hover Zoom effect
        const mainImageContainer = document.getElementById('pdp-main-image-container');
        if (mainImageContainer) {
          mainImageContainer.addEventListener('mousemove', (e) => {
            const rect = mainImageContainer.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            mainImageContainer.classList.add('zoomed');
            mainImageEl.style.transformOrigin = `${x}% ${y}%`;
          });

          mainImageContainer.addEventListener('mouseleave', () => {
            mainImageContainer.classList.remove('zoomed');
            mainImageEl.style.transformOrigin = 'center center';
          });
        }
      }

      // Thumbnails
      if (thumbsContainer && product.images) {
        thumbsContainer.innerHTML = product.images.map((imgUrl, i) => `
          <button class="pdp-thumb ${i === 0 ? 'active' : ''}" data-thumb="${imgUrl}">
            <img src="${imgUrl}" alt="${product.name} view ${i + 1}">
          </button>
        `).join('');

        thumbsContainer.querySelectorAll('.pdp-thumb').forEach(btn => {
          btn.addEventListener('click', () => {
            thumbsContainer.querySelectorAll('.pdp-thumb').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const newSrc = btn.getAttribute('data-thumb');
            mainImageEl.src = newSrc;
          });
        });
      }

      // Size Chips
      let selectedSize = product.sizes ? product.sizes[0] : 'Standard';
      if (sizeChipsContainer && product.sizes) {
        sizeChipsContainer.innerHTML = product.sizes.map((sz, i) => `
          <button class="size-chip ${i === 0 ? 'selected' : ''}" data-size="${sz}">${sz}</button>
        `).join('');

        sizeChipsContainer.querySelectorAll('.size-chip').forEach(chip => {
          chip.addEventListener('click', () => {
            sizeChipsContainer.querySelectorAll('.size-chip').forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
            selectedSize = chip.getAttribute('data-size');
            updateWhatsAppLink();
          });
        });
      }

      // Quantity selector
      let qty = 1;
      const qtyValEl = document.getElementById('pdp-qty-val');
      const qtyMinus = document.getElementById('pdp-qty-minus');
      const qtyPlus = document.getElementById('pdp-qty-plus');

      if (qtyMinus && qtyPlus && qtyValEl) {
        qtyMinus.addEventListener('click', () => {
          if (qty > 1) {
            qty--;
            qtyValEl.textContent = qty;
            updateWhatsAppLink();
          }
        });
        qtyPlus.addEventListener('click', () => {
          qty++;
          qtyValEl.textContent = qty;
          updateWhatsAppLink();
        });
      }

      // WhatsApp Button with prefilled message
      function updateWhatsAppLink() {
        if (!whatsappBtn) return;
        const phone = '919876543210';
        const text = encodeURIComponent(
          `Hi VEGA, I would like to order: ${product.name}\nSize: ${selectedSize}\nQuantity: ${qty}\nPrice: ₹${(product.price * qty).toLocaleString('en-IN')}\nPlease share checkout and delivery details.`
        );
        whatsappBtn.href = `https://wa.me/${phone}?text=${text}`;
        whatsappBtn.target = '_blank';
      }
      updateWhatsAppLink();

      // Add to Cart Action
      if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
          if (window.cartStore) {
            window.cartStore.addItem(product.id, {
              size: selectedSize,
              qty: qty
            });
          }
        });
      }

      // Tech Specs Table
      if (specsTable && product.specs) {
        specsTable.innerHTML = Object.entries(product.specs).map(([key, value]) => `
          <tr>
            <td>${key}</td>
            <td style="color: var(--text-primary); font-weight: 500;">${value}</td>
          </tr>
        `).join('');
      }

      // Details Accordion
      const accordionTriggers = document.querySelectorAll('.accordion-trigger');
      accordionTriggers.forEach(trig => {
        trig.addEventListener('click', () => {
          const item = trig.closest('.accordion-item');
          item.classList.toggle('open');
        });
      });

      // Related Products
      const relatedGrid = document.getElementById('related-products-grid');
      if (relatedGrid) {
        const related = window.VEGA_DATA.products.filter(p => p.id !== product.id).slice(0, 3);
        relatedGrid.innerHTML = related.map((p, idx) => `
          <article class="product-card tilt-card" data-tilt data-id="${p.id}" style="animation-delay: ${idx * 0.1}s;">
            <div class="product-badge-group">
              <span class="badge badge-${p.badgeType || 'ignite'}">${p.badge || 'Pro'}</span>
            </div>
            <div class="card-media">
              <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
            </div>
            <div class="card-meta">
              <span>${p.categoryName}</span>
              <div class="card-rating">★ <span>${p.rating}</span></div>
            </div>
            <h3 class="card-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
            <div class="card-footer">
              <div class="price-box"><span class="price-current">₹${p.price.toLocaleString('en-IN')}</span></div>
              <button class="card-quick-add" data-add-to-cart="${p.id}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
          </article>
        `).join('');

        if (window.initTiltCards) window.initTiltCards();
      }
    },

    /**
     * Bulk Inquiry Page: Form validation, Success state, WhatsApp alternative
     */
    initBulkPage() {
      const form = document.getElementById('bulk-inquiry-form');
      if (!form) return;

      const nameInput = document.getElementById('bulk-name');
      const emailInput = document.getElementById('bulk-email');
      const phoneInput = document.getElementById('bulk-phone');
      const orgInput = document.getElementById('bulk-org');
      const messageInput = document.getElementById('bulk-query');
      const successCard = document.getElementById('bulk-success-state');
      const formCard = document.getElementById('bulk-form-wrapper');

      function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }

      function setFieldError(input, hasError) {
        const group = input.closest('.form-group');
        if (!group) return;
        if (hasError) {
          group.classList.add('has-error');
        } else {
          group.classList.remove('has-error');
        }
      }

      [nameInput, emailInput, phoneInput, orgInput, messageInput].forEach(inp => {
        if (!inp) return;
        inp.addEventListener('blur', () => {
          if (inp === emailInput) {
            setFieldError(inp, !validateEmail(inp.value.trim()));
          } else {
            setFieldError(inp, inp.value.trim().length === 0);
          }
        });
        inp.addEventListener('input', () => {
          setFieldError(inp, false);
        });
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        if (!nameInput.value.trim()) { setFieldError(nameInput, true); isValid = false; }
        if (!validateEmail(emailInput.value.trim())) { setFieldError(emailInput, true); isValid = false; }
        if (!phoneInput.value.trim()) { setFieldError(phoneInput, true); isValid = false; }
        if (!orgInput.value.trim()) { setFieldError(orgInput, true); isValid = false; }
        if (!messageInput.value.trim()) { setFieldError(messageInput, true); isValid = false; }

        if (!isValid) {
          if (window.cartStore) window.cartStore.showToast('Please correct the highlighted fields.');
          return;
        }

        // Show Success State
        const refId = `VEGA-B2B-${Math.floor(10000 + Math.random() * 90000)}`;
        const refEl = document.getElementById('success-ticket-id');
        if (refEl) refEl.textContent = refId;

        if (formCard) formCard.style.display = 'none';
        if (successCard) {
          successCard.classList.add('active');
          successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    },

    /**
     * Mobile Menu Navigation
     */
    initMobileNav() {
      const toggle = document.querySelector('.mobile-toggle');
      const mobileNav = document.getElementById('mobile-nav-menu');
      if (!toggle || !mobileNav) return;

      toggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    },

    /**
     * Mark active navigation link
     */
    markActiveNavLink() {
      const currentPath = window.location.pathname;
      const links = document.querySelectorAll('.nav-link');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPath || (href !== '/' && currentPath.endsWith(href)))) {
          link.classList.add('active');
        }
      });
    }
  };

  // Auto initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => VegaApp.init());
  } else {
    VegaApp.init();
  }

  window.VegaApp = VegaApp;
})();

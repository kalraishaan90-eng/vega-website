/**
 * VEGA REDESIGN - CART STORE & DRAWER CONTROLLER
 * Manages localStorage cart items, slide-in drawer state, free shipping progress bar,
 * subtotal calculations, and demo checkout modal.
 */

(function () {
  const STORAGE_KEY = 'vega_cart_v2';
  const FREE_SHIPPING_THRESHOLD = 999;

  const cartStore = {
    items: [],

    init() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        this.items = saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error('Failed to load cart from storage:', e);
        this.items = [];
      }
      this.syncUI();
      this.bindEvents();
    },

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      } catch (e) {
        console.error('Failed to save cart to storage:', e);
      }
      this.syncUI();
      window.dispatchEvent(new CustomEvent('vega:cart-updated', {
        detail: {
          items: this.items,
          count: this.getCount(),
          subtotal: this.getSubtotal()
        }
      }));
    },

    addItem(productId, options = {}) {
      if (!window.VEGA_DATA) return;
      const product = window.VEGA_DATA.getProductById(productId);
      if (!product) return;

      const size = options.size || (product.sizes ? product.sizes[0] : 'Standard');
      const color = options.color || (product.colors ? product.colors[0].name : 'Default');
      const qty = parseInt(options.qty, 10) || 1;
      const cartItemId = `${productId}__${size}__${color}`;

      const existingIndex = this.items.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        this.items[existingIndex].qty += qty;
      } else {
        this.items.push({
          id: cartItemId,
          productId: product.id,
          name: product.name,
          categoryName: product.categoryName,
          price: product.price,
          image: product.image,
          size: size,
          color: color,
          qty: qty
        });
      }

      this.save();
      this.showToast(`Added ${product.name} to gear bag`);
      cartDrawer.open();
    },

    removeItem(cartItemId) {
      this.items = this.items.filter(item => item.id !== cartItemId);
      this.save();
    },

    updateQty(cartItemId, delta) {
      const item = this.items.find(i => i.id === cartItemId);
      if (!item) return;

      item.qty += delta;
      if (item.qty <= 0) {
        this.removeItem(cartItemId);
      } else {
        this.save();
      }
    },

    clear() {
      this.items = [];
      this.save();
    },

    getCount() {
      return this.items.reduce((sum, item) => sum + item.qty, 0);
    },

    getSubtotal() {
      return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    },

    showToast(message) {
      let container = document.getElementById('vega-toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'vega-toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }

      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FE492A" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
      `;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    },

    syncUI() {
      const count = this.getCount();
      const subtotal = this.getSubtotal();

      // Update badge counts across navbar
      const badges = document.querySelectorAll('.cart-badge, #cart-badge-count');
      badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      });

      // Update drawer count and subtotal
      const drawerCount = document.getElementById('drawer-item-count');
      if (drawerCount) drawerCount.textContent = count;

      const drawerSubtotal = document.getElementById('drawer-subtotal-price');
      if (drawerSubtotal) {
        drawerSubtotal.textContent = '₹' + subtotal.toLocaleString('en-IN');
      }

      // Update Free Shipping Progress Bar
      this.updateShippingBars(subtotal);

      // Render Drawer Item List
      const itemsList = document.getElementById('drawer-items-list');
      if (itemsList) {
        if (this.items.length === 0) {
          itemsList.innerHTML = `
            <div style="text-align: center; padding: 48px 16px; color: var(--frost);">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 16px; opacity: 0.5;">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p style="font-size: 15px; color: var(--brume); margin-bottom: 8px;">Your Gear Bag is Empty</p>
              <p style="font-size: 13px;">Add tournament match whites, Cric Sox, or EXODE apparel to start.</p>
              <a href="collection.html" class="btn btn-secondary btn-sm" style="margin-top: 16px;">Explore Collection</a>
            </div>
          `;
        } else {
          itemsList.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
              <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
              </div>
              <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-variant">${item.size} • ${item.color}</div>
                <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
                <div class="qty-control">
                  <button class="qty-btn" data-qty-delta="-1" data-id="${item.id}" aria-label="Decrease">&minus;</button>
                  <span class="qty-value">${item.qty}</span>
                  <button class="qty-btn" data-qty-delta="1" data-id="${item.id}" aria-label="Increase">&plus;</button>
                </div>
              </div>
              <button class="cart-item-remove" data-remove-id="${item.id}" aria-label="Remove item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          `).join('');
        }
      }

      // Render full cart.html view if on cart page
      if (document.getElementById('cart-page-items')) {
        this.renderFullCartPage(subtotal);
      }
    },

    updateShippingBars(subtotal) {
      const bars = document.querySelectorAll('.shipping-bar-fill');
      const textEls = document.querySelectorAll('.shipping-bar-text');

      const percent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
      const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

      bars.forEach(bar => {
        bar.style.width = `${percent}%`;
        if (percent >= 100) {
          bar.classList.add('unlocked');
        } else {
          bar.classList.remove('unlocked');
        }
      });

      textEls.forEach(el => {
        if (remaining > 0) {
          el.innerHTML = `Add <strong style="color: var(--ignite);">₹${remaining.toLocaleString('en-IN')}</strong> more for <strong style="color: #fff;">FREE Shipping</strong> across India`;
        } else {
          el.innerHTML = `🎉 <strong style="color: #2ecc71;">Congratulations!</strong> You have unlocked FREE Express Delivery!`;
        }
      });
    },

    renderFullCartPage(subtotal) {
      const container = document.getElementById('cart-page-items');
      const subtotalEl = document.getElementById('cart-subtotal-val');
      const totalEl = document.getElementById('cart-total-val');
      const shippingEl = document.getElementById('cart-shipping-val');
      if (!container) return;

      if (this.items.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 60px 20px; background: var(--bg-surface); border-radius: var(--radius-card); border: 1px solid var(--border-subtle);">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 16px; opacity: 0.4;">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h3 style="font-size: 1.5rem; margin-bottom: 8px;">Your Gear Bag is Empty</h3>
            <p style="color: var(--text-muted); margin-bottom: 24px;">Discover international standard cricket match wear, Cric Sox, and training apparel.</p>
            <a href="collection.html" class="btn btn-primary">Browse All Collections &rarr;</a>
          </div>
        `;
        if (subtotalEl) subtotalEl.textContent = '₹0';
        if (shippingEl) shippingEl.textContent = '₹0';
        if (totalEl) totalEl.textContent = '₹0';
        return;
      }

      container.innerHTML = this.items.map(item => `
        <div class="cart-item" style="padding: 16px; margin-bottom: 12px; grid-template-columns: 90px 1fr auto;" data-id="${item.id}">
          <div class="cart-item-img" style="width: 90px; height: 90px;">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <h4 style="font-size: 16px; margin-bottom: 4px;">${item.name}</h4>
            <div class="cart-item-variant">${item.size} • ${item.color}</div>
            <div class="cart-item-price" style="font-size: 16px; margin-top: 4px;">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
            <div class="qty-control" style="margin-top: 8px;">
              <button class="qty-btn" data-qty-delta="-1" data-id="${item.id}">&minus;</button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn" data-qty-delta="1" data-id="${item.id}">&plus;</button>
            </div>
          </div>
          <button class="cart-item-remove" data-remove-id="${item.id}" title="Remove Item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `).join('');

      const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 99;
      const total = subtotal + shipping;

      if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');
      if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : '₹' + shipping;
      if (totalEl) totalEl.textContent = '₹' + total.toLocaleString('en-IN');
    },

    bindEvents() {
      // Delegated Quick Add to Cart
      document.addEventListener('click', (e) => {
        const addBtn = e.target.closest('[data-add-to-cart]');
        if (addBtn) {
          e.preventDefault();
          const productId = addBtn.getAttribute('data-add-to-cart');
          this.addItem(productId);
          return;
        }

        // Drawer quantity buttons
        const qtyBtn = e.target.closest('[data-qty-delta]');
        if (qtyBtn) {
          e.preventDefault();
          const id = qtyBtn.getAttribute('data-id');
          const delta = parseInt(qtyBtn.getAttribute('data-qty-delta'), 10);
          this.updateQty(id, delta);
          return;
        }

        // Drawer remove button
        const removeBtn = e.target.closest('[data-remove-id]');
        if (removeBtn) {
          e.preventDefault();
          const id = removeBtn.getAttribute('data-remove-id');
          this.removeItem(id);
          return;
        }

        // Demo checkout triggers
        const checkoutBtn = e.target.closest('.btn-checkout-demo, #drawer-fast-checkout, #checkout-proceed-btn');
        if (checkoutBtn) {
          e.preventDefault();
          this.triggerDemoCheckout();
          return;
        }

        // Close demo modal
        const closeDemoBtn = e.target.closest('#demo-modal-close-btn, .demo-modal-overlay');
        if (closeDemoBtn && (!e.target.closest('.demo-modal-card') || e.target.id === 'demo-modal-close-btn')) {
          this.closeDemoCheckout();
          return;
        }
      });
    },

    triggerDemoCheckout() {
      if (this.items.length === 0) {
        this.showToast('Your gear bag is empty! Add products first.');
        return;
      }

      let modal = document.getElementById('demo-checkout-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'demo-checkout-modal';
        modal.className = 'demo-modal-overlay';
        modal.innerHTML = `
          <div class="demo-modal-card">
            <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(var(--ignite-rgb), 0.15); border: 2px solid var(--ignite); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: var(--ignite);">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 6px;">Demo Order Reserved!</h3>
            <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">
              Thank you for exploring VEGA. This is a functional prototype checkout.
            </p>
            <div style="background: rgba(14, 13, 14, 0.6); padding: 14px; border-radius: 8px; border: 1px solid var(--border-subtle); text-align: left; font-family: var(--font-mono); font-size: 13px; margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--text-muted);">Order ID:</span>
                <span style="color: var(--ignite); font-weight: bold;">#VG-${Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--text-muted);">Items Ordered:</span>
                <span>${this.getCount()} units</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Total Amount:</span>
                <span style="color: var(--text-primary); font-weight: bold;">₹${this.getSubtotal().toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button class="btn btn-primary w-full" id="demo-modal-close-btn">Continue Exploring VEGA</button>
          </div>
        `;
        document.body.appendChild(modal);
      } else {
        // Update values in existing modal
        const card = modal.querySelector('.demo-modal-card');
        if (card) {
          card.querySelector('span[style*="font-weight: bold;"]:last-child').textContent = '₹' + this.getSubtotal().toLocaleString('en-IN');
        }
      }

      modal.classList.add('active');
      cartDrawer.close();
    },

    closeDemoCheckout() {
      const modal = document.getElementById('demo-checkout-modal');
      if (modal) {
        modal.classList.remove('active');
      }
    }
  };

  // Cart Drawer UI Management
  const cartDrawer = {
    overlay: null,
    drawer: null,

    init() {
      this.overlay = document.getElementById('cart-drawer-overlay');
      this.drawer = document.getElementById('cart-drawer');

      document.querySelectorAll('.cart-trigger, #cart-drawer-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggle();
        });
      });

      const closeBtn = document.getElementById('drawer-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close());
      }

      if (this.overlay) {
        this.overlay.addEventListener('click', () => this.close());
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.close();
        }
      });
    },

    open() {
      if (this.overlay && this.drawer) {
        this.overlay.classList.add('active');
        this.drawer.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },

    close() {
      if (this.overlay && this.drawer) {
        this.overlay.classList.remove('active');
        this.drawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    toggle() {
      if (this.isOpen()) {
        this.close();
      } else {
        this.open();
      }
    },

    isOpen() {
      return this.drawer && this.drawer.classList.contains('active');
    }
  };

  // Attach globally
  window.cartStore = cartStore;
  window.cartDrawer = cartDrawer;

  document.addEventListener('DOMContentLoaded', () => {
    cartStore.init();
    cartDrawer.init();
  });
})();

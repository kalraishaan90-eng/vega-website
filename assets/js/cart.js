/**
 * VEGA REDESIGN - CART STORE & DRAWER CONTROLLER
 * Manages localStorage cart items, drawer state, and real-time updates
 */

(function () {
  const STORAGE_KEY = 'vega_cart_v1';

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
      }, 3200);
    },

    syncUI() {
      // Update badge counts
      const count = this.getCount();
      const badges = document.querySelectorAll('.cart-badge, #cart-badge-count');
      badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      });

      // Update drawer UI if present
      const drawerCount = document.getElementById('drawer-item-count');
      if (drawerCount) drawerCount.textContent = count;

      const drawerSubtotal = document.getElementById('drawer-subtotal-price');
      if (drawerSubtotal) {
        drawerSubtotal.textContent = '₹' + this.getSubtotal().toLocaleString('en-IN');
      }

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
              <p style="font-size: 13px;">Add track-tested helmets and riding gear to get started.</p>
              <a href="collection.html" class="btn btn-secondary btn-sm" style="margin-top: 16px;">Browse Helmets</a>
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
    },

    bindEvents() {
      // Global delegated quick add to cart
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
      });
    }
  };

  // Cart Drawer UI Management
  const cartDrawer = {
    overlay: null,
    drawer: null,

    init() {
      this.overlay = document.getElementById('cart-drawer-overlay');
      this.drawer = document.getElementById('cart-drawer');

      // Bind trigger buttons
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

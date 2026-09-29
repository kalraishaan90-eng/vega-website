/**
 * VEGA REDESIGN — CART SYSTEM (window.VegaCart)
 *
 * Contract (docs/COMPONENTS.md §4.2):
 *   VegaCart.add(id, {size, qty})   add(id) alone uses the product's first size
 *   VegaCart.remove(key)            remove one line (key = id__size)
 *   VegaCart.setQty(key, qty)       qty <= 0 removes the line
 *   VegaCart.clear()
 *   VegaCart.getItems()             copy of the line items
 *   VegaCart.getTotal()             sum(price * qty) in paise-free INR integers
 *   VegaCart.subscribe(fn)          fn(snapshot) on every change; returns unsubscribe
 *
 * Storage: localStorage 'vega_cart_v2', every access wrapped in try/catch.
 * Drawer: injected once per page by this file (static #cart-drawer markup on
 * older pages is adopted instead). Checkout is a demo toast.
 * Legacy aliases kept alive: window.cartStore, window.cartDrawer.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'vega_cart_v2';
  var FREE_SHIPPING_THRESHOLD = 999; // ₹, demo threshold
  var TOAST_MS = 3200;

  var state = { items: [] };
  var subscribers = [];
  var drawer = { root: null, overlay: null };

  /* ------------------------------------------------------------------ */
  /* Storage (safe)                                                     */
  /* ------------------------------------------------------------------ */

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      state.items = Array.isArray(parsed) ? parsed.map(normalizeItem) : [];
    } catch (e) {
      console.warn('[vega-cart] Could not read saved cart:', e);
      state.items = [];
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) {
      console.warn('[vega-cart] Could not save cart:', e);
    }
  }

  /** Accept both the new line shape and the legacy cartStore shape. */
  function normalizeItem(item) {
    if (!item || typeof item !== 'object') return null;
    var key = item.key || item.id || '';
    var id = item.id && item.id.indexOf('__') === -1 ? item.id : (item.productId || String(key).split('__')[0]);
    return {
      key: key || id + '__Standard',
      id: id,
      name: item.name || id,
      code: item.code || '',
      image: item.image || '',
      price: Number(item.price) || 0,
      size: item.size || 'Standard',
      color: item.color || '',
      qty: Math.max(1, parseInt(item.qty, 10) || 1)
    };
  }

  /* ------------------------------------------------------------------ */
  /* Data helper                                                        */
  /* ------------------------------------------------------------------ */

  function productById(id) {
    var d = window.VegaData || window.VEGA_DATA;
    if (!d || !id) return null;
    if (typeof d.getProductById === 'function') return d.getProductById(id);
    return (d.products || []).filter(function (p) { return p.id === id; })[0] || null;
  }

  function makeKey(id, size) {
    return id + '__' + (size || 'Standard');
  }

  /* ------------------------------------------------------------------ */
  /* Core store                                                         */
  /* ------------------------------------------------------------------ */

  /**
   * add(id, {size, qty})  — used by data-add-to-cart buttons
   * add({id, size, qty})  — the documented VegaCart contract (product.html)
   */
  function add(idOrPayload, options) {
    var payload;
    if (idOrPayload && typeof idOrPayload === 'object') {
      payload = idOrPayload;
    } else {
      payload = Object.assign({ id: idOrPayload }, options || {});
    }

    var product = productById(payload.id);
    if (!product) {
      toast('Sorry — that product could not be found.');
      return null;
    }

    var size = payload.size || (product.sizes && product.sizes[0]) || 'Standard';
    var qty = Math.max(1, parseInt(payload.qty, 10) || 1);
    var key = makeKey(product.id, size);

    var line = null;
    for (var i = 0; i < state.items.length; i++) {
      if (state.items[i].key === key) { line = state.items[i]; break; }
    }

    if (line) {
      line.qty += qty;
    } else {
      line = {
        key: key,
        id: product.id,
        name: product.name,
        code: product.code || '',
        image: product.image || '',
        price: Number(product.price) || 0,
        size: size,
        color: payload.color || '',
        qty: qty
      };
      state.items.push(line);
    }

    persist();
    emit('add');
    toast('Added ' + product.name + ' to your gear bag');
    openDrawer();
    return key;
  }

  function remove(key) {
    var before = state.items.length;
    state.items = state.items.filter(function (item) { return item.key !== key; });
    if (state.items.length !== before) {
      persist();
      emit('remove');
    }
  }

  function setQty(key, qty) {
    var line = null;
    for (var i = 0; i < state.items.length; i++) {
      if (state.items[i].key === key) { line = state.items[i]; break; }
    }
    if (!line) return;

    qty = parseInt(qty, 10);
    if (isNaN(qty) || qty <= 0) {
      remove(key);
      return;
    }
    if (line.qty === qty) return;

    line.qty = qty;
    persist();
    emit('qty');
  }

  function clear() {
    if (!state.items.length) return;
    state.items = [];
    persist();
    emit('clear');
  }

  function getItems() {
    return state.items.map(function (item) { return Object.assign({}, item); });
  }

  function getCount() {
    return state.items.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function getTotal() {
    return state.items.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
  }

  function getSnapshot() {
    return {
      items: getItems(),
      count: getCount(),
      total: getTotal(),
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD
    };
  }

  function subscribe(fn) {
    if (typeof fn !== 'function') return function () {};
    subscribers.push(fn);
    return function unsubscribe() {
      subscribers = subscribers.filter(function (s) { return s !== fn; });
    };
  }

  function emit(type) {
    var snapshot = getSnapshot();
    subscribers.forEach(function (fn) {
      try { fn(snapshot, type); } catch (e) { console.warn('[vega-cart] subscriber error:', e); }
    });
    try {
      window.dispatchEvent(new CustomEvent('vega:cart-updated', { detail: snapshot }));
    } catch (e) { /* very old browsers */ }
  }

  /* ------------------------------------------------------------------ */
  /* Toast                                                              */
  /* ------------------------------------------------------------------ */

  function toast(message) {
    var container = document.getElementById('vega-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'vega-toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    var el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ignite)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>' +
      '<span>' + message + '</span>';
    container.appendChild(el);

    setTimeout(function () {
      el.style.transition = 'all 0.3s ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      setTimeout(function () { el.remove(); }, 320);
    }, TOAST_MS);
  }

  /* ------------------------------------------------------------------ */
  /* Drawer: injected once per page, or adopts existing static markup   */
  /* ------------------------------------------------------------------ */

  var DEMO_CHECKOUT_LABEL = 'Checkout (demo)';

  function drawerMarkup() {
    return (
      '<div class="cart-drawer-overlay" id="cart-drawer-overlay"></div>' +
      '<aside class="cart-drawer" id="cart-drawer" aria-label="Gear bag" role="dialog">' +
        '<div class="drawer-header">' +
          '<h3 class="drawer-title">Gear Bag (<span id="drawer-item-count">0</span>)</h3>' +
          '<button class="drawer-close" id="drawer-close-btn" aria-label="Close cart">&times;</button>' +
        '</div>' +
        '<div class="cart-demo-shipping">' +
          '<div class="free-shipping-bar">' +
            '<div class="shipping-bar-label">' +
              '<span class="shipping-bar-text">DEMO &bull; Free shipping in India over ' + formatINR(FREE_SHIPPING_THRESHOLD) + '</span>' +
              '<span class="shipping-bar-amount mono"></span>' +
            '</div>' +
            '<div class="shipping-bar-track">' +
              '<div class="shipping-bar-fill" style="width:0%"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="drawer-items" id="drawer-items-list"></div>' +
        '<div class="drawer-footer">' +
          '<div class="drawer-subtotal">' +
            '<span>Subtotal</span>' +
            '<span class="text-accent" id="drawer-subtotal-price">' + formatINR(0) + '</span>' +
          '</div>' +
          '<div class="drawer-actions">' +
            '<a href="cart.html" class="btn btn-secondary w-full" data-cart-close-first>View full cart</a>' +
            '<button class="btn btn-primary w-full btn-checkout-demo" id="drawer-fast-checkout">' + DEMO_CHECKOUT_LABEL + '</button>' +
          '</div>' +
        '</div>' +
      '</aside>'
    );
  }

  function ensureDrawer() {
    var existing = document.getElementById('cart-drawer');
    if (!existing) {
      var wrap = document.createElement('div');
      wrap.id = 'vega-cart-root';
      wrap.innerHTML = drawerMarkup();
      document.body.appendChild(wrap);
      existing = document.getElementById('cart-drawer');
    }
    drawer.root = existing;
    drawer.overlay = document.getElementById('cart-drawer-overlay');

    var closeBtn = document.getElementById('drawer-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (drawer.overlay) drawer.overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) closeDrawer();
    });
  }

  function isOpen() {
    return !!(drawer.root && drawer.root.classList.contains('active'));
  }

  function openDrawer() {
    if (!drawer.root) ensureDrawer();
    if (drawer.overlay) drawer.overlay.classList.add('active');
    if (drawer.root) drawer.root.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer.overlay) drawer.overlay.classList.remove('active');
    if (drawer.root) drawer.root.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ------------------------------------------------------------------ */
  /* Rendering                                                          */
  /* ------------------------------------------------------------------ */

  function formatINR(amount) {
    return '₹' + Number(amount || 0).toLocaleString('en-IN');
  }

  function escapeHTML(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderDrawer() {
    if (!drawer.root) return;

    var items = state.items;
    var list = document.getElementById('drawer-items-list');
    var countEl = document.getElementById('drawer-item-count');
    var subtotalEl = document.getElementById('drawer-subtotal-price');

    if (countEl) countEl.textContent = String(getCount());
    if (subtotalEl) subtotalEl.textContent = formatINR(getTotal());

    if (list) {
      if (!items.length) {
        list.innerHTML =
          '<div class="cart-drawer-empty">' +
            '<p class="cart-drawer-empty-title">Your gear bag is empty</p>' +
            '<p class="cart-drawer-empty-text">Match shirts, Cric Sox and training kit are waiting in the collection.</p>' +
            '<a href="collection.html" class="btn btn-secondary btn-sm">Browse the collection</a>' +
          '</div>';
      } else {
        list.innerHTML = items.map(function (item) {
          var variant = 'Size: ' + escapeHTML(item.size) + (item.color ? ' &bull; ' + escapeHTML(item.color) : '');
          return (
            '<div class="cart-item" data-key="' + escapeHTML(item.key) + '">' +
              '<div class="cart-item-img">' +
                (item.image ? '<img src="' + escapeHTML(item.image) + '" alt="' + escapeHTML(item.name) + '" loading="lazy" decoding="async" width="64" height="64">' : '') +
              '</div>' +
              '<div class="cart-item-info">' +
                '<div class="cart-item-name">' + escapeHTML(item.name) + '</div>' +
                '<div class="cart-item-variant">' + variant + '</div>' +
                '<div class="cart-item-price">' + formatINR(item.price * item.qty) + '</div>' +
                '<div class="qty-control">' +
                  '<button class="qty-btn" data-qty-key="' + escapeHTML(item.key) + '" data-qty-delta="-1" aria-label="Decrease quantity">&minus;</button>' +
                  '<span class="qty-value">' + item.qty + '</span>' +
                  '<button class="qty-btn" data-qty-key="' + escapeHTML(item.key) + '" data-qty-delta="1" aria-label="Increase quantity">&plus;</button>' +
                '</div>' +
              '</div>' +
              '<button class="cart-item-remove" data-remove-key="' + escapeHTML(item.key) + '" aria-label="Remove ' + escapeHTML(item.name) + '">' +
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>' +
              '</button>' +
            '</div>'
          );
        }).join('');
      }
    }

    // Free shipping demo bar (drawer may be static markup that already has one)
    var total = getTotal();
    var remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
    var pct = Math.min(100, Math.round((total / FREE_SHIPPING_THRESHOLD) * 100));
    var unlocked = total >= FREE_SHIPPING_THRESHOLD && total > 0;

    var fills = drawer.root.querySelectorAll('.shipping-bar-fill');
    for (var f = 0; f < fills.length; f++) {
      fills[f].style.width = pct + '%';
      fills[f].classList.toggle('unlocked', unlocked);
    }

    var texts = drawer.root.querySelectorAll('.shipping-bar-text');
    for (var t = 0; t < texts.length; t++) {
      if (!items.length) {
        texts[t].innerHTML = 'DEMO &bull; Free shipping in India over ' + formatINR(FREE_SHIPPING_THRESHOLD);
      } else if (unlocked) {
        texts[t].innerHTML = 'DEMO &bull; <strong style="color: var(--color-success-alt);">Free shipping unlocked</strong>';
      } else {
        texts[t].innerHTML = 'DEMO &bull; Add ' + formatINR(remaining) + ' more for free shipping';
      }
    }

    var amounts = drawer.root.querySelectorAll('.shipping-bar-amount');
    for (var a = 0; a < amounts.length; a++) {
      amounts[a].textContent = items.length ? formatINR(total) + ' / ' + formatINR(FREE_SHIPPING_THRESHOLD) : '';
    }
  }

  function renderBadges() {
    var count = getCount();
    var badges = document.querySelectorAll('.cart-badge');
    for (var i = 0; i < badges.length; i++) {
      badges[i].textContent = String(count);
      badges[i].style.display = count > 0 ? 'flex' : 'none';
    }
  }

  function renderAll() {
    renderDrawer();
    renderBadges();
  }

  /* ------------------------------------------------------------------ */
  /* Demo checkout                                                      */
  /* ------------------------------------------------------------------ */

  function demoCheckout() {
    if (!state.items.length) {
      toast('Your gear bag is empty — add some kit first.');
      return;
    }
    closeDrawer();
    toast('Demo only, checkout would connect to Shopify.');
  }

  /* ------------------------------------------------------------------ */
  /* Event delegation (works with nav injected after this script)       */
  /* ------------------------------------------------------------------ */

  function bindDelegated() {
    document.addEventListener('click', function (e) {
      var target = e.target;

      var addBtn = target.closest ? target.closest('[data-add-to-cart]') : null;
      if (addBtn) {
        e.preventDefault();
        add(addBtn.getAttribute('data-add-to-cart'));
        return;
      }

      if (target.closest && target.closest('#cart-drawer-btn, .cart-trigger, [data-cart-open]')) {
        e.preventDefault();
        openDrawer();
        return;
      }

      if (target.closest && target.closest('#drawer-close-btn, .drawer-close, [data-cart-close-first]')) {
        if (target.closest('[data-cart-close-first]')) closeDrawer(); // full-cart link closes the drawer
        return;
      }

      if (drawer.overlay && target === drawer.overlay) {
        closeDrawer();
        return;
      }

      var qtyBtn = target.closest ? target.closest('[data-qty-key]') : null;
      if (qtyBtn) {
        e.preventDefault();
        var key = qtyBtn.getAttribute('data-qty-key');
        var delta = parseInt(qtyBtn.getAttribute('data-qty-delta'), 10) || 0;
        var current = 0;
        for (var i = 0; i < state.items.length; i++) {
          if (state.items[i].key === key) { current = state.items[i].qty; break; }
        }
        setQty(key, current + delta);
        return;
      }

      var removeBtn = target.closest ? target.closest('[data-remove-key]') : null;
      if (removeBtn) {
        e.preventDefault();
        remove(removeBtn.getAttribute('data-remove-key'));
        return;
      }

      if (target.closest && target.closest('.btn-checkout-demo, #drawer-fast-checkout')) {
        e.preventDefault();
        demoCheckout();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Legacy bridge (collection/home/PDP inline scripts still call this) */
  /* ------------------------------------------------------------------ */

  var cartStoreLegacy = {
    addItem: function (productId, options) { return add(productId, options || {}); },
    removeItem: function (key) { remove(key); },
    updateQty: function (key, delta) {
      var current = 0;
      for (var i = 0; i < state.items.length; i++) {
        if (state.items[i].key === key) { current = state.items[i].qty; break; }
      }
      setQty(key, current + (parseInt(delta, 10) || 0));
    },
    clear: clear,
    getCount: getCount,
    getSubtotal: getTotal,
    getItems: getItems,
    showToast: toast
  };

  var cartDrawerLegacy = {
    open: openDrawer,
    close: closeDrawer,
    toggle: function () { if (isOpen()) closeDrawer(); else openDrawer(); },
    isOpen: isOpen
  };

  /* ------------------------------------------------------------------ */
  /* Boot                                                               */
  /* ------------------------------------------------------------------ */

  function boot() {
    load();
    ensureDrawer();
    bindDelegated();

    subscribe(function () { renderAll(); });
    renderAll();

    // The nav (and its cart badge) may be injected by app.js after this
    // script boots — re-render the badge once it announces itself.
    document.addEventListener('vega:nav-ready', renderBadges);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.VegaCart = {
    add: add,
    remove: remove,
    setQty: setQty,
    clear: clear,
    getItems: getItems,
    getCount: getCount,
    getTotal: getTotal,
    getSnapshot: getSnapshot,
    subscribe: subscribe,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    toast: toast,
    FREE_SHIPPING_THRESHOLD: FREE_SHIPPING_THRESHOLD
  };

  // Legacy aliases (pre-existing pages and docs reference these)
  window.cartStore = cartStoreLegacy;
  window.cartDrawer = cartDrawerLegacy;
})();

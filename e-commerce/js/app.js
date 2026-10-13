/**
 * VELVET & CO. - Main Application Logic
 * Pure Vanilla JavaScript implementation for e-commerce store
 */

(function () {
  'use strict';

  // =========================================================================
  // State Management
  // =========================================================================
  const state = {
    products: typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA : [],
    cart: JSON.parse(localStorage.getItem('velvet_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('velvet_wishlist')) || [],
    appliedCoupon: JSON.parse(localStorage.getItem('velvet_coupon')) || null,
    theme: localStorage.getItem('velvet_theme') || 'light',
    filters: {
      category: 'all',
      search: '',
      maxPrice: 200,
      size: null,
      onSaleOnly: false,
      inStockOnly: true,
      sortBy: 'featured'
    },
    quickViewProduct: null,
    selectedSize: null,
    selectedColor: null,
    quickViewQuantity: 1
  };

  const SHIPPING_THRESHOLD = 75.00;
  const STANDARD_SHIPPING_FEE = 9.99;

  // =========================================================================
  // DOM Elements Cache
  // =========================================================================
  const DOM = {
    // Header & Navigation
    html: document.documentElement,
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    moonIcon: document.getElementById('moonIcon'),
    sunIcon: document.getElementById('sunIcon'),
    searchInput: document.getElementById('searchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),
    cartOpenBtn: document.getElementById('cartOpenBtn'),
    cartCount: document.getElementById('cartCount'),
    cartRunningTotal: document.getElementById('cartRunningTotal'),
    wishlistOpenBtn: document.getElementById('wishlistOpenBtn'),
    wishlistCount: document.getElementById('wishlistCount'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileNavDrawer: document.getElementById('mobileNavDrawer'),
    mobileNavCloseBtn: document.getElementById('mobileNavCloseBtn'),
    desktopNav: document.getElementById('desktopNav'),
    heroShopBtn: document.getElementById('heroShopBtn'),

    // Catalog & Filters
    productsGrid: document.getElementById('productsGrid'),
    categoryTabs: document.getElementById('categoryTabs'),
    sortSelect: document.getElementById('sortSelect'),
    filterToggleBtn: document.getElementById('filterToggleBtn'),
    advancedFilterPanel: document.getElementById('advancedFilterPanel'),
    priceRange: document.getElementById('priceRange'),
    priceRangeValue: document.getElementById('priceRangeValue'),
    sizeFilters: document.getElementById('sizeFilters'),
    onSaleOnly: document.getElementById('onSaleOnly'),
    inStockOnly: document.getElementById('inStockOnly'),
    activeFiltersBar: document.getElementById('activeFiltersBar'),
    activeFilterTags: document.getElementById('activeFilterTags'),
    clearAllFiltersBtn: document.getElementById('clearAllFiltersBtn'),

    // Promos & Countdowns
    topPromoCode: document.getElementById('topPromoCode'),
    promoBannerCoupon: document.getElementById('promoBannerCoupon'),
    countdownHours: document.getElementById('countdownHours'),
    countdownMinutes: document.getElementById('countdownMinutes'),
    countdownSeconds: document.getElementById('countdownSeconds'),
    newsletterForm: document.getElementById('newsletterForm'),
    newsletterEmail: document.getElementById('newsletterEmail'),

    // Modals & Drawers
    modalOverlay: document.getElementById('modalOverlay'),
    cartDrawer: document.getElementById('cartDrawer'),
    cartCloseBtn: document.getElementById('cartCloseBtn'),
    cartDrawerCount: document.getElementById('cartDrawerCount'),
    cartItemsList: document.getElementById('cartItemsList'),
    cartEmptyState: document.getElementById('cartEmptyState'),
    cartFooter: document.getElementById('cartFooter'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartDiscountRow: document.getElementById('cartDiscountRow'),
    discountName: document.getElementById('discountName'),
    cartDiscountAmount: document.getElementById('cartDiscountAmount'),
    cartShippingCost: document.getElementById('cartShippingCost'),
    cartTotal: document.getElementById('cartTotal'),
    shippingStatusText: document.getElementById('shippingStatusText'),
    shippingProgressBar: document.getElementById('shippingProgressBar'),
    couponInput: document.getElementById('couponInput'),
    applyCouponBtn: document.getElementById('applyCouponBtn'),
    couponFeedback: document.getElementById('couponFeedback'),
    clearCartBtn: document.getElementById('clearCartBtn'),
    startShoppingBtn: document.getElementById('startShoppingBtn'),
    checkoutBtn: document.getElementById('checkoutBtn'),

    // Wishlist Drawer
    wishlistDrawer: document.getElementById('wishlistDrawer'),
    wishlistCloseBtn: document.getElementById('wishlistCloseBtn'),
    wishlistDrawerCount: document.getElementById('wishlistDrawerCount'),
    wishlistItemsList: document.getElementById('wishlistItemsList'),
    wishlistEmptyState: document.getElementById('wishlistEmptyState'),

    // Quick View Modal
    quickViewModal: document.getElementById('quickViewModal'),
    quickViewCloseBtn: document.getElementById('quickViewCloseBtn'),
    quickViewContent: document.getElementById('quickViewContent'),

    // Checkout Modal
    checkoutModal: document.getElementById('checkoutModal'),
    checkoutCloseBtn: document.getElementById('checkoutCloseBtn'),
    checkoutForm: document.getElementById('checkoutForm'),
    checkoutTotalPayable: document.getElementById('checkoutTotalPayable'),

    // Order Success Modal
    orderSuccessModal: document.getElementById('orderSuccessModal'),
    orderSuccessCloseBtn: document.getElementById('orderSuccessCloseBtn'),
    receiptOrderId: document.getElementById('receiptOrderId'),
    receiptCustomerName: document.getElementById('receiptCustomerName'),
    receiptTotalPaid: document.getElementById('receiptTotalPaid'),

    // Toast Container
    toastContainer: document.getElementById('toastContainer')
  };

  // =========================================================================
  // Initialize Application
  // =========================================================================
  function init() {
    applyTheme(state.theme);
    setupEventListeners();
    startCountdown();
    renderCatalog();
    updateCartUI();
    updateWishlistUI();
  }

  // =========================================================================
  // Theme Management
  // =========================================================================
  function applyTheme(theme) {
    state.theme = theme;
    DOM.html.setAttribute('data-theme', theme);
    localStorage.setItem('velvet_theme', theme);

    if (theme === 'dark') {
      DOM.moonIcon.style.display = 'none';
      DOM.sunIcon.style.display = 'block';
    } else {
      DOM.moonIcon.style.display = 'block';
      DOM.sunIcon.style.display = 'none';
    }
  }

  function toggleTheme() {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    showToast(`Switched to ${newTheme} mode`, 'info');
  }

  // =========================================================================
  // Toast Notifications
  // =========================================================================
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'danger') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    } else {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="toast-message">${message}</div>
    `;

    DOM.toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss after 3.2 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 3200);
  }

  // =========================================================================
  // Product Catalog Rendering & Filtering
  // =========================================================================
  function getFilteredProducts() {
    return state.products.filter(product => {
      // Category filter
      if (state.filters.category !== 'all' && product.category !== state.filters.category) {
        return false;
      }

      // Search filter
      if (state.filters.search) {
        const query = state.filters.search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTags = product.tags && product.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTags) return false;
      }

      // Max Price filter
      if (product.price > state.filters.maxPrice) {
        return false;
      }

      // Size filter
      if (state.filters.size && !product.sizes.includes(state.filters.size)) {
        return false;
      }

      // On Sale filter
      if (state.filters.onSaleOnly && (!product.originalPrice || product.originalPrice <= product.price)) {
        return false;
      }

      // In Stock filter
      if (state.filters.inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (state.filters.sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (state.filters.sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (state.filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (state.filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // 'featured' default order
      return a.id - b.id;
    });
  }

  function renderCatalog() {
    const filtered = getFilteredProducts();
    updateActiveFilterTags();

    if (filtered.length === 0) {
      DOM.productsGrid.innerHTML = `
        <div class="empty-catalog">
          <div class="empty-catalog-icon">🛍️</div>
          <h3>No matching clothing pieces found</h3>
          <p>Try broadening your filters, resetting price range, or searching for a different keyword.</p>
          <button class="btn btn-outline" id="emptyResetFiltersBtn">Reset All Filters</button>
        </div>
      `;
      const emptyResetBtn = document.getElementById('emptyResetFiltersBtn');
      if (emptyResetBtn) {
        emptyResetBtn.addEventListener('click', resetAllFilters);
      }
      return;
    }

    DOM.productsGrid.innerHTML = filtered.map(product => {
      const isWishlisted = state.wishlist.includes(product.id);
      const discountPercentage = product.originalPrice 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
        : null;

      // Color swatches HTML
      const colorDots = product.colors.map(c => `
        <span class="color-dot" style="background-color: ${c.hex};" title="${c.name}"></span>
      `).join('');

      // Badges
      let badgeHtml = '';
      if (product.badge) {
        badgeHtml = `<span class="card-badge ${product.badge.toLowerCase()}">${product.badge}</span>`;
      } else if (discountPercentage && discountPercentage > 0) {
        badgeHtml = `<span class="card-badge sale">-${discountPercentage}%</span>`;
      }

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="card-media-wrapper" data-action="quickview" data-id="${product.id}">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80'">
            ${badgeHtml}
            <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" data-action="wishlist" data-id="${product.id}" aria-label="Save to wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <div class="card-quick-actions">
              <button class="btn-quick-view" data-action="quickview" data-id="${product.id}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Quick View
              </button>
            </div>
          </div>

          <div class="card-content">
            <div class="card-category">${product.category}</div>
            <h3 class="card-title" data-action="quickview" data-id="${product.id}">${product.name}</h3>
            
            <div class="card-rating">
              <span>★</span>
              <strong>${product.rating}</strong>
              <span class="review-count">(${product.reviewsCount})</span>
            </div>

            <div class="card-colors">
              ${colorDots}
            </div>

            <div class="card-bottom-row">
              <div class="price-box">
                <span class="current-price">$${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
              </div>
              <button class="card-add-btn" data-action="quickadd" data-id="${product.id}" aria-label="Add to cart" title="Add to Bag">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function updateActiveFilterTags() {
    const tags = [];

    if (state.filters.category !== 'all') {
      tags.push({ key: 'category', label: `Category: ${state.filters.category}` });
    }
    if (state.filters.search) {
      tags.push({ key: 'search', label: `Search: "${state.filters.search}"` });
    }
    if (state.filters.maxPrice < 200) {
      tags.push({ key: 'price', label: `Max Price: $${state.filters.maxPrice}` });
    }
    if (state.filters.size) {
      tags.push({ key: 'size', label: `Size: ${state.filters.size}` });
    }
    if (state.filters.onSaleOnly) {
      tags.push({ key: 'sale', label: 'On Sale Only' });
    }

    if (tags.length > 0) {
      DOM.activeFiltersBar.style.display = 'flex';
      DOM.activeFilterTags.innerHTML = tags.map(tag => `
        <span class="active-filter-pill">
          ${tag.label}
          <button data-remove-filter="${tag.key}" aria-label="Remove filter">✕</button>
        </span>
      `).join('');
    } else {
      DOM.activeFiltersBar.style.display = 'none';
      DOM.activeFilterTags.innerHTML = '';
    }
  }

  function resetAllFilters() {
    state.filters.category = 'all';
    state.filters.search = '';
    state.filters.maxPrice = 200;
    state.filters.size = null;
    state.filters.onSaleOnly = false;
    state.filters.inStockOnly = true;
    state.filters.sortBy = 'featured';

    DOM.searchInput.value = '';
    DOM.searchClearBtn.style.display = 'none';
    DOM.priceRange.value = 200;
    DOM.priceRangeValue.textContent = '$200';
    DOM.sortSelect.value = 'featured';
    DOM.onSaleOnly.checked = false;
    DOM.inStockOnly.checked = true;

    // Reset UI buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === 'all');
    });
    document.querySelectorAll('.size-chip').forEach(btn => {
      btn.classList.remove('selected');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.category === 'all');
    });

    renderCatalog();
    showToast('Filters cleared', 'info');
  }

  // =========================================================================
  // Quick View Modal
  // =========================================================================
  function openQuickView(productId) {
    const product = state.products.find(p => p.id === parseInt(productId));
    if (!product) return;

    state.quickViewProduct = product;
    state.selectedSize = product.sizes[0];
    state.selectedColor = product.colors[0];
    state.quickViewQuantity = 1;

    // Render Quick View Modal Content
    DOM.quickViewContent.innerHTML = `
      <div class="quickview-gallery">
        <img src="${product.images[0]}" alt="${product.name}" class="main-preview-img" id="qvMainImg">
        <div class="thumbnails-row">
          ${product.images.map((img, idx) => `
            <div class="thumb-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
              <img src="${img}" alt="${product.name}">
            </div>
          `).join('')}
        </div>
      </div>

      <div class="quickview-details">
        <div class="qv-category">${product.category}</div>
        <h2 class="qv-title">${product.name}</h2>
        
        <div class="card-rating">
          <span>★</span>
          <strong>${product.rating}</strong>
          <span class="review-count">(${product.reviewsCount} customer reviews)</span>
        </div>

        <div class="qv-price-box">
          <span class="qv-price">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="qv-original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
        </div>

        <p class="qv-desc">${product.description}</p>

        <!-- Color Picker -->
        <div>
          <div class="option-label">
            <span>Color: <strong id="qvColorLabel">${state.selectedColor.name}</strong></span>
          </div>
          <div class="color-options" id="qvColorOptions">
            ${product.colors.map((c, idx) => `
              <button class="color-option-btn ${idx === 0 ? 'selected' : ''}" 
                style="background-color: ${c.hex};" 
                data-name="${c.name}" 
                data-hex="${c.hex}"
                title="${c.name}">
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Size Picker -->
        <div>
          <div class="option-label">
            <span>Size: <strong id="qvSizeLabel">${state.selectedSize}</strong></span>
          </div>
          <div class="size-options" id="qvSizeOptions">
            ${product.sizes.map((s, idx) => `
              <button class="size-option-btn ${idx === 0 ? 'selected' : ''}" data-size="${s}">
                ${s}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Quantity & Add to Cart -->
        <div class="qv-actions">
          <div class="quantity-control" style="border-radius: var(--radius-md); padding: 0.25rem;">
            <button class="qty-btn" id="qvQtyMinus" style="width:34px; height:34px;">-</button>
            <span class="qty-value" id="qvQtyVal" style="width:36px; font-size:1rem;">1</span>
            <button class="qty-btn" id="qvQtyPlus" style="width:34px; height:34px;">+</button>
          </div>

          <button class="btn btn-primary" id="qvAddToCartBtn" style="flex:1;">
            Add to Bag • $${(product.price * state.quickViewQuantity).toFixed(2)}
          </button>
        </div>
      </div>
    `;

    // Gallery Thumbnails listener
    const thumbs = DOM.quickViewContent.querySelectorAll('.thumb-btn');
    const mainImg = document.getElementById('qvMainImg');
    thumbs.forEach(t => {
      t.addEventListener('click', () => {
        thumbs.forEach(tb => tb.classList.remove('active'));
        t.classList.add('active');
        const idx = parseInt(t.dataset.index);
        mainImg.src = product.images[idx];
      });
    });

    // Color Swatch selector listener
    const colorBtns = DOM.quickViewContent.querySelectorAll('.color-option-btn');
    const colorLabel = document.getElementById('qvColorLabel');
    colorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.selectedColor = { name: btn.dataset.name, hex: btn.dataset.hex };
        colorLabel.textContent = btn.dataset.name;
      });
    });

    // Size selector listener
    const sizeBtns = DOM.quickViewContent.querySelectorAll('.size-option-btn');
    const sizeLabel = document.getElementById('qvSizeLabel');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.selectedSize = btn.dataset.size;
        sizeLabel.textContent = btn.dataset.size;
      });
    });

    // Quantity buttons
    const qtyVal = document.getElementById('qvQtyVal');
    const addToCartBtn = document.getElementById('qvAddToCartBtn');

    document.getElementById('qvQtyMinus').addEventListener('click', () => {
      if (state.quickViewQuantity > 1) {
        state.quickViewQuantity--;
        qtyVal.textContent = state.quickViewQuantity;
        addToCartBtn.textContent = `Add to Bag • $${(product.price * state.quickViewQuantity).toFixed(2)}`;
      }
    });

    document.getElementById('qvQtyPlus').addEventListener('click', () => {
      state.quickViewQuantity++;
      qtyVal.textContent = state.quickViewQuantity;
      addToCartBtn.textContent = `Add to Bag • $${(product.price * state.quickViewQuantity).toFixed(2)}`;
    });

    // Add To Cart from Quick View
    addToCartBtn.addEventListener('click', () => {
      addToCart(product, state.selectedSize, state.selectedColor, state.quickViewQuantity);
      closeAllModals();
      openCartDrawer();
    });

    openModal(DOM.quickViewModal);
  }

  // =========================================================================
  // Wishlist Logic
  // =========================================================================
  function toggleWishlist(productId) {
    const id = parseInt(productId);
    const index = state.wishlist.indexOf(id);
    const product = state.products.find(p => p.id === id);

    if (index > -1) {
      state.wishlist.splice(index, 1);
      showToast(`Removed "${product ? product.name : 'Item'}" from wishlist`, 'info');
    } else {
      state.wishlist.push(id);
      showToast(`Added "${product ? product.name : 'Item'}" to wishlist`, 'success');
    }

    localStorage.setItem('velvet_wishlist', JSON.stringify(state.wishlist));
    updateWishlistUI();
    renderCatalog();
  }

  function updateWishlistUI() {
    DOM.wishlistCount.textContent = state.wishlist.length;
    DOM.wishlistDrawerCount.textContent = state.wishlist.length;

    if (state.wishlist.length === 0) {
      DOM.wishlistEmptyState.style.display = 'flex';
      DOM.wishlistItemsList.innerHTML = '';
      return;
    }

    DOM.wishlistEmptyState.style.display = 'none';
    const wishlistedProducts = state.products.filter(p => state.wishlist.includes(p.id));

    DOM.wishlistItemsList.innerHTML = wishlistedProducts.map(product => `
      <div class="cart-item">
        <img src="${product.images[0]}" alt="${product.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${product.name}</h4>
          <div class="cart-item-price">$${product.price.toFixed(2)}</div>
          <div class="cart-item-bottom" style="margin-top:0.75rem;">
            <button class="btn btn-primary" style="padding:0.4rem 0.85rem; font-size:0.8rem;" data-action="wishlist-to-cart" data-id="${product.id}">
              Move to Bag
            </button>
            <button class="cart-item-remove" data-action="remove-wishlist" data-id="${product.id}">
              Remove
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // Cart Management
  // =========================================================================
  function addToCart(product, size = null, color = null, quantity = 1) {
    const chosenSize = size || product.sizes[0];
    const chosenColor = color || product.colors[0];

    // Unique Cart Item Key: id-size-color
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor.name}`;

    const existingIndex = state.cart.findIndex(item => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
    } else {
      state.cart.push({
        cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: chosenSize,
        color: chosenColor,
        quantity: quantity
      });
    }

    saveCart();
    updateCartUI();
    showToast(`Added ${quantity} × ${product.name} (${chosenSize}) to your bag!`, 'success');
  }

  function removeFromCart(cartItemId) {
    state.cart = state.cart.filter(item => item.cartItemId !== cartItemId);
    saveCart();
    updateCartUI();
    showToast('Item removed from shopping bag', 'info');
  }

  function updateCartQuantity(cartItemId, delta) {
    const item = state.cart.find(i => i.cartItemId === cartItemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      saveCart();
      updateCartUI();
    }
  }

  function clearCart() {
    state.cart = [];
    state.appliedCoupon = null;
    localStorage.removeItem('velvet_coupon');
    saveCart();
    updateCartUI();
    showToast('Shopping bag cleared', 'info');
  }

  function saveCart() {
    localStorage.setItem('velvet_cart', JSON.stringify(state.cart));
  }

  function calculateCartTotals() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    if (state.appliedCoupon) {
      discount = (subtotal * state.appliedCoupon.discountPercent) / 100;
    }

    let shipping = 0;
    if (subtotal > 0) {
      shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    }

    const total = Math.max(0, subtotal - discount + shipping);

    return { subtotal, discount, shipping, total };
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const { subtotal, discount, shipping, total } = calculateCartTotals();

    // Badges & Counters
    DOM.cartCount.textContent = totalCount;
    DOM.cartDrawerCount.textContent = totalCount;
    DOM.cartRunningTotal.textContent = `$${subtotal.toFixed(2)}`;

    // Drawer Empty state vs Items
    if (state.cart.length === 0) {
      DOM.cartEmptyState.style.display = 'flex';
      DOM.cartItemsList.innerHTML = '';
      DOM.cartFooter.style.display = 'none';
      DOM.shippingStatusText.innerHTML = `Add <span>$${SHIPPING_THRESHOLD.toFixed(2)}</span> more for Free Express Shipping!`;
      DOM.shippingProgressBar.style.width = '0%';
      return;
    }

    DOM.cartEmptyState.style.display = 'none';
    DOM.cartFooter.style.display = 'flex';

    // Free Shipping Bar Progress
    const diff = SHIPPING_THRESHOLD - subtotal;
    if (diff <= 0) {
      DOM.shippingStatusText.innerHTML = '🎉 You have unlocked <strong>Free Express Worldwide Shipping!</strong>';
      DOM.shippingProgressBar.style.width = '100%';
    } else {
      const percentage = Math.min(100, Math.round((subtotal / SHIPPING_THRESHOLD) * 100));
      DOM.shippingStatusText.innerHTML = `Add <span>$${diff.toFixed(2)}</span> more for <strong>Free Express Shipping!</strong>`;
      DOM.shippingProgressBar.style.width = `${percentage}%`;
    }

    // Render cart items
    DOM.cartItemsList.innerHTML = state.cart.map(item => `
      <div class="cart-item" data-cart-id="${item.cartItemId}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-meta">
            <span>Size: <strong>${item.size}</strong></span>
            <span>Color: 
              <span class="cart-item-meta-color" style="background-color:${item.color.hex};" title="${item.color.name}"></span>
              ${item.color.name}
            </span>
          </div>
          <div class="cart-item-bottom">
            <div class="quantity-control">
              <button class="qty-btn" data-action="cart-minus" data-id="${item.cartItemId}">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" data-action="cart-plus" data-id="${item.cartItemId}">+</button>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="cart-item-remove" data-action="cart-remove" data-id="${item.cartItemId}" title="Remove item">
              ✕
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Summary Calculations
    DOM.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    
    if (discount > 0 && state.appliedCoupon) {
      DOM.cartDiscountRow.style.display = 'flex';
      DOM.discountName.textContent = `${state.appliedCoupon.code} - ${state.appliedCoupon.discountPercent}%`;
      DOM.cartDiscountAmount.textContent = `-$${discount.toFixed(2)}`;
    } else {
      DOM.cartDiscountRow.style.display = 'none';
    }

    DOM.cartShippingCost.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    DOM.cartTotal.textContent = `$${total.toFixed(2)}`;
    DOM.checkoutTotalPayable.textContent = `$${total.toFixed(2)}`;
  }

  // =========================================================================
  // Promo Coupon Engine
  // =========================================================================
  function applyCouponCode(codeStr) {
    const raw = codeStr.trim().toUpperCase();
    if (!raw) {
      showCouponFeedback('Please enter a coupon code', 'error');
      return;
    }

    if (typeof PROMO_CODES !== 'undefined' && PROMO_CODES[raw]) {
      state.appliedCoupon = {
        code: raw,
        discountPercent: PROMO_CODES[raw].discountPercent,
        description: PROMO_CODES[raw].description
      };
      localStorage.setItem('velvet_coupon', JSON.stringify(state.appliedCoupon));
      showCouponFeedback(`Code "${raw}" applied! ${PROMO_CODES[raw].discountPercent}% discount activated.`, 'success');
      showToast(`Promo "${raw}" applied: ${PROMO_CODES[raw].discountPercent}% off!`, 'success');
      updateCartUI();
    } else {
      showCouponFeedback('Invalid coupon code. Try SPRING40 or SAVE15', 'error');
    }
  }

  function showCouponFeedback(msg, type) {
    DOM.couponFeedback.textContent = msg;
    DOM.couponFeedback.className = `coupon-feedback ${type}`;
    setTimeout(() => {
      DOM.couponFeedback.className = 'coupon-feedback';
    }, 4500);
  }

  // =========================================================================
  // Modal & Drawer Utilities
  // =========================================================================
  function openModal(modalEl) {
    closeAllModals();
    DOM.modalOverlay.classList.add('open');
    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    modalEl.classList.remove('open');
    DOM.modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    DOM.cartDrawer.classList.remove('open');
    DOM.wishlistDrawer.classList.remove('open');
    DOM.mobileNavDrawer.classList.remove('open');
    DOM.quickViewModal.classList.remove('open');
    DOM.checkoutModal.classList.remove('open');
    DOM.orderSuccessModal.classList.remove('open');
    DOM.modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openCartDrawer() {
    closeAllModals();
    DOM.modalOverlay.classList.add('open');
    DOM.cartDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function openWishlistDrawer() {
    closeAllModals();
    DOM.modalOverlay.classList.add('open');
    DOM.wishlistDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // =========================================================================
  // Countdown Timer Simulation
  // =========================================================================
  function startCountdown() {
    let remainingSeconds = 8 * 3600 + 42 * 60 + 15; // 8 hours, 42 mins, 15 secs

    setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        const hours = Math.floor(remainingSeconds / 3600);
        const mins = Math.floor((remainingSeconds % 3600) / 60);
        const secs = remainingSeconds % 60;

        if (DOM.countdownHours) DOM.countdownHours.textContent = String(hours).padStart(2, '0');
        if (DOM.countdownMinutes) DOM.countdownMinutes.textContent = String(mins).padStart(2, '0');
        if (DOM.countdownSeconds) DOM.countdownSeconds.textContent = String(secs).padStart(2, '0');
      }
    }, 1000);
  }

  // =========================================================================
  // Event Listeners Setup
  // =========================================================================
  function setupEventListeners() {
    // Theme toggle
    DOM.themeToggleBtn.addEventListener('click', toggleTheme);

    // Search input
    DOM.searchInput.addEventListener('input', (e) => {
      state.filters.search = e.target.value.trim();
      DOM.searchClearBtn.style.display = state.filters.search ? 'block' : 'none';
      renderCatalog();
    });

    DOM.searchClearBtn.addEventListener('click', () => {
      DOM.searchInput.value = '';
      state.filters.search = '';
      DOM.searchClearBtn.style.display = 'none';
      renderCatalog();
    });

    // Category Tabs in Catalog
    DOM.categoryTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab-btn');
      if (!tab) return;
      DOM.categoryTabs.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');
      state.filters.category = tab.dataset.filter;

      // Sync with desktop nav links
      DOM.desktopNav.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.category === state.filters.category);
      });

      renderCatalog();
    });

    // Desktop Nav Link clicks
    DOM.desktopNav.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-link');
      if (!link || !link.dataset.category) return;
      state.filters.category = link.dataset.category;

      DOM.desktopNav.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      DOM.categoryTabs.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === state.filters.category);
      });

      renderCatalog();
    });

    // Category Showcase cards
    document.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.dataset.category;
        state.filters.category = cat;

        DOM.categoryTabs.querySelectorAll('.tab-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.filter === cat);
        });
        DOM.desktopNav.querySelectorAll('.nav-link').forEach(link => {
          link.classList.toggle('active', link.dataset.category === cat);
        });

        renderCatalog();
        const catalogSec = document.getElementById('catalog');
        if (catalogSec) catalogSec.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Sort select
    DOM.sortSelect.addEventListener('change', (e) => {
      state.filters.sortBy = e.target.value;
      renderCatalog();
    });

    // Advanced Filter Toggle Button
    DOM.filterToggleBtn.addEventListener('click', () => {
      DOM.filterToggleBtn.classList.toggle('active');
      DOM.advancedFilterPanel.classList.toggle('open');
    });

    // Price Range Slider
    DOM.priceRange.addEventListener('input', (e) => {
      state.filters.maxPrice = parseInt(e.target.value);
      DOM.priceRangeValue.textContent = `$${state.filters.maxPrice}`;
      renderCatalog();
    });

    // Size Filter Chips
    DOM.sizeFilters.addEventListener('click', (e) => {
      const chip = e.target.closest('.size-chip');
      if (!chip) return;
      const size = chip.dataset.size;
      if (state.filters.size === size) {
        state.filters.size = null;
        chip.classList.remove('selected');
      } else {
        DOM.sizeFilters.querySelectorAll('.size-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        state.filters.size = size;
      }
      renderCatalog();
    });

    // On sale & In stock toggles
    DOM.onSaleOnly.addEventListener('change', (e) => {
      state.filters.onSaleOnly = e.target.checked;
      renderCatalog();
    });

    DOM.inStockOnly.addEventListener('change', (e) => {
      state.filters.inStockOnly = e.target.checked;
      renderCatalog();
    });

    // Reset all filters button
    DOM.clearAllFiltersBtn.addEventListener('click', resetAllFilters);

    // Active Filter individual removal
    DOM.activeFilterTags.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-remove-filter]');
      if (!removeBtn) return;
      const filterKey = removeBtn.dataset.removeFilter;

      if (filterKey === 'category') {
        state.filters.category = 'all';
        DOM.categoryTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
      } else if (filterKey === 'search') {
        state.filters.search = '';
        DOM.searchInput.value = '';
        DOM.searchClearBtn.style.display = 'none';
      } else if (filterKey === 'price') {
        state.filters.maxPrice = 200;
        DOM.priceRange.value = 200;
        DOM.priceRangeValue.textContent = '$200';
      } else if (filterKey === 'size') {
        state.filters.size = null;
        DOM.sizeFilters.querySelectorAll('.size-chip').forEach(c => c.classList.remove('selected'));
      } else if (filterKey === 'sale') {
        state.filters.onSaleOnly = false;
        DOM.onSaleOnly.checked = false;
      }

      renderCatalog();
    });

    // Product Card Delegation (Quick Add, Quick View, Wishlist)
    DOM.productsGrid.addEventListener('click', (e) => {
      const quickAddBtn = e.target.closest('[data-action="quickadd"]');
      const wishlistBtn = e.target.closest('[data-action="wishlist"]');
      const quickViewTrigger = e.target.closest('[data-action="quickview"]');

      if (quickAddBtn) {
        e.stopPropagation();
        const id = parseInt(quickAddBtn.dataset.id);
        const product = state.products.find(p => p.id === id);
        if (product) {
          addToCart(product);
        }
        return;
      }

      if (wishlistBtn) {
        e.stopPropagation();
        const id = parseInt(wishlistBtn.dataset.id);
        toggleWishlist(id);
        return;
      }

      if (quickViewTrigger) {
        e.stopPropagation();
        const id = parseInt(quickViewTrigger.dataset.id);
        openQuickView(id);
      }
    });

    // Cart Drawer delegation (Quantity, Remove)
    DOM.cartItemsList.addEventListener('click', (e) => {
      const plusBtn = e.target.closest('[data-action="cart-plus"]');
      const minusBtn = e.target.closest('[data-action="cart-minus"]');
      const removeBtn = e.target.closest('[data-action="cart-remove"]');

      if (plusBtn) {
        updateCartQuantity(plusBtn.dataset.id, 1);
      } else if (minusBtn) {
        updateCartQuantity(minusBtn.dataset.id, -1);
      } else if (removeBtn) {
        removeFromCart(removeBtn.dataset.id);
      }
    });

    // Wishlist Drawer delegation
    DOM.wishlistItemsList.addEventListener('click', (e) => {
      const toCartBtn = e.target.closest('[data-action="wishlist-to-cart"]');
      const removeBtn = e.target.closest('[data-action="remove-wishlist"]');

      if (toCartBtn) {
        const id = parseInt(toCartBtn.dataset.id);
        const product = state.products.find(p => p.id === id);
        if (product) {
          addToCart(product);
          toggleWishlist(id);
          openCartDrawer();
        }
      } else if (removeBtn) {
        const id = parseInt(removeBtn.dataset.id);
        toggleWishlist(id);
      }
    });

    // Drawer openers and closers
    DOM.cartOpenBtn.addEventListener('click', openCartDrawer);
    DOM.cartCloseBtn.addEventListener('click', closeAllModals);
    DOM.wishlistOpenBtn.addEventListener('click', openWishlistDrawer);
    DOM.wishlistCloseBtn.addEventListener('click', closeAllModals);
    DOM.quickViewCloseBtn.addEventListener('click', closeAllModals);
    DOM.checkoutCloseBtn.addEventListener('click', closeAllModals);
    DOM.orderSuccessCloseBtn.addEventListener('click', closeAllModals);
    DOM.modalOverlay.addEventListener('click', closeAllModals);

    // Mobile nav drawer
    DOM.mobileMenuBtn.addEventListener('click', () => {
      closeAllModals();
      DOM.modalOverlay.classList.add('open');
      DOM.mobileNavDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    DOM.mobileNavCloseBtn.addEventListener('click', closeAllModals);

    DOM.mobileNavDrawer.addEventListener('click', (e) => {
      const link = e.target.closest('.mobile-nav-link');
      if (link && link.dataset.category) {
        state.filters.category = link.dataset.category;
        DOM.categoryTabs.querySelectorAll('.tab-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.filter === state.filters.category);
        });
        renderCatalog();
        closeAllModals();
      }
    });

    // Clear cart button
    DOM.clearCartBtn.addEventListener('click', clearCart);

    // Start shopping button from empty cart
    DOM.startShoppingBtn.addEventListener('click', () => {
      closeAllModals();
      const catalog = document.getElementById('catalog');
      if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
    });

    // Apply Coupon button
    DOM.applyCouponBtn.addEventListener('click', () => {
      applyCouponCode(DOM.couponInput.value);
    });

    DOM.couponInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyCouponCode(DOM.couponInput.value);
      }
    });

    // Copy and apply promo code pills
    const copyAndApply = (code) => {
      navigator.clipboard?.writeText(code);
      DOM.couponInput.value = code;
      applyCouponCode(code);
      openCartDrawer();
    };

    if (DOM.topPromoCode) {
      DOM.topPromoCode.addEventListener('click', () => copyAndApply('SPRING40'));
    }
    if (DOM.promoBannerCoupon) {
      DOM.promoBannerCoupon.addEventListener('click', () => copyAndApply('SPRING40'));
    }

    // Checkout Modal Open
    DOM.checkoutBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Your shopping bag is empty!', 'warning');
        return;
      }
      openModal(DOM.checkoutModal);
    });

    // Payment method selector
    document.querySelectorAll('.payment-method-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // Checkout Form Submit
    DOM.checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const confirmBtn = document.getElementById('confirmOrderBtn');
      const originalText = confirmBtn.innerHTML;
      confirmBtn.innerHTML = '<span>Processing Secure Transaction...</span>';
      confirmBtn.disabled = true;

      const firstName = document.getElementById('checkFirstName').value.trim() || 'Valued';
      const lastName = document.getElementById('checkLastName').value.trim() || 'Customer';
      const fullName = `${firstName} ${lastName}`;
      const totals = calculateCartTotals();

      setTimeout(() => {
        // Generate random order ID
        const orderNumber = `#ORD-${Math.floor(10000 + Math.random() * 90000)}`;

        DOM.receiptOrderId.textContent = orderNumber;
        DOM.receiptCustomerName.textContent = fullName;
        DOM.receiptTotalPaid.textContent = `$${totals.total.toFixed(2)}`;

        // Clear Cart
        state.cart = [];
        state.appliedCoupon = null;
        localStorage.removeItem('velvet_coupon');
        saveCart();
        updateCartUI();

        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
        DOM.checkoutForm.reset();

        openModal(DOM.orderSuccessModal);
        showToast('Order confirmed successfully!', 'success');
      }, 1200);
    });

    // Newsletter subscription form
    DOM.newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = DOM.newsletterEmail.value.trim();
      if (email) {
        showToast(`Thank you! Use promo code WELCOME10 for 10% off.`, 'success');
        DOM.couponInput.value = 'WELCOME10';
        DOM.newsletterEmail.value = '';
      }
    });

    // ESC key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

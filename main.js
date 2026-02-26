// ========================================
// main.js - Main Application Logic
// ========================================

// Theme Toggle
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

// Init theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Logout
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

// Render cart modal
function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    if (cartTotal) cartTotal.style.display = 'none';
    if (checkoutBtn) checkoutBtn.style.display = 'none';
    return;
  }
  
  let total = 0;
  cartItems.innerHTML = cart.map(item => {
    total += item.price * item.quantity;
    return `
      <div class="cart-item">
        <div class="cart-item-details">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/60'">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>₵${item.price} x ${item.quantity}</p>
            <div class="quantity-controls">
              <button class="quantity-btn" onclick="changeQty(${item.id}, -1)">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn" onclick="changeQty(${item.id}, 1)">+</button>
            </div>
          </div>
        </div>
        <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;
  }).join('');
  
  if (cartTotal) {
    document.getElementById('totalAmount').textContent = total.toFixed(2);
    cartTotal.style.display = 'block';
  }
  if (checkoutBtn) checkoutBtn.style.display = 'block';
}

// Show cart modal
function showCart() {
  renderCart();
  document.getElementById('cartModal').style.display = 'block';
}

// Close modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Go to checkout
function goToCheckout() {
  closeModal('cartModal');
  window.location.href = 'checkout.html';
}

// Load orders on orders.html
function loadOrders() {
  const ordersList = document.getElementById('ordersList');
  if (!ordersList) return;
  
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  
  if (orders.length === 0) {
    ordersList.innerHTML = "<p class='empty-orders'>No orders yet.</p>";
    return;
  }
  
  ordersList.innerHTML = orders.map(order => `
    <div class="order-card">
      <div class="order-header">
        <h3>Order #${order.id}</h3>
        <span class="status-badge ${order.status.toLowerCase()}">${order.status}</span>
      </div>
      <div class="order-details">
        <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
        <p><strong>Total:</strong> ₵${order.total.toFixed(2)}</p>
        <p><strong>Items:</strong> ${order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}</p>
      </div>
      <div class="order-items">
        ${order.items?.map(item => `
          <div class="order-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/50'">
            <div>
              <p>${item.name}</p>
              <small>Qty: ${item.quantity} x ₵${item.price}</small>
            </div>
          </div>
        `).join('') || ''}
      </div>
    </div>
  `).join('');
}

// Load product details on product.html
function loadProductDetails() {
  const productDetail = document.getElementById('productDetail');
  if (!productDetail) return;
  
  const productStr = localStorage.getItem("selectedProduct");
  if (!productStr) {
    alert("Product not found.");
    window.location.href = "home_page.html";
    return;
  }

  const product = JSON.parse(productStr);
  let quantity = 1;

  productDetail.innerHTML = `
    <div class="product-image-large">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400'">
    </div>
    <div class="product-info-detail">
      <h2>${product.name}</h2>
      <span class="category-tag">${product.category}</span>
      <div class="price-section-detail">
        <span class="current-price-big">₵${product.price}</span>
        <span class="old-price-big">₵${product.oldPrice}</span>
        <span class="discount-tag">-${product.discount}%</span>
      </div>
      <p>${product.description}</p>
      <div class="quantity-selector">
        <label>Quantity:</label>
        <div class="qty-controls">
          <button onclick="decreaseQty()">-</button>
          <span id="qtyDisplay">1</span>
          <button onclick="increaseQty()">+</button>
        </div>
      </div>
      <button onclick="addToCartFromProduct()" class="btn-add-cart-large">Add to Cart</button>
    </div>
  `;
}

function increaseQty() {
  const qtyDisplay = document.getElementById("qtyDisplay");
  qtyDisplay.textContent = parseInt(qtyDisplay.textContent) + 1;
}

function decreaseQty() {
  const qtyDisplay = document.getElementById("qtyDisplay");
  const qty = parseInt(qtyDisplay.textContent);
  if (qty > 1) qtyDisplay.textContent = qty - 1;
}

function addToCartFromProduct() {
  const productStr = localStorage.getItem("selectedProduct");
  const product = JSON.parse(productStr);
  const qty = parseInt(document.getElementById("qtyDisplay").textContent);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ ...product, quantity: qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("✅ Added to cart!");
  
  setTimeout(() => {
    window.location.href = "cart.html";
  }, 1500);
}

// Make functions global
window.toggleTheme = toggleTheme;
window.logout = logout;
window.showCart = showCart;
window.closeModal = closeModal;
window.goToCheckout = goToCheckout;
window.loadOrders = loadOrders;
window.loadProductDetails = loadProductDetails;
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;
window.addToCartFromProduct = addToCartFromProduct;
window.showNotification = showNotification;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateCartCount();
  
  // Render products if on home page
  if (document.getElementById('productsGrid')) {
    renderProducts();
    
    // Setup search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      let searchTimeout;
      searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          filterByCategory();
        }, 300);
      });
    }
  }
  
  // Load cart if on cart page
  if (window.location.pathname.includes('cart.html')) {
    loadCart();
  }
  
  // Load orders if on orders page
  if (window.location.pathname.includes('orders.html')) {
    loadOrders();
  }
  
  // Load product details if on product page
  if (window.location.pathname.includes('product.html')) {
    loadProductDetails();
  }
  
  // Close modal when clicking outside
  window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  };
});
// ========================================
// cart.js - Cart Functions
// ========================================

// Add to cart
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("✅ Added to cart!");
}

// Update cart count
function updateCartCount() {
  const cartCountElements = document.querySelectorAll(".cart-count");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  cartCountElements.forEach(el => {
    if (el) el.textContent = totalItems;
  });
}

// Show notification
function showNotification(message) {
  // Remove existing notifications
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();
  
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Load cart on cart.html
function loadCart() {
  const cartItems = document.getElementById("cartItems");
  const totalElement = document.getElementById("totalAmount");
  
  if (!cartItems || !totalElement) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  if (cart.length === 0) {
    cartItems.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
    totalElement.textContent = "₵0.00";
    return;
  }

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <div class="cart-item-details">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/60x60'">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="price">₵${item.price}</p>
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="changeQty(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
      </div>
      <div>
        <p style="font-weight:bold;">₵${subtotal.toFixed(2)}</p>
        <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;
    cartItems.appendChild(itemDiv);
  });

  totalElement.textContent = `₵${total.toFixed(2)}`;
}

// Change quantity
function changeQty(id, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity < 1) item.quantity = 1;

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

// Remove item
function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

// Clear cart
function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    localStorage.removeItem("cart");
    loadCart();
    updateCartCount();
  }
}

// Make functions global
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeItem = removeItem;
window.clearCart = clearCart;
window.updateCartCount = updateCartCount;
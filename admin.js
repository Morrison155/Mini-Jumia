// ========================================
// admin.js - Admin Panel Functions
// ========================================

const ADMIN_PASSWORD = "admin123"; // Change this password

function login() {
  const password = document.getElementById("adminPassword").value;
  const errorEl = document.getElementById("loginError");
  
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem("isAdmin", "true");
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadAdminProducts();
    loadAdminOrders();
  } else {
    errorEl.textContent = "Invalid password!";
  }
}

function logout() {
  localStorage.removeItem("isAdmin");
  window.location.href = "home_page.html";
}

function showAddProductForm() {
  const form = document.getElementById("addProductForm");
  form.classList.toggle("show");
}

function addProduct() {
  const newProduct = {
    id: Date.now(),
    name: document.getElementById("newProductName").value,
    category: document.getElementById("newProductCategory").value,
    price: parseFloat(document.getElementById("newProductPrice").value),
    oldPrice: parseFloat(document.getElementById("newProductOldPrice").value) || 0,
    discount: 0,
    image: document.getElementById("newProductImage").value || "https://via.placeholder.com/400x300",
    rating: 4.5,
    description: "New product added by admin"
  };

  if (!newProduct.name || !newProduct.category || !newProduct.price) {
    alert("Please fill required fields!");
    return;
  }

  let products = JSON.parse(localStorage.getItem("adminProducts")) || PRODUCTS;
  products.push(newProduct);
  localStorage.setItem("adminProducts", JSON.stringify(products));
  
  alert("✅ Product added successfully!");
  loadAdminProducts();
  document.getElementById("addProductForm").classList.remove("show");
}

function loadAdminProducts() {
  const productsList = document.getElementById("productsList");
  const products = JSON.parse(localStorage.getItem("adminProducts")) || PRODUCTS;

  if (products.length === 0) {
    productsList.innerHTML = "<p>No products available.</p>";
    return;
  }

  productsList.innerHTML = products.map(product => `
    <div class="admin-product-card">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/80'">
      <div style="flex:1">
        <h4>${product.name}</h4>
        <p>Category: ${product.category}</p>
        <p>Price: ₵${product.price} <del>₵${product.oldPrice}</del></p>
        <div class="admin-actions">
          <button onclick="deleteProduct(${product.id})">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  
  let products = JSON.parse(localStorage.getItem("adminProducts")) || PRODUCTS;
  products = products.filter(p => p.id !== id);
  localStorage.setItem("adminProducts", JSON.stringify(products));
  alert("✅ Product deleted!");
  loadAdminProducts();
}

function loadAdminOrders() {
  const ordersList = document.getElementById("ordersListAdmin");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    ordersList.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  ordersList.innerHTML = orders.map(order => `
    <div class="order-card">
      <div class="order-header">
        <h3>Order #${order.id}</h3>
        <select onchange="updateOrderStatus('${order.id}', this.value)">
          <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
          <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </div>
      <div class="order-details">
        <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
        <p><strong>Total:</strong> ₵${order.total.toFixed(2)}</p>
        <p><strong>Items:</strong> ${order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}</p>
        ${order.customer ? `
          <p><strong>Customer:</strong> ${order.customer.fullName}</p>
          <p><strong>Phone:</strong> ${order.customer.phone}</p>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function updateOrderStatus(orderId, newStatus) {
  let orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex > -1) {
    orders[orderIndex].status = newStatus;
    localStorage.setItem("orders", JSON.stringify(orders));
    alert(`✅ Order status updated to ${newStatus}`);
    loadAdminOrders();
  }
}

// Make functions global
window.login = login;
window.logout = logout;
window.showAddProductForm = showAddProductForm;
window.addProduct = addProduct;
window.loadAdminProducts = loadAdminProducts;
window.deleteProduct = deleteProduct;
window.loadAdminOrders = loadAdminOrders;
window.updateOrderStatus = updateOrderStatus;

// Init admin panel
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("isAdmin") === "true") {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadAdminProducts();
    loadAdminOrders();
  }
  
  // Auto-login check for testing (remove in production)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('auto') === 'login') {
    document.getElementById("adminPassword").value = ADMIN_PASSWORD;
    login();
  }
});
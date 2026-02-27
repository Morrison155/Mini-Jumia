// ========================================
// data.js - Product Database & Functions
// ========================================

// Product Database
const PRODUCTS = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra",
    category: "Phones",
    price: 3299,
    oldPrice: 3599,
    discount: 8,
    image: "images/shopping.avif",
    rating: 4.8,
    description: "Latest Samsung flagship with AI camera features and 5G connectivity."
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    category: "Phones",
    price: 4599,
    oldPrice: 4799,
    discount: 4,
    image: "images/shopping (1).avif",
    rating: 4.9,
    description: "Titanium design, A17 Pro chip, Action button."
  },
  {
    id: 3,
    name: "Kente Traditional Dress",
    category: "Fashion",
    price: 180,
    oldPrice: 220,
    discount: 18,
    image: "images/download.jfif",
    rating: 4.5,
    description: "Authentic Ghanaian Kente fabric dress with modern styling."
  },
  {
    id: 4,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 299,
    oldPrice: 399,
    discount: 25,
    image: "images/shopping (2).avif",
    rating: 4.3,
    description: "Noise cancelling over-ear headphones with 30-hour battery life."
  },
  {
    id: 5,
    name: "Fresh Tomatoes (1kg)",
    category: "Grocery",
    price: 15,
    oldPrice: 20,
    discount: 25,
    image: "images/330px-Tomato_je.jpg",
    rating: 4.7,
    description: "Farm fresh tomatoes delivered same day."
  },
  {
    id: 6,
    name: "Nike Air Max 270",
    category: "Fashion",
    price: 450,
    oldPrice: 520,
    discount: 13,
    image: "images/s-l960.webp",
    rating: 4.6,
    description: "Comfortable running shoes with air cushioning."
  },
  {
    id: 7,
    name: "HP Pavilion Laptop",
    category: "Electronics",
    price: 2199,
    oldPrice: 2499,
    discount: 12,
    image: "images/315K4EA.jpg",
    rating: 4.4,
    description: "15.6-inch FHD display, Intel i5, 8GB RAM, 256GB SSD."
  },
  {
    id: 8,
    name: "Cocobod Premium Chocolate",
    category: "Grocery",
    price: 25,
    oldPrice: 30,
    discount: 17,
    image: "images/images.jfif",
    description: "100% Ghanaian cocoa in 50g bars."
  },
  {
    id: 9,
    name: "Samsung 55-inch Smart TV",
    category: "Electronics",
    price: 2899,
    oldPrice: 3299,
    discount: 12,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    rating: 4.6,
    description: "4K UHD, HDR, Smart TV with Android OS."
  },
  {
    id: 10,
    name: "Men's Linen Shirt",
    category: "Fashion",
    price: 89,
    oldPrice: 120,
    discount: 26,
    image: "images/shopping (3).avif",
    rating: 4.2,
    description: "Breathable linen shirt perfect for tropical weather."
  },
  {
    id: 11,
    name: "Infant Formula (900g)",
    category: "Grocery",
    price: 145,
    oldPrice: 165,
    discount: 12,
    image: "images/images (1).jfif",
    rating: 4.9,
    description: "Stage 1 infant formula. Pediatrician recommended."
  },
  {
    id: 12,
    name: "Power Bank 20000mAh",
    category: "Electronics",
    price: 120,
    oldPrice: 150,
    discount: 20,
    image: "images/61liDz9uZWL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.4,
    description: "Fast charging power bank with dual USB ports."
  },
  {
    id: 13,
    name: "Blender & Juicer Combo",
    category: "Home & Kitchen",
    price: 350,
    oldPrice: 400,
    discount: 12,
    image: "images/715Sdi8YZeL._AC_SL1000__.jpg",
    rating: 4.1,
    description: "Powerful 1000W blender perfect for smoothies."
  },
  {
    id: 14,
    name: "Premium Shea Butter (500g)",
    category: "Beauty & Personal Care",
    price: 45,
    oldPrice: 55,
    discount: 18,
    image: "images/Ghanas-Pure-Shea-Butter-19.4oz.webp",
    rating: 4.9,
    description: "Unrefined, 100% pure shea butter."
  },
  {
    id: 15,
    name: "Smart Watch Band (Silicone)",
    category: "Electronics",
    price: 55,
    oldPrice: 75,
    discount: 26,
    image: "images/3cd7cd20-80e0-41b5-8dd1-fbce4dcd45e522261000.webp",
    rating: 4.0,
    description: "Comfortable replacement strap for smartwatches."
  },
  {
    id: 16,
    name: "Men's Leather Wallet",
    category: "Fashion",
    price: 99,
    oldPrice: 150,
    discount: 34,
    image: "images/shopping (3).avif",
    rating: 4.3,
    description: "Genuine leather bi-fold wallet."
  },
  {
    id: 17,
    name: "Cooking Oil (5L)",
    category: "Grocery",
    price: 75,
    oldPrice: 80,
    discount: 6,
    image: "images/images (2).jfif",
    rating: 4.5,
    description: "Refined vegetable cooking oil."
  },
  {
    id: 18,
    name: "LED Desk Lamp (Adjustable)",
    category: "Home & Kitchen",
    price: 110,
    oldPrice: 130,
    discount: 15,
    image: "images/images (3).jfif",
    rating: 4.7,
    description: "Energy-saving LED lamp with flexible neck."
  },
  {
    id: 19,
    name: "Children's Learning Tablet",
    category: "Electronics",
    price: 650,
    oldPrice: 750,
    discount: 13,
    image: "images/shopping (4).avif",
    rating: 4.6,
    description: "Educational tablet for ages 4-8."
  },
  {
    id: 20,
    name: "Natural Hair Conditioner",
    category: "Beauty & Personal Care",
    price: 58,
    oldPrice: 65,
    discount: 10,
    image: "images/images (4).jfif",
    rating: 4.8,
    description: "Deep moisturizing conditioner for natural hair."
  },
  {
    id: 21,
    name: "Ghana Flag T-Shirt",
    category: "Fashion",
    price: 35,
    oldPrice: 45,
    discount: 22,
    image: "images/64221846b0d4eb6a2c11fbee-ghana-shirt-men-ghana-flag-shirt-women.jpg",
    rating: 4.4,
    description: "High-quality cotton t-shirt with Ghana flag."
  },
  {
    id: 22,
    name: "Canned Tuna (4 x 150g)",
    category: "Grocery",
    price: 28,
    oldPrice: 32,
    discount: 12,
    image: "images/images (5).jfif",
    rating: 4.2,
    description: "Packed in sunflower oil. Great source of protein."
  },
  {
    id: 23,
    name: "Digital Kitchen Scale",
    category: "Home & Kitchen",
    price: 65,
    oldPrice: 90,
    discount: 27,
    image: "images/1.jpg",
    rating: 4.5,
    description: "Accurate digital scale for baking."
  },
  {
    id: 24,
    name: "Yoga Mat (Extra Thick)",
    category: "Sports & Outdoors",
    price: 130,
    oldPrice: 180,
    discount: 28,
    image: "images/ALPIDEX-Yogamatte-Extra-Dick-1-5-cm-Gymnastikmatte-3-Verschiedene-Groessen-16496.jpg",
    rating: 4.7,
    description: "Non-slip, extra thick yoga mat."
  }
];

// Current filtered products
let currentProducts = [...PRODUCTS];

// Render product grid
function renderProducts(products = currentProducts) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  
  if (products.length === 0) {
    grid.innerHTML = '<div class="empty-state">No products found.</div>';
    return;
  }
  
  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
      <div class="product-info">
        <h4>${product.name}</h4>
        <span class="category">${product.category}</span>
        <div class="price">₵${product.price}</div>
        <div class="product-actions">
          <button class="btn" onclick="viewDetails(${product.id})">View</button>
          <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join("");
}

// Filter by category
function filterByCategory() {
  const category = document.getElementById("categorySelect")?.value || "all";
  const searchTerm = document.getElementById("searchInput")?.value?.toLowerCase() || "";
  
  currentProducts = PRODUCTS.filter(p => {
    const matchCategory = category === "all" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(searchTerm) || 
                        p.category.toLowerCase().includes(searchTerm);
    return matchCategory && matchSearch;
  });
  
  sortProducts();
}

// Sort products
function sortProducts() {
  const sortValue = document.getElementById("sortSelect")?.value || "default";
  
  if (sortValue === "low") {
    currentProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "high") {
    currentProducts.sort((a, b) => b.price - a.price);
  } else {
    currentProducts.sort((a, b) => a.id - b.id);
  }
  
  renderProducts();
}

// View product details
function viewDetails(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (product) {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product.html";
  }
}

// Make functions globally accessible
window.filterByCategory = filterByCategory;
window.sortProducts = sortProducts;
window.viewDetails = viewDetails;
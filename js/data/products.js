// Product Database
const products = [
  // Mobiles & Tablets
  {
    id: 1,
    name: "Premium Smartphone X Pro",
    category: "mobiles",
    price: 29999,
    originalPrice: 39999,
    discount: 25,
    rating: 4.5,
    reviews: 2847,
    image: "images/products/phone1.jpg",
    features: "8GB RAM, 128GB Storage, 6.7\" Display",
    inStock: true,
    assured: true
  },
  {
    id: 2,
    name: "Budget Smartphone Y Lite",
    category: "mobiles",
    price: 12999,
    originalPrice: 15999,
    discount: 19,
    rating: 4.2,
    reviews: 1523,
    image: "images/placeholder.jpg",
    features: "4GB RAM, 64GB Storage, 6.5\" Display",
    inStock: true,
    assured: true
  },
  {
    id: 3,
    name: "Flagship Smartphone Z Ultra",
    category: "mobiles",
    price: 54999,
    originalPrice: 69999,
    discount: 21,
    rating: 4.7,
    reviews: 3921,
    image: "images/placeholder.jpg",
    features: "12GB RAM, 256GB Storage, 6.8\" AMOLED",
    inStock: true,
    assured: true
  },
  {
    id: 4,
    name: "Tablet Pro 11 inch",
    category: "mobiles",
    price: 34999,
    originalPrice: 44999,
    discount: 22,
    rating: 4.4,
    reviews: 892,
    image: "images/placeholder.jpg",
    features: "11\" Display, 6GB RAM, 128GB Storage",
    inStock: true,
    assured: false
  },

  // Electronics - Laptops
  {
    id: 5,
    name: "Gaming Laptop RTX 4060",
    category: "electronics",
    price: 89999,
    originalPrice: 109999,
    discount: 18,
    rating: 4.6,
    reviews: 1247,
    image: "images/products/laptop1.jpg",
    features: "Intel i7, 16GB RAM, RTX 4060, 512GB SSD",
    inStock: true,
    assured: true
  },
  {
    id: 6,
    name: "Business Laptop Ultra Slim",
    category: "electronics",
    price: 54999,
    originalPrice: 64999,
    discount: 15,
    rating: 4.3,
    reviews: 876,
    image: "images/placeholder.jpg",
    features: "Intel i5, 8GB RAM, 512GB SSD, 14\" FHD",
    inStock: true,
    assured: true
  },
  {
    id: 7,
    name: "Creator Laptop 4K Display",
    category: "electronics",
    price: 124999,
    originalPrice: 149999,
    discount: 17,
    rating: 4.8,
    reviews: 543,
    image: "images/placeholder.jpg",
    features: "Intel i9, 32GB RAM, RTX 4070, 1TB SSD",
    inStock: true,
    assured: true
  },

  // Electronics - TVs
  {
    id: 8,
    name: "Smart TV 55\" 4K UHD",
    category: "electronics",
    price: 42999,
    originalPrice: 54999,
    discount: 22,
    rating: 4.4,
    reviews: 2134,
    image: "images/products/tv1.jpg",
    features: "55\" 4K UHD, Smart TV, HDR10+",
    inStock: true,
    assured: true
  },
  {
    id: 9,
    name: "OLED TV 65\" Premium",
    category: "electronics",
    price: 129999,
    originalPrice: 159999,
    discount: 19,
    rating: 4.7,
    reviews: 876,
    image: "images/placeholder.jpg",
    features: "65\" OLED, 4K, Dolby Vision, 120Hz",
    inStock: true,
    assured: true
  },

  // Fashion - Clothing
  {
    id: 10,
    name: "Men's Casual Shirt",
    category: "fashion",
    price: 799,
    originalPrice: 1599,
    discount: 50,
    rating: 4.1,
    reviews: 3421,
    image: "images/products/shirt1.jpg",
    features: "100% Cotton, Regular Fit, Multiple Colors",
    inStock: true,
    assured: false
  },
  {
    id: 11,
    name: "Women's Ethnic Dress",
    category: "fashion",
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.3,
    reviews: 2876,
    image: "images/placeholder.jpg",
    features: "Designer Wear, Premium Fabric, Party Wear",
    inStock: true,
    assured: false
  },
  {
    id: 12,
    name: "Men's Denim Jeans",
    category: "fashion",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    rating: 4.2,
    reviews: 4521,
    image: "images/placeholder.jpg",
    features: "Slim Fit, Stretchable, Dark Blue",
    inStock: true,
    assured: false
  },

  // Home & Furniture
  {
    id: 13,
    name: "3-Seater Sofa Set",
    category: "home",
    price: 24999,
    originalPrice: 34999,
    discount: 29,
    rating: 4.4,
    reviews: 567,
    image: "images/placeholder.jpg",
    features: "Fabric Upholstery, Wooden Frame, Grey Color",
    inStock: true,
    assured: true
  },
  {
    id: 14,
    name: "Queen Size Bed with Storage",
    category: "home",
    price: 18999,
    originalPrice: 26999,
    discount: 30,
    rating: 4.5,
    reviews: 892,
    image: "images/placeholder.jpg",
    features: "Engineered Wood, Hydraulic Storage, Brown",
    inStock: true,
    assured: true
  },

  // Appliances
  {
    id: 15,
    name: "Refrigerator 260L Double Door",
    category: "appliances",
    price: 22999,
    originalPrice: 28999,
    discount: 21,
    rating: 4.3,
    reviews: 1234,
    image: "images/placeholder.jpg",
    features: "260L, 3 Star, Frost Free, Inverter",
    inStock: true,
    assured: true
  },
  {
    id: 16,
    name: "Washing Machine 7kg Front Load",
    category: "appliances",
    price: 24999,
    originalPrice: 32999,
    discount: 24,
    rating: 4.4,
    reviews: 987,
    image: "images/placeholder.jpg",
    features: "7kg, Front Load, 1200 RPM, Inverter",
    inStock: true,
    assured: true
  },
  {
    id: 17,
    name: "Air Conditioner 1.5 Ton Split",
    category: "appliances",
    price: 32999,
    originalPrice: 42999,
    discount: 23,
    rating: 4.5,
    reviews: 1567,
    image: "images/products/ac1.jpg",
    features: "1.5 Ton, 5 Star, Inverter, Copper Coil",
    inStock: true,
    assured: true
  },
  {
    id: 18,
    name: "Microwave Oven 28L Convection",
    category: "appliances",
    price: 12999,
    originalPrice: 16999,
    discount: 24,
    rating: 4.2,
    reviews: 743,
    image: "images/placeholder.jpg",
    features: "28L, Convection, Auto Cook Menu",
    inStock: true,
    assured: false
  }
];

// Categories
const categories = [
  { id: "mobiles", name: "Mobiles", icon: "📱" },
  { id: "electronics", name: "Electronics", icon: "💻" },
  { id: "fashion", name: "Fashion", icon: "👕" },
  { id: "home", name: "Home & Furniture", icon: "🛋️" },
  { id: "appliances", name: "Appliances", icon: "🔌" },
  { id: "books", name: "Books", icon: "📚" },
  { id: "toys", name: "Toys", icon: "🧸" },
  { id: "beauty", name: "Beauty", icon: "💄" }
];

// Brands
const brands = [
  "Samsung", "Apple", "OnePlus", "Xiaomi", "Realme",
  "Dell", "HP", "Lenovo", "Asus", "Acer",
  "Sony", "LG", "Panasonic", "Whirlpool", "Godrej",
  "Nike", "Adidas", "Puma", "Levi's", "Zara"
];

// Get products by category
function getProductsByCategory(categoryId) {
  return products.filter(product => product.category === categoryId);
}

// Get product by ID
function getProductById(id) {
  return products.find(product => product.id === parseInt(id));
}

// Search products
function searchProducts(query) {
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.features.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  );
}

// Filter products
function filterProducts(filters) {
  let filtered = [...products];

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  // Filter by price range
  if (filters.minPrice) {
    filtered = filtered.filter(p => p.price >= filters.minPrice);
  }
  if (filters.maxPrice) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice);
  }

  // Filter by rating
  if (filters.minRating) {
    filtered = filtered.filter(p => p.rating >= filters.minRating);
  }

  // Filter by assured
  if (filters.assured) {
    filtered = filtered.filter(p => p.assured);
  }

  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // popularity (by reviews)
        filtered.sort((a, b) => b.reviews - a.reviews);
    }
  }

  return filtered;
}

// Get featured/top deals products
function getTopDeals(limit = 8) {
  return products
    .filter(p => p.discount >= 20)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, limit);
}

// Get best rated products
function getBestRated(limit = 8) {
  return products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

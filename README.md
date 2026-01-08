# CartIndia - E-Commerce Platform

![CartIndia Logo](images/logo.png)

A modern, responsive e-commerce platform inspired by Flipkart, built with HTML, CSS, and JavaScript.

## 🚀 Features

- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **Product Catalog** - Browse products with beautiful cards
- ✅ **Shopping Cart** - Add/remove items with localStorage persistence
- ✅ **Wishlist** - Save your favorite products
- ✅ **Filters & Sorting** - Filter by price, rating, and sort products
- ✅ **Search** - Search for products across categories
- ✅ **Checkout Flow** - Complete order placement (demo)
- ✅ **Beautiful UI** - Modern design with smooth animations

## 🎨 Design

- **Color Scheme**: Blue (#2874f0), Yellow (#FFE11B), Orange (#FF9F00)
- **Typography**: Inter font family
- **White Background**: Clean and professional look
- **Smooth Animations**: Enhanced user experience

## 📱 How to Run

### Method 1: Open Directly in Browser (Easiest)
1. Navigate to the `d:\cartindia` folder
2. Double-click on `index.html`
3. The website will open in your default browser

### Method 2: Using VS Code Live Server (Recommended)
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Website will open at `http://localhost:5500`

### Method 3: Using Python HTTP Server
```bash
# Navigate to the project folder
cd d:\cartindia

# Run Python server (Python 3)
python -m http.server 8000

# Open browser and go to:
# http://localhost:8000
```

### Method 4: Using Node.js HTTP Server
```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to project folder
cd d:\cartindia

# Run server
http-server

# Open browser and go to:
# http://localhost:8080
```

## 📂 Project Structure

```
cartindia/
├── index.html              # Homepage
├── products.html           # Product listing page
├── cart.html              # Shopping cart
├── checkout.html          # Checkout page
├── wishlist.html          # Wishlist page
├── css/
│   ├── styles.css         # Main styles
│   └── components.css     # Component styles
├── js/
│   ├── data/
│   │   └── products.js    # Product database
│   ├── cart.js           # Cart management
│   └── main.js           # Main app logic
└── images/
    ├── logo.png          # CartIndia logo
    ├── products/         # Product images
    ├── banners/          # Banner images
    └── placeholder.jpg   # Placeholder image
```

## 🛍️ How to Use

1. **Browse Products**: Click on categories or search for products
2. **Add to Cart**: Click on a product card to view details, then add to cart
3. **Wishlist**: Click the heart icon to save products to wishlist
4. **Checkout**: Go to cart and click "Place Order"

## 🔧 Customization

### Adding New Products
Edit `js/data/products.js` and add new product objects:

```javascript
{
  id: 19,
  name: "Your Product Name",
  category: "mobiles",
  price: 9999,
  originalPrice: 12999,
  discount: 23,
  rating: 4.5,
  reviews: 100,
  image: "images/products/yourimage.jpg",
  features: "Product features here",
  inStock: true,
  assured: true
}
```

### Changing Colors
Edit `css/styles.css` and modify the CSS custom properties:

```css
:root {
  --primary-blue: #2874f0;
  --accent-yellow: #FFE11B;
  --accent-orange: #FF9F00;
  /* ... other colors */
}
```

## 🌐 Browser Compatibility

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile App

To convert this to a mobile app:

1. **Android**: Use Android WebView or tools like Apache Cordova/Capacitor
2. **iOS**: Use WKWebView or similar frameworks
3. **PWA**: Add a service worker and manifest.json for Progressive Web App

## 🔮 Future Enhancements

- [ ] Backend API (Node.js/Express)
- [ ] Database (MongoDB/PostgreSQL)
- [ ] User Authentication
- [ ] Real Payment Gateway (Razorpay/Stripe)
- [ ] Admin Panel
- [ ] Order Tracking
- [ ] Product Reviews
- [ ] Email Notifications

## 📄 License

This is a demo project for learning purposes.

## 🤝 Support

For any questions or issues, feel free to reach out!

---

**Made with ❤️ for CartIndia**

// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartBadge();
    }

    // Load cart from localStorage
    loadCart() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    // Save cart to localStorage and Cloud if logged in
    async saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartBadge();

        // Cloud sync if user is logged in
        if (window.authManager && window.authManager.user) {
            await this.syncWithCloud();
        }
    }

    async syncWithCloud() {
        if (!window.authManager || !window.authManager.user) return;

        try {
            const { db, doc, setDoc } = await import('./firebase-config.js');
            const userRef = doc(db, 'carts', window.authManager.user.uid);
            await setDoc(userRef, { items: this.items, updatedAt: new Date() });
        } catch (error) {
            console.error("Cloud sync failed:", error);
        }
    }

    async loadFromCloud() {
        if (!window.authManager || !window.authManager.user) return;

        try {
            const { db, doc, getDoc } = await import('./firebase-config.js');
            const userRef = doc(db, 'carts', window.authManager.user.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                const cloudItems = docSnap.data().items;
                // Merge or replace logic (replacing for simplicity here)
                this.items = cloudItems;
                localStorage.setItem('cart', JSON.stringify(this.items));
                this.updateCartBadge();
                if (typeof loadCartItems === 'function') loadCartItems(); // Refresh cart page if open
            }
        } catch (error) {
            console.error("Failed to load from cloud:", error);
        }
    }

    // Add item to cart
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} added to cart!`, 'success');
        return true;
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.showNotification('Item removed from cart', 'info');
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    // Get cart items
    getItems() {
        return this.items;
    }

    // Get cart count
    getCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Get cart subtotal
    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get total savings
    getSavings() {
        return this.items.reduce((total, item) => {
            const savings = (item.originalPrice - item.price) * item.quantity;
            return total + savings;
        }, 0);
    }

    // Get delivery charge
    getDeliveryCharge() {
        const subtotal = this.getSubtotal();
        return subtotal >= 500 ? 0 : 40;
    }

    // Get total amount
    getTotal() {
        return this.getSubtotal() + this.getDeliveryCharge();
    }

    // Clear cart
    clear() {
        this.items = [];
        this.saveCart();
    }

    // Update cart badge in header
    updateCartBadge() {
        const badge = document.querySelector('.cart-count');
        if (badge) {
            const count = this.getCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '80px',
            right: '20px',
            padding: '1rem 1.5rem',
            backgroundColor: type === 'success' ? '#10B981' : '#2874f0',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: '9999',
            animation: 'slideIn 0.3s ease-out',
            fontWeight: '500'
        });

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Wishlist Management
class Wishlist {
    constructor() {
        this.items = this.loadWishlist();
    }

    // Load wishlist from localStorage
    loadWishlist() {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    }

    // Save wishlist to localStorage
    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.items));
    }

    // Add item to wishlist
    addItem(product) {
        const exists = this.items.find(item => item.id === product.id);
        if (!exists) {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                rating: product.rating
            });
            this.saveWishlist();
            cart.showNotification(`${product.name} added to wishlist!`, 'success');
            return true;
        }
        return false;
    }

    // Remove item from wishlist
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveWishlist();
        cart.showNotification('Item removed from wishlist', 'info');
    }

    // Toggle item in wishlist
    toggleItem(product) {
        const exists = this.items.find(item => item.id === product.id);
        if (exists) {
            this.removeItem(product.id);
            return false;
        } else {
            this.addItem(product);
            return true;
        }
    }

    // Check if item is in wishlist
    hasItem(productId) {
        return this.items.some(item => item.id === productId);
    }

    // Get wishlist items
    getItems() {
        return this.items;
    }

    // Get wishlist count
    getCount() {
        return this.items.length;
    }

    // Move item to cart
    moveToCart(productId) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            const product = getProductById(productId);
            if (product) {
                cart.addItem(product);
                this.removeItem(productId);
            }
        }
    }
}

// Initialize cart and wishlist
const cart = new ShoppingCart();
const wishlist = new Wishlist();

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

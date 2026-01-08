// ============================================
// PREMIUM FEATURES - BEYOND FLIPKART
// Advanced Functionality & Interactions
// ============================================

// Search Autocomplete
class SearchAutocomplete {
    constructor() {
        this.searchInput = document.querySelector('.search-input');
        this.autocompleteContainer = null;
        this.init();
    }

    init() {
        if (!this.searchInput) return;

        // Create autocomplete container
        this.autocompleteContainer = document.createElement('div');
        this.autocompleteContainer.className = 'search-autocomplete';
        this.searchInput.parentElement.appendChild(this.autocompleteContainer);

        // Add event listeners
        this.searchInput.addEventListener('input', (e) => this.handleInput(e));
        this.searchInput.addEventListener('focus', (e) => this.handleInput(e));

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!this.searchInput.parentElement.contains(e.target)) {
                this.hide();
            }
        });
    }

    handleInput(e) {
        const query = e.target.value.trim();

        if (query.length < 2) {
            this.hide();
            return;
        }

        const results = searchProducts(query).slice(0, 5);
        this.show(results, query);
    }

    show(results, query) {
        if (results.length === 0) {
            this.hide();
            return;
        }

        this.autocompleteContainer.innerHTML = results.map(product => `
      <div class="autocomplete-item" onclick="navigateToProduct(${product.id})">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
        <div style="flex: 1;">
          <div style="font-weight: 500; font-size: 0.875rem;">${this.highlightQuery(product.name, query)}</div>
          <div style="font-size: 0.75rem; color: var(--gray-600);">${formatCurrency(product.price)}</div>
        </div>
      </div>
    `).join('');

        this.autocompleteContainer.classList.add('active');
    }

    hide() {
        this.autocompleteContainer.classList.remove('active');
    }

    highlightQuery(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong style="color: var(--primary-blue);">$1</strong>');
    }
}

// Quick View Modal
function showQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.id = 'quickViewModal';

    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    modal.innerHTML = `
    <div class="modal" style="max-width: 800px;">
      <div class="modal-header">
        <h2 class="modal-title">Quick View</h2>
        <button class="modal-close" onclick="closeQuickView()">✕</button>
      </div>
      <div class="modal-body">
        <div style="display: grid; grid-template-columns: 300px 1fr; gap: 2rem;">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: var(--radius-md);" onerror="this.src='images/placeholder.jpg'">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">${product.name}</h3>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
              <span class="rating-badge">★ ${formatRating(product.rating)}</span>
              <span style="color: var(--gray-600); font-size: 0.875rem;">(${product.reviews.toLocaleString()})</span>
            </div>
            <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1rem;">
              <span style="font-size: 1.75rem; font-weight: 700;">${formatCurrency(product.price)}</span>
              <span style="text-decoration: line-through; color: var(--gray-400);">${formatCurrency(product.originalPrice)}</span>
              <span style="color: var(--accent-green); font-weight: 600;">${discountPercent}% off</span>
            </div>
            <p style="color: var(--gray-600); margin-bottom: 1.5rem;">${product.features}</p>
            <div style="display: flex; gap: 1rem;">
              <button class="btn btn-yellow" onclick="addToCart(${product.id}); closeQuickView();" style="flex: 1;">Add to Cart</button>
              <button class="btn btn-primary" onclick="navigateToProduct(${product.id})" style="flex: 1;">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

    document.body.appendChild(modal);
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.remove();
}

// Product Comparison
class ProductComparison {
    constructor() {
        this.products = [];
        this.maxProducts = 4;
        this.init();
    }

    init() {
        // Create comparison bar
        const bar = document.createElement('div');
        bar.className = 'comparison-bar';
        bar.id = 'comparisonBar';
        bar.innerHTML = `
      <div class="container" style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; gap: 1rem; align-items: center; flex: 1;">
          <span style="font-weight: 600;">Compare Products:</span>
          <div id="comparisonItems" style="display: flex; gap: 0.5rem; flex: 1;"></div>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-primary" onclick="comparison.compare()">Compare</button>
          <button class="btn btn-outline" onclick="comparison.clear()">Clear</button>
        </div>
      </div>
    `;
        document.body.appendChild(bar);
    }

    add(productId) {
        if (this.products.includes(productId)) return;
        if (this.products.length >= this.maxProducts) {
            alert(`You can compare up to ${this.maxProducts} products`);
            return;
        }

        this.products.push(productId);
        this.update();
    }

    remove(productId) {
        this.products = this.products.filter(id => id !== productId);
        this.update();
    }

    update() {
        const bar = document.getElementById('comparisonBar');
        const itemsContainer = document.getElementById('comparisonItems');

        if (this.products.length === 0) {
            bar.classList.remove('active');
            return;
        }

        bar.classList.add('active');
        itemsContainer.innerHTML = this.products.map(id => {
            const product = getProductById(id);
            return `
        <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: var(--gray-50); border-radius: var(--radius-sm);">
          <img src="${product.image}" style="width: 30px; height: 30px; object-fit: cover; border-radius: var(--radius-sm);" onerror="this.src='images/placeholder.jpg'">
          <span style="font-size: 0.875rem;">${product.name.substring(0, 20)}...</span>
          <button onclick="comparison.remove(${id})" style="color: var(--gray-600);">✕</button>
        </div>
      `;
        }).join('');
    }

    compare() {
        if (this.products.length < 2) {
            alert('Please select at least 2 products to compare');
            return;
        }

        // Create comparison modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
      <div class="modal" style="max-width: 1000px;">
        <div class="modal-header">
          <h2 class="modal-title">Product Comparison</h2>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
        </div>
        <div class="modal-body">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="padding: 1rem; text-align: left; border-bottom: 2px solid var(--gray-200);">Feature</th>
                ${this.products.map(id => {
            const product = getProductById(id);
            return `<th style="padding: 1rem; text-align: center; border-bottom: 2px solid var(--gray-200);">
                    <img src="${product.image}" style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 0.5rem;" onerror="this.src='images/placeholder.jpg'">
                    <div style="font-size: 0.875rem;">${product.name}</div>
                  </th>`;
        }).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 1rem; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Price</td>
                ${this.products.map(id => {
            const product = getProductById(id);
            return `<td style="padding: 1rem; text-align: center; border-bottom: 1px solid var(--gray-200); font-weight: 700;">${formatCurrency(product.price)}</td>`;
        }).join('')}
              </tr>
              <tr>
                <td style="padding: 1rem; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Rating</td>
                ${this.products.map(id => {
            const product = getProductById(id);
            return `<td style="padding: 1rem; text-align: center; border-bottom: 1px solid var(--gray-200);">★ ${formatRating(product.rating)}</td>`;
        }).join('')}
              </tr>
              <tr>
                <td style="padding: 1rem; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Discount</td>
                ${this.products.map(id => {
            const product = getProductById(id);
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            return `<td style="padding: 1rem; text-align: center; border-bottom: 1px solid var(--gray-200); color: var(--accent-green); font-weight: 600;">${discount}% off</td>`;
        }).join('')}
              </tr>
              <tr>
                <td style="padding: 1rem; font-weight: 600;">Features</td>
                ${this.products.map(id => {
            const product = getProductById(id);
            return `<td style="padding: 1rem; text-align: center; font-size: 0.875rem;">${product.features}</td>`;
        }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
        document.body.appendChild(modal);
    }

    clear() {
        this.products = [];
        this.update();
    }
}

// Live Chat Widget
class LiveChat {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        const chatBtn = document.createElement('div');
        chatBtn.className = 'live-chat-btn tooltip';
        chatBtn.setAttribute('data-tooltip', 'Chat with us!');
        chatBtn.innerHTML = '💬';
        chatBtn.onclick = () => this.toggle();
        document.body.appendChild(chatBtn);
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        const chatWindow = document.createElement('div');
        chatWindow.id = 'chatWindow';
        chatWindow.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 2rem;
      width: 350px;
      height: 500px;
      background: var(--white);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
      z-index: 998;
      display: flex;
      flex-direction: column;
      animation: slideInRight 0.3s ease-out;
    `;

        chatWindow.innerHTML = `
      <div style="background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark)); color: var(--white); padding: 1rem; border-radius: var(--radius-xl) var(--radius-xl) 0 0; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 700;">CartIndia Support</div>
          <div style="font-size: 0.75rem; opacity: 0.9;">We're here to help!</div>
        </div>
        <button onclick="liveChat.close()" style="color: var(--white); font-size: 1.5rem;">✕</button>
      </div>
      <div style="flex: 1; padding: 1rem; overflow-y: auto; background: var(--gray-50);">
        <div style="background: var(--white); padding: 0.75rem; border-radius: var(--radius-md); margin-bottom: 0.5rem;">
          <div style="font-size: 0.875rem;">Hello! 👋 How can we help you today?</div>
        </div>
      </div>
      <div style="padding: 1rem; border-top: 1px solid var(--gray-200);">
        <div style="display: flex; gap: 0.5rem;">
          <input type="text" placeholder="Type your message..." style="flex: 1; padding: 0.75rem; border: 1px solid var(--gray-300); border-radius: var(--radius-md); font-size: 0.875rem;">
          <button class="btn btn-primary" style="padding: 0.75rem 1rem;">Send</button>
        </div>
      </div>
    `;

        document.body.appendChild(chatWindow);
        this.isOpen = true;
    }

    close() {
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow) chatWindow.remove();
        this.isOpen = false;
    }
}

// Scroll Reveal Animation
class ScrollReveal {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.observe();
        window.addEventListener('scroll', () => this.observe());
    }

    observe() {
        const reveals = document.querySelectorAll('.reveal:not(.active)');

        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
}

// Countdown Timer for Deals
function createCountdown(endTime, elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    function update() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            element.innerHTML = '<span style="color: var(--accent-red); font-weight: 700;">Deal Ended!</span>';
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        element.innerHTML = `
      <div class="countdown">
        <div class="countdown-item">${String(hours).padStart(2, '0')}</div>
        <span>:</span>
        <div class="countdown-item">${String(minutes).padStart(2, '0')}</div>
        <span>:</span>
        <div class="countdown-item">${String(seconds).padStart(2, '0')}</div>
      </div>
    `;

        setTimeout(update, 1000);
    }

    update();
}

// Initialize Premium Features
let searchAutocomplete, comparison, liveChat, scrollReveal;

document.addEventListener('DOMContentLoaded', function () {
    // Initialize features
    searchAutocomplete = new SearchAutocomplete();
    comparison = new ProductComparison();
    liveChat = new LiveChat();
    scrollReveal = new ScrollReveal();

    // Add reveal class to elements
    document.querySelectorAll('.product-card, .category-item').forEach(el => {
        el.classList.add('reveal');
    });

    // Add quick view buttons to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        const productId = card.dataset.productId;
        if (productId) {
            const quickViewBtn = document.createElement('button');
            quickViewBtn.className = 'btn btn-primary quick-view-btn';
            quickViewBtn.textContent = 'Quick View';
            quickViewBtn.onclick = (e) => {
                e.stopPropagation();
                showQuickView(parseInt(productId));
            };
            card.querySelector('.product-info').appendChild(quickViewBtn);
        }
    });
});

// Enhanced notification system
function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'toast-notification';

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };

    const colors = {
        success: 'var(--accent-green)',
        error: 'var(--error)',
        info: 'var(--primary-blue)',
        warning: 'var(--warning)'
    };

    notification.innerHTML = `
    <div style="font-size: 1.5rem;">${icons[type]}</div>
    <div style="flex: 1;">
      <div style="font-weight: 600; margin-bottom: 0.25rem;">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
      <div style="font-size: 0.875rem; color: var(--gray-600);">${message}</div>
    </div>
    <button onclick="this.parentElement.remove()" style="color: var(--gray-400);">✕</button>
  `;

    notification.style.borderLeft = `4px solid ${colors[type]}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Add to comparison from product card
function addToComparison(productId, event) {
    event.stopPropagation();
    comparison.add(productId);
    showNotification('Product added to comparison', 'success');
}

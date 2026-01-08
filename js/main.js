// Main Application Logic

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    // Initialize components
    initializeBackToTop();
    initializeSearch();
    initializeMobileMenu();

    // Update cart badge
    if (typeof cart !== 'undefined') {
        cart.updateCartBadge();
    }
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();

    if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
        });
    }
}

// Format currency
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

// Format rating
function formatRating(rating) {
    return rating.toFixed(1);
}

// Create star rating HTML
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let html = '';

    for (let i = 0; i < fullStars; i++) {
        html += '<span class="star filled">★</span>';
    }

    if (hasHalfStar) {
        html += '<span class="star half">★</span>';
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        html += '<span class="star empty">☆</span>';
    }

    return html;
}

// Create product card HTML
function createProductCard(product) {
    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const isInWishlist = typeof wishlist !== 'undefined' && wishlist.hasItem(product.id);

    return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='images/placeholder.jpg'">
        <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist(${product.id}, event)">
          <span>${isInWishlist ? '❤️' : '🤍'}</span>
        </button>
        ${product.assured ? '<span class="product-badge">✓ Assured</span>' : ''}
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-rating">
          <span class="rating-badge">
            <span>★</span>
            <span>${formatRating(product.rating)}</span>
          </span>
          <span class="rating-count">(${product.reviews.toLocaleString()})</span>
        </div>
        <div class="product-price">
          <span class="price-current">${formatCurrency(product.price)}</span>
          <span class="price-original">${formatCurrency(product.originalPrice)}</span>
          <span class="price-discount">${discountPercent}% off</span>
        </div>
        <p class="product-features">${product.features}</p>
      </div>
    </div>
  `;
}

// Toggle wishlist
function toggleWishlist(productId, event) {
    event.stopPropagation();

    if (typeof wishlist === 'undefined') return;

    const product = getProductById(productId);
    if (product) {
        const added = wishlist.toggleItem(product);
        const btn = event.currentTarget;
        const icon = btn.querySelector('span');

        if (added) {
            btn.classList.add('active');
            icon.textContent = '❤️';
        } else {
            btn.classList.remove('active');
            icon.textContent = '🤍';
        }
    }
}

// Add to cart
function addToCart(productId, event) {
    if (event) event.stopPropagation();

    if (typeof cart === 'undefined') return;

    const product = getProductById(productId);
    if (product) {
        cart.addItem(product);
    }
}

// Navigate to product detail
function navigateToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Get URL parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on overlay click
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal(e.target.id);
    }
});

// Carousel functionality
class Carousel {
    constructor(element) {
        this.carousel = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = element.querySelectorAll('.carousel-slide');
        this.prevBtn = element.querySelector('.carousel-prev');
        this.nextBtn = element.querySelector('.carousel-next');
        this.indicators = element.querySelectorAll('.carousel-indicator');

        this.currentIndex = 0;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goTo(index));
        });

        this.startAutoPlay();

        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    goTo(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
    }

    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;

        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.next(), 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialize carousels
function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => new Carousel(carousel));
}

// Call this after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCarousels);
} else {
    initializeCarousels();
}

// Product carousel scroll
function scrollProductCarousel(direction, carouselId) {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
        const scrollAmount = 270; // card width + gap
        carousel.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Add product click handlers
document.addEventListener('click', function (e) {
    const productCard = e.target.closest('.product-card');
    if (productCard && !e.target.closest('.wishlist-btn')) {
        const productId = productCard.dataset.productId;
        if (productId) {
            navigateToProduct(productId);
        }
    }
});

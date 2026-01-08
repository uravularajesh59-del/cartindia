// CartIndia Service Worker for PWA
const CACHE_NAME = 'cartindia-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/products.html',
    '/product-detail.html',
    '/cart.html',
    '/checkout.html',
    '/wishlist.html',
    '/css/styles.css',
    '/css/components.css',
    '/css/premium.css',
    '/js/data/products.js',
    '/js/cart.js',
    '/js/main.js',
    '/js/premium.js',
    '/images/logo.png',
    '/images/placeholder.jpg',
    '/images/banners/banner1.jpg'
];

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request)
                    .then(fetchResponse => {
                        // Don't cache non-GET requests or external resources
                        if (event.request.method !== 'GET' ||
                            !event.request.url.startsWith(self.location.origin)) {
                            return fetchResponse;
                        }

                        // Clone the response
                        const responseToCache = fetchResponse.clone();

                        // Cache the new response
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return fetchResponse;
                    })
                    .catch(() => {
                        // Return offline page if available
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Background sync for cart updates
self.addEventListener('sync', event => {
    if (event.tag === 'sync-cart') {
        event.waitUntil(syncCart());
    }
});

async function syncCart() {
    // Sync cart data when online
    console.log('Service Worker: Syncing cart data');
}

// Push notifications
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New deals available!',
        icon: '/images/logo.png',
        badge: '/images/logo.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Deals',
                icon: '/images/logo.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/images/logo.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('CartIndia', options)
    );
});

// Notification click
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

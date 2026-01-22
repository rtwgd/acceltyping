const CACHE_VERSION = 'v1.2'; // Increment version on every change
const CACHE_NAME = `acceltyping-cache-${CACHE_VERSION}`;

// List of assets to cache
// Ensure this list is comprehensive for all static assets in your project
const ASSETS = [
    './', // Root index.html
    './index.html',
    './manifest.json',
    './icon-512.png',
    './sw.js', // Service Worker itself

    // choubun
    './choubun/index.html',
    './choubun/problems.js',
    './choubun/script.js',
    './choubun/style.css',

    // choubun_romaji
    './choubun_romaji/index.html',
    './choubun_romaji/problems_romaji.js',
    './choubun_romaji/script.js',
    './choubun_romaji/style.css',

    // simpletyping
    './simpletyping/index.html',
    './simpletyping/khjy.json',

    // sushi_practice
    './sushi_practice/convert_data.js',
    './sushi_practice/data.js',
    './sushi_practice/index.html',
    // './sushi_practice/index.html.bak', // Backup files should not be cached
    './sushi_practice/words_easy.json',
    './sushi_practice/words_hard.json',
    './sushi_practice/words_normal.json',

    // dark_portal
    './dark_portal/index.html',
    './dark_portal/site1_iframe/index.html',
    './dark_portal/site2_maps/index.html',
    './dark_portal/site3_cpu/index.html',
    './dark_portal/site4_custom/index.html',
    './dark_portal/site5_hacker/index.html',
    './dark_portal/site5_hacker/style.css',
    './dark_portal/site5_hacker/script.js',
];

// Install event: Cache assets
self.addEventListener('install', (event) => {
    // Immediately activate the new Service Worker even if old one is controlling clients
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching assets');
                // Filter out empty strings if any, though ASSETS should be clean
                return cache.addAll(ASSETS.filter(asset => asset.length > 0));
            })
            .catch(err => console.error('Service Worker: Failed to cache assets', err))
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Delete caches that are not the current version's cache
                    // Using startsWith to handle potential multiple caches from different versions if naming changes
                    if (cacheName.startsWith('acceltyping-cache-') && cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Claim control of all clients so the new Service Worker takes effect immediately
            return self.clients.claim();
        })
    );
});

// Fetch event: Intercept network requests
self.addEventListener('fetch', (event) => {
    // Strategy for 'navigate' requests (HTML pages like index.html): Network First
    // This ensures that the main HTML file is always fetched from the network first,
    // preventing issues with stale page versions. If network fails, fall back to cache.
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch((error) => {
                console.log('Service Worker: Network request for HTML failed, serving from cache.', error);
                return caches.match(event.request);
            })
        );
        return;
    }

    // Strategy for other static assets (CSS, JS, images, etc.): Stale-While-Revalidate
    // Serve cached content immediately for speed, and update the cache in the background
    // with the latest version from the network.
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Attempt to fetch from the network
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // If network response is good, update the cache
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Network error and no cache found for this resource
                return new Response('Service Worker: Network error and no cache found.', { status: 503, statusText: 'Service Unavailable' });
            });

            // Return cached response if available, otherwise wait for network fetch
            return cachedResponse || fetchPromise;
        })
    );
});
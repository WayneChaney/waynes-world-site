/* Missed Call Calculator - service worker.  BUMP CACHE_VERSION ON EVERY DEPLOY. */
const CACHE_VERSION = 'missed-call-v1';
const SHELL = CACHE_VERSION + '-shell';

const ASSETS = [
  './', './index.html', './manifest.json',
  './icon-192.png', './icon-512.png',
  './icon-maskable-512.png', './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL)
      .then(c => Promise.all(ASSETS.map(u =>
        c.add(u).catch(e => console.warn('[sw] skip', u, e)))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => !k.startsWith(CACHE_VERSION))
                                    .map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Same-origin only. This tool makes no third-party requests by design.
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(SHELL).then(c => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html').then(h => h || caches.match('./')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const c2 = res.clone(); caches.open(SHELL).then(c => c.put(req, c2)); }
      return res;
    }))
  );
});

self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

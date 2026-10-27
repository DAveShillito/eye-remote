// Offline support: keeps the page's files on the phone, so the installed app opens with no
// signal (it talks to the eye over Bluetooth, which needs no internet). Serves the cached
// copy straight away and fetches a fresh one in the background when online, so an update
// shows on the next launch. Bump VERSION to force a clean cache.
const VERSION = "eye-remote-3";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const cached = await cache.match(e.request, { ignoreSearch: true });
    const fresh = fetch(e.request)
      .then(r => { if (r.ok) cache.put(e.request, r.clone()); return r; })
      .catch(() => cached);
    return cached || fresh;
  }));
});

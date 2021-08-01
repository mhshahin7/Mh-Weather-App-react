const staticCacheName = "site-static-v1";
const cacheAssets = [
  "/",
  "/index.html",
  "../src/App.js",
  "../src/index.css",
  "../src/index.js",
  "./weather.png",
  "../src/assets/1.jpg",
  "../src/assets/2.jpg",
  "../src/assets/cold-bg.jpg",
  "../src/assets/warm-bg.jpg",
  "../src/App.css"
];

self.addEventListener("install", evt => {
  evt.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => {
        console.log("caching assets...");
        cache.addAll(cacheAssets);
      })
      .catch(err => {
        console.log(err.message);
      })
  );
});

self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then(res => {
        return res || fetch(evt.request);
      })
      .catch(err => {
        console.log(err.message)
      })
  );
});
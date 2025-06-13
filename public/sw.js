if (!self.define) {
  let e,
    s = {};
  const a = (a, r) => (
    (a = new URL(a + ".js", r).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (r, n) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let t = {};
    const c = (e) => a(e, i),
      o = { module: { uri: i }, exports: t, require: c };
    s[i] = Promise.all(r.map((e) => o[e] || c(e))).then((e) => (n(...e), t));
  };
}
define(["./workbox-38d48007"], function (e) {
  "use strict";
  importScripts("/fallback-ce627215c0e4a9af.js"),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/KZjr9F20Hh4h6406SAWd2/_buildManifest.js",
          revision: "e55f8affc7fd0dc6f646274459f90b19",
        },
        {
          url: "/_next/static/KZjr9F20Hh4h6406SAWd2/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/1479-0397ac6446c18551.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/2108-8e28c4ca58ce03a3.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/2177-8982b3d11cf75ced.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/2368.661d1ff52894f90f.js",
          revision: "661d1ff52894f90f",
        },
        {
          url: "/_next/static/chunks/2681.330bb5e368edcd1e.js",
          revision: "330bb5e368edcd1e",
        },
        {
          url: "/_next/static/chunks/2721-6aa2a812bc861d76.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/3063-f087d2a86230931c.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/4bd1b696-6cd9fdb0687150c3.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/6331-4fa2e2ea8a38d084.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/6874-94586f09d6d4de27.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/6956-87e9550eeba69d7a.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/8859.652b982747af829c.js",
          revision: "652b982747af829c",
        },
        {
          url: "/_next/static/chunks/app/(auth)/confirm/page-6281bdbfa6d00fc0.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(auth)/error-d0a52c3be90d5f0b.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(auth)/layout-ebdec7556f475608.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(auth)/login/page-343d9c2aabeaec21.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(auth)/page-faeef3265e20e21b.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(auth)/passwordReset/page-977f3fb9bf291d68.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(auth)/register/page-f612d4acd4d19613.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(main)/courses/page-29845a2110c2b8c7.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(main)/error-f3344b98adcf3d68.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(main)/favorites/page-daf31fb72521bf0e.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(main)/layout-af9a8f6d52bb4f6c.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(main)/profile/addPet/page-8d0432124de5f468.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(main)/profile/editBio/page-8fedd56095b5fb7b.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(main)/profile/page-320fbef947371cad.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(main)/trainings/%5BcourseType%5D/%5Bday%5D/page-59ff5fb71bdd9d3a.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/(main)/trainings/%5BcourseType%5D/page-55db678ab60ee899.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-15f8f8df6bf4b9f0.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-08babd8a92f7573d.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/layout-d939769c81464a85.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/reset-password/layout-86b2d510e3894dd0.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/reset-password/page-ff26626536af7fa2.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/~offline/layout-8beeb55dfa18fbe7.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/app/~offline/page-c294ab17bda4cf02.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/framework-fda66049c8bbcca5.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/main-30c079beeffecd17.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/main-app-585a2f3dc5b28556.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/pages/_app-eb694f3fd49020c8.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/pages/_error-2b3482c094a540b4.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-d4631d4cccbf5e3a.js",
          revision: "KZjr9F20Hh4h6406SAWd2",
        },
        {
          url: "/_next/static/css/0a2d32d848520921.css",
          revision: "0a2d32d848520921",
        },
        {
          url: "/_next/static/css/48eb4be91026598f.css",
          revision: "48eb4be91026598f",
        },
        {
          url: "/_next/static/css/584156f47d853815.css",
          revision: "584156f47d853815",
        },
        {
          url: "/_next/static/css/5a5b29781a8b5bae.css",
          revision: "5a5b29781a8b5bae",
        },
        {
          url: "/_next/static/css/603b652bfb5d3bf2.css",
          revision: "603b652bfb5d3bf2",
        },
        {
          url: "/_next/static/css/67719d9aee9867e1.css",
          revision: "67719d9aee9867e1",
        },
        {
          url: "/_next/static/css/ab7bdc997bc863f0.css",
          revision: "ab7bdc997bc863f0",
        },
        {
          url: "/_next/static/css/b66e40f4fe4aaad7.css",
          revision: "b66e40f4fe4aaad7",
        },
        {
          url: "/_next/static/css/bbdb0e026f1a7e31.css",
          revision: "bbdb0e026f1a7e31",
        },
        {
          url: "/_next/static/css/bd8883f47f743504.css",
          revision: "bd8883f47f743504",
        },
        {
          url: "/_next/static/css/e4c28bcf8e8e2c04.css",
          revision: "e4c28bcf8e8e2c04",
        },
        { url: "/avatar.svg", revision: "c39d034128b9cd05d844e504d5ee167e" },
        { url: "/bookmarks.svg", revision: "f52de6f41c0bf7319b2d0ba5326c88c4" },
        {
          url: "/course-logo.jpg",
          revision: "3c226208ad9033015a8e6f70051a8346",
        },
        {
          url: "/fallback-ce627215c0e4a9af.js",
          revision: "0eb48972fff6c611a071f0a5f83a46ec",
        },
        { url: "/home.svg", revision: "7c92ac031dd47cc50596a54c9c9d8f79" },
        {
          url: "/icons/icon180.png",
          revision: "1bd4e951faf78bb632cbe1a837e70a06",
        },
        {
          url: "/icons/icon192.png",
          revision: "880b0366128246de252a80dfa23bf8db",
        },
        {
          url: "/icons/icon512_maskable.png",
          revision: "bfead0e2931b9c09f393e7525123a526",
        },
        {
          url: "/icons/icon512_rounded.png",
          revision: "20b7d655ad868a088f5e876aeac19a6c",
        },
        { url: "/logo.png", revision: "824e6f44d782b1eb0a3b34293af71b42" },
        { url: "/logout.svg", revision: "bfe22dd096f4f3e1ae2510f6ec82ecce" },
        { url: "/manifest.json", revision: "252a536b03f365e2c3a5a58a3b443b29" },
        {
          url: "/music/success.mp3",
          revision: "df5203067801904bf1e4ff9714af6c73",
        },
        {
          url: "/pet-avatar.jpg",
          revision: "b032e264bfe589b1d92080c681c004b2",
        },
        {
          url: "/uploads/avatars/avatar-cmbgiplsr0000qz48zqm19kuh-1749112067630.jpg",
          revision: "0f7b96ce97854f888c20894b94d27308",
        },
        {
          url: "/uploads/avatars/avatar-cmbj9cuo40000qzki5ocxg9q6-1749123224672.jpg",
          revision: "2062e4bec99ee6f3ff8f933d04495fbd",
        },
        {
          url: "/uploads/avatars/avatar-cmbjcld380000qzv7aljx8gr6-1749595996798.png",
          revision: "43b358bc982e8fb20314560543b80a1a",
        },
        {
          url: "/uploads/avatars/avatar-cmbos2d5g000kqzon8dbwt20j-1749633798723.jpeg",
          revision: "0c12cba150c2762622b9b972c6cd05e3",
        },
        {
          url: "/uploads/pets/pet-cmbhvvwlj000fqz9k9wfwmhlh-1749112497342.jpg",
          revision: "f8599061e5f7b81bcb1f29fe779efa50",
        },
        {
          url: "/uploads/pets/pet-cmbhvwnv0000gqz9kd9d7k5ib-1749112502464.jpg",
          revision: "2221bae4463026eb02af456420ddd3c3",
        },
        {
          url: "/uploads/pets/pet-cmbhw7lmo000hqz9km9s6dynq-1749112512594.jpg",
          revision: "7d78ea1a811ce73400955fc1c7796207",
        },
        {
          url: "/uploads/pets/pet-cmbhw938b000iqz9kblzmtw5b-1749112532477.jpg",
          revision: "905c69277a439600ae3b90bee5749c47",
        },
        {
          url: "/uploads/pets/pet-cmbhwbbde000jqz9k1enohlib-1749112543806.jpg",
          revision: "c3cea6943e4a5e393922ea9f5cf3a99d",
        },
        {
          url: "/uploads/pets/pet-cmbidtg3u0000qze4zg3lbvfi-1749112549575.jpg",
          revision: "e3921241b4c081a6ead04e812eb0c41e",
        },
        {
          url: "/uploads/pets/pet-cmbj6nyad0000qz2fboltzbaa-1749116288961.jpg",
          revision: "dafb7bc05de1edbc7f9dde6b3758abb2",
        },
        {
          url: "/uploads/pets/pet-cmbj6psq60001qz2f8xh7buo2-1749116370339.PNG",
          revision: "f403a059a4d518559d41c3368359c1e7",
        },
        {
          url: "/uploads/pets/pet-cmbjaslye0002qzhmk4yqof34-1749123262406.jpg",
          revision: "46794cc5abf29f844533ab126dc2344d",
        },
        {
          url: "/uploads/pets/pet-cmbkh968j0000qz5flir7p2wz-1749595962584.jpg",
          revision: "227e742641b69fc246a97db9212d9abe",
        },
        { url: "/~offline", revision: "KZjr9F20Hh4h6406SAWd2" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response }) => {
              return response.ok ? response : null;
            },
          },
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https?.*\.(?:js|css|png|jpg|jpeg|svg|gif|webp)$/,
      new e.StaleWhileRevalidate({
        cacheName: "static-assets",
        plugins: [
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        return "navigate" === e.request.mode;
      },
      new e.NetworkFirst({
        cacheName: "pages",
        networkTimeoutSeconds: 10,
        plugins: [
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^\/api\/(?!telegram).*$/,
      new e.NetworkFirst({
        cacheName: "api",
        plugins: [
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(/^\/api\/telegram\/.*$/, new e.NetworkOnly(), "POST"),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.sameOrigin,
          a = e.url.pathname;
        return !(
          !s ||
          a.startsWith("/api/auth/callback") ||
          !a.startsWith("/api/")
        );
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.request,
          a = e.url.pathname,
          r = e.sameOrigin;
        return (
          "1" === s.headers.get("RSC") &&
          "1" === s.headers.get("Next-Router-Prefetch") &&
          r &&
          !a.startsWith("/api/")
        );
      },
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.request,
          a = e.url.pathname,
          r = e.sameOrigin;
        return "1" === s.headers.get("RSC") && r && !a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        return !e.sameOrigin;
      },
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          {
            handlerDidError: async ({ error }) => {
              console.error("Service Worker error:", error);
            },
          },
        ],
      }),
      "GET"
    );
});

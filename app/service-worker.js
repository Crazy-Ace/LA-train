/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';





/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["/app.js","860c692986ce51062cf4c277be5fc425"],["/config.js","13bae0bf079b6b0c70ed6a5bfeb0bd7b"],["/controllers/app-controller.js","a3abbc78449090b84ca43e1ad040752f"],["/controllers/dashboard-controller.js","867e386e7bb6fe27f962d258fb2eaee0"],["/controllers/header-controller.js","a7aab71c7ab64e5270a5cdb8f30c59a1"],["/factories/idb-factory.js","3ffb52b97ae47498d7a26ca7d7ee6916"],["/factories/json-factory.js","ec69fbec9764b470a5c4f7e7ba4de1b3"],["/funcs/calendar.controller.js","ce1d526c16e257dea8ddd3cdb3bca62a"],["/funcs/calendar.module.js","e5d42c0f8ec28334cc22b70d52979692"],["/funcs/chart.module.js","cc74c0a84621f9a7989da6f69f946b15"],["/funcs/echarts.controller.js","6c12ebbe6fe0e51a10a9a5f15c164cc2"],["/funcs/form.controller.js","9653302e3570655b4eb4ccb677da4f8f"],["/funcs/form.directive.js","cce76ea11942c919dcaac24ae6888733"],["/funcs/form.module.js","6d89b5518f3931b6d65c7efdcf2986b8"],["/funcs/formValidation.controller.js","ceceeb19e057a35d2c5a7285b64d144e"],["/funcs/formValidation.module.js","cd009d6000628029c7b0ebfada7dcc66"],["/funcs/nav.directive.js","3fb583c261c62cbbea8b83ad0d763013"],["/funcs/nav.module.js","75cae58a5d8b34b10cc4d4491a8a3e06"],["/funcs/page.controller.js","6b8de99165a36f9c79f5c2c7b19253ed"],["/funcs/page.directive.js","0755edb50d06daf14de12cae2155e715"],["/funcs/page.module.js","bbfec0493edf091c7cc70d6ab23d8924"],["/funcs/table.controller.js","21f6bdb576a8669255b0397e0b3f6251"],["/funcs/table.module.js","39a54ea031c9ececfb005be3040dd26d"],["/funcs/task.controller.js","c6796a4e8cc6e97824d94413b63dcc87"],["/funcs/task.directive.js","c0605d8f76bef5c44204dca95901b9d0"],["/funcs/task.module.js","9a6a152f2fd96ef72146217620e2b0e0"],["/funcs/task.service.js","47736f02e7dea22d84ff6a8703b70d35"],["/funcs/ui.controller.js","364f77f26fbd487c644378344a47cb1a"],["/funcs/ui.directive.js","962596c6f0b83cf055b4b6117142fb89"],["/funcs/ui.module.js","2f8b1271ee5bbb4b8a39748fc6cedaca"],["/funcs/ui.service.js","b1b2ad610d132478510bfece86166ca7"],["/funcs/wizard.controller.js","52a32ce50a60b9e85daf8edcc3ca2859"],["/images/bg-pattern/bg-pattern1.png","fd99fdac50d853f752b96445ac323cbb"],["/images/bg-pattern/bg-pattern10.png","8471daed8917bf772037f806e5c4c9a6"],["/images/bg-pattern/bg-pattern11.png","dd07cb10063f39ac9174fabfd554e4c0"],["/images/bg-pattern/bg-pattern12.png","5b8bb1433ad23d090b111638012700c8"],["/images/bg-pattern/bg-pattern2.png","164430d5b0eef356f39e9a7e693c3fce"],["/images/bg-pattern/bg-pattern3.png","ec46c8714d646aa5c36a40f3cc290e57"],["/images/bg-pattern/bg-pattern4.png","a599bf7abf7a94e61f421605e19e4f61"],["/images/bg-pattern/bg-pattern5.png","84aa00cb3eebddc8a60524452ffab1d1"],["/images/bg-pattern/bg-pattern6.png","2176ba41ed21c4d743ed38b5207de2e7"],["/images/bg-pattern/bg-pattern7.png","99aec2d1e4c8f69ad954617f4311b6cf"],["/images/bg-pattern/bg-pattern8.png","771648937b3b590302cbe34a7d08e167"],["/images/bg-pattern/bg-pattern9.png","d8671d7bf424e80fb7d39941271ffd35"],["/images/bg-pattern/logo_x_pattern.png","4d575e6c58f37c9d4ba1d0219ad2b83f"],["/index.html","15d3b30c30751c4d7e04f99f7d0c914b"],["/pages/404.html","ce0b20b4f04f3911ff40dcb0768b0e57"],["/pages/dashboard.html","8d2c0d326c8db01e6d9590bc347eff92"],["/pages/default.html","d399d3b7e7df8aa12dc8af9483513346"],["/pages/shared/footer.html","79b00a4fd3cf49cd0fc2c672a1b8ce1e"],["/pages/shared/header.html","4e2db600470f807372d5e4dbb97719a5"],["/routes.js","d9e3ba5853cdf503d5a7b26f6869bb9c"],["/service-worker.js","1031865df0ae947754c52b41057ba199"],["/styles/bootstrap.css","3fb71874c63611f541f5bdcb565f158a"],["/styles/main.css","48437be4c0fe9414ff92266c6cf112a6"],["/styles/my-style.css","acbeadbf75afc7e29fa8570eb33c2fdb"],["/styles/ui.css","29c30931402002dfe4c176543ae0c477"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1--' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, now) {
    now = now || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + now;

    return urlWithCacheBusting.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  var now = Date.now();

  event.waitUntil(
    caches.keys().then(function(allCacheNames) {
      return Promise.all(
        Object.keys(CurrentCacheNamesToAbsoluteUrl).filter(function(cacheName) {
          return allCacheNames.indexOf(cacheName) === -1;
        }).map(function(cacheName) {
          var urlWithCacheBusting = getCacheBustedUrl(CurrentCacheNamesToAbsoluteUrl[cacheName],
            now);

          return caches.open(cacheName).then(function(cache) {
            var request = new Request(urlWithCacheBusting, {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName], response);
              }

              console.error('Request for %s returned a response with status %d, so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          });
        })
      ).then(function() {
        return Promise.all(
          allCacheNames.filter(function(cacheName) {
            return cacheName.indexOf(CacheNamePrefix) === 0 &&
                   !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted([], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});





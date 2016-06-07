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
var PrecacheConfig = [["/app.config.js","6703b6b70c664b321ac6587665e4b33b"],["/app.js","69ae392398ac28b0e9ea347a5ffd771b"],["/app.routes.js","2ff38c9e9139feeeb649003502a11705"],["/controllers/app.controller.js","2f19fe51929b61e10436a451a0a13406"],["/controllers/dashboard.controller.js","4c4bda9127b71c7451f054c3c39e1407"],["/controllers/shared.controller.js","e471256eba70e5ea014097156af9f6be"],["/factories/config.factory.js","b6bfd3e8124612b33c124e8cbe7dd6a0"],["/factories/idb.factory.js","400a843e7baa2d05d00ea4365205062d"],["/factories/json.factory.js","7bd717556fb1facc23460624ae76f80d"],["/favicon.ico","e1c6f2d20409474a788c5563865d8355"],["/images/demo1.png","51a243753d4973d0c6921edf49f1a180"],["/images/demo2.png","b804f1026dc6004f2fd0d1d816bb5f21"],["/index.html","cb2d61cf65fd7117685323cc9f7bf875"],["/pages/404.html","ce0b20b4f04f3911ff40dcb0768b0e57"],["/pages/dashboard.html","346665769f8e6dc0235bd13d0fb222ce"],["/pages/default.html","d399d3b7e7df8aa12dc8af9483513346"],["/pages/shared/footer.html","1f2293519ce18ff55db3b48044102ad6"],["/pages/shared/header.html","6b57a49ec2aec9f5bab7b3955954d35a"],["/service-worker.js","640ffb0f4d271759b345bdd9dab4ee55"],["/styles/dist-font-face.css","58b0fe9f056da7602a76250f4589b4fc"],["/styles/font-face.css","ffc561f3ed3dd5213bb8a032640afe33"],["/styles/main.css","fef552bc7dae7672f097324e08666bf9"],["/styles/my-style.css","c825c89b1cc2d3956ce2fc5ab22d5ac4"],["bower_components/angular-animate/angular-animate.min.js","61b79bca9f9bc0b4858c3309570378b3"],["bower_components/angular-aria/angular-aria.min.js","b91fe09801364ffa012b7827d938bc03"],["bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js","4b5d8447f95f388b2cfa0dc2047b7ee6"],["bower_components/angular-route/angular-route.min.js","0df4318ca766f554e047a7d0d939da29"],["bower_components/angular/angular.min.js","9324788c75670e5a821cd5d2355f0754"],["bower_components/angularfire/dist/angularfire.js","a29463de1d257a8f3158096a84a8a3b4"],["bower_components/bootstrap/dist/css/bootstrap.min.css","2f624089c65f12185e79925bc5a7fc42"],["bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff","fa2772327f55d8198301fdb8bcfc8158"],["bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2","448c34a56d699c29117adc64c43affeb"],["bower_components/firebase/firebase.js","54ecfbd085961c9790241a3c9c2d2c05"],["bower_components/font-awesome/HELP-US-OUT.txt","a1e5be58e81e919ba2e579cd1c65283e"],["bower_components/font-awesome/bower.json","98a56083851d390cf9c04429c3650bec"],["bower_components/font-awesome/css/font-awesome.css","b652e3b759188ceaf79182f2fe72ea64"],["bower_components/font-awesome/css/font-awesome.css.map","8d57a9642cf62d824132266202eac56a"],["bower_components/font-awesome/css/font-awesome.min.css","4083f5d376eb849a458cc790b53ba080"],["bower_components/font-awesome/fonts/FontAwesome.otf","5dc41d8fe329a22fa1ee9225571c843e"],["bower_components/font-awesome/fonts/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["bower_components/font-awesome/fonts/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["bower_components/font-awesome/fonts/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["bower_components/font-awesome/fonts/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["bower_components/font-awesome/fonts/fontawesome-webfont.woff2","e6cf7c6ec7c2d6f670ae9d762604cb0b"],["bower_components/font-awesome/less/animated.less","08baef05e05301cabc91599a54921081"],["bower_components/font-awesome/less/bordered-pulled.less","898f90e40876883214bbd121b0c20e9f"],["bower_components/font-awesome/less/core.less","fb4efe4ae63737706875bbbfc7b7e9af"],["bower_components/font-awesome/less/fixed-width.less","5e07ec001f8d21bd279c12ee542813f7"],["bower_components/font-awesome/less/font-awesome.less","f53235946c37e394a6cd6d92f84587a8"],["bower_components/font-awesome/less/icons.less","3c3bb8fbcd54a6b66a41137d5e9e8a33"],["bower_components/font-awesome/less/larger.less","8cb65280c0f889daf72626c21a7c8628"],["bower_components/font-awesome/less/list.less","975571323cf880a4a30601998236b027"],["bower_components/font-awesome/less/mixins.less","fbb1f2f1ab96ba020c7f14208aac72b8"],["bower_components/font-awesome/less/path.less","a8c41460c42a4fe9e98550f00c8b3f19"],["bower_components/font-awesome/less/rotated-flipped.less","a8476cdc50c264abd11ff59d6a9dd025"],["bower_components/font-awesome/less/screen-reader.less","0f881617264587bef0df6ce92253ecea"],["bower_components/font-awesome/less/stacked.less","518e2b2d263982d2caa1e6514b4b4eac"],["bower_components/font-awesome/less/variables.less","772c0849c206e402f0bbdeddf11cee44"],["bower_components/font-awesome/scss/_animated.scss","39ff4f359a7b81d6585075715f41e5dc"],["bower_components/font-awesome/scss/_bordered-pulled.scss","4cad0df17bf40327feae33fa9a6c6ba2"],["bower_components/font-awesome/scss/_core.scss","ef059a98cf9de6ca5b77ee6850771cf0"],["bower_components/font-awesome/scss/_fixed-width.scss","9277ab6964a434d499873687b00be906"],["bower_components/font-awesome/scss/_icons.scss","fdffb08bc3d85c7427d8697f268fb072"],["bower_components/font-awesome/scss/_larger.scss","e95931566f6fc6ad5685c4fa9802e206"],["bower_components/font-awesome/scss/_list.scss","7107e80b053928271d5fcf422dc29490"],["bower_components/font-awesome/scss/_mixins.scss","aa2b8f32b403733713d8885f14ab86cc"],["bower_components/font-awesome/scss/_path.scss","ab5a9e8388563e097b5ce835601f01d2"],["bower_components/font-awesome/scss/_rotated-flipped.scss","9f5d4bc6fadea89328d2aac26574a9d8"],["bower_components/font-awesome/scss/_screen-reader.scss","8907bd7dbf4799e8120bda5568d76fea"],["bower_components/font-awesome/scss/_stacked.scss","5594237226aedfbca2fa1c7f4604c214"],["bower_components/font-awesome/scss/_variables.scss","783d4422626a7f27fa8f513de3ad4795"],["bower_components/font-awesome/scss/font-awesome.scss","ace7fb9336021f92b1cf68a10d5f452c"],["bower_components/idbwrapper/idbstore.min.js","3c460c43fe76ccdf0567bc7976f8a8c9"],["bower_components/jquery/dist/jquery.min.js","4a356126b9573eb7bd1e9a7494737410"]];
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





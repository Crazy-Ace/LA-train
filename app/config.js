(function () {

  angular.module('app').constant('APP_SETTINGS', {
    "FIREBASE_URL": "https://trainee.firebaseio.com/"
  });

  angular.module('app').run(function ($rootScope, $location, APP_SETTINGS, jsonFactory, indexedDBFactory) {

    if(!$rootScope.stops)
      $rootScope.stops = [];

    if ('serviceWorker' in navigator) {
      console.log('GOOD NEWS: this browser support service worker');
      navigator.serviceWorker.register('/service-worker.js', {scope: '/'})
      .then(function (registration) {
        var serviceWorker;
        if (registration.installing) {
          serviceWorker = registration.installing;
        } else if (registration.waiting) {
          serviceWorker = registration.waiting;
        } else if (registration.active) {
          serviceWorker = registration.active;
        }

        if (serviceWorker) {
          console.log("ServiceWorker phase:", serviceWorker.state);

          serviceWorker.addEventListener('statechange', function (e) {
            console.log("ServiceWorker phase:", e.target.state);
          });
        }
      }).catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
      });

    } else {
      console.log("this browser does NOT support service worker");
    }

    if (!("indexedDB" in window))
      console.log('BAD NEWS: this browser does not support IndexedDB');
    else
      console.log('GOOD NEWS: this browser support IndexedDB');
  });

  angular.module('app')
      .factory('appConfig', [appConfig]);

  function appConfig() {
      var pageTransitionOpts = [
          {
              name: 'Fade up',
              "class": 'animate-fade-up'
          }, {
              name: 'Scale up',
              "class": 'ainmate-scale-up'
          }, {
              name: 'Slide in from right',
              "class": 'ainmate-slide-in-right'
          }, {
              name: 'Flip Y',
              "class": 'animate-flip-y'
          }
      ];
      var date = new Date();
      var year = date.getFullYear();
      var main = {
          brand: 'LA-Train',
          name: 'Lisa',
          year: year,
          layout: 'wide',                                 // 'boxed', 'wide'
          menu: 'vertical',                               // 'horizontal', 'vertical'
          isMenuCollapsed: true,                         // true, false
          fixedHeader: true,                              // true, false
          fixedSidebar: false,                             // true, false
          pageTransition: pageTransitionOpts[0],          // 0, 1, 2, 3... and build your own
          skin: '25'                                      // 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
      };
      var color = {
          primary:    '#31C0BE',
          success:    '#60CD9B',
          info:       '#66B5D7',
          infoAlt:    '#8170CA',
          warning:    '#EEC95A',
          danger:     '#E87352',
          gray:       '#DCDCDC'
      };

      return {
          pageTransitionOpts: pageTransitionOpts,
          main: main,
          color: color
      }
  }

  /*angular.module('app').controller('HeaderCtrl', ['$scope']);

  function HeaderCtrl($scope) {

    if(navigator.onLine)
      $scope.connection = 'perfect';
    else
      $scope.connection = 'offline';
  }*/
})();

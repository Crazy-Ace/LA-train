(function () {

  angular.module('app').constant('APP_SETTINGS', {
    "FIREBASE_URL": "https://udacitytwo.firebaseio.com/"
  });

  angular.module('app').run(function ($rootScope, $location, APP_SETTINGS, idbInit, $http) {

    if(!$rootScope.stops)
      $rootScope.stops = [];

    if(!$rootScope.stop_times)
      $rootScope.stop_times = [];

    if(!$rootScope.notifications)
      $rootScope.notifications = [];

    //Service Worker
    if ('serviceWorker' in navigator) {
      $rootScope.notifications.push({
        message: 'This browser support Service Worker',
        type: 'btn-success',
        class: 'fa fa-shield'
      });

      //register of serviceWorker
      navigator.serviceWorker.register('/service-worker.js', {scope: '/'}).then(function (registration) {
        var serviceWorker;
        if (registration.installing) {
          serviceWorker = registration.installing;
        } else if (registration.waiting) {
          serviceWorker = registration.waiting;
        } else if (registration.active) {
          serviceWorker = registration.active;
        }

        if(navigator.serviceWorker.controller){
          if(registration.waiting){
            console.log('nova atualizacao');
          }
        }
      });

    } else {
      $rootScope.notifications.push({
        message: 'This browser does NOT support Service Worker',
        type: 'btn-danger',
        class: 'fa fa-shield'
      });
    }

    if (!("indexedDB" in window)){
      $rootScope.notifications.push({
        message: 'This browser does NOT support IndexedDB',
        type: 'btn-danger',
        class: 'fa fa-database'
      });
    }else{
      idbInit.agency();

      idbInit.stops();
      idbInit.stop_times();

      $rootScope.notifications.push({
        message: 'This browser support IndexedDB',
        type: 'btn-success',
        class: 'fa fa-database'
      });
    }
  });
})();

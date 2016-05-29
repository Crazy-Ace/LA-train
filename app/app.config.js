(function () {

  angular.module('app').run(function ($rootScope, $location, idbInit, $http) {
    //deletar
    if(!$rootScope.stops)
      $rootScope.stops = [];
      //deletar
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
        /*var serviceWorker;
        if (registration.installing) {
          serviceWorker = registration.installing;
          registration.installing.addEventListener('statechange', function(){
            if(this.state == 'installed'){

            }
          });
        } else if (registration.waiting) {
          serviceWorker = registration.waiting;
        } else if (registration.active) {
          serviceWorker = registration.active;
        }*/

        if(navigator.serviceWorker.controller){
          if(registration.installing){
            registration.installing.addEventListener('updatefound', function(){
              registration.installing.addEventListener('statechange', function(){
                if(this.state == 'installed'){
                  $rootScope.notifications.push({
                    message: 'New or updated content is available.',
                    type: 'btn-success',
                    class: 'fa fa-wrench',
                    textMuted: 'click here to update',
                    clickable: true
                  });
                }
              });
            });
          }
        }
/*
          serviceWorker.onstatechange = function() {
            switch (serviceWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  // At this point, the old content will have been purged and the fresh content will
                  // have been added to the cache.
                  // It's the perfect time to display a "New content is available; please refresh."
                  // message in the page's interface.
                  $rootScope.notifications.push({
                    message: 'New or updated content is available.',
                    type: 'btn-success',
                    class: 'fa fa-wrench',
                    textMuted: 'click here to update',
                    clickable: true
                  });
                  console.log('New or updated content is available.');
                } else {
                  // At this point, everything has been precached.
                  // It's the perfect time to display a "Content is cached for offline use." message.
                  console.log('Content is now available offline!');
                }
                break;

              case 'redundant':
                console.error('The installing service worker became redundant.');
                break;
            }

        };*/
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

      // idbInit.agency().then(function(result) {
      //   var teste = result;
      //   console.log(result); // "Stuff worked!"
      // }, function(err) {
      //   console.log(err); // Error: "It broke"
      // });
      //
      // idbInit.stop_times().then(function(result) {
      //   var teste = result;
      //   console.log(result); // "Stuff worked!"
      // }, function(err) {
      //   console.log(err); // Error: "It broke"
      // });

      $rootScope.notifications.push({
        message: 'This browser support IndexedDB',
        type: 'btn-success',
        class: 'fa fa-database'
      });
    }

    initFirebase();

    function initFirebase(){
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyC6m1AjB9bJqxnJvY2LtH6ch1nuI6wjacQ",
        authDomain: "udacitytwo.firebaseapp.com",
        databaseURL: "https://udacitytwo.firebaseio.com",
        storageBucket: "udacitytwo.appspot.com",
      };
      firebase.initializeApp(config);
    }
  });
})();

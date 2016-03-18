(function () {

  angular.module('app').constant('APP_SETTINGS', {
    "FIREBASE_URL": "https://trainee.firebaseio.com/"
  });

  angular.module('app').run(function ($rootScope, $location, APP_SETTINGS) {
    var ref_users = new Firebase(APP_SETTINGS.FIREBASE_URL + '/users');

    $rootScope.user = null;

    ref_users.on("value", function(snapshot) {
      $rootScope.users = [];
      snapshot.forEach(function(childSnapshot) {
        $rootScope.users.push(childSnapshot.val());
      });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      if (!$rootScope.user) {
        $location.path("/login");
      }
    });

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
          brand: 'Estagiário',
          name: 'Lisa',
          year: year,
          layout: 'wide',                                 // 'boxed', 'wide'
          menu: 'vertical',                               // 'horizontal', 'vertical'
          isMenuCollapsed: false,                         // true, false
          fixedHeader: true,                              // true, false
          fixedSidebar: true,                             // true, false
          pageTransition: pageTransitionOpts[0],          // 0, 1, 2, 3... and build your own
          skin: '11'                                      // 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
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
})();

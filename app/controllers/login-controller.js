(function () {
  'use strict';
  angular.module('app').controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$rootScope', '$location', 'APP_SETTINGS', '$firebaseAuth'];

  function LoginCtrl($scope, $rootScope, $location, APP_SETTINGS, $firebaseAuth) {
    $rootScope.user = null;

    var ref = new Firebase(APP_SETTINGS.FIREBASE_URL);
    var ref2 = new Firebase(APP_SETTINGS.FIREBASE_URL + '/users');
    var auth = $firebaseAuth(ref);

    $scope.doLogin = function() {

      auth.$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(person) {
        $rootScope.users.forEach(function(user) {
          if(user.email == $scope.user.email){
            $rootScope.user = {
              name: user.name,
              email: user.email
            }
          }
        });

        console.log('Authentication successful');
        $location.path('/dashboard');

      }, function(error) {
        console.log('Authentication failure');
      });
    },

    $scope.addTempUser = function() {
      $rootScope.user = 'temp';
      $location.path('/signup');
    },

    $scope.doRegister = function() {
      var user = {
        name: $scope.guest.name,
        email: $scope.guest.email
      };

      if ($scope.guest.email && $scope.guest.password) {
        auth.$createUser({
          email: $scope.guest.email,
          password: $scope.guest.password
        }).then(function(userData) {
          $scope.guest = null;
          $rootScope.user = user;
          ref2.push(user);
          console.log("Successfully created user account with uid:", userData.uid);
          $location.path('/dashboard');
        }).catch(function(error) {
          console.log("Error creating user:", error);
        });
      }
    }
  }
})();

(function () {
  'use strict';
  angular.module('app.header', []).controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['$scope', '$rootScope', '$window', '$location'];

  function HeaderCtrl($scope, $rootScope, $window, $location) {
     $scope.$watch('navigator.onLine', function() {
        $scope.checked = navigator.onLine;
    });

    $scope.refresh = function(index){
      $rootScope.notifications.splice(index, 1);
    }
  }
})();

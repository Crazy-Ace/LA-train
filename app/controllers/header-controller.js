(function () {
  'use strict';
  angular.module('app').controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['$scope', '$rootScope'];

  function HeaderCtrl($scope, $rootScope) {
     $scope.$watch('navigator.onLine', function() {
        $scope.checked = navigator.onLine;
    });
  }
})();

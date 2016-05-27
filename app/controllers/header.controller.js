(function () {
  'use strict';
  angular.module('app.header', []).controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['$scope', '$rootScope'];

  function HeaderCtrl($scope, $rootScope) {
     $scope.$watch('navigator.onLine', function() {
        $scope.checked = navigator.onLine;
    });
  }
})();

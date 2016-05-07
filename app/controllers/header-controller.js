(function () {
  'use strict';
  angular.module('app').controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['$scope'];

  function HeaderCtrl($scope) {
     $scope.$watch('navigator.onLine', function() {
        $scope.checked = navigator.onLine;
    });
  }
})();

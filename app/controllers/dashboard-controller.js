(function () {
  'use strict';
  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope'];

  function DashboardCtrl($scope) {
      $scope.departure = false;
      $scope.arrival = false;

      $scope.pointA = function(){
        $scope.departure = !$scope.departure;
      }

      $scope.pointB = function(){
        $scope.arrival = !$scope.arrival;
      }
  }
})();

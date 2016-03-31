(function () {
  'use strict';
  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope'];

  function DashboardCtrl($scope) {
      $scope.departure = false;
      $scope.arrival = false;
      $scope.stationB = 'Departure Train Station';
      $scope.stationA = 'Arrival Train Station';

      $scope.pointA = function(){
        $scope.departure = !$scope.departure;
      }

      $scope.pointB = function(){
        $scope.arrival = !$scope.arrival;
      }
  }
})();

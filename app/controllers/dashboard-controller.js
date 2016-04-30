(function () {
  'use strict';
  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope', 'idbInit', '$rootScope'];

  function DashboardCtrl($scope, idbInit, $rootScope) {
      //$scope.agency = {};
      $scope.departure = false;
      $scope.arrival = false;
      $scope.stationB = 'Departure Train Station';
      $scope.stationA = 'Arrival Train Station';

      $scope.pointA = function(){
        $scope.departure = !$scope.departure;
      }
      $scope.stations = function(name){
        $scope.stationA = name;
      }

      $scope.pointB = function(){
        $scope.arrival = !$scope.arrival;
      }
      if ("indexedDB" in window){
        idbInit.agency();
        idbInit.stops();
      }

      $scope.disableOption = function(stop){
        if(stop.stop_name == $scope.stationA || stop.stop_name == $scope.stationB)
          return true;
        return false;
      }

    }
})();

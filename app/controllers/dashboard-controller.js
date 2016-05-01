(function () {
  'use strict';
  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope', '$rootScope'];

  function DashboardCtrl($scope, $rootScope) {
      //$scope.agency = {};
      $scope.departure = false;
      $scope.arrival = false;

      $scope.pointA = function(){
        $scope.departure = !$scope.departure;
        $scope.conections = [];
        if(typeof $scope.stationB === 'object' && typeof $scope.stationA === 'object'){

          if($scope.stationA.stop_id > $scope.stationB.stop_id)
            $scope.stationA.status = "hight"
          else
            $scope.stationA.status = "low"

          $rootScope.stops.forEach(function(stop){
            if($scope.stationA.status == "hight"){
              if(stop.stop_id < $scope.stationA.stop_id && stop.stop_id > $scope.stationB.stop_id)
                $scope.conections.push(stop);
            }else {
              if(stop.stop_id > $scope.stationA.stop_id && stop.stop_id < $scope.stationB.stop_id)
                $scope.conections.push(stop);
            }
          });

          if($scope.stationA.status == "hight")
            $scope.conections.reverse();

        }
      }
      $scope.stations = function(name){
        $scope.stationA = name;
      }

      $scope.pointB = function(){
        $scope.arrival = !$scope.arrival;
        $scope.conections = [];

        if(typeof $scope.stationB === 'object' && typeof $scope.stationA === 'object'){

          if($scope.stationA.stop_id > $scope.stationB.stop_id)
            $scope.stationA.status = "hight"
          else
            $scope.stationA.status = "low"

          $rootScope.stops.forEach(function(stop){
            if($scope.stationA.status == "hight"){
              if(stop.stop_id < $scope.stationA.stop_id && stop.stop_id > $scope.stationB.stop_id)
                $scope.conections.push(stop);
            }else {
              if(stop.stop_id > $scope.stationA.stop_id && stop.stop_id < $scope.stationB.stop_id)
                $scope.conections.push(stop);
            }
          });
          if($scope.stationA.status == "hight")
            $scope.conections.reverse();
        }
      }

      $scope.disableOption = function(stop){
        if($scope.stationA)
          return stop.stop_name === $scope.stationA.stop_name;
        return false;
      }

    }
})();

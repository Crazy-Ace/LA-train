(function () {
  'use strict';
  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope', '$rootScope'];

  function DashboardCtrl($scope, $rootScope) {
      //$scope.agency = {};
      $scope.departure = false;
      $scope.arrival = false;
      $scope.stop_times_filtered = [];

      $scope.pointA = function(){
        $scope.departure = !$scope.departure;
        $scope.conections = [];
        if(typeof $scope.stationB === 'object' && typeof $scope.stationA === 'object'){

          if($scope.stationA.stop_id > $scope.stationB.stop_id)
            $scope.stationA.status = "north"
          else
            $scope.stationA.status = "south"

          $rootScope.stops.forEach(function(stop){
            if($scope.stationA.status == "north"){
              if(stop.stop_id < $scope.stationA.stop_id && stop.stop_id > $scope.stationB.stop_id)
                $scope.conections.push(stop);
            }else {
              if(stop.stop_id > $scope.stationA.stop_id && stop.stop_id < $scope.stationB.stop_id)
                $scope.conections.push(stop);
            }
          });

          if($scope.stationA.status == "north")
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

          if($scope.stationA.stop_id > $scope.stationB.stop_id){
            $scope.stationA.status = "north"
          }else{
            $scope.stationA.status = "south"
          }

          $rootScope.stops.forEach(function(stop){
            if($scope.stationA.status == "north"){
              if(stop.stop_id < $scope.stationA.stop_id && stop.stop_id > $scope.stationB.stop_id)
                $scope.conections.push(stop);
            }else {
              if(stop.stop_id > $scope.stationA.stop_id && stop.stop_id < $scope.stationB.stop_id)
                $scope.conections.push(stop);
            }
          });
          if($scope.stationA.status == "north")
            $scope.conections.reverse();

          getTimes();
        }
      }

      $scope.disableOption = function(stop){
        if($scope.stationA)
          return stop.stop_name === $scope.stationA.stop_name;
        return false;
      }

      function getTimes(){
        var way;
        if($scope.stationA.status == "north")
          way = 0;
        if($scope.stationA.status == "south")
          way = 1;

        $rootScope.stop_times.forEach(function(entry){
          if(entry.stop_id === ($scope.stationA.stop_id + way))
            $scope.stop_times_filtered.push(entry);
        });

        $scope.stop_times_filtered.forEach(function(a){
          $rootScope.stop_times.forEach(function(b){
            if((a.trip_id == b.trip_id)){
              var teste = 0;
            }
          });

        });

      }

    }
})();

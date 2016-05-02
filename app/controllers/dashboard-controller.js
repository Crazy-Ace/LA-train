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

        if(isValidOption()){
          setStatus();
          getConections();
          north();
        }
      }

      $scope.pointB = function(){
        $scope.arrival = !$scope.arrival;
        $scope.conections = [];

        if(isValidOption()){
          setStatus();
          getConections();
          north();
          getTimes();
        }
      }

      $scope.stations = function(name){
        $scope.stationA = name;
      }

      $scope.disableOption = function(stop){
        if($scope.stationA)
          return stop.stop_name === $scope.stationA.stop_name;
        return false;
      }

      function isValidOption(){
        if(typeof $scope.stationB === 'object' && typeof $scope.stationA === 'object')
          if($scope.stationA && $scope.stationB)
            return true;
        return false;
      }
      function getConections(){
        $rootScope.stops.forEach(function(stop){
          if($scope.stationA.status == "north"){
            if(stop.stop_id < $scope.stationA.stop_id && stop.stop_id > $scope.stationB.stop_id)
              $scope.conections.push(stop);
          }else {
            if(stop.stop_id > $scope.stationA.stop_id && stop.stop_id < $scope.stationB.stop_id)
              $scope.conections.push(stop);
          }
        });
      }

      function setStatus(){
        if($scope.stationA.stop_id > $scope.stationB.stop_id)
          $scope.stationA.status = "north"
        else
          $scope.stationA.status = "south"
      }

      function north(){
        if($scope.stationA.status == "north")
          $scope.conections.reverse();
      }

      function duration(time_a, time_b){
        var a = time_a.split(':');
        var b = time_b.split(':');
        
        var secondsA = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        var secondsB = (+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]);

        return ((secondsB / 60) - (secondsA / 60));
      }

      function getTimes(){
        var way;
        var time_a = [];
        var time_b = [];
        var filtered = [];
        var time = {};

        if($scope.stationA.status == "north")way = 0;
        if($scope.stationA.status == "south")way = 1;

        $rootScope.stop_times.forEach(function(entry){
          if(entry.stop_id == ($scope.stationA.stop_id + way))
            time_a.push(entry);
          if(entry.stop_id == ($scope.stationB.stop_id + way))
            time_b.push(entry);
        });

        time_a.forEach(function(a){
          time_b.forEach(function(b){
            if(a.trip_id == b.trip_id)
              if(a.stop_sequence + $scope.conections.length == b.stop_sequence ){
                time = {
                  arrival: a.departure_time,
                  departure: b.arrival_time,
                  duration: duration(a.departure_time, b.arrival_time)
                };
                $scope.stop_times_filtered.push(time);
              }
          });
        });

        var teste = filtered;

        /*$rootScope.stop_times.forEach(function(entry){
          if(entry.stop_id === ($scope.stationA.stop_id + way))
            $scope.stop_times_filtered.push(entry);
        });

        $scope.stop_times_filtered.forEach(function(a){
          $rootScope.stop_times.forEach(function(b){
            if((a.trip_id == b.trip_id) && (b.stop_id == $scope.stationB.stop_id)){
              var teste = 0;
            }
          });

        });*/

      }

    }
})();

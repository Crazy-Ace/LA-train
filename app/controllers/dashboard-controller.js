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
          getTimes();
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
      function toSeconds(time){
        return (+time.split(':')[0]) * 60 * 60 + (+time.split(':')[1]) * 60 + (+time.split(':')[2]);
      }

      function duration(time_a, time_b){
        return ((toSeconds(time_b) / 60) - (toSeconds(time_a) / 60));
      }

      function isValidTrip(trip_a, trip_b){
        var flag;

        if((trip_a == trip_b) && (trip_a <= 999))
          flag = true;
        else
          flag = false;

        if(flag){
          $scope.stop_times_filtered.forEach(function(entry){
            if(entry.train == trip_a)
              flag = false;
          });
        }
        return flag;
      }

      function getTimes(){
        $scope.stop_times_filtered = [];

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

        for (var i = 0; i < time_a.length; i++){
          loop2: for (var j = 0; j < time_b.length; j++){
            if(isValidTrip(time_a[i].trip_id, time_b[j].trip_id)){
              time = {
                train: time_a[i].trip_id,
                arrival: time_a[i].departure_time,
                departure: time_b[j].arrival_time,
                duration: duration(time_a[i].departure_time, time_b[j].arrival_time),
                position: toSeconds(time_a[i].departure_time)
              };

              $scope.stop_times_filtered.push(time);
              break loop2;
            }
          }
        }
      }
    }
})();

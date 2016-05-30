(function () {
  'use strict';

  angular.module('app.dashboard', []).controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope', 'idbInit'];

  function DashboardCtrl($scope, idbInit) {
      var vm = this;

      vm.arrival = false;
      vm.departure = false;
      vm.stop_times_filtered = [];
      vm.disableOption = disableOption;
      vm.pointA = pointA;
      vm.pointB = pointB;
      vm.stops = [];
      vm.stop_times = [];

      activate();

      function activate(){
        offline();
      }

      function disableOption(stop){
        if(vm.stationA)
          return stop.stop_name === vm.stationA.stop_name;
        return false;
      };

      function duration(time_a, time_b){
        return ((toSeconds(time_b) / 60) - (toSeconds(time_a) / 60));
      };

      function getConections(){
        vm.stops.forEach(function(stop){
          if(vm.stationA.status == "north"){
            if(stop.stop_id < vm.stationA.stop_id && stop.stop_id > vm.stationB.stop_id)
              vm.conections.push(stop);
          }else {
            if(stop.stop_id > vm.stationA.stop_id && stop.stop_id < vm.stationB.stop_id)
              vm.conections.push(stop);
          }
        });
      };

      function getConectionsTime(){
        var way;

        if(vm.stationA.status == "north")way = 0;
        if(vm.stationA.status == "south")way = 1;

        for (var j = 0; j < vm.stop_times.length; j++){
          if(vm.stop_times_filtered[0].train == vm.stop_times[j].trip_id){
            for (var i = 0; i < vm.conections.length; i++){
              if((vm.conections[i].stop_id + way) == vm.stop_times[j].stop_id){
                if(i == 0)
                  vm.conections[i].duration = duration(vm.stop_times[j].arrival_time, vm.stop_times[j+1].arrival_time);
                else
                  vm.conections[i].duration = duration(vm.stop_times[j].arrival_time, vm.stop_times[j+1].arrival_time) + vm.conections[i-1].duration;

              }
            }
          }
        }
      };

      function getStops(){
        var ref_stop = firebase.database().ref('stops');

        return new Promise(function(resolve, reject) {
          ref_stop.on('value', function(data) {
            resolve(data.val());
          });
        });
      }

      function getTimes(){
        vm.stop_times_filtered = [];

        var way;
        var time_a = [];
        var time_b = [];
        var filtered = [];
        var time = {};

        if(vm.stationA.status == "north")way = 0;
        if(vm.stationA.status == "south")way = 1;

        vm.stop_times.forEach(function(entry){
          if(entry.stop_id == (vm.stationA.stop_id + way))
            time_a.push(entry);
          if(entry.stop_id == (vm.stationB.stop_id + way))
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

              vm.stop_times_filtered.push(time);
              break loop2;
            }
          }
        }
      };

      function isValidOption(){
        if(typeof vm.stationB === 'object' && typeof vm.stationA === 'object')
          if(vm.stationA && vm.stationB)
            return true;
        return false;
      };

      function isValidTrip(trip_a, trip_b){
        var flag;

        if((trip_a == trip_b) && (trip_a <= 999))
          flag = true;
        else
          flag = false;

        if(flag){
          vm.stop_times_filtered.forEach(function(entry){
            if(entry.train == trip_a)
              flag = false;
          });
        }
        return flag;
      };

      function online() {

      }

      function offline() {
        idbInit.getStops().then(function(result) {
          result.getAll(function(data){
            data[0].forEach(function(stop){
              stop.stop_name = stop.stop_name.match(/- (.*) STATION/)[1];
              if(idbInit.isStop(stop, vm.stops))
                vm.stops.push(stop);
            });
          });
        });

        idbInit.getStopTimes().then(function(result) {
          result.getAll(function(data){
            vm.stop_times.push(data);
          });
        });
      };

      function pointA() {
        vm.departure = !vm.departure;
        vm.conections = [];

        if(isValidOption()){
          setStatus();
          getConections();
          north();
          getTimes();
          //getConectionsTime();
        }
      };

      function pointB(){
        vm.arrival = !vm.arrival;
        vm.conections = [];

        if(isValidOption()){
          setStatus();
          getConections();
          north();
          getTimes();
          //getConectionsTime();
        }
      };

      function north(){
        if(vm.stationA.status == "north")
          vm.conections.reverse();
      };

      function setStatus(){
        if(vm.stationA.stop_id > vm.stationB.stop_id)
          vm.stationA.status = "north"
        else
          vm.stationA.status = "south"
      };

      function toSeconds(time){
        return (+time.split(':')[0]) * 60 * 60 + (+time.split(':')[1]) * 60 + (+time.split(':')[2]);
      }
    }
})();

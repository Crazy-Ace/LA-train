(function () {
  'use strict';
  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope', 'idbInit'];

  function DashboardCtrl($scope, idbInit) {
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
      if ("indexedDB" in window){
        var agency = idbInit.agency();

        agency.then(function() {
          agency.getAll(onsuccess, onerror);
        });

        var onsuccess = function(data){
          console.log('Here is what we have in store ('+data.length+' items in total):');
          data.forEach(function(item){
            debugger;
            console.log(item);
          });
        }
        var onerror = function(error){
          console.log('Oh noes, sth went wrong!', error);
        }

        /*customers.getAll().then(function(data) {
          data.forEach(function(item){
            console.log(item);
          });
        });*/

        }

      }
})();

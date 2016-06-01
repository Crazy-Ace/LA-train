(function () {
  'use strict';

  angular.module('app').factory('idbInit', function(jsonFactory, $rootScope){
    var stops;
    var agency;
    var stop_times;

    function agencyIDB() {
      return new Promise(function(resolve, reject) {
        agency = new IDBStore({
          dbVersion: 1,
          storeName: 'agency',
          keyPath: 'agency_id',
          autoIncrement: false,
          onStoreReady: function(){
            populateIDB(agency, jsonFactory.agency());
            resolve(agency);
          }
        });
      });
    };

    function count(idb) {
      var count = 0;
      idb.getAll(function(data){
        count = data.length;
      });
      return count;
    }

    function stopIDB() {
      return new Promise(function(resolve, reject) {
        stops = new IDBStore({
          dbVersion: 1,
          storeName: 'stops',
          keyPath: 'stop_id',
          autoIncrement: false,
          onStoreReady: function(){
            populateIDB(stops, jsonFactory.stops());
            resolve(stops);
          }
        });
      });
    };

    function stopTimesIDB() {
      return new Promise(function(resolve, reject) {
        stop_times = new IDBStore({
          dbVersion: 2,
          storeName: 'stop_times',
          onStoreReady: function(){
            populateIDB(stop_times, jsonFactory.stop_times());
            resolve(stop_times);
          }
        });
      });
    };

    function populateIDB(idb, json) {
        json.then(function(data) {
            idb.put(data);
        });
    };

    function isStop(stop, array){
      var flag = true;
      array.forEach(function(entry){
        if(entry.stop_name == stop.stop_name)
          flag = false;
      });
      return flag;
    };

    return {
      isStop        : isStop,
      getStops      : stopIDB,
      getAgency     : agencyIDB,
      getStopTimes  : stopTimesIDB
    };
  });
})();

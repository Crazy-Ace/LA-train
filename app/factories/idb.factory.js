(function () {
  'use strict';

  angular.module('app').factory('idbInit', function(jsonFactory, $rootScope){
    var stops;
    var agency;

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

    function populateIDB(idb, json) {
      json.forEach(function(entry) {
        idb.put(entry);
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
      isStop    : isStop,
      getStops  : stopIDB,
      getAgency : agencyIDB

    };


      /*return {

        agency: function(){

          return new Promise(function(resolve, reject) {
            var agencyJSON = jsonFactory.agency();

            var agency = new IDBStore({
              dbVersion: 1,
              storeName: 'agency',
              keyPath: 'agency_id',
              autoIncrement: false,
              onStoreReady: function(){
                if(agencyJSON){
                  agencyJSON.forEach(function(entry) {
                    agency.put(entry);
                  });
                }
                agency.getAll(function(data){
                  resolve(data[0]);
                });

              }
            });
          });

        },

        stopIDB : function () {
          return new Promise(function(resolve, reject) {
            var stops = new IDBStore({
              dbVersion: 1,
              storeName: 'stops',
              keyPath: 'stop_id',
              autoIncrement: false,
              onStoreReady: function(){
                resolve(stops);
              }
            });

          });
        },

        stops: function(){
          return new Promise(function(resolve, reject) {
            var stopsJSON = jsonFactory.stops();
            var stop_return = [];
            if(stopsJSON){
              var stops = new IDBStore({
                dbVersion: 1,
                storeName: 'stops',
                keyPath: 'stop_id',
                autoIncrement: false,
                onStoreReady: function(){
                  stopsJSON.forEach(function(entry) {
                    stops.put(entry);
                  });
                  stops.getAll(function(data){
                    data.forEach(function(stop){
                      stop.stop_name = stop.stop_name.match(/- (.*) STATION/)[1];
                      if(isStop(stop))
                        stop_return.push(stop);
                    });
                    resolve(stop_return);
                  });
                }
              });
            }

            function isStop(stop){
              var flag = true;
              $rootScope.stops.forEach(function(entry){
                if(entry.stop_name == stop.stop_name)
                  flag = false;
              });
              return flag;
            };
          });
        },

        stop_times: function(){
          return new Promise(function(resolve, reject) {
            var stop_timesJSON = jsonFactory.stop_times();

            if(stop_timesJSON){
              var stop_times = new IDBStore({
                dbVersion: 2,
                storeName: 'stop_times',
                onStoreReady: function(){
                  stop_timesJSON.forEach(function(entry) {
                    stop_times.put(entry);
                  });
                  stop_times.getAll(function(data){
                    resolve(data);
                  });
                }
              });
            }
          });
        }

      }*/
  });
})();

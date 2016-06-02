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
            resolve(agency);
          }
        });
      });
    };

    function count(idb) {
      return new Promise(function(resolve, reject) {
        idb.getAll(function(data){
          resolve(data.length);
        });
      });
    }

    function stopIDB() {
      return new Promise(function(resolve, reject) {
        stops = new IDBStore({
          dbVersion: 1,
          storeName: 'stops',
          keyPath: 'stop_id',
          autoIncrement: false,
          onStoreReady: function(){
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
            resolve(stop_times);
          }
        });
      });
    };

    function populateIDB(store, who) {
      return new Promise(function(resolve, reject) {
        count(store).then(function(qtd) {
          if(qtd == 0){
            switch(who){
              case 'stops':
                jsonFactory.stops().then(function(data) {
                  resolve(store.put(data));
                });
                break;
              case 'stop_times':
                jsonFactory.stop_times().then(function(data) {
                  resolve(store.put(data));
                });
                break;
            }
          }else{
            resolve('data already exist');
          }
        });
      });
      /*agencyIDB().then(function(agency) {
        count(agency).then(function(qtd) {
          if(qtd == 0){
            jsonFactory.agency().then(function(data) {
              agency.put(data);
            });
          }
        });
      });

      stopIDB().then(function(stop) {
        count(stop).then(function(qtd) {
          if(qtd == 0){
            jsonFactory.stops().then(function(data) {
              stop.put(data);
            });
          }
        });
      });

      stopTimesIDB().then(function(stop_times) {
        count(stop_times).then(function(qtd) {
          if(qtd == 0){
            jsonFactory.stop_times().then(function(data) {
              stop_times.put(data);
            });
          }
        });
      });*/
    };

    function isStop(stop, array){
      var flag = true;
      array.forEach(function(entry){
        if(entry.stop_name == stop.stop_name)
          flag = false;
      });

      if(stop.stop_id > 100000)
        flag = false;
        
      return flag;
    };

    function getStops(){
      return new Promise(function(resolve, reject) {

        stopIDB().then(function(store) {
          var onsuccess = function(data){
            resolve(data[0]);
          }
          var onerror = function(error){
            $rootScope.notifications.push({
              message: 'Was not possible to fetch stops',
              type: 'btn-danger',
              class: 'fa fa-train'
            });
          }

          store.getAll(onsuccess, onerror);
        });
      });
    };

    function getObjectData(store) {
        var onsuccess = function(data){
          return data[0];
        };

        var onerror = function(error){
          $rootScope.notifications.push({
            message: 'Was not possible to fetch data',
            type: 'btn-danger',
            class: 'fa fa-train'
          });
        };

        store.getAll(onsuccess, onerror);
    };

    return {
      isStop              : isStop,
      getObjectStops      : stopIDB,
      getObjectAgency     : agencyIDB,
      getObjectStopTimes  : stopTimesIDB,
      populateIDB         : populateIDB,
      getStops            : getStops,
      getObjectData       : getObjectData
    };
  });
})();

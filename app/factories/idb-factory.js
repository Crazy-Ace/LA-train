(function () {
  'use strict';

  angular.module('app').factory('idbInit', function(jsonFactory){
      return {
          agency: function(){
            var agency01 = jsonFactory.agency();

            var agency = new IDBStore({
              dbVersion: 1,
              storeName: 'agency',
              keyPath: 'agency_id',
              autoIncrement: false,
              onStoreReady: function(){
                console.log('Agency is ready!');
                agency01.forEach(function(entry) {
                  agency.put(entry, onsuccess, onerror);
                });
              }
            });

            var onsuccess = function(){
              //TODO
            }
            var onerror = function(error){
              //TODO
            }

            return agency;
          }
      }
  });
})();

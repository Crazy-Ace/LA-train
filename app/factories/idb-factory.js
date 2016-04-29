(function () {
  'use strict';

  angular.module('app').factory('idbInit', function(jsonFactory, $rootScope){
      return {
          agency: function(){
            var agencyJSON = jsonFactory.agency();

            var agency = new IDBStore({
              dbVersion: 1,
              storeName: 'agency',
              keyPath: 'agency_id',
              autoIncrement: false,
              onStoreReady: function(){
                console.log('Agency is ready!');
                agencyJSON.forEach(function(entry) {
                  agency.put(entry);
                });
                agency.getAll(function(data){
                  $rootScope.agency = data[0];
                });
              }
            });
          }
      }
  });
})();

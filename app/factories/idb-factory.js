(function () {
  'use strict';

  angular.module('app').factory('idbInit', function(jsonFactory){
      return {
          agency: function(){
            var agency = jsonFactory.agency();
            return;

          }
      }
  });
})();

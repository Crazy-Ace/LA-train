(function () {
  'use strict';

  angular.module('app').factory('jsonFactory', function(){
      return {
          agency: function(){
            var agency;
            $.ajax({
              url: '../gtfs/agency.json',
              dataType: 'json',
              async: false,
              success: function(data) {
                agency =  data;
              }
            });
            return agency;
          },
          sayGoodbye: function(text){
              return "Factory says \"Goodbye " + text + "\"";
          }
      }
  });
})();

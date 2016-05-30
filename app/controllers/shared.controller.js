(function () {
  'use strict';
  angular.module('app.header', []).controller('SharedCtrl', SharedCtrl);

  SharedCtrl.$inject = ['$scope', '$rootScope', '$window', '$location', 'idbInit'];

  function SharedCtrl($scope, $rootScope, $window, $location, idbInit) {

    //activate();

    function activate() {
      var promise = idbInit.getAgency();

      promise.then(function(result) {
        result.getAll(function(data){
          $scope.title = data[0].agency_name;
        });
      });
    }

     $scope.$watch('navigator.onLine', function() {
        $scope.checked = navigator.onLine;
    });



    $scope.refresh = function(index){
      $rootScope.notifications.splice(index, 1);
    }
  }
})();

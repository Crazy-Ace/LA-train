(function () {
    'use strict';

    angular.module('app').controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope', '$rootScope', 'appConfig'];

    function AppCtrl($scope, $rootScope, appConfig) {
      var vm = this;

      vm.pageTransitionOpts = appConfig.pageTransitionOpts;
      vm.main = appConfig.main;
      vm.color = appConfig.color;

      $scope.$watch('vm.main', function(newVal, oldVal) {

          if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
            $rootScope.$broadcast('nav:reset');
          }
          if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
          if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
              vm.main.fixedHeader = true;
              vm.main.fixedSidebar = true;
          }
          if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
              vm.main.fixedHeader = false;
              vm.main.fixedSidebar = false;
          }
          }
          if (newVal.fixedSidebar === true) {
            vm.main.fixedHeader = true;
          }
          if (newVal.fixedHeader === false) {
            vm.main.fixedSidebar = false;
          }
      }, true);
    }
})();

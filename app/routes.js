(function(){
    'use strict';
    angular.module('app').config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/dashboard'
            })
            .when('/login', {
                controller: 'LoginCtrl',
                templateUrl: 'pages/login.html'
            })
            .when('/signup', {
                controller: 'LoginCtrl',
                templateUrl: 'pages/signup.html'
            })
            .when('/dashboard', {
                controller: 'DashboardCtrl',
                templateUrl: 'pages/dashboard.html'
            })
            .when('/404', {
                templateUrl: 'pages/404.html'
            })
            .otherwise({
                redirectTo: '/404',
            });
    });
})();

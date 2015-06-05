'use strict';

// Declare app level module which depends on views, and components
angular
  .module(
    'myApp',
    [
      'ngStorage',
      'ngRoute',
      'myApp.constants',
      'myApp.view1',
      'myApp.view2',
      'myApp.signup',
      'myApp.signinout',
      'myApp.version'
    ]
  )
  .config(
    [
      '$routeProvider',
      function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
      }
    ]
  )
  .run(function($rootScope, $localStorage, $location) {
    $rootScope.token = $localStorage.token;
  });

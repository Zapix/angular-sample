'use strict';

// Declare app level module which depends on views, and components
angular
  .module(
    'myApp',
    [
      'ngRoute',
      'myApp.constants',
      'myApp.view1',
      'myApp.view2',
      'myApp.signup',
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
  );

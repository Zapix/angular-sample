'use strict';

Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
  };

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
      'myApp.profile',
      'myApp.version'
    ]
  )
  .config(
    [
      '$routeProvider',
      '$httpProvider',
      function($routeProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
        $httpProvider.interceptors.push(
          [
            '$q',
            '$location',
            '$localStorage',
            function($q, $location, $localStorage) {
              return {
                'request': function (config) {
                  config.headers = config.headers || {};
                  if ($localStorage.token) {
                    config.headers.Authorization = 'JWT ' + $localStorage.token;
                  }
                  return config;
                },
                'responseError': function (response) {
                  if (response.status === 401 || response.status === 403) {
                    $location.path('/signin');
                  }
                  return $q.reject(response);
                }
              };
            }
          ]
        );
      }
    ]
  )
  .run(function($rootScope, $localStorage) {
    $rootScope.token = $localStorage.token;
  });

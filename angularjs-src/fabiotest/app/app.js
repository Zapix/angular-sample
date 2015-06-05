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
      'myApp.signup',
      'myApp.signinout',
      'myApp.profile',
      'myApp.books',
      'myApp.version'
    ]
  )
  .config(
    [
      '$routeProvider',
      '$httpProvider',
      function($routeProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
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
                  if (response.status !== 400) {
                    alert("Something goes wrong. Please try to reload page");
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
  .run(
    [
      '$rootScope',
      '$location',
      '$localStorage',
      function($rootScope, $location, $localStorage) {
        $rootScope.token = $localStorage.token;
        $rootScope.$on('$routeChangeStart', function(event, next) {
          if (next.loginRequired && !$rootScope.token) {
            $location.path('/signin');
          }
        });
      }
    ]
  );

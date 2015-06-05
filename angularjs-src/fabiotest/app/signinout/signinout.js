'use strict';

angular
  .module(
    'myApp.signinout',
    [
      'ngRoute',
      'myApp.constants'
    ]
  )
  .config(
    [
      '$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/signin', {
            templateUrl: 'signinout/templates/signin.html',
            controller: 'SigninCtrl'
          })
          .when('/signout', {
            templateUrl: 'signinout/templates/signout.html',
            controller: 'SignoutCtrl'
          });
      }
    ]
  )
  .controller(
    'SigninCtrl',
    [
      '$scope',
      '$rootScope',
      '$http',
      '$location',
      '$localStorage',
      'constants',
      function($scope, $rootScope, $http, $location, $localStorage, constants) {
        $scope.serverErrors = {};

        $scope.authenticateUser = function(form, user) {
          if (!form.$valid) {
            return;
          }
          $scope.serverErrors = {};
          $http
            .post(
              constants.URLS.SIGNIN,
              user
            )
            .success(function(data, status) {
              $localStorage.token = data.token;
              $rootScope.token = data.token;
              $location.path('/profile');
            })
            .error(function(data, status) {
              if(status == 400) {
                $scope.serverErrors = data;
              } else {
                alert("Something goes wrong. Please try to reload page");
              }
            });
        }
      }
    ]
  )
  .controller(
    'SignoutCtrl',
    [
      '$scope',
      '$rootScope',
      '$localStorage',
      '$location',
      function($scope, $rootScope, $localStorage, $location) {
        $scope.signout = function() {
          $rootScope.token = null;
          $localStorage.token = null;
          $location.path('/signin');
        };
        $scope.keepWork = function() {
          window.history.back();
        }
      }
    ]
  );

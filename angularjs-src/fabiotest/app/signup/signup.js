'use strict';

angular
  .module(
    'myApp.signup',
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
          .when('/signup', {
            templateUrl: 'signup/templates/signup.html',
            controller: 'SignupCtrl'
          })
          .when('/signup-success', {
            templateUrl: 'signup/templates/success.html',
            controller: 'SignupSuccessCtrl'
          });
      }
    ]
  )
  .controller(
    'SignupCtrl',
    [
      '$scope',
      '$http',
      '$location',
      'constants',
      function($scope, $http, $location, constants) {
        $scope.serverErrors = {};
        console.log(constants);
        $scope.createUser = function(form, user) {
          if (!form.$valid || user.password1 != user.password2 ) {
            return;
          }
          $scope.serverErros = {};
          $http
            .post(
              constants.URLS.SIGNUP,
              user
            )
            .success(function(data, status) {
              $location.path('/signup-success');
            })
            .error(function(data, status) {
              if (status == 400) {
                $scope.serverErrors = data;
              } else {
                alert("Something goes wrong. Please try to reload page");
              }
            });
        };
      }
    ]
  )
  .controller(
    'SignupSuccessCtrl',
    [
      function() {
      }
    ]
  );
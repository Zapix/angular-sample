'use strict';

angular
  .module(
    'myApp.profile',
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
          .when('/profile', {
            templateUrl: 'profile/templates/profile.html',
            controller: 'ProfileCtrl',
            resolve: {
              profile: function($q, $http, constants) {
                var deferred = $q.defer(); $http
                  .get(constants.URLS.USER)
                  .success(function(data) {
                    deferred.resolve(data)
                  });
                return deferred.promise;
              }
            }
          });
      }
    ]
  )
  .controller(
    'ProfileCtrl',
    [
      '$scope',
      '$http',
      'constants',
      'profile',
      function($scope, $http, constants, profile) {
        $scope.editMode = false;
        $scope.editingProfile = null;
        $scope.profile = profile;
        $scope.serverErrors = {};

        $scope.edit = function() {
          $scope.editMode = true;
          $scope.editingProfile = angular.copy($scope.profile);
        };
        $scope.quitEditMode = function() {
          $scope.editMode = false;
        };
        $scope.update = function(form, profile) {
          if ( !form.$valid ) {
            return;
          }

          var data = angular.copy(profile);
          data.birthday = profile.birthday && profile.birthday.yyyymmdd();
          $scope.serverErrors = {};
          $http
            .put(constants.URLS.USER, data)
            .success(function(data) {
              $scope.profile = data;
              $scope.editMode = false;
            })
            .error(function(data, status) {
              if (status == 400) {
                $scope.serverErrors = data;
              } else {
                alert("Something goes wrong. Please try to reload page");
              }
            });
        }
      }
    ]
  );
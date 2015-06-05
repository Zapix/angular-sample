'use strict';

angular
  .module(
    'myApp.books',
    [
      'ngRoute',
      'myApp.constants'
    ]
  )
  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'books/templates/book-list.html',
          controller: 'BookListCtrl',
          resolve: {
            bookList: function($q, $http, constants) {
              var deferred = $q.defer();
              $http
                .get(constants.URLS.BOOK_LIST)
                .success(function(data) {
                  deferred.resolve(data);
                });
              return deferred.promise;
            }
          }
        })
        .when('/book-add', {
          templateUrl: 'books/templates/book-add.html',
          controller: 'BookAddCtrl',
          loginRequired: true
        });
    }
  ])
  .controller(
    'BookListCtrl',
    [
      '$scope',
      'bookList',
      function($scope, bookList) {
        $scope.bookList = bookList;
      }
    ]
  )
  .controller(
    'BookAddCtrl' ,
    [
      '$scope',
      '$http',
      'constants',
      function($scope, $http, constants) {
        $scope.serverErrors = {};
        $scope.bookAdded = false;

        $scope.addBook = function(form, book) {
          if (!form.$valid) {
            return
          }
          $http
            .post(constants.URLS.BOOK_LIST, book)
            .success(function() {
              $scope.bookAdded = true;
            })
            .error(function(data) {
              $scope.serverErrors = data;
            });
        }
      }
    ]
  );

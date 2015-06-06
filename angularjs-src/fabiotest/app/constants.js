'use strict';

angular
  .module(
    'myApp.constants',
    []
  )
  .factory(
    'constants',
    function() {
      return {
        URLS: {
          SIGNUP: 'http://localhost:8000/api/v1/register/',
          SIGNIN: 'http://localhost:8000/api-token-auth/',
          USER: 'http://localhost:8000/api/v1/user/',
          USER_BOOK_LIST: 'http://localhost:8000/api/v1/user/books/',
          CHANGE_PASSWORD: 'http://localhost:8000/api/v1/user/password/',
          BOOK_LIST: 'http://localhost:8000/api/v1/books/'
        }
      };
    }
  );
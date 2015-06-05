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
          SIGNIN: 'http://localhost:8000/api-token-auth/'
        }
      };
    }
  );
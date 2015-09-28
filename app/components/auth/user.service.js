'use strict';

angular.module('tsm')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      // changePassword: {
      //   method: 'DELETE',
      //   params: {
      //     controller:'passport'
      //   }
      // },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
      });
  });
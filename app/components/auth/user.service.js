'use strict';


var users = angular.module('tsm.users', ['ngResource']);

users.factory('Users', function ($resource) {
    return $resource('/api/users', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

users.factory('User', function ($resource) {
    return $resource('/api/users/:id/:action', {}, {
        get: { method: 'GET', isArray: true },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} },
        // changePassword: { method: 'DELETE', params: {id: '@id', action: 'password'} },
    })
});
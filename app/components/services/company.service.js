'use strict';


var companies = angular.module('tsm.companies', ['ngResource']);

companies.factory('Companies', function ($resource) {
    return $resource('/api/companies', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

companies.factory('Company', function ($resource) {
    return $resource('/api/users/:id/:action', {}, {
        get: { method: 'GET', params: {id: '@id'} },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} },
    })
});

companies.factory('Departments', function ($resource) {
    return $resource('/api/departments', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

companies.factory('Department', function ($resource) {
    return $resource('/api/departments/:id/:action', {}, {
        get: { method: 'GET', params: {id: '@id'} },
        getByCompanyId: {
            method: 'GET',
            url: '/api/departments/company/:id'
            params: { id: '@id'},
            isArray: true
        },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} },
    })
});
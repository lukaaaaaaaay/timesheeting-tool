'use strict';


var projects = angular.module('tsm.projects', ['ngResource']);

projects.factory('Projects', function ($resource) {
    return $resource('/api/projects', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
        findAllForCompany: {
            method: 'GET',
            url: '/api/projects/company/:id',
            params: {id: '@id'},
            isArray:true
        },
        findAllForProjectManager: {
            method: 'GET',
            url: '/api/projects/manager/:id',
            params: {id: '@id'},
            isArray:true
        },   
        findAllForStatus: {
            method: 'GET',
            url: '/api/projects/status/:id',
            params: {id: '@id'},
            isArray:true
        },     
    });
});

projects.factory('Project', function ($resource) {
    return $resource('/api/projects/:id/:action', {}, {
        get: { 
            method: 'GET',
            params: {id: '@id'} 
        },
        update: { 
            method: 'PUT',
            params: {id: '@id'} 
        },
        delete: { 
            method: 'DELETE', 
            params: {id: '@id'} 
        },
    });
});
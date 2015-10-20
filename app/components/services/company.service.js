'use strict';


var companies = angular.module('tsm.companies', ['ngResource']);

companies.factory('Companies', function ($resource) {
    return $resource('/api/companies', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });
});

companies.factory('Company', function ($resource) {
    return $resource('/api/companies/:id/:action', {}, {
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
// for some reason if I had the get by director method in the Company 
// factory it conflicted with the get method, even though the urls were
// different. Will try again when I have more time to investigate properly.
companies.factory('ActiveCompany', function ($resource) {
    return $resource('/api/companies/director/:directorId', {}, {
        get: {
            method: 'GET',
            params: {directorId: '@directorId'}
        }
    });
});

// companies.factory('ActiveCompany', function ($http, Auth) {
//     return {
//         active: function() {
//             directorId = Auth.getCurrentUser();
//             $http.get('/api/companies/director/' + directorId).then(function (company) {
//                 return company.data;
//             }, function (error) {
//                 return null;
//             });
//         }       
//     }
    
// })

companies.factory('Departments', function ($resource) {
    return $resource('/api/departments', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
        getByCompanyId: {
            method: 'GET',
            url: '/api/departments/company/:id',
            params: { id: '@id'},
            isArray: true
        },
    });
});

companies.factory('Department', function ($resource) {
    return $resource('/api/departments/:id/:action', {}, {
        get: { method: 'GET', params: {id: '@id'} },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} },
    });
});
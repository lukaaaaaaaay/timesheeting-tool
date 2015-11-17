(function (angular, tst) {
    'use strict';

    /*
     * Provides Department functionality for TST.
     */
    angular.module(tst.modules.department.name).factory(tst.modules.department.services.api, [
        '$q',
        '$http',
        tst.modules.core.services.eventbus,
        function ($q, $http, eventbus) {
    
            var currentDepartment,

            /**
             * createDepartment
             */
            createDepartment = function (department, callback) {
                var defer = $q.defer();

                $http.post( tst.modules.api.url + '/api/departments', department)
                .success(function(resp) {
                    currentDepartment = resp;

                    // TODO: Broadcasts a companyRegistered event for subscribers.
                    //eventbus.broadcast(tst.modules.company.events.companyRegistered, currentCompany);
                    callback(department);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * updateDepartment
            */
            updateDepartment = function (department, callback) {
                var defer = $q.defer();

                $http.put( tst.modules.api.url + '/api/departments/' + department.id, department)
                .success(function(resp) {
                    currentDepartment = resp;

                    // TODO: Broadcasts a companyRegistered event for subscribers.
                    //eventbus.broadcast(tst.modules.company.events.companyRegistered, currentCompany);
                    callback(department);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * deleteDepartment
            */
            deleteDepartment = function (id, callback) {
                var defer = $q.defer();

                $http.delete( tst.modules.api.url + '/api/departments/' + id)
                .success(function(resp) {
                    callback(resp);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
             * getCurrentDepartment
             */
            getCurrentDepartment = function (id, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/departments/' + id)
                .success(function(resp) {
                    currentDepartment = resp;

                    // TODO: Broadcasts a companyRegistered event for subscribers.
                    //eventbus.broadcast(tst.modules.company.events.companyRegistered, currentCompany);
                    callback(currentDepartment);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            getAllDepartments = function(id, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/departments/company/' + id)
                .success(function(resp) {
                    var departments = resp;

                    // TODO: Broadcasts a companyRegistered event for subscribers.
                    //eventbus.broadcast(tst.modules.company.events.companyRegistered, currentCompany);
                    callback(departments);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            };

            return {
                createDepartment: createDepartment,
                updateDepartment: updateDepartment,
                deleteDepartment: deleteDepartment,
                getAllDepartments: getAllDepartments,
                getCurrentDepartment: getCurrentDepartment
            };
        }
    ]);
}(angular, tst));

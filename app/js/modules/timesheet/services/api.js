(function (angular, tst) {
    'use strict';

    /*
     * Provides Timesheet functionality for TST.
     */
    angular.module(tst.modules.timesheet.name).factory(tst.modules.timesheet.services.api, [
        '$q',
        '$http',
        tst.modules.core.services.eventbus,
        function ($q, $http, eventbus) {
    
            var currentTimesheet,

            /**
             * createTimesheet
             */
            createTimesheet = function (timesheet, callback) {
                var defer = $q.defer();

                $http.post( tst.modules.api.url + '/api/timesheets', timesheet)
                .success(function(resp) {
                    currentTimesheet = resp;

                    callback(timesheet);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * updateTimesheet
            */
            updateTimesheet = function (timesheet, callback) {
                var defer = $q.defer();

                $http.put( tst.modules.api.url + '/api/timesheets/' + timesheet.id, timesheet)
                .success(function(resp) {
                    currentTimesheet = resp;

                    callback(timesheet);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * deleteTimesheet
            */
            deleteTimesheet = function (id, callback) {
                var defer = $q.defer();

                $http.delete( tst.modules.api.url + '/api/timesheets/' + id)
                .success(function(resp) {
                    callback(resp);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
             * getCurrentTimesheet
             */
            getCurrentTimesheet = function (id, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/timesheets/' + id)
                .success(function(resp) {
                    currentTimesheet = resp;


                    callback(currentTimesheet);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * getAllTimesheets
            */
            getAllTimesheets = function(id, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/timesheets/company/' + id)
                .success(function(resp) {
                    var timesheets = resp;

                    callback(timesheets);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * getAllUsersForCompany
            */
            getAllUsersForCompany = function(id, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/users/company/' + id)
                .success(function(resp) {
                    var users = resp;

                    callback(users);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            getAllStatuses = function(callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/statuses')
                .success(function(resp) {
                    var statuses = resp;

                    callback(statuses);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            };

            return {
                createTimesheet: createTimesheet,
                updateTimesheet: updateTimesheet,
                deleteTimesheet: deleteTimesheet,
                getAllTimesheets: getAllTimesheets,
                getCurrentTimesheet: getCurrentTimesheet,
                getAllUsersForCompany: getAllUsersForCompany,
                getAllStatuses: getAllStatuses
            };
        }
    ]);
}(angular, tst));

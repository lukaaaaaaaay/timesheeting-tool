(function (angular, tst) {
    'use strict';

    /*
     * Provides Project functionality for TST.
     */
    angular.module(tst.modules.staff.name).factory(tst.modules.staff.services.api, [
        '$q',
        '$http',
        tst.modules.core.services.eventbus,
        function ($q, $http, eventbus, departmentApi) {
    
            /**
             * createStaffUser
             */
            var createUser = function (user, callback) {
                var defer = $q.defer();

                $http.post( tst.modules.api.url + '/api/users', user)
                .success(function(resp) {
                    var newUser = resp;

                    callback(newUser);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },


            /**
            * deleteUser
            */
            deleteUser = function (id, callback) {
                var defer = $q.defer();

                $http.delete( tst.modules.api.url + '/api/users/' + id)
                .success(function(resp) {
                    callback(resp);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
             * updateUser
             */
            updateUser = function (user, callback) {
                var defer = $q.defer();

                $http.put( tst.modules.api.url + '/api/users', user)
                .success(function(resp) {
                    var newUser = resp;

                    callback(newUser);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },
            /**
             * getTask
             */
            getUser = function (id, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/users/' + id)
                .success(function(resp) {
                    var currentUser = resp;

                    callback(currentUser);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * getAllStaff
            */
            getAllStaff = function(id, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/users/company/' + id)
                .success(function(resp) {
                    var staff = resp;

                    callback(staff);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            };

            return {
                createUser: createUser,
                updateUser: updateUser,
                getUser: getUser,
                getAllStaff: getAllStaff
            };
        }
    ]);
}(angular, tst));

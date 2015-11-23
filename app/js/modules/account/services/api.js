(function (angular, tst) {
    'use strict';

    /*
     * Provides Authentication for TST.
     */
    angular.module(tst.modules.account.name).factory(tst.modules.account.services.api, [
        '$q',
        '$http',
        function ($q, $http) {
            var path = '/api/users/',

            // function getUrl() {
            getUrl = function () {
              return tst.modules.api.url + path;
            },

            // function getUrlForId(id) {
            getUrlForId = function (id) {
              return getUrl() + id;
            },

            find = function () {
                return $http.get(getUrl());
            },

            findOne = function (id) {
              return $http.get(getUrlForId(id));
            },

            create = function (item) {
              return $http.post(getUrl(), item);
              // return $http.post(tst.modules.api.url + path, item);
            },

            updateUser = function (user, callback) {
               var defer = $q.defer();

                $http.put( getUrlForId(user.id), user)
                .success(function(resp) {
                    user = resp;

                    // TODO: Broadcasts a companyRegistered event for subscribers.
                    //eventbus.broadcast(tst.modules.company.events.companyRegistered, currentCompany);
                    callback(user);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            confirmPassword = function (userInfo, callback) {
                var defer = $q.defer();

                $http.post(tst.modules.api.url + '/api/me/confirmpw', userInfo)
                .success(function(resp) {
                    callback(resp);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            resetPassword = function (userInfo, callback) {
                var defer = $q.defer();

                $http.post(tst.modules.api.url + '/api/me/resetpw', userInfo)
                .success(function(resp) {
                    callback(resp);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            destroy = function (id) {
              return $http.delete(getUrlForId(id));
            };

            return {
                // find: find,
                // findOne: findOne,
                create: create,
                updateUser: updateUser,
                confirmPassword: confirmPassword,
                resetPassword: resetPassword,
                // destroy: destroy
            };
        }
    ]);
}(angular, tst));

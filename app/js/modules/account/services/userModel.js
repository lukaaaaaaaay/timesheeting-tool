(function (angular, tst) {
    'use strict';

    /*
     * Provides Authentication for TST.
     */
    angular.module(tst.modules.account.name).factory(tst.modules.account.services.userModel, [
        '$http',
        function ($http) {
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

            update = function (id, item) {
              return $http.put(getUrlForId(id), item);
            },

            destroy = function (id) {
              return $http.delete(getUrlForId(id));
            };

            return {
                // find: find,
                // findOne: findOne,
                create: create
                // update: update,
                // destroy: destroy
            };
        }
    ]);
}(angular, tst));

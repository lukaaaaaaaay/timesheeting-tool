(function (angular, tst) {
    'use strict';

    /*
     * Provides Project functionality for TST.
     */
    angular.module(tst.modules.staff.name).factory(tst.modules.staff.services.api, [
        '$q',
        '$http',
        tst.modules.core.services.eventbus,
        function ($q, $http, eventbus) {
    
            /**
             * createUser
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
            };

            return {
                createUser: createUser
            };
        }
    ]);
}(angular, tst));

(function (angular, tst) {
    'use strict';

    /*
     * Provides Authentication for TST.
     */
    angular.module(tst.modules.company.name).factory(tst.modules.company.services.api, [
        '$q',
        '$http',
        tst.modules.core.services.eventbus,
        function ($q, $http, eventbus) {
            var currentCompany,

            /**
             * createCompany
             */
            createCompany = function (company) {
                var defer = $q.defer();

                $http.post( tst.modules.api.url + '/api/companies', company)
                .success(function(resp) {
                    currentCompany = resp;

                    // TODO: Broadcasts a companyRegistered event for subscribers.
                    //eventbus.broadcast(tst.modules.company.events.companyRegistered, currentCompany);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
             * getCurrentCompany
             */
            getCurrentCompany = function () {
                return currentCompany;
            };

            return {
                createCompany: createCompany,
                getCurrentCompany: getCurrentCompany
            };
        }
    ]);
}(angular, tst));

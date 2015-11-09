(function (angular, tst) {
    'use strict';

    /*
     * Provides Authentication for TST.
     */
    angular.module(tst.modules.company.name).factory(tst.modules.company.services.api, [
        '$q',
        'localStorageService',
        '$http',
        tst.modules.core.services.eventbus,
        function ($q, localStorage, $http, eventbus) {
    
            var currentCompany,


            /**
             * createCompany
             */
            createCompany = function (company, callback) {
                var defer = $q.defer();

                $http.post( tst.modules.api.url + '/api/companies', company)
                .success(function(resp) {
                    currentCompany = resp;

                    // Save currentCompany to localstorage on creation
                    // todo: subscribe to logout event and clear currentCompany, 
                    // todo: also subscribe to login event to store currentCompany on login
                    localStorage.set('tst-currentCompany', currentCompany);


                    // Broadcasts a companyRegistered event for subscribers.
                    eventbus.broadcast(tst.modules.company.events.companyRegistered, currentCompany);
                    callback(company);
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
                return localStorage.get('tst-currentCompany');
            };

            return {
                createCompany: createCompany,
                getCurrentCompany: getCurrentCompany
            };
        }
    ]);
}(angular, tst));

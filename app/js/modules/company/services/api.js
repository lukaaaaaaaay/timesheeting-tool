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
                    localStorage.set(tst.modules.company.storage.companyId, currentCompany.id);
                    localStorage.set(tst.modules.company.storage.currentCompany, currentCompany);


                    // Broadcasts a companyRegistered event for subscribers.
                    // eventbus.broadcast(tst.modules.company.events.companyRegistered, currentCompany);
                    callback(company);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
             * updateCompany
             */

             updateCompany = function (company, callback) {
                var defer = $q.defer();

                $http.put( tst.modules.api.url + '/api/companies/' + company.id, company)
                .success(function(resp) {
                    currentCompany = resp;

                    // TODO: Broadcasts a companyRegistered event for subscribers.
                    //eventbus.broadcast(tst.modules.company.events.companyRegistered, currentCompany);
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
                if(localStorage.get(tst.modules.company.storage.currentCompany))
                    return localStorage.get(tst.modules.company.storage.currentCompany);

                var companyId = localStorage.get(tst.modules.company.storage.companyId);

                // Get the currentUser based on the company ID
                $http.get( tst.modules.api.url + '/api/companies/' + companyId)
                .success(function(resp) {
                    currentCompany = resp;

                    localStorage.set(tst.modules.company.storage.currentCompany, currentCompany);
                    return currentCompany;
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

            };

            return {
                createCompany: createCompany,
                updateCompany: updateCompany,
                getCurrentCompany: getCurrentCompany
            };
        }
    ]);
}(angular, tst));

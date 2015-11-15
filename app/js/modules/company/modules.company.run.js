(function (angular, tst) {
    'use strict';

/*
 * Kick Starts the auth module
 */
angular.module(tst.modules.company.name).run([
    '$rootScope',
    '$location',
    tst.modules.core.services.eventbus,
    function ($rootScope, $location, eventbus) {


        // Listen for companyRegistered event and add the currentCompany to the $rootScope.
        eventbus.subscribe(tst.modules.company.events.companyRegistered, function (event, org) {
            // It's very handy to add references to currentCompany to the $rootScope
            // so that we can access them from any scope within our application.
            console.log("adding " + org.companyName + " to rootScope");
            $rootScope.currentCompany = org;
        });

    }]);
}(angular, tst));
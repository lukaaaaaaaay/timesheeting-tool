(function (angular, tst) {
    'use strict';

/*
 * Kick Starts the auth module
 */
angular.module(tst.modules.core.name).run([
    '$rootScope',
    tst.modules.core.services.bodyclass,
    function ($rootScope, bodyclass) {

        // Apply the bodyClass on route change
        bodyclass.init();

    }]);
}(angular, tst));
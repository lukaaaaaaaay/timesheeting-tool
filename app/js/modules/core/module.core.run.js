(function (angular, tst) {
    'use strict';

/*
 * Kick Starts the auth module
 */
angular.module(tst.modules.core.name).run([
    '$rootScope',
    tst.modules.core.services.bodyclass,
    tst.modules.core.services.sidebarmenu,
    function ($rootScope, bodyclass, sidebarmenu) {

        // Apply the bodyClass on route change
        bodyclass.init();
        sidebarmenu.init();

    }]);
}(angular, tst));
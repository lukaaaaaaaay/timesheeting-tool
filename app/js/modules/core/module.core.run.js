(function (angular, tst) {
    'use strict';

/*
 * Kick Starts the core module
 */
angular.module(tst.modules.core.name).run([
    '$rootScope',
    '$location',
    tst.modules.core.services.bodyclass,
    function ($rootScope, $location, bodyclass) {

        // When the route changes, add the class attribute to the body element
        $rootScope.$on('$routeChangeStart', function (event, next) {
            var authorised;
            if (next.originalPath == tst.modules.dashboard.routes.home) {
                $rootScope.bodyClass = bodyclass.dashboard;
            } else if (next.originalPath == tst.modules.auth.routes.login) {
                $rootScope.bodyClass = bodyclass.formsClass;
            }
        });


    }]);
}(angular, tst));
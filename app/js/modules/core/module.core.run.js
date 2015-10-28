(function (angular, tst) {
    'use strict';

angular.module(tst.modules.core.name).run([
    '$rootScope',
    '$location',
    tst.modules.core.services.bodyclass,
    function ($rootScope, $location, tstBodyClass) {

        $rootScope.$on('$routeChangeStart', function (event, next) {

            var authorised;
            if (next.originalPath == tst.modules.dashboard.routes.home) {
                $rootScope.bodyClass = tstBodyClass.dashboard;
            } else if (next.originalPath == tst.modules.auth.routes.login) {
                $rootScope.bodyClass = tstBodyClass.formsClass;
            }

        });
    }]);
}(angular, tst));
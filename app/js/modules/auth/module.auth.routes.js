(function (angular, tst) {
    'use strict';

    /*
     * Defines routes handled by the auth module
     */
    angular.module(tst.modules.auth.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when(tst.modules.auth.routes.login, {
                controller: tst.modules.auth.controllers.login,
                templateUrl: tst.modules.auth.views.login,
                bodyClass: tst.modules.auth.bodyClass.login
            });
            $routeProvider.when(tst.modules.auth.routes.notAuthorised, {
                controller: tst.modules.auth.controllers.login,
                templateUrl: tst.modules.auth.views.notAuthorised,
                bodyClass: tst.modules.auth.bodyClass.notAuthorised
            });

            $routeProvider.otherwise({ redirectTo: tst.modules.auth.routes.login });
        }]);


}(angular, tst));

(function (angular, tst) {
    'use strict';

    /*
     * Defines routes handled by the auth module
     */
    angular.module(tst.modules.auth.name).config([
        '$routeProvider',
        '$httpProvider',
        function ($routeProvider, $httpProvider) {
            $routeProvider.when(tst.modules.auth.routes.login, {
                controller: tst.modules.auth.controllers.login,
                templateUrl: tst.modules.auth.views.login
            });
            $routeProvider.when(tst.modules.auth.routes.register, {
                controller: tst.modules.auth.controllers.register,
                templateUrl: tst.modules.auth.views.register
            });
            $routeProvider.when(tst.modules.auth.routes.notAuthorised, {
                controller: tst.modules.auth.controllers.login,
                templateUrl: tst.modules.auth.views.notAuthorised
            });

            $routeProvider.otherwise({ redirectTo: tst.modules.auth.routes.login });
        }]);


}(angular, tst));

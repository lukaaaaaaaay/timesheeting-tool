(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.auth.name).config([
        '$routeProvider',
        '$httpProvider',
        function ($routeProvider, $httpProvider) {
            $routeProvider.when(tst.modules.auth.routes.login, {
                controller: tst.modules.auth.controllers.login,
                templateUrl: 'js/modules/auth/html/login.tmpl.html'
            });
            $routeProvider.when(tst.modules.auth.routes.notAuthorised, {
                controller: tst.modules.auth.controllers.login,
                templateUrl: 'js/modules/auth/html/not-authorised.tmpl.html'
            });

            //$routeProvider.otherwise({ redirectTo: tst.modules.salespage.routes.home });
            $routeProvider.otherwise({ redirectTo: tst.modules.auth.routes.login });
        }]);


}(angular, tst));

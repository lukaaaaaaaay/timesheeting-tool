(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.company.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when(tst.modules.company.routes.create, {
                controller: tst.modules.company.controllers.create,
                templateUrl: tst.modules.company.views.create,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                }
            });
        }]);
}(angular, tst));
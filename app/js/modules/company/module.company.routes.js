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
                },
                bodyClass: tst.modules.company.bodyClass.create
            });

            $routeProvider.when(tst.modules.company.routes.edit, {
                controller: tst.modules.company.controllers.edit,
                templateUrl: tst.modules.company.views.edit,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.company.bodyClass.edit,
                sidebarMenu: tst.modules.company.sidebarMenu.edit
            });

            $routeProvider.when(tst.modules.company.routes.view, {
                controller: tst.modules.company.controllers.view,
                templateUrl: tst.modules.company.views.view,
                access: {
                    loginRequired: true,
                    // roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.company.bodyClass.view,
                sidebarMenu: tst.modules.company.sidebarMenu.view
            });

        }]);
}(angular, tst));
(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.project.name).config([
        '$stateProvider',
        function ($stateProvider) {

            $stateProvider.state(tst.modules.project.states.create, {
                url: tst.modules.project.routes.create,
                controller: tst.modules.project.controllers.create,
                templateUrl: tst.modules.project.views.create,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.project.bodyClass.create,
                sidebarMenu: tst.modules.project.sidebarMenu.create
            });

            $stateProvider.state(tst.modules.project.states.edit, {
                url: tst.modules.project.routes.edit,
                controller: tst.modules.project.controllers.edit,
                templateUrl: tst.modules.project.views.edit,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.project.bodyClass.edit,
                sidebarMenu: tst.modules.project.sidebarMenu.edit
            });

            $stateProvider.state(tst.modules.project.states.view, {
                url: tst.modules.project.routes.view,
                controller: tst.modules.project.controllers.view,
                templateUrl: tst.modules.project.views.view,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.project.bodyClass.view,
                sidebarMenu: tst.modules.project.sidebarMenu.view
            });

            $stateProvider.state(tst.modules.project.states.list, {
                url: tst.modules.project.routes.list,
                controller: tst.modules.project.controllers.list,
                templateUrl: tst.modules.project.views.list,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.project.bodyClass.list,
                sidebarMenu: tst.modules.project.sidebarMenu.list
            });

        }]);
}(angular, tst));
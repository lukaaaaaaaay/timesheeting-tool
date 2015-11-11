(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.department.name).config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state(tst.modules.department.states.department, {
              template: '<ui-view />',
              controller: function($scope){
                  console.log("department active");
              }
            });

            $stateProvider.state(tst.modules.department.states.create, {
                url: tst.modules.department.routes.create,
                controller: tst.modules.department.controllers.create,
                templateUrl: tst.modules.department.views.create,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.department.bodyClass.create,
                sidebarMenu: tst.modules.department.sidebarMenu.create
            });

            $stateProvider.state(tst.modules.department.states.edit, {
                url: tst.modules.department.routes.edit,
                controller: tst.modules.department.controllers.edit,
                templateUrl: tst.modules.department.views.edit,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.department.bodyClass.edit,
                sidebarMenu: tst.modules.department.sidebarMenu.edit
            });

            $stateProvider.state(tst.modules.department.states.view, {
                url: tst.modules.department.routes.view,
                controller: tst.modules.department.controllers.view,
                templateUrl: tst.modules.department.views.view,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.department.bodyClass.view,
                sidebarMenu: tst.modules.department.sidebarMenu.view
            });

            $stateProvider.state(tst.modules.department.states.list, {
                url: tst.modules.department.routes.list,
                controller: tst.modules.department.controllers.list,
                templateUrl: tst.modules.department.views.list,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.department.bodyClass.list,
                sidebarMenu: tst.modules.department.sidebarMenu.list
            });

        }]);
}(angular, tst));
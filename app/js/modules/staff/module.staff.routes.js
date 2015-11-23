(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.staff.name).config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state(tst.modules.staff.states.parent, {
              template: '<ui-view />',
              controller: function(){
                  console.log("staff active");
              }
            });

            $stateProvider.state(tst.modules.staff.states.create, {
                url: tst.modules.staff.routes.create,
                controller: tst.modules.staff.controllers.create,
                templateUrl: tst.modules.staff.views.create,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.staff.bodyClass.create,
                sidebarMenu: tst.modules.staff.sidebarMenu.create
            });

            $stateProvider.state(tst.modules.staff.states.edit, {
                url: tst.modules.staff.routes.edit,
                controller: tst.modules.staff.controllers.edit,
                templateUrl: tst.modules.staff.views.edit,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.staff.bodyClass.edit,
                sidebarMenu: tst.modules.staff.sidebarMenu.edit
            });

            $stateProvider.state(tst.modules.staff.states.view, {
                url: tst.modules.staff.routes.view,
                controller: tst.modules.staff.controllers.view,
                templateUrl: tst.modules.staff.views.view,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.staff.bodyClass.view,
                sidebarMenu: tst.modules.staff.sidebarMenu.view
            });

            $stateProvider.state(tst.modules.staff.states.list, {
                url: tst.modules.staff.routes.list,
                controller: tst.modules.staff.controllers.list,
                templateUrl: tst.modules.staff.views.list,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.staff.bodyClass.list,
                sidebarMenu: tst.modules.staff.sidebarMenu.list
            });
        }]);
}(angular, tst));
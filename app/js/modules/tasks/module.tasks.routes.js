(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.project.name).config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state(tst.modules.tasks.states.tasks, {
              template: '<ui-view />',
              controller: function($scope){
                  console.log("tasks active");
              }
            });

            $stateProvider.state(tst.modules.tasks.states.create, {
                url: tst.modules.tasks.routes.create,
                controller: tst.modules.tasks.controllers.create,
                templateUrl: tst.modules.tasks.views.create,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.tasks.bodyClass.create,
                sidebarMenu: tst.modules.tasks.sidebarMenu.create
            });

            // $stateProvider.state(tst.modules.project.states.edit, {
            //     url: tst.modules.project.routes.edit,
            //     controller: tst.modules.project.controllers.edit,
            //     templateUrl: tst.modules.project.views.edit,
            //     access: {
            //         loginRequired: true,
            //         roles: ['Admin', 'Director']
            //     },
            //     bodyClass: tst.modules.project.bodyClass.edit,
            //     sidebarMenu: tst.modules.project.sidebarMenu.edit
            // });

            // $stateProvider.state(tst.modules.project.states.view, {
            //     url: tst.modules.project.routes.view,
            //     controller: tst.modules.project.controllers.view,
            //     templateUrl: tst.modules.project.views.view,
            //     access: {
            //         loginRequired: true,
            //         roles: ['Admin', 'Director']
            //     },
            //     bodyClass: tst.modules.project.bodyClass.view,
            //     sidebarMenu: tst.modules.project.sidebarMenu.view
            // });

            $stateProvider.state(tst.modules.tasks.states.list, {
                url: tst.modules.tasks.routes.list,
                controller: tst.modules.tasks.controllers.list,
                templateUrl: tst.modules.tasks.views.list,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.tasks.bodyClass.list,
                sidebarMenu: tst.modules.tasks.sidebarMenu.list
            });

        }]);
}(angular, tst));
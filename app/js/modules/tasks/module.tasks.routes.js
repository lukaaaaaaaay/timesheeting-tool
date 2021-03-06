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
                },
                bodyClass: tst.modules.tasks.bodyClass.create,
                sidebarMenu: tst.modules.tasks.sidebarMenu.create
            });

            $stateProvider.state(tst.modules.tasks.states.edit, {
                url: tst.modules.tasks.routes.edit,
                controller: tst.modules.tasks.controllers.edit,
                templateUrl: tst.modules.tasks.views.edit,
                access: {
                    loginRequired: true,
                },
                bodyClass: tst.modules.tasks.bodyClass.edit,
                sidebarMenu: tst.modules.tasks.sidebarMenu.edit
            });

            $stateProvider.state(tst.modules.tasks.states.view, {
                url: tst.modules.tasks.routes.view,
                controller: tst.modules.tasks.controllers.view,
                templateUrl: tst.modules.tasks.views.view,
                access: {
                    loginRequired: true,
                },
                bodyClass: tst.modules.tasks.bodyClass.view,
                sidebarMenu: tst.modules.tasks.sidebarMenu.view
            });

            $stateProvider.state(tst.modules.tasks.states.list, {
                url: tst.modules.tasks.routes.list,
                controller: tst.modules.tasks.controllers.list,
                templateUrl: tst.modules.tasks.views.list,
                access: {
                    loginRequired: true
                },
                bodyClass: tst.modules.tasks.bodyClass.list,
                sidebarMenu: tst.modules.tasks.sidebarMenu.list
            });

        }]);
}(angular, tst));
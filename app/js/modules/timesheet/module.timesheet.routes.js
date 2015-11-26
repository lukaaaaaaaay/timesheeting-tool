(function (angular, tst) {
    'use strict';

    angular.module('timesheet').config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state(tst.modules.timesheet.states.timesheet, {
              template: '<ui-view />',
              controller: function($scope){
                  console.log("timesheet active");
              }
            });

            $stateProvider.state(tst.modules.timesheet.states.create, {
                url: tst.modules.timesheet.routes.create,
                controller: tst.modules.timesheet.controllers.create,
                templateUrl: tst.modules.timesheet.views.create,
                access: {
                    loginRequired: true,
                },
                bodyClass: tst.modules.timesheet.bodyClass.create,
                sidebarMenu: tst.modules.timesheet.sidebarMenu.create
            });

            $stateProvider.state(tst.modules.timesheet.states.edit, {
                url: tst.modules.timesheet.routes.edit,
                controller: tst.modules.timesheet.controllers.edit,
                templateUrl: tst.modules.timesheet.views.edit,
                access: {
                    loginRequired: true,
                },
                bodyClass: tst.modules.timesheet.bodyClass.edit,
                sidebarMenu: tst.modules.timesheet.sidebarMenu.edit
            });

            $stateProvider.state(tst.modules.timesheet.states.view, {
                url: tst.modules.timesheet.routes.view,
                controller: tst.modules.timesheet.controllers.view,
                templateUrl: tst.modules.timesheet.views.view,
                access: {
                    loginRequired: true,
                },
                bodyClass: tst.modules.timesheet.bodyClass.view,
                sidebarMenu: tst.modules.timesheet.sidebarMenu.view
            });

            $stateProvider.state(tst.modules.timesheet.states.list, {
                url: tst.modules.timesheet.routes.list,
                controller: tst.modules.timesheet.controllers.list,
                templateUrl: tst.modules.timesheet.views.list,
                access: {
                    loginRequired: true,
                },
                bodyClass: tst.modules.timesheet.bodyClass.list,
                sidebarMenu: tst.modules.timesheet.sidebarMenu.list
            });

        }]);
}(angular, tst));
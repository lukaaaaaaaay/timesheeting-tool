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
        }]);
}(angular, tst));
(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.company.name).config([
        '$stateProvider', 
        function ($stateProvider) {
            $stateProvider.state(tst.modules.company.states.company, {
              template: '<ui-view />',
              controller: function($scope){
                  console.log("company active");
              }
            });

            // $stateProvider.state('dashboard.company.view', {
            //   url: '/company/lol',
            //   // templateUrl: 'js/modules/company/html/view.tmpl.html',
            //   controller: function($scope){
            //     console.log("company view");
            //   }
            // });


            $stateProvider.state(tst.modules.company.states.create, {
                url: tst.modules.company.routes.create,
                controller: tst.modules.company.controllers.create,
                templateUrl: tst.modules.company.views.create,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.company.bodyClass.create,
                
            });

            $stateProvider.state(tst.modules.company.states.edit, {
                url: tst.modules.company.routes.edit,
                controller: tst.modules.company.controllers.edit,
                templateUrl: tst.modules.company.views.edit,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.company.bodyClass.edit,
                sidebarMenu: tst.modules.company.sidebarMenu.edit
            });

            $stateProvider.state(tst.modules.company.states.view, {
                url: tst.modules.company.routes.view,
                controller: tst.modules.company.controllers.view,
                templateUrl: tst.modules.company.views.view,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.company.bodyClass.view,
                sidebarMenu: tst.modules.company.sidebarMenu.view
            });

        }]);
}(angular, tst));
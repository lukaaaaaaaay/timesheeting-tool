(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name).config([
        '$stateProvider',
        function ($stateProvider) {
            /** PARENT STATE: This is the parent Dashboard state.**/
            $stateProvider.state(tst.modules.dashboard.states.dashboard, {
                templateUrl: tst.modules.dashboard.views.dashboard,
                controller: tst.modules.dashboard.controllers.dashboard,
                // access: {
                //     loginRequired: true,
                //     roles: ['Admin', 'Director', 'Staff']
                // },
                // data: {
                //     bodyClass: tst.modules.dashboard.bodyClass.dashboard,
                //     sidebarMenu: tst.modules.dashboard.sidebarMenu.dashboard
                // }
              });

            /** This state is the dashboard homepage*/
            $stateProvider.state(tst.modules.dashboard.states.home, {
                url: tst.modules.dashboard.routes.home,
                templateUrl: tst.modules.dashboard.views.home,
                controller: tst.modules.dashboard.controllers.home,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director', 'Staff']
                },
                data: {
                    bodyClass: tst.modules.dashboard.bodyClass.home,
                    sidebarMenu: tst.modules.dashboard.sidebarMenu.home
                }
              });
           
        }]);
}(angular, tst));
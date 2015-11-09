(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name).config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state(tst.modules.dashboard.states.home, {
                url: tst.modules.dashboard.routes.home,
                controller: tst.modules.dashboard.controllers.home,
                templateUrl: tst.modules.dashboard.views.home,
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
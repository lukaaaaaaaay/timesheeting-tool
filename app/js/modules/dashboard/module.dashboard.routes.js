(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when(tst.modules.dashboard.routes.home, {
                controller: tst.modules.dashboard.controllers.home,
                templateUrl: tst.modules.dashboard.views.home,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director', 'Staff']
                }
            });
        }]);
}(angular, tst));
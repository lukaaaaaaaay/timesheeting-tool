(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when(tst.modules.dashboard.routes.home, {
                controller: tst.modules.dashboard.controllers.dashboard,
                templateUrl: 'js/modules/dashboard/html/dashboard.tmpl.html',
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director', 'Staff']
                }
            });
        }]);
}(angular, tst));
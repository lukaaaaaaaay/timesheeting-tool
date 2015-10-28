(function (angular, tst) {
    'use strict';

    tst.modules.dashboard = {
        name: 'dashboard',
        controllers: {
            dashboard: 'dashboardCtrl'
        },
        routes: {
            home: '/home'
        }
    };

    angular.module(tst.modules.dashboard.name, [
        'ngRoute'
    ]);
}(angular, tst));

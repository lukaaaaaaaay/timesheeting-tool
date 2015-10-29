(function (angular, tst) {
    'use strict';

    tst.modules.dashboard = {
        name: 'dashboard',
        controllers: {
            home: 'homeCtrl'
        },
        views: {
            home: 'js/modules/dashboard/html/home.tmpl.html'
        },
        routes: {
            home: '/home'
        }
    };

    angular.module(tst.modules.dashboard.name, [
        'ngRoute'
    ]);
}(angular, tst));

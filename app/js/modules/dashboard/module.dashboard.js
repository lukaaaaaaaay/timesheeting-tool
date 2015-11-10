(function (angular, tst) {
    'use strict';

    tst.modules.dashboard = {
        name: 'dashboard',
        states: {
            dashboard: 'dashboard',
            home: 'dashboard.home'
        },
        controllers: {
            dashboard: 'dashboardCtrl',
            home: 'homeCtrl'
        },
        views: {
            dashboard: 'js/modules/dashboard/html/dashboard.tmpl.html',
            home: 'js/modules/dashboard/html/home.tmpl.html'
        },
        routes: {
            home: '/home'
        },
        bodyClass: {
            dashboard: 'tst-body',
            home: 'tst-body'
        },
        sidebarMenu: {
            dashboard: {},
            home: {
                selected: 1,
                showDropdown: false,
                activeSubmenu: 0,
                collapsed: false
            }
        }
    };

    angular.module(tst.modules.dashboard.name, [
        tst.modules.core.name
    ]);
}(angular, tst));

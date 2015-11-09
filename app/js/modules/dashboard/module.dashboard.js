(function (angular, tst) {
    'use strict';

    tst.modules.dashboard = {
        name: 'dashboard',
        states: {
            home: 'home'
        },
        controllers: {
            home: 'homeCtrl'
        },
        views: {
            home: 'js/modules/dashboard/html/home.tmpl.html'
        },
        routes: {
            home: '/home'
        },
        bodyClass: {
            home: 'tst-body'
        },
        sidebarMenu: {
            selected: 1,
            showDropdown: false,
            activeSubmenu: 0,
            collapsed: false
        }
    };

    angular.module(tst.modules.dashboard.name, [
        tst.modules.core.name,
        tst.modules.auth.name
    ]);
}(angular, tst));

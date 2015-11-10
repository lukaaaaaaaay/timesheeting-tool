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
            home: {
                selected: 1,
                showDropdown: false,
                activeSubmenu: 0,
                collapsed: false
            }
        }
    };

    angular.module(tst.modules.dashboard.name, [
<<<<<<< HEAD
        tst.modules.core.name
=======
        tst.modules.core.name,
        tst.modules.auth.name,
>>>>>>> ed17c33b7d484521621cd68ee841aca2b7566f9e
    ]);
}(angular, tst));

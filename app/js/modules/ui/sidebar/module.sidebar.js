(function (angular, tst) {
    'use strict';

    tst.modules.ui.sidebar = {
        name: 'sidebar',
        // states: {
        //     dashboard: 'dashboard',
        //     home: 'dashboard.home'
        // },
        controllers: {
            sidebar: 'sidebarCtrl',
            //home: 'homeCtrl'
        },
        views: {
            sidebar: 'js/modules/ui/sidebar/html/sidebar.tmpl.html',
            //home: 'js/modules/dashboard/html/home.tmpl.html'
        },
        directives: {
            sidebar: 'tstSidebar',
        }
        // routes: {
        //     home: '/home'
        // },
        // bodyClass: {
        //     dashboard: 'tst-body',
        //     home: 'tst-body'
        // },
        // sidebarMenu: {
        //     dashboard: {
        //         selected: 1,
        //         showDropdown: false,
        //         activeSubmenu: 0,
        //         collapsed: false
        //     },
        //     home: {
        //         selected: 1,
        //         showDropdown: false,
        //         activeSubmenu: 0,
        //         collapsed: false
        //     }
        // }
    };

    angular.module(tst.modules.ui.sidebar.name, [
        
    ]);
}(angular, tst));

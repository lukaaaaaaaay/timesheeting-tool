(function (angular, tst) {
    'use strict';

    tst.modules.ui.navbar = {
        name: 'navbar',
        // states: {
        //     dashboard: 'dashboard',
        //     home: 'dashboard.home'
        // },
        controller:  'navbarCtrl',
            //home: 'homeCtrl'
        
        view:'js/modules/ui/navbar/html/navbar.tmpl.html',

        directive: 'tstNavbar',
        
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

    angular.module('navbar', [
        tst.modules.core.name,
        tst.modules.auth.name,
    ]);
}(angular, tst));

(function (angular, tst) {
    'use strict';

    tst.modules.staff = {
        name: 'tst.staff',
        states: {
            parent: 'dashboard.staff',
            create: 'dashboard.staff.create',
        },
        views: {
            create: 'js/modules/staff/html/create.tmpl.html'
        },
        routes: {
            create: '/staff/create'
        },
        bodyClass: {
            create: 'tst-body'
        },
        sidebarMenu: {
            create: {
                selected: 5,
                showDropdown: true,
                activeSubmenu: 4,
                collapsed: false
            }
        }
    };

    angular.module(tst.modules.staff.name, [
        tst.modules.core.name
    ]);
}(angular, tst));

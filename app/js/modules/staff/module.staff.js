(function (angular, tst) {
    'use strict';

    tst.modules.staff = {
        name: 'tst.staff',
        states: {
            parent: 'dashboard.staff',
            create: 'dashboard.staff.create',
            edit: 'dashboard.staff.edit',
            view: 'dashboard.staff.view',
            list: 'dashboard.staff.list'
        },
        controllers: {
            create: 'staffCreateCtrl',
            edit: 'staffEditCtrl',
            view: 'staffViewCtrl',
            list: 'staffListCtrl'
        },
        views: {
            create: 'js/modules/staff/html/create.tmpl.html',
            edit: 'js/modules/staff/html/edit.tmpl.html',
            view: 'js/modules/staff/html/view.tmpl.html',
            list: 'js/modules/staff/html/list.tmpl.html'
        },
        services: {
            api: 'staffApi'
        },
        routes: {
            create: '/staff/create',
            edit: '/user/edit/:id',
            view: '/user/view/:id',
            list: '/staff'
        },
        bodyClass: {
            create: 'tst-body',
            edit: 'tst-body',
            view: 'tst-body',
            list: 'tst-body'
        },
        sidebarMenu: {
            create: {
                selected: 6,
                showDropdown: true,
                activeSubmenu: 5,
                collapsed: false
            },
            edit: {
                selected: 6,
                showDropdown: true,
                activeSubmenu: 5,
                collapsed: false
            },
            view: {
                selected: 6,
                showDropdown: true,
                activeSubmenu: 5,
                collapsed: false
            },
            list: {
                selected: 6,
                showDropdown: true,
                activeSubmenu: 5,
                collapsed: false
            }
        }
    };

    angular.module(tst.modules.staff.name, [
        tst.modules.core.name,
        tst.modules.company.name
    ]);
}(angular, tst));

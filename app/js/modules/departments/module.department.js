(function (angular, tst) {
    'use strict';

    tst.modules.department = {
        name: 'department',
        states: {
            department: 'dashboard.company.department',
            create: 'dashboard.company.department.create', 
            edit: 'dashboard.company.department.edit',
            view: 'dashboard.company.department.view',
            list: 'dashboard.company.department.list'
        },
        controllers: {
            create: 'departmentCreateCtrl',
            edit: 'departmentEditCtrl',
            view: 'departmentViewCtrl',
            list: 'departmentListCtrl'
        },
        views: {
            create: 'js/modules/departments/html/create.tmpl.html',
            edit: 'js/modules/departments/html/edit.tmpl.html',
            view: 'js/modules/departments/html/view.tmpl.html',
            list: 'js/modules/departments/html/list.tmpl.html',
            dialog: 'js/modules/departments/html/confirm-delete.html'
        },
        services: {
            api: 'departmentApi',
        },
        routes: {
            create: '/department/create',
            edit: '/department/edit/:id',
            view: '/department/view/:id',
            list: '/departments'
        },
        bodyClass: {
            create: 'tst-body',
            edit: 'tst-body',
            view: 'tst-body',
            list: 'tst-body'
        },
        sidebarMenu: {
            edit: {
                selected: 2,
                showDropdown: true,
                activeSubmenu: 1,
                collapsed: false
            },
            view: {
                selected: 2,
                showDropdown: true,
                activeSubmenu: 1,
                collapsed: false
            },
            create: {
                selected: 2,
                showDropdown: true,
                activeSubmenu: 1,
                collapsed: false
            },
            list: {
                selected: 2,
                showDropdown: true,
                activeSubmenu: 1,
                collapsed: false
            },
        }
    };

    angular.module(tst.modules.department.name, [
        tst.modules.core.name,
        tst.modules.company.name,
    ]);
}(angular, tst));

(function (angular, tst) {
    'use strict';

    tst.modules.department = {
        name: 'department',
        states: {
            create: 'create-department', 
            edit: 'edit-department',
            view: 'view-department',
            list: 'department-list'
        },
        controllers: {
            create: 'createCtrl',
            edit: 'editCtrl',
            view: 'viewCtrl',
            list: 'listCtrl'
        },
        views: {
            create: 'js/modules/departments/html/create.tmpl.html',
            edit: 'js/modules/departments/html/edit.tmpl.html',
            view: 'js/modules/departments/html/view.tmpl.html',
            list: 'js/modules/departments/html/list.tmpl.html',
            dialog: 'js/modules/departments/html/confirm-delete.html'
        },
        services: {
            api: 'api',
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
            selected: 2,
            showDropdown: true,
            activeSubmenu: 1
        }
    };

    angular.module(tst.modules.department.name, [
        tst.modules.core.name,
        tst.modules.auth.name,
        tst.modules.company.name,
    ]);
}(angular, tst));

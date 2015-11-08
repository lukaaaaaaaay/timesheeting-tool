(function (angular, tst) {
    'use strict';

    tst.modules.department = {
        name: 'department',
        controllers: {
            create: 'createCtrl',
            edit: 'editCtrl',
            view: 'viewCtrl',
            list: 'listCtrl'
        },
        views: {
            create: 'js/modules/department/html/create.tmpl.html',
            edit: 'js/modules/department/html/edit.tmpl.html',
            view: 'js/modules/department/html/view.tmpl.html',
            list: 'js/modules/department/html/list.tmpl.html',
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
        }
    };

    angular.module(tst.modules.department.name, [
        tst.modules.core.name,
        tst.modules.auth.name
    ]);
}(angular, tst));

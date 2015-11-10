(function (angular, tst) {
    'use strict';

    tst.modules.project = {
        name: 'project',
        states: {
            create: 'create-project', 
            edit: 'edit-project',
            view: 'view-project',
            list: 'project-list'
        },
        controllers: {
            create: 'createCtrl',
            edit: 'editCtrl',
            view: 'viewCtrl',
            list: 'listCtrl'
        },
        views: {
            create: 'js/modules/project/html/create.tmpl.html',
            edit: 'js/modules/project/html/edit.tmpl.html',
            view: 'js/modules/project/html/view.tmpl.html',
            list: 'js/modules/project/html/list.tmpl.html',
            dialog: 'js/modules/project/html/confirm-delete.html'
        },
        services: {
            api: 'api',
        },
        routes: {
            create: '/project/create',
            edit: '/project/edit/:id',
            view: '/project/view/:id',
            list: '/projects'
        },
        bodyClass: {
            create: 'tst-body',
            edit: 'tst-body',
            view: 'tst-body',
            list: 'tst-body'
        },
        sidebarMenu: {
            edit: {
                selected: 3,
                showDropdown: true,
                activeSubmenu: 2,
                collapsed: false
            },
            view: {
                selected: 3,
                showDropdown: true,
                activeSubmenu: 2,
                collapsed: false
            },
            create: {
                selected: 3,
                showDropdown: true,
                activeSubmenu: 2,
                collapsed: false
            },
            list: {
                selected: 3,
                showDropdown: true,
                activeSubmenu: 2,
                collapsed: false
            },
        }
    };

    angular.module(tst.modules.project.name, [
        tst.modules.core.name,
        tst.modules.auth.name,
        tst.modules.company.name,
    ]);
}(angular, tst));

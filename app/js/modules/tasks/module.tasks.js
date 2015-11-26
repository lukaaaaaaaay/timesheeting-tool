(function (angular, tst) {
    'use strict';

    tst.modules.tasks = {
        name: 'tst.tasks',
        states: {
            tasks: 'dashboard.tasks',
            create: 'dashboard.tasks.create',
            edit: 'dashboard.tasks.edit',
            view: 'dashboard.tasks.view',
            list: 'dashboard.tasks.list'
        },
        controllers: {
            create: 'taskCreateCtrl',
            edit: 'taskEditCtrl',
            view: 'taskViewCtrl',
            list: 'taskListCtrl'
        },
        views: {
            create: 'js/modules/tasks/html/create.tmpl.html',
            edit: 'js/modules/tasks/html/edit.tmpl.html',
            view: 'js/modules/tasks/html/view.tmpl.html',
            list: 'js/modules/tasks/html/list.tmpl.html'
        },
        services: {
            api: 'taskApi'
        },
        routes: { // todo: nest under projects?
            create: '/tasks/create',
            edit: '/task/edit/:id',
            view: '/task/view/:id',
            list: '/tasks'
        },
        bodyClass: {
            create: 'tst-body',
            edit: 'tst-body',
            view: 'tst-body',
            list: 'tst-body'
        },
        sidebarMenu: {
            create: {
                selected: 4,
                showDropdown: true,
                activeSubmenu: 3,
                collapsed: false
            },
            edit: {
                selected: 4,
                showDropdown: true,
                activeSubmenu: 3,
                collapsed: false
            },
            view: {
                selected: 4,
                showDropdown: true,
                activeSubmenu: 3,
                collapsed: false
            },
            list: {
                selected: 4,
                showDropdown: true,
                activeSubmenu: 1,
                collapsed: false
            }
        }
    };

    angular.module(tst.modules.tasks.name, [
        tst.modules.core.name,
        tst.modules.project.name,

        'isteven-multi-select'
    ]);
}(angular, tst));

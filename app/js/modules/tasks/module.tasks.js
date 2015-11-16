(function (angular, tst) {
    'use strict';

    tst.modules.tasks = {
        name: 'tst.tasks',
        states: {
            tasks: 'dashboard.tasks',
            create: 'dashboard.tasks.create',
            list: 'dashboard.tasks.list'
        },
        controllers: {
            create: 'taskCreateCtrl',
            list: 'taskListCtrl'
        },
        views: {
            create: 'js/modules/tasks/html/create.tmpl.html',
            list: 'js/modules/tasks/html/list.tmpl.html'
        },
        services: {
            api: 'taskApi'
        },
        routes: { // todo: nest under projects?
            create: '/tasks/create', // or; /projects/:id/tasks/create ??? // create a task for project :id
            list: '/tasks' // or; /projects/:id/tasks ??? // lists all tasks for project :id
        },
        bodyClass: {
            create: 'tst-body',
            list: 'tst-body'
        },
        sidebarMenu: {
            create: {
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
        tst.modules.project.name
    ]);
}(angular, tst));

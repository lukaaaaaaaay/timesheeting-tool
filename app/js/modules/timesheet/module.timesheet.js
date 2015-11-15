(function (angular, tst) {
    'use strict';

    tst.modules.timesheet = {
        name: 'timesheet',
        states: {
            timesheet: 'dashboard.timesheet',
            create: 'dashboard.timesheet.create', 
            edit: 'dashboard.timesheet.edit',
            view: 'dashboard.timesheet.view',
            list: 'dashboard.timesheet.list'
        },
        controllers: {
            create: 'createCtrl',
            edit: 'editCtrl',
            view: 'viewCtrl',
            list: 'listCtrl'
        },
        views: {
            create: 'js/modules/timesheet/html/create.tmpl.html',
            edit: 'js/modules/timesheet/html/edit.tmpl.html',
            view: 'js/modules/timesheet/html/view.tmpl.html',
            list: 'js/modules/timesheet/html/list.tmpl.html',
            dialog: 'js/modules/timesheet/html/confirm-delete.html'
        },
        services: {
            api: 'timesheetApi',
        },
        routes: {
            create: '/timesheet/create',
            edit: '/timesheet/edit/:id',
            view: '/timesheet/view/:id',
            list: '/timesheets'
        },
        bodyClass: {
            create: 'tst-body',
            edit: 'tst-body',
            view: 'tst-body',
            list: 'tst-body'
        },
        sidebarMenu: {
            edit: {
                selected: 5,
                showDropdown: true,
                activeSubmenu: 4,
                collapsed: false
            },
            view: {
                selected: 5,
                showDropdown: true,
                activeSubmenu: 4,
                collapsed: false
            },
            create: {
                selected: 5,
                showDropdown: true,
                activeSubmenu: 4,
                collapsed: false
            },
            list: {
                selected: 5,
                showDropdown: true,
                activeSubmenu: 4,
                collapsed: false
            },
        }
    };

    angular.module(tst.modules.timesheet.name, [
        tst.modules.core.name,
        tst.modules.auth.name,
    ]);
}(angular, tst));

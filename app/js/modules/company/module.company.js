(function (angular, tst) {
    'use strict';

    tst.modules.company = {
        name: 'company',
        states: {
            company: 'dashboard.company',
            create: 'company-create',
            edit: 'dashboard.company.edit',
            view: 'dashboard.company.view'
        },
        events: {
          companyRegistered: 'tst:company:registered'
        },
        controllers: {
            create: 'createCtrl',
            edit: 'editCtrl',
            view: 'viewCtrl'
        },
        views: {
            create: 'js/modules/company/html/create.tmpl.html',
            edit: 'js/modules/company/html/edit.tmpl.html',
            view: 'js/modules/company/html/view.tmpl.html'
        },
        services: {
            api: 'companyApi',
        },
        routes: {
            create: '/company/create',
            edit: '/company/edit',
            view: '/company/view'
        },
        bodyClass: {
            create: 'tst-body',
            edit: 'tst-body',
            view: 'tst-body',
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
        }
    };

    angular.module(tst.modules.company.name, [
        tst.modules.core.name,
        tst.modules.auth.name
    ]);
}(angular, tst));

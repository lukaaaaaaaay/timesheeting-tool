(function (angular, tst) {
    'use strict';

    tst.modules.company = {
        name: 'company',
        states: {
            create: 'company-create',
            edit: 'company-edit',
            view: 'company-view'
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
            api: 'api',
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
        }
    };

    angular.module(tst.modules.company.name, [
        tst.modules.core.name,
        tst.modules.auth.name
    ]);
}(angular, tst));

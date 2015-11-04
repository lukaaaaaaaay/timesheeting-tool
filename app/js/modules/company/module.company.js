(function (angular, tst) {
    'use strict';

    tst.modules.company = {
        name: 'company',
        controllers: {
            create: 'createCtrl'
        },
        views: {
            create: 'js/modules/company/html/create.tmpl.html'
        },
        services: {
            api: 'api',
        },
        routes: {
            create: '/company/create'
        }
    };

    angular.module(tst.modules.company.name, [
        'ngRoute'
    ]);
}(angular, tst));

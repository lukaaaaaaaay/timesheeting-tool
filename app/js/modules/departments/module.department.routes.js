(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.department.name).config([
        '$stateProvider',
        function ($stateProvider) {

            $stateProvider.state(tst.modules.department.routes.create, {
                controller: tst.modules.department.controllers.create,
                templateUrl: tst.modules.department.views.create,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.department.bodyClass.create
            });

            $stateProvider.state(tst.modules.department.routes.edit, {
                controller: tst.modules.department.controllers.edit,
                templateUrl: tst.modules.department.views.edit,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.department.bodyClass.edit
            });

            $stateProvider.state(tst.modules.department.routes.view, {
                controller: tst.modules.department.controllers.view,
                templateUrl: tst.modules.department.views.view,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.department.bodyClass.view
            });

            $stateProvider.state(tst.modules.department.routes.list, {
                controller: tst.modules.department.controllers.list,
                templateUrl: tst.modules.department.views.list,
                access: {
                    loginRequired: true,
                    roles: ['Admin', 'Director']
                },
                bodyClass: tst.modules.department.bodyClass.list
            });

        }]);
}(angular, tst));
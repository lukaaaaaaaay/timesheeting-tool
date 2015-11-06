(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.account.name).config([
        '$routeProvider',
        function ($routeProvider) {
            // Registration route
            $routeProvider.when(tst.modules.account.routes.register, {
                controller: tst.modules.account.controllers.register,
                templateUrl: tst.modules.account.views.register,
                bodyClass: tst.modules.account.bodyClass.register
            });

            // Manage Account
            $routeProvider.when(tst.modules.account.routes.manageAccount, {
                controller: tst.modules.account.controllers.manageAccount,
                templateUrl: tst.modules.account.views.manageAccount,
                access: {
                    loginRequired: true
                },
                bodyClass: tst.modules.account.bodyClass.manageAccount
            });

            // Reset Password
            $routeProvider.when(tst.modules.account.routes.resetPassword, {
                controller: tst.modules.account.controllers.resetPassword,
                templateUrl: tst.modules.account.views.resetPassword,
                access: {
                    loginRequired: true
                },
                bodyClass: tst.modules.account.bodyClass.resetPassword
            });

        }]);
}(angular, tst));
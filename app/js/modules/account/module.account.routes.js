(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.account.name).config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state(tst.modules.account.states.account, {
              template: '<ui-view />',
              controller: function($scope){
                  console.log("account active");
              }
            });
            // Registration route
            $stateProvider.state(tst.modules.account.states.register, {
                url: tst.modules.account.routes.register,
                controller: tst.modules.account.controllers.register,
                templateUrl: tst.modules.account.views.register,
                 bodyClass: tst.modules.account.bodyClass.register,
                
            });

            // Activation route
            $stateProvider.state(tst.modules.account.states.activation, {
                url: tst.modules.account.routes.activation,
                controller: tst.modules.account.controllers.activation,
                templateUrl: tst.modules.account.views.activation,
                 bodyClass: tst.modules.account.bodyClass.activation,
                
            });

            // Manage Account
            $stateProvider.state(tst.modules.account.states.manageAccount, {
                url: tst.modules.account.routes.manageAccount,
                controller: tst.modules.account.controllers.manageAccount,
                templateUrl: tst.modules.account.views.manageAccount,
                access: {
                    loginRequired: true
                },
                bodyClass: tst.modules.account.bodyClass.manageAccount,
                
            });

            // Reset Password
            $stateProvider.state(tst.modules.account.states.resetPassword, {
                url: tst.modules.account.routes.resetPassword,
                controller: tst.modules.account.controllers.resetPassword,
                templateUrl: tst.modules.account.views.resetPassword,
                access: {
                    loginRequired: true
                },
                bodyClass: tst.modules.account.bodyClass.resetPassword,
                
            });

        }]);
}(angular, tst));
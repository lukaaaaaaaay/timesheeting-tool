(function (angular, tst) {
    'use strict';

    // Login controller
    angular.module(tst.modules.auth.name).controller(tst.modules.auth.controllers.login, [
        '$scope',
        '$state',
        tst.modules.auth.services.authentication,
        tst.modules.core.services.notifier,
        function ($scope, $state, authentication, notifier) {
            $scope.loginModel = {};
            $scope.loading = false;
            $scope.invalidLogin = false;

            // handles login
            $scope.login = function () {
                $scope.invalidLogin = false;
                $scope.loading = true;
                authentication.login($scope.loginModel.email, $scope.loginModel.password).then(function () {
                    $state.go(tst.modules.dashboard.states.home);
                }, function () {
                    $scope.invalidLogin = true;
                    notifier.error('Error', 'Your login was invalid.');
                })['finally'](function () {
                    $scope.loading = false;
                });
            };
        }
    ]);
}(angular, tst));
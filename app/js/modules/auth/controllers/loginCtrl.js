(function (angular, tst) {
    'use strict';

    // Login controller
    angular.module(tst.modules.auth.name).controller(tst.modules.auth.controllers.login, [
        '$scope',
        '$state',
        tst.modules.auth.services.authentication,
        function ($scope, $state, authentication) {
            $scope.loginModel = {};
            $scope.isBusy = false;
            $scope.invalidLogin = false;

            // handles login
            $scope.login = function () {
                $scope.invalidLogin = false;
                $scope.isBusy = true;
                authentication.login($scope.loginModel.email, $scope.loginModel.password).then(function () {
                    $state.go(tst.modules.dashboard.states.home);
                }, function () {
                    $scope.invalidLogin = true;
                })['finally'](function () {
                    $scope.isBusy = false;
                });
            };
        }
    ]);
}(angular, tst));
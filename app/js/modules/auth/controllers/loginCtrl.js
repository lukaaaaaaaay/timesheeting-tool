(function (angular, tst) {
    'use strict';

    // Login controller
    angular.module(tst.modules.auth.name).controller(tst.modules.auth.controllers.login, [
        '$scope',
        '$location',
        tst.modules.auth.services.authentication,
        function ($scope, $location, authentication) {
            $scope.loginModel = {};
            $scope.isBusy = false;
            $scope.invalidLogin = false;

            // handles login
            $scope.login = function () {
                $scope.invalidLogin = false;
                $scope.isBusy = true;
                authentication.login($scope.loginModel.email, $scope.loginModel.password).then(function () {
                    $location.path(tst.modules.account.routes.manageAccount);
                }, function () {
                    $scope.invalidLogin = true;
                })['finally'](function () {
                    $scope.isBusy = false;
                });
            };
        }
    ]);
}(angular, tst));
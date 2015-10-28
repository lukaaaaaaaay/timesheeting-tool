(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.auth.name).controller(tst.modules.auth.controllers.register, [
        '$scope',
        '$location',
        tst.modules.auth.services.authentication,
        function ($scope, $location, authentication) {
            $scope.user = {};
            $scope.errors = {};

            // validate email entered on the fly
            $scope.emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            $scope.register = function () {
                $scope.invalidRegistration = false;
                $scope.isBusy = true;
                authentication.createUser({
                    firstName: $scope.loginModel.firstName,
                    lastName: $scope.loginModel.lastName,
                    email: $scope.loginModel.email,
                    password: $scope.loginModel.password,
                    confirmPassword: $scope.loginModel.confirmPassword,
                }).then(function () {
                        //todo: redirect to initial company creation page
                        $location.path(tst.modules.dashboard.routes.home);
                    }, function () {
                        $scope.invalidRegistration = true;
                    })['finally'](function () {
                        $scope.isBusy = false;
                    });
                };
            }
    ]);
}(angular, tst));
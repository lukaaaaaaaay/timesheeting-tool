(function (angular, tst) {
    'use strict';

    /*
     * Registration controller
     */
    angular.module(tst.modules.account.name).controller(tst.modules.account.controllers.register, [
        '$scope',
        '$state',
        tst.modules.auth.services.authentication,
        function ($scope, $state, authentication) {
            $scope.user = {};
            $scope.errors = {};
            console.log("register");
            // validate email entered on the fly
            $scope.emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            // Handles registration
            $scope.register = function () {
                console.log("registering");
                $scope.invalidRegistration = false;
                $scope.isBusy = true;

                authentication.createUser({
                    firstName: $scope.user.firstName,
                    lastName: $scope.user.lastName,
                    email: $scope.user.email,
                    password: $scope.user.password,
                    confirmPassword: $scope.user.confirmPassword,
                }).then(function () {
                    // redirect to company creation screen
                    $state.go(tst.modules.company.states.create);
                }, function () {
                        $scope.invalidRegistration = true;
                })['finally'](function () {
                        $scope.isBusy = false;
                });

            };
        }
    ]);
}(angular, tst));
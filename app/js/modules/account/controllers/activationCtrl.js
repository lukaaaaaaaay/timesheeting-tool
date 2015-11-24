(function (angular, tst) {
    'use strict';

    /*
     * Reset Password controller
     */
    angular.module(tst.modules.account.name).controller(tst.modules.account.controllers.activation, [
        '$scope',
        '$state',
        tst.modules.auth.services.authentication,
        tst.modules.account.services.api,
        tst.modules.core.services.notifier,
        function ($scope, $state, authentication, accountApi, notifier) {
            $scope.user = {};
            $scope.errors = {};

            $scope.activation = {
                email: '',
                token: '',
                newPassword: '',
                confirmNewPassword: ''
            };
            $scope.accountActivated = false;
            $scope.passwordCreated = false;
            $scope.errors = {
                isValid: true,
                message: ''
            }


            // function init() {
            //     $scope.user = authentication.getCurrentLoginUser();
            // }

            // init();


            $scope.activateAccount = function (form) {
                if(form.$valid) {
                    accountApi.activateAccount({email: $scope.activation.email, token: $scope.activation.token}, function(response) {
                        $scope.accountActivated = true;
                        $scope.errors.isValid = true;
                        $scope.user = response;
                    }, function (error) {
                        $scope.errors.isValid = false;
                        $scope.errors.message = 'Unable to activate your account: ' + error.data;
                        notifier.error('Error!', $scope.errors.message);
                    });
                }
                else {
                   notifier.error('Error!', 'There are valiation errors with your submission. Please fix before continuing.'); 
                }
            };

            $scope.createPassword = function(form) {
                if(form.$valid) {
                    accountApi.createPassword({userId: $scope.user.id, newPassword: $scope.activation.newPassword}, function (success) {
                        notifier.success('Success', 'Your password has been created');

                        authentication.login($scope.user.email, $scope.activation.newPassword).then(function () {
                            $scope.errors.isValid = true;
                            $scope.passwordCreated = true;
                        }, function () {
                            $scope.errors.other = err;
                        });
                    }, function (error) {
                        $scope.errors.isValid = false;
                        $scope.errors.message = 'Unable to create the password: ' + error.data;
                        notifier.error('Error!', $scope.errors.message);
                    });
                }
                else {
                   notifier.error('Error!', 'There are valiation errors with your submission. Please fix before continuing.'); 
                }
            };
        }
    ]);
}(angular, tst));
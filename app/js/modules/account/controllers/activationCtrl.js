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

            $scope.passwords = {
                current: '',
                newPassword: '',
                confirmNewPassword: ''
            };
            $scope.passwordConfirmed = false;
            $scope.passwordReset = false;
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
                    // accountApi.activateAccount({userId: $scope.user.id, password: $scope.passwords.current}, function(success) {
                    //     $scope.passwordConfirmed = true;
                    //     $scope.errors.isValid = true;
                    // }, function (error) {
                    //     $scope.errors.isValid = false;
                    //     $scope.errors.message = 'Unable to validate the password: ' + error.data;
                    //     notifier.error('Error!', $scope.errors.message);
                    // });
                }
                else {
                   notifier.error('Error!', 'There are valiation errors with your submission. Please fix before continuing.'); 
                }
            };

            // $scope.resetPassword = function(form) {
            //     if(form.$valid) {
            //         accountApi.resetPassword({userId: $scope.user.id, newPassword: $scope.passwords.newPassword}, function (success) {
            //             notifier.success('Success', 'Your password has been reset');

            //             authentication.login($scope.user.email, $scope.passwords.newPassword).then(function () {
            //                 $scope.errors.isValid = true;
            //                 $scope.passwordReset = true;
            //             }, function () {
            //                 $scope.errors.other = err;
            //             });
            //         }, function (error) {
            //             $scope.errors.isValid = false;
            //             $scope.errors.message = 'Unable to update the password: ' + error.data;
            //             notifier.error('Error!', $scope.errors.message);
            //         });
            //     }
            //     else {
            //        notifier.error('Error!', 'There are valiation errors with your submission. Please fix before continuing.'); 
            //     }
            // };
        }
    ]);
}(angular, tst));
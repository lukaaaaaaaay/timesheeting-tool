(function () {
    'use strict';

    angular.module('tsm')
    .controller('ManageResetPwCtrl', function ($scope, $location,$rootScope, tstBodyClass, notifier, Auth, User, Users, $state, Me) {
        $scope.user = {};
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
        // set body class
        $rootScope.bodyClass = tstBodyClass.returned.dashboard;

        function init() {
            $scope.user = Auth.getCurrentUser();
        };

        init();

        $scope.confirmPassword = function (form) {
            if(form.$valid) {
                Me.confirmPassword({userId: $scope.user.id, password: $scope.passwords.current}, function (success) {
                    $scope.passwordConfirmed = true;
                    $scope.errors.isValid = true;
                }, function (error) {
                    $scope.errors.isValid = false;
                    $scope.errors.message = 'Unable to validate the password: ' + error.data;
                    notifier.error('Error!', $scope.errors.message);
                });
            }
            else {
               notifier.error('Error!', 'There are valiation errors with your submission. Please fix before continuing.'); 
            }
        };

        $scope.resetPassword = function(form) {
            if(form.$valid) {
                Me.resetPassword({userId: $scope.user.id, newPassword: $scope.passwords.newPassword}, function (success) {
                    notifier.success('Success', 'Your password has been reset');
                    // log the user back in with the new password. Ensures session has updated password.
                    Auth.login({
                        email: $scope.user.email,
                        password: $scope.passwords.newPassword
                    })
                    .then( function() {
                        // Logged in, show updated section
                        $scope.errors.isValid = true;
                        $scope.passwordReset = true;
                    })
                    .catch( function(err) {
                        $scope.errors.other = err;
                    });
                }, function (error) {
                    $scope.errors.isValid = false;
                    $scope.errors.message = 'Unable to update the password: ' + error.data;
                    notifier.error('Error!', $scope.errors.message);
                });
            }
            else {
               notifier.error('Error!', 'There are valiation errors with your submission. Please fix before continuing.'); 
            }
        };
        
        function updateUser(fieldName) {
            User.update({id: $scope.user.id}, $scope.user, function (updatedUser) {
                $scope.user = updatedUser;
                form.$setPristine();
                notifier.success('Success!', 'User ' + fieldName + ' updated');
            }, function (error) {
                notifier.error('Error!', 'There was an error updating the ' + fieldName + ' field');
            })
        }
    });
})();

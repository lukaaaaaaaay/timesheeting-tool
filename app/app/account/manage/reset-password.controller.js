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
                }, function (error) {
                    console.log(error);
                    notifier.error('Error!', 'The password entered doesn\'t match the one stored for this user');
                });
            }
            else {
               notifier.error('Error!', 'There are valiation errors with your submission. Please fix before continuing.'); 
            }
        };

        $scope.resetPassword = function() {
            
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

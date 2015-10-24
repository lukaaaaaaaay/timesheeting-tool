(function () {
    'use strict';

    angular.module('tsm')
    .controller('ManageAccountCtrl', function ($scope, $location,$rootScope, tstBodyClass, notifier, Auth, User, Users) {
        $scope.user = {};
        // set body class
        $rootScope.bodyClass = tstBodyClass.returned.dashboard;

        function init() {
            $scope.user = Auth.getCurrentUser();
        }

        init();

        $scope.changeFirstName = function(form) {
            if(form.$valid) {
                updateUser(form, "first name");
                
            }
            else {
                notifier.error("Error", "There are validation errors with your submission. Please fix before updating your details.")
            }
        };

        $scope.changeLastName = function(form) {
            if(form.$valid) {
                updateUser(form, "last name");
            }
            else {
                notifier.error("Error", "There are validation errors with your submission. Please fix before updating your details.")
            }
        };

        $scope.changeEmail = function(form) {
            if(form.$valid) {
                updateUser(form, "email");
            }
            else {
                notifier.error("Error", "There are validation errors with your submission. Please fix before updating your details.")
            }
        };

        $scope.resetPassword = function() {

        };

        $scope.updateDisplayPicture = function(form) {

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

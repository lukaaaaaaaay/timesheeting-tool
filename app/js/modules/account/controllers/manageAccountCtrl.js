(function (angular, tst) {
    'use strict';

    /*
     * Manage Account controller
     */
    angular.module(tst.modules.account.name).controller(tst.modules.account.controllers.manageAccount, [
        '$scope',
        '$location',
        tst.modules.auth.services.authentication
        function ($scope, $location, authentication, eventbus) {
            $scope.user = {};
            $scope.errors = {};

            function init() {
                $scope.user = authentication.getCurrentLoginUser();
            };

            init();


            $scope.changeFirstName = function(form) {
                // if(form.$valid) {
                //     updateUser(form, "first name");
                    
                // }
                // else {
                //     notifier.error("Error", "There are validation errors with your submission. Please fix before updating your details.")
                // }
            };

            $scope.changeLastName = function(form) {
                // if(form.$valid) {
                //     updateUser(form, "last name");
                // }
                // else {
                //     notifier.error("Error", "There are validation errors with your submission. Please fix before updating your details.")
                // }
            };

            $scope.changeEmail = function(form) {
                // if(form.$valid) {
                //     updateUser(form, "email");
                // }
                // else {
                //     notifier.error("Error", "There are validation errors with your submission. Please fix before updating your details.")
                // }
            };

            $scope.resetPassword = function() {
                // $state.transitionTo('reset password - logged in');
            };

            function updateUser(form, fieldName) {
                // User.update({id: $scope.user.id}, $scope.user, function (updatedUser) {
                //     $scope.user = updatedUser;
                //     form.$setPristine();
                //     notifier.success('Success!', 'User ' + fieldName + ' updated');
                // }, function (error) {
                //     var message = 'There was an error updating the ' + fieldName + ' field.';
                //     switch(fieldName) {
                //         case 'first name':
                //             break; 
                //         case 'last name':
                //             break;
                //         case 'email': 
                //             if(error.status == 400) {
                //                 message =  error.data.invalidAttributes.email[0].message;
                //             }

                //             break;
                //     }
                //     notifier.error('Error!', message);
                // })
            };
        }
    ]);
}(angular, tst));
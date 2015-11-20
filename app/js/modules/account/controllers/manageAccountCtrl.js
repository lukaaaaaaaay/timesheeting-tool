(function (angular, tst) {
    'use strict';

    /*
     * Manage Account controller
     */
    angular.module(tst.modules.account.name).controller(tst.modules.account.controllers.manageAccount, [
        '$scope',
        tst.modules.auth.services.authentication,
        tst.modules.account.services.api,
        tst.modules.core.services.notifier,
        function ($scope, authentication, accountApi, notifier) {
            $scope.user = {};
            $scope.errors = {};

            function init() {
                $scope.user = authentication.getCurrentLoginUser();
                console.log($scope.user);
            };

            init();


            // $scope.changeFirstName = function(form) {
            //     if(form.$valid) {
            //         var result = updateUser($scope.user.id, $scope.user);
            //         console.log(result);
            //     }
            //     else {
            //         notifier.error("Error", "There are validation errors with your submission. Please fix before updating your details.")
            //     }
            // };

            // $scope.changeLastName = function(form) {
            //     // if(form.$valid) {
            //     //     updateUser(form, "last name");
            //     // }
            //     // else {
            //     //     notifier.error("Error", "There are validation errors with your submission. Please fix before updating your details.")
            //     // }
            // };

            // $scope.changeEmail = function(form) {
            //     // if(form.$valid) {
            //     //     updateUser(form, "email");
            //     // }
            //     // else {
            //     //     notifier.error("Error", "There are validation errors with your submission. Please fix before updating your details.")
            //     // }
            // };

            $scope.resetPassword = function() {
                // $state.transitionTo('reset password - logged in');
            };

            $scope.updateUser = function(form) {
                if(form.$valid) {
                    accountApi.updateUser($scope.user, function (user) {
                        $scope.user = user;
                        notifier.success("Success", "User successfully updated!");
                    }, function (error) {
                        console.log(error);
                        notifier.error("Error", "There was an error updating the user");
                    });
                    
                }
                else {
                    notifier.error("Error", "There are validation errors with your submission. Please fix before updating your details.")
                }
            };
        }
    ]);
}(angular, tst));
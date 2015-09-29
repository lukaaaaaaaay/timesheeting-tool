'use strict';

angular.module('tsm')
    .controller('RegisterCtrl', function ($scope, Auth, $location) {
      $scope.user = {};
      $scope.errors = {};

      $scope.register = function(form) {
        $scope.submitted = true;

        console.log($scope.user);

        if(form.$valid) {
          Auth.createUser({
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName,
            email: $scope.user.email,
            password: $scope.user.password,
            confirmPassword: $scope.user.confirmPassword
          })
          .then( function() {
            // Account created, redirect to home
            $location.path('/');
          })
          .catch( function(err) {
            err = err.data;
            $scope.errors = {};
          });
        }
      };

    });
'use strict';

angular.module('tsm')
    .controller('RegisterCtrl', function ($scope, Auth, $location, $rootScope, tstBodyClass) {
      $scope.user = {};
      $scope.errors = {};
      // validate email entered on the fly
      $scope.emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      // add body class
      $rootScope.bodyClass = tstBodyClass.returned.formsClass;

      $scope.register = function(form) {
        $scope.submitted = true;

        if(form.$valid) {
          Auth.createUser({
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName,
            email: $scope.user.email,
            password: $scope.user.password,
            confirmPassword: $scope.user.confirmPassword
          })
          .then( function() {
            // Account created, redirect to dashboard
            $location.path('/dashboard');
          })
          .catch( function(err) {
            err = err.data;
            $scope.errors = {};
          });
        }
      };

    });
'use strict';

angular.module('tsm')
.controller('LoginCtrl', function ($scope, Auth, $location,$rootScope, tstBodyClass) {
    $scope.user = {};
    $scope.errors = {};
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.formsClass;

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to dashboard
          $location.path('/dashboard');
        })
        .catch( function(err) {
          $scope.errors.other = err;
        });
      }
    }
});
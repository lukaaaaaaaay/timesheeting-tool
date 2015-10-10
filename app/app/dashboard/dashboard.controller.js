'use strict';

angular.module('tsm')
  .controller('DashboardCtrl', function ($scope, $http, Auth, $rootScope, tstBodyClass, $state) {
    $scope.user = [];

    // add body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    // add user to scope
    $scope.user = Auth.getCurrentUser();

    $scope.goTo = function(path) {
    	$state.transitionTo(path);
    }

    console.log($scope.user);
  });

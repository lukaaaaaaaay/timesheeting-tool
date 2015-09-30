'use strict';

angular.module('tsm')
  .controller('DashboardCtrl', function ($scope, $http, Auth, $rootScope, tstBodyClass) {
    $scope.user = [];

    // add body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    // add user to scope
    $scope.user = Auth.getCurrentUser();

    console.log($scope.user);
  });

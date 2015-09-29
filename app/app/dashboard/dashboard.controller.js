'use strict';

angular.module('tsm')
  .controller('DashboardCtrl', function ($scope, $http, $rootScope, tstBodyClass) {
    $scope.awesomeThings = [];
    // add body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  });

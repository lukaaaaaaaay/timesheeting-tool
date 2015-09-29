'use strict';

angular.module('tsm')
  .controller('DashboardCtrl', function ($scope, $http, $rootScope, tstBodyClass) {
    $scope.awesomeThings = [];

    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  });

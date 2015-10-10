'use strict';

angular.module('tsm')
.controller('EditCompanyCtrl', function ($scope, $location,$rootScope, tstBodyClass) {
    $scope.company = {};
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

  
});
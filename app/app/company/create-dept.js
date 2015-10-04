'use strict';

angular.module('tsm')
.controller('CreateDepartmentCtrl', function ($scope, $location,$rootScope, tstBodyClass) {
    $scope.department = {};
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

  
});
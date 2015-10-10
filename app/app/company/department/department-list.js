'use strict';

angular.module('tsm')
.controller('DepartmentListCtrl', function ($scope, $location,$rootScope, tstBodyClass) {
    $scope.departments = [];
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

  
});
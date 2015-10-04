'use strict';

angular.module('tsm')
.controller('ManageCompanyCtrl', function ($scope, $location,$rootScope, tstBodyClass) {
    $scope.company = {};
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

  
});
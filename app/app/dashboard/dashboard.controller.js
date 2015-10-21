
'use strict';

angular.module('tsm')
  .controller('DashboardCtrl', function ($scope, $http, Auth, $rootScope, tstBodyClass, $state, ActiveCompany) {
    $scope.user = [];

    // add body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    // sidebar menu - set in menu tree controllers. 
    $rootScope.selectedMenu = 1;
    $rootScope.showDropdown = false;    
  
    
    // add user to scope
    $scope.user = Auth.getCurrentUser();

    $scope.goTo = function(path) {
    	$state.transitionTo(path);
    }

    // sidebar menu
    $scope.setSelectedMenu = function (selection) {
        $rootScope.selectedMenu = selection;
    }
    // sidebar menu
    $scope.toggleDropdown = function () {
        $rootScope.showDropdown = !$rootScope.showDropdown;
    }

    console.log($scope.user);
  });

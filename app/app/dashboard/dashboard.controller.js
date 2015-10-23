
'use strict';

angular.module('tsm')
  .controller('DashboardCtrl', function ($scope, $http, Auth, $rootScope, tstBodyClass, $state, ActiveCompany) {
    $scope.user = [];

    // add body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    // sidebar menu - set in menu tree controllers. 
    $rootScope.selectedMenu = 1;
    $rootScope.showDropdown = false;  
    $rootScope.sidebarMenu = {
        selected: 1,
        showDropdown: false,
        activeSubmenu: 0,
        collapsed: false
    };
  
    
    // add user to scope
    $scope.user = Auth.getCurrentUser();

    $scope.goTo = function(path) {
    	$state.transitionTo(path);
    };

    // sidebar menu
    $scope.setSelectedMenu = function (selection) {
        $rootScope.sidebarMenu.selected = selection;
    };

    // sidebar menu
    $scope.toggleDropdown = function (selection) {
        $rootScope.sidebarMenu.showDropdown = !$rootScope.sidebarMenu.showDropdown;
        if($rootScope.sidebarMenu.showDropdown) {
            $rootScope.sidebarMenu.activeSubmenu = selection;
        }
        else {
            $rootScope.sidebarMenu.activeSubmenu = 0;    
        }
        console.log($rootScope.sidebarMenu);
    };

    $scope.toggleCollapsed = function () {
        $rootScope.sidebarMenu.collapsed = !$rootScope.sidebarMenu.collapsed
        $rootScope.sidebarMenu.showDropdown = $rootScope.sidebarMenu.collapsed ? true: false;
    };

    console.log($scope.user);
  });

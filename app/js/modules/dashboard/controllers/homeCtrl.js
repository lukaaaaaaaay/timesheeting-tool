(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name)
        .controller(tst.modules.dashboard.controllers.home, [   
        '$scope',
        'sidebarmenu',     
        function ($scope, sidebarMenu) {
        	$scope.sidebarMenu = {};
        	// sidebar menu
		    $scope.setSelectedMenu = function (selection) {
		        sidebarMenu.setSelectedMenu(selection);
		        $scope.sidebarMenu.selected = sidebarMenu.getSelectedMenu();
		    };

		    // sidebar menu
		    $scope.toggleDropdown = function (selection) {
		        sidebarMenu.toggleDropdown(selection);
		        $scope.sidebarMenu.showDropdown = sidebarMenu.getDropdownState();
		        $scope.sidebarMenu.activeSubmenu = sidebarMenu.getActiveDropdown();
		        
		    };

		    $scope.toggleCollapsed = function () {
		        sidebarMenu.toggleCollapsed();
		        $scope.sidebarMenu.collapsed = sidebarMenu.getCollapsedState();
		    };
        }


    ]);
}(angular, tst));
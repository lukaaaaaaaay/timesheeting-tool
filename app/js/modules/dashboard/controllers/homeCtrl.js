(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name)
        .controller(tst.modules.dashboard.controllers.home, [   
        '$scope',
        'sidebarmenu',     
        function ($scope, sidebarMenu) {
        	// sidebar menu
		    $scope.setSelectedMenu = function (selection) {
		        sidebarmenu.setSelectedMenu(selection);
		    };

		    // sidebar menu
		    $scope.toggleDropdown = function (selection) {
		        sidebarmenu.toggleDropdown(selection);
		        
		    };

		    $scope.toggleCollapsed = function () {
		        sidebarmenu.toggleCollapsed();
		    };
        }


    ]);
}(angular, tst));
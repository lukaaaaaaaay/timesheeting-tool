(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name)
        .controller(tst.modules.dashboard.controllers.home, [   
        '$scope',
        'sidebarmenu',     
        function ($scope, sidebarMenu) {
        	// TODO: Move to SidebarMenu directive.
        	$scope.sidebarMenu = tst.modules.dashboard.sidebarMenu.home;

        	$scope.$on('sidebarChanged', function (event, args) {
        		$scope.sidebarMenu = args.sidebarMenu;
        	});
        	
        	// sidebar menu
		    $scope.setSelectedMenu = function (selection) {
		        sidebarMenu.setSelectedMenu(selection);
		    };

		    // sidebar menu
		    $scope.toggleDropdown = function (selection) {
		        sidebarMenu.toggleDropdown(selection);
		    };

		    $scope.toggleCollapsed = function () {
		        sidebarMenu.toggleCollapsed();
		    };
        }


    ]);
}(angular, tst));
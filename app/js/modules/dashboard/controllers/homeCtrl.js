(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name)
<<<<<<< HEAD
        .controller(tst.modules.dashboard.controllers.home, [
        '$scope',
        tst.modules.core.services.eventbus,
        function ($scope, eventbus) {
            $scope.user = {
                firstName: "Anonymous"
            };

            eventbus.subscribe('auth:user:loggedin', function (event, data) {
                $scope.user = data; // override the anonymous user
            });

=======
        .controller(tst.modules.dashboard.controllers.home, [   
        '$scope',
        'sidebarmenu',     
        function ($scope, sidebarMenu) {
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
>>>>>>> ed17c33b7d484521621cd68ee841aca2b7566f9e
        }


    ]);
}(angular, tst));
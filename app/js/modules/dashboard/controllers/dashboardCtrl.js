(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name)
        .controller(tst.modules.dashboard.controllers.dashboard, [   
        '$scope',
        'sidebarmenu',     
        function ($scope, sidebarMenu) {
            console.log("in parent state");
            $scope.sidebarMenu = tst.modules.dashboard.sidebarMenu.dashboard;

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
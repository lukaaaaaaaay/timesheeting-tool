(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.ui.sidebar.name)
        .directive(tst.modules.ui.sidebar.directive, function() {
            var controller = [
                '$scope',
                'sidebarmenu',
                function ($scope, sidebarMenu) {
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
            ];

            return {
                restrict: 'E',
                controller: controller,
                templateUrl: tst.modules.ui.sidebar.view
            };

            
        });
}(angular, tst));

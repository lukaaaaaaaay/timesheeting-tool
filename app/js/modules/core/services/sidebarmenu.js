(function (angular, tst) {
    'use strict';

    /**
     * Provides a service for changing the class of the body element
     */
    angular.module(tst.modules.core.name).factory(tst.modules.core.services.sidebarmenu, [
        '$rootScope',
        function ($rootScope) {

            var init = function() {
                // Whenever the route changes, add the sidebar menu to scope.
                $rootScope.$on('$stateChangeStart', function (event, next, nextParams, from, fromParams) {
                    if (next.sidebarMenu !== undefined) {
                        $rootScope.sidebarMenu = next.sidebarMenu;
                    }
                });

                broadcast();
            },

            setSelectedMenu = function (selection) {
                $rootScope.sidebarMenu.selected = selection;
                broadcast();
            },

            toggleDropdown = function (selection) {
                var prev = $rootScope.sidebarMenu.activeSubmenu;

                $rootScope.sidebarMenu.activeSubmenu = selection;

                // toggling
                if(prev == 0 || prev == $rootScope.sidebarMenu.activeSubmenu) {
                    $rootScope.sidebarMenu.showDropdown = !$rootScope.sidebarMenu.showDropdown;  
                }

                if(!$rootScope.sidebarMenu.showDropdown) {
                    $rootScope.sidebarMenu.activeSubmenu = 0;
                }

                broadcast();
            },

            toggleCollapsed = function () {
                $rootScope.sidebarMenu.collapsed = !$rootScope.sidebarMenu.collapsed;
                broadcast();
            };

            function broadcast() {
                $rootScope.$broadcast('sidebarChanged', {sidebarMenu: $rootScope.sidebarMenu});
            }

            return {
                init: init,
                setSelectedMenu: setSelectedMenu,
                toggleDropdown: toggleDropdown,
                toggleCollapsed: toggleCollapsed,
            };
        }
    ]);
}(angular, tst));
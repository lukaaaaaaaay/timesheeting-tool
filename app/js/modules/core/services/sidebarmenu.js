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
            },

            setSelectedMenu = function (selection) {
                $rootScope.sidebarMenu.selected = selection;
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

                console.log($rootScope.sidebarMenu);
            },

            toggleCollapsed = function () {
                $rootScope.sidebarMenu.collapsed = !$rootScope.sidebarMenu.collapsed
            },

            getCollapsedState = function() {
                return $rootScope.sidebarMenu.collapsed;
            },

            getSelectedMenu = function() {
                return $rootScope.sidebarMenu.selected;
            },

            getDropdownState = function() {
                return $rootScope.sidebarMenu.activeSubmenu;
            },

            getActiveDropdown = function() {
                return $rootScope.sidebarMenu.showDropdown;
            };

            return {
                init: init,
                setSelectedMenu: setSelectedMenu,
                toggleDropdown: toggleDropdown,
                toggleCollapsed: toggleCollapsed,
                getCollapsedState: getCollapsedState,
                getSelectedMenu: getSelectedMenu,
                getActiveDropdown: getActiveDropdown,
                getDropdownState: getDropdownState
            };
        }
    ]);
}(angular, tst));
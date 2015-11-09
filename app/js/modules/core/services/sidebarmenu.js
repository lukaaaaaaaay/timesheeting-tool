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
                    if (next.data.sidebarMenu !== undefined) {
                        $rootScope.sidebarMenu = next.data.sidebarMenu;
                    }
                });
            };

            return {
                    init: init
            };
        }
    ]);
}(angular, tst));
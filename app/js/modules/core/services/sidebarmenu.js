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
                $rootScope.$on('$routeChangeStart', function (event, next) {
                    if (next.sidebarMenu !== undefined) {
                        $rootScope.sidebarMenu = next.sidebarMenu;
                    }
                });
            };

            return {
                    init: init
            };
        }
    ]);
}(angular, tst));

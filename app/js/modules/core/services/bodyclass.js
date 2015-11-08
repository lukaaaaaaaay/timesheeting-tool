(function (angular, tst) {
    'use strict';

    /**
     * Provides a service for changing the class of the body element
     */
    angular.module(tst.modules.core.name).factory(tst.modules.core.services.bodyclass, [
        '$rootScope',
        function ($rootScope) {

            var init = function() {
                // Whenever the route changes, add the body class.
                $rootScope.$on('$routeChangeStart', function (event, next) {
                    console.log("bodyclassing");
                    if (next.bodyClass !== undefined) {
                        console.log("bodyclass is: ");
                        console.log(next.bodyClass);
                        $rootScope.bodyClass = next.bodyClass;
                    }
                });
            };

            return {
                    init: init
            };
        }
    ]);
}(angular, tst));

(function (angular, tst) {
    'use strict';

    /**
     * Directive for securing UI Elements
     * Hide/Show element based on users role.
     */
    angular.module(tst.modules.auth.name).directive(tst.modules.auth.directives.logout, [
        '$timeout',
        tst.modules.auth.services.authentication,
        function ($timeout, authentication) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var evHandler = function(e) {
                        e.preventDefault();
                        
                        if (scope.loading) {
                            return false;
                        }
                        
                        $timeout(function() {
                            scope.loading = true;
                        });
                        
                        authentication.logout(function() {
                            $timeout(function() {
                                scope.loading = false;
                            });
                        });
                        
                        return false;
                    };

                    element.on ? element.on('click', evHandler) : element.bind('click', evHandler);
                }
            };
        }]);
}(angular, tst));
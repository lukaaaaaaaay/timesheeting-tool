(function (angular, tst) {
    'use strict';

    // Logout directive
    angular.module(tst.modules.auth.name).directive(tst.modules.auth.directives.logout, [
        '$timeout', 
        tst.modules.auth.services.authentication,
        function($timeout, authentication) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var evHandler = function(e) {
                        
                        if (scope.loading) {
                            return false;
                        }
                        
                        scope.loading = true;

                        $timeout(function() {
                            authentication.logout(function() {
                                scope.loading = false;
                            });
                        }, 1000);                     
                        
                        return false;
                    };

                    element.on ? element.on('click', evHandler) : element.bind('click', evHandler);
                }
            };
    }]);
}(angular, tst));
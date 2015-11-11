(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.ui.navbar.name)
        .controller(tst.modules.ui.navbar.controller, [
        '$scope',
        '$location',
        tst.modules.core.services.notifier,
        tst.modules.auth.services.authentication,
        function ($scope, $location, notifier, authentication) {
            
        }
    ]);
}(angular, tst));
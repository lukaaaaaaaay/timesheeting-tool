(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.ui.navbar.name)
        .directive(tst.modules.ui.navbar.directive, function() {
            var controller = [
                '$scope',
                '$location',
                tst.modules.core.services.notifier,
                tst.modules.auth.services.authentication,
                function ($scope, $location, notifier, authentication) {
                    $scope.user = authentication.getCurrentLoginUser();
                }
            ];

            return {
                restrict: 'E',
                controller: controller,
                templateUrl: tst.modules.ui.navbar.view
            };

            
        });
}(angular, tst));

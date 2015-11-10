(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name)
        .controller(tst.modules.dashboard.controllers.home, [
        '$scope',
        tst.modules.core.services.eventbus,
        function ($scope, eventbus) {
            $scope.user = {
                firstName: "Anonymous"
            };

            eventbus.subscribe('auth:user:loggedin', function (event, data) {
                $scope.user = data; // override the anonymous user
            });

        }
    ]);
}(angular, tst));
(function (angular, tst) {
    'use strict';

    /*
     * Defines routes handled by the auth module
     */
    angular.module(tst.modules.auth.name).config([
        '$stateProvider',
        function ($stateProvider) {
            // State: Login
            $stateProvider.state(tst.modules.auth.states.login, {
                url: tst.modules.auth.routes.login,
                controller: tst.modules.auth.controllers.login,
                templateUrl: tst.modules.auth.views.login,
                data: {
                    bodyClass: tst.modules.auth.bodyClass.login
                }
            });

            // State: NotAuthorised
            $stateProvider.state(tst.modules.auth.states.notAuthorised, {
                url: tst.modules.auth.routes.notAuthorised,
                controller: tst.modules.auth.controllers.login,
                templateUrl: tst.modules.auth.views.notAuthorised,
                data: {
                    bodyClass: tst.modules.auth.bodyClass.notAuthorised
                }
            });

        }]);


}(angular, tst));

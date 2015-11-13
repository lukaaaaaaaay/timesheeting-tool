(function (angular, tst) {
    'use strict';

/*
 * Kick Starts the auth module
 */
angular.module(tst.modules.auth.name).run([
    '$rootScope',
    '$location',
    tst.modules.auth.services.authorization,
    function ($rootScope, $location, authorization) {
        var routeChangeRequiredAfterLogin = false,
            loginRedirectUrl;

        /**
         * Whenever the state changes, check if the state requires authorization.
         */
        $rootScope.$on('$stateChangeStart', function (event, next, nextParams, from, fromParams) {
            var authorised;

            // If the state requires login, redirect to login route
            if (routeChangeRequiredAfterLogin && from.url !== tst.modules.auth.routes.login) {
                routeChangeRequiredAfterLogin = false;
                $location.path(loginRedirectUrl).replace();
            // Otherwise, Check if state has access config obj...
            } else if (next.access !== undefined) {
                // Ask the authorization service if we're authorised
                authorised = authorization.authorize(next.access.loginRequired,
                                                     next.access.roles,
                                                     next.access.roleCheckType);
                // If authorization requires login, stop everything and redirect to login route
                if (authorised === tst.modules.auth.enums.authorised.loginRequired) {
                    routeChangeRequiredAfterLogin = true;
                    loginRedirectUrl = from.url;
                    $location.path(tst.modules.auth.routes.login);
                    // Otherwise; if not Authorised, stop everything and redirect to 404 route
                } else if (authorised === tst.modules.auth.enums.authorised.notAuthorised) {
                    $location.path(tst.modules.auth.routes.notAuthorised).replace();
                }
            }
            // Otherwise, Just continue to the finish line... The user is allowed!!!
        });

    }]);
}(angular, tst));
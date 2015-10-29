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

        // Whenever the route changes, check if the route requires authorization.
        $rootScope.$on('$routeChangeStart', function (event, next) {
            var authorised;
            if (routeChangeRequiredAfterLogin && next.originalPath !== tst.modules.auth.routes.login) {
                routeChangeRequiredAfterLogin = false;
                $location.path(loginRedirectUrl).replace();
            } else if (next.access !== undefined) {
                authorised = authorization.authorize(next.access.loginRequired,
                                                     next.access.roles,
                                                     next.access.roleCheckType);

                if (authorised === tst.modules.auth.enums.authorised.loginRequired) {
                    routeChangeRequiredAfterLogin = true;
                    loginRedirectUrl = next.originalPath;
                    $location.path(tst.modules.auth.routes.login);
                } else if (authorised === tst.modules.auth.enums.authorised.notAuthorised) {
                    $location.path(tst.modules.auth.routes.notAuthorised).replace();
                }
            }
        });

    }]);
}(angular, tst));
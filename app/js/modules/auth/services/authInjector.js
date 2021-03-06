(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.auth.name).factory(tst.modules.auth.services.authInterceptor,
        [
            '$q',
            tst.modules.auth.services.authentication,
            function ($q, authentication) {

                var authInterceptor = {

                    /**
                    * Request Interceptor
                    *
                    * Adds an authorization header, if and only if there
                    * is one found in the local storage
                    */
                    request: function(config) {
                            var auth = authentication.getCredentials();

                            if (auth) {
                                config.headers.authorization = auth;
                            }

                        return config;
                    },

                    /**
                    * Error Interceptor
                    *
                    * Used to trap an authentication error
                    */
                    responseError: function(rejection) {
                        // there is a failure to authentication
                        // so inform the authenticaton service
                        if (rejection.status === 401) {
                            authentication.handleAuthFailure();
                        }

                        return $q.reject(rejection);
                    }
                };

                return authInterceptor;
            }
        ]);


    // add the interceptor to the http service
    angular.module(tst.modules.auth.name).config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }]);

}(angular, tst));

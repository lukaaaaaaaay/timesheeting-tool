(function (angular, tst) {
    'use strict';

    tst.modules.auth = {
        name: 'auth',
        enums: {
            authorised: {
                authorised: 0,
                loginRequired: 1,
                notAuthorised: 2
            },
            roleCheckType: {
                atLeastOne: 0,
                combinationRequired: 1
            }
        },
        events: {
          userLoggedIn: 'auth:user:loggedIn',
          userLoggedOut: 'auth:user:loggedOut'
        },
        controllers: {
            login: 'loginCtrl',
            register: 'registerCtrl'
        },
        services: {
            authentication: 'authentication',
            authorization: 'authorization'
        },
        routes: {
            login: '/login',
            register: '/register',
            notAuthorised: '/not-authorised'
        }
    };

    angular.module(tst.modules.auth.name, [
        'ngRoute',
        tst.modules.core.name
    ]);


}(angular, tst));
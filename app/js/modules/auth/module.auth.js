(function (angular, tst) {
    'use strict';

    /** 
     * This is our auth module config object. 
     * Define constants relevant to TST authentication and authorization.
     */
    tst.modules.auth = {
        name: 'auth',
        states: {
            login: 'login',
            notAuthorised: 'not-authorised'
        }, 
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
          userLoggedOut: 'auth:user:loggedOut',
          userRegistered: 'auth:user:registered',
          failed: 'auth:failed'
        },
        directives: {
            access: 'access',
            logout: 'logout'
        },
        controllers: {
            login: 'loginCtrl'
        },
        views: {
            login: 'js/modules/auth/html/login.tmpl.html',
            notAuthorised: 'js/modules/auth/html/not-authorised.tmpl.html'
        },
        services: {
            authentication: 'authentication',
            authorization: 'authorization',
            authInterceptor: 'authInterceptor'
        },
        routes: {
            login: '/login',
            notAuthorised: '/not-authorised'
        }, 
        bodyClass: {
            login: 'tst-single-form',
            notAuthorised: 'tst-body'
        },
        storage {
            currentUser: 'tst-currentUser',
            authToken: 'tst-authToken',
            lastActivity: 'tst-lastActivity'
        }
    };


    /**
     * This loads our dependancies.
     */
    angular.module(tst.modules.auth.name, [
        'LocalStorageModule',
        'base64',
        tst.modules.core.name
    ]);


}(angular, tst));
(function (angular, tst) {
    'use strict';

    /** 
     * This is our auth module config object. 
     * Define constants relevant to TST authentication and authorization.
     */
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
        directives: {
            access: 'access'
        },
        controllers: {
            login: 'loginCtrl',
            register: 'registerCtrl'
        },
        views: {
            login: 'js/modules/auth/html/login.tmpl.html',
            register: 'js/modules/auth/html/register.tmpl.html',
            notAuthorised: 'js/modules/auth/html/not-authorised.tmpl.html'
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


    /**
     * This loads our auth module and loads dependancies.
     */
    angular.module(tst.modules.auth.name, [
        'ngRoute',
        tst.modules.core.name
    ]);


}(angular, tst));
(function (angular, tst) {
    'use strict';

    /** 
     * This is our account module config object. 
     * Define constants relevant to accounts.
     */
    tst.modules.account = {
        name: 'account',
        services: {
            userModel: 'userModel'
        },
        controllers: {
            manageAccount: 'manageAccountCtrl',
            resetPassword: 'resetPasswordCtrl',
            register: 'registerCtrl'
        },
        views: {            
            manageAccount: 'js/modules/account/html/manageAccount.tmpl.html',
            resetPassword: 'js/modules/account/html/resetPassword.tmpl.html',
            register: 'js/modules/account/html/register.tmpl.html'
        },
        routes: {
            manageAccount: '/account/manage',
            resetPassword: '/account/reset-password',
            register: '/register'
        }
    };
    /**
     * This loads our core module and dependancies.
     */
    angular.module(tst.modules.account.name, []);

}(angular, tst));

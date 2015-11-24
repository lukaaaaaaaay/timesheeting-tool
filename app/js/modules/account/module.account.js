(function (angular, tst) {
    'use strict';

    /** 
     * This is our account module config object. 
     * Define constants relevant to accounts.
     */
    tst.modules.account = {
        name: 'account',
        states: {
            account: 'dashboard.account',
            manageAccount: 'dashboard.account.manage-account',
            resetPassword: 'dashboard.account.reset-password',
            activation: 'activation',
            register: 'register'
        }, 
        services: {
            api: 'api'
        },
        controllers: {
            manageAccount: 'manageAccountCtrl',
            resetPassword: 'resetPasswordCtrl',
            activation: 'activationCtrl',
            register: 'registerCtrl'
        },
        views: {            
            manageAccount: 'js/modules/account/html/manageAccount.tmpl.html',
            resetPassword: 'js/modules/account/html/resetPassword.tmpl.html',
            activation: 'js/modules/account/html/activateAccount.tmpl.html',
            register: 'js/modules/account/html/register.tmpl.html'
        },
        routes: {
            manageAccount: '/account/manage',
            resetPassword: '/account/reset-password',
            activation: '/activate',
            register: '/register'
        }, 
        bodyClass: {
            manageAccount: 'tst-body accounts',
            resetPassword: 'tst-body accounts',
            activation: 'tst-single-form',
            register: 'tst-single-form'
        }
    };
    /**
     * This loads our core module and dependancies.
     */
    angular.module(tst.modules.account.name, [
        tst.modules.core.name,
        tst.modules.auth.name
    ]);

}(angular, tst));

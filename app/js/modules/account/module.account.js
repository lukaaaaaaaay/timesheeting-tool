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
            manageAccount: 'dashboard.manage-account',
            resetPassword: 'dashboard.reset-password',
            register: 'register'
        }, 
        services: {
            api: 'api'
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
        }, 
        bodyClass: {
            manageAccount: 'tst-body accounts',
            resetPassword: 'tst-body accounts',
            register: 'tst-single-form'
        },
        sidebarMenu: {
            // manageAccount: {
            //     selected: 2,
            //     showDropdown: true,
            //     activeSubmenu: 1,
            //     collapsed: false
            // },
            // resetPassword: {
            //     selected: 2,
            //     showDropdown: true,
            //     activeSubmenu: 1,
            //     collapsed: false
            // },
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

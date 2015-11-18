(function (angular, tst) {
    'use strict';

    tst.modules.main = {
        name: 'main',
        states: {
            main: 'main',
            home: 'home@main', 
            about: 'about@main',
            faqs: 'faqs@main',
            contact: 'contact@main'
        },
        // controllers: {
        // },
        views: {
            main: 'js/modules/main/html/main.html',
            home: 'js/modules/main/html/home.tmpl.html',
            about: 'js/modules/main/html/about.tmpl.html',
            faqs: 'js/modules/main/html/faq.tmpl.html',
            contact: 'js/modules/main/html/contact.tmpl.html'
        },
        bodyClass: {
            main: 'tst-main-body',
            home: 'tst-main-body', 
            about: 'tst-main-body',
            faqs: 'tst-main-body',
            contact: 'tst-main-body'
        },
        // sidebarMenu: {
        //     edit: {
        //         selected: 5,
        //         showDropdown: true,
        //         activeSubmenu: 4,
        //         collapsed: false
        //     },
        //     view: {
        //         selected: 5,
        //         showDropdown: true,
        //         activeSubmenu: 4,
        //         collapsed: false
        //     },
        //     create: {
        //         selected: 5,
        //         showDropdown: true,
        //         activeSubmenu: 4,
        //         collapsed: false
        //     },
        //     list: {
        //         selected: 5,
        //         showDropdown: true,
        //         activeSubmenu: 4,
        //         collapsed: false
        //     },
        // }
    };

    angular.module('main', [
        tst.modules.core.name,
    ]);
}(angular, tst));

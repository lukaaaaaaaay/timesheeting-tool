(function (angular, tst) {
    'use strict';

    tst.modules.main = {
        name: 'main',
        states: {
            main: 'main',
            home: 'home', 
            about: 'about',
            faqs: 'faqs',
            contact: 'contact'
        },
        views: {
            main: 'js/modules/main/html/main.html',
            navbar: 'js/modules/main/html/navbar.tmpl.html',
            home: 'js/modules/main/html/home.tmpl.html',
            about: 'js/modules/main/html/about.tmpl.html',
            faqs: 'js/modules/main/html/faq.tmpl.html',
            contact: 'js/modules/main/html/contact.tmpl.html'
        },
        bodyClass: {
            main: 'tst-main-body',
            navbar: 'tst-main-body',
            home: 'tst-main-body', 
            about: 'tst-main-body',
            faqs: 'tst-main-body',
            contact: 'tst-main-body'
        },
    };

    angular.module(tst.modules.main.name, [
        tst.modules.core.name,
    ]);
}(angular, tst));

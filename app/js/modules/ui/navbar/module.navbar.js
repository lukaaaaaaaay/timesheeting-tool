(function (angular, tst) {
    'use strict';

    tst.modules.ui.navbar = {
        name: 'navbar',
        controller:  'navbarCtrl', // not sure if needed
        view:'js/modules/ui/navbar/html/navbar.tmpl.html',
        directive: 'tstNavbar',
    };

    angular.module('navbar', [
        tst.modules.core.name,
        tst.modules.auth.name,
    ]);
}(angular, tst));

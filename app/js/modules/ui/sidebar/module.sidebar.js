(function (angular, tst) {
    'use strict';

    tst.modules.ui.sidebar = {
        name: 'sidebar',
        view: 'js/modules/ui/sidebar/html/sidebar.tmpl.html',
        directive: 'tstSidebar',
    };

    angular.module(tst.modules.ui.sidebar.name, [
        tst.modules.core.name,
        tst.modules.auth.name,
    ]);
}(angular, tst));

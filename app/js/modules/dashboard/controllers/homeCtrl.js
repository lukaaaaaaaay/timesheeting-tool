(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name)
        .controller(tst.modules.dashboard.controllers.home, [
        '$rootScope',
        function ($rootScope) {
            // todo: should we hand over to core module to assign to $rootScope so we don't inject rootscope everywhere?
            // tst.modules.core.services.sidebarMenu.init(tst.modules.dashboard.sidebarMenu);
            $rootScope.sidebarMenu = tst.modules.dashboard.sidebarMenu;
            
        }
    ]);
}(angular, tst));
(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name)
        .controller(tst.modules.dashboard.controllers.home, [
        '$rootScope',
        function ($rootScope) {

            // todo: is this the best place for this????
                // Should we abstract this and run on a 'controllerActive' event?
            // sidebar menu - set in menu tree controllers. 
            $rootScope.selectedMenu = 1;
            $rootScope.showDropdown = false;  
            $rootScope.sidebarMenu = {
                selected: 1,
                showDropdown: false,
                activeSubmenu: 0,
                collapsed: false
            };
            
        }
    ]);
}(angular, tst));
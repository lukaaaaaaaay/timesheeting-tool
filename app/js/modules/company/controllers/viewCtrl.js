(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.company.name)
        .controller(tst.modules.company.controllers.view, [
        '$scope',
        tst.modules.company.services.api,
        function ($scope, companyApi) {
            $scope.company = {};

            function init() {
                // set sidebar menu
                // todo: move this to a core service.     we should probably do something like sidebarMenuService.init(true, 2, 1)
                // $rootScope.sidebarMenu.selected = 2;
                // $rootScope.sidebarMenu.showDropdown = true;
                // $rootScope.sidebarMenu.activeSubmenu = 1;

                // TODO: Get current users company
                $scope.company = companyApi.getCurrentCompany();
            }
            init();
            
        }
    ]);
}(angular, tst));
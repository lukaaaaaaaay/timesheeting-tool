(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.company.name)
        .controller(tst.modules.company.controllers.edit, [
        '$scope',
        tst.modules.core.services.notifier,
        tst.modules.company.services.api,
        function ($scope, notifier, api) {
            $scope.company = {};

            function init() {
                
                // set sidebar menu
                // $rootScope.sidebarMenu.selected = 2;
                // $rootScope.sidebarMenu.showDropdown = true;
                // $rootScope.sidebarMenu.activeSubmenu = 1;

                // get active company
                $scope.company = api.getCurrentCompany();

            }
            init();


            $scope.updateCompany = function(form) {
                if(form.$valid) {
                    api.updateCompany($scope.company, function(company) {
                        notifier.success('Success', 'Company details updated!');
                        reset();
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'Unable to update company details.');
                    });
                }
                else {
                    notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
                }
                
            }

            function reset() {
                $scope.editCompanyForm.$setPristine();
            }
            
        }
    ]);
}(angular, tst));
(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.company.name)
        .controller(tst.modules.company.controllers.edit, [
        '$scope',
        tst.modules.core.services.notifier,
        tst.modules.company.services.api,
        function ($scope, notifier, companyApi) {
            $scope.company = {};

            function init() {
                // get active company
                $scope.company = companyApi.getCurrentCompany();
                console.log($scope.company);
            }
            init();


            $scope.updateCompany = function(form) {
                if(form.$valid) {
                    companyApi.updateCompany($scope.company, function(company) {
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
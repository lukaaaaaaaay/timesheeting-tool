(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.company.name)
        .controller(tst.modules.company.controllers.view, [
        '$scope',
        tst.modules.company.services.api,
        function ($scope, companyApi) {
            $scope.company = {};

            function init() {
                $scope.company = companyApi.getCurrentCompany();
                console.log($scope.company);
            }
            init();
            
        }
    ]);
}(angular, tst));
(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.company.name)
        .controller(tst.modules.company.controllers.create, [
        '$scope',
        '$location',
        tst.modules.core.services.notifier,
        tst.modules.company.services.api,
        function ($scope, $location, notifier, companyApi) {
            $scope.company = {};

            function init() {
                console.log("company create init");
                // todo: Don't set ID here. Let server handle the company owner based on whoever is authenticated during creation.
                // we need to authenticate when we query the server anyways, so use that.
                // $scope.company.directorId = authentication.getCurrentLoginUser();
                // console.log($scope.company.directorId);
            }
            init();

            $scope.createCompany = function(form) {
                if(form.$valid) {
                    companyApi.createCompany($scope.company, function(company) {
                        $location.path(tst.modules.dashboard.routes.home);
                    }, function(error) {

                    });
                } else {
                    notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
                }   
            }
            
        }
    ]);
}(angular, tst));
(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.company.name)
        .controller(tst.modules.company.controllers.create, [
        '$scope',
        '$location',
        tst.modules.auth.services.authentication,
        tst.modules.company.services.api,
        function ($scope, $location, authentication, api) {
            $scope.company = {};

            function init() {
                $scope.company.directorId = authentication.getCurrentLoginUser();
                console.log($scope.company.directorId);
            }
            init();

            $scope.createCompany = function(form) {
                if(form.$valid) {
                    api.createCompany($scope.company, function(company) {
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
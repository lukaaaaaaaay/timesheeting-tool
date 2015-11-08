(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.company.name)
        .controller(tst.modules.company.controllers.create, [
        '$scope',
        '$state',
        tst.modules.core.services.notifier,
        tst.modules.auth.services.authentication,
        tst.modules.company.services.api,
        function ($scope, $state, notifier, authentication, api) {
            $scope.company = {};

            function init() {
                // todo: Don't set ID here. Let server handle the company owner based on whoever is authenticated during creation.
                // we need to authenticate when we query the server anyways, so use that.
                // $scope.company.directorId = authentication.getCurrentLoginUser();
                // console.log($scope.company.directorId);
            }
            init();

            $scope.createCompany = function(form) {
                if(form.$valid) {
                    api.createCompany($scope.company, function(company) {
                        $state.go(tst.modules.dashboard.states.home);
                    }, function(error) {

                    });
                } else {
                    notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
                }   
            }
            
        }
    ]);
}(angular, tst));
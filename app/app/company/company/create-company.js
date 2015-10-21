(function () {
    'use strict';

    angular.module('tsm')
    .controller('CreateCompanyCtrl', function ($scope, $location,$rootScope, tstBodyClass, Company, Companies, notifier, Auth) {
        $scope.company = {};

        // set body class
        $rootScope.bodyClass = tstBodyClass.returned.formsClass;

        function init() {
            $scope.company.directorId = Auth.getCurrentUser();
            console.log($scope.company.directorId);
        }

        init();

        $scope.createCompany = function(form) {
            if(form.$valid) {
                Companies.create($scope.company, function(company) {
                    $location.path('/dashboard');
                }, function(error) {

                });
            }
            else {
                notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
            }
            
        }
    });
})();

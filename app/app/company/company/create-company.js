(function () {
    'use strict';

    angular.module('tsm')
    .controller('CreateCompanyCtrl', function ($scope, $location,$rootScope, tstBodyClass, Company, Companies, notifier, Auth) {
        $scope.company = {};
       // var allCompanies = [];         // Do we need this?

        // set body class
        $rootScope.bodyClass = tstBodyClass.returned.formsClass;

        function init() {
        //     // Companies.query({}, function(companies) {
        //     //     allCompanies = companies
        //     //     if(allCompanies && allCompanies.length > 0) {
        //     //         $scope.company.id = parseInt(allCompanies[allCompanies.length-1].id) + 1 
        //     //     } 
        //     //     else {
        //     //         $scope.company.id = 1;
        //     //     }
                
        //     }, function(error) {
        //         //notifier.error('Error', error);
        //     });
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

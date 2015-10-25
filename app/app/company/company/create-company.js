(function () {
    'use strict';

    angular.module('tsm')
    .controller('CreateCompanyCtrl', function ($scope, $location,$rootScope, tstBodyClass, Company, Companies, notifier, Auth, User) {
        $scope.company = {};
        var user = {};
        // set body class
        $rootScope.bodyClass = tstBodyClass.returned.formsClass;

        function init() {
            user = Auth.getCurrentUser();
            $scope.company.directorId = user;
            console.log($scope.company.directorId);
        }

        init();

        $scope.createCompany = function(form) {
            if(form.$valid) {

                Companies.create($scope.company, function(company) {
                    user.companyId = company.id;
                    User.update({id: user.id}, user, function (updatedUser) {
                        $location.path('/dashboard');
                    }, function (error) {
                        notifier.info('Warning!', 'Company created but user was not updated');
                        $location.path('/dashboard');
                    })
                    
                }, function(error) {
                    notifier.error('Error!', 'Unable to create company');
                });
            }
            else {
                notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
            }
            
        }
    });
})();

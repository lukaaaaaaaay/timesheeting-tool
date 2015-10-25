'use strict';

angular.module('tsm')
.controller('EditCompanyCtrl', function ($scope, $location,$rootScope, tstBodyClass, Company, Companies, notifier, Auth, ActiveCompany) {
    var userId = Auth.getCurrentUser().id;
    $scope.company = {};
    var empty = {};
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

  	function init() {
        // set sidebar menu
        $rootScope.sidebarMenu.selected = 2;
        $rootScope.sidebarMenu.showDropdown = true;
        $rootScope.sidebarMenu.activeSubmenu = 1;

        // get active company
        ActiveCompany.get({directorId: userId}, function (company) {
                $scope.company = company;
            }, function (error) {
                notifier.error('Error', 'Unable to find company for logged in user. Try logging in again!');
            });
    }    

    init();

    $scope.updateCompany = function(form) {
    	if(form.$valid) {
    		Company.update({id: $scope.company.id}, $scope.company, function(company) {
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
});
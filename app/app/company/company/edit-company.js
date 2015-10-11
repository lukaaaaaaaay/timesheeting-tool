'use strict';

angular.module('tsm')
.controller('EditCompanyCtrl', function ($scope, $location,$rootScope, tstBodyClass, Company, Companies) {
    $scope.company = {};
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

  	function init() {
    	Company.get({id: 1}, function(company) {
    		if(company) {
    			$scope.company = company
    		}
    		else {
    			var test = {
        			id: 1,
			        companyName: 'Test', 
			        address: '1 Test Street', 
			        suburb: 'Testville',
			        state: 'VIC',
			        country: 'Australia',
			        postcode: '1234'
			    }

    			Companys.create(test, function(createdCompany) {
    				$scope.company = createdCompany
    			}, function(error) {
    				alert(error);
    			})
    		}
    	}, function(error) {
    		var test = {
        			id: 1,
			        companyName: 'Test', 
			        address: '1 Test Street', 
			        suburb: 'Testville',
			        state: 'VIC',
			        country: 'Australia',
			        postcode: '1234'
			    }

    			Companies.create(test, function(createdCompany) {
    				$scope.company = createdCompany;
    			}, function(error) {
    				alert(error);
    			})
    	});
    }

    init();

    $scope.updateCompany = function(form) {
    	if(form.$valid) {
    		Company.update({id: $scope.company.id}, $scope.company, function(company) {

    		}, function(error) {
    		});
    	}
    	else {
    		// show error message
    	}
    	
    }
});
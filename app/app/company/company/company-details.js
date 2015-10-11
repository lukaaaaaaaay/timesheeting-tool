'use strict';

angular.module('tsm').controller('CompanyCtrl', function ($scope, $location, $rootScope, tstBodyClass, Company, Companies) {
    $scope.company = {};
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    // at this stage, purely test data.
    // Should find company associated to logged in user
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
    
});
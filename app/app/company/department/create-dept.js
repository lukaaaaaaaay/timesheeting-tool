(function() {
	'use strict';

	angular.module('tsm')
	.controller('CreateDepartmentCtrl', function ($scope, $location,$rootScope, tstBodyClass, Department, Departments, notifier, Auth, ActiveCompany) {
	    $scope.department = {};
	    var empty = {};
	    var allDepartments = [];
	    var companyId;
	    var userId = Auth.getCurrentUser().id;

	    // set body class
	    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

	    function init() {
	    	
	    	determineDepartmentId();

	    	ActiveCompany.get({directorId: userId}, function (company) {
            	companyId = company.id;
        	}, function (error) {
        		notifier.error('Error', 'Unable to find company for logged in user. Try logging in again!');
        	});
	    }



	    init();

	    $scope.createDepartment = function(form) {
	    	if(form.$valid) {
	    		$scope.department.companyId = companyId;
	    		Departments.create($scope.department, function(department) {
	    			notifier.success('Success', 'New Department created!');
	    			reset();
	    		}, function(error) {
	    			console.log(error);
	    			notifier.error('Error', 'Unable to create company');
	    		});
	    	}
	    	else {
	    		notifier.error('Error', 'There are validation errors in the form. Please fix before submitting.');
	    	}
	    };

	    function reset() {
	    	$scope.department = angular.copy(empty);
	    	determineDepartmentId();
	    	$scope.createDeptForm.$setPristine();
	    }

	    function determineDepartmentId() {
	    	Departments.query({}, function(departments) {
	    		allDepartments = departments
	    		if(allDepartments && allDepartments.length > 0) {
	    			$scope.department.id = parseInt(allDepartments[allDepartments.length-1].id) + 1	
	    		} 
	    		else {
	    			$scope.department.id = 1;
	    		}
	    		
	    	}, function(error) {
	    		console.log(error);
	    		notifier.error('Error', 'There was an unexpected error!');
	    	});
	    }
	});
})();
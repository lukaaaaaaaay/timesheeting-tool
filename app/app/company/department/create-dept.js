'use strict';

angular.module('tsm')
.controller('CreateDepartmentCtrl', function ($scope, $location,$rootScope, tstBodyClass, Department, Departments, notifier) {
    $scope.department = {};
    var empty = {};
    var allDepartments = [];

    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    function init() {
    	Departments.query({}, function(departments) {
    		allDepartments = departments
    		if(allDepartments && allDepartments.length > 0) {
    			$scope.department.id = allDepartments[allDepartments.length-1].id + 1	
    		} 
    		else {
    			$scope.department.id = 1;
    		}
    		
    	})
    }

    init();

    $scope.createDepartment = function(form) {
    	if(form.$valid) {
    		// replace with current company.
    		$scope.department.companyId = 1; 
    		Departments.create($scope.department, function(department) {
    			notifier.success('Success', 'New Department created!');
    			reset();
    		}, function(error) {
    			notifier.error('Error', error);
    		});
    	}
    	else {
    		notifier.error('Error', 'There are validation errors in the form. Please fix before submitting.');
    	}
    };

    function reset() {
    	$scope.department = angular.copy(empty);
    	init();
    	$scope.createDeptForm.$setPristine();
    }
});
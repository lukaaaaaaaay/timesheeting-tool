'use strict';

angular.module('tsm')
.controller('CreateDepartmentCtrl', function ($scope, $location,$rootScope, tstBodyClass, Department, Departments) {
    $scope.department = {};
    var allDepartments = [];

    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    function init() {
    	Departments.query({}, function(departments) {
    		allDepartments = departments
    		if(allDepartments) {
    			$scope.departments.id = allDepartments[allDepartments.length-1].id + 1	
    		} 
    		else {
    			$scope.departments.id = 1;
    		}
    		
    	})
    }

    $scope.createDepartment = function(form) {
    	if(form.$valid) {
    		// replace with current company.
    		$scope.department.companyId = 1; 
    		Departments.create($scope.department, function(department) {

    		}, function(error) {

    		});
    	}
    	else {
    		// show error message.
    	}
    }
});
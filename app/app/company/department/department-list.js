'use strict';

angular.module('tsm')
.controller('DepartmentListCtrl', function ($scope, $location,$rootScope, tstBodyClass, Departments, Department) {
    $scope.departments = [];
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

  	function init() {
  		// replace with company id of logged in user.
  		Departments.getByCompanyId({id: 1}, function(departments) {
  			$scope.departments = departments;
  			console.log(departments);
  		}, function(error) {
  			// show error
  		})
  	}

  	init();

  	$scope.renameDepartment = function(department) {

  	}

  	$scope.deleteDepartment = function(department) {
  		Department.delete({id: department.id}, function(success){

  		},function(error) {
  			// show error
  		});
  	}
});
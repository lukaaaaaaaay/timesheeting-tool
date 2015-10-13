'use strict';

angular.module('tsm')
.controller('DepartmentListCtrl', function ($scope, $location,$rootScope, tstBodyClass, Departments, Department, notifier, ngDialog) {
    $scope.departments = [];
    $scope.filteredDepartments = [];
    $scope.numPerPage = 10;
    $scope.currentPage = 1;
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

  	function init() {
  		// replace with company id of logged in user.
  		Departments.getByCompanyId({id: 1}, function(departments) {
  			$scope.departments = departments;
  			updateList();
  		}, function(error) {
  			notifier.error('Error', error);
  		})
  	}

  	init();

  	$scope.renameDepartment = function(department) {

  	}

  	$scope.deleteDepartment = function(department) {
		ngDialog.openConfirm({
		  template: '/components/dialogs/confirm-delete.html',
		  scope: $scope 
		}).then(
			function(success) {
				Department.delete({id: department.id}, function(success){
  					notifier.success('Success', 'Department deleted');
  					init();
  				},function(error) {
  					notifier.error('Error', error);
  				});
			},
			function(error) {
				//Cancel or do nothing
			}
		);
  	}

  	$scope.numPages = function () {
    	return Math.ceil($scope.departments.length / $scope.numPerPage);
  	};

  	$scope.$watch("currentPage + numPerPage", function() {
    	updateList();
  	});

  	function updateList() {
  		var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    	, end = begin + $scope.numPerPage;

    	$scope.filteredDepartments = $scope.departments.slice(begin, end);
  	}

});
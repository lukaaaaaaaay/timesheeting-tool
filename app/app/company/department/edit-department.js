(function() {
	'use strict';

	angular.module('tsm')
	.controller('EditDepartmentCtrl', function ($scope, $location,$rootScope, tstBodyClass, Department, $stateParams, notifier, Auth, ActiveCompany, ngDialog) {
	    $scope.department = {};
	    var empty = {};
	    var allDepartments = [];
	    var companyId;
	    var userId = Auth.getCurrentUser().id;

	    // set body class
	    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

	    function init() {
	    	// set sidebar menu
	    	$rootScope.sidebarMenu.selected = 2;
	    	$rootScope.sidebarMenu.showDropdown = true;
	    	$rootScope.sidebarMenu.activeSubmenu = 1;

	    	Department.get({id: $stateParams.id}, function (department) {
	    		$scope.department = department;
	    	}, function (error) {
	    		console.log(error);
	    		notifier.error('Error', 'Unable to find company with the id ' + $stateParams.id);
	    	});
	    }

	    $scope.updateDepartment = function(form) {
	    	if(form.$valid) {
	    		
	    		Department.update({id: $scope.department.id}, $scope.department, function(department) {
	    			notifier.success('Success', 'Department ' + $scope.department.name + ' updated!');
	    		}, function(error) {
	    			console.log(error);
	    			notifier.error('Error', 'Unable to update department ' + $scope.department.name);
	    		});
	    	}
	    	else {
	    		notifier.error('Error', 'There are validation errors in the form. Please fix before submitting.');
	    	}
	    };

	    $scope.deleteDepartment = function() {
		    // show confirm dialog to ensure user really wants to delete something.
	  		ngDialog.openConfirm({
	  		  template: '/components/dialogs/confirm-delete.html',
	  		  scope: $scope 
	  		}).then(
	  			function(success) {
	  				Department.delete({id: $scope.department.id}, function(success){
	    					notifier.success('Success', 'Department deleted');
	    					$location.path('/dashboard/departments');
	    				},function(error) {
	              console.log(error)
	    					notifier.error('Error', 'Unable to delete department');
	    				});
	  			},
	  			function(error) {
	  				
	  			}
	  		);
		};

	    init();
	});
})();
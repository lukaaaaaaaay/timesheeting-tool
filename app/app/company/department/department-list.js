'use strict';

angular.module('tsm')
.controller('DepartmentListCtrl', function ($scope, $location,$rootScope, tstBodyClass, Departments, Department, notifier, ngDialog, ActiveCompany, Auth ) {
    var userId = Auth.getCurrentUser().id;
    $scope.departments = [];
    $scope.filteredDepartments = [];
    $scope.numPerPage = 10;
    $scope.currentPage = 1;
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

  	function init() {
  		ActiveCompany.get({directorId: userId}, function (company) {
          Departments.getByCompanyId({id: company.id}, function(departments) {
            $scope.departments = departments;
            updateList();
            }, function(error) {
              console.log(error);
              notifier.error('Error', 'Unable to find departments for ' + company.companyName);
          });
      }, function (error) {
          notifier.error('Error', 'Unable to find company for logged in user. Try logging in again!');
      });

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
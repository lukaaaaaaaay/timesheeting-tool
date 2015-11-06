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
      // set sidebar menu
      $rootScope.sidebarMenu.selected = 2;
      $rootScope.sidebarMenu.showDropdown = true;
      $rootScope.sidebarMenu.activeSubmenu = 1;

      // get active company and departments for it.
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
    
  	$scope.deleteDepartment = function(department) {
      // show confirm dialog to ensure user really wants to delete something.
  		ngDialog.openConfirm({
  		  template: '/components/dialogs/confirm-delete.html',
  		  scope: $scope 
  		}).then(
  			function(success) {
  				Department.delete({id: department.id}, function(success){
    					notifier.success('Success', 'Department deleted');
    					init();
    				},function(error) {
              console.log(error)
    					notifier.error('Error', 'Unable to delete department');
    				});
  			},
  			function(error) {
  				
  			}
  		);
  	};

  	$scope.$watch("currentPage + numPerPage", function() {
    	updateList();
  	});

    // refreshs list on page either because of page change or deletion.
  	function updateList() {
  		var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    	, end = begin + $scope.numPerPage;

    	$scope.filteredDepartments = $scope.departments.slice(begin, end);
  	}

    $scope.formatDate = function (date) {
        return moment(date).format('D/MM/YYYY');
    };

    init();
});
'use strict';

angular.module('tsm').controller('DepartmentCtrl', function ($scope, $location, $rootScope, tstBodyClass, $stateParams, Department) {
    
    $scope.department = {};
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    function init() {
        // set sidebar menu
        $rootScope.sidebarMenu.selected = 2;
        $rootScope.sidebarMenu.showDropdown = true;
        $rootScope.sidebarMenu.activeSubmenu = 1;

        // get active company
        Department.get({id: $stateParams.id}, function (department) {
            $scope.department = department;
        }, function (error) {
            notifier.error('Error', 'Unable to find the department');
        });
    }    

    init();
});
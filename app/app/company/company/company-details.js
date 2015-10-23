'use strict';

angular.module('tsm').controller('CompanyCtrl', function ($scope, $location, $rootScope, tstBodyClass, ActiveCompany, Auth) {
    var userId = Auth.getCurrentUser().id;
    $scope.company = {};
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    function init() {
        // set sidebar menu
        $rootScope.sidebarMenu.selected = 2;
        $rootScope.sidebarMenu.showDropdown = true;
        $rootScope.sidebarMenu.activeSubmenu = 1;

        // get active company
        ActiveCompany.get({directorId: userId}, function (company) {
            $scope.company = company;
        }, function (error) {
            notifier.error('Error', 'Unable to find company for logged in user. Try logging in again!');
        });
    }    

    init();
});
'use strict';

angular.module('tsm').controller('ProjectListCtrl', function ($scope, $location, $rootScope, tstBodyClass, ActiveCompany, Auth, Projects) {
    var userId = Auth.getCurrentUser().id;
    $scope.project = {};
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    function init() {
        // set sidebar menu
        $rootScope.sidebarMenu.selected = 3;
        $rootScope.sidebarMenu.showDropdown = true;
        $rootScope.sidebarMenu.activeSubmenu = 2;

        // get active company
        ActiveCompany.get({directorId: userId}, function (returnedCompany) {
            var company = returnedCompany;
        }, function (error) {
            notifier.error('Error', 'Unable to find company for logged in user. Try logging in again!');
        });
    }    

    init();
});
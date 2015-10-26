'use strict';

angular.module('tsm').controller('ViewProjectCtrl', function ($scope, $location, $rootScope, tstBodyClass, Auth, Project, Status, $stateParams, notifier) {
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
        // ActiveCompany.get({directorId: userId}, function (returnedCompany) {
        //     var company = returnedCompany;
        // }, function (error) {
        //     notifier.error('Error', 'Unable to find company for logged in user. Try logging in again!');
        // });

        Project.get({id: $stateParams.id}, function (project) {
            $scope.project = project;
        }, function (error) {
            console.log(error);
            notifier.error('Error!', error.data);
        });
    }    

    init();
});
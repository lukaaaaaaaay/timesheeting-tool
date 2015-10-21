'use strict';

angular.module('tsm').controller('CompanyCtrl', function ($scope, $location, $rootScope, tstBodyClass, ActiveCompany, Auth) {
    var userId = Auth.getCurrentUser().id;
    $scope.company = {};
    // set body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    function init() {
        // set sidebar menu
        $rootScope.selectedMenu = 2;
        $rootScope.showDropdown = true;

        // get active company
        ActiveCompany.get({directorId: userId}, function (company) {
            $scope.company = company;
        }, function (error) {
            notifier.error('Error', 'Unable to find company for logged in user. Try logging in again!');
        });
    }    

    init();
});
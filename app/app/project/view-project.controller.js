(function () {
    'use strict';

    angular.module('tsm').controller('ViewProjectCtrl', function ($scope, $location, $rootScope, tstBodyClass, Auth, Project, Status, $stateParams, notifier) {
        var userId = Auth.getCurrentUser().id;
        $scope.project = {};
        $scope.statuses = [];
        // set body class
        $rootScope.bodyClass = tstBodyClass.returned.dashboard;

        function init() {
            // set sidebar menu
            $rootScope.sidebarMenu.selected = 3;
            $rootScope.sidebarMenu.showDropdown = true;
            $rootScope.sidebarMenu.activeSubmenu = 2;

            Project.get({id: $stateParams.id}, function (project) {
                $scope.project = project;
            }, function (error) {
                console.log(error);
                notifier.error('Error!', error.data);
            });

            Status.query({}, function (statuses) {
                $scope.statuses = statuses;
            }, function (error) {
                console.log(error);
                notifier.error('Error', 'Unable to retrieve system statuses');
            });
        }    

        init();

        $scope.statusAsText = function (statusId) {
            var status = _.find($scope.statuses, {id: statusId})
            if(status)
                return status.name;

            return '';
        };
    });
})();

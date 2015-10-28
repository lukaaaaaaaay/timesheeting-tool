(function () {
    'use strict';

    angular.module('tsm').controller('ProjectListCtrl', function ($scope, $location, $rootScope, tstBodyClass, ngDialog, Auth, Projects, Project, Status, notifier) {
        var user = Auth.getCurrentUser();
        var company = {};
        $scope.projects = [];
        $scope.statuses = [];
        $scope.filteredProjects = [];
        $scope.numPerPage = 2;
        $scope.currentPage = 1;
        // set body class
        $rootScope.bodyClass = tstBodyClass.returned.dashboard;

        function init() {
            // set sidebar menu
            $rootScope.sidebarMenu.selected = 3;
            $rootScope.sidebarMenu.showDropdown = true;
            $rootScope.sidebarMenu.activeSubmenu = 2;

            Projects.findAllForCompany({id: user.companyId}, function (projects) {
                $scope.projects = projects;
                console.log($scope.projects);
                updateList();
            }, function (error) {
                console.log(error);
                notifier.error('Error', 'Unable to find projects for the company ' + company.companyName);
            })

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

        $scope.numPages = function () {
            return Math.ceil($scope.projects.length / $scope.numPerPage);
        };

        $scope.$watch("currentPage + numPerPage", function() {
            updateList();
        });

        // refreshs list on page either because of page change or deletion.
        function updateList() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

            $scope.filteredProjects = $scope.projects.slice(begin, end);
        }

        $scope.deleteProject = function(project) {
          // show confirm dialog to ensure user really wants to delete something.
            ngDialog.openConfirm({
              template: '/components/dialogs/confirm-delete.html',
              scope: $scope 
            }).then(
                function(success) {
                    Project.delete({id: project.id}, function(success){
                            notifier.success('Success', 'Project deleted');
                            init();
                        },function(error) {
                            console.log(error)
                            notifier.error('Error', 'Unable to delete project');
                        });
                },
                function(error) {
                    // do nothing
                }
            );
        };

        $scope.formatDate = function (date) {
            return moment(date).format('D/MM/YYYY');
        }
    });
})(); 



    
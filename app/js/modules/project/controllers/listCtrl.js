(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.project.name)
        .controller(tst.modules.project.controllers.list, [
        '$scope',
        '$location',
        'ngDialog',
        tst.modules.core.services.notifier,
        tst.modules.project.services.api,
        tst.modules.company.services.api,
        tst.modules.auth.services.authentication,
        function ($scope, $location, ngDialog, notifier, projectApi, companyApi, authentication) {
            $scope.projects = [];
            $scope.filteredProjects = [];
            $scope.numPerPage = 10;
            $scope.currentPage = 1;
            var statuses = [];

            $scope.deleteProject = function(project) {
                // show confirm dialog to ensure user really wants to delete something.
                ngDialog.openConfirm({
                  template: tst.modules.project.views.dialog,
                  scope: $scope 
                }).then(
                    function(success) {
                        projectApi.deleteProject(project.id, function(success){
                                notifier.success('Success', 'Project deleted');
                                $scope.projects = _.reject($scope.projects, {id: project.id});
                                updateList();
                            },function(error) {
                                console.log(error)
                                notifier.error('Error', 'Unable to delete project');
                            });
                    },
                    function(error) {
                        
                    }
                );
            };

            $scope.$watch("currentPage + numPerPage", function() {
                updateList();
            });

            // refreshes list on page either because of page change or deletion.
            function updateList() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

                $scope.filteredProjects = $scope.projects.slice(begin, end);
            }

            $scope.formatDate = function (date) {
                if(date)
                    return moment(date).format('D/MM/YYYY');

                return '-';
            };

            $scope.statusAsText = function (statusId) {
                var status = _.find(statuses, {id: statusId})
                if(status)
                    return status.name;

                return '';
            };

            function init() {
                var user = authentication.getCurrentLoginUser();
                // get active company
                var companyId = companyApi.getCurrentCompany();


                if(user.roleId == 1) {
                    projectApi.getAllProjects(function (projects) {
                        $scope.projects = projects;
                        updateList();
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'There was an error retrieving all the projects');
                    });
                }
                else if(user.roleId == 2) {
                    projectApi.getAllProjectsForCompany(companyId, function (projects) {
                        $scope.projects = projects;
                        updateList();
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'There was an error retrieving all the projects');
                    });
                } else {
                    projectApi.getAllProjectsForUser(user.id, function (projects) {
                        $scope.projects = projects;
                        updateList();
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'There was an error retrieving all the projects');
                    });
                }
                
                projectApi.getAllStatuses(function(allStatuses) {
                    statuses = allStatuses;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving all the statuses');
                });
            }

            init();

        }
    ]);
}(angular, tst));
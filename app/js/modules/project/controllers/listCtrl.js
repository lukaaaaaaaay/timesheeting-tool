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
        function ($scope, $location, ngDialog, notifier, projectApi, companyApi) {
            $scope.projects = [];
            $scope.filteredProjects = [];
            $scope.numPerPage = 10;
            $scope.currentPage = 1;

            $scope.deleteProject = function(id) {
                // show confirm dialog to ensure user really wants to delete something.
                ngDialog.openConfirm({
                  template: tst.modules.project.views.dialog,
                  scope: $scope 
                }).then(
                    function(success) {
                        projectApi.deleteProject(id, function(success){
                                notifier.success('Success', 'Project deleted');
                                $location.path(tst.modules.project.routes.list);
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

            // refreshs list on page either because of page change or deletion.
            function updateList() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

                $scope.filteredProjects = $scope.projects.slice(begin, end);
            }

            $scope.formatDate = function (date) {
                return moment(date).format('D/MM/YYYY');
            };

            function reset() {
                $scope.editProjectForm.$setPristine();
            }

            function init() {
                // get active company
                var companyId = companyApi.getCurrentCompany();
                projectApi.getAllProjects(companyId, function (projects) {
                    $scope.projects = projects;
                    updateList();
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving all the projects');
                });
            }

            init();

        }
    ]);
}(angular, tst));
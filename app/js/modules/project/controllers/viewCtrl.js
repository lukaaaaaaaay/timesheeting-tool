(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.project.name)
        .controller(tst.modules.project.controllers.view, [
        '$scope',
        '$location',
        '$stateParams',
        'ngDialog',
        tst.modules.core.services.notifier,
        tst.modules.project.services.api,
        function ($scope, $location, $stateParams, ngDialog, notifier, projectApi) {
            $scope.project = {};
            var statuses = [];

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

            $scope.statusAsText = function (statusId) {
                var status = _.find(statuses, {id: statusId})
                if(status)
                    return status.name;

                return '';
            };

            $scope.formatDate = function (date) {
                return moment(date).format('D/MM/YYYY');
            };

            function init() {
                projectApi.getCurrentProject($stateParams.id, function (project) {
                    $scope.project = project;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving the project with the id ' + $stateParams.id);
                });

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
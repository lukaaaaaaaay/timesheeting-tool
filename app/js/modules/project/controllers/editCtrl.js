(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.project.name)
        .controller(tst.modules.project.controllers.edit, [
        '$scope',
        '$location',
        'ngDialog',
        '$stateParams',
        tst.modules.core.services.notifier,
        tst.modules.project.services.api,
        function ($scope, $location, ngDialog, $stateParams, notifier, api) {
            $scope.project = {};

            $scope.updateProject = function(form) {
                if(form.$valid) {
                    api.updateProject($scope.project, function(project) {
                        notifier.success('Success', 'Department details updated!');
                        reset();
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'Unable to update project details.');
                    });
                }
                else {
                    notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
                }
            }

            $scope.deleteProject = function() {
                // show confirm dialog to ensure user really wants to delete something.
                ngDialog.openConfirm({
                  template: tst.modules.project.views.dialog,
                  scope: $scope 
                }).then(
                    function(success) {
                        api.deleteProject($scope.project.id, function(success){
                                notifier.success('Success', 'Department deleted');
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

            function reset() {
                $scope.editProjectForm.$setPristine();
            }

            function init() {
                // get active project
                api.getCurrentProject($stateParams.id, function (project) {
                    $scope.project = project;
                }, function (error) {
                    notifier.error('Error', 'There was an error retrieving the project with the id ' + $stateParams.id);
                });

            }
            init();
            
        }
    ]);
}(angular, tst));
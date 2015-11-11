(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.project.name)
        .controller(tst.modules.project.controllers.view, [
        '$scope',
        '$location',
        '$stateParams',
        'ngDialog',
        tst.modules.project.services.notifier,
        tst.modules.department.services.api,
        function ($scope, $location, $stateParams, ngDialog, notifier, api) {
            $scope.project = {};

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

            function init() {
                api.getCurrentProject($stateParams.id, function (project) {
                    $scope.project = project;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving the project with the id ' + $stateParams.id);
                });
            }

            init();
            
        }
    ]);
}(angular, tst));
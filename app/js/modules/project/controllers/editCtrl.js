(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.project.name)
        .controller(tst.modules.project.controllers.edit, [
        '$scope',
        '$location',
        'ngDialog',
        '$stateParams',
        tst.modules.core.services.notifier,
        tst.modules.auth.services.authentication,
        tst.modules.project.services.api,
        function ($scope, $location, ngDialog, $stateParams, notifier, authentication, projectApi) {
            $scope.project = {};
            $scope.managers = [];
            $scope.statuses = [];
            $scope.submitted = false;

            function init() {
                var companyId = authentication.getCurrentLoginUser().companyId;
                // get active project
                projectApi.getCurrentProject($stateParams.id, function (project) {
                    setProject(project);
                }, function (error) {
                    notifier.error('Error', 'There was an error retrieving the project with the id ' + $stateParams.id);
                });

                projectApi.getAllUsersForCompany(companyId, function (users) {
                    $scope.managers = users;
                }, function (error) {
                    notifier.error('Error', 'Unable to find users for company ' + user.companyId);    
                });

                projectApi.getAllStatuses(function(allStatuses) {
                    $scope.statuses = allStatuses;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving all the statuses');
                });

            }

            $scope.updateProject = function(form) {
                $scope.submitted = true;
                if(form.$valid) {
                    projectApi.updateProject($scope.project, function(project) {
                        notifier.success('Success', 'Project details updated!');
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
                        projectApi.deleteProject($scope.project.id, function(success){
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

            $scope.validateDate = function(form, start, end) {
                if(end) {
                    if(end <= start) {
                        form.dueDate.$setValidity('invalidDate', false);
                        form.startDate.$setValidity('invalidDate', false);
                    }
                    else {
                        form.dueDate.$setValidity('invalidDate', true);
                        form.startDate.$setValidity('invalidDate', true);
                    }
                }

            };

            function reset() {
                $scope.editProjectForm.$setPristine();
            }

            function setProject (project) {
                $scope.project = project;
                $scope.project.startDate = new Date($scope.project.startDate.toString());
                if($scope.project.dueDate)
                    $scope.project.dueDate = new Date($scope.project.dueDate.toString());
            }

            
            init();
            
        }
    ]);
}(angular, tst));
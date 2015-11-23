(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.tasks.name)
        .controller(tst.modules.tasks.controllers.edit, [
        '$scope',
        '$location',
        'ngDialog',
        '$stateParams',
        tst.modules.core.services.notifier,
        tst.modules.auth.services.authentication,
        tst.modules.project.services.api,
        tst.modules.tasks.services.api,
        function ($scope, $location, ngDialog, $stateParams, notifier, authentication, projectApi, taskApi) {
            $scope.task = {};
            $scope.submitted = false;

            function init() {
                var companyId = authentication.getCurrentLoginUser().companyId;

                // get active task
                taskApi.getTask($stateParams.id, function (task) {
                    setTask(task);
                }, function (error) {
                    notifier.error('Error', 'There was an error retrieving the project with the id ' + $stateParams.id);
                });

                
                    taskApi.getAllStatuses(function(allStatuses) {
                        $scope.statuses = allStatuses;
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'There was an error retrieving all the statuses');
                    });

                    projectApi.getAllProjects(companyId, function(projects) {
                        console.log(projects);
                        $scope.allProjects = projects;
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'Unable to retrieve all projects for the company ' + companyId);
                    });

                }

            $scope.updateTask = function(form) {
                $scope.submitted = true;
                if(form.$valid) {
                    taskApi.updateTask($scope.task, function(task) {
                        notifier.success('Success', 'task details updated!');
                        reset();
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'Unable to update task details.');
                    });
                }
                else {
                    notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
                }
            }

            $scope.deleteTask = function() {
                // show confirm dialog to ensure user really wants to delete something.
                ngDialog.openConfirm({
                  template: tst.modules.project.views.dialog,
                  scope: $scope 
                }).then(
                    function(success) {
                        taskApi.deleteTask($scope.project.id, function(success){
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
            }

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
            }

            function reset() {
                $scope.editProjectForm.$setPristine();
            }

            function setTask (task) {
                $scope.task = task;
                $scope.task.startDate = new Date($scope.task.startDate.toString());
                $scope.task.dueDate = new Date($scope.task.dueDate.toString());
            }

            
            init();
            
        }
    ]);
}(angular, tst));
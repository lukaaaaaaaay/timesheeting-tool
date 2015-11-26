(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.tasks.name)
        .controller(tst.modules.tasks.controllers.list, [
        '$scope',
        '$location',
        'ngDialog',
        tst.modules.core.services.notifier,
        tst.modules.tasks.services.api,
        tst.modules.project.services.api,
        tst.modules.auth.services.authentication,
        function ($scope, $location, ngDialog, notifier, taskApi, projectApi, authentication) {
            $scope.tasks = [];
            $scope.filteredTasks = [];
            $scope.numPerPage = 10;
            $scope.currentPage = 1;
            var statuses = [];

            $scope.deleteTask = function(task) {
                // todo: show confirm dialog to ensure user really wants to delete something.
                ngDialog.openConfirm({
                  template: tst.modules.task.views.dialog,
                  scope: $scope 
                }).then(
                    function(success) {
                        taskApi.deleteTask(task.id, function(success){
                                notifier.success('Success', 'Task deleted');
                                $scope.tasks = _.reject($scope.tasks, {id: task.id});
                                updateList();
                            },function(error) {
                                console.log(error)
                                notifier.error('Error', 'Unable to delete tasks');
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

                $scope.filteredTasks = $scope.tasks.slice(begin, end);
            }

            $scope.formatDate = function (date) {
                return moment(date).format('D/MM/YYYY');
            };

            $scope.statusAsText = function (statusId) {
                var status = _.find(statuses, {id: statusId})
                if(status)
                    return status.name;

                return '';
            };

            function init() {
                var user = authentication.getCurrentLoginUser();

                if(user.roleId == 1) {
                    taskApi.getAllTasks(function (tasks) {
                        $scope.tasks = tasks;
                        updateList();
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'There was an error retrieving all the tasks');
                    });
                }
                else if(user.roleId == 2) {
                    taskApi.getAllTasksForCompany(user.companyId, function (tasks) {
                        $scope.tasks = tasks;
                        updateList();
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'There was an error retrieving all the tasks');
                    });
                } else {
                    taskApi.getAllTasksForUser(user.id, function (tasks) {
                        $scope.tasks = tasks;
                        updateList();
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'There was an error retrieving all the tasks');
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
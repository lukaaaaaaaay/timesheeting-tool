(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.tasks.name)
        .controller(tst.modules.tasks.controllers.view, [
        '$scope',
        '$location',
        '$stateParams',
        'ngDialog',
        tst.modules.core.services.notifier,
        tst.modules.project.services.api,
        tst.modules.tasks.services.api,
        function ($scope, $location, $stateParams, ngDialog, notifier, projectApi, taskApi) {
            $scope.task = {};
            var statuses = [];

            $scope.deleteTask = function(id) {
                // show confirm dialog to ensure user really wants to delete something.
                ngDialog.openConfirm({
                  template: tst.modules.task.views.dialog,
                  scope: $scope 
                }).then(
                    function(success) {
                        taskApi.deleteTask(id, function(success){
                                notifier.success('Success', 'Task deleted');
                                $location.path(tst.modules.task.routes.list);
                            },function(error) {
                      console.log(error)
                                notifier.error('Error', 'Unable to delete task');
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
                taskApi.getTask($stateParams.id, function (task) {
                    $scope.task = task;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving the task with the id ' + $stateParams.id);
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
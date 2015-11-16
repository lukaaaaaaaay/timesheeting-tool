(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.timesheet.name)
        .controller(tst.modules.timesheet.controllers.edit, [
        '$scope',
        '$location',
        'ngDialog',
        '$stateParams',
        tst.modules.core.services.notifier,
        tst.modules.auth.services.authentication,
        tst.modules.timesheet.services.api,
        function ($scope, $location, ngDialog, $stateParams, notifier, authentication, timesheetApi) {
            $scope.timesheet = {};
            $scope.tasks = [];
            $scope.statuses = [];
            $scope.submitted = false;

            function init() {
                var user = authentication.getCurrentLoginUser();
                // get active timesheet
                timesheetApi.getCurrentTimesheet($stateParams.id, function (timesheet) {
                    setTimesheet(timesheet);
                }, function (error) {
                    notifier.error('Error', 'There was an error retrieving the timesheet with the id ' + $stateParams.id);
                });

                timesheetApi.getAllTasksForUser(user.id, function(tasks) {
                    console.log(tasks);
                    $scope.tasks = tasks;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'Unable to retrieve all tasks for the project ' + user.id);
                });

                timesheetApi.getAllStatuses(function(allStatuses) {
                    $scope.statuses = allStatuses;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving all the statuses');
                });
            }

            $scope.updateTimesheet = function(form) {
                $scope.submitted = true;
                if(form.$valid) {
                    timesheetApi.updateTimesheet($scope.timesheet, function(timesheet) {
                        notifier.success('Success', 'Timesheet details updated!');
                        reset();
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'Unable to update timesheet details.');
                    });
                }
                else {
                    notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
                }
            }

            $scope.deleteTimesheet = function() {
                // show confirm dialog to ensure user really wants to delete something.
                ngDialog.openConfirm({
                  template: tst.modules.timesheet.views.dialog,
                  scope: $scope 
                }).then(
                    function(success) {
                        timesheetApi.deleteTimesheet($scope.timesheet.id, function(success){
                                notifier.success('Success', 'Timesheet deleted');
                                $location.path(tst.modules.timesheet.routes.list);
                            },function(error) {
                      console.log(error)
                                notifier.error('Error', 'Unable to delete timesheet');
                            });
                    },
                    function(error) {
                        
                    }
                );
            };

            $scope.validateTime = function(form, start, end) {
                // if(end) {
                //     if(end <= start) {
                //         form.dueDate.$setValidity('invalidDate', false);
                //         form.startDate.$setValidity('invalidDate', false);
                //     }
                //     else {
                //         form.dueDate.$setValidity('invalidDate', true);
                //         form.startDate.$setValidity('invalidDate', true);
                //     }
                // }

            };

            function reset() {
                $scope.editTimesheetForm.$setPristine();
            }

            function setTimesheet (timesheet) {
                $scope.timesheet = timesheet;
                $scope.timesheet.startTime = new Date($scope.timesheet.startTime.toString());
                $scope.timesheet.endTime = new Date($scope.timesheet.endTime.toString());
            }

            
            init();
            
        }
    ]);
}(angular, tst));
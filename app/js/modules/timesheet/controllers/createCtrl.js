(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.timesheet.name)
        .controller(tst.modules.timesheet.controllers.create, [
        '$scope',
        '$location',
        tst.modules.core.services.notifier,
        tst.modules.auth.services.authentication,
        tst.modules.timesheet.services.api,
        function ($scope, $location, notifier, authentication, timesheetApi) {
            $scope.timesheet = {};
            $scope.tasks = [];
            $scope.submitted = false;

            $scope.createTimesheet = function(form) {
                $scope.submitted = true;
                if(form.$valid) {
                    $scope.timesheet.statusId = 6;
                    timesheetApi.createTimesheet($scope.timesheet, function(timesheet) {
                        notifier.success("success", "New timesheet created");                        
                        $location.path(tst.modules.timesheet.routes.list);
                    }, function(error) {
                        notifier.error('Error', 'Unable to create new timesheet');
                    });
                } else {
                    notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
                }   
            };

            $scope.validateTime = function(form, start, end) {
                // if(end) {
                //     if(end <= start) {
                //         form.endTime.$setValidity('invalidDate', false);
                //         form.startTime.$setValidity('invalidDate', false);
                //     }
                //     else {
                //         form.endTime.$setValidity('invalidDate', true);
                //         form.startTime.$setValidity('invalidDate', true);
                //     }
                // }

            };

            function init() {
                var user = authentication.getCurrentLoginUser();
                
                timesheetApi.getAllTasksForUser(user.id, function(tasks) {
                    console.log(tasks);
                    $scope.tasks = tasks;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'Unable to retrieve all tasks for the project ' + user.id);
                });

                $scope.timesheet.name = user.fullName;
            }

            init();
        }
    ]);
}(angular, tst));
(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.timesheet.name)
        .controller(tst.modules.timesheet.controllers.list, [
        '$scope',
        '$location',
        'ngDialog',
        tst.modules.core.services.notifier,
        tst.modules.timesheet.services.api,
        tst.modules.auth.services.authentication,
        function ($scope, $location, ngDialog, notifier, timesheetApi, authentication) {
            $scope.timesheets = [];
            $scope.filteredTimesheets = [];
            $scope.numPerPage = 10;
            $scope.currentPage = 1;
            var statuses = [];

            $scope.deleteTimesheet = function(timesheet) {
                // show confirm dialog to ensure user really wants to delete something.
                ngDialog.openConfirm({
                  template: tst.modules.timesheet.views.dialog,
                  scope: $scope 
                }).then(
                    function(success) {
                        timesheetApi.deleteTimesheet(timesheet.id, function(success){
                                notifier.success('Success', 'Timesheet deleted');
                                $scope.timesheets = _.reject($scope.timesheets, {id: timesheet.id});
                                updateList();
                            },function(error) {
                                console.log(error)
                                notifier.error('Error', 'Unable to delete timesheet');
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

                $scope.filteredTimesheets = $scope.timesheets.slice(begin, end);
            }

            $scope.formatDate = function (date) {
                return moment(date).format('D/MM/YYYY');
            };

            $scope.taskAsText = function (taskId) {
                return timesheetApi.getTaskName(taskId);
            }

            $scope.statusAsText = function (statusId) {
                var status = _.find(statuses, {id: statusId})
                if(status)
                    return status.name;

                return '';
            };

            function init() {
                // get active user
                var user = authentication.getCurrentLoginUser();

                //TODO: Detect user role and return different set of timesheets depending on the role of user.
                // if(user.roleId == 1) {
                //     timesheetApi.getAllTimesheets(function (timesheets) {
                //         $scope.timesheets = timesheets;
                //         updateList();
                //     }, function(error) {
                //         console.log(error);
                //         notifier.error('Error', 'There was an error retrieving the timesheets');
                //     }); 
                // } else if(user.roleId == 2) {
                //     timesheetApi.getAllTimesheetsForCompany(user.companyId, function (timesheets) {
                //         $scope.timesheets = timesheets;
                //         updateList();
                //     }, function(error) {
                //         console.log(error);
                //         notifier.error('Error', 'There was an error retrieving the timesheets');
                //     }); 
                // } else {
                    timesheetApi.getAllTimesheetsForUser(user.id, function (timesheets) {
                        $scope.timesheets = timesheets;
                        updateList();
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'There was an error retrieving the timesheets');
                    });    
                // }
                

                timesheetApi.getAllStatuses(function(allStatuses) {
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
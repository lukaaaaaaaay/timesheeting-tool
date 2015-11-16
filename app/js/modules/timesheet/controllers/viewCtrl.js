(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.timesheet.name)
        .controller(tst.modules.timesheet.controllers.view, [
        '$scope',
        '$location',
        '$stateParams',
        'ngDialog',
        tst.modules.core.services.notifier,
        tst.modules.timesheet.services.api,
        function ($scope, $location, $stateParams, ngDialog, notifier, timesheetApi) {
            $scope.timesheet = {};
            var statuses = [];

            $scope.deleteTimesheet = function(id) {
                // show confirm dialog to ensure user really wants to delete something.
                ngDialog.openConfirm({
                  template: tst.modules.timesheet.views.dialog,
                  scope: $scope 
                }).then(
                    function(success) {
                        timesheetApi.deleteTimesheet(id, function(success){
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
                timesheetApi.getCurrentTimesheet($stateParams.id, function (timesheet) {
                    $scope.timesheet = timesheet;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving the timesheet with the id ' + $stateParams.id);
                });

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
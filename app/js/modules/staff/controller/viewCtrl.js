(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.staff.name)
        .controller(tst.modules.staff.controllers.view, [
        '$scope',
        '$location',
        '$stateParams',
        'ngDialog',
        tst.modules.core.services.notifier,
        tst.modules.staff.services.api,
        function ($scope, $location, $stateParams, ngDialog, notifier, staffApi) {
            $scope.user = {};
            // var statuses = [];

            $scope.deleteStaff = function(id) {
                // show confirm dialog to ensure user really wants to delete something.
                ngDialog.openConfirm({
                  template: tst.modules.project.views.dialog,
                  scope: $scope 
                }).then(
                    function(success) {
                        projectApi.deleteStaff(id, function(success){
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

            // $scope.statusAsText = function (statusId) {
            //     var status = _.find(statuses, {id: statusId})
            //     if(status)
            //         return status.name;

            //     return '';
            // };

            // $scope.formatDate = function (date) {
            //     return moment(date).format('D/MM/YYYY');
            // };

            function init() {
                staffApi.getUser($stateParams.id, function (user) {
                    $scope.user = user;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving the user with the id ' + $stateParams.id);
                });

                // projectApi.getAllStatuses(function(allStatuses) {
                //     statuses = allStatuses;
                // }, function(error) {
                //     console.log(error);
                //     notifier.error('Error', 'There was an error retrieving all the statuses');
                // });

            }

            init();
            
        }
    ]);
}(angular, tst));
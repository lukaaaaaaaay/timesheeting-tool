(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.department.name)
        .controller(tst.modules.department.controllers.edit, [
        '$scope',
        '$location',
        'ngDialog',
        '$stateParams',
        tst.modules.core.services.notifier,
        tst.modules.department.services.api,
        function ($scope, $location, ngDialog, $stateParams, notifier, api) {
            $scope.department = {};

            $scope.updateDepartment = function(form) {
                if(form.$valid) {
                    api.updateDepartment($scope.department, function(department) {
                        notifier.success('Success', 'Department details updated!');
                        reset();
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'Unable to update department details.');
                    });
                }
                else {
                    notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
                }
            }

            $scope.deleteDepartment = function() {
                // show confirm dialog to ensure user really wants to delete something.
                ngDialog.openConfirm({
                  template: tst.modules.department.views.dialog,
                  scope: $scope 
                }).then(
                    function(success) {
                        api.deleteDepartment($scope.department.id, function(success){
                                notifier.success('Success', 'Department deleted');
                                $location.path(tst.modules.department.routes.list);
                            },function(error) {
                      console.log(error)
                                notifier.error('Error', 'Unable to delete department');
                            });
                    },
                    function(error) {
                        
                    }
                );
            };

            function reset() {
                $scope.editDepartmentForm.$setPristine();
            }

            function init() {
                // get active department
                api.getCurrentDepartment($stateParams.id, function (department) {
                    $scope.department = department;
                }, function (error) {
                    notifier.error('Error', 'There was an error retrieving the department with the id ' + $stateParams.id);
                });

            }
            init();
            
        }
    ]);
}(angular, tst));
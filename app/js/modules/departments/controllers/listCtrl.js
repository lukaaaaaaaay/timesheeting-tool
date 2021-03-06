(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.department.name)
        .controller(tst.modules.department.controllers.list, [
        '$scope',
        '$location',
        'ngDialog',
        tst.modules.core.services.notifier,
        tst.modules.department.services.api,
        tst.modules.company.services.api,
        '$timeout',
        function ($scope, $location, ngDialog, notifier, departmentApi, companyApi, $timeout) {
            $scope.departments = [];
            $scope.filteredDepartments = [];
            $scope.numPerPage = 10;
            $scope.currentPage = 1;

            $scope.deleteDepartment = function(id) {
                // show confirm dialog to ensure user really wants to delete something.
                ngDialog.openConfirm({
                  template: tst.modules.department.views.dialog,
                  scope: $scope 
                }).then(
                    function(success) {
                        departmentApi.deleteDepartment(id, function(success){
                                notifier.success('Success', 'Department deleted');
                                 $timeout(function() {
                                    $scope.departments.splice(id,1);
                                }, 0);
                                // $location.path(tst.modules.department.routes.list);
                            },function(error) {
                      console.log(error)
                                notifier.error('Error', 'Unable to delete department');
                            });
                    },
                    function(error) {
                        
                    }
                );
            };

            $scope.$watch("currentPage + numPerPage", function() {
                updateList();
            });

            // refreshs list on page either because of page change or deletion.
            function updateList() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

                $scope.filteredDepartments = $scope.departments.slice(begin, end);
            }

            $scope.formatDate = function (date) {
                return moment(date).format('D/MM/YYYY');
            };

            function reset() {
                $scope.editDepartmentForm.$setPristine();
            }

            function init() {
                // get active company
                var companyId = companyApi.getCurrentCompany().id;
                departmentApi.getAllDepartments(companyId, function (departments) {
                    $scope.departments = departments;
                    updateList();
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving all the departments');
                });
            }

            init();

        }
    ]);
}(angular, tst));
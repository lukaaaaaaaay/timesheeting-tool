(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.staff.name)
        .controller(tst.modules.staff.controllers.list, [
        '$scope',
        '$location',
        'ngDialog',
        tst.modules.core.services.notifier,
        tst.modules.staff.services.api,
        tst.modules.auth.services.authentication,
        function ($scope, $location, ngDialog, notifier, staffApi, authentication) {
            $scope.staff = [];
            $scope.filteredStaff = [];
            $scope.numPerPage = 10;
            $scope.currentPage = 1;
            // var roles = [];

            $scope.deleteStaff = function(user) {
                // show confirm dialog to ensure user really wants to delete something.
                ngDialog.openConfirm({
                  template: tst.modules.project.views.dialog, // todo: move the view to somewhere better
                  scope: $scope 
                }).then(
                    function(success) {
                        staffApi.deleteStaff(user.id, function(success){
                                notifier.success('Success', 'User deleted');
                                $scope.staff = _.reject($scope.staff, {id: user.id});
                                updateList();
                            },function(error) {
                                console.log(error)
                                notifier.error('Error', 'Unable to delete user');
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

                $scope.filteredStaff = $scope.staff.slice(begin, end);
            }

            // $scope.roleAsText = function (roleId) {
            //     var role = _.find(roles, {id: roleId})
            //     if(role)
            //         return role.name;

            //     return '';
            // };

            function init() {
                // get active company
                var companyId = authentication.getCurrentLoginUser().companyId;                 

                // Get all staff
                staffApi.getAllStaff(companyId, function (staff) {
                    $scope.staff = staff;
                    updateList();
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving all the staff');
                });
            }

            init();

        }
    ]);
}(angular, tst));
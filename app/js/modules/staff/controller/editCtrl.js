(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.staff.name)
        .controller(tst.modules.staff.controllers.edit, [
        '$scope',
        '$location',
        '$stateParams',
        tst.modules.core.services.notifier,
        tst.modules.staff.services.api,
        tst.modules.department.services.api,
        function ($scope, $location, $stateParams, notifier, staffApi, departmentApi) {
            $scope.user = {};
            $scope.departments = [];
            $scope.submitted = false;
            $scope.roles = ['Admin', 'Director', 'Staff']; // TODO: this should be recieved from the server!

            $scope.selectedRole = {};

            $scope.editStaff = function(form) {
                $scope.submitted = true;
                if(form.$valid) {
                    staffApi.updateUser($scope.user, function(user) {
                        notifier.success("success", "New user created");                        
                        $state.go(tst.modules.staff.state.list);
                    }, function(error) {
                        notifier.error('Error', 'Unable to create new user');
                    });
                } else {
                    notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
                }   
            };

            function init() {
                // Get the user object and assign it to the scope.
                staffApi.getUser($stateParams.id, function (user) {
                    $scope.user = user;
                    $scope.selectedRole = $scope.roles[user.roleId];
                                    // Assign departments to scope.
                departmentApi.getAllDepartments($scope.user.companyId, function(allDepartments) {
                    $scope.departments = allDepartments;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving all the departments');
                });
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving the user with the id ' + $stateParams.id);
                });


            }

            init();
        }
    ]);
}(angular, tst));
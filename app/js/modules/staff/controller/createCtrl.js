(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.staff.name)
        .controller(tst.modules.staff.controllers.create, [
        '$scope',
        '$state',
        tst.modules.core.services.notifier,
        tst.modules.auth.services.authentication,
        tst.modules.staff.services.api,
        tst.modules.department.services.api,
        function ($scope, $state, notifier, authentication, staffApi, departmentApi) {
            $scope.roles = ['Admin', 'Director', 'Staff']; // TODO: this should be recieved from the server!
            $scope.departments = [];
            $scope.submitted = false;

            $scope.createStaff = function(form) {
                $scope.submitted = true;
                if(form.$valid) {
                    staffApi.createUser($scope.staff, function(staff) {
                        notifier.success("success", "New user created");                        
                        $state.go(tst.modules.staff.states.list);
                    }, function(error) {
                        notifier.error('Error', 'Unable to create new user');
                    });
                } else {
                    notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
                }   
            };

            function init() {
                var companyId = authentication.getCurrentLoginUser().companyId;                 

                // Assign departments to scope.
                departmentApi.getAllDepartments(companyId, function(departments) {
                    $scope.departments = departments;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving all the statuses');
                });
                
            }

            init();
        }
    ]);
}(angular, tst));
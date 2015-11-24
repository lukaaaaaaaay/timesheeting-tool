(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.staff.name)
        .controller(tst.modules.staff.controllers.create, [
        '$scope',
        '$state',
        tst.modules.core.services.notifier,
        tst.modules.staff.services.api,
        function ($scope, $state, notifier, staffApi) {
            $scope.roles = {};
            $scope.departments = [];
            $scope.submitted = false;

            $scope.createStaff = function(form) {
                $scope.submitted = true;
                if(form.$valid) {
                    staffApi.createUser($scope.staff, function(staff) {
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
                //todo: assign roles and departments to scope.
            }

            init();
        }
    ]);
}(angular, tst));
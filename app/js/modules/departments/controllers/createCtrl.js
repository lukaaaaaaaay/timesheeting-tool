(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.department.name)
        .controller(tst.modules.department.controllers.create, [
        '$scope',
        '$location',
        tst.modules.core.services.notifier,
        tst.modules.department.services.api,
        function ($scope, $location, notifier, departmentApi) {
            $scope.department = {};
            var company = {};

            $scope.createDepartment = function(form) {
                if(form.$valid) {
                    departmentApi.createDepartment($scope.department, function(department) {
                        notifier.success("success", "New department created");                        
                        $location.path(tst.modules.department.routes.list);
                    }, function(error) {
                        notifier.error('Error', 'Unable to create new department');
                    });
                } else {
                    notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
                }   
            }
        }
    ]);
}(angular, tst));
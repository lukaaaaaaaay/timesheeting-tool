(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.department.name)
        .controller(tst.modules.department.controllers.view, [
        '$scope',
        '$location',
        '$stateParams',
        tst.modules.core.services.notifier,
        tst.modules.department.services.api,
        function ($scope, $location, $stateParams, notifier, api) {
            $scope.department = {};

            function init() {
                api.getCurrentDepartment($stateParams.id, function (department) {
                    $scope.department = department;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving the department with the id ' + $stateParams.id);
                });
            }

            init();
            
        }
    ]);
}(angular, tst));
(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.project.name)
        .controller(tst.modules.project.controllers.create, [
        '$scope',
        '$location',
        tst.modules.core.services.notifier,
        tst.modules.auth.services.authentication,
        tst.modules.project.services.api,
        function ($scope, $location, notifier, authentication, projectApi) {
            $scope.project = {};

            $scope.createDepartment = function(form) {
                if(form.$valid) {
                    projectApi.createProject($scope.project, function(project) {
                        notifier.success("success", "New project created");                        
                        $location.path(tst.modules.project.routes.list);
                    }, function(error) {
                        notifier.error('Error', 'Unable to create new project');
                    });
                } else {
                    notifier.error('Error!', 'There are resolved validation errors. Please resolve before re-submitting.');
                }   
            }
        }
    ]);
}(angular, tst));
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
            $scope.managers = [];
            $scope.submitted = false;

            $scope.createProject = function(form) {
                $scope.submitted = true;
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
            };

            $scope.validateDate = function(form, start, end) {
                if(end) {
                    if(end <= start) {
                        form.dueDate.$setValidity('invalidDate', false);
                        form.startDate.$setValidity('invalidDate', false);
                    }
                    else {
                        form.dueDate.$setValidity('invalidDate', true);
                        form.startDate.$setValidity('invalidDate', true);
                    }
                }

            };

            function init() {
                var companyId = authentication.getCurrentLoginUser().companyId;
                projectApi.getAllUsersForCompany(companyId, function(users) {
                    $scope.managers = users;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'Unable to retrieve all users for the company ' + companyId);
                });
            }

            init();
        }
    ]);
}(angular, tst));
(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.tasks.name)
        .controller(tst.modules.tasks.controllers.create, [
        '$scope',
        '$state',
        tst.modules.core.services.notifier,
        tst.modules.auth.services.authentication,
        tst.modules.tasks.services.api,
        tst.modules.project.services.api,
        tst.modules.staff.services.api,
        function ($scope, $state, notifier, authentication, taskApi, projectApi, staffApi) {
            $scope.task = {};
            $scope.allProjects = [];
            $scope.allCategories = [];
            $scope.allStaff = [];
            $scope.currentStaff = [];
            $scope.submitted = false;

            $scope.createTask = function(form) {
                $scope.submitted = true;
                scope.task.users = $scope.currentStaff
                if(form.$valid) {
                    taskApi.createTask($scope.task, function(task) {
                        notifier.success("success", "New task created");                        
                        $state.go(tst.modules.tasks.states.list);
                    }, function(error) {
                        notifier.error('Error', 'Unable to create new task');
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
                taskApi.getAllStatuses(function(allStatuses) {
                    $scope.statuses = allStatuses;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving all the statuses');
                });

                var companyId = authentication.getCurrentLoginUser().companyId;


                staffApi.getAllStaff(companyId, function(staff) {
                    console.log(staff);
                    $scope.allStaff = staff;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'Unable to retrieve all staff for the company ' + user.companyId);
                });


                taskApi.getAllCategoriesForCompany(companyId, function(categories) {
                    console.log(categories);
                    $scope.allCategories = categories;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'Unable to retrieve all categories for the company ' + user.companyId);
                });

                projectApi.getAllProjectsForCompany(companyId, function(projects) {
                    console.log(projects);
                    $scope.allProjects = projects;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'Unable to retrieve all projects for the company ' + user.companyId);
                });

            }

            init();
        }
    ]);
}(angular, tst));
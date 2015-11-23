(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name)
        .controller(tst.modules.dashboard.controllers.home, [   
        '$scope',
        tst.modules.core.services.notifier,
        tst.modules.auth.services.authentication,
        tst.modules.project.services.api,
        //tst.modules.tasks.services.api,   
        //function ($scope, notifier, authentication, projectApi, taskApi) {
        function ($scope, notifier, authentication, projectApi, taskApi) {
            $scope.projects = [];
            $scope.tasks = [];
            var statuses = [];
            $scope.projectBreakdown = [];
            $scope.projectLabels = [];
            $scope.taskBreakdown = [];
            $scope.taskLabels = [];
            var user = authentication.getCurrentLoginUser();

            $scope.statusAsText = function (statusId) {
                var status = _.find(statuses, {id: statusId})
                if(status)
                    return status.name;

                return '';
            };

            $scope.formatDate = function (date) {
                return moment(date).format('D/MM/YYYY');
            };

            function init() {
                
                projectApi.getAllStatuses(function(allStatuses) {
                    statuses = allStatuses;
                    retrieveProjects(allStatuses);
                    //retrieveTasks(allStatuses)
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'There was an error retrieving all the statuses');
                    });
                
            }

            function retrieveProjects(statuses) {
                if(user.roleId == 1) {
                    projectApi.getAllProjects(function (projects) {
                        $scope.projects = projects.slice(0,3);
                        calculateProjectBreakdown(projects, statuses);                    
                    }, function (error) {
                        notifier.error("Error", "Unable to find projects for the current user");
                    });

                } else if(user.roleId ==2) {
                    projectApi.getAllProjectsForCompany(user.companyId, function (projects) {
                        $scope.projects = projects.slice(0,3);
                        calculateProjectBreakdown(projects, statuses);
                    }, function (error) {
                        notifier.error("Error", "Unable to find projects for the current user");
                    });
                } else {
                    projectApi.getAllProjectsForUser(user.id, function (projects) {
                        $scope.projects = projects.slice(0,3);
                        calculateProjectBreakdown(projects, statuses);        
                    }, function (error) {
                        notifier.error("Error", "Unable to find projects for the current user");
                    });
                }
                
            }

            function retrieveTasks(statuses) {
                if(user.roleId == 1) {
                    taskApi.getAllTasks(function (tasks) {
                        
                        calculateTaskBreakdown(tasks, statuses);                    
                    }, function (error) {
                        notifier.error("Error", "Unable to find tasks for the current user");
                    });

                } else if(user.roleId ==2) {
                    taskApi.getAllTasksForCompany(user.companyId, function (tasks) {
                    
                        calculateTaskBreakdown(tasks, statuses);
                    }, function (error) {
                        notifier.error("Error", "Unable to find tasks for the current user");
                    });
                } else {
                    taskApi.getAllForUser(user.id, function (tasks) {
                        calculateTaskBreakdown(tasks, statuses);        
                    }, function (error) {
                        notifier.error("Error", "Unable to find tasks for the current user");
                    });
                }
            }

            function calculateProjectBreakdown(projects, statuses) {
                angular.forEach(statuses, function(status, idx) {
                    $scope.projectLabels.push(status.name);
                    var projectsForStatus = _.where(projects, {statusId: status.id});
                    if(projectsForStatus)
                        $scope.projectBreakdown.push(projectsForStatus.length);
                    else {
                        $scope.projectBreakdown.push(0);
                    }
                });
            }

            function calculateTaskBreakdown(tasks, statuses) {
               angular.forEach(statuses, function(status, idx) {
                    $scope.taskLabels.push(status.name);
                    var tasksForStatus = _.where(tasks, {statusId: status.id});
                    if(tasksForStatus)
                        $scope.taskBreakdown.push(tasksForStatus.length);
                    else {
                        $scope.taskBreakdown.push(0);
                    }
                }); 
            }

            init();
          
        }


    ]);
}(angular, tst));
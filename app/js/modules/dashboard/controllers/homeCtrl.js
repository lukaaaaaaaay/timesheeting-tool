(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name)
        .controller(tst.modules.dashboard.controllers.home, [   
        '$scope',
        tst.modules.core.services.notifier,
        tst.modules.auth.services.authentication,
        tst.modules.project.services.api,   
        function ($scope, notifier, authentication, projectApi) {
            $scope.projects = [];
            var statuses = [];
            $scope.projectBreakdown = [];
            $scope.projectLabels = [];

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
                var user = authentication.getCurrentLoginUser();
                
                if(user.roleId == 1) {
                    projectApi.getAllProjects(function (projects) {
                        $scope.projects = projects.slice(0,3);
                        retrieveStatusesAndBreakdown($scope.projects);                    
                    }, function (error) {
                        notifier.error("Error", "Unable to find projects for the current user");
                    });
                } else if(user.roleId ==2) {
                    projectApi.getAllProjectsForCompany(user.companyId, function (projects) {
                        $scope.projects = projects.slice(0,3);
                        retrieveStatusesAndBreakdown($scope.projects);
                    }, function (error) {
                        notifier.error("Error", "Unable to find projects for the current user");
                    });
                } else {
                    projectApi.getAllProjectsForUser(user.id, function (projects) {
                        $scope.projects = projects.slice(0,3);
                        retrieveStatusesAndBreakdown($scope.projects);        
                    }, function (error) {
                        notifier.error("Error", "Unable to find projects for the current user");
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

            function retrieveStatusesAndBreakdown(projects) {
                projectApi.getAllStatuses(function(allStatuses) {
                    statuses = allStatuses;
                    calculateProjectBreakdown(projects, statuses);
                    }, function(error) {
                        console.log(error);
                        notifier.error('Error', 'There was an error retrieving all the statuses');
                    });
            }

            init();
          
        }


    ]);
}(angular, tst));
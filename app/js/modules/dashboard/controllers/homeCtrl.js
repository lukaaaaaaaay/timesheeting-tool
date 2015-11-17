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
                var companyId = authentication.getCurrentLoginUser().companyId;
                // TODO: CHANGE TO QUERY BY USER IF USER IS NOT A DIRECTOR
                projectApi.getAllProjects(companyId, function (projects) {
                    $scope.projects = projects;
                }, function (error) {
                    notifier.error("Error", "Unable to find projects for the current user");
                });

                projectApi.getAllStatuses(function(allStatuses) {
                    statuses = allStatuses;
                }, function(error) {
                    console.log(error);
                    notifier.error('Error', 'There was an error retrieving all the statuses');
                });
            }

            init();
          
        }


    ]);
}(angular, tst));
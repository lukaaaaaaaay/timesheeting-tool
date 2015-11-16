(function (angular, tst) {
    'use strict';

    /*
     * Provides Project functionality for TST.
     */
    angular.module(tst.modules.tasks.name).factory(tst.modules.tasks.services.api, [
        '$q',
        '$http',
        tst.modules.core.services.eventbus,
        function ($q, $http, eventbus) {
    
            var currentTask,

            /**
             * createTask
             */
            createTask = function (task, callback) {
                var defer = $q.defer();

                // each task must have a projectId
                task.projectId = 1;

                $http.post( tst.modules.api.url + '/api/tasks', task)
                .success(function(resp) {
                    currentTask = resp;

                    callback(task);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * getAllTasksForProject
            */
            getAllTasksForProject = function(projectId, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/tasks/project/' + projectId)
                                            // todo: see if we can update this to /api/project/:id/task/:id
                .success(function(resp) {
                    var tasks = resp;
                    console.log(tasks);

                    callback(tasks);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            getAllStatuses = function(callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/statuses')
                .success(function(resp) {
                    var statuses = resp;

                    callback(statuses);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            };

            return {
                createTask: createTask,
                getAllTasksForProject: getAllTasksForProject,
                getAllStatuses: getAllStatuses
            };
        }
    ]);
}(angular, tst));

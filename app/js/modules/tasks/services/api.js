(function (angular, tst) {
    'use strict';

    /*
     * Provides Project functionality for TST.
     */
    angular.module(tst.modules.tasks.name).factory(tst.modules.tasks.services.api, [
        '$q',
        '$http',
        tst.modules.core.services.eventbus,
        tst.modules.project.services.api,
        function ($q, $http, eventbus, projectApi) {
    
            var currentTask,

            /**
             * createTask
             */
            createTask = function (task, callback) {
                var defer = $q.defer();

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
            * updateTask
            */
            updateTask = function (task, callback) {
                var defer = $q.defer();

                $http.put( tst.modules.api.url + '/api/tasks/' + task.id, task)
                .success(function(resp) {
                    currentTask = resp;

                    callback(currentTask);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },


            /**
             * getTask
             */
            getTask = function (id, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/tasks/' + id)
                .success(function(resp) {
                    currentTask = resp;

                    callback(currentTask);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },


            // getAllTasks // for admin
            //getAllTasksForCompany
            //getAllProjectsForUser

            getAllTasks = function(callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/tasks/')
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


            /**
            * getAllForUser
            */
            getAllTasksForUser = function(userId, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/tasks/user/' + userId)
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

            /**
            * getAllTasksForCompany
            */
            getAllTasksForCompany = function(companyId, callback) {
                var defer = $q.defer();

                // Get all projects for companyId
                projectApi.getAllProjectsForCompany(companyId, function (projects) {
                    // Get all tasks for each project
                    _.each(projects, function(project) {
                        getAllTasksForProject(project.id, function (tasks) {
                            callback(tasks);
                        });
                    });
                });
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
                updateTask, updateTask,
                getTask: getTask,
                getAllTasksForProject: getAllTasksForProject,
                getAllTasksForCompany: getAllTasksForCompany,
                getAllForUser: getAllForUser,
                getAllStatuses: getAllStatuses
            };
        }
    ]);
}(angular, tst));

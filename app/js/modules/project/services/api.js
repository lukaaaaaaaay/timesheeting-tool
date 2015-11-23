(function (angular, tst) {
    'use strict';

    /*
     * Provides Project functionality for TST.
     */
    angular.module(tst.modules.project.name).factory(tst.modules.project.services.api, [
        '$q',
        '$http',
        tst.modules.core.services.eventbus,
        function ($q, $http, eventbus) {
    
            var currentProject,

            /**
             * createProject
             */
            createProject = function (project, callback) {
                var defer = $q.defer();

                $http.post( tst.modules.api.url + '/api/projects', project)
                .success(function(resp) {
                    currentProject = resp;

                    callback(project);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * updateProject
            */
            updateProject = function (project, callback) {
                var defer = $q.defer();

                $http.put( tst.modules.api.url + '/api/projects/' + project.id, project)
                .success(function(resp) {
                    currentProject = resp;

                    callback(project);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * deleteProject
            */
            deleteProject = function (id, callback) {
                var defer = $q.defer();

                $http.delete( tst.modules.api.url + '/api/projects/' + id)
                .success(function(resp) {
                    callback(resp);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
             * getCurrentProject
             */
            getCurrentProject = function (id, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/projects/' + id)
                .success(function(resp) {
                    currentProject = resp;


                    callback(currentProject);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * getAllProjects
            */
            getAllProjects = function(callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/projects')
                .success(function(resp) {
                    var projects = resp;

                    callback(projects);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * getAllProjectsForCompany
            */
            getAllProjectsForCompany = function(id, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/projects/company/' + id)
                .success(function(resp) {
                    var projects = resp;

                    callback(projects);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * getAllProjectsForUser
            */
            getAllProjectsForUser = function(id, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/projects/manager/' + id)
                .success(function(resp) {
                    var projects = resp;

                    callback(projects);
                })
                .error(function(err) {
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
            * getAllUsersForCompany
            */
            getAllUsersForCompany = function(id, callback) {
                var defer = $q.defer();

                $http.get( tst.modules.api.url + '/api/users/company/' + id)
                .success(function(resp) {
                    var users = resp;

                    callback(users);
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
                createProject: createProject,
                updateProject: updateProject,
                deleteProject: deleteProject,
                getAllProjects: getAllProjects,
                getAllProjectsForCompany: getAllProjectsForCompany,
                getAllProjectsForUser: getAllProjectsForUser,
                getCurrentProject: getCurrentProject,
                getAllUsersForCompany: getAllUsersForCompany,
                getAllStatuses: getAllStatuses
            };
        }
    ]);
}(angular, tst));

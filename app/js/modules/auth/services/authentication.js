(function (angular, tst) {
    'use strict';

    /*
     * Provides Authentication for TST.
     */
    angular.module(tst.modules.auth.name).factory(tst.modules.auth.services.authentication, [
        '$q',
        '$http',
        tst.modules.core.services.eventbus,
        function ($q, $http, eventbus) {
            var currentUser,

            createUser = function (user) {
                var defer = $q.defer();

                $http.post( tst.modules.api.url + '/api/users', user)
                .success(function(resp) {
                    currentUser = resp;

                    // We're authenticated, but we don't know the roles name. :(. 
                    // Let's change that.
                    // todo: abstact this. use eventbus to run on both userRegistered events and userloggedin events
                    $http.get(tst.modules.api.url + '/role/'+ currentUser.roleId)
                    .then(function (roles) {
                        currentUser.roles = [roles.data.name];
                        defer.resolve(currentUser);
                    });

                    // Broadcasts a userRegistered event for subscribers.
                    eventbus.broadcast(tst.modules.auth.events.userRegistered, currentUser);
                })
                .error(function(err) {
                    this.logout();
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },
            /**
             * Login
             */
            login = function (email, password) {
                var defer = $q.defer();

                $http.post( tst.modules.api.url + '/auth/local', {
                    email: email,
                    password: password
                })
                .success(function(resp) {
                    currentUser = resp;

                    // We're authenticated, but we don't know the roles name. :(. 
                    // Let's change that.
                    // todo: abstact this. use eventbus to run this on both userRegistered events and userloggedin events
                    $http.get(tst.modules.api.url + '/role/'+ currentUser.roleId)
                    .then(function (roles) {
                        currentUser.roles = [roles.data.name];
                        defer.resolve(currentUser);
                    });

                    // Broadcasts a userLoggedIn event for subscribers.
                    eventbus.broadcast(tst.modules.auth.events.userLoggedIn, currentUser);
                })
                .error(function(err) {
                    this.logout();
                    defer.reject(err);
                }.bind(this));

                return defer.promise;
            },

            /**
             * Logout
             */
            logout = function () {
                // we should only remove the current user.
                // routing back to login login page is something we shouldn't
                // do here as we are mixing responsibilities if we do.
                // Broadcasts a userLoggedOut event for subscribers.
                currentUser = undefined;
                eventbus.broadcast(tst.modules.auth.events.userLoggedOut);
            },

            /**
             * getCurrentLoginUser
             */
            getCurrentLoginUser = function () {
                return currentUser;
            };

            return {
                createUser: createUser,
                login: login,
                logout: logout,
                getCurrentLoginUser: getCurrentLoginUser
            };
        }
    ]);
}(angular, tst));

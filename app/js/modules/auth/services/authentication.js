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

            /**
             * Login
             */
            login = function (email, password) {
                var defer = $q.defer();

                $http.post( tst.modules.app.url + '/auth/local', {
                    email: email,
                    password: password
                })
                .success(function(data) {
                    currentUser = data;

                    // We're logged in, but we don't know roles. :(. 
                    // Let's change that.
                    if(!data.roles) {
                        $http.get(tst.modules.app.url + '/user/'+ data.id +'/roles')
                        .then(function (roles) {
                          currentUser.roles = [roles.data[0].name];
                          defer.resolve(currentUser);
                         });
                    };

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
                login: login,
                logout: logout,
                getCurrentLoginUser: getCurrentLoginUser
            };
        }
    ]);
}(angular, tst));

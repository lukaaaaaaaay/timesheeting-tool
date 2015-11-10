(function (angular, tst) {
    'use strict';

    /*
     * Provides Authentication for TST.
     */
    angular.module(tst.modules.auth.name).factory(tst.modules.auth.services.authentication, [
        '$q',
        'localStorageService',
        '$base64',
        tst.modules.core.services.eventbus,
        function ($q, localStorage, $base64, eventbus) {   

            /**
            * Set the user credentials
            *
            * @param {String} email Email
            * @param {String} password Unencryped password
            */
            function setCredentials(email, password) {
                console.log('Setting credentials for user: ' + email);

                //todo: set storage values in module config

                // set the value of the auth-header
                localStorage.set('tst-auth', 'Basic ' + $base64.encode(email + ':' + password));

                // record the last authentication activity
                localStorage.set('tst-last-activity', (new Date()).toString());
            }

            /**
            * Returns the current authentication header
            */
            var getAuth = function () {
                return localStorage.get('tst-auth');
            },

            // todo: maybe move this to account module... user registration isn't reall auth.
            createUser = function (user) {
                    // lets save the email and password

                    var email = user.email;
                    var password = user.password;

                    var deferred = $q.defer();

                    /**
                    * Process the response, and if there are any issues
                    * the reject the promise
                    */
                    function processResponse() {
                        /* jshint validthis: true */
                        if (this.status !== 200) {
                            deferred.reject();
                        } else {
                            deferred.resolve();
                        }
                    }

                    // don't use $http to avoid circular reference, so
                    // directly use XMLHttpRequest and $q
                    var promise = deferred.promise;
                    var request = new XMLHttpRequest();
                    request.timeout = 15000;
                    request.onload = processResponse;
                    request.onerror = request.ontimeout = function () {
                        deferred.reject();
                    };
                    request.open('POST', tst.modules.api.url + '/api/users');
                    request.setRequestHeader('Accept', 'application/json');
                    var params = JSON.stringify(user);
                    request.send( params );

                    /**
                    * Allow subscribers to the promise to add a
                    * success function to the login event
                    */
                    promise.success = function(fn) {
                        promise.then(function() {
                            fn();
                        });
                        return promise;
                    };

                    /**
                    * Allow subscribers to the promise to add
                    * an error function to the login event
                    */
                    promise.error = function(fn) {
                        promise.then(null, function() {
                            fn();
                        });
                        return promise;
                    };

                    /**
                    * Handle the promise being rejected or resolved
                    */
                    promise.then(function () {
                        // we've confirmed credentials match a user
                        console.log('Successfully authenticated');

                        // record the credentials
                        setCredentials(email, password);

                        // turn the response string to a user object
                        var data = request.responseText;
                        var user = JSON.parse(data);

                        //attach roles to user object
                        angular.extend(user, {
                            roles: ['Director'], // todo: don't hardcode this stuff. WTF.
                        });

                        // save the user object in local storage
                        localStorage.set('tst-user', user);

                        eventbus.broadcast(tst.modules.auth.events.userLoggedIn, user);
                    }, function () {
                        // some error in credential check
                        logout();
                        eventbus.broadcast(tst.modules.auth.events.failed);
                    });

                    return promise;
                },

            /**
             * Login
             */
            login = function (email, password) {
                var deferred = $q.defer();

                /**
                * Process the response, and if there are any issues
                * the reject the promise
                */
                function processResponse() {
                    /* jshint validthis: true */
                    if (this.status !== 200) {
                        deferred.reject();
                    } else {
                        deferred.resolve();
                    }
                }

                // don't use $http to avoid circular reference, so
                // directly use XMLHttpRequest and $q
                var promise = deferred.promise;
                var request = new XMLHttpRequest();
                request.timeout = 15000;
                request.onload = processResponse;
                request.onerror = request.ontimeout = function () {
                    deferred.reject();
                };
                request.open('POST', tst.modules.api.url + '/auth/local');
                request.setRequestHeader('Accept', 'application/json');
                var params = { email: email, password: password };

                request.send( JSON.stringify(params) );

                /**
                * Allow subscribers to the promise to add a
                * success function to the login event
                */
                promise.success = function(fn) {
                    promise.then(function() {
                        fn();
                    });
                    return promise;
                };

                /**
                * Allow subscribers to the promise to add
                * an error function to the login event
                */
                promise.error = function(fn) {
                    promise.then(null, function() {
                        fn();
                    });
                    return promise;
                };

                /**
                * Handle the promise being rejected or resolved
                */
                promise.then(function () {
                    // we've confirmed credentials match a user
                    console.log('Successfully authenticated');

                    // turn the response string to a user object
                    var data = request.responseText;
                    var user = JSON.parse(data);

                    // record the credentials
                    setCredentials(email, password);

                    //attach roles to user object
                    angular.extend(user, {
                        roles: ['Director'], // todo: don't hardcode this stuff. WTF.
                    });

                    // save the user object in local storage
                    localStorage.set('tst-user', user);

                    // set current company id.
                    if(user.companyId)
                        localStorage.set('tst-companyId', user.companyId);

                    eventbus.broadcast(tst.modules.auth.events.userLoggedIn, user);
                }, function () {
                    // some error in credential check
                    logout();
                    eventbus.broadcast(tst.modules.auth.events.failed);
                });

                return promise;
            },

            /**
             * Logout
             */
            logout = function (callback) {
                // Clear the currentUser and wipe the local storage
                localStorage.remove('tst-auth');
                localStorage.remove('tst-last-activity');
                localStorage.remove('tst-user');    
                localStorage.remove('tst-companyId');
                localStorage.remove('tst-currentCompany');

                console.log("logging out");  

                // Routing back to login page is something we shouldn't
                // do here as we are mixing responsibilities if we do.
                // Broadcasts a userLoggedOut event so it can be listened to by the handler.
                eventbus.broadcast(tst.modules.auth.events.userLoggedOut);

                callback;
            },

            /**
            * Handle an authentication failure
            */
            handleAuthFailure = function() {
                logout();
                eventbus.broadcast(tst.modules.auth.events.failed);
            },

            /**
             * getCurrentLoginUser
             */
            getCurrentLoginUser = function () {
                return localStorage.get('tst-user');
            };

            return {
                getAuth: getAuth,
                createUser: createUser,
                login: login,
                logout: logout,
                handleAuthFailure: handleAuthFailure,
                getCurrentLoginUser: getCurrentLoginUser
            };
        }
    ]);

}(angular, tst));

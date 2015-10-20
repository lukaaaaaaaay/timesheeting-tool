'use strict';

angular.module('tsm', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'base64',
  'tsm.users',
  'tsm.services',
  'tsm.compareTo',
  'ngDialog'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(false);
    $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Basic ' + $cookieStore.get('token');
        }
        // if ($cookieStore.get('token')) {
        //   config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        // }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })
  // set the class on the body tag in index.html - adds required styling. 
  // $rootScope.bodyClass must be set in each controller eg. dashboard, register or login controllers.
  .factory('tstBodyClass', function() {
    return {
      returned: {
        formsClass: 'tst-single-form',
        dashboard: 'tst-body',
      }
    }
  })
  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });



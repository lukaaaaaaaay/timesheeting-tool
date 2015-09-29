'use strict';

angular.module('tsm')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/account/register/register.html',
        controller: 'RegisterCtrl'
      });
  });
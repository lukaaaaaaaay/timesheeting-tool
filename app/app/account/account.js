'use strict';

angular.module('tsm')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/account/register/register.html',
        controller: 'RegisterCtrl'
      })
      .state('manage account', {
        url: '/account',
        templateUrl: 'app/account/manage/manage-account.html',
        controller: 'ManageAccountCtrl'
      })
      .state('reset password - logged in' , {
        url: '/account/reset-password',
        templateUrl: 'app/account/manage/reset-password.html',
        controller: 'ManageResetPwCtrl'
      });
  });
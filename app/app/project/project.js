'use strict';

angular.module('tsm')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.project-create', {
        url: '/project/create',
        templateUrl: 'app/project/create-project.html',
        controller: 'CreateProjectCtrl',
        authenticate: true,
      })
      .state('dashboard.project-list', {
        url: '/projects',
        templateUrl: 'app/project/project-list.html',
        controller: 'ProjectListCtrl',
        authenticate: true,
      })
      .state('dashboard.project-view', {
        url: '/project/:id',
        templateUrl: 'app/project/view-project.html',
        controller: 'ViewProjectCtrl',
        authenticate: true,
      })
      // .state('dashboard.project-edit', {
      //   url: 'project/edit/:id',
      //   templateUrl: 'app/project/edit-project.html',
      //   controller: 'EditProjectCtrl',
      //   authenticate: true,
      // });
  });
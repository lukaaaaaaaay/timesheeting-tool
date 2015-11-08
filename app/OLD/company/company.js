'use strict';

angular.module('tsm')
  .config(function ($stateProvider) {
    $stateProvider
      .state('company-create', {
        url: '/company/create',
        templateUrl: 'app/company/company/create-company.html',
        controller: 'CreateCompanyCtrl',
        authenticate: true,
      })
      .state('dashboard.company-view', {
        url: '/company',
        templateUrl: 'app/company/company/company-details.html',
        controller: 'CompanyCtrl',
        authenticate: true,
      })
      .state('dashboard.company-update', {
        url: '/company/edit',
        templateUrl: 'app/company/company/edit-company.html',
        controller: 'EditCompanyCtrl',
        authenticate: true,
      })
      .state('dashboard.departments-list', {
        url: '/departments',
        templateUrl: 'app/company/department/department-list.html',
        controller: 'DepartmentListCtrl',
        authenticate: true,
      })
      .state('dashboard.create-department', {
        url: '/department/create',
        templateUrl: 'app/company/department/create-dept.html',
        controller: 'CreateDepartmentCtrl',
        authenticate: true,
      })
      .state('dashboard.view-department', {
        url: '/department/:id',
        templateUrl: 'app/company/department/view-department.html',
        controller: 'DepartmentCtrl'
      })
      .state('dashboard.edit-department', {
        url: '/department/edit/:id',
        templateUrl: 'app/company/department/edit-department.html',
        controller: 'EditDepartmentCtrl'
      });
  });
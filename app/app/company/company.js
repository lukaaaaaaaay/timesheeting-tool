'use strict';

angular.module('tsm')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.company-view', {
        url: '/company',
        templateUrl: 'app/company/company/company-details.html',
        controller: 'CompanyCtrl',
      })
      .state('dashboard.company-update', {
        url: '/company/edit',
        templateUrl: 'app/company/company/edit-company.html',
        controller: 'EditCompanyCtrl',
      })
      .state('dashboard.departments-list', {
        url: '/departments',
        templateUrl: 'app/company/department/department-list.html',
        controller: 'DepartmentListCtrl',
      })
      .state('dashboard.create-department', {
        url: '/department/create',
        templateUrl: 'app/company/department/create-dept.html',
        controller: 'CreateDepartmentCtrl',
      })
  });
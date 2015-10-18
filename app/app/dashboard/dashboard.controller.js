
'use strict';

angular.module('tsm')
  .controller('DashboardCtrl', function ($scope, $http, Auth, $rootScope, tstBodyClass, $state, ActiveCompany) {
    $scope.user = [];

    // add body class
    $rootScope.bodyClass = tstBodyClass.returned.dashboard;

    // add user to scope
    $scope.user = Auth.getCurrentUser();

    $scope.goTo = function(path) {
    	$state.transitionTo(path);
    }

    // function init() {
    //     ActiveCompany.get({directorId: $scope.user.id}, function (company) {
    //         console.log(company);
    //         $rootScope.company = company;
    //     }, function (error) {

    //     });  
    // }

    // init();

    console.log($scope.user);
  });

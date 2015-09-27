'use strict';

angular.module('tsm')
  .controller('LoginCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  });


// 'use strict';
  
// angular.module('Authentication')
  
// .controller('LoginController',
//     ['$scope', '$rootScope', '$location', 'AuthenticationService',
//     function ($scope, $rootScope, $location, AuthenticationService) {
//         // reset login status
//         AuthenticationService.ClearCredentials();
  
//         $scope.login = function () {
//             $scope.dataLoading = true;
//             AuthenticationService.Login($scope.username, $scope.password, function(response) {
//                 if(response.success) {
//                     AuthenticationService.SetCredentials($scope.username, $scope.password);
//                     $location.path('/');
//                 } else {
//                     $scope.error = response.message;
//                     $scope.dataLoading = false;
//                 }
//             });
//         };
//     }]);
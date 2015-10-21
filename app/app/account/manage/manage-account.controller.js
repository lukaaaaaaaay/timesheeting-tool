(function () {
    'use strict';

    angular.module('tsm')
    .controller('ManageAccountCtrl', function ($scope, $location,$rootScope, tstBodyClass, notifier, Auth, User, Users) {
        $scope.user = {};
        // set body class
        $rootScope.bodyClass = tstBodyClass.returned.dashboard;

        function init() {
            $scope.user = Auth.getCurrentUser();
        }

        init();

        $scope.changeFirstName = function(form) {

        };

        $scope.changeLastName = function(form) {

        };

        $scope.changeEmail = function(form) {

        };

        $scope.resetPassword = function() {

        };

        $scope.updateDisplayPicture = function(form) {

        };
        
    });
})();

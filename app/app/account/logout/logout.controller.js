'use strict';

angular.module('tsm')
.controller('LogoutCtrl', function ($scope, Auth, $location) {

        Auth.logout();
});
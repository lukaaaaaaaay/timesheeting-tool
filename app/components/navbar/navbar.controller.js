'use strict';

angular.module('tsm')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
    {'title': 'Home', 'link': '/#/'},
    {'title': 'About', 'link': '#about'},
    {'title': 'FAQS', 'link': '#faqs'},
    {'title': 'Contact', 'link': '#contact'},
    {'title': 'Login', 'link': '/#/login'},
    {'title': 'Register', 'link': '/#/register'},
    // {'title': 'Dashboard', 'link': '/#/dashboard'},
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
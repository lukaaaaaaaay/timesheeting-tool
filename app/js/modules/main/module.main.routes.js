(function (angular, tst) {
    'use strict';

    angular.module('main').config([
        '$stateProvider',
        function ($stateProvider) {

            $stateProvider.state('main', {
                url: '/main',
                templateUrl: tst.modules.main.views.main,
                bodyClass: tst.modules.main.bodyClass.main,
                views: {
                    'home@main': {
                        templateUrl: tst.modules.main.views.home,
                        controller: function($scope) {}
                    },
                    'about@main': {
                        templateUrl: tst.modules.main.views.about,
                        controller: function($scope) {}
                    },
                    'faqs@main': {
                        templateUrl: tst.modules.main.views.faqs,
                        controller: function($scope) {}
                    },
                    'contact@main': {
                        templateUrl: tst.modules.main.views.contact,
                        controller: function($scope) {}
                    }
                }
            });
        }]);
}(angular, tst));
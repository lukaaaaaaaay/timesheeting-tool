(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.main.name).config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $stateProvider.state(tst.modules.main.states.main, {
                url: tst.modules.main.routes.main,
                bodyClass: tst.modules.main.bodyClass.main,
                views: {
                    '': {
                        templateUrl: tst.modules.main.views.main,
                    },
                    'home@main': {
                        templateUrl: tst.modules.main.views.home,
                        
                    },
                    'about@main': {
                        templateUrl: tst.modules.main.views.about,
                        
                    },
                    'faqs@main': {
                        templateUrl: tst.modules.main.views.faqs,
                        
                    },
                    'contact@main': {
                        templateUrl: tst.modules.main.views.contact,
                        
                    },
                }
            });

            // Redirect to sakespage if no state found
            $urlRouterProvider.otherwise( tst.modules.main.routes.main );

        }]);
}(angular, tst));
(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.main.name).config([
        '$stateProvider',
        function ($stateProvider) {

            // $stateProvider.state(tst.modules.main.states.main, {
            //   template: '<ui-view />',
            //   controller: function($scope){
            //       console.log("main active");
            //   }
            // });

            $stateProvider.state(tst.modules.main.states.main, {
                url: '/',
                templateUrl: 'js/modules/main/html/main.html',
                bodyClass: tst.modules.main.bodyClass.main,
                access: {
                    loginRequired: false,
                },
                controller: function($scope) {
                    console.log(tst.modules.main.states.main);
                    console.log();
                },
                views: {
                    'main.home': {
                        templateUrl: tst.modules.main.views.home,
                        
                    },
                    'main.about': {
                        templateUrl: tst.modules.main.views.about,
                        
                    },
                    'main.faqs': {
                        templateUrl: tst.modules.main.views.faqs,
                        
                    },
                    'main.contact': {
                        templateUrl: tst.modules.main.views.contact,
                        
                    },

                }
            });
        }]);
}(angular, tst));
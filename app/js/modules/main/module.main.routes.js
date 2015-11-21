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
        }]);
}(angular, tst));
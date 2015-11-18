(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.staff.name).config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state(tst.modules.staff.states.parent, {
              template: '<ui-view />',
              controller: function(){
                  console.log("staff active");
              }
            });

        }]);
}(angular, tst));
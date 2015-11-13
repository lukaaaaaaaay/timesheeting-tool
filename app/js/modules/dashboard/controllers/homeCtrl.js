(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.dashboard.name)
        .controller(tst.modules.dashboard.controllers.home, [   
        '$scope',   
        function ($scope) {

        	// TODO: Move to SidebarMenu directive.

            console.log("in child state");
        }


    ]);
}(angular, tst));
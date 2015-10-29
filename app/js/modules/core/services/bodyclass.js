(function (angular, tst) {
    'use strict';

    /**
     * Provides a service for changing the class of the body element
     */
    angular.module(tst.modules.core.name).factory(tst.modules.core.services.bodyclass, [
        
        function () {

            return {
                    formsClass: 'tst-single-form',
                    dashboard: 'tst-body',
            };
        }
    ]);
}(angular, tst));

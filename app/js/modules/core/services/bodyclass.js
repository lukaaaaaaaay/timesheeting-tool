(function (angular, tst) {
    'use strict';

    /**
     * Provides a eventing mechanism which can broadcast and subscribe to application wide events.
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

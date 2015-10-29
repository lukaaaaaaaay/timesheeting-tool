(function (angular, tst) {
    'use strict';

    /** 
     * This is our core module config object. 
     * Define constants relevant to TST core.
     */
    tst.modules.core = {
        name: 'tst-core',
        services: {
            eventbus: 'eventbus',
            bodyclass: 'bodyclass'
        }
    };

    /**
     * This loads our core module and dependancies.
     */
    angular.module(tst.modules.core.name, []);

}(angular, tst));

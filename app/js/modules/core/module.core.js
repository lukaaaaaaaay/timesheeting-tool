(function (angular, tst) {
    'use strict';

    tst.modules.core = {
        name: 'tst-core',
        services: {
            eventbus: 'eventbus',
            bodyclass: 'bodyclass'
        }
    };

    angular.module(tst.modules.core.name, []);
}(angular, tst));

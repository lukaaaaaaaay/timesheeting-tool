(function (angular, tst) {
    'use strict';

    /**
     * This file loads our app modules.
     */
    angular.module(tst.modules.app.name, [
        'ngRoute',

        tst.modules.core.name,
        tst.modules.auth.name,
        tst.modules.dashboard.name,
    ]);
}(angular, tst));

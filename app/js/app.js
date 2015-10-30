(function (angular, tst) {
    'use strict';

    /**
     * This file loads our app dependencies.
     */
    angular.module(tst.modules.app.name, [
        // Angular modules
        'ngRoute',

        // App submodules
        tst.modules.core.name,
        tst.modules.auth.name,
        tst.modules.account.name,
        tst.modules.dashboard.name,
    ]);
}(angular, tst));

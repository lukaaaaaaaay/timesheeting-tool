(function (angular, tst) {
    'use strict';

    /**
     * This file loads our app dependencies.
     */
    angular.module(tst.modules.app.name, [
        // Angular modules
        'ui.router',

        // TST core famework
        tst.modules.core.name,
        tst.modules.auth.name,

        // App submodules
        tst.modules.account.name,
        tst.modules.company.name,
        tst.modules.dashboard.name,
    ]);
}(angular, tst));

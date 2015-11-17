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
        tst.modules.ui.name,
        tst.modules.account.name,
        tst.modules.company.name,
        tst.modules.department.name,
        tst.modules.dashboard.name,
        tst.modules.project.name,
        tst.modules.timesheet.name
        
    ]);
}(angular, tst));
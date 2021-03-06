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
        tst.modules.ui.name,

        // Homepage
        tst.modules.main.name,

        // App submodules
        tst.modules.staff.name, // todo: change to tst.modules.users.name
            tst.modules.account.name,
        //orgs
        tst.modules.company.name,
            tst.modules.department.name,
        //
        tst.modules.project.name,
            tst.modules.tasks.name,
        tst.modules.timesheet.name,

        tst.modules.dashboard.name
        
    ]);
}(angular, tst));
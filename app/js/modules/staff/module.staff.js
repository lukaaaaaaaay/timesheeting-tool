(function (angular, tst) {
    'use strict';

    tst.modules.staff = {
        name: 'tst.staff',
        states: {
            parent: 'dashboard.staff',
        },
    };

    angular.module(tst.modules.staff.name, [
        tst.modules.core.name
    ]);
}(angular, tst));

(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.app.name, [
        'ngRoute',
        tst.modules.core.name,
        tst.modules.auth.name,
        tst.modules.dashboard.name,
    ]);
}(angular, tst));

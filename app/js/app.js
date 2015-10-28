(function (angular, tst) {
    'use strict';

    angular.module(tst.modules.app.name, [
        'ngRoute',
        tst.modules.core.name,
    ]);
}(angular, tst));

(function (angular, tst) {
    'use strict';

    /** 
     * This is our ui module config object. 
     * Define constants relevant to TST ui.
     */
    tst.modules.ui = {
        name: 'tst-ui',
    };

    /**
     * This loads our ui module and dependancies.
     */
    angular.module(tst.modules.ui.name, [
        'navbar',
        'sidebar'
        //tst.modules.ui.sidebar.name
    ]);

}(angular, tst));

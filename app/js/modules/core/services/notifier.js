(function (angular, tst) {
    'use strict';

    /**
     * Provides a basic eventing mechanism which can broadcast and subscribe to application wide events.
     * Abstracts Angular's RootScope emitter. 
     */
    angular.module(tst.modules.core.name).factory(tst.modules.core.services.notifier, [
        // 'ngAnimate',
        'toastr',
        function (toastr) {

            var options = {
                "closeButton": false,
                "timeOut": "5000",
            },

            // override default options
            errOptions = {
                "closeButton": true,
                "timeOut": null,
            },


            /**
             * err
             */
            error = function(title, message) {
                toastr.error(title, message, errOptions);
            },

            /**
             * success
             */
            success = function(title, message) {
                toastr.success(title, message, options);
            },

            /**
             * info
             */
            info = function(title, message) {
                toastr.info(title, message, options);
            };

            return {
                error: error,
                success: success,
                info: info
            };
        }
    ]);
}(angular, tst));

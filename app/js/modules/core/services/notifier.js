(function (angular, tst) {
    'use strict';

    /**
     * Provides a basic eventing mechanism which can broadcast and subscribe to application wide events.
     * Abstracts Angular's RootScope emitter. 
     */
    angular.module(tst.modules.core.name).factory(tst.modules.core.services.notifier, [
        'toastr',
        function (toastr) {

            var options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": true,
                "positionClass": "toast-top-right",
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
            },

            errOptions = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "positionClass": "toast-top-right",
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "0",
                "extendedTimeOut": "1000",
            };


            /**
             * err
             */
            error = function(title, message) {
                toastr.options = errOptions;
                toastr.error(message, title);
            };

            /**
             * success
             */
            success = function(title, message) {
                toastr.options = options;
                toastr.success(message, title);
            };

            /**
             * info
             */
            info = function(title, message) {
                toastr.options = options;
                toastr.info(message, title);
            };

            return {
                error: error,
                success: success,
                info: info
            };
        }
    ]);
}(angular, tst));

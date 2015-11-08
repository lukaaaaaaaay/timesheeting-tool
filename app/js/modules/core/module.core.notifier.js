(function (angular, tst) {
    'use strict';

    /*
     * Toastr config
     */
    angular.module(tst.modules.core.name).config(function(toastrConfig) {

        // Default options for toastr container
        var toastrOpt = {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,    
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
        },

        // default options for toasts
        toastOpt = {
            allowHtml: false,
            closeButton: false,
            closeHtml: '<button>&times;</button>',
            extendedTimeOut: 1000,
            iconClasses: {
              error: 'toast-error',
              info: 'toast-info',
              success: 'toast-success',
              warning: 'toast-warning'
            },  
            messageClass: 'toast-message',
            onHidden: null,
            onShown: null,
            onTap: null,
            progressBar: false,
            tapToDismiss: true,
            templates: {
              toast: 'directives/toast/toast.html',
              progressbar: 'directives/progressbar/progressbar.html'
            },
            timeOut: 5000,
            titleClass: 'toast-title',
            toastClass: 'toast'
        };

        // extend toastr config
        angular.extend(toastrConfig, toastrOpt);
        angular.extend(toastrConfig, toastOpt);
    });

}(angular, tst));

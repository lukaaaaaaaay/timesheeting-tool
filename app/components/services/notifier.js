(function() {
	'use strict';

	var notifier = angular.module('tsm.notifier', []);

	notifier.factory('notifier', function () {
	
		var options = {
			"closeButton": false,
  			"debug": false,
  			"newestOnTop": true,
  			"positionClass": "toast-top-right",
  			"showDuration": "300",
  			"hideDuration": "1000",
  			"timeOut": "5000",
  			"extendedTimeOut": "1000",
		};

		var errOptions = {
			"closeButton": true,
  			"debug": false,
		  	"newestOnTop": true,
		  	"positionClass": "toast-top-right",
		  	"showDuration": "300",
		  	"hideDuration": "1000",
		  	"timeOut": "0",
		  	"extendedTimeOut": "1000",
		};

    	return {
    		error: function(title, message) {
    			toastr.options = errOptions;
    			toastr.error(message, title);
    		},
    		success: function(title, message) {
    			toastr.options = options;
    			toastr.success(message, title);
    		},
    		info: function(title, message) {
    			toastr.options = options;
    			toastr.info(message, title);
    		}
    	};
	});
})();
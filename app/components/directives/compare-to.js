/**
 * CompareTo
 *
 * @description :: Angular directive used to compare two form fields together, 
 * 				   to ensure they are the same.
 */

(function() {
	'use strict'

	var compareTo =  function() {
	    return {
	        require: "ngModel",
	        scope: {
	            otherModelValue: "=compareTo"
	        },
	        link: function(scope, element, attributes, ngModel) {
	             
	            ngModel.$validators.compareTo = function(modelValue) {
	                return modelValue == scope.otherModelValue;
	            };
	 
	            scope.$watch("otherModelValue", function() {
	                ngModel.$validate();
	            });
	        }
	    }
	};

	angular.module("tsm.compareTo", []);
	angular.module("tsm.compareTo").directive("compareTo" , compareTo);
})();
(function (angular, tst) {
    'use strict';

    /**
     * Directive for securing UI Elements
     * Hide/Show element based on users role.
     */
    angular.module(tst.modules.auth.name).directive(tst.modules.auth.directives.access, [
        tst.modules.auth.services.authorization,
        function (authorization) {
            return {
              restrict: 'A',
              link: function (scope, element, attrs) {
                  var makeVisible = function () {
                          element.removeClass('hidden');
                      },
                      makeHidden = function () {
                          element.addClass('hidden');
                      },
                      determineVisibility = function (resetFirst) {
                          var result;
                          if (resetFirst) {
                              makeVisible();
                          }

                          result = authorization.authorize(true, roles, attrs.accessRoleType);

                          if (result === tst.modules.auth.enums.authorised.authorised) {
                              makeVisible();
                          } else {
                              makeHidden();
                          }
                      },
                      roles = attrs.access.split(',');


                  if (roles.length > 0) {
                      determineVisibility(true);
                  }
              }
            };
        }]);
}(angular, tst));
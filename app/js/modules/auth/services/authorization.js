(function (angular, tst) {
    'use strict';

    /*
     * Handles authorization/acl.
     */
    angular.module(tst.modules.auth.name).factory(tst.modules.auth.services.authorization, [
    tst.modules.auth.services.authentication,
    function (authentication) {
        
     /*
      * Checks if the current user is permitted to access the resource
      */
     var authorize = function (loginRequired, requiredRoles, roleCheckType) {
        var result = tst.modules.auth.enums.authorised.authorised,
            user = authentication.getCurrentLoginUser(),
            loweredRoles = [],
            hasRole = true,
            role, i;

        // Default to 'atLeastOne'
        roleCheckType = roleCheckType || tst.modules.auth.enums.roleCheckType.atLeastOne;

        // If login is required, and no user exists, then login is required.
        if (loginRequired === true && user === undefined) {
            result = tst.modules.auth.enums.authorised.loginRequired;
        // Otherwise, if Login is required and a user exists but no specific roles are nessesary, then allow...
        } else if ((loginRequired === true && user !== undefined) &&
            (requiredRoles === undefined || requiredRoles.length === 0)) {
            result = tst.modules.auth.enums.authorised.authorised;
        // Otherwise,
        } else if (requiredRoles) {
            loweredRoles = [];

            if (user) {
                angular.forEach(user.roles, function (role) {
                    loweredRoles.push(role.toLowerCase());
                });
            }

            for (i = 0; i < requiredRoles.length; i += 1) {
                role = requiredRoles[i].toLowerCase();
                // if all the roles are required and hasRole is false there is no point carrying on
                if (roleCheckType === tst.modules.auth.enums.roleCheckType.combinationRequired) {
                    hasRole = hasRole && roleCheckType.indexOf(role) > -1;
                    if (hasRole === false) {
                        break;
                    }
                // if we only need one of the roles and we have it there is no point carrying on
                } else if (roleCheckType === tst.modules.auth.enums.roleCheckType.atLeastOne) {
                    hasRole = loweredRoles.indexOf(role) > -1;
                    if (hasRole) {
                        break;
                    }
                }
            }
            // We're finished! So... Are we authorised or not?
            result = hasRole ? tst.modules.auth.enums.authorised.authorised : tst.modules.auth.enums.authorised.notAuthorised;
        }

        return result;
    };

        return {
         authorize: authorize
        };
    }]);
}(angular, tst));
(function (angular, tst) {
    'use strict';

angular.module(tst.modules.auth.name).factory(tst.modules.auth.services.authorization, [
'authentication',
function (authentication) {

 var authorize = function (loginRequired, requiredRoles, roleCheckType) {
    var result = tst.modules.auth.enums.authorised.authorised,
        user = authentication.getCurrentLoginUser(),
        loweredRoles = [],
        hasRole = true,
        role, i;

    roleCheckType = roleCheckType || tst.modules.auth.enums.roleCheckType.atLeastOne;

    if (loginRequired === true && user === undefined) {
        result = tst.modules.auth.enums.authorised.loginRequired;
    } else if ((loginRequired === true && user !== undefined) &&
        (requiredRoles === undefined || requiredRoles.length === 0)) {
        // Login is required but no specific roles are specified.
        result = tst.modules.auth.enums.authorised.authorised;
    } else if (requiredRoles) {
        loweredRoles = [];

        angular.forEach(user.roles, function (role) {
            loweredRoles.push(role.toLowerCase());
        });

        for (i = 0; i < requiredRoles.length; i += 1) {
            role = requiredRoles[i].toLowerCase();

            if (roleCheckType === tst.modules.auth.enums.roleCheckType.combinationRequired) {
                hasRole = hasRole && roleCheckType.indexOf(role) > -1;
                // if all the roles are required and hasRole is false there is no point carrying on
                if (hasRole === false) {
                    break;
                }
            } else if (roleCheckType === tst.modules.auth.enums.roleCheckType.atLeastOne) {
                hasRole = loweredRoles.indexOf(role) > -1;
                // if we only need one of the roles and we have it there is no point carrying on
                if (hasRole) {
                    break;
                }
            }
        }

        result = hasRole ? tst.modules.auth.enums.authorised.authorised : tst.modules.auth.enums.authorised.notAuthorised;
    }

    return result;
};

    return {
     authorize: authorize
    };
}]);
}(angular, tst));
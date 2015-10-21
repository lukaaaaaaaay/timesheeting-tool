    var roles  = ["public", "staff", "admin"]; // an array of roles in system
    var rules  = {}; // todo: get roles from database
    var routes = {}; // 
    var defaultRole; // 
    var currentRole; //
    var defaultPolicy = "allow";
    var acl = {};

    acl.checkRouteRegEx = function (resource, routes) {
        var result = null;
        for (var route in routes)
        {
            if (route.indexOf(":") != -1 || route.indexOf("*") != -1)
            {
                var parts = route.split(":");
                for (var i = 1; i < parts.length - 1; i++)
                {
                    parts[i] = "(.*)/";

                }
                parts[i]     = "(.*)";
                var regExStr = parts.join("");
                var regEx    = new RegExp(regExStr);
                if (regEx.test(resource))
                {
                    result = routes[route];
                    break;
                }
            }
        }

        return result;
    };

    /**
     *
     */
    acl.retrieveResource = function (resource) {
        var result = null;

        if (typeof sails.config.routes[resource] != "undefined")
        {
            result = sails.config.routes[resource];
        }
        else
        {
            result = this.checkRouteRegEx(resource, sails.config.routes);
        }

        return result;
    };

    /**
     *
     */
    acl.isAllowed = function (role, resourceName, method) {
        var isAllowed;

        if (role == null || role == "")
        {
            role = defaultRole;
        }

        var resource = this.retrieveResource(method + " " + resourceName);

        //No ACL define so it's the default behavior
        if (resource == null || (resource != null && typeof resource.roles == "undefined")) {
            isAllowed = defaultPolicy == "allow";
        }
        else {
            if (resource.roles.indexOf(role) == -1) {
                isAllowed = false;
            }
            else {
                isAllowed = true;
            }
        }

        return isAllowed;
    };
         
    /**
     *
     */
    module.exports = acl;
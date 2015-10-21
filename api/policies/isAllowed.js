var acl = require("../services/acl.js");
// ACL Hook verification
module.exports = function (req, res, next) {
    var role     = req.currentRole || "public";

    sails.log.debug("role is: " + role);

    if ( acl.isAllowed(role, req.url, req.method) ) {
        sails.log.debug("is allowed");
        return next();
    } else {
        sails.log.debug("is not allowed");
        res.forbidden();
    }

}
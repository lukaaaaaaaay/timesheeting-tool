var acl = require("../services/acl.js");
// ACL Hook verification
module.exports = function (req, res, next) {
    var resource = req.url;
    var role     = req.currentRole || "public";

    if ( acl.isAllowed(role, resource, req.method) ) {
        sails.log.debug("is allowed");
        return next();
    } else {
        sails.log.debug("is not allowed");
        res.forbidden();
    }

}
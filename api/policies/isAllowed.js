var acl = require("../services/acl.js");
// ACL Hook verification
module.exports = function (req, res, next) {
    var role     = null;

    if (req.currentRole) {
        role = req.currentRole.name;    //todo: pass the entire object into acl.isAllowed(), not just the name
    }

    if ( acl.isAllowed(role, req.url, req.method) ) {
        sails.log.info(role + " is allowed to access " + req.method + " " + req.url);
        return next();
    } else {
        sails.log.info(role + " is not allowed to access " + req.method + " " + req.url);
        res.forbidden();
    }

}
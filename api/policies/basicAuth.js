var localProtocol = require('../services/protocols/local');
/**
 * basicAuth
 *
 * If HTTP Basic Auth credentials are present in the headers, then authenticate the
 * user for a single request.
 */
module.exports = function (req, res, next) {
  var auth = req.headers.authorization;
  if (!auth || auth.search('Basic ') !== 0) {
    return next();
  }
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.status(403).json({ error: 'https required for basic auth. refusing login request' });
  }

  var authString = new Buffer(auth.split(' ')[1], 'base64').toString();
  var email = authString.split(':')[0];
  var password = authString.split(':')[1];

  sails.log.silly('authenticating', email, 'using basic auth:', req.url);

  localProtocol.login(req, email, password, function (error, user, passport) {
    if (error) {
      return next(error);
    }
    if (!user) {
      req.authenticated = false;
      return next();
    }

    // We have logged in...
    // Add user object, passport object, authenticated flag and currentRole to the request
    req.user = user;
    req.authenticated = true;
    req.passport = passport;
    req.currentRole = null;

    // get the role object
    Role.findOne({id: req.user.roleId }).exec(function findOneCB(err, found){
      if (err) return next(err);
      if (found) {
        req.currentRole = found;
      }
      next();
    });

  });
};
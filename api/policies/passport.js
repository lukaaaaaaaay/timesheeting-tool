var passport = require('passport');

/**
 * Passport Middleware
 *
 * Policy for Sails that initializes Passport.js
 *
 * For more information on the Passport.js middleware, check out:
 * http://passportjs.org/guide/configure/
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
var http = require('http');
var methods = ['login', 'logIn', 'logout', 'logOut', 'isAuthenticated', 'isUnauthenticated'];

module.exports = function (req, res, next) {
  var passport = sails.services.passport;

  // Initialize Passport
  passport.initialize()(req, res, function () {
    // Use the built-in sessions
    // passport.session()(req, res, function () {

      // Make the request's passport methods available for socket
      // if (req.isSocket) {
      //   _.each(methods, function (method) {
      //     req[method] = http.IncomingMessage.prototype[method].bind(req);
      //   });
      // }

      // Make the user available throughout the frontend
      // res.locals.user = req.user;

      next();
    // });
  });
};
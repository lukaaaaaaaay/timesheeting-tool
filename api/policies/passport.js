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

module.exports = function (req, res, next) {
  var passport = sails.services.passport;

  // Initialize Passport
  passport.initialize()(req, res, function () {

      next();
  });
};
/**
 * Authentication Controller
 */
module.exports = {

  /**
   * Log out a user and return success json
   */
  logout: function (req, res) {
    // todo
  },

  /**
   * Create a third-party authentication endpoint
   *
   * @param {Object} req
   * @param {Object} res
   */
  provider: function (req, res) {
    // TODO
    //sails.services.passport.endpoint(req, res);
  },

  /**
   * Create a authentication callback endpoint
   *
   * This endpoint handles everything related to creating and verifying Pass-
   * ports and users, both locally and from third-aprty providers.
   *
   * Passport exposes a login() function on req (also aliased as logIn()) that
   * can be used to establish a login session. When the login operation
   * completes, user will be assigned to req.user.
   *
   * For more information on logging in users in Passport.js, check out:
   * http://passportjs.org/guide/login/
   *
   * @param {Object} req
   * @param {Object} res
   */
  callback: function (req, res) {
    function tryAgain (err) {
      // todo what happens if there is an error in auth?
      res.forbidden(err);
    }

      sails.services.passport.callback(req, res, function (err, user) {

      if (err || !user) {
        sails.log.warn(err);
        return tryAgain();
      }

      console.log("logging in");

      req.login(user, function (err) {
        if (err) {
          sails.log.warn(err);
          return tryAgain();
        }

        req.session.authenticated = true;

        sails.log.info('user', user, 'authenticated successfully');

        // Returns the logged in user.
        return res.json(user);
      });
    });
  },

  /**
   * Disconnect a passport from a user
   *
   * @param {Object} req
   * @param {Object} res
   */
  disconnect: function (req, res) {
    sails.services.passport.disconnect(req, res);
  }
};
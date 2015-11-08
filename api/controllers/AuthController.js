/**
 * Authentication Controller
 */
module.exports = {

  /**
   * Log out an account and return success
   */
  logout: function (req, res) {
    // todo
      req.logout();
      delete req.user;
      delete req.passport;
      req.authenticated = false;

      res.ok();
  },

  /**
   * Create a third-party authentication endpoint
   *
   * @param {Object} req
   * @param {Object} res
   */
  provider: function (req, res) {
    sails.services.passport.endpoint(req, res);
  },

  /**
   * Create a authentication callback endpoint
   *
   * This endpoint handles everything related to creating and verifying Pass-
   * ports and accounts, both locally and from third-aprty providers.
   *
   * Passport exposes a login() function on req (also aliased as logIn()) that
   * can be used to establish a login session. When the login operation
   * completes, accounts will be assigned to req.account.
   *
   * For more information on logging in users in Passport.js, check out:
   * http://passportjs.org/guide/login/
   *
   * @param {Object} req
   * @param {Object} res
   */
  callback: function (req, res) {
    var action = req.param('action');

    function negotiateError (err) {
        res.forbidden();
    };

    sails.services.passport.callback(req, res, function (err, user) {
      console.log("err " + err);
      console.log("user " + user);
      if (err || !user) {
        sails.log.warn(user, err);
        return negotiateError(err);
      }

      req.login(user, function (err) {
        if (err) {
          sails.log.warn(err);
          return negotiateError(err);
        }

        req.authenticated = true;

        sails.log.info('user', user, 'authenticated successfully');
        return res.json(user);
      });
    });
  },

  /**
   * Disconnect a passport from an account
   *
   * @param {Object} req
   * @param {Object} res
   */
  disconnect: function (req, res) {
    sails.services.passport.disconnect(req, res);
  }
};
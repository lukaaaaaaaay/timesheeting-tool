/**
 * UserController
 *
 * @description :: Server-side logic for managing Users in our system
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * Create a new user
     *
     * @param {Object} req
     * @param {Object} res
     */
    create: function (req, res) {
        sails.services.passport.protocols.local.register(req.body, function (err, user) {
          if (err) return res.negotiate(err);

          res.ok(user);
        });
      },

    /**
     * If the user is authorized, let them through.
     *
     * @param {Object} req
     * @param {Object} res
     */
    me: function (req, res) {
        if(req.user) {
            res.ok(req.user);
        } else {
            res.forbidden();
        }
    }
};


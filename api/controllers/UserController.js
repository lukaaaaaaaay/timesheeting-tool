/**
 * AccountController
 *
 * @description :: Server-side logic for managing Accounts in our system
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /** GET /api/users/ **/
    find: function (req, res, next) {
        User.find(function foundUsers(err, users) {
            if (err) return next(err);
            // pass the array down to the client
            res.json(users);
        });
    },

    /** GET /api/users/:id **/
    // findOne: function (req, res, next) {
        //TODO. Find an account
    // },


    /** POST /api/users/ **/
    create: function (req, res, next) {
        sails.services.passport.protocols.local.register(req.body, function (err, user) {
          if (err) return res.negotiate(err);

          console.log("created: " + user);

          res.ok(user);
        });
      },

    /** PUT /api/users/:id **/
    // update: function (req, res, next) {
        //TODO. Update an account
    // },

    /** DEL /api/users/:id **/
    // destroy: function (req, res, next) {
        //TODO. Delete an account. 
    // },

    me: function (req, res) {
      res.ok(req.user);
    }
};


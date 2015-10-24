/**
 * UserController
 *
 * @description :: Server-side logic for managing Users in our system
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * Return all the Users in the system
     *
     * @param {Object} req
     * @param {Object} res
     */
    find: function (req, res) {
        User.find({}, function(err, users) {
            if (err) return res.negotiate(err);

            if(users.length == 0) {
                sails.log.warn("successful transaction but no users found..");
            }
            else {
                sails.log.info(users.length + " users found");
            }
            res.ok(users);
        })
    },

        /**
     * Return a single User matching the supplied Id
     *
     * @param {Object} req
     * @param {Object} res
     */
    findOne: function(req, res) {
        User.findOne(req.param('id'), function(err, users) {
            if (err) return res.negotiate(err);

            if(!users) {
                res.notFound('No User with the id ' + req.param('id') + ' found');
            }
            else {
                sails.log.info('User Found: ' + users.fullName);
                res.ok(users);
            }
            
        });
    },

    /**
     * Create a new user
     *
     * @param {Object} req
     * @param {Object} res
     */
    create: function (req, res) {
        // todo
        if (!req.user) {
          this.createDirector(req, res);
        } else {
          createStaff(req, res);
        }
    },

    /**
     * Create a new user
     *
     * @param {Object} req
     * @param {Object} res
     */
    createStaff: function (req, res) {
        // todo
        res.forbidden();
    },

      /**
       * Create a new user
       *
       * @param {Object} req
       * @param {Object} res
       */
      createDirector: function (req, res) {
          sails.services.passport.protocols.local.register(req.body, function (err, user) {
            if (err) return res.negotiate(err);

            // find the director role
            Role.findOne({name: 'director' }).exec(function findOneCB(err, found){
              if (err) return next(err);
              if (found) {
                // assign the director role to the created user
                user.role = found.id; // the role is the id we found
                user.save();  // save new user object
              }
              res.ok(user);
            });
          });
        },


      /**
       * Update an existing User
       *
       * @param {Object} req
       * @param {Object} res
       */
      update: function (req, res) {   
          User.update({id: req.body.id}, req.body, function(err, user) {
              if (err) return res.negotiate(err);

              if(!user) {
                  res.notFound('No User with the id ' + req.param('id') + ' found');
              }
              else {
                  sails.log.info('updated user: ' + user.email);
                  res.ok(user);
              }
              
          });
      },

      /**
       * Delete an existing User
       *
       * @param {Object} req
       * @param {Object} res
       */
      destroy: function (req, res, next) {

        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next('User doesn\'t exist.');
            User.destroy(req.param('id'), function userDestroyed(err) {
                   if (err) return next(err);
                   res.ok(user.email + " has been destroyed");
            })
        })
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

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
     * Return all the Users in the system associated with a particular company
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllForCompany: function (req, res) {
        User.find({companyId: req.param('id')}, function (err, users) {
          if (err) return res.negotiate(err);

          if(users && users.length == 0) {
              sails.log.warn("successful transaction but no users found..");
          }
          else {
              sails.log.info(users.length + " users found");
          }

          res.ok(users);
        });
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
        if (!req.user) {
          this.createDirector(req, res);
        } else {
          console.log(req.user.email + " is creating a new staff:")
          this.createStaff(req, res);
        }
    },

    /**
     * Create a new staff user
     *
     * @param {Object} req
     * @param {Object} res
     */
    createStaff: function (req, res) {
        // todo
        var user;

        user = req.allParams();

        // If no user is logged in, return 400 error.
        if(!req.user)
          return res.badRequest("You need to login to create a user");

        // Default to staff role if no specific roleId is passed.
        // TODO: Check if loggedin user can create a user with the passed-in role. 
             // (a director shouldn't be able to assign a user as an admin)
        if(!user.roleId)
          user.roleId = 4;  // todo: remove this hardcode

        // set the createdBy attribute to the logged in user
        if(!user.createdBy)
          user.createdBy = req.user;

        // set the company attribute to the logged in user's company
        if(!user.companyId)
          user.companyId = req.user.companyId;

        User.createUser(user)
          .then(function (user) {
            sails.log('created new staff user', user);    
            return res.ok(user); 
          })
          .catch(function (error) {
            sails.log.error(error);
            return res.badRequest(error);
          });

    },

      /**
       * Create a new director user
       *
       * @param {Object} req
       * @param {Object} res
       */
      createDirector: function (req, res) {
        var user;

        user = req.allParams();
        
        if(!user.roleId)
          user.roleId = 2;  // todo: remove this hardcode

        User.register(user)
          .then(function (user) {
            sails.log('created new director', user);
            return res.ok(user);
          })
          .catch(function (error) {
            sails.log.error(error);
            return res.badRequest(error);
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
                  sails.log.info('updated user: ' + user[0].email);
                  res.ok(user[0]);
              }
              
          });
      },

      /**
       * Confirm a users activation token. Step 1 in activate account process.
       *
       * @param {Object} req
       * @param {Object} res
       */
       activateAccount: function(req, res) {
        var email = req.body.email;
        var token = req.body.token

        // find user by email
        User.findOne(email, function (err, user) {
          if (err) return next(err);
          if (!user) return next(err);
          //check if the token matches the users resetToken
          if(user.passwordResetToken.value === token) {
            res.ok(user);
          } else {
            res.badRequest();
          }
          if
        });
       },

      /**
       * Confirm an existing User's password. Step 1 in logged in reset password process.
       *
       * @param {Object} req
       * @param {Object} res
       */
       confirmPassword: function(req, response, next) {
        
          var password = req.body.password;
          var userId = req.body.userId
          User.findOne(userId, function (err, user) {
            if (err) return next(err);
          

            if (!user) return next(err);
      
            sails.models.passport.findOne({
              protocol: 'local', user: user.id }, function (err, passport) {
              if (passport) {
                passport.validatePassword(password, function (err, res) {
                  if (err) {
                    return next(err);
                  }

                  if (!res) {
                    return next(req.__('Error.Passport.Password.Wrong'));
                  } else {
                    return response.ok();
                  }
                });
              }
              else {
                return next(req.__('Error.Passport.Password.NotSet'));
              }
            });
          });
       },

      /**
       * Reset a users Password.
       *
       * @param {Object} req
       * @param {Object} res
       */
       resetPassword: function(req, response, next) {
          var password = req.body.newPassword;
          User.findOne(req.body.userId, function(err, user) {
            if (err) return next(err);

            if (!user) return next(err);
            // find users current passport 
            sails.models.passport.findOne({
              protocol: 'local', user: user.id }, function (err, passport) {
                
              if (passport) {
                //update the password and hash
                passport.password = password;
                passport.save(passport, function (err, res) {
                  if (err) {
                    return next(err);
                  }
                  
                  if (!res) {
                    return next(req.__('Error.Passport.Password.NotSet'));
                  } else {
                    return response.ok();
                  }
                });
              }
              else {
                return next(req.__('Error.Passport.Password.NotSet'));
              }
            });
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

var Gravatar = require('machinepack-gravatar');
var Promise = require('promise');

/**
 * User Model
 *
 * The User model handles the account details of everyone who uses this
 * system.
 */

var User = {
  tableName: 'users',

  attributes: {

    // A firstName and lastName are used to generate a fullName,
    // which is used to refer to a User,
    firstName: {type: 'string', required: true},
    lastName: {type: 'string', required: true},

    // An email is used to authenticate a user, along with a password.
    email: {type: 'email', unique: true, index: true, required: true},

    createdBy: {
      model: 'User'
    },

    // A user can only have one role
    roleId: { model: 'Role', required: true},

    companyId: {
        model: 'Company'
    },

    departmentId: {
      model: 'Department'
    },

    // Associations (aka relational attributes)

    // A user can have many passports
    passports: {collection: 'Passport', via: 'user'},


    passwordResetToken: { type: 'json' },

    // A user can have many tasks - need to make many-many relationship so we can query properly. 
    tasks: {collection: 'Task', via: 'users'},

    // organizations: {},

    getGravatarUrl: function () {
      return Gravatar.getImageUrl({
        emailAddress: this.email,
        gravatarSize: 400,
        rating: 'g',
        useHttps: true,
      }).execSync();
    },

    getUserTasks: function () {
      return this.tasks;
    },

    getFullName: function (){
        return this.firstName + ' ' + this.lastName;
    },

    generatePasswordResetToken: function(cb) {
      this.passwordResetToken = Token.generate();
      this.save(function (err) {
        if(err) return cb(err);
        cb();
      });
    },


    toJSON: function () {
      var user = this.toObject();
      user.gravatarUrl = this.getGravatarUrl();
      user.fullName = this.getFullName();
      user.companyId = this.companyId;
      // delete user.passwordResetToken;
      delete user.password;
      delete user.confirmPassword;
      delete user.passports;
      return user;
    }
  },

  /**
   * Register a new user
   * Returns a promise.
   *
   * @param {Object}   user The soon-to-be-created User
   */
  register: function (user) {
    return new Promise(function (resolve, reject) {
      sails.services.passport.protocols.local.createUser(user, function (error, created) {
        if (error) return reject(error);

        resolve(created);
      });
    });
  },



  /**
   * Create a new user
   * Returns a promise.
   *
   * @param {Object}   user The soon-to-be-created User
   */
  createUser: function (user) {
    return new Promise(function (resolve, reject) {
      sails.models.user.create(user, function (err, created) {
          if (err) sails.log(err);

          // Generate activation token
          // Will generate an object with a token value and the time it was issuedAt
          // eg. { value: 'affe6049-84ea-4ba4-be48-a8eae3903ddd', issuedAt: '2015-11-24T02:39:37.085Z' } 
          created.generatePasswordResetToken(function (err) {
              resolve(created);
          });

          // todo: when a user enters password, connect passport to user
          //services.protocols.local.connect(req, res, next)
      });
    });
  },

};

module.exports = User;
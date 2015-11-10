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

    // A role can only have one role (default is director at the moment)
    roleId: { model: 'Role', required: true, defaultsTo: 2},

    companyId: {
        model: 'Company'
    },

    departmentId: {
      model: 'Department'
    },

    // Associations (aka relational attributes)

    // A user can have many passports
    passports: {collection: 'Passport', via: 'user'},

    // A user can have many tasks - need to make many-many relationship so we can query properly. 
    tasks: {collection: 'Task', via: 'members'},

    // organizations: {},

    getGravatarUrl: function () {
      return Gravatar.getImageUrl({
        emailAddress: this.email,
        gravatarSize: 400,
        rating: 'g',
        useHttps: true,
      }).execSync();
    },

    getFullName: function (){
        return this.firstName + ' ' + this.lastName;
    },

    toJSON: function () {
      var user = this.toObject();
      user.gravatarUrl = this.getGravatarUrl();
      user.fullName = this.getFullName();
      delete user.password;
      delete user.confirmPassword;
      delete user.passports;
      return user;
    }
  },

  /**
   * Register a new user with director permissions
   * Returns a promise.
   *
   * @param {Object}   user The soon-to-be-created User
   */
  register: function (user) {
    return new Promise(function (resolve, reject) {
      sails.services.passport.protocols.local.createUser(user, function (error, created) {
        if (error) return reject(error);

        Role.findOne({name: 'director' }).exec(function findOneCB(err, found){
              if (err) return next(err);
              console.log(found);
              if (found) {
                // assign the director role to the created user
                created.role = found.id; // the role is the id we found
                created.save();  // save new user object
              }
            });

        resolve(created);
      });
    });
  },

  /**
   * Register a new user with regular staff permissions
   * Returns a promise.
   *
   * @param {Object}   user The soon-to-be-created User
   */
  registerStaff: function (user) {
    return new Promise(function (resolve, reject) {
      sails.services.passport.protocols.local.createUser(user, function (error, created) {
        if (error) return reject(error);

        Role.findOne({name: 'staff' }).exec(function findOneCB(err, found){
              if (err) return next(err);
              if (found) {
                // assign the staff role to the created user
                created.role = found.id; 
                created.save(); 
              }
            });

        resolve(created);
      });
    });
  }

};

module.exports = User;
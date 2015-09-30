/**
 * User Model
 *
 * The User model handles the account details of everyone who uses this
 * system.
 */

var User = {
  attributes: {

    // A firstName and lastName are used to generate a fullName,
    // which is used to refer to a User,
    firstName: {type: 'string', required: true},
    lastName: {type: 'string', required: true},

    // An email is used to authenticate a user, along with a password.
    email: {type: 'email', unique: true, index: true, required: true},

    // A role can be 'admin'. 'director' etc.
    // TODO: make this an enum for slightly more security than a string?
    role: {type: 'string', enum: ['admin', 'director', 'staff']},

    // Associations (aka relational attributes)
    passports: {collection: 'Passport', via: 'user'},

    // organizations: {},

    getFullName: function (){
        return this.firstName + ' ' + this.lastName;
    },

    toJSON: function () {
      var user = this.toObject();
      // delete user.password;
      // delete user.passports;
      // user.gravatarUrl = this.getGravatarUrl();
      user.fullName = this.getFullName();
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
  }
};

module.exports = User;
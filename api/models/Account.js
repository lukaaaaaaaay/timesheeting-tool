/**
 * Account Model
 *
 * The Account model handles the account details of everyone who uses this
 * system.
 */
var Account = {
  attributes: {

    // A firstName and lastName are used to generate a fullName,
    // which is used to refer to an Account user,
    firstName: {type: 'string', required: true},
    lastName: {type: 'string', required: true},

    // An email is used to authenticate a user, along with a password.
    email: {type: 'email', unique: true, index: true, required: true},

    // A role can be 'admin'. 'director' etc.
    // TODO: make it an enum for slightly more security than a string?
    role: {type: 'string'},

    // Associations (aka relational attributes)
    passports: {collection: 'Passport', via: 'account'},

    // organizations: {},

    getFullName: function (){
        return this.firstName + ' ' + this.lastName;
    },

    toJSON: function () {
      var account = this.toObject();
      // delete account.password;
      // delete account.passports;
      // account.gravatarUrl = this.getGravatarUrl();
      account.fullName = this.getFullName();
      return account;
    }
  },

  /**
   * Register a new Account with a passport
   */
  register: function (account) {
    return new Promise(function (resolve, reject) {
      sails.services.passport.protocols.local.createAccount(account, function (error, created) {
        if (error) return reject(error);

        resolve(created);
      });
    });
  }

};

module.exports = Account;
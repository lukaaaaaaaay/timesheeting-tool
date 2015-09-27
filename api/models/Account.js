/**
* Account.js
*
* @description :: This model represents an account in the system
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    // Primitive attributes
    firstName: {
      type: 'string'
    },
    lastName: {
        type: 'string',
    },
    email: {
      type: 'email',
      unique: true,
      index: true
    },
    role: {
      type: 'string',
    },

    // Associations (aka relational attributes)

    // Attribute methods
    getFullName: function (){
        return this.firstName + ' ' + this.lastName;
    },

    /** INSTANCE METHODS **/
    toJSON: function () {
      var account = this.toObject();
      // delete account.password;
      // delete account.passports;
      // account.gravatarUrl = this.getGravatarUrl();
      account.fullName = this.getFullName();
      return account;
    }
  },

};


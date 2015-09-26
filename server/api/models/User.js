/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
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

    // Associations (aka relational attributes)

    // Attribute methods
    getFullName: function (){
        return this.firstName + ' ' + this.lastName;
    },

    /** INSTANCE METHODS **/
    // toJSON: function () {}
  },

};


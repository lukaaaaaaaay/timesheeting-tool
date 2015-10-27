/**
* Role.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  autoPK: true,
  autoCreatedBy: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    name: {
      type: 'string',
      index: true,
      notNull: true,
      unique: true
    },
    users: {
      collection: 'User',
      via: 'role'
    },
    // permissions: {
    //   type: 'array'
    // }
  }
};
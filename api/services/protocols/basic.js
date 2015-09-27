var localProtocol = require('./local');

module.exports = function (req, username, password, next) {
  sails.log('using basic auth strategy for activity', email, ', password', password);

  return localProtocol.login(req, email, password, next);
};
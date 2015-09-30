var localProtocol = require('./local');

module.exports = function (req, username, password, next) {
  sails.log('using basic auth strategy for account', email, ', password', password);

  return localProtocol.login(req, email, password, next);
};
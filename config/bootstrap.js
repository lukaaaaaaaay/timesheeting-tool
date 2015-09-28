/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  // Load Passport strategies
  sails.services.passport.loadStrategies();

  // setup initial test data

    User.register( {
      firstName: 'Admin', 
      lastName: 'User', 
      email: 'admin@example.org', 
      role: 'admin',
      token: '12345',
      password: 'password'
    } ).then(function (user) {
    sails.log('created new user', user);
  })
  .catch(function (error) {
    sails.log.error(error);
  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};

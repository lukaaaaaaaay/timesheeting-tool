var Sails = require('sails');
var request = require('supertest');
var sails;

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  Sails.lift({
    // configuration for testing purposes
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    // here you can load fixtures, etc.


    request(sails.hooks.http.app)
      .post('/api/users')
      .send({
        firstName: 'Existing', 
        lastName: 'User',
        email: 'existing.user@email.com',
        password: 'admin1234'
      })
      .end(function(err) {
        done(err, sails);
      });
    // done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});
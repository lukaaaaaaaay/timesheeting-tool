var assert = require('assert');
var request = require('supertest');
var _ = require('lodash');

describe('User Controller', function () {

  before(function (done) {
    request(sails.hooks.http.app)
      .post('/api/users')
      .send({
        firstName: 'Admin', 
        lastName: 'User', 
        email: 'me@mocha.test',
        password: 'admin1234',
        role: 'admin'
      })
      .expect(200)
      .end(function (err) {
        done(err);
      });
  });

  describe('#me()', function () {
    it('should return User for this authenticated request', function (done) {
        var agent = request.agent(sails.hooks.http.app);

        agent
          .get('/api/me')
          .auth('me@mocha.test', 'admin1234')
          .expect(200)
          .end(function (err, res) {
            var user = res.body;
            assert(_.isObject(user));
            assert.equal(user.email, 'me@mocha.test');
            done(err);
          });
    });
  });

  describe('#create()', function () {

    describe('http request', function () {

      it('should be able to create new user', function (done) {

        request(sails.hooks.http.app)
            .post('/api/users')
            .send({
              firstName: 'New', 
              lastName: 'User',
              role: 'admin',
              email: 'new.user@email.com',
              password: 'admin1234'
            })
            .expect(200)
            .end(function (err) {
              done(err);
            });

      });

      it('should return error if user already exists', function (done) {

        request(sails.hooks.http.app)
            .post('/api/users')
            .send({
              firstName: 'New', 
              lastName: 'User',
              role: 'admin',
              email: 'new.user@email.com',
              password: 'admin1234'
            })
            .expect(400)
            .end(function (err) {
              done(err);
            });

      });

    });
  });

  describe('#findOne()', function () {

    describe('http request', function () {

      var userId;

      it('should find user if they have been authenticated', function (done) {

        var agent = request.agent(sails.hooks.http.app);

        agent
            .post('/auth/local')
            .send({
              email: 'existing.user@email.com',
              password: 'admin1234'
            })
            .expect(200, function (err, res) {

              if (err)
                return done(err);

              userId = res.body.id;

              agent
                  .get('/api/users/' + userId)
                  .expect(200)
                  .end(function (err) {
                    done(err);
                  });
            });

      });

      // it('should not find user if they have logged out', function (done) {

      //   var agent = request.agent(sails.hooks.http.app);

      //   agent
      //       .get('/auth/logout')
      //       .expect(200, function (err, res) {

      //         if (err)
      //           return done(err);

      //         agent
      //             .get('/api/me')
      //             .expect(403)
      //             .end(function (err) {
      //               done(err);
      //             });
      //       });

      // });

    });


  });

});
var Sails = require('sails');
var assert = require('assert');
var request = require('supertest');
var _ = require('lodash');

describe('Project Controller', function () {

  var sails;

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(10000);

  Sails.lift({
    // configuration for testing purposes
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    // here you can load fixtures, etc.
    // request(sails.hooks.http.app)
    //   .post('/api/users')
    //   .send({
    //     firstName: 'Admin', 
    //     lastName: 'User', 
    //     email: 'me@mocha.test',
    //     password: 'admin1234',
    //     confirmPassword: 'admin1234',
    //     role: 1
    //   })
    //   .expect(200)
    //   .end(function (err) {
    //     done(err);
    // });

    request(sails.hooks.http.app)
      .post('/api/projects')
      .auth('me@mocha.test', 'admin1234')
      .send({
        id: 1,
        name: 'Test', 
        startDate: new Date(2015,10,30), 
        endDate: new Date(2015,11,30),
        projectManagerId: 1,
        statusId: 1,
        companyId: 1
      })
      .expect(200)
      .end(function (err) {
        done(err);
      });
    // done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});

  describe('#find()', function () {

    describe('http request', function () {

      it('should be able to find all projects', function (done) {

        request(sails.hooks.http.app)
            .get('/api/projects')
            .auth('me@mocha.test', 'admin1234')
            .expect(200)
            .expect(function (res) {
              res.body.length = 1;
            })
            .end(function (err) {
              done(err);
            });
      });
    });
  });

  describe('#findOne()', function () {

    describe('http request', function () {

      it('should be able to find a single project', function (done) {

        request(sails.hooks.http.app)
            .get('/api/projects/1')
            .auth('me@mocha.test', 'admin1234')
            .expect(200)
            .end(function (err, res) {
              var project = res.body;
              assert.equal(project.id, 1);
              assert.equal(project.name, 'Test');
              done(err);
            });
      });

      it('should throw an error if projects can not be found', function (done) {

        request(sails.hooks.http.app)
            .get('/api/projects/99')
            .auth('me@mocha.test', 'admin1234')
            .expect(404)
            .end(function (err) {
              done(err);
            });
      });
    });
  });

  describe('#create()', function () {

    describe('http request', function () {

      it('should be able to create new Project', function (done) {

        request(sails.hooks.http.app)
            .post('/api/projects')
            .auth('me@mocha.test', 'admin1234')
            .send({
              id: 2,
              name: 'Another Test', 
              startDate: new Date(2015,10,30), 
              endDate: new Date(2015,11,30),
              projectManagerId: 1,
              statusId: 1,
              companyId: 1
            })
            .expect(200)
            .end(function (err, res) {
              var project = res.body;
              assert.equal(project.id, 2);
              assert.equal(project.name, 'Another Test');
              done(err);
            });
      });

      it('should return error if posted data is invalid', function (done) {

        request(sails.hooks.http.app)
            .post('/api/projects')
            .auth('me@mocha.test', 'admin1234')
            .send({
              name: 'Test', 
              projectManagerId: 1,
              statusId: 1,
              companyId: 1
            })
            .expect(400)
            .end(function (err) {
              done(err);
            });
      });
    });
  });

// Test create function
  describe('#update()', function () {

    describe('http request', function () {

      it('should be able to update existing Company', function (done) {

        request(sails.hooks.http.app)
            .put('/api/projects/2')
            .auth('me@mocha.test', 'admin1234')
            .send({
              id: 2,
              name: 'Updated Test', 
              startDate: new Date(2015,10,30), 
              endDate: new Date(2015,11,30),
              projectManagerId: 1,
              statusId: 1,
              companyId: 1
            })
            .expect(200)
            .end(function (err, res) {
              var project = res.body;
              assert.equal(project.name, 'Updated Test');
              done(err);
            });
      });

      it('should return error if Project does not exist', function (done) {

        request(sails.hooks.http.app)
            .put('/api/projects/5')
            .auth('me@mocha.test', 'admin1234')
            .send({
              id: 5,
              name: 'Updated Test', 
              startDate: new Date(2015,10,30), 
              endDate: new Date(2015,11,30),
              projectManagerId: 1,
              statusId: 1,
              companyId: 1
            })
            .expect(404)
            .end(function (err) {
              done(err);
            });
      });
    });
  });

  describe('#findAllForCompany()', function () {

    describe('http request', function () {

      it('should be able to find all projects for a company', function (done) {

        request(sails.hooks.http.app)
            .get('/api/projects/company/1')
            .auth('me@mocha.test', 'admin1234')
            .expect(200)
            .end(function (err, res) {
              assert.equal(res.body.length, 2);
              done(err);
            });
      });
    });
  });

  describe('#findAllForProjectManager()', function () {

    describe('http request', function () {

      it('should be able to find all projects for a project manager', function (done) {

        request(sails.hooks.http.app)
            .get('/api/projects/manager/1')
            .auth('me@mocha.test', 'admin1234')
            .expect(200)
            .end(function (err, res) {
              assert.equal(res.body.length, 2);
              done(err);
            });
      });
    });
  });

  describe('#findAllForStatus()', function () {

    describe('http request', function () {

      it('should be able to find all projects for a status id', function (done) {

        request(sails.hooks.http.app)
            .get('/api/projects/status/1')
            .auth('me@mocha.test', 'admin1234')
            .expect(200)
            .end(function (err, res) {
              assert.equal(res.body.length, 2);
              done(err);
            });
      });
    });
  });

  describe('#destroy()', function () {

    describe('http request', function () {

      it('should be able to delete an existing Project', function (done) {

        request(sails.hooks.http.app)
            .delete('/api/projects/2')
            .auth('me@mocha.test', 'admin1234')
            .expect(200)
            .end(function (err) {
              done(err);
            });
      });
    });
  });
});
var Sails = require('sails');
var assert = require('assert');
var request = require('supertest');
var _ = require('lodash');

describe('Department Controller', function () {

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


    request(sails.hooks.http.app)
      .post('/api/companies')
      .send({
        id: 1,
        companyName: 'Test Company', 
        address: '1 Test Street', 
        suburb: 'Testville',
        state: 'VIC',
        country: 'Australia',
        postcode: '1234'
      })
      .expect(200);


      request(sails.hooks.http.app)
      .post('/api/departments')
      .send({
        id: 1,
        name: 'Test Department', 
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

      it('should be able to find all departments', function (done) {

        request(sails.hooks.http.app)
            .get('/api/departments')
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

      it('should be able to find a single department', function (done) {

        request(sails.hooks.http.app)
            .get('/api/departments/1')
            .expect(200)
            .end(function (err, res) {
              var department = res.body;
              assert.equal(department.id, 1);
              assert.equal(department.name, 'Test Department');
              done(err);
            });
      });

      it('should throw an error if department can not be found', function (done) {

        request(sails.hooks.http.app)
            .get('/api/departments/2')
            .expect(404)
            .end(function (err) {
              done(err);
            });
      });
    });
  });

  describe('#findAllByCompany()', function () {

    describe('http request', function () {

      it('should be able to find all the departments for a company', function (done) {

        request(sails.hooks.http.app)
            .get('/api/departments/company/1')
            .expect(200)
            .expect(function (res) {
              res.body.length = 1;
            })
            .end(function (err, res) {
              done(err);
            });
      });

      it('should throw an error if company does not exist', function (done) {

        request(sails.hooks.http.app)
            .get('/api/departments/company/2')
            .expect(404)
            .end(function (err) {
              done(err);
            });
      });
    });
  });



  // Test create function
  describe('#create()', function () {

    describe('http request', function () {

      it('should be able to create new Department', function (done) {

        request(sails.hooks.http.app)
            .post('/api/departments')
            .send({
              id: 2,
              name: 'Test Department 2', 
              companyId: 1,
            })
            .expect(200)
            .end(function (err, res) {
              var department = res.body;
              assert.equal(department.id, 2);
              assert.equal(department.name, 'Test Department 2');
              done(err);
            });
      });

      it('should return error if Department already exists', function (done) {

        request(sails.hooks.http.app)
            .post('/api/departments')
            .send({
              id: 1,
              name: 'Test Department', 
              companyId: 1, 
            })
            .expect(400)
            .end(function (err) {
              done(err);
            });
      });

      it('should return error if posted data is invalid', function (done) {

        request(sails.hooks.http.app)
            .post('/api/departments')
            .send({
              id: 3, 
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

      it('should be able to update existing Department', function (done) {

        request(sails.hooks.http.app)
            .put('/api/departments/1')
            .send({
              id: 1,
              name: 'Updated Test', 
              companyId: 1
            })
            .expect(200)
            .end(function (err, res) {
              var department = res.body[0];
              assert.equal(department.name, 'Updated Test');
              done(err);
            });
      });

      it('should return error if Department does not exist', function (done) {

        request(sails.hooks.http.app)
            .put('/api/departments/5')
            .send({
              id: 5,
              name: 'Test', 
              companyId: 1
            })
            .expect(404)
            .end(function (err) {
              done(err);
            });
      });
    });
  });

  // test destroy function
  describe('#destroy()', function () {

    describe('http request', function () {

      it('should be able to delete an existing Department', function (done) {

        request(sails.hooks.http.app)
            .delete('/api/departments/2')
            .expect(200)
            .end(function (err) {
              done(err);
            });
      });
    });
 });
});
var Sails = require('sails');
var assert = require('assert');
var request = require('supertest');
var _ = require('lodash');

describe('Company Controller', function () {

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
        companyName: 'Test', 
        address: '1 Test Street', 
        suburb: 'Testville',
        state: 'VIC',
        country: 'Australia',
        postcode: '1234'
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

      it('should be able to find all companies', function (done) {

        request(sails.hooks.http.app)
            .get('/api/companies')
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

      it('should be able to find a single company', function (done) {

        request(sails.hooks.http.app)
            .get('/api/companies/1')
            .expect(200)
            .end(function (err, res) {
              var company = res.body;
              assert.equal(company.id, 1);
              assert.equal(company.companyName, 'Test');
              done(err);
            });
      });

      it('should throw an error if company can not be found', function (done) {

        request(sails.hooks.http.app)
            .get('/api/companies/2')
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

      it('should be able to create new Company', function (done) {

        request(sails.hooks.http.app)
            .post('/api/companies')
            .send({
              id: 2,
              companyName: 'Another Test', 
              address: '2 Test Street', 
              suburb: 'Testville',
              state: 'VIC',
              country: 'Australia',
              postcode: '1234'
            })
            .expect(200)
            .end(function (err, res) {
              var company = res.body;
              assert.equal(company.id, 2);
              assert.equal(company.companyName, 'Another Test');
              done(err);
            });
      });

      it('should return error if Company already exists', function (done) {

        request(sails.hooks.http.app)
            .post('/api/companies')
            .send({
              id: 1,
              companyName: 'Test', 
              address: '1 Test Street', 
              suburb: 'Testville',
              state: 'VIC',
              country: 'Australia',
              postcode: '1234'
            })
            .expect(400)
            .end(function (err) {
              done(err);
            });
      });

      it('should return error if posted data is invalid', function (done) {

        request(sails.hooks.http.app)
            .post('/api/companies')
            .send({
              id: 3, 
              address: '3 Test Street', 
              suburb: 'Testville',
              state: 'VIC',
              country: 'Australia',
              postcode: '1234'
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
            .put('/api/companies/2')
            .send({
              id: 2,
              companyName: 'Updated Test', 
              address: '1 Test Street', 
              suburb: 'Testville',
              state: 'VIC',
              country: 'Australia',
              postcode: '1234'
            })
            .expect(200)
            .end(function (err, res) {
              var company = res.body[0];
              assert.equal(company.companyName, 'Updated Test');
              done(err);
            });
      });

      it('should return error if Company does not exist', function (done) {

        request(sails.hooks.http.app)
            .put('/api/companies/5')
            .send({
              id: 5,
              companyName: 'Test', 
              address: '1 Test Street', 
              suburb: 'Testville',
              state: 'VIC',
              country: 'Australia',
              postcode: '1234'
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

      it('should be able to delete an existing Company', function (done) {

        request(sails.hooks.http.app)
            .delete('/api/companies/2')
            .expect(200)
            .end(function (err) {
              done(err);
            });
      });
    });
  });
});
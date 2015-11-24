describe('registerCtrl', function() {
   var scope, controller, httpBackend;

   // Initialization of the AngularJS application before each test case
   beforeEach(module('tst'));

   // Injection of dependencies, $http will be mocked with $httpBackend
   beforeEach(inject(function($rootScope, $controller, $httpBackend) {
      scope = $rootScope;
      controller = $controller;
      httpBackend = $httpBackend;
   }));

   it('should register a user', function() {

   	var userToRegister = {...};

   	// todo: pass userToRegister to controller
   	// user actually created in authentication.js?
   });

});
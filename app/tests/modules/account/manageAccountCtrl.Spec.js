describe('manageAccountCtrl', function() {  
   var scope, controller, httpBackend;

   // Initialization of the AngularJS application before each test case
   beforeEach(module('tst'));

   // Injection of dependencies, $http will be mocked with $httpBackend
   beforeEach(inject(function($rootScope, $controller, $httpBackend) {
      scope = $rootScope;
      controller = $controller;
      httpBackend = $httpBackend;
   }));

   // it('should change a user\'s first name', function() {
   // 	var newFirstName = "";
   // });

   // it('should change a user\'s last name', function() {
   // 	var newLastName = "";
   // });

   // it('should change a user\'s email address', function() {
   // 	var newEmail = "";
   // });

   // it('should reset a user\'s password', function() {
   // });

   // it('should update a user\'s details', function() {
   // 	var updatedUser = {...};

   // 	// todo: pass updatedUser to controller
   // 	expect(scope.user).toEqual(updatedUser);
   // });

});
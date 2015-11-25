describe('resetPasswordCtrl', function() {
   var scope, controller, httpBackend;

   // Initialization of the AngularJS application before each test case
   beforeEach(module('tst'));

   // Injection of dependencies, $http will be mocked with $httpBackend
   beforeEach(inject(function($rootScope, $controller, $httpBackend) {
      scope = $rootScope;
      controller = $controller;
      httpBackend = $httpBackend;
   }));

	// it('should confirm a user\'s password', function() {
	// 	expect(scope.passwordConfirmed).toEqual(true);
	// });

	// it('should reset a user\'s password', function() {
	// 	expect(scope.passwordReset).toEqual(true);
	// });

	// it('should update a user\'s details', function() {
	// 	var updatedUser = {...};

	// 	//todo: pass updatedUser to controller
	// 	expect(scope.user).toEqual(updatedUser);
	// });

});
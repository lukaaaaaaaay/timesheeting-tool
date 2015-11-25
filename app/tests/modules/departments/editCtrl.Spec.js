describe('editCtrl', function() {
   var scope, controller, httpBackend;

   // Initialization of the AngularJS application before each test case
   beforeEach(module('tst'));

   // Injection of dependencies, $http will be mocked with $httpBackend
   beforeEach(inject(function($rootScope, $controller, $httpBackend) {
      scope = $rootScope;
      controller = $controller;
      httpBackend = $httpBackend;
   }));
   
	it('should update a department\'s details', function() {

		var updatedDepartment = {...};

		// todo: pass the updatedDepartment to the controller

		expect(scope.department).toEqual(updatedDepartment);
	});

	it('should delete a department', function() {

	});
});
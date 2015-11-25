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
   
	it('should update a timesheet\'s details', function() {

		var updatedTimesheet = {...};

		// todo: pass the updatedTimesheet to the controller

		expect(scope.timesheet).toEqual(updatedTimesheet);
	});

	it('should delete a timesheet', function() {

	});

	// it('should validate the start and end times', function() {
	// });
});
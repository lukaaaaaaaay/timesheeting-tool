describe('createCtrl', function() {
   var scope, controller, httpBackend;

   // Initialization of the AngularJS application before each test case
   beforeEach(module('tst'));

   // Injection of dependencies, $http will be mocked with $httpBackend
   beforeEach(inject(function($rootScope, $controller, $httpBackend) {
      scope = $rootScope;
      controller = $controller;
      httpBackend = $httpBackend;
   }));
   
	it('should create a timesheet', function() {

		var timesheetToCreate = {...};

		// todo: pass the timesheetToCreate to the controller

		expect(scope.timesheet).toEqual(timesheetToCreate);
	});

	it('should validate the start and end times', function() {

		var startTime, endTime;
	});
});
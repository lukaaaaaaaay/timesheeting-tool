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

		var timesheetToCreate = {
         startTime: '2015-11-04 14:00:00',
         endTime: '2015-11-06 14:00:00',
         userId: 2,
         statusId: 6,
         approvedBy: 2
         taskId: 1
      };

		// todo: pass the timesheetToCreate to the controller

		expect(scope.timesheet).toEqual(timesheetToCreate);
	});

	it('should validate the start and end times', function() {

		var startTime, endTime;
	});
});
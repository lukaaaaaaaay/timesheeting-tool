describe('viewCtrl', function() {
   var scope, controller, httpBackend;

   // Initialization of the AngularJS application before each test case
   beforeEach(module('tst'));

   // Injection of dependencies, $http will be mocked with $httpBackend
   beforeEach(inject(function($rootScope, $controller, $httpBackend) {
      scope = $rootScope;
      controller = $controller;
      httpBackend = $httpBackend;
   }));
   
	it('should delete a timesheet', function() {

	});

 	it('should return the status name', function() {

 		var statusId;
	});

	it('should format the date', function() {

		var date;
	});

	// it should display the selected timesheet's details
});
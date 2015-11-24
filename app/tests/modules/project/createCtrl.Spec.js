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
   
	it('should create a project', function() {

		var projectToCreate = {
			name: 'Test Project',
			description: 'This is a test',
			startDate: '2015-11-18 14:00:00',
			dueDate: '2015-12-01 14:00:00',
			statusId: 1,
			projectManagerId: 2,
			companyId: 1
		};

		// todo: pass the projectToCreate to the controller

		expect(scope.project).toEqual(projectToCreate);
	});

	it('should validate the start and due dates', function() {

		var startDate, endDate;
	});

	
});
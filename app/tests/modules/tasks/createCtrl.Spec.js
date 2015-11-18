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
   
	it('should create a task', function() {

		var taskToCreate = {
         name: 'Test Task',
         description: 'This is a test',
         startDate: '2015-11-04 14:00:00',
         dueDate: '2015-12-01 14:00:00',
         statusId: 2,
         createdBy: 2,
         projectId: 1
      };

		// todo: pass the taskToCreate to the controller

		expect(scope.task).toEqual(taskToCreate);
	});

	it('should validate the start and due dates', function() {

		var startDate, dueDate;
	});
});
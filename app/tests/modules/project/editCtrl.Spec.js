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
   
	it('should update a project\'s details', function() {

		var updatedProject = {...};

		// todo: pass the updatedProject to the controller

		expect(scope.project).toEqual(updatedProject);
	});

	it('should delete a project', function() {

	});

	it('should validate the start and due dates', function() {

		var startDate, dueDate;
	});

	it

});

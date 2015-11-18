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
   
	it('should create a department', function() {

		var departmentToCreate = {...};

		// todo: pass the departmentToCreate to the controller

		expect(scope.department).toEqual(departmentToCreate);
	});
});
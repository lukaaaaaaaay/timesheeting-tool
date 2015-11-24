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
   
	it('should create a staff member', function() {

		var staffToCreate = {
         firstName: 'John',
         lastName: 'Smith',
         email: 'johnsmith@test.com',
         createdBy: 1,
         roleId: 2,
         companyId: 1,
         departmentId: 1
      };

		// todo: pass the staffToCreate to the controller

		expect(scope.staff).toEqual(staffToCreate);
	});
});
describe ('createCtrl', function() {
   var scope, controller, httpBackend;

   // Initialization of the AngularJS application before each test case
   beforeEach(module('tst'));

   // Injection of dependencies, $http will be mocked with $httpBackend
   beforeEach(inject(function($rootScope, $controller, $httpBackend) {
      scope = $rootScope;
      controller = $controller;
      httpBackend = $httpBackend;
   }));

	it('should create a company', function() {

		var companyToCreate = {
         companyName: 'Google',
         description: 'Test Company',
         address: '123 Test Street',
         suburb: 'Suburb',
         state: 'TST',
         country: 'Australia',
         postcode: '1234',
         createdBy: 1,
         directorId: 1
      };

		// todo: pass the companyToCreate to the controller

		expect(scope.company).toEqual(companyToCreate);
	});
});
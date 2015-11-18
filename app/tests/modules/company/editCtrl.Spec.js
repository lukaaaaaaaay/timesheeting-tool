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
   
	it('should update a company\'s details', function() {
   	var updatedCompany = {...};

    	// todo: pass updatedCompany to controller

    	expect(scope.company).toEqual(updatedCompany);
	});
});
/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  // Auth Routes
  'GET /auth/logout': { //TODO: Should this be a POST?
    controller : 'AuthController',
    action     : 'logout',
    roles      : ["public"]
  },
  'POST /auth/local': {
    controller: 'AuthController',
    action: 'callback',
    roles: ["public"]
  },
  'POST /auth/local/:action': {
    controller: 'AuthController',
    action: 'callback',
    roles: ["public"]
  },
  // TODO: Third-party auth
  // 'get /auth/:provider': 'AuthController.provider',
  // 'get /auth/:provider/callback': 'AuthController.callback',
  // 'get /auth/:provider/:action': 'AuthController.callback',

  // User Routes
  'GET /api/me': {
    controller: 'UserController',
    action: 'me',
    roles: ["public"]
  },
  'GET /api/users': {
    controller : 'UserController',
    action     : 'find',
    roles      : ["admin"]
  },
  'POST /api/users': {
    controller : 'UserController',
    action     : 'create',
    roles      : ["public"]
  },
  'GET /api/users/:id': {
    controller : 'UserController',
    action     : 'findOne',
    roles      : ["admin"]
  },
  'PUT /api/users/:id': {
    controller : 'UserController',
    action     : 'update',
    roles      : ["admin"]
  },
  'DELETE /api/users/:id': {
    controller : 'UserController',
    action     : 'destroy',
    roles      : ["admin"]
  },


  // Company Routes
  'GET /api/companies': {
    controller : 'CompanyController',
    action     : 'find',
    roles      : ["admin"]
  },
  'POST /api/companies': {
    controller : 'CompanyController',
    action     : 'create',
    roles      : ["public"] // todo: only a 'director' can create a company
  },
  'GET /api/companies/director/:directorId': {
    controller : 'CompanyController',
    action     : 'findByDirectorId',
    roles      : ["admin"]
  },
  'PUT /api/companies/:id': {
    controller : 'CompanyController',
    action     : 'update',
    roles      : ["admin"]
  },
  'PUT /api/companies/:id': {
    controller : 'CompanyController',
    action     : 'update',
    roles      : ["admin"]
  },
  'DELETE /api/companies/:id': {
    controller : 'CompanyController',
    action     : 'destroy',
    roles      : ["admin"]
  },

  // Department Routes
  'GET /api/departments': {
    controller : 'DepartmentController',
    action     : 'find',
    roles      : ["admin"] 
  },
  'POST /api/departments': {
    controller : 'DepartmentController',
    action     : 'create',
    roles      : ["admin"] 
  },
  'GET /api/departments/company/:id': {
    controller : 'DepartmentController',
    action     : 'findAllByCompany',
    roles      : ["admin"] 
  },
  'GET /api/departments/:id': {
    controller : 'DepartmentController',
    action     : 'findOne',
    roles      : ["admin"]
  },
  'PUT /api/departments/:id': {
    controller : 'DepartmentController',
    action     : 'update',
    roles      : ["admin"]
  },
  'DELETE /api/departments/:id': {
    controller : 'DepartmentController',
    action     : 'destroy',
    roles      : ["admin"]
  }
};

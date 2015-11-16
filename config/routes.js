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
  'POST /auth/local': {
    controller: 'AuthController',
    action: 'callback'
  },
  'POST /auth/local/:action': {
    controller: 'AuthController',
    action: 'callback'
  },
  // TODO: Third-party auth
  // 'get /auth/:provider': 'AuthController.provider',
  // 'get /auth/:provider/callback': 'AuthController.callback',
  // 'get /auth/:provider/:action': 'AuthController.callback',

  // User Routes
  'GET /api/me': {
    controller: 'UserController',
    action: 'me',
    roles: ["admin", "director"]
  },
  'POST /api/me/confirmpw': {
    controller: 'UserController',
    action: 'confirmPassword',
    roles: ["admin", "director"]
  },
  'POST /api/me/resetpw': {
    controller: 'UserController',
    action: 'resetPassword',
    roles: ["admin", "director"]
  },
  'GET /api/users': {
    controller : 'UserController',
    action     : 'find',
    roles      : ["admin"]
  },
  'GET /api/users/company/:id' : {
    controller : 'UserController',
    action: 'findAllForCompany',
    roles: ["admin", "director"]
  },
  'POST /api/users': {
    controller : 'UserController',
    action     : 'create'
  },
  'GET /api/users/:id': {
    controller : 'UserController',
    action     : 'findOne',
    roles      : ["admin", "director"]
  },
  'PUT /api/users/:id': {
    controller : 'UserController',
    action     : 'update',
    roles      : ["admin", "director"]
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
    roles      : ["admin", "director"]
  },
  'GET /api/companies/director/:directorId': {
    controller : 'CompanyController',
    action     : 'findByDirectorId',
    roles      : ["admin", "director"]
  },
  'GET /api/companies/:id': {
    controller : 'CompanyController',
    action     : 'findOne',
    roles      : ["admin", "director"]
  },
  'PUT /api/companies/:id': {
    controller : 'CompanyController',
    action     : 'update',
    roles      : ["admin", "director"]
  },
  'DELETE /api/companies/:id': {
    controller : 'CompanyController',
    action     : 'destroy',
    roles      : ["admin"]
  },

  'GET /api/departments': {
    controller : 'DepartmentController',
    action     : 'find',
    roles      : ["admin"] 
  },
  'POST /api/departments': {
    controller : 'DepartmentController',
    action     : 'create',
    roles      : ["admin", "director"] 
  },
  'GET /api/departments/company/:id': {
    controller : 'DepartmentController',
    action     : 'findAllByCompany',
    roles      : ["admin", "director"] 
  },
  'GET /api/departments/:id': {
    controller : 'DepartmentController',
    action     : 'findOne',
    roles      : ["admin", "director"]
  },
  'PUT /api/departments/:id': {
    controller : 'DepartmentController',
    action     : 'update',
    roles      : ["admin", "director"]
  },
  'DELETE /api/departments/:id': {
    controller : 'DepartmentController',
    action     : 'destroy',
    roles      : ["admin", "director"]
  },

   // Project Routes
  'GET /api/projects': {
    controller : 'ProjectController',
    action     : 'find',
    roles      : ["admin"] 
  },
  'POST /api/projects': {
    controller : 'ProjectController',
    action     : 'create',
    roles      : ["admin", "director"]
  },
  'GET /api/projects/company/:id': {
    controller : 'ProjectController',
    action     : 'findAllForCompany',
    roles      : ["admin", "director"]
  },
  'GET /api/projects/manager/:id': {
    controller : 'ProjectController',
    action     : 'findAllForProjectManager',
    roles      : ["admin", "director"]
  },
  'GET /api/projects/status/:id': {
    controller : 'ProjectController',
    action     : 'findAllForStatus',
    roles      : ["admin", "director"]
  },
  'GET /api/projects/:id': {
    controller : 'ProjectController',
    action     : 'findOne',
    roles      : ["admin", "director"]
  },
  'PUT /api/projects/:id': {
    controller : 'ProjectController',
    action     : 'update',
    roles      : ["admin", "director"]
  },
  'DELETE /api/projects/:id': {
    controller : 'ProjectController',
    action     : 'destroy',
    roles      : ["admin", "director"]
  },

  // Status Routes
  'GET /api/statuses': {
    controller : 'ProjectController',
    action: 'findStatuses',
    //roles: ["admin", "director"] - uncomment when we have the other roles created.
  },
  'GET /api/statuses/:id': {
    controller : 'ProjectController',
    action: 'findStatus',
    //roles: ["admin", "director"] - uncomment when we have the other roles created.
  },  

  // Task Routes
  'GET /api/tasks': {
    controller : 'TaskController',
    action     : 'find',
    roles      : ["admin"]
  },
  'GET /api/tasks/project/:id': {
    controller : 'TaskController',
    action     : 'findAllForProject',
    roles      : ["admin", "director"]
  },
  'GET /api/tasks/user': {
    controller : 'TaskController',
    action     : 'findAllForUser',
    roles      : ["admin", "director"]
  },
  'GET /api/tasks/status/:id': {
    controller : 'TaskController',
    action     : 'findAllForStatus',
    roles      : ["admin", "director"]
  },
  'GET /api/tasks/:id': {
    controller : 'TaskController',
    action     : 'findOne',
    roles      : ["admin", "director"]
  },
  'POST /api/tasks': {
    controller : 'TaskController',
    action     : 'create',
    roles      : ["admin", "director"]
  },

  'PUT /api/tasks/:id': {
    controller : 'TaskController',
    action     : 'update',
    roles      : ["admin", "director"]
  },
  'DELETE /api/tasks/:id': {
    controller : 'TaskController',
    action     : 'destroy',
    roles      : ["admin"]
  },

  // Category Routes
  'GET /api/categories': {
    controller : 'CategoryController',
    action     : 'find',
    roles      : ["admin"]
  },
  'GET /api/categories/company/:id': {
    controller : 'CategoryController',
    action     : 'findAllForCompany',
    roles      : ["admin", "director"]
  },
  'GET /api/categories/:id': {
    controller : 'CategoryController',
    action     : 'findOne',
    roles      : ["admin", "director"]
  },
  'POST /api/categories': {
    controller : 'CategoryController',
    action     : 'create',
    roles      : ["admin", "director"]
  },
  'PUT /api/categories/:id': {
    controller : 'CategoryController',
    action     : 'update',
    roles      : ["admin", "director"]
  },
  'DELETE /api/categories/:id': {
    controller : 'CategoryController',
    action     : 'destroy',
    roles      : ["admin"]
  },

  // Timesheet Routes
  'GET /api/timesheets': {
    controller : 'TimesheetController',
    action     : 'find',
    roles      : ["admin"]
  },
  'GET /api/timesheets/task/:id': {
    controller : 'TimesheetController',
    action     : 'findAllForTask',
    roles      : ["admin", "director"]
  },
  'GET /api/timesheets/user/:id': {
    controller : 'TimesheetController',
    action     : 'findAllForUser',
    roles      : ["admin", "director"]
  },
  'GET /api/timesheets/status/:id': {
    controller : 'TimesheetController',
    action     : 'findAllForStatus',
    roles      : ["admin", "director"]
  },
  'GET /api/timesheets/:id': {
    controller : 'TimesheetController',
    action     : 'findOne',
    roles      : ["admin", "director"]
  },
  'POST /api/timesheets': {
    controller : 'TimesheetController',
    action     : 'create',
    roles      : ["admin", "director"]
  },
  'PUT /api/timesheets/:id': {
    controller : 'TimesheetController',
    action     : 'update',
    roles      : ["admin", "director"]
  },
  'DELETE /api/timesheets/:id': {
    controller : 'TimesheetController',
    action     : 'destroy',
    roles      : ["admin", "director"]
  },

};

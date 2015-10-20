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

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': {
  //   view: 'homepage'
  // }


  'post /auth/register': 'UserController.create',
  'get /auth/logout': 'AuthController.logout',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback',

  'get /api/me': 'UserController.me',

  'get /api/users': 'UserController.find',
  'post /api/users': 'UserController.create',
  'get /api/users/:id': 'UserController.findOne',
  'put /api/users/:id': 'UserController.update',
  'delete /api/users/:id': 'UserController.destroy',

  // Company Routes
  'get /api/companies': 'CompanyController.find',
  'post /api/companies': 'CompanyController.create',
  'get /api/companies/:id': 'CompanyController.findOne',
  'get /api/companies/director/:directorId': 'CompanyController.findByDirectorId',
  'put /api/companies/:id': 'CompanyController.update',
  'delete /api/companies/:id': 'CompanyController.destroy',

  // Department Routes
  'get /api/departments': 'DepartmentController.find',
  'get /api/departments/:id': 'DepartmentController.findOne',
  'get /api/departments/company/:id': 'DepartmentController.findAllByCompany',
  'post /api/departments': 'DepartmentController.create',
  'put /api/departments/:id': 'DepartmentController.update',
  'delete /api/departments/:id': 'DepartmentController.destroy',

   // Project Routes
  'GET /api/projects': {
    controller : 'ProjectController',
    action     : 'find',
    
  },
  'POST /api/projects': {
    controller : 'ProjectController',
    action     : 'create',
    
  },
  'GET /api/projects/company/:id': {
    controller : 'ProjectController',
    action     : 'findAllForCompany',
    
  },
  'GET /api/projects/user/:id': {
    controller : 'ProjectController',
    action     : 'findAllForProjectManager',
    
  },
  'GET /api/projects/status/:id': {
    controller : 'ProjectController',
    action     : 'findAllForStatus',
    
  },
  'GET /api/projects/:id': {
    controller : 'ProjectController',
    action     : 'findOne',
    
  },
  'PUT /api/projects/:id': {
    controller : 'ProjectController',
    action     : 'update',
    
  },
  'DELETE /api/projects/:id': {
    controller : 'ProjectController',
    action     : 'destroy',
    
  }
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
};

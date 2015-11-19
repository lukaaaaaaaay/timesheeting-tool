/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */


// CSS files to inject in order
//
// (If you're injecting SASS, you'll want
//  to change `app/css/importer.scss` instead.)
var cssFilesToInject = [
  'bower_components/bootstrap/dist/css/bootstrap.css',
  'bower_components/font-awesome/css/font-awesome.css',
  'bower_components/angular-toastr/dist/angular-toastr.min.css',
  'bower_components/ng-dialog/css/ngDialog.min.css',
  'bower_components/ng-dialog/css/ngDialog-theme-default.min.css',
  'css/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Bower Components are brought in here
  '/bower_components/jquery/dist/jquery.js',
  '/bower_components/bootstrap/dist/js/bootstrap.min.js',
  '/bower_components/angular/angular.js',
  '/bower_components/angular-base64/angular-base64.js',
  '/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
  '/bower_components/angular-local-storage/dist/angular-local-storage.js',
  '/bower_components/angular-ui-router/release/angular-ui-router.min.js',
  '/bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
  '/bower_components/ng-dialog/js/ngDialog.min.js',
  '/bower_components/underscore/underscore-min.js',
  '/bower_components/moment/min/moment.min.js',
  
  // Non-Bower Dependencies are brought in here
  'js/dependencies/**/*.js',

  // Import TST global config
  'js/tst.js',

  // Import TST Core
  'js/modules/core/module.core.js',
  'js/modules/core/**/*.js',
  'js/modules/core/module.core.run.js',

  // Import TST auth
  'js/modules/auth/module.auth.js',
  'js/modules/auth/module.auth.routes.js',
  'js/modules/auth/**/*.js',
  'js/modules/auth/module.auth.run.js',

  // Import TST ui
  'js/modules/ui/module.ui.js',
  'js/modules/ui/navbar/module.navbar.js',
  'js/modules/ui/navbar/**/*.js',
  'js/modules/ui/sidebar/module.sidebar.js',
  'js/modules/ui/sidebar/**/*.js',

  // Import TST accounts
  'js/modules/account/module.account.js',
  'js/modules/account/module.account.routes.js',
  'js/modules/account/**/*.js',

  // Import TST orgs
  'js/modules/company/module.company.js',
  'js/modules/company/module.company.routes.js',
  'js/modules/company/**/*.js',
  'js/modules/company/module.company.run.js',

  // Import TST departments
  'js/modules/departments/module.department.js',
  'js/modules/departments/module.department.routes.js',
  'js/modules/departments/**/*.js',
  
  // Import TST projects
  'js/modules/project/module.project.js',
  'js/modules/project/module.project.routes.js',
  'js/modules/project/**/*.js',

  // Import TST tasks
  'js/modules/tasks/module.tasks.js',
  'js/modules/tasks/module.tasks.routes.js',
  'js/modules/tasks/**/*.js',

  // Import TST Staff module
  'js/modules/staff/module.staff.js',
  'js/modules/staff/module.staff.routes.js',
  'js/modules/staff/**/*.js',


  // Import TST dashboard
  'js/modules/dashboard/module.dashboard.js',
  'js/modules/dashboard/module.dashboard.routes.js',
  'js/modules/dashboard/**/*.js',

  // Import TST startup
  'js/app.js'

];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
// var templateFilesToInject = [
//   'templates/*.html'
//   //'templates/**/*.html'
// ];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
// module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
//   return 'app/' + path;
// });

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
// (if you're using SASS with the built-in default config, you'll want
//  to change `assets/styles/importer.saas` instead.)
var cssFilesToInject = [
  'bower_components/bootstrap/dist/css/bootstrap.css',
  'bower_components/font-awesome/css/font-awesome.css',
  'bower_components/angular-toastr/dist/angular-toastr.min.css',
  // 'bower_components/ng-dialog/css/ngDialog.min.css',
  // 'bower_components/ng-dialog/css/ngDialog-theme-default.min.css',
  'styles/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // bower components here
  // '/bower_components/jquery/dist/jquery.js',
  '/bower_components/angular/angular.js',
  // '/bower_components/bootstrap/dist/js/bootstrap.js',
  '/bower_components/angular-base64/angular-base64.js',
  '/bower_components/angular-local-storage/dist/angular-local-storage.js',
  '/bower_components/angular-route/angular-route.js',
<<<<<<< HEAD
  // '/bower_components/angular-cookies/angular-cookies.js',
  // '/bower_components/angular-resource/angular-resource.js',
  // '/bower_components/angular-sanitize/angular-sanitize.js',
  // '/bower_components/angular-ui-router/release/angular-ui-router.js',
  // '/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
  '/bower_components/angular-toastr/dist/angular-toastr.min.js',
  // '/bower_components/ng-dialog/js/ngDialog.min.js',
=======
  '/bower_components/angular-cookies/angular-cookies.js',
  '/bower_components/angular-resource/angular-resource.js',
  '/bower_components/angular-sanitize/angular-sanitize.js',
  '/bower_components/angular-ui-router/release/angular-ui-router.js',
  '/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
  '/bower_components/toastr/toastr.min.js',
  '/bower_components/ng-dialog/js/ngDialog.min.js',
  '/bower_components/underscore/underscore-min.js',
  '/bower_components/moment/min/moment.min.js',
  
  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/**/*.js',
>>>>>>> 9f0b17c1fc912891fa2b32ae50b9df2b6395d921

    // NEW TST
    'js/tst.js',

    'js/modules/core/module.core.js',
    'js/modules/core/**/*.js',
    'js/modules/core/module.core.run.js',

    'js/modules/auth/module.auth.js',
    'js/modules/auth/module.auth.routes.js',
    'js/modules/auth/**/*.js',
    'js/modules/auth/module.auth.run.js',

    'js/modules/account/module.account.js',
    'js/modules/account/module.account.routes.js',
    'js/modules/account/**/*.js',


    'js/modules/company/module.company.js',
    'js/modules/company/module.company.routes.js',
    'js/modules/company/**/*.js',
    
    'js/modules/dashboard/module.dashboard.js',
    'js/modules/dashboard/module.dashboard.routes.js',
    'js/modules/dashboard/**/*.js',

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
var templateFilesToInject = [
  'templates/*.html'
  //'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'app/' + path;
});

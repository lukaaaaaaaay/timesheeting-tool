module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    //** todo: can/should we load app files in via tasks/pipeline?
    files: [
      '../app/bower_components/angular/angular.js',
      '../app/bower_components/angular-base64/angular-base64.js',
      '../app/bower_components/angular-local-storage/dist/angular-local-storage.js',
      '../app/bower_components/angular-route/angular-route.js',
      '../app/bower_components/angular-toastr/dist/angular-toastr.min.js',

      // test dependencies
      '../app/bower_components/angular-mocks/angular-mocks.js',

      // Import TST global config
      '../app/js/tst.js',

      // Import TST Core
      '../app/js/modules/core/module.core.js',
      '../app/js/modules/core/**/*.js',
      '../app/js/modules/core/module.core.run.js',
      '../app/tests/modules/core/*.Spec.js',

      // Import TST auth
      '../app/js/modules/auth/module.auth.js',
      '../app/js/modules/auth/module.auth.routes.js',
      '../app/js/modules/auth/**/*.js',
      '../app/js/modules/auth/module.auth.run.js',
      '../app/tests/modules/auth/*.Spec.js',

      // Import TST accounts
      '../app/js/modules/account/module.account.js',
      '../app/js/modules/account/module.account.routes.js',
      '../app/js/modules/account/**/*.js',
      '../app/tests/modules/account/*.Spec.js',

      // Import TST orgs
      '../app/js/modules/company/module.company.js',
      '../app/js/modules/company/module.company.routes.js',
      '../app/js/modules/company/**/*.js',
      '../app/tests/modules/company/*Spec.js',

      // Import TST dashboard
      '../app/js/modules/dashboard/module.dashboard.js',
      '../app/js/modules/dashboard/module.dashboard.routes.js',
      '../app/js/modules/dashboard/**/*.js',
      '../app/tests/modules/dashboard/*.Spec.js',

      // Import TST startup
      '../app/js/app.js'
    ],

    // list of files to exclude
    exclude: [
      
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 1447,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
/**
 * This service was initially ripped out of sails-auth by github.com/tjwebb
 */


  // AUTHENTICATION
  // 'get /auth/logout': 'AuthController.logout',
  // 'post /auth/local': 'AuthController.callback',


  // 'post /auth/local/:action': 'AuthController.callback',

  // 'get /auth/:provider': 'AuthController.provider',
  // 'get /auth/:provider/callback': 'AuthController.callback',
  // 'get /auth/:provider/:action': 'AuthController.callback',


  // // USERS
  // 'get /api/users': 'UserController.find',
  // 'post /api/users': 'UserController.create',

  // 'get /api/users/:id': 'UserController.findOne',
  // 'put /api/users:/id': 'UserController.update',

  // 'delete /api/users/:id': 'UserController.destroy',


var path = require('path');
var url = require('url');
var passport = require('passport');
var _ = require('lodash');

/**
 * Passport Service
 *
 * This takes all the hassle out Passport.js by encapsulating all the 
 * boring stuff in two functions:
 *
 *   passport.endpoint()
 *   passport.callback()
 *
 * The former sets up an endpoint (/auth/:provider) for redirecting a user to a
 * third-party provider for authentication, while the latter sets up a callback
 * endpoint (/auth/:provider/callback) for receiving the response from the
 * third-party provider. All you have to do is define in the configuration which
 * third-party providers you'd like to support. It's that easy!
 *
 * Behind the scenes, the service stores all the data it needs within "Pass-
 * ports". These contain all the information required to associate a local user
 * with a profile from a third-party provider. This even holds true for the good
 * ol' password authentication scheme – the Authentication Service takes care of
 * encrypting passwords and storing them in Passports, allowing you to keep your
 * Account model free of bloat.
 */

// Load authentication protocols
passport.protocols = require('./protocols');

/**
 * Connect a third-party profile to a local user
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 */
passport.connect = function (req, query, profile, next) {
  // TODO
};

/**
 * Create an authentication endpoint
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 */
passport.endpoint = function (req, res) {
  // TODO
};

/**
 * Create an authentication callback endpoint
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
passport.callback = function (req, res, next) {
  var provider = req.param('provider', 'local');
  var action = req.param('action');

  // console.log("in callback");
  
  if (provider === 'local' && action !== undefined) {
    if (action === 'register' && !req.user) {
      // console.log("action is register");
      this.protocols.local.register(req, res, next);
    }
    else if (action === 'connect' && req.user) {
      // console.log("action is connect");
      this.protocols.local.connect(req, res, next);
    }
    else if (action === 'disconnect' && req.user) {
      // console.log("action is disconnect");
      this.protocols.local.disconnect(req, res, next);
    }
    else {
      console.log("invalid action");
      next();
    }
  } else {
    if (action === 'disconnect' && req.user) {
      // console.log("other disconnect");
      this.disconnect(req, res, next) ;
    } else {
      // console.log("authenticate");
      this.authenticate(provider, next)(req, res, req.next);
    }
  }
};

/**
 * Load all strategies defined in the Passport configuration
 * This initially only works with local auth config, and needs to be improved
 * 
 * For example, we could add this to our config to use the GitHub strategy
 * with permission to access a users email address (even if it's marked as
 * private) as well as permission to read a users github organization memberships.
 *
    github: {
      name: 'GitHub',
      protocol: 'oauth2',
      scope: [ 'user', 'read:org' ]
      options: {
        clientID: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET'
      }
    }
 *
 * For more information on the providers supported by Passport.js, check out:
 * http://passportjs.org/guide/providers/
 *
 */
passport.loadStrategies = function () {
  var self = this;
  var strategies = sails.config.passport;

  _.each(strategies, function (strategy, key) {
    var options = { passReqToCallback: true };
    var Strategy;

    if (key === 'local') {
      // _.extend(options, { usernameField: 'email' });

      // Only load the local strategy if it's enabled in the config
      if (strategies.local) {
        Strategy = strategies[key].strategy;

        passport.use(new Strategy(options, self.protocols.local.login));
      }
    } else {
      // TODO
      console.log("error in loadStrategies");
    }
  });
};

/**
 * Disconnect a passport from a user
 *
 * @param  {Object} req
 * @param  {Object} res
 */
passport.disconnect = function (req, res, next) {
  var user = req.user;
  var provider = req.param('provider');
  var Passport = sails.models.passport;

  Passport.findOne({
      provider   : provider,
      user       : user.id
    }, function (err, passport) {
      if (err) return next(err);
      Passport.destroy(passport.id, function passportDestroyed(error) {
        if (err) return next(err);
        next(null, user);
      });
  });
};

passport.serializeUser(function (user, next) {
  next(null, user.id);
});

passport.deserializeUser(function (id, next) {
  sails.models.user.findOne(id)
    .then(function (user) {
      next(null, user || null);
    })
    .catch(function (error) {
      next(error);
    });

});

module.exports = passport;
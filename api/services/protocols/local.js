/**
 * Local Authentication Protocol
 *
 * The most widely used way for websites to authenticate accounts is via a email as well as a password. 
 * This module provides functions both for registering entirely new accounts, assigning passwords to 
 * already registered accounts and validating login requesting.
 *
 * For more information on local authentication in Passport.js, check out:
 * http://passportjs.org/guide/username-password/
 */

/**
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.register = function (account, next) {
  exports.createAccount(account, next);
};

/**
 * Register a new account
 *
 * This method creates a new account from a specified email and password
 * and assign the newly created account a local Passport.
 *
 * @param {String}   email
 * @param {String}   password
 * @param {Function} next
 */
exports.createAccount = function (_account, next) {
  var password = _account.password;
  delete _account.password;

  return sails.models.account.create(_account, function (err, account) {
    if (err) {
      sails.log(err);
      return next(err);
    }

    sails.models.passport.create({
      protocol : 'local'
    , password : password
    , account     : account.id
    }, function (err, passport) {
      if (err) {        
        return account.destroy(function (destroyErr) {
          next(destroyErr || err);
        });
      }

      next(null, account);
    });
  });
};

/**
 * Assign local Passport to account
 *
 * This function can be used to assign a local Passport to an account who doens't
 * have one already.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.connect = function (req, res, next) {
  var account     = req.account
    , password = req.param('password')
    , Passport = sails.models.passport;

  Passport.findOne({
    protocol : 'local'
  , account     : account.id
  }, function (err, passport) {
    if (err) {
      return next(err);
    }

    if (!passport) {
      Passport.create({
        protocol : 'local'
      , password : password
      , account     : account.id
      }, function (err, passport) {
        next(err, account);
      });
    }
    else {
      next(null, account);
    }
  });
};

/**
 * Validate a login request
 *
 * Looks up an account using email and then attempts to find a local Passport 
 * associated with the user. If a Passport is found, its password is 
 * checked against the password supplied in the form.
 *
 * @param {Object}   req
 * @param {string}   email
 * @param {string}   password
 * @param {Function} next
 */
exports.login = function (req, email, password, next) {
  var isEmail = validateEmail(email)
    , query   = {};

  if (isEmail) {
    query.email = email;
  } else {
    res.forbidden('Error.Passport.Email.NotValid');
    return next(null, false)
  }

  sails.models.account.findOne(query, function (err, account) {
    if (err) {
      return next(err);
    }

    if (!account) {
      res.forbidden('Error.Passport.Email.NotFound');
      return next(null, false);
    }

    sails.models.passport.findOne({
      protocol : 'local'
    , account     : account.id
    }, function (err, passport) {
      if (passport) {
        passport.validatePassword(password, function (err, res) {
          if (err) {
            return next(err);
          }

          if (!res) {
            //todo: We turned off sessions. This doesn't work 
            // req.flash('error', 'Error.Passport.Password.Wrong');
            return next(null, false);
          } else {
            return next(null, account, passport);
          }
        });
      }
      else {
        //todo: We turned off sessions. This doesn't work 
        //req.flash('error', 'Error.Passport.Password.NotSet');
        return next(null, false);
      }
    });
  });
};

var EMAIL_REGEX = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

/**
 * Use validator module isEmail function
 *
 * @see <https://github.com/chriso/validator.js/blob/3.18.0/validator.js#L38>
 * @see <https://github.com/chriso/validator.js/blob/3.18.0/validator.js#L141-L143>
 */
function validateEmail (str) {
  return EMAIL_REGEX.test(str);
}
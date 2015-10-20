/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/isAdmin.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "isAdmin")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/documentation/concepts/policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/documentation/reference/configuration/sails-config-policies
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  '*': [ 'basicAuth', 'passport', 'isAllowed' ],

  AuthController: {
    '*': [ 'passport' ]
  }
  
};

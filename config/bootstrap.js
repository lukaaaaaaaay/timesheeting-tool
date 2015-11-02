/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  // Load Passport strategies
  sails.services.passport.loadStrategies();


// Find or create roles
 Role.findOrCreate({ id: 3, name:'Director'}).exec(function createFindCB(err, record){
  console.log('Created: '+record.name+'?');
});
  Role.findOrCreate({id: 2, name:'Admin'}).exec(function createFindCB(err, record){
   console.log('Created: '+record.name+'?');
 });

   Role.findOrCreate({id: 1, name:'Staff'}).exec(function createFindCB(err, record){
    console.log('Created: '+record.name+'?');
  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};

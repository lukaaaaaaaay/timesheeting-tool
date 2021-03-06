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
  
  //roles
  Role.create({ id: 1, name: 'Admin'}).exec(console.log);
  Role.create({ id: 2, name: 'Director' }).exec(console.log);
  Role.create({ id: 3, name: 'ProjectManager' }).exec(console.log);
  Role.create({ id: 4, name: 'Staff' }).exec(console.log);
  
  // statuses
  Status.create({ id: 1, name: 'Incomplete'}).exec(console.log);
  Status.create({ id: 2, name: 'In Progress' }).exec(console.log);
  Status.create({ id: 3, name: 'Testing'}).exec(console.log);
  Status.create({ id: 4, name: 'Complete' }).exec(console.log);
  Status.create({ id: 5, name: 'Cancelled'}).exec(console.log);
  Status.create({ id: 6, name: 'Awaiting Approval'}).exec(console.log);
  Status.create({ id: 7, name: 'Approved'}).exec(console.log);

  // tasks 
  // Task.create({
  //   id: 1,
  //   name: 'Test',
  //   projectId: 3,
  //   statusId: 1, 
  //   members: [
  //     {
  //       id: 18
  //     }
  //   ]
  // }).exec(console.log);

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};

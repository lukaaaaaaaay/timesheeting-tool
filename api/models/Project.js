/**
 * Project Model
 *
 * The Project model specifies the structure and details of projects that 
 * users add tasks to and track time against.
 */

 var Project = {
   tableName: 'projects',
   
 	attributes: {
 		
 		// id: {
 		// 	type: 'int',
 		// 	primaryKey: true,
 		// 	unique: true,
 		// },

 		name: {
 			type: 'string',
 			required: true,
 		},

      description: {
         type: 'string'
      },

 		startDate: {
 			type: 'datetime',
 			required: true
 		},

 		dueDate: {
 			type: 'datetime'
 		},
 		
 		statusId: {
 			model: 'Status',
         required: true
 		},

 		projectManagerId: {
 			model: 'User',
 			required: true
 		},

 		companyId: {
 			model: 'Company',
 			required: true
 		},

      /**
      * Finds all projects for a company.
      *
      * @param {int}   companyId - The company id 
      */
      findAllForCompany: function(companyId, cb) {
         
         Project.find({companyId: companyId }).exec(function (err, projects) {
            if (err) return cb(err);

            return cb(null, projects);
         });
      },

      /**
      * Finds all projects for a project manager.
      *
      * @param {int}   projectManagerId - The project managers user id
      */
      findAllForProjectManager: function(projectManagerId, cb) {
         
         Project.find({projectManagerId: projectManagerId }).exec(function (err, projects) {
            if (err) return cb(err);

            return cb(null, projects);
         });
      },

      /**
      * Finds all projects based on their status.
      *
      * @param {int}   statusId - The status id of the projects
      */
      findAllForStatus: function(statusId, cb) {
         
         Project.find({statusId: statusId }).exec(function (err, projects) {
            if (err) return cb(err);

            return cb(null, projects);
         });
      },

      /**
      * Find all projects for a project manager and a particular status
      *
      * @param {Object}   query - The query object containing a project manager id and status id.
      */
      findAllForProjectManagerAndStatus: function(query, cb) {
         
         Project.find({projectManagerId: query.pmId, statusId: query.statusId }).exec(function (err, projects) {
            if (err) return cb(err);

            return cb(null, projects);
         });
      },

      /**
      * Find all projects for a project manager.
      *
      * @param {Object}    query - The query object containing a company id and status id.
      */
      findAllForCompanyAndStatus: function(query, cb) {
         
         Project.find({companyId: query.companyId, statusId: query.statusId }).exec(function (err, projects) {
            if (err) return cb(err);

            return cb(null, projects);
         });
      },

 	},
 	
 }

 module.exports = Project;
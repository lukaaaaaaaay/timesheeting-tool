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

      // A project has a name
 		name: {
 			type: 'string',
 			required: true,
 		},

      // A project has an (optional) description
      description: {
         type: 'string'
      },

      // A project must have a start date
 		startDate: {
 			type: 'datetime',
 			required: true
 		},

      // A project has an (optional) due date
 		dueDate: {
 			type: 'datetime'
 		},
 		
      // A project must have a status
 		statusId: {
 			model: 'Status',
         required: true
 		},

      // A project must have a manager
 		projectManagerId: {
 			model: 'User',
 			required: true
 		},

      // A project must belong to a company
 		companyId: {
 			model: 'Company',
 			required: true
 		},

      projectManager: function () {
         console.log(this.projectManagerId);
         User.findOne(this.projectManagerId, function (err, user) {
            if(err) return "";
            
            return user.fullName + " " + user.lastName;
         });
      },

      toJSON: function () {
         var project = this.toObject();
         project.projectManager = this.projectManager();
         return project;
      }

 	},
   /**
   * Finds all projects for a company.
   *
   * @param {int}   companyId - The company id 
   */   
   findAllForCompany: function(companyId, cb) {
      console.log(companyId);
      this.find({companyId: companyId }).exec(function (err, projects) {
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
      
      this.find({projectManagerId: projectManagerId }).exec(function (err, projects) {
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
      
      this.find({statusId: statusId }).exec(function (err, projects) {
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
      
      this.find({projectManagerId: query.pmId, statusId: query.statusId }).exec(function (err, projects) {
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
      
      this.find({companyId: query.companyId, statusId: query.statusId }).exec(function (err, projects) {
         if (err) return cb(err);

         return cb(null, projects);
      });
   }	
}

module.exports = Project;


/**
 * Task Model
 *
 * The Task model 
 */

 var Task = {
 	tableName: 'tasks',

 	attributes: {

 		// A task has a name
 		name: {
 			type: 'string',
 			required: 'true'
 		},

 		// A task has an (optional) description
 		description: {
 			type: 'string'
 		},

 		// A task has an (optional) start date
 		startDate: {
 			type: 'datetime'
 		},

 		// A task has an (optional) due date
 		dueDate: {
 			type: 'datetime'
 		},

 		// A task must have a status
 		statusId: {
 			model: 'Status',
 			required: true
 		},

 		// A task is created by a user (TODO)
 		createdBy: {
 			model: 'User',
 		},

 		// A task must belong to a project
 		projectId: {
 			model: 'Project',
 			required: true
 		},

 		// A task can have many categories
 		//categories: {collection: 'Category', via: 'task'},

 		// A task can have many members
 		//members: {collection: 'User', via: 'task'},

 		// A task can have many items
 		//items: {collection: 'Item', via: 'task'},

 		// A task can have many comments
 		//comments: {collection: 'Comment', via: 'task'},

 		// A task can have many timesheets?
 		//timesheets: {collection: 'Timesheet', via: 'task'},

 		/**
		 * Finds all tasks for a project.
		 * 
		 * @param {int}	projectId - The project id
 		 */
 		findAllForProject: function(projectId, cb) {

 			Task.find({projectId: projectId }).exec(function (err, tasks) {
 				if (err) return cb(err);

 				return cb(null, tasks);
 			});
 		},

 		/**
 		 * Finds all tasks by same creator.
 		 *
 		 * @param {int}	createdBy - The user id of the creator
 		 */

 		findAllForCreator: function(createdBy, cb) {

 			Task.find({createdBy: createdBy }).exec(function (err, tasks) {
 				if (err) return cb(err);

 				return cb(null, tasks);
 			});
 		},

 		/**
 		 * Finds all tasks based on their status.
 		 *
 		 * @param {int} 	statusId - The status id of the task
 		 */

 		findAllForStatus: function(statusId, cb) {

 			Task.find({statusId: statusId }).exec(function (err, tasks) {
 				if (err) return cb(err);

 				return cb(null, tasks);
 			});
 		},
 	},
 }

 module.exports = Task;
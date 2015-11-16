/**
 * Timesheet Model
 *
 * The Timesheet model...  
 */

 var Timesheet = {
 	tableName: 'timesheets',

 	attributes: {

 		// A timesheet has a name
 		name: {
 			type: 'string',
 			required: true
 		},

 		// A timesheet has a start time
 		startTime: {
 			type: 'datetime',
 			required: true
 		},

 		// A timesheet has an end time
 		endTime: {
 			type: 'datetime',
 			required: true
 		},

 		// A timesheet belongs to a user
 		userId: {
 			model: 'User',
 			required: true
 		},

 		// A timesheet has a status (e.g. waiting approval, approved)
 		statusId: {
 			model: 'Status',
 			required: true
 		},

 		// A timesheet can be approved by a project manager (changes status)
 		approvedBy: {
 			model: 'User',
 		},

 		// A timesheet is assigned to a task
 		taskId: {
 			model: 'Task',
 			required: true
 		},
 	},

 	/**
		 * Finds all timesheets for a task.
		 * 
		 * @param {int}	taskId - The task id.
 		 */
 		findAllForTask: function(taskId, cb) {

 			this.find({taskId: taskId }).exec(function (err, timesheets) {
 				if (err) return cb(err);

 				return cb(null, timesheets);
 			});
 		},

 		/**
 		 * Finds all timesheets by same user.
 		 *
 		 * @param {int}	userId - The user id.
 		 */
 		findAllForUser: function(userId, cb) {

 			this.find({userId: userId }).exec(function (err, timesheets) {
 				if (err) return cb(err);

 				return cb(null, timesheets);
 			});
 		},

 		/**
 		 * Finds all timesheets based on their status.
 		 *
 		 * @param {int} 	statusId - The status id of the timesheet.
 		 */
 		findAllForStatus: function(statusId, cb) {

 			this.find({statusId: statusId }).exec(function (err, timesheets) {
 				if (err) return cb(err);

 				return cb(null, timesheets);
 			});
 		},
 }

 module.exports = Timesheet;
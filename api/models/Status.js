/**
 * Status Model
 *
 * The Status model specifies the structure and details of statuses within the system.
 * Projects and Tasks have statuses.
 */

 var Status = {
 	tableName: 'statuses',
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

 	},
 	
 }

 module.exports = Status;
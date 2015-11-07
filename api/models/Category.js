/**
 * Category Model
 *
 * The Category model specifies the structure and details of statuses within the system.
 * Projects and Tasks have statuses.
 */

 var Category = {
 	tableName: 'categories',
 	
 	attributes: {
 
 		name: {
 			type: 'string',
 			required: true,
 			unique: true
 		},

 		description: {
 			type: 'string'
 		},

 		tasks: {collection: 'Task', via: 'category'},

 	},
 	
 }

 module.exports = Category;
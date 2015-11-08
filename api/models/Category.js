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

 		companyId: {
 			model: 'Company',
 			required: true
 		},

 		tasks: {
 			collection: 'Task', 
 			via: 'categories'
 		},

 	},

 	/**
	* Finds all tasks for a project.
	* 
	* @param {int}	companyId - The company id
	*/
 	findAllForCompany: function (companyId, cb) {
 		Category.find({companyId: companyId }).exec(function (err, categories) {
			if (err) return cb(err);

			return cb(null, categories);
		});
 	}
 	
 }

 module.exports = Category;
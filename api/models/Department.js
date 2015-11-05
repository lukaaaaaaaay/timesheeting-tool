/**
 * Department Model
 *
 * The Department model specifies the structure and details of departments  
 * within a Company. 
 */

 module.exports = {
   tableName: 'departments',
   
 	attributes: {
 		
 		// id: {
 		// 	type: 'int',
 		// 	primaryKey: true,
 		// 	unique: true,
 		// },

      // A department has a name
 		name: {
 			type: 'string',
 			required: true,
 		},

      // A department has an (optional) description
      description: {
         type: 'string',
      },

      // A department must be created by a user (TODO)
      createdBy: {
         model: 'User'
      },

      // A department must belong to a company
 		companyId: {
 			model: 'Company',
 			required: true
 		},
 	},

 	/**
   	* Returns all departments for a company
   	* Returns a promise.
   	*
   	* @param {Object}   companyId The Id of the company.
   	*/

   	findAllByCompany: function(companyId, callback) {
  
   		Department.find({companyId: companyId }).exec(function (err, departments){
      		if (err) return callback(err);
      		// if(departments.length == 0) {
      		// 	err = new Error();
      		// 	err.message = 'No departments found for company with id: ' + companyId;
      		// 	err.status = 404;
      		// }
      		callback(null, departments);
   		});
   	}
 };


/**
 * Department Model
 *
 * The Department model specifies the structure and details of departments  
 * within a Company. 
 */

 module.exports = {
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
         type: 'string',
      },

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


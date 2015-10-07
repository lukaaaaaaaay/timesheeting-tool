/**
 * Company Model
 *
 * The Company model specifies the structure and details of organisations that 
 * use the system.
 */

 var Company = {
 	attributes: {
 		
 		id: {
 			type: 'int',
 			primaryKey: true,
 			unique: true,
 		},

 		companyName: {
 			type: 'string',
 			required: true,
 			unique: true
 		},

 		address: {
 			type: 'string',
 			size: 250
 		},

 		suburb: {
 			type: 'string',
 			size: 100
 		},

 		// possible relation with another table of states?
 		state: {
 			type: 'string'
 		},
 		//possible relation with another table of countries
 		country: {
 			type: 'string'
 		},

 		postcode: {
 			type: 'string',
 			size: 16
 		},

 		description: {
 			type: 'string'
 		},

 		directorId: {
 			type: 'User',
 			//required: true
 		},

 		getFullAddress: function() {
 			return this.address + ", " + this.suburb + ", " + this.state + ", " + this.country + ", " + this.postcode;
 		}
 	},
 	/**
   	* Create a new Compnay
   	* Returns a promise.
   	*
   	* @param {Object}   company The soon-to-be-created Company
   	*/
   	// create: function(company) {
   	// 	return new Promise(function(resolve, reject) {

   	// 	});
   	// }
 }

 module.exports = Company;
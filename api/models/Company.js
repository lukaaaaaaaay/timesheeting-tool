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
 			model: 'User',
 			//required: true
 		},

 		getFullAddress: function() {
 			return this.address + ", " + this.suburb + ", " + this.state + ", " + this.country + ", " + this.postcode;
 		}
 	},
 	/**
   	* Find a company based on its director.
   	*
   	* @param {Object}   company - The found company
   	*/
   	findByDirectorId: function(directorId, cb) {
   		console.log(directorId)
   		Company.find({directorId: directorId }).exec(function (err, company) {
   			if (err) return cb(err);

   			return cb(null, company);
   		});
   	}
 }

 module.exports = Company;
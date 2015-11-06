/**
 * Company Model
 *
 * The Company model specifies the structure and details of organisations that 
 * use the system.
 */

 var Company = {
   tableName: 'companies',
 	attributes: {
 		
 		// A company has a name
 		companyName: {
 			type: 'string',
 			required: true,
 			unique: true,
         	columnName: 'name'
 		},

 		// A company has an (optional) description
 		description: {
 			type: 'string'
 		},

 		// A company has an (optional) address
 		address: {
 			type: 'string',
 			size: 250
 		},

 		// A company has an (optional) suburb
 		suburb: {
 			type: 'string',
 			size: 100
 		},

 		// A company has an (optional) state
 		state: {
 			type: 'string'
 		},
 		
 		// A company has an (optional) country
 		country: {
 			type: 'string'
 		},

 		// A company has an (optional) postcode
 		postcode: {
 			type: 'string',
 			size: 16
 		},

 		// A company must be created by a user (TODO)
 		createdby: {
 			model: 'User'
 		},

 		// A company must have a director
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
		Company.find({directorId: directorId }).exec(function (err, company) {
			if (err) return cb(err);

			return cb(null, company);
		});
	}
 }

 module.exports = Company;
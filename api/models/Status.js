/**
 * Status Model
 *
 * The Status model specifies the structure and details of statuses within the system.
 * Projects and Tasks have statuses.
 */

 var Status = {
 	autoPK: true,
  	autoCreatedBy: false,
  	autoCreatedAt: false,
  	autoUpdatedAt: false,
 	tableName: 'statuses',
 	
 	attributes: {
 
 		name: {
 			type: 'string',
 			required: true,
 			unique: true
 		},

 	},
 	
 }

 module.exports = Status;
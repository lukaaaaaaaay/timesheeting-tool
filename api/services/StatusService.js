/**
 * StatusService
 *
 * @description :: Server-side logic for retreiving Statuses from the database
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

 module.exports = {
 	/**
     * Return all the Statuses in the system
     * 
     * @param {Object} db
     */
    find: function (cb) {
    	Status.find({}, function (err, statuses) {
    		if(err) return cb(err, null);

    		return cb(null, statuses);
    	});
    },

    /**
     * Return a single Status matching the supplied Id
     *
     * @param {int} id
     */
    findOne: function(id, cb) {
        Status.findOne(id, function (err, status) {
        	if(err) return cb(err, null);

        	return cb(null, status);
        });
    },
 };
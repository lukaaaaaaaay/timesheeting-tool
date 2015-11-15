/**
 * TimesheetController
 *
 * @description :: Server-side logic for managing Timesheets in our system
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * Return all the Timesheets in the system
     *
     * @param {Object} req
     * @param {Object} res
     */
    find: function (req, res) {
        Timesheet.find({}, function(err, timesheets) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            if(timesheets.length == 0) {
                sails.log.info("successful transaction but no timesheets found..");
            }
            else {
                 sails.log.info(timesheets.length + " timesheets found");
            }
            res.ok(timesheets);
        })
    },

        /**
     * Return a single Timesheet matching the supplied Id
     *
     * @param {Object} req
     * @param {Object} res
     */
    findOne: function(req, res) {
        Timesheet.findOne(req.param('id'), function(err, timesheet) {
            if (err) return res.negotiate(err);

            if(!timesheet) {
                sails.log.warn('No Timesheet with the id ' + req.param('id') + ' found');
                res.notFound('No Timesheet with the id ' + req.param('id') + ' found');
            }
            else {
                 sails.log.info('Timesheet Found: ' + timesheet.name);
                res.ok(timesheet);
            }
            
        });
    },

    /**
     * Return all Timesheets for a particular task
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllForTask: function(req, res) {
        Timesheet.findAllForTask({taskId: req.param('id')}, function(err, timesheets) {
            if (err) return res.negotiate(err);
            

            if(timesheets.length == 0) {
                sails.log.info("successful transaction but no timesheets found..");
            }
            else {
                 sails.log.info(timesheets.length + " timesheets found");
            }
            res.ok(timesheets);
        });
    },

    /**
     * Return all Timesheets for a particular user
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllForUser: function(req, res) {
        Timesheet.findAllForUser({userId: req.param('id')}, function(err, timesheets) {
            if (err) return res.negotiate(err);
            

            if(timesheets.length == 0) {
                sails.log.info("successful transaction but no timesheets found..");
            }
            else {
                 sails.log.info(timesheets.length + " timesheets found");
            }
            res.ok(timesheets);
        });
    },

    /**
     * Return all Timesheets for a particular status
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllForStatus: function(req, res) {
        Timesheet.findAllForStatus({statusId: req.param('id')}, function(err, timesheets) {
            if (err) return res.negotiate(err);
            

            if(timesheets.length == 0) {
                sails.log.info("successful transaction but no timesheets found..");
            }
            else {
                 sails.log.info(timesheets.length + " timesheets found");
            }
            res.ok(timesheets);
        });
    },


    /**
     * Create a new Timesheet
     *
     * @param {Object} req
     * @param {Object} res
     */
    create: function (req, res) {
                Timesheet.create(req.body, function (err, timesheet) {
                    if (err) return res.negotiate(err);
                
                    // debugging - remove later.. or not, server logs are helpful.
                    if(timesheet) {
                        sails.log.info('created: ' + timesheet.name);
                        res.ok(timesheet);
                    }
                    else {
                        sails.log.warn('Timesheet with the id ' + req.body.id + ' could not be created.');
                        res.badRequest('Timesheet with the id ' + req.body.id + ' could not be created.');
                    }
                });

    },

    /**
     * Update an existing Timesheet
     *
     * @param {Object} req
     * @param {Object} res
     */
    update: function (req, res) {   
        Timesheet.findOne(req.body.id, function(err, existing) {
            if (err) return res.negotiate(err);

            if(existing) {
                Timesheet.update({id: req.body.id}, req.body, function(err, updated) {
                    if (err) return res.negotiate(err);

                    if(!updated) {
                        sails.log.warn('Timesheet with the id ' + req.body.id + ' could not be updated.');
                        res.badRequest('Timesheet with the id ' + req.body.id + ' could not be updated.');
                    }
                    else {
                        sails.log.info('Updated Timesheet: ' + updated[0].name);
                        res.ok(updated[0]);
                    }
                    
                });
            }
            else {
                sails.log.warn('No task with the id ' + req.body.id + ' to update.');
                res.notFound('No task with the id ' + req.body.id + ' to update.');
            }
        });
        
    },

    /**
     * Delete an existing Timesheet
     *
     * @param {Object} req
     * @param {Object} res
     */
    destroy: function (req, res) {
        Timesheet.destroy({id: req.param('id')}, function(err) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            sails.log.info('Timesheet with id ' + req.param('id') + ' deleted');
            res.ok();
        });
    },


    
};
/**
 * DepartmentController
 *
 * @description :: Server-side logic for managing Departments in our system
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * Return all the Departments in the system
     *
     * @param {Object} req
     * @param {Object} res
     */
    find: function (req, res) {
        Department.find({}, function(err, departments) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            if(departments.length == 0) {
                sails.log.info("Successful transaction but no departments found..");
            }
            else {
                 sails.log.info(departments.length + " departments found");
            }
            res.ok(departments);
        })
    },

    /**
     * Return a single Department matching the supplied Id
     *
     * @param {Object} req
     * @param {Object} res
     */
    findOne: function(req, res) {
        Department.findOne(req.param('id'), function(err, department) {
            if (err) return res.negotiate(err);

            if(!department) {
                sails.log.warn('No Departments with the id ' + req.param('id') + ' found');
                res.notFound('No Department with the id ' + req.param('id') + ' found');
            }
            else {
                 sails.log.info('Department Found: ' + department.name);
                res.ok(department);
            }
            
        });
    },

    /**
     * Return all Departments for a Department
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllByCompany: function(req, res) {
        var companyId = req.param('id');
        Department.findAllByCompany(companyId, function(err, departments) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            if(departments.length == 0) {
                sails.log.info("No departments found for the company with id: " + companyId);
                res.notFound("No departments found for the company with id: " + companyId);
            }
            else {
                sails.log.info(departments.length + " departments found");
                res.ok(departments);
            }
            
        })
    },

    /**
     * Create a new Deparment
     *
     * @param {Object} req
     * @param {Object} res
     */
    create: function (req, res) {
        Department.findOne(req.body.id, function(err, existing) {
            if (err) return res.negotiate(err);

            if(existing) {
                sails.log.warn('Department with the id ' + req.body.id + ' already exists.');
                res.badRequest('Department with the id ' + req.body.id + ' already exists.');
            }
            else {
                Department.create(req.body, function (err, department) {
                    if (err) return res.negotiate(err);
                
                    // debugging - remove later.. or not, server logs are helpful.
                    if(department) {
                        sails.log.info('Department created: ' + department.name);
                        res.ok(department);
                    }
                    else {
                        sails.log.warn('Department with the id ' + req.body.id + ' could not be created.');
                        res.badRequest('Department with the id ' + req.body.id + ' could not be created.');
                    }
                    
                });
            }
        });
    },

    /**
     * Update an existing Department
     *
     * @param {Object} req
     * @param {Object} res
     */
    update: function (req, res) {   
        Department.findOne(req.body.id, function(err, existing) {
            if (err) return res.negotiate(err);

            if(existing) {
                Department.update({id: req.body.id}, req.body, function(err, updated) {
                    if (err) return res.negotiate(err);

                    if(!updated) {
                        sails.log.warn('Department with the id ' + req.body.id + ' could not be updated.');
                        res.badRequest('Department with the id ' + req.body.id + ' could not be updated.');
                    }
                    else {
                        sails.log.info('Updated Department: ' + updated[0].name);
                        res.ok(updated[0]);
                    }
                    
                });
            }
            else {
                sails.log.warn('No Department with the id ' + req.body.id + ' to update.');
                res.notFound('No Department with the id ' + req.body.id + ' to update.');
            }
        });
        
    },

    /**
     * Delete an existing Department
     *
     * @param {Object} req
     * @param {Object} res
     */
    destroy: function (req, res) {
        Department.destroy({id: req.param('id')}, function(err) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            sails.log.info('Department with id ' + req.param('id') + ' deleted');
            res.ok();
        });
    },


    
};
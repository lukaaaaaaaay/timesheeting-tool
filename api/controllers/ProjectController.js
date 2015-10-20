/**
 * ProjectController
 *
 * @description :: Server-side logic for managing Projects in our system
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * Return all the Projects in the system
     *
     * @param {Object} req
     * @param {Object} res
     */
    find: function (req, res) {
        Project.find({}, function(err, projects) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            if(projects.length == 0) {
                sails.log.info("successful transaction but no projects found..");
            }
            else {
                 sails.log.info(projects.length + " projects found");
            }
            res.ok(projects);
        })
    },

    /**
     * Return a single Project matching the supplied Id
     *
     * @param {Object} req
     * @param {Object} res
     */
    findOne: function(req, res) {
        Company.findOne(req.param('id'), function(err, project) {
            if (err) return res.negotiate(err);

            if(!project) {
                sails.log.warn('No Project with the id ' + req.param('id') + ' found');
                res.notFound('No Project with the id ' + req.param('id') + ' found');
            }
            else {
                 sails.log.info('Project Found: ' + project.name);
                res.ok(project);
            }
            
        });
    },

    /**
     * Return all Projects for a Company
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllForCompany: function(req, res) {
        Project.findAllForCompany(req.param('companyId'), function(err, projects) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            if(projects.length == 0) {
                sails.log.info("No projects found for the company with the id: " + req.param('companyId'));
            }
            else {
                 sails.log.info(projects.length + " projects found");
            }
            res.ok(projects);
        });
    },

     /**
     * Return all Projects for a single Project Manager
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllForProjectManager: function(req, res) {
        Project.findAllForProjectManager(req.param('pmId'), function(err, projects) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            if(projects.length == 0) {
                sails.log.info("No projects found for the project manager with the id: " + req.param('pmId'));
            }
            else {
                 sails.log.info(projects.length + " projects found");
            }
            res.ok(projects);
        });
    },

    /**
     * Return all Projects for a Status
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllForStatus: function(req, res) {
        Project.findAllForStatus(req.param('statusId'), function(err, projects) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            if(projects.length == 0) {
                sails.log.info("No projects found with a status id of: " + req.param('statusId'));
            }
            else {
                 sails.log.info(projects.length + " projects found");
            }
            res.ok(projects);
        });
    },

    /**
     * Return all Projects for a Company and a particular Status
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllForCompanyAndStatus: function(req, res) {
        Project.findAllForCompanyAndStatus(req.body, function(err, projects) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            if(projects.length == 0) {
                sails.log.info("No projects found for the company with the id: " + 
                    req.body.companyId + " and a status id of " + req.body.statusId);
            }
            else {
                 sails.log.info(projects.length + " projects found");
            }
            res.ok(projects);
        });
    },

    /**
     * Return all Projects for a Project Manager and particular Status
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllForProjectManagerAndStatus: function(req, res) {
        Project.findAllForProjectManagerAndStatus(req.body, function(err, projects) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            if(projects.length == 0) {
                sails.log.info("No projects found for the project manager with the id: " + 
                    req.body.pmId + " and a status id of " + req.body.statusId);
            }
            else {
                 sails.log.info(projects.length + " projects found");
            }
            res.ok(projects);
        });
    },


    /**
     * Return all the statuses in the system
     *
     * @param {Object} req
     * @param {Object} res
     */
     findStatuses: function (req, res) {
        StatusService.find(function (err, statuses) {
            if (err) return res.negotiate(err);

            res.ok(statuses);
        })
     },

    /**
     * Return a single status of the given id
     *
     * @param {Object} req
     * @param {Object} res
     */
     findStatuses: function (req, res) {
        StatusService.findOne(req.param('id'), function (err, status) {
            if (err) return res.negotiate(err);

            if(!status) {
                res.notFound('Status with the id ' + req.param('id') + ' not found.');
            }
            else {
                res.ok(statuses);    
            }
        });
     },     

    /**
     * Create a new Project
     *
     * @param {Object} req
     * @param {Object} res
     */
    create: function (req, res) {
        Project.findOne(req.body.id, function(err, existing) {
            if (err) return res.negotiate(err);

            if(existing) {
                sails.log.warn('Project with the id ' + req.body.id + ' already exists.');
                res.badRequest('Project with the id ' + req.body.id + ' already exists.');
            }
            else {
                Project.create(req.body, function (err, project) {
                    if (err) return res.negotiate(err);
                
                    // debugging - remove later.. or not, server logs are helpful.
                    if(project) {
                        sails.log.info('created: ' + project.name);
                        res.ok(project);
                    }
                    else {
                        sails.log.warn('Project with the id ' + req.body.id + ' could not be created.');
                        res.badRequest('Project with the id ' + req.body.id + ' could not be created.');
                    }
                    
                });
            }
        });
        
    },

    /**
     * Update an existing Project
     *
     * @param {Object} req
     * @param {Object} res
     */
    update: function (req, res) {   
        Project.findOne(req.body.id, function(err, existing) {
            if (err) return res.negotiate(err);

            if(existing) {
                Project.update({id: req.body.id}, req.body, function(err, updated) {
                    if (err) return res.negotiate(err);

                    if(!updated) {
                        sails.log.warn('Project with the id ' + req.body.id + ' could not be updated.');
                        res.badRequest('Project with the id ' + req.body.id + ' could not be updated.');
                    }
                    else {
                        sails.log.info('Updated Project: ' + updated[0].name);
                        res.ok(updated[0]);
                    }
                    
                });
            }
            else {
                sails.log.warn('No project with the id ' + req.body.id + ' to update.');
                res.notFound('No project with the id ' + req.body.id + ' to update.');
            }
        });
        
    },

    /**
     * Delete an existing Project
     *
     * @param {Object} req
     * @param {Object} res
     */
    destroy: function (req, res) {
        Project.destroy({id: req.param('id')}, function(err) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            sails.log.info('Project with id ' + req.param('id') + ' deleted');
            res.ok();
        });
    },


    
};
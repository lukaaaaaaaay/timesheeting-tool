/**
 * CompanyController
 *
 * @description :: Server-side logic for managing Companies in our system
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * Return all the Companies in the system
     *
     * @param {Object} req
     * @param {Object} res
     */
    find: function (req, res) {
        Company.find({}, function(err, companies) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            if(companies.length == 0) {
                sails.log.info("successful transaction but no companies found..");
            }
            else {
                 sails.log.info(companies.length + " companies found");
            }
            res.ok(companies);
        })
    },

        /**
     * Return a single Company matching the supplied Id
     *
     * @param {Object} req
     * @param {Object} res
     */
    findOne: function(req, res) {
        Company.findOne(req.param('id'), function(err, company) {
            if (err) return res.negotiate(err);

            if(!company) {
                sails.log.warn('No Company with the id ' + req.param('id') + ' found');
                res.notFound('No Company with the id ' + req.param('id') + ' found');
            }
            else {
                 sails.log.info('Company Found: ' + company.companyName);
                res.ok(company);
            }
            
        });
    },

    /**
     * Create a new Company
     *
     * @param {Object} req
     * @param {Object} res
     */
    create: function (req, res) {
        Company.findOne(req.body.id, function(err, existing) {
            if (err) return res.negotiate(err);

            if(existing) {
                sails.log.warn('Company with the id ' + req.body.id + ' already exists.');
                res.badRequest('Company with the id ' + req.body.id + ' already exists.');
            }
            else {
                Company.create(req.body, function (err, company) {
                    if (err) return res.negotiate(err);
                
                    // debugging - remove later.. or not, server logs are helpful.
                    if(company) {
                        sails.log.info('created: ' + company.companyName);
                        res.ok(company);
                    }
                    else {
                        sails.log.warn('Company with the id ' + req.body.id + ' could not be created.');
                        res.badRequest('Company with the id ' + req.body.id + ' could not be created.');
                    }
                    
                });
            }
        });
        
    },

    /**
     * Update an existing Company
     *
     * @param {Object} req
     * @param {Object} res
     */
    update: function (req, res) {   
        Company.findOne(req.body.id, function(err, existing) {
            if (err) return res.negotiate(err);

            if(existing) {
                Company.update({id: req.body.id}, req.body, function(err, updated) {
                    if (err) return res.negotiate(err);

                    if(!updated) {
                        sails.log.warn('Company with the id ' + req.body.id + ' could not be updated.');
                        res.badRequest('Company with the id ' + req.body.id + ' could not be updated.');
                    }
                    else {
                        sails.log.info('Updated Company: ' + updated[0].companyName);
                        res.ok(updated);
                    }
                    
                });
            }
            else {
                sails.log.warn('No company with the id ' + req.body.id + ' to update.');
                res.notFound('No company with the id ' + req.body.id + ' to update.');
            }
        });
        
    },

    /**
     * Delete an existing Company
     *
     * @param {Object} req
     * @param {Object} res
     */
    destroy: function (req, res) {
        Company.destroy({id: req.param('id')}, function(err) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            sails.log.info('Company with id ' + req.param('id') + ' deleted');
            res.ok();
        });
    },


    
};
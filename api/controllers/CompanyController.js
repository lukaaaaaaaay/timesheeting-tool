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
     * Return a single Company based on the DirectorId
     *
     * @param {Object} req
     * @param {Object} res
     */
    findByDirectorId: function(req, res) {
        Company.find({where: {directorId: req.param('directorId') },limit: 1}, function(err, companies) {
            if (err) return res.negotiate(err);
            var company = companies[0];
            if(!company) {
                sails.log.warn('No Company with a director with the id ' + req.param('directorId') + ' found');
                res.notFound('No Company with a director with the id ' + req.param('directorId') + ' found');
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
                Company.create(req.body, function (err, company) {
                    if (err) return res.negotiate(err);

                    console.log("user is: ");
                    console.log(req.user);
                
                    // debugging - remove later.. or not, server logs are helpful.
                    if(company) {
                        sails.log.info('created: ' + company.companyName);

                        // Assign the company to the logged in user
                        User.findOne({id:req.user.id}).populate('companyId').exec(function(error,user){
                            user.companyId = { id: company.id };
                            user.save(function (err) {
                                res.ok(company);
                            });
                        });                        
                    }
                    else {
                        sails.log.warn('Company with the id ' + req.body.id + ' could not be created.');
                        res.badRequest('Company with the id ' + req.body.id + ' could not be created.');
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
                        res.ok(updated[0]);
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
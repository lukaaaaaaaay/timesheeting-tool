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
                console.log("successful transaction but no companies found..");
            }
            else {
                console.log(companies.length + " companies found");
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
                console.log('No Company with the id ' + req.param('id') + ' found');
                res.notFound('No Company with the id ' + req.param('id') + ' found');
            }
            else {
                console.log('Company Found: ' + company.companyName);
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
            
            // debugging - remove later.. or not, server logs are helpful.
            console.log('created: ' + company.companyName);
            res.ok(company);
        });
    },

    /**
     * Update an existing Company
     *
     * @param {Object} req
     * @param {Object} res
     */
    update: function (req, res) {   
        Company.update({id: req.body.id}, req.body, function(err, updated) {
            if (err) return res.negotiate(err);

            if(!updated) {
                console.log('No Company with the id ' + req.param('id') + ' found');
                res.notFound('No Company with the id ' + req.param('id') + ' found');
            }
            else {
                console.log('updated: ' + updated.companyName);
                res.ok(updated);
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
            console.log('deleted a company');
            res.ok();
        })
    },


    
};
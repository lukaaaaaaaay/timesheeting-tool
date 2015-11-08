/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories in our system
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * Return all the Categories in the system
     *
     * @param {Object} req
     * @param {Object} res
     */
    find: function (req, res) {
        Category.find({}, function(err, categories) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            if(categories.length == 0) {
                sails.log.info("successful transaction but no categories found..");
            }
            else {
                 sails.log.info(categories.length + " categories found");
            }
            res.ok(categories);
        })
    },

        /**
     * Return a single Category matching the supplied Id
     *
     * @param {Object} req
     * @param {Object} res
     */
    findOne: function(req, res) {
        Category.findOne(req.param('id'), function(err, category) {
            if (err) return res.negotiate(err);

            if(!category) {
                sails.log.warn('No Category with the id ' + req.param('id') + ' found');
                res.notFound('No Category with the id ' + req.param('id') + ' found');
            }
            else {
                 sails.log.info('Category Found: ' + category.name);
                res.ok(category);
            }
            
        });
    },

    /**
     * Return all Categories for a particular Company
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllForCompany: function(req, res) {
        Category.findAllForCompany({companyId: req.param('id')}, function(err, tasks) {
            if (err) return res.negotiate(err);
            

            if(tasks.length == 0) {
                sails.log.info("successful transaction but no tasks found..");
            }
            else {
                 sails.log.info(tasks.length + " tasks found");
            }
            res.ok(tasks);
        });
    },

    /**
     * Create a new Category
     *
     * @param {Object} req
     * @param {Object} res
     */
    create: function (req, res) {
        Category.create(req.body, function (err, category) {
            if (err) return res.negotiate(err);
        
            // debugging - remove later.. or not, server logs are helpful.
            if(category) {
                sails.log.info('created: ' + category.name);
                res.ok(category);
            }
            else {
                sails.log.warn('Category with the id ' + req.body.id + ' could not be created.');
                res.badRequest('Category with the id ' + req.body.id + ' could not be created.');
            }
        });

    },

    /**
     * Update an existing Category
     *
     * @param {Object} req
     * @param {Object} res
     */
    update: function (req, res) {   
        Category.findOne(req.body.id, function(err, existing) {
            if (err) return res.negotiate(err);

            if(existing) {
                Category.update({id: req.body.id}, req.body, function(err, updated) {
                    if (err) return res.negotiate(err);

                    if(!updated) {
                        sails.log.warn('Category with the id ' + req.body.id + ' could not be updated.');
                        res.badRequest('Category with the id ' + req.body.id + ' could not be updated.');
                    }
                    else {
                        sails.log.info('Updated Category: ' + updated[0].name);
                        res.ok(updated[0]);
                    }
                    
                });
            }
            else {
                sails.log.warn('No Category with the id ' + req.body.id + ' to update.');
                res.notFound('No Category with the id ' + req.body.id + ' to update.');
            }
        });
        
    },

    /**
     * Delete an existing Category
     *
     * @param {Object} req
     * @param {Object} res
     */
    destroy: function (req, res) {
        Category.destroy({id: req.param('id')}, function(err) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            sails.log.info('Category with id ' + req.param('id') + ' deleted');
            res.ok();
        });
    },


    
};
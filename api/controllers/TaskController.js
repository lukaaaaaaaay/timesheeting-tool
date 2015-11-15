/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks in our system
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * Return all the Tasks in the system
     *
     * @param {Object} req
     * @param {Object} res
     */
    find: function (req, res) {
        Task.find({}, function(err, tasks) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            if(tasks.length == 0) {
                sails.log.info("successful transaction but no tasks found..");
            }
            else {
                 sails.log.info(tasks.length + " tasks found");
            }
            res.ok(tasks);
        })
    },

        /**
     * Return a single Task matching the supplied Id
     *
     * @param {Object} req
     * @param {Object} res
     */
    findOne: function(req, res) {
        Task.findOne(req.param('id'), function(err, task) {
            if (err) return res.negotiate(err);

            if(!task) {
                sails.log.warn('No Task with the id ' + req.param('id') + ' found');
                res.notFound('No Task with the id ' + req.param('id') + ' found');
            }
            else {
                 sails.log.info('Task Found: ' + task.name);
                res.ok(task);
            }
            
        });
    },

    /**
     * Return all Tasks for a particular project
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllForProject: function(req, res) {
        Task.findAllForProject({projectId: req.param('id')}, function(err, tasks) {
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
     * Return all Tasks for a particular user
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllForUser: function(req, res) {
        User.findOne(req.user.id).populate('tasks').exec(function(err, user) {
            if (err) return res.negotiate(err);
            
            if(user) {

                    console.log(user);
                    res.ok(user);
                
                
            }
            else {
                res.notFound('No Task found for this user');
            }

            
        });
    },

    /**
     * Return all Tasks for a particular status
     *
     * @param {Object} req
     * @param {Object} res
     */
    findAllForStatus: function(req, res) {
        Task.findAllForStatus({statusId: req.param('id')}, function(err, tasks) {
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
     * Create a new Task
     *
     * @param {Object} req
     * @param {Object} res
     */
    create: function (req, res) {
        Task.create(req.body, function (err, task) {
            if (err) return res.negotiate(err);
        
            // debugging - remove later.. or not, server logs are helpful.
            if(task) {
                sails.log.info('created: ' + task.name);
                if(task.members.length > 0) {
                    task.members.forEach(function(_user, idx) {
                        User.findOne(_user.id, function (error, user) {
                            if (error) return res.negotiate(error);

                            if(user.tasks) {
                                user.tasks.add(task.id);
                            }
                            else {
                                user.tasks = [];
                                user.tasks.add(task.id);
                            }    

                            user.save();
                        });
                    })
                        
                    
                }
                
                res.ok(task);
            }
            else {
                sails.log.warn('Task with the id ' + req.body.id + ' could not be created.');
                res.badRequest('Task with the id ' + req.body.id + ' could not be created.');
            }
        });

    },

    /**
     * Update an existing Task
     *
     * @param {Object} req
     * @param {Object} res
     */
    update: function (req, res) {   
        Task.findOne(req.body.id, function(err, existing) {
            if (err) return res.negotiate(err);

            if(existing) {
                Task.update({id: req.body.id}, req.body, function(err, updated) {
                    if (err) return res.negotiate(err);

                    if(!updated) {
                        sails.log.warn('Task with the id ' + req.body.id + ' could not be updated.');
                        res.badRequest('Task with the id ' + req.body.id + ' could not be updated.');
                    }
                    else {
                        sails.log.info('Updated Task: ' + updated[0].name);
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
     * Delete an existing Task
     *
     * @param {Object} req
     * @param {Object} res
     */
    destroy: function (req, res) {
        Task.destroy({id: req.param('id')}, function(err) {
            if (err) return res.negotiate(err);

            // debugging - remove later.. or not, server logs are helpful.
            sails.log.info('Task with id ' + req.param('id') + ' deleted');
            res.ok();
        });
    },


    
};
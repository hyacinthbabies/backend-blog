'use strict';
/**
 * Module dependencies.
 */
var usersController = require('../model/db/test.js');
module.exports = function(app) {
  // User Routes
  app.use('/api/users',usersController.list);
  app.use('/api/postContent',usersController.insert);
  app.use('/api/queryContent/:id',usersController.findArticle);
  app.use('/api/updateContent',usersController.updateArticle);
};
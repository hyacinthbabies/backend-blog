'use strict';
/**
 * Module dependencies.
 */
var usersController = require('../model/db/test.js');
module.exports = function(app) {
  // User Routes
  app.use('/api/content/list',usersController.getArticleList);
  app.use('/api/login',usersController.userLogin);
  app.use('/api/postContent',usersController.insert);
  app.use('/api/queryContent/:id',usersController.findArticle);
  app.use('/api/updateContent',usersController.updateArticle);
  app.use('/api/removeArticle',usersController.removeArticle);
  app.use('/api/getArticlesCount',usersController.getArticlesCount);
  app.use('/api/postUser',usersController.userInsert);
  app.use('/api/comment/list',usersController.getComments);
  app.use('/api/commentLists',usersController.getCommentLists);
  app.use('/api/postComment',usersController.commentInsert);
  app.use('/api/removeComment',usersController.removeComment);
};
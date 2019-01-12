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
  app.use('/api/postPhoto',usersController.insertPhoto);
  app.use('/api/getPhotoList',usersController.findPhotoList);
  app.use('/api/articleCount/add',usersController.addCount);
  app.use('/api/articleCount/readCount',usersController.getReadCount);
  app.use('/api/newest/list',usersController.getNewestArticleList);
  
};
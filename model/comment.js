/**
 * 评论信息
 */
var mongoose = require('../db.js'),
Schema = mongoose.Schema;

var CommentSchema = new Schema({  
    articleId: {type: String}, 
    parentId:{type:String},
    userId:{type:String},
    userName:{type:String}, 
    content:{type:String},  
    time:{type:Date},    
    fromUserId: {type: String}, // 回复人编号
    fromUserName: {type: String}, // 回复人姓名
    toUserId: {type: String}, // 被回复人编号
    toUserName: {type: String},  // 被回复人编号
    commentContent:{type:String}, //回复内容
    commentTime:{type:Date}//评论或回复时间
});

module.exports = mongoose.model('Comment',CommentSchema,'Comment');
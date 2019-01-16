/**
 * 评论信息
 */
var mongoose = require('../db.js'),
Schema = mongoose.Schema;

var CommentSchema = new Schema({  
    articleId:{type:Schema.Types.ObjectId}, 
    userId:{type:String},
    userName:{type:String}, 
    content:{type:String}, //回复的内容 
    time:{type:Date},
    replyList:[{
        commentId:{type:Schema.Types.ObjectId}, 
        replyContent:{type:String}, //回复的内容 
        replyTime:{type:Date},    
        fromUserId: {type: String}, // 回复人编号
        fromUserName: {type: String}, // 回复人姓名
        toUserId: {type: String}, // 被回复人编号
        toUserName: {type: String},  // 被回复人编号
    }]
});

module.exports = mongoose.model('Comment',CommentSchema,'Comment');
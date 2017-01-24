/**
 * 文章信息
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({          
    articlename : { type: String },                    //用户账号
    authorname: {type: String},                        //密码
    articlecontent: {type: String},                        //年龄
    articledate : { type: String}                       //最近登录时间
});

module.exports = mongoose.model('Article',ArticleSchema,'Article');
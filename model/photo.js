/**
 * 文章信息
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var PhotoSchema = new Schema({  
    photoId: {type: String},        
    photoName : { type: String },                    //用户账号
    location: {type: String},                        //密码
    photoDesciption: {type: String},                        //年龄
    photoDate : { type: String},
    photoType:{type:String},//最近登录时间
    tag:{type:String}   //标签                    
});

module.exports = mongoose.model('Photo',PhotoSchema,'Photo');
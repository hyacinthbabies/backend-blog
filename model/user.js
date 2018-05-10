/**
 * 用户信息
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({   
    userId:{type:Number},       
    userName : { type: String },                    //用户账号
    userPwd: {type: String},                        //密码
    userAge: {type: String},                        //年龄
    loginDate : { type: String}                       //最近登录时间
});

module.exports = mongoose.model('User',UserSchema,'User');
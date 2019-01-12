/**
 * 埋点统计
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var CountSchema = new Schema({   
    articleId:{type:Schema.Types.ObjectId},       //编号
    totalCount: { type: Number },                    //统计计数
    type: {type: String},                        //类型
    time: {type: String},                        //访问时间
});

module.exports = mongoose.model('Count',CountSchema,'Count');
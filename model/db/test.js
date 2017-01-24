var User = require("../user.js");
var Article = require("../article.js");

/**
 * 插入
 */
module.exports = {
    // nodejs操作数据库，直接阅读mongoose操作APIhttp://mongoosejs.com/docs/guide.html
    // http://blog.csdn.net/u014267351/article/details/51212107
    insert: function(req) {
        var article = new Article(req.body);
        article.save(function(err, res) {

            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
            }
            // res.next();
        });
    },
    findArticle: function(req, res) {
        Article.findById(req.params.id,function(err, articles) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + articles);
            }
        })
    },
    updateArticle:function(req,res){
        console.log(req.body);
        Article.update({_id:req.body.id},{'$set':{articlecontent:req.body.articlecontent}},function(err, articles) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + articles);
            }
        })
    },
    list: function(req, res) {
        User.find(function(err, user) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + user);
                res.json(user);
            }
        })
    }
}

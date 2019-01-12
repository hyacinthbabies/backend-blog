var mongoose = require('mongoose');
var User = require("../user.js");
var Article = require("../article.js");
var Comment = require("../comment.js");
var Photo = require("../photo.js");
var CountAdd = require("../count");
 function format(date, format){
  if (date && format) {
    const o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(format))
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (const k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return format;
  }
  return "";
};

function toDate(dateString){
  if (dateString) {
    return new Date(dateString.replace(/-/gi, "/"));
  }
  return new Date();
}
  //将时间轴转化为字符串
  function dateToString(date) {
    const year = date.getFullYear() + "-";
    const month =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    const day = date.getDate();
    return year + month + day;
  }
  //将string格式的日期按指定格式进行格式化
  function  formatString(dateString, formatter = "yyyy-MM-dd") {
    if (dateString) {
      const date = toDate(dateString);
      return format(date, formatter);
    }
    return "";
  }
  function formatFull(date = new Date()) {
    return format(date, "yyyy-MM-dd hh:mm:ss");
  }
  function  formatToDay(date = new Date()) {
    return format(date, "yyyy-MM-dd");
  }

    function transStrToObjectId(str){
        return mongoose.Types.ObjectId(str);
    }   
/**
 * 插入
 */
module.exports = {
    // nodejs操作数据库，直接阅读mongoose操作APIhttp://mongoosejs.com/docs/guide.html
    // http://blog.csdn.net/u014267351/article/details/51212107
    // 埋点统计
    addCount:function(req,res){
        var query = {articleId:req.body.articleId}
        CountAdd.findOneAndUpdate(query,{$inc:{totalCount:1}},
            {upsert:true}, function (err, result) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("result:" + result);
                res.json(result);
            }
        })
    },
    // 获取统计数
    getReadCount:function(req,res){
        CountAdd.find({articleId:{$regex:req.query.articleId}},function(err,doc){
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + doc);
                res.json(doc);
            }
        })
    },
    //上传图片
    insertPhoto: function(req,res) {
        // req.body.photoDate = formatFull(new Date(req.body.photoDate));
        var photo = new Photo(req.body);
        photo.save(function(err,doc) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + doc);
                res.json(doc);
            }
            // res.next();
        });
    },
    findPhotoList: function(req, res) {
        Photo.find(function(err,doc){
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + doc);
                res.json(doc);
            }
        })
    },
    //上传文章
    insert: function(req,res) {
        req.body.articleDate = formatFull(new Date(req.body.articleDate));
        var article = new Article(req.body);
        article.save(function(err,doc) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + doc);
                res.json(doc);
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
                res.json(articles);
            }
        })
    },
    updateArticle:function(req,res){
        console.log(req.body);
        Article.update({_id:req.body.articleId},{'$set':{articleContent:req.body.articleContent,
            articleName:req.body.articleName,authorName:req.body.authorName,
            articleType:req.body.articleType}},function(err, articles) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + articles);
                res.json(articles);
            }
        })
    },
    userLogin:function(req,res){
        let userName = req.body.userName;
        User.findOne({userName:userName},function(err, doc) {
            if (err) {
                console.log("Error:" + err);
            } else if(!doc){
                console.log("Res:" + doc);
                res.json(doc);
            }if(req.body.password !== doc.userPwd){
                res.json(doc);
                // res.sendStatus(404);    
            }else{
                // req.session.user = doc;
                res.json(doc);
                // res.sendStatus(200);
            }
        })
    },
    userInsert:function(req) {
        var user = new User(req.body);
        user.save(function(err, res) {

            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
            }
            // res.next();
        });
    },
    getArticleList: function(req, res) {
        Article
        .aggregate([
            {
                $lookup: {
                    from: "Comment",
                    localField: "_id",
                    foreignField: "articleId", 
                    as: "comments" 
                }
            },{
                $lookup: {
                    from: "Count",
                    localField: "_id",
                    foreignField: "articleId", 
                    as: "count" 
                }
            },
            {
                $sort:{articleDate:-1}
            },{
                $match:{
                    articleType:{$regex:req.query.articleType},
                    articleName:{$regex:req.query.keyword}}
                // 1为升序，-1为降序
            },{ $project : {
                articleDate : 1 ,
                articleName : 1 ,
                comments:1,
                count:1,
                tag:1,
                image:1
            }}
        ])
        .exec(function(err,doc){
            if (err) {
                console.log("Error:" + err);
            } else {
                res.json(doc);
            }
        })

    },
    removeArticle:function(req,res){
        console.log(req,"rrrr")
        Article.remove({_id:req.query.articleId},function(err, doc){
            console.log(err,doc,"ccc")
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + doc);
                //删除评论
                // Comment.remove({_id:req.body.articleId},function(err, doc){
                //     if (err) {
                //         console.log("Error:" + err);
                //     } else {
                //         console.log("Res:" + doc);
                //         res.json(doc);
                //     }
                // })
                res.json(doc);
            }
        })
    },
    getArticlesCount:function(req,res){
        Article.aggregate([
            {
                $group: {
                    _id: '$articleType',  //$region is the column name in collection
                    count: {$sum: 1}
                }
            }
        ], function (err, result) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("result:" + result);
                res.json(result);
            }
        });
    
    },
    getNewestArticleList:function(req,res){
        Article.find({},function(err,doc){
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + doc);
                res.json(doc);
            }
            // 1为升序，-1为降序
        }).sort({articleDate:-1})
        .limit(5)
    },
    commentInsert:function(req,res){
        req.body.time = formatFull(new Date(req.body.time));
        var comment = new Comment(req.body);
        comment.save(function(err, doc) {
            if (err) {
                console.log("Error:" + err);
            } else {
                
                console.log("Res:" + res);
                res.json(doc);
            }
            // res.next();
        });
    },
    getComments:function(req,res){
        Comment.find(function(err, doc) {
            if (err) {
                console.log("Error:" + err);
            } else {
                //将数据中parentId为空和不为空的数据分开
                //遍历比较parentId和_id是否相同，进行归类
                var result =doc;
                let hasParentId = [];
                let hasNoParentId = [];
                let newList = [];
                for(let i=0;i<result.length;i++){      
                    result[i].parentId === ""?hasNoParentId.push(doc[i]):
                    hasParentId.push(result[i]);
                }
                for(let i=0;i<hasNoParentId.length;i++){
                    hasNoParentId[i].children = [];                                            
                    for(let j=0;j<hasParentId.length;j++){
                        if(hasNoParentId[i]._id == hasParentId[j].parentId){
                            hasNoParentId[i].children.push(hasParentId[j]);  
                        }
                    }
                    newList.push({
                        _id:hasNoParentId[i]._id,
                        articleId:hasNoParentId[i].articleId,
                        content:hasNoParentId[i].content,
                        children:hasNoParentId[i].children,
                        userId:hasNoParentId[i].userId,
                        userName:hasNoParentId[i].userName, 
                        time:hasNoParentId[i].time, 
                    })
                }                         
                res.json(newList);
            }
        })
    },
    getCommentLists:function(req,res){
        Comment.find({articleId:req.query.articleId})
        .sort({time:-1})
        .exec(function(err, doc) {
            if (err) {
                console.log("Error:" + err);
            } else {       
                console.log("Error33333:" + err);    
                res.json(doc);
            }
        })
    },
    removeComment:function(req,res){
        Comment.remove({_id:req.body.commentId},function(err, doc){
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + doc);
                res.json(doc);
            }
        })
    },

}

// var config = require('../config');
var formidable = require('formidable');
var fs = require('fs');
AVATAR_UPLOAD_FOLDER = '/avatar/';
module.exports = function(app) {
    // User Routes
    app.use('/files/upload', function(req, res, next) {
        var form = formidable.IncomingForm();
      
        form.encoding = 'utf-8';
        form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;
          console.log(form);
        // form.uploadDir = config.uploadDir;
        form.keepExtensions = true;
        form.parse(req, function(err, fields, files) {
            if (err) {
                res.locals.error = err;
                // res.render('index', { title: TITLE });
                return;
            }
            var extName = ''; //后缀名
            console.log(files);
            switch (files.pic.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
            }

            if (extName.length == 0) {
                res.locals.error = '只支持png和jpg格式图片';
                // res.render('index', { title: TITLE });
                return;
            }

            var avatarName = files.pic.name.split('.');
            console.log(avatarName);
            var newPath = form.uploadDir + avatarName[0] + '.' +extName;
            resultName = avatarName[0] + '.' +extName;
            fs.renameSync(files.pic.path, newPath); //重命名
        });
        // form.maxFieldsSize = 2 * 1024 * 1024; // 单位为byte  
        // form.on('progress', function(bytesReceived, bytesExpected) {
        //     var progressInfo = {
        //         value: bytesReceived,
        //         total: bytesExpected
        //     };
        //     console.log('[progress]: ' + JSON.stringify(progressInfo));
        //     res.write(JSON.stringify(progressInfo));
        // });
        form.on('end', function() {
            console.log('end');
            res.end(JSON.stringify({url:'http://127.0.0.1:3000/avatar/'+resultName}));
        });

        form.on('error', function(err) {
            console.error('upload failed', err.message);
            next(err);
        })

    });

};

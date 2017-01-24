var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/shqTest';
//不加控制台会promise没有
mongoose.Promise = global.Promise;
/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected');
});

// var mongoose = require('mongoose');
// var dbName = 'shqTest';
// var url = 'mongodb://localhost:27017/' + dbName;
// var mongoOptions = {
//     server: {
//         socketOptions: {
//             keepAlive: 1
//         }
//     }
// };

// mongoose.connect(url, mongoOptions);
// mongoose.connection.on('error', function(err) {
//     console.log('Mongo Error:' + err);
// }).on('open', function() {
//     console.log('Connection opened');
// });

module.exports = mongoose;

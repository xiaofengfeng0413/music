var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

// 会话支持
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var routes = require('./routes/index');
var users = require('./routes/users');

//数据库
var mongoose = require('mongoose')
var db = mongoose.connect('mongodb://localhost/bisai');//；连接数据库
var dbUrl = 'mongodb://localhost/bisai'//数据库名字



//session
var mongoStore = require('connect-mongo')(session)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  name: "kvkens",
  secret: "imooc",
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({
    url: dbUrl,
    auto_reconnect: true,//issue 推荐解决方法
    collection: "sessions"//存在mongodb里的名字
  })
}));




app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

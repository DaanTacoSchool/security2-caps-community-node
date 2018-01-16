var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const config = require('./config/config.json');
const jwt = require('express-jwt');

var db = require('./model/db');

var index = require('./routes/index');
var users = require('./routes/users.routes');
var comments = require('./routes/comments.routes');
var posts = require('./routes/posts.routes');
var auth = require('./routes/auth.routes');
// var likes = require('./routes/likes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jwt({ secret: config.secretKey}).unless({path: [
    {url: /\/api\/v1\/users/i, methods: ['GET', 'OPTIONS']},
    {url: /\/api\/v1\/comments/i, methods: ['GET', 'OPTIONS']},
    {url: /\/api\/v1\/likes/i, methods: ['GET', 'OPTIONS']},
    {url: /\/api\/v1\/posts/i, methods: ['GET', 'OPTIONS']},
    /\/api\/v1\/auth/i,
]}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*' || 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Origin, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', index);
app.use('/api/v1', users);
app.use('/api/v1', comments);
app.use('/api/v1', posts);
app.use('/api/v1', auth);
// app.use('./api/v1', likes)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express = require('express');
var ueditor = require("ueditor");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var login = require('./routes/login');
var routes = require('./routes/index');
var users = require('./routes/users');
var status = require('./routes/status');
var group = require('./routes/groups');
var school = require('./routes/school');
var article = require("./routes/article");
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//验证
// app.use(function(req,res,next){
//   //md5 (uid + ua) = token;
//   next()
// })


app.use("/api/fetch",routes);
app.use('/api/login', login);
app.use('/api/tools', status);
app.use('/api/users', users);
app.use("/api/article",article);//家长社区使用

// app.use('/api/group', users);
// app.use('/api/school', users);
app.use("/api/ueditor", ueditor(path.join(__dirname, 'public'), function(req, res) {
  console.log(req.query);
  console.log(req.body);
  if (req.query.action === 'uploadimage') {
    // 这里你可以获得上传图片的信息
    var foo = req.ueditor;
    var time = new Date();
    // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
    var img_url = time.getFullYear()+""+(time.getMonth()+1)+""+time.getDate();
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage') {
    var dir_url = 'list'; // 要展示给客户端的文件夹路径
    res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {
    res.setHeader('Content-Type', 'application/json');
    // 这里填写 ueditor.config.json 这个文件的路径
    res.json(u)
  }
}))

app.use("/",function(req,res){
   res.render("home",{});
});

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

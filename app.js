var express = require("express");
var ejs = require('ejs'); //html渲染引擎，对前端很重要
var path = require('path'); //系统路径
var mysql = require('mysql'); //mysql解析模块
var cookie = require('cookie-parser');
var session = require('express-session');

var app = new express();

var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var appointment_userRouter = require('./routes/appointment_user');
var uploadRouter = require('./routes/upload');
var feedbackRouter = require('./routes/feedback');
var reportRouter = require('./routes/report');
var aboutRouter = require('./routes/about');
var newsRouter = require('./routes/news');
var contactRouter = require('./routes/contact');
var forget_passwordRouter = require('./routes/forget');
var reverseRouter = require('./routes/reverse');
var feedback_emailRouter = require('./routes/feedback_email');
var informationRouter = require('./routes/information');

app.set('views', './views/pages');

app.engine('.html', ejs.__express);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public/css'))); //静态文件放在这里
app.use(express.static(path.join(__dirname, 'public/javascripts')));
app.use(express.static(path.join(__dirname, 'public/files')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/fonts')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookie());
app.use(session({
    secret: 'Hailin',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 5000
    },
    rolling: true
}))

app.use('/login', loginRouter);
app.use('/register', registerRouter);
/*app.use('*',function(req,res,next)
{
    if(req.session.username) 
    {
    next();
    }
    else 
    {
        res.redirect('/login/1');
    }
});*/

app.use('/', homeRouter);


app.use('/appointment_user', appointment_userRouter);
app.use('/feedback', feedbackRouter);
app.use('/report', reportRouter);
app.use('/upload', uploadRouter);
app.use('/news', newsRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/forget_password', forget_passwordRouter);
app.use('/revers', reverseRouter);
app.use('/feedback_email', feedback_emailRouter);
app.use('/information', informationRouter);

app.get('/cancel', function(req, res) //注销用户
    {
        req.session.destroy(function(err) {
            res.redirect('/');
        })
    });

app.use(function(req, res) {
    res.send('404NotFound');
});


app.use(function(err, req, res, next) {
    res.send('505err');
});

module.exports = app;

var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Node.JS 服务器已启动，访问地址： http://%s:%s", host, port)

})
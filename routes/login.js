var express = require('express');
var router = express.Router();
var cookie = require('cookie-parser'); //cookie中间件
var session = require('express-session'); //session中间件
var db = require('./dataBase');

router.use(cookie());
router.use(session({
    secret: 'Ancaeus',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 5000000
    },
    rolling: true
}))

router.get('/login_confirm_user', function(req, res) {
    db.Search("userdata", "Telephone", req.query.user_phone, function(err, data) {
        var hasLogin = false;
        if (err) { console.log(err.message); } else data.forEach(function(value) {
            if (value.Telephone == req.query.user_phone.toString() && value.Password == req.query.user_password.toString()) {
                hasLogin = true;
                req.session.username = value.Name;
                req.session.priority = 'user';
                req.session.save();
                res.redirect('/');
                //res.send(200,{isexist:"true"});
            }
        })
        if (hasLogin == false) res.send({ isexist: "false" });
    });
})

router.get('/login_confirm_admin', function(req, res) {
    db.Search("admindata", "Id", req.query.id, function(err, data) {
        var hasLogin = false;
        if (err) { console.log(err.message); } else data.forEach(function(value) {
            if (value.Id == req.query.id.toString() && value.Password == req.query.password.toString()) {
                hasLogin = true;
                req.session.username = value.Name;
                req.session.priority = 'admin';
                req.session.save();
                res.redirect('/');
            }
        })
        if (hasLogin == false) res.send(400, { "error": "工号/密码错误" });
    });
})

router.get('/user_login', function(req, res) {
    if (req.session.username) { res.send('AccessDenied'); } else {
        res.render('user_login');
    }

})

router.get('/admin_login', function(req, res) {
    if (req.session.username) { res.send('AccessDenied'); } else {
        res.render('admin_login');
    }

})

router.get('/user_login/login_confirm', function(req, res) {


});

router.get('/admin_login/login_confirm', function(req, res) {


});

module.exports = router;